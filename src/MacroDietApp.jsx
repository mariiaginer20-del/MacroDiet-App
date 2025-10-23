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
    const savedMeals = localStorage.getItem('meals');
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
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
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
          C:{Math.round(carbs)}g
        </span>
      )}
      {fats > 0 && (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
          G:{Math.round(fats)}g
        </span>
      )}
      {protein > 0 && (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
          P:{Math.round(protein)}g
        </span>
      )}
    </div>
  );

  const ProgressBar = ({ current, goal, color }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    return (
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  const HomeTab = () => (
    <div className="space-y-4 pb-24">
      <div className="summary-card">
        <h2 className="text-xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-800">
          <span>📊</span> Resumen del Día
        </h2>
        
        {/* Grid 2x2 de macros */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-4xl font-bold text-green-600 mb-1">
              {Math.round(totals.carbs)}.0 <span className="text-gray-600 text-2xl">/ {dailyGoals.carbs}</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">Unidades Hidratos</div>
            <ProgressBar current={totals.carbs} goal={dailyGoals.carbs} color="bg-green-500" />
            <div className="text-sm text-gray-800 font-semibold mt-2">Quedan {Math.round(remaining.carbs)}.0</div>
          </div>

          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {Math.round(totals.protein)}.0 <span className="text-gray-600 text-2xl">/ {dailyGoals.protein}</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">Unidades Proteína</div>
            <ProgressBar current={totals.protein} goal={dailyGoals.protein} color="bg-blue-500" />
            <div className="text-sm text-gray-800 font-semibold mt-2">Quedan {Math.round(remaining.protein)}.0</div>
          </div>

          <div>
            <div className="text-4xl font-bold text-amber-600 mb-1">
              {Math.round(totals.fats)}.0 <span className="text-gray-600 text-2xl">/ {dailyGoals.fats}</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">Unidades Grasa</div>
            <ProgressBar current={totals.fats} goal={dailyGoals.fats} color="bg-amber-500" />
            <div className="text-sm text-gray-800 font-semibold mt-2">Quedan {Math.round(remaining.fats)}.0</div>
          </div>

          <div>
            <div className="text-4xl font-bold text-purple-600 mb-1">
              0 <span className="text-gray-600 text-2xl">/ {dailyGoals.calories}</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">Calorías</div>
            <ProgressBar current={0} goal={dailyGoals.calories} color="bg-purple-500" />
            <div className="text-sm text-gray-800 font-semibold mt-2">Quedan {dailyGoals.calories}</div>
          </div>
        </div>

        {/* Equivalente en gramos */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-gray-800">
            <span>📏</span> Equivalente en gramos
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-green-600">
                {Math.round(totals.carbs)}g <span className="text-sm text-gray-500">/ 217g</span>
              </div>
              <div className="text-xs text-gray-600 mt-1 mb-2">Hidratos consumidos</div>
              <div className="text-sm font-bold text-gray-800">Quedan 217g</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600">
                {Math.round(totals.protein)}g <span className="text-sm text-gray-500">/ 65g</span>
              </div>
              <div className="text-xs text-gray-600 mt-1 mb-2">Proteína consumida</div>
              <div className="text-sm font-bold text-gray-800">Quedan 65g</div>
            </div>
            <div>
              <div className="text-xl font-bold text-amber-600">
                {Math.round(totals.fats)}g <span className="text-sm text-gray-500">/ 64g</span>
              </div>
              <div className="text-xs text-gray-600 mt-1 mb-2">Grasa consumida</div>
              <div className="text-sm font-bold text-gray-800">Quedan 64g</div>
            </div>
          </div>
        </div>
      </div>

      {/* Comidas registradas */}
      <div className="card">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Comidas de Hoy</h3>
        {meals.length === 0 ? (
          <p className="text-gray-500 text-center py-8 text-sm">No hay comidas registradas</p>
        ) : (
          <div className="space-y-2">
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
    <div className="space-y-4 pb-24">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Buscar Alimentos</h2>
        
        <input
          type="text"
          placeholder="Buscar alimento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4"
        />

        <div className="mb-4">
          <div className="text-xs text-gray-600 mb-2 font-semibold">Filtrar por:</div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => toggleMacroFilter('carbs')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                macroFilters.carbs
                  ? 'bg-green-500/30 text-green-700 border-2 border-green-500'
                  : 'bg-green-500/10 text-green-600 border border-green-500/30'
              }`}
            >
              Hidratos
            </button>
            <button
              onClick={() => toggleMacroFilter('protein')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                macroFilters.protein
                  ? 'bg-blue-500/30 text-blue-700 border-2 border-blue-500'
                  : 'bg-blue-500/10 text-blue-600 border border-blue-500/30'
              }`}
            >
              Proteínas
            </button>
            <button
              onClick={() => toggleMacroFilter('fats')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                macroFilters.fats
                  ? 'bg-amber-500/30 text-amber-700 border-2 border-amber-500'
                  : 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
              }`}
            >
              Grasas
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filteredFoods.map(food => (
            <div key={food.id} className="food-item">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-semibold text-gray-800 text-sm">{food.name}</div>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 text-gray-700 flex-shrink-0">
                      {food.label}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{food.amount}</div>
                  <MacroTag carbs={food.carbs} fats={food.fats} protein={food.protein} />
                </div>
                <button
                  onClick={() => addFoodToMeal(food, 'Comida rápida')}
                  className="btn-primary text-xs px-3 py-2 flex-shrink-0 flex items-center gap-1"
                >
                  <Plus size={14} />
                  Añadir
                </button>
              </div>
            </div>
          ))}
          {filteredFoods.length === 0 && (
            <p className="text-gray-500 text-center py-8 text-sm">No se encontraron alimentos</p>
          )}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'calendar', label: 'Calendario', icon: Calendar },
    { id: 'settings', label: 'Ajustes', icon: Settings }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
          Macro Diet
        </h1>

        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'calendar' && (
          <div className="card pb-24">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Planificación</h2>
            <p className="text-gray-500 text-center py-8 text-sm">Próximamente...</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="card pb-24">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Ajustes</h2>
            <p className="text-gray-500 text-center py-8 text-sm">Próximamente...</p>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 max-w-md mx-auto">
        <div className="flex justify-around">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'text-purple-600'
                    : 'text-gray-500'
                }`}
              >
                <Icon size={22} />
                <span className="text-xs mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MacroDietApp;