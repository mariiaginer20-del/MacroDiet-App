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
    { id: 1, name: 'Patata', amount: '130g', carbs: 24, fats: 0.1, protein: 2.5 },
    { id: 2, name: 'Arroz/Pasta/Quinoa', amount: '30g', carbs: 24, fats: 0.3, protein: 2.5 },
    { id: 3, name: 'Boniato', amount: '120g', carbs: 24, fats: 0.1, protein: 2 },
    { id: 23, name: 'Pescado blanco', amount: '120g', carbs: 0, fats: 2, protein: 22 },
    { id: 39, name: 'AOVE', amount: '12g', carbs: 0, fats: 10, protein: 0 },
    { id: 68, name: 'Huevo', amount: '1ud', carbs: 1, fats: 5, protein: 11 },
  ];

  useEffect(() => {
    const savedMealsData = localStorage.getItem('meals');
    if (savedMealsData) setMeals(JSON.parse(savedMealsData));
    
    const savedRecipes = localStorage.getItem('savedMeals');
    if (savedRecipes) setSavedMeals(JSON.parse(savedRecipes));
    
    const savedMealTypes = localStorage.getItem('mealTypes');
    if (savedMealTypes) setMealTypes(JSON.parse(savedMealTypes));
    
    const savedConversions = localStorage.getItem('conversions');
    if (savedConversions) setConversions(JSON.parse(savedConversions));
  }, []);

  const toggleMacroFilter = (macro) => {
    setMacroFilters(prev => ({ ...prev, [macro]: !prev[macro] }));
  };

  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!macroFilters.carbs && !macroFilters.fats && !macroFilters.protein) return matchesSearch;
    const hasCarbs = macroFilters.carbs && food.carbs > 10;
    const hasFats = macroFilters.fats && food.fats > 5;
    const hasProtein = macroFilters.protein && food.protein > 5;
    return matchesSearch && (hasCarbs || hasFats || hasProtein);
  });

  const addFoodToMeal = (food) => {
    const newMeal = {
      id: Date.now(),
      name: 'Comida rápida',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      foods: [{ ...food, quantity: 1 }]
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

  const getTotalMacros = () => {
    return meals.reduce((total, meal) => {
      meal.foods.forEach(food => {
        const qty = food.quantity || 1;
        total.carbs += (food.carbs * qty) / conversions.carbs || 0;
        total.fats += (food.fats * qty) / conversions.fats || 0;
        total.protein += (food.protein * qty) / conversions.protein || 0;
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

  const ProgressBar = ({ current, goal, color }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    const colorMap = {
      'bg-green-500': 'linear-gradient(90deg, rgb(34, 197, 94), rgb(74, 222, 128))',
      'bg-blue-500': 'linear-gradient(90deg, rgb(59, 130, 246), rgb(96, 165, 250))',
      'bg-amber-500': 'linear-gradient(90deg, rgb(245, 158, 11), rgb(251, 191, 36))',
    };
    
    return (
      <div style={{ width: '100%', height: '0.5rem', background: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: colorMap[color], width: `${percentage}%`, transition: 'width 0.5s ease', borderRadius: '9999px' }} />
      </div>
    );
  };

  const tabs = [
    { id: 'home', label: 'Mi Día', icon: Home },
    { id: 'search', label: 'Alimentos', icon: Search },
    { id: 'calendar', label: 'Comidas', icon: Calendar },
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

        {activeTab === 'home' && (
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
                textAlign: 'center',
                color: '#1f2937'
              }}>
                📊 Resumen del Día
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>
                    {totals.carbs.toFixed(1)} <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>/ {dailyGoals.carbs}</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Hidratos</div>
                  <ProgressBar current={totals.carbs} goal={dailyGoals.carbs} color="bg-green-500" />
                </div>

                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>
                    {totals.protein.toFixed(1)} <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>/ {dailyGoals.protein}</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Proteína</div>
                  <ProgressBar current={totals.protein} goal={dailyGoals.protein} color="bg-blue-500" />
                </div>

                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>
                    {totals.fats.toFixed(1)} <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>/ {dailyGoals.fats}</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Grasa</div>
                  <ProgressBar current={totals.fats} goal={dailyGoals.fats} color="bg-amber-500" />
                </div>
              </div>
            </div>

            <div style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '1rem',
              padding: '1.25rem'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
                Comidas de Hoy
              </h3>
              {meals.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem 0' }}>
                  No hay comidas registradas
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {meals.map(meal => (
                    <div key={meal.id} style={{
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      padding: '0.875rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1f2937' }}>{meal.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{meal.time}</div>
                        </div>
                        <button
                          onClick={() => deleteMeal(meal.id)}
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
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div style={{ paddingBottom: '6rem' }}>
            <div style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '1rem',
              padding: '1.25rem',
              marginBottom: '1rem'
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filteredFoods.map(food => (
                  <div key={food.id} style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    padding: '0.875rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937' }}>{food.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{food.amount}</div>
                      </div>
                      <button
                        onClick={() => addFoodToMeal(food)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.75rem',
                          background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                          color: 'white',
                          borderRadius: '0.5rem',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        + Añadir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recipes' && (
          <div style={{ paddingBottom: '6rem', textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ color: '#6b7280' }}>Sección de recetas (próximamente)</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ paddingBottom: '6rem', textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ color: '#6b7280' }}>Ajustes (próximamente)</p>
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