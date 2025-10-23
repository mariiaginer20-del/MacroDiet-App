import React, { useState, useEffect } from 'react';
import { Home, Search, Calendar, Settings, ChevronDown, ChevronUp, Plus } from 'lucide-react';

const MacroDietApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [macroFilters, setMacroFilters] = useState({
    carbs: false,
    fats: false,
    protein: false
  });
  const [meals, setMeals] = useState([]);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [dailyGoals] = useState({
    carbs: 9,
    protein: 3,
    fats: 6,
    calories: 1709
  });
  
  // Estados para planificación
  const [selectedMealType, setSelectedMealType] = useState('Desayuno');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [mealName, setMealName] = useState('');
  const [savedMeals, setSavedMeals] = useState([]);
  
  const mealTypeGoals = {
    'Desayuno': { carbs: 2.5, protein: 0, fats: 2 },
    'Almuerzo': { carbs: 1, protein: 1, fats: 1 },
    'Comida': { carbs: 3, protein: 1.5, fats: 2 },
    'Cena': { carbs: 2.5, protein: 0.5, fats: 1 }
  };

  // Base de datos de alimentos
  const foodDatabase = [
    { id: 1, name: 'Patata', amount: '130g', carbs: 26, fats: 0.1, protein: 2.6, label: 'H:1' },
    { id: 2, name: 'Arroz/Pasta', amount: '30g', carbs: 24, fats: 0.3, protein: 2.7, label: 'H:1' },
    { id: 3, name: 'Boniato', amount: '120g', carbs: 24, fats: 0.1, protein: 2, label: 'H:1' },
    { id: 4, name: 'Korn Flakes', amount: '30g', carbs: 25, fats: 0.3, protein: 2.1, label: 'H:1' },
    { id: 5, name: 'Avena', amount: '30g', carbs: 20, fats: 2, protein: 5, label: 'H:1' },
    { id: 6, name: 'Harina de trigo/espelta', amount: '30g', carbs: 22, fats: 0.4, protein: 3.3, label: 'H:1' },
    { id: 7, name: 'Pechuga de Pollo', amount: '100g', carbs: 0, fats: 3, protein: 31, label: 'P:1' },
    { id: 8, name: 'Huevo', amount: '1ud', carbs: 1, fats: 10, protein: 13, label: 'P:1+G:1' },
    { id: 9, name: 'Salmón', amount: '100g', carbs: 0, fats: 13, protein: 20, label: 'P:1+G:1' },
    { id: 10, name: 'Yogur Griego', amount: '100g', carbs: 4, fats: 10, protein: 10, label: 'P:0.5+G:1' },
    { id: 11, name: 'Aguacate', amount: '50g', carbs: 4.5, fats: 7.5, protein: 1, label: 'G:1' },
    { id: 12, name: 'Almendras', amount: '10g', carbs: 2.2, fats: 5, protein: 2.1, label: 'G:0.5' },
    { id: 13, name: 'Aceite de oliva', amount: '10ml', carbs: 0, fats: 10, protein: 0, label: 'G:1' },
    { id: 14, name: 'Plátano', amount: '100g', carbs: 23, fats: 0.3, protein: 1.1, label: 'H:1' },
  ];

  useEffect(() => {
    const savedMealsData = localStorage.getItem('meals');
    if (savedMealsData) {
      setMeals(JSON.parse(savedMealsData));
    }
    
    const savedRecipes = localStorage.getItem('savedMeals');
    if (savedRecipes) {
      setSavedMeals(JSON.parse(savedRecipes));
    }
  }, []);

  const toggleMacroFilter = (macro) => {
    setMacroFilters(prev => ({
      ...prev,
      [macro]: !prev[macro]
    }));
  };

  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!macroFilters.carbs && !macroFilters.fats && !macroFilters.protein) {
      return matchesSearch;
    }

    const hasCarbs = macroFilters.carbs && food.carbs > 10;
    const hasFats = macroFilters.fats && food.fats > 5;
    const hasProtein = macroFilters.protein && food.protein > 5;

    return matchesSearch && (hasCarbs || hasFats || hasProtein);
  });

  const addFoodToMeal = (food, mealName) => {
    const newMeal = {
      id: Date.now(),
      name: mealName,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      foods: [{ ...food }]
    };

    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
  };

  const deleteMeal = (mealId) => {
    const updatedMeals = meals.filter(m => m.id !== mealId);
    setMeals(updatedMeals);
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
  };
  
  const addToSelectedFoods = (food) => {
    const existing = selectedFoods.find(f => f.id === food.id);
    if (existing) {
      setSelectedFoods(selectedFoods.map(f => 
        f.id === food.id ? { ...f, quantity: f.quantity + 1 } : f
      ));
    } else {
      setSelectedFoods([...selectedFoods, { ...food, quantity: 1 }]);
    }
  };
  
  const removeFromSelectedFoods = (foodId) => {
    setSelectedFoods(selectedFoods.filter(f => f.id !== foodId));
  };
  
  const updateFoodQuantity = (foodId, quantity) => {
    setSelectedFoods(selectedFoods.map(f => 
      f.id === foodId ? { ...f, quantity: Math.max(1, parseInt(quantity) || 1) } : f
    ));
  };
  
  const calculateOptimalPortions = () => {
    if (selectedFoods.length === 0) return;
    
    const goals = mealTypeGoals[selectedMealType];
    const totalCarbs = selectedFoods.reduce((sum, f) => sum + (f.carbs * f.quantity), 0);
    const totalProtein = selectedFoods.reduce((sum, f) => sum + (f.protein * f.quantity), 0);
    const totalFats = selectedFoods.reduce((sum, f) => sum + (f.fats * f.quantity), 0);
    
    // Calcular factor de ajuste (simplificado)
    const carbFactor = goals.carbs > 0 ? (goals.carbs * 24) / Math.max(totalCarbs, 1) : 1;
    const proteinFactor = goals.protein > 0 ? (goals.protein * 22) / Math.max(totalProtein, 1) : 1;
    const fatFactor = goals.fats > 0 ? (goals.fats * 10) / Math.max(totalFats, 1) : 1;
    
    const avgFactor = (carbFactor + proteinFactor + fatFactor) / 3;
    
    setSelectedFoods(selectedFoods.map(f => ({
      ...f,
      quantity: Math.max(1, Math.round(f.quantity * avgFactor))
    })));
  };
  
  const registerInMyDay = () => {
    if (selectedFoods.length === 0) return;
    
    const newMeal = {
      id: Date.now(),
      name: selectedMealType,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      foods: selectedFoods.map(f => ({
        ...f,
        carbs: f.carbs * f.quantity,
        fats: f.fats * f.quantity,
        protein: f.protein * f.quantity
      }))
    };
    
    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
    setSelectedFoods([]);
    setActiveTab('home');
  };
  
  const saveMealRecipe = () => {
    if (selectedFoods.length === 0 || !mealName.trim()) return;
    
    const newRecipe = {
      id: Date.now(),
      name: mealName,
      type: selectedMealType,
      foods: selectedFoods
    };
    
    const updatedRecipes = [...savedMeals, newRecipe];
    setSavedMeals(updatedRecipes);
    localStorage.setItem('savedMeals', JSON.stringify(updatedRecipes));
    setMealName('');
    setShowSaveModal(false);
    setSelectedFoods([]);
  };

  const getTotalMacros = () => {
    return meals.reduce((total, meal) => {
      meal.foods.forEach(food => {
        total.carbs += food.carbs || 0;
        total.fats += food.fats || 0;
        total.protein += food.protein || 0;
      });
      return total;
    }, { carbs: 0, fats: 0, protein: 0 });
  };

  const totals = getTotalMacros();
  const remaining = {
    carbs: Math.max(0, dailyGoals.carbs - totals.carbs),
    protein: Math.max(0, dailyGoals.protein - totals.protein),
    fats: Math.max(0, dailyGoals.fats - totals.fats),
  };

  const MacroTag = ({ carbs, fats, protein }) => (
    <div className="flex gap-1.5 flex-wrap">
      {carbs > 0 && (
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: 'rgba(239, 68, 68, 0.15)',
          color: 'rgb(220, 38, 38)',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          C:{Math.round(carbs)}g
        </span>
      )}
      {fats > 0 && (
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: 'rgba(59, 130, 246, 0.15)',
          color: 'rgb(37, 99, 235)',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          G:{Math.round(fats)}g
        </span>
      )}
      {protein > 0 && (
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: 'rgba(34, 197, 94, 0.15)',
          color: 'rgb(22, 163, 74)',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        }}>
          P:{Math.round(protein)}g
        </span>
      )}
    </div>
  );
  
  const MacroTagForPlanning = ({ carbs, fats, protein }) => (
    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
      {carbs > 0 && (
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: 'rgba(34, 197, 94, 0.15)',
          color: 'rgb(22, 163, 74)',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        }}>
          H:{Math.round(carbs)}g
        </span>
      )}
      {protein > 0 && (
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: 'rgba(59, 130, 246, 0.15)',
          color: 'rgb(37, 99, 235)',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          P:{Math.round(protein)}g
        </span>
      )}
      {fats > 0 && (
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: 'rgba(245, 158, 11, 0.15)',
          color: 'rgb(217, 119, 6)',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          G:{Math.round(fats)}g
        </span>
      )}
    </div>
  );

  const ProgressBar = ({ current, goal, color }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    const colorMap = {
      'bg-green-500': 'linear-gradient(90deg, rgb(34, 197, 94), rgb(74, 222, 128))',
      'bg-blue-500': 'linear-gradient(90deg, rgb(59, 130, 246), rgb(96, 165, 250))',
      'bg-amber-500': 'linear-gradient(90deg, rgb(245, 158, 11), rgb(251, 191, 36))',
      'bg-purple-500': 'linear-gradient(90deg, rgb(168, 85, 247), rgb(192, 132, 252))'
    };
    
    return (
      <div style={{ 
        width: '100%', 
        height: '0.5rem', 
        background: '#e5e7eb', 
        borderRadius: '9999px', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          height: '100%', 
          background: colorMap[color], 
          width: `${percentage}%`,
          transition: 'width 0.5s ease',
          borderRadius: '9999px'
        }} />
      </div>
    );
  };

  const HomeTab = () => (
    <div className="pb-24" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        background: 'linear-gradient(to bottom, #e0e7ff 0%, #f3f4f6 100%)',
        border: '1px solid #d1d5db',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem',
          color: '#1f2937'
        }}>
          <span>📊</span> Resumen del Día
        </h2>
        
        {/* Grid 2x2 de macros */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1.5rem', 
          marginBottom: '1.5rem' 
        }}>
          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '0.25rem' }}>
              {Math.round(totals.carbs)}.0 <span style={{ color: '#4b5563', fontSize: '1.5rem' }}>/ {dailyGoals.carbs}</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.75rem' }}>Unidades Hidratos</div>
            <ProgressBar current={totals.carbs} goal={dailyGoals.carbs} color="bg-green-500" />
            <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '600', marginTop: '0.5rem' }}>
              Quedan {Math.round(remaining.carbs)}.0
            </div>
          </div>

          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.25rem' }}>
              {Math.round(totals.protein)}.0 <span style={{ color: '#4b5563', fontSize: '1.5rem' }}>/ {dailyGoals.protein}</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.75rem' }}>Unidades Proteína</div>
            <ProgressBar current={totals.protein} goal={dailyGoals.protein} color="bg-blue-500" />
            <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '600', marginTop: '0.5rem' }}>
              Quedan {Math.round(remaining.protein)}.0
            </div>
          </div>

          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#d97706', marginBottom: '0.25rem' }}>
              {Math.round(totals.fats)}.0 <span style={{ color: '#4b5563', fontSize: '1.5rem' }}>/ {dailyGoals.fats}</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.75rem' }}>Unidades Grasa</div>
            <ProgressBar current={totals.fats} goal={dailyGoals.fats} color="bg-amber-500" />
            <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '600', marginTop: '0.5rem' }}>
              Quedan {Math.round(remaining.fats)}.0
            </div>
          </div>

          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#9333ea', marginBottom: '0.25rem' }}>
              0 <span style={{ color: '#4b5563', fontSize: '1.5rem' }}>/ {dailyGoals.calories}</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.75rem' }}>Calorías</div>
            <ProgressBar current={0} goal={dailyGoals.calories} color="bg-purple-500" />
            <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '600', marginTop: '0.5rem' }}>
              Quedan {dailyGoals.calories}
            </div>
          </div>
        </div>

        {/* Equivalente en gramos */}
        <div style={{
          background: 'white',
          borderRadius: '0.75rem',
          padding: '1rem',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: '#1f2937'
          }}>
            <span>📏</span> Equivalente en gramos
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a' }}>
                {Math.round(totals.carbs)}g <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>/ 217g</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                Hidratos consumidos
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1f2937' }}>Quedan 217g</div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>
                {Math.round(totals.protein)}g <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>/ 65g</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                Proteína consumida
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1f2937' }}>Quedan 65g</div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#d97706' }}>
                {Math.round(totals.fats)}g <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>/ 64g</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                Grasa consumida
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1f2937' }}>Quedan 64g</div>
            </div>
          </div>
        </div>
      </div>

      {/* Comidas registradas */}
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        padding: '1.25rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#1f2937' }}>
          Comidas de Hoy
        </h3>
        {meals.length === 0 ? (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem 0', fontSize: '0.875rem' }}>
            No hay comidas registradas
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {meals.map(meal => (
              <div key={meal.id} className="meal-item">
                <button
                  onClick={() => setExpandedMeal(expandedMeal === meal.id ? null : meal.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">{meal.name}</div>
                      <div className="text-xs text-gray-500">{meal.time}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMeal(meal.id);
                        }}
                        className="text-red-500 hover:text-red-600 text-xs px-2 py-1"
                      >
                        Eliminar
                      </button>
                      {expandedMeal === meal.id ? 
                        <ChevronUp size={18} className="text-gray-500" /> : 
                        <ChevronDown size={18} className="text-gray-500" />
                      }
                    </div>
                  </div>
                </button>
                
                {expandedMeal === meal.id && (
                  <div className="space-y-2 border-t border-gray-200 pt-3 mt-2">
                    {meal.foods.map((food, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-gray-800 text-sm">{food.name}</div>
                          <div className="text-xs text-gray-500">{food.amount}</div>
                        </div>
                        <MacroTag carbs={food.carbs} fats={food.fats} protein={food.protein} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const SearchTab = () => (
    <div style={{ paddingBottom: '6rem' }}>
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        padding: '1.25rem',
        marginBottom: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Buscar Alimentos
        </h2>
        
        <input
          type="text"
          placeholder="Buscar alimento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            background: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        />

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: '600', marginBottom: '0.5rem' }}>
            Filtrar por:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => toggleMacroFilter('carbs')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: macroFilters.carbs ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.1)',
                color: macroFilters.carbs ? 'rgb(21, 128, 61)' : 'rgb(22, 163, 74)',
                border: macroFilters.carbs ? '2px solid rgb(34, 197, 94)' : '1px solid rgba(34, 197, 94, 0.3)',
                cursor: 'pointer'
              }}
            >
              Hidratos
            </button>
            <button
              onClick={() => toggleMacroFilter('protein')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: macroFilters.protein ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.1)',
                color: macroFilters.protein ? 'rgb(29, 78, 216)' : 'rgb(37, 99, 235)',
                border: macroFilters.protein ? '2px solid rgb(59, 130, 246)' : '1px solid rgba(59, 130, 246, 0.3)',
                cursor: 'pointer'
              }}
            >
              Proteínas
            </button>
            <button
              onClick={() => toggleMacroFilter('fats')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: macroFilters.fats ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.1)',
                color: macroFilters.fats ? 'rgb(180, 83, 9)' : 'rgb(217, 119, 6)',
                border: macroFilters.fats ? '2px solid rgb(245, 158, 11)' : '1px solid rgba(245, 158, 11, 0.3)',
                cursor: 'pointer'
              }}
            >
              Grasas
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {filteredFoods.map(food => (
            <div key={food.id} style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              padding: '0.875rem',
              marginBottom: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.875rem' }}>{food.name}</div>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '0.25rem',
                      background: '#f3f4f6',
                      color: '#374151',
                      flexShrink: 0
                    }}>
                      {food.label}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>{food.amount}</div>
                  <MacroTagForPlanning carbs={food.carbs} fats={food.fats} protein={food.protein} />
                </div>
                <button
                  onClick={() => addFoodToMeal(food, 'Comida rápida')}
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.75rem',
                    background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    flexShrink: 0
                  }}
                >
                  <Plus size={14} />
                  Añadir
                </button>
              </div>
            </div>
          ))}
          {filteredFoods.length === 0 && (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem 0', fontSize: '0.875rem' }}>
              No se encontraron alimentos
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const PlanningTab = () => {
    const goals = mealTypeGoals[selectedMealType];
    const selectedTotals = selectedFoods.reduce((sum, f) => ({
      carbs: sum.carbs + (f.carbs * f.quantity),
      protein: sum.protein + (f.protein * f.quantity),
      fats: sum.fats + (f.fats * f.quantity)
    }), { carbs: 0, protein: 0, fats: 0 });
    
    return (
      <div style={{ paddingBottom: '6rem' }}>
        {/* Selector de tipo de comida */}
        <div style={{
          background: 'linear-gradient(to bottom, #e0e7ff 0%, #f3f4f6 100%)',
          border: '1px solid #d1d5db',
          borderRadius: '1rem',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <label style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
            Selecciona tipo de comida:
          </label>
          <select 
            value={selectedMealType}
            onChange={(e) => setSelectedMealType(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            <option>Desayuno</option>
            <option>Almuerzo</option>
            <option>Comida</option>
            <option>Cena</option>
          </select>
          
          <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Objetivo:</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>
              {goals.carbs}H | {goals.protein}P | {goals.fats}G
            </div>
          </div>
        </div>

        {/* Lista de alimentos */}
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '1rem',
          padding: '1.25rem',
          marginBottom: '1rem'
        }}>
          <input
            type="text"
            placeholder="Buscar alimentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />

          <div style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: '600', marginBottom: '0.5rem' }}>
            Filtrar por:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button
              onClick={() => toggleMacroFilter('carbs')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: macroFilters.carbs ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.1)',
                color: macroFilters.carbs ? 'rgb(21, 128, 61)' : 'rgb(22, 163, 74)',
                border: macroFilters.carbs ? '2px solid rgb(34, 197, 94)' : '1px solid rgba(34, 197, 94, 0.3)'
              }}
            >
              Hidratos {macroFilters.carbs && '✓'}
            </button>
            <button
              onClick={() => toggleMacroFilter('protein')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: macroFilters.protein ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.1)',
                color: macroFilters.protein ? 'rgb(29, 78, 216)' : 'rgb(37, 99, 235)',
                border: macroFilters.protein ? '2px solid rgb(59, 130, 246)' : '1px solid rgba(59, 130, 246, 0.3)'
              }}
            >
              Proteínas {macroFilters.protein && '✓'}
            </button>
            <button
              onClick={() => toggleMacroFilter('fats')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: macroFilters.fats ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.1)',
                color: macroFilters.fats ? 'rgb(180, 83, 9)' : 'rgb(217, 119, 6)',
                border: macroFilters.fats ? '2px solid rgb(245, 158, 11)' : '1px solid rgba(245, 158, 11, 0.3)'
              }}
            >
              Grasas {macroFilters.fats && '✓'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
            {filteredFoods.map(food => (
              <div 
                key={food.id}
                onClick={() => addToSelectedFoods(food)}
                style={{
                  background: selectedFoods.find(f => f.id === food.id) ? '#f0fdf4' : 'white',
                  border: selectedFoods.find(f => f.id === food.id) ? '2px solid #22c55e' : '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: '600', fontSize: '0.875rem', color: '#1f2937', marginBottom: '0.25rem' }}>
                  {food.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  {food.amount}
                </div>
                <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '0.375rem' }}>
                  {food.carbs > 0 && (
                    <span style={{
                      padding: '0.125rem 0.375rem',
                      borderRadius: '9999px',
                      fontSize: '0.625rem',
                      fontWeight: '600',
                      background: 'rgba(34, 197, 94, 0.15)',
                      color: 'rgb(22, 163, 74)',
                      border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}>
                      H:{Math.round(food.carbs)}
                    </span>
                  )}
                  {food.protein > 0 && (
                    <span style={{
                      padding: '0.125rem 0.375rem',
                      borderRadius: '9999px',
                      fontSize: '0.625rem',
                      fontWeight: '600',
                      background: 'rgba(59, 130, 246, 0.15)',
                      color: 'rgb(37, 99, 235)',
                      border: '1px solid rgba(59, 130, 246, 0.3)'
                    }}>
                      P:{Math.round(food.protein)}
                    </span>
                  )}
                  {food.fats > 0 && (
                    <span style={{
                      padding: '0.125rem 0.375rem',
                      borderRadius: '9999px',
                      fontSize: '0.625rem',
                      fontWeight: '600',
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: 'rgb(217, 119, 6)',
                      border: '1px solid rgba(245, 158, 11, 0.3)'
                    }}>
                      G:{Math.round(food.fats)}
                    </span>
                  )}
                </div>
                <span style={{
                  padding: '0.125rem 0.375rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.625rem',
                  background: '#f3f4f6',
                  color: '#374151',
                  fontWeight: '600'
                }}>
                  {food.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alimentos seleccionados */}
        {selectedFoods.length > 0 && (
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '1rem',
            padding: '1.25rem',
            marginBottom: '1rem'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              Alimentos seleccionados:
            </h3>
            
            {selectedFoods.map(food => (
              <div key={food.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                background: '#f9fafb',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '0.875rem', color: '#1f2937' }}>
                    {food.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {food.amount}
                  </div>
                </div>
                <input
                  type="number"
                  value={food.quantity}
                  onChange={(e) => updateFoodQuantity(food.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: '60px',
                    padding: '0.375rem',
                    textAlign: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    marginRight: '0.5rem'
                  }}
                  min="1"
                />
                <button
                  onClick={() => removeFromSelectedFoods(food.id)}
                  style={{
                    color: '#ef4444',
                    padding: '0.375rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.25rem'
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
            
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'linear-gradient(to bottom, #f0fdf4 0%, #f9fafb 100%)',
              borderRadius: '0.75rem',
              border: '1px solid #d1fae5'
            }}>
              <div style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                Totales actuales:
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Hidratos */}
                <div>
                  <div style={{ 
                    fontSize: '1rem', 
                    fontWeight: '700', 
                    color: 'rgb(22, 163, 74)',
                    marginBottom: '0.25rem'
                  }}>
                    Hidratos: {(selectedTotals.carbs / 24).toFixed(1)} / {goals.carbs}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {Math.round(selectedTotals.carbs)}g / {goals.carbs * 24}g
                  </div>
                </div>
                
                {/* Proteínas */}
                <div>
                  <div style={{ 
                    fontSize: '1rem', 
                    fontWeight: '700', 
                    color: 'rgb(37, 99, 235)',
                    marginBottom: '0.25rem'
                  }}>
                    Proteínas: {(selectedTotals.protein / 22).toFixed(1)} / {goals.protein}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {Math.round(selectedTotals.protein)}g / {goals.protein * 22}g
                  </div>
                </div>
                
                {/* Grasas */}
                <div>
                  <div style={{ 
                    fontSize: '1rem', 
                    fontWeight: '700', 
                    color: 'rgb(217, 119, 6)',
                    marginBottom: '0.25rem'
                  }}>
                    Grasas: {(selectedTotals.fats / 10).toFixed(1)} / {goals.fats}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {Math.round(selectedTotals.fats)}g / {goals.fats * 10}g
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                onClick={calculateOptimalPortions}
                style={{
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Calcular
              </button>
              <button
                onClick={calculateOptimalPortions}
                style={{
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Optimizar
              </button>
              <button
                onClick={registerInMyDay}
                style={{
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem'
                }}
              >
                📅 Registrar
              </button>
            </div>
            
            <button
              onClick={() => setShowSaveModal(true)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              💾 Guardar Comida
            </button>
          </div>
        )}
        
        {/* Modal para guardar comida */}
        {showSaveModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              maxWidth: '400px',
              width: '90%'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
                Guardar Comida
              </h3>
              <input
                type="text"
                placeholder="Nombre de la comida..."
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                  fontSize: '1rem'
                }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setShowSaveModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#f3f4f6',
                    color: '#374151',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={saveMealRecipe}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const tabs = [
    { id: 'home', label: 'Mi Día', icon: Home },
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'calendar', label: 'Planificar', icon: Calendar },
    { id: 'settings', label: 'Ajustes', icon: Settings }
  ];

  return (
    <div style={{ maxWidth: '28rem', margin: '0 auto', minHeight: '100vh', background: '#f9fafb' }}>
      <div style={{ padding: '1rem' }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(22, 163, 74))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Macro Diet
        </h1>

        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'calendar' && <PlanningTab />}
        {activeTab === 'settings' && (
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '1rem',
            padding: '1.25rem',
            marginBottom: '1rem',
            paddingBottom: '6rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
              Ajustes
            </h2>
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem 0', fontSize: '0.875rem' }}>
              Próximamente...
            </p>
          </div>
        )}
      </div>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '0.25rem 0.5rem',
        maxWidth: '28rem',
        margin: '0 auto',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: activeTab === tab.id ? 'rgb(147, 51, 234)' : 'rgb(107, 114, 128)'
                }}
              >
                <Icon size={22} />
                <span style={{ fontSize: '0.75rem', marginTop: '0.125rem' }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MacroDietApp;