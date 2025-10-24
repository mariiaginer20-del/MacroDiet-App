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
  
  const [selectedMealType, setSelectedMealType] = useState('Desayuno');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [mealName, setMealName] = useState('');
  const [timeInvested, setTimeInvested] = useState('medio');
  const [savedMeals, setSavedMeals] = useState([]);
  const [recipeSearchTerm, setRecipeSearchTerm] = useState('');
  const [recipeFilters, setRecipeFilters] = useState({
    time: { poco: false, medio: false, mucho: false },
    macros: { carbs: false, protein: false, fats: false }
  });
  
  const [mealTypes, setMealTypes] = useState([
    { id: 1, name: 'Desayuno', carbs: 2.5, protein: 0, fats: 2 },
    { id: 2, name: 'Almuerzo', carbs: 1, protein: 1, fats: 1 },
    { id: 3, name: 'Comida', carbs: 3, protein: 1.5, fats: 2 },
    { id: 4, name: 'Cena', carbs: 2.5, protein: 0.5, fats: 1 }
  ]);
  const [conversions, setConversions] = useState({
    carbs: 24,
    protein: 22,
    fats: 10
  });
  const [editingMealType, setEditingMealType] = useState(null);
  
  const mealTypeGoals = mealTypes.reduce((acc, meal) => {
    acc[meal.name] = { carbs: meal.carbs, protein: meal.protein, fats: meal.fats };
    return acc;
  }, {});

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
    
    const savedMealTypes = localStorage.getItem('mealTypes');
    if (savedMealTypes) {
      setMealTypes(JSON.parse(savedMealTypes));
    }
    
    const savedConversions = localStorage.getItem('conversions');
    if (savedConversions) {
      setConversions(JSON.parse(savedConversions));
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
    
    const carbFactor = goals.carbs > 0 ? (goals.carbs * conversions.carbs) / Math.max(totalCarbs, 1) : 1;
    const proteinFactor = goals.protein > 0 ? (goals.protein * conversions.protein) / Math.max(totalProtein, 1) : 1;
    const fatFactor = goals.fats > 0 ? (goals.fats * conversions.fats) / Math.max(totalFats, 1) : 1;
    
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
      timeInvested: timeInvested,
      foods: selectedFoods
    };
    
    const updatedRecipes = [...savedMeals, newRecipe];
    setSavedMeals(updatedRecipes);
    localStorage.setItem('savedMeals', JSON.stringify(updatedRecipes));
    setMealName('');
    setTimeInvested('medio');
    setShowSaveModal(false);
    setSelectedFoods([]);
  };
  
  const addMealType = () => {
    const newMeal = {
      id: Date.now(),
      name: 'Nueva Comida',
      carbs: 1,
      protein: 1,
      fats: 1
    };
    const updated = [...mealTypes, newMeal];
    setMealTypes(updated);
    localStorage.setItem('mealTypes', JSON.stringify(updated));
  };
  
  const updateMealType = (id, field, value) => {
    const updated = mealTypes.map(m => 
      m.id === id ? { ...m, [field]: field === 'name' ? value : parseFloat(value) || 0 } : m
    );
    setMealTypes(updated);
    localStorage.setItem('mealTypes', JSON.stringify(updated));
  };
  
  const deleteMealType = (id) => {
    const updated = mealTypes.filter(m => m.id !== id);
    setMealTypes(updated);
    localStorage.setItem('mealTypes', JSON.stringify(updated));
  };
  
  const updateConversion = (macro, value) => {
    const updated = { ...conversions, [macro]: parseFloat(value) || 1 };
    setConversions(updated);
    localStorage.setItem('conversions', JSON.stringify(updated));
  };
  
  const deleteRecipe = (id) => {
    const updated = savedMeals.filter(m => m.id !== id);
    setSavedMeals(updated);
    localStorage.setItem('savedMeals', JSON.stringify(updated));
  };
  
  const loadRecipe = (recipe) => {
    setSelectedFoods(recipe.foods);
    setSelectedMealType(recipe.type);
    setActiveTab('calendar');
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
    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '6rem' }}>
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
              <div key={meal.id} style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '0.875rem',
                transition: 'all 0.2s'
              }}>
                <button
                  onClick={() => setExpandedMeal(expandedMeal === meal.id ? null : meal.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.875rem' }}>{meal.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{meal.time}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMeal(meal.id);
                        }}
                        style={{
                          color: '#ef4444',
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Eliminar
                      </button>
                      {expandedMeal === meal.id ? 
                        <ChevronUp size={18} style={{ color: '#6b7280' }} /> : 
                        <ChevronDown size={18} style={{ color: '#6b7280' }} />
                      }
                    </div>
                  </div>
                </button>
                
                {expandedMeal === meal.id && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                    {meal.foods.map((food, idx) => (
                      <div key={idx} style={{ background: '#f3f4f6', borderRadius: '0.5rem', padding: '0.5rem', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '0.875rem' }}>{food.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{food.amount}</div>
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
                  <MacroTag carbs={food.carbs} fats={food.fats} protein={food.protein} />
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
    const goals = mealTypeGoals[selectedMealType] || { carbs: 0, protein: 0, fats: 0 };
    const selectedTotals = selectedFoods.reduce((sum, f) => ({
      carbs: sum.carbs + (f.carbs * f.quantity),
      protein: sum.protein + (f.protein * f.quantity),
      fats: sum.fats + (f.fats * f.quantity)
    }), { carbs: 0, protein: 0, fats: 0 });
    
    return (
      <div style={{ paddingBottom: '6rem' }}>
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
            {mealTypes.map(meal => (
              <option key={meal.id} value={meal.name}>{meal.name}</option>
            ))}
          </select>
          
          <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Objetivo:</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>
              {goals.carbs}H | {goals.protein}P | {goals.fats}G
            </div>
          </div>
        </div>

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
                border: macroFilters.carbs ? '2px solid rgb(34, 197, 94)' : '1px solid rgba(34, 197, 94, 0.3)',
                cursor: 'pointer'
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
                border: macroFilters.protein ? '2px solid rgb(59, 130, 246)' : '1px solid rgba(59, 130, 246, 0.3)',
                cursor: 'pointer'
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
                border: macroFilters.fats ? '2px solid rgb(245, 158, 11)' : '1px solid rgba(245, 158, 11, 0.3)',
                cursor: 'pointer'
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
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  {food.label}
                </span>
              </div>
            ))}
          </div>
        </div>

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
                <div>
                  <div style={{ 
                    fontSize: '1rem', 
                    fontWeight: '700', 
                    color: 'rgb(22, 163, 74)',
                    marginBottom: '0.25rem'
                  }}>
                    Hidratos: {(selectedTotals.carbs / conversions.carbs).toFixed(1)} / {goals.carbs}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {Math.round(selectedTotals.carbs)}g / {Math.round(goals.carbs * conversions.carbs)}g
                  </div>
                </div>
                
                <div>
                  <div style={{ 
                    fontSize: '1rem', 
                    fontWeight: '700', 
                    color: 'rgb(37, 99, 235)',
                    marginBottom: '0.25rem'
                  }}>
                    Proteínas: {(selectedTotals.protein / conversions.protein).toFixed(1)} / {goals.protein}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {Math.round(selectedTotals.protein)}g / {Math.round(goals.protein * conversions.protein)}g
                  </div>
                </div>
                
                <div>
                  <div style={{ 
                    fontSize: '1rem', 
                    fontWeight: '700', 
                    color: 'rgb(217, 119, 6)',
                    marginBottom: '0.25rem'
                  }}>
                    Grasas: {(selectedTotals.fats / conversions.fats).toFixed(1)} / {goals.fats}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {Math.round(selectedTotals.fats)}g / {Math.round(goals.fats * conversions.fats)}g
                  </div>
                </div>
              </div>
            </div>

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
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', display: 'block', marginBottom: '0.5rem' }}>
                  ⏱️ Tiempo invertido:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['poco', 'medio', 'mucho'].map(time => (
                    <button
                      key={time}
                      onClick={() => setTimeInvested(time)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        border: timeInvested === time ? '2px solid #a855f7' : '1px solid #d1d5db',
                        background: timeInvested === time ? 'rgba(168, 85, 247, 0.1)' : 'white',
                        color: timeInvested === time ? '#9333ea' : '#6b7280',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
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

  const MyRecipesTab = () => {
    const toggleRecipeTimeFilter = (time) => {
      setRecipeFilters(prev => ({
        ...prev,
        time: { ...prev.time, [time]: !prev.time[time] }
      }));
    };
    
    const toggleRecipeMacroFilter = (macro) => {
      setRecipeFilters(prev => ({
        ...prev,
        macros: { ...prev.macros, [macro]: !prev.macros[macro] }
      }));
    };
    
    const filteredRecipes = savedMeals.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(recipeSearchTerm.toLowerCase());
      
      const timeFiltersActive = recipeFilters.time.poco || recipeFilters.time.medio || recipeFilters.time.mucho;
      const matchesTime = !timeFiltersActive || recipeFilters.time[recipe.timeInvested];
      
      const totals = recipe.foods.reduce((sum, f) => ({
        carbs: sum.carbs + (f.carbs * f.quantity),
        protein: sum.protein + (f.protein * f.quantity),
        fats: sum.fats + (f.fats * f.quantity)
      }), { carbs: 0, protein: 0, fats: 0 });
      
      const macroFiltersActive = recipeFilters.macros.carbs || recipeFilters.macros.protein || recipeFilters.macros.fats;
      let matchesMacros = !macroFiltersActive;
      
      if (macroFiltersActive) {
        const hasCarbs = recipeFilters.macros.carbs && totals.carbs > 50;
        const hasProtein = recipeFilters.macros.protein && totals.protein > 20;
        const hasFats = recipeFilters.macros.fats && totals.fats > 10;
        matchesMacros = hasCarbs || hasProtein || hasFats;
      }
      
      return matchesSearch && matchesTime && matchesMacros;
    });
    
    return (
      <div style={{ paddingBottom: '6rem' }}>
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '1rem',
          padding: '1.25rem',
          marginBottom: '1rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
            📖 Mis Recetas Guardadas
          </h2>
          
          <input
            type="text"
            placeholder="Buscar receta por nombre..."
            value={recipeSearchTerm}
            onChange={(e) => setRecipeSearchTerm(e.target.value)}
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
              ⏱️ Tiempo de preparación:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {['poco', 'medio', 'mucho'].map(time => (
                <button
                  key={time}
                  onClick={() => toggleRecipeTimeFilter(time)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    background: recipeFilters.time[time] ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.1)',
                    color: recipeFilters.time[time] ? 'rgb(147, 51, 234)' : 'rgb(168, 85, 247)',
                    border: recipeFilters.time[time] ? '2px solid rgb(168, 85, 247)' : '1px solid rgba(168, 85, 247, 0.3)',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {time} {recipeFilters.time[time] && '✓'}
                </button>
              ))}
            </div>
            
            <div style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: '600', marginBottom: '0.5rem' }}>
              🎯 Tipo de macros:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => toggleRecipeMacroFilter('carbs')}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: recipeFilters.macros.carbs ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.1)',
                  color: recipeFilters.macros.carbs ? 'rgb(21, 128, 61)' : 'rgb(22, 163, 74)',
                  border: recipeFilters.macros.carbs ? '2px solid rgb(34, 197, 94)' : '1px solid rgba(34, 197, 94, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Alto en Hidratos {recipeFilters.macros.carbs && '✓'}
              </button>
              <button
                onClick={() => toggleRecipeMacroFilter('protein')}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: recipeFilters.macros.protein ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.1)',
                  color: recipeFilters.macros.protein ? 'rgb(29, 78, 216)' : 'rgb(37, 99, 235)',
                  border: recipeFilters.macros.protein ? '2px solid rgb(59, 130, 246)' : '1px solid rgba(59, 130, 246, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Alto en Proteína {recipeFilters.macros.protein && '✓'}
              </button>
              <button
                onClick={() => toggleRecipeMacroFilter('fats')}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: recipeFilters.macros.fats ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.1)',
                  color: recipeFilters.macros.fats ? 'rgb(180, 83, 9)' : 'rgb(217, 119, 6)',
                  border: recipeFilters.macros.fats ? '2px solid rgb(245, 158, 11)' : '1px solid rgba(245, 158, 11, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Alto en Grasas {recipeFilters.macros.fats && '✓'}
              </button>
            </div>
          </div>
        </div>
        
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '1rem',
          padding: '1.25rem',
          marginBottom: '1rem'
        }}>
          {filteredRecipes.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem 0', fontSize: '0.875rem' }}>
              {savedMeals.length === 0 
                ? 'No tienes recetas guardadas. Crea una en "Planificar" y guárdala.'
                : 'No se encontraron recetas con estos filtros.'
              }
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredRecipes.map(recipe => {
              const totals = recipe.foods.reduce((sum, f) => ({
                carbs: sum.carbs + (f.carbs * f.quantity),
                protein: sum.protein + (f.protein * f.quantity),
                fats: sum.fats + (f.fats * f.quantity)
              }), { carbs: 0, protein: 0, fats: 0 });
              
              const timeColors = {
                poco: { bg: '#dcfce7', text: '#16a34a', border: '#86efac' },
                medio: { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' },
                mucho: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' }
              };
              
              const timeColor = timeColors[recipe.timeInvested] || timeColors.medio;
              
              return (
                <div key={recipe.id} style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                        {recipe.name}
                      </h3>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          background: 'linear-gradient(135deg, #e0e7ff, #dbeafe)',
                          color: '#3b82f6',
                          borderRadius: '9999px',
                          fontWeight: '600'
                        }}>
                          {recipe.type}
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          background: timeColor.bg,
                          color: timeColor.text,
                          border: `1px solid ${timeColor.border}`,
                          borderRadius: '9999px',
                          fontWeight: '600',
                          textTransform: 'capitalize'
                        }}>
                          ⏱️ {recipe.timeInvested}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => loadRecipe(recipe)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: 'white',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Cargar
                      </button>
                      <button
                        onClick={() => deleteRecipe(recipe.id)}
                        style={{
                          padding: '0.5rem',
                          background: '#fee2e2',
                          color: '#dc2626',
                          borderRadius: '0.5rem',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'white',
                    borderRadius: '0.5rem',
                    marginBottom: '0.75rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'rgb(22, 163, 74)' }}>
                        {(totals.carbs / conversions.carbs).toFixed(1)}
                      </div>
                      <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>H ({Math.round(totals.carbs)}g)</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'rgb(37, 99, 235)' }}>
                        {(totals.protein / conversions.protein).toFixed(1)}
                      </div>
                      <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>P ({Math.round(totals.protein)}g)</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'rgb(217, 119, 6)' }}>
                        {(totals.fats / conversions.fats).toFixed(1)}
                      </div>
                      <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>G ({Math.round(totals.fats)}g)</div>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Ingredientes:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {recipe.foods.map((food, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem',
                        background: 'white',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                          <span style={{ fontWeight: '600', color: '#1f2937' }}>{food.name}</span>
                          <span style={{ color: '#6b7280' }}>x{food.quantity}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <span style={{
                            padding: '0.125rem 0.25rem',
                            borderRadius: '0.25rem',
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: 'rgb(22, 163, 74)',
                            fontSize: '0.625rem',
                            fontWeight: '600'
                          }}>
                            {(food.carbs * food.quantity / conversions.carbs).toFixed(1)}H
                          </span>
                          <span style={{
                            padding: '0.125rem 0.25rem',
                            borderRadius: '0.25rem',
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: 'rgb(37, 99, 235)',
                            fontSize: '0.625rem',
                            fontWeight: '600'
                          }}>
                            {(food.protein * food.quantity / conversions.protein).toFixed(1)}P
                          </span>
                          <span style={{
                            padding: '0.125rem 0.25rem',
                            borderRadius: '0.25rem',
                            background: 'rgba(245, 158, 11, 0.1)',
                            color: 'rgb(217, 119, 6)',
                            fontSize: '0.625rem',
                            fontWeight: '600'
                          }}>
                            {(food.fats * food.quantity / conversions.fats).toFixed(1)}G
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div style={{ paddingBottom: '6rem' }}>
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        padding: '1.25rem',
        marginBottom: '1rem'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          ⚙️ Conversiones de Macros
        </h2>
        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
          Define cuántos gramos equivalen a 1 unidad de cada macro
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#16a34a', display: 'block', marginBottom: '0.5rem' }}>
              1 Unidad de Hidratos =
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="number"
                value={conversions.carbs}
                onChange={(e) => updateConversion('carbs', e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '2px solid #16a34a',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
                min="1"
              />
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>gramos</span>
            </div>
          </div>
          
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#2563eb', display: 'block', marginBottom: '0.5rem' }}>
              1 Unidad de Proteína =
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="number"
                value={conversions.protein}
                onChange={(e) => updateConversion('protein', e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '2px solid #2563eb',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
                min="1"
              />
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>gramos</span>
            </div>
          </div>
          
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d97706', display: 'block', marginBottom: '0.5rem' }}>
              1 Unidad de Grasa =
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="number"
                value={conversions.fats}
                onChange={(e) => updateConversion('fats', e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '2px solid #d97706',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
                min="1"
              />
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>gramos</span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        padding: '1.25rem',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
            🍽️ Tipos de Comidas
          </h2>
          <button
            onClick={addMealType}
            style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            + Añadir
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {mealTypes.map(meal => (
            <div key={meal.id} style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem'
            }}>
              {editingMealType === meal.id ? (
                <>
                  <input
                    type="text"
                    value={meal.name}
                    onChange={(e) => updateMealType(meal.id, 'name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      marginBottom: '0.75rem',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.625rem', color: '#16a34a', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                        Hidratos
                      </label>
                      <input
                        type="number"
                        value={meal.carbs}
                        onChange={(e) => updateMealType(meal.id, 'carbs', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '2px solid #16a34a',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                        step="0.5"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.625rem', color: '#2563eb', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                        Proteína
                      </label>
                      <input
                        type="number"
                        value={meal.protein}
                        onChange={(e) => updateMealType(meal.id, 'protein', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '2px solid #2563eb',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                        step="0.5"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.625rem', color: '#d97706', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                        Grasa
                      </label>
                      <input
                        type="number"
                        value={meal.fats}
                        onChange={(e) => updateMealType(meal.id, 'fats', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '2px solid #d97706',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                        step="0.5"
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setEditingMealType(null)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        background: '#10b981',
                        color: 'white',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => deleteMealType(meal.id)}
                      style={{
                        padding: '0.5rem',
                        background: '#ef4444',
                        color: 'white',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
                      {meal.name}
                    </h3>
                    <button
                      onClick={() => setEditingMealType(meal.id)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        background: '#f3f4f6',
                        color: '#374151',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Editar
                    </button>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    <span style={{ color: '#16a34a', fontWeight: '600' }}>{meal.carbs}H</span> | 
                    <span style={{ color: '#2563eb', fontWeight: '600' }}> {meal.protein}P</span> | 
                    <span style={{ color: '#d97706', fontWeight: '600' }}> {meal.fats}G</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'home', label: 'Mi Día', icon: Home },
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'calendar', label: 'Planificar', icon: Calendar },
    { id: 'recipes', label: 'Recetas', icon: () => <span style={{ fontSize: '22px' }}>📖</span> },
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
        {activeTab === 'recipes' && <MyRecipesTab />}
        {activeTab === 'settings' && <SettingsTab />}
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
            const isEmoji = tab.id === 'recipes';
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
                {isEmoji ? <Icon /> : <Icon size={22} />}
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