import React, { useState, useEffect } from 'react';
import { Home, Search, Calendar, Settings, ChevronDown, ChevronUp } from 'lucide-react';

const MacroDietApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [foods, setFoods] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [macroFilters, setMacroFilters] = useState({
    carbs: false,
    fats: false,
    protein: false
  });
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [dailyGoals] = useState({
    carbs: 250,
    fats: 70,
    protein: 150
  });

  // Datos de ejemplo
  const foodDatabase = [
    { id: 1, name: 'Pechuga de Pollo', carbs: 0, fats: 3, protein: 31 },
    { id: 2, name: 'Arroz Blanco', carbs: 28, fats: 0.3, protein: 2.7 },
    { id: 3, name: 'Aguacate', carbs: 9, fats: 15, protein: 2 },
    { id: 4, name: 'Huevo', carbs: 1, fats: 10, protein: 13 },
    { id: 5, name: 'Plátano', carbs: 23, fats: 0.3, protein: 1.1 },
    { id: 6, name: 'Salmón', carbs: 0, fats: 13, protein: 20 },
    { id: 7, name: 'Almendras', carbs: 22, fats: 49, protein: 21 },
    { id: 8, name: 'Avena', carbs: 66, fats: 7, protein: 17 },
    { id: 9, name: 'Batata', carbs: 20, fats: 0.1, protein: 1.6 },
    { id: 10, name: 'Yogur Griego', carbs: 4, fats: 10, protein: 10 }
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
      foods: [{ ...food, amount: 100 }]
    };

    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
  };

  const getTotalMacros = () => {
    return meals.reduce((total, meal) => {
      meal.foods.forEach(food => {
        const multiplier = food.amount / 100;
        total.carbs += food.carbs * multiplier;
        total.fats += food.fats * multiplier;
        total.protein += food.protein * multiplier;
      });
      return total;
    }, { carbs: 0, fats: 0, protein: 0 });
  };

  const totals = getTotalMacros();
  const percentages = {
    carbs: (totals.carbs / dailyGoals.carbs) * 100,
    fats: (totals.fats / dailyGoals.fats) * 100,
    protein: (totals.protein / dailyGoals.protein) * 100
  };

  const DonutChart = ({ percentages }) => {
    const total = percentages.carbs + percentages.fats + percentages.protein;
    const circumference = 2 * Math.PI * 40;
    
    const carbsOffset = 0;
    const fatsOffset = (percentages.carbs / 300) * circumference;
    const proteinOffset = ((percentages.carbs + percentages.fats) / 300) * circumference;
    
    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg className="transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="10"/>
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke="rgba(239, 68, 68, 0.6)"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percentages.carbs / 300) * circumference}
            className="transition-all duration-500"
          />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - fatsOffset}
            className="transition-all duration-500"
          />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke="rgba(34, 197, 94, 0.6)"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - proteinOffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{Math.round(total / 3)}%</span>
          <span className="text-xs text-gray-400">Promedio</span>
        </div>
      </div>
    );
  };

  const MacroTag = ({ carbs, fats, protein, small = false }) => (
    <div className={`flex gap-2 ${small ? 'text-xs' : 'text-sm'}`}>
      {carbs > 0 && (
        <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
          C: {carbs}g
        </span>
      )}
      {fats > 0 && (
        <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
          G: {fats}g
        </span>
      )}
      {protein > 0 && (
        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
          P: {protein}g
        </span>
      )}
    </div>
  );

  const HomeTab = () => (
    <div className="space-y-6 pb-24">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-center">Resumen del Día</h2>
        <DonutChart percentages={percentages} />
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{Math.round(totals.carbs)}g</div>
            <div className="text-xs text-gray-400">Carbohidratos</div>
            <div className="text-xs text-gray-500">{dailyGoals.carbs}g meta</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{Math.round(totals.fats)}g</div>
            <div className="text-xs text-gray-400">Grasas</div>
            <div className="text-xs text-gray-500">{dailyGoals.fats}g meta</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{Math.round(totals.protein)}g</div>
            <div className="text-xs text-gray-400">Proteínas</div>
            <div className="text-xs text-gray-500">{dailyGoals.protein}g meta</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Comidas de Hoy</h3>
        {meals.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No hay comidas registradas</p>
        ) : (
          <div className="space-y-3">
            {meals.map(meal => (
              <div key={meal.id} className="meal-item">
                <button
                  onClick={() => setExpandedMeal(expandedMeal === meal.id ? null : meal.id)}
                  className="w-full"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left flex-1">
                      <div className="font-semibold text-white">{meal.name}</div>
                      <div className="text-xs text-gray-400">{meal.time}</div>
                    </div>
                    {expandedMeal === meal.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                
                {expandedMeal === meal.id && (
                  <div className="mt-4 space-y-2 border-t border-gray-700 pt-3">
                    {meal.foods.map((food, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-white">{food.name}</div>
                          <MacroTag {...food} small />
                        </div>
                        <div className="text-xs text-gray-400">{food.amount}g</div>
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
        <h2 className="text-2xl font-bold mb-4">Buscar Alimentos</h2>
        
        <input
          type="text"
          placeholder="Buscar alimento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4"
        />

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => toggleMacroFilter('carbs')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              macroFilters.carbs
                ? 'bg-red-500/30 text-red-300 border-2 border-red-500'
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}
          >
            Carbohidratos
          </button>
          <button
            onClick={() => toggleMacroFilter('fats')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              macroFilters.fats
                ? 'bg-blue-500/30 text-blue-300 border-2 border-blue-500'
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
            }`}
          >
            Grasas
          </button>
          <button
            onClick={() => toggleMacroFilter('protein')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              macroFilters.protein
                ? 'bg-green-500/30 text-green-300 border-2 border-green-500'
                : 'bg-green-500/10 text-green-400 border border-green-500/30'
            }`}
          >
            Proteínas
          </button>
        </div>

        <div className="space-y-2">
          {filteredFoods.map(food => (
            <div key={food.id} className="food-item">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-white mb-1">{food.name}</div>
                  <MacroTag {...food} small />
                </div>
                <button
                  onClick={() => addFoodToMeal(food, 'Comida rápida')}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Añadir
                </button>
              </div>
            </div>
          ))}
          {filteredFoods.length === 0 && (
            <p className="text-gray-400 text-center py-8">No se encontraron alimentos</p>
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
    <div className="max-w-md mx-auto min-h-screen bg-slate-900">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
          Macro Diet
        </h1>

        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'calendar' && (
          <div className="card pb-24">
            <h2 className="text-2xl font-bold mb-4">Calendario</h2>
            <p className="text-gray-400 text-center py-8">Próximamente...</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="card pb-24">
            <h2 className="text-2xl font-bold mb-4">Ajustes</h2>
            <p className="text-gray-400 text-center py-8">Próximamente...</p>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 px-4 py-2 max-w-md mx-auto">
        <div className="flex justify-around">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MacroDietApp;