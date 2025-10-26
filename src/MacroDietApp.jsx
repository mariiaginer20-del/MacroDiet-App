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
 // HIDRATOS (H:1)
    { id: 1, name: 'Patata', amount: '130g', carbs: 24, fats: 0.1, protein: 2.5, label: 'H:1' },
    { id: 2, name: 'Arroz/Pasta/Quinoa', amount: '30g', carbs: 24, fats: 0.3, protein: 2.5, label: 'H:1' },
    { id: 3, name: 'Boniato', amount: '120g', carbs: 24, fats: 0.1, protein: 2, label: 'H:1' },
    { id: 4, name: 'Korn Flakes', amount: '30g', carbs: 24, fats: 0.3, protein: 2, label: 'H:1' },
    { id: 5, name: 'Copos/Harina Avena', amount: '30g', carbs: 24, fats: 2, protein: 4, label: 'H:1' },
    { id: 6, name: 'Harina Trigo/Espelta', amount: '30g', carbs: 24, fats: 0.4, protein: 3, label: 'H:1' },
    { id: 7, name: 'Cereales sin azÃºcar', amount: '25g', carbs: 24, fats: 0.5, protein: 2, label: 'H:1' },
    { id: 8, name: 'Fruta (pieza)', amount: '1ud', carbs: 24, fats: 0.3, protein: 1, label: 'H:1' },
    { id: 9, name: 'Zumo de naranja', amount: '230ml', carbs: 24, fats: 0, protein: 1.5, label: 'H:1' },
    { id: 10, name: 'DÃ¡tiles/Fruta desecada', amount: '35g', carbs: 24, fats: 0.2, protein: 1, label: 'H:1' },
    { id: 11, name: 'Mermelada con azÃºcar', amount: '50g', carbs: 24, fats: 0, protein: 0.3, label: 'H:1' },
    { id: 12, name: 'Miel', amount: '25g', carbs: 24, fats: 0, protein: 0.1, label: 'H:1' },
    { id: 13, name: 'Gnocchi de patata', amount: '60g', carbs: 24, fats: 0.5, protein: 3, label: 'H:1' },
    { id: 14, name: 'Pan', amount: '40g', carbs: 24, fats: 1, protein: 3.5, label: 'H:1' },
    { id: 15, name: 'Pan de molde Bimbo', amount: '2 rebanadas', carbs: 24, fats: 1.5, protein: 3, label: 'H:1' },
    { id: 16, name: 'Pan de molde integral', amount: '1.5 rebanadas', carbs: 24, fats: 1.5, protein: 4, label: 'H:1' },
    { id: 17, name: 'Tortilla de trigo', amount: '1ud', carbs: 24, fats: 2, protein: 3, label: 'H:1' },
    { id: 18, name: 'Tortitas arroz/maÃ­z', amount: '25g', carbs: 24, fats: 0.5, protein: 2, label: 'H:1' },
    { id: 19, name: 'MaÃ­z dulce (lata)', amount: '125g', carbs: 24, fats: 1, protein: 3, label: 'H:1' },
    { id: 20, name: 'Palomitas Popitas Zero', amount: '30g', carbs: 24, fats: 1.5, protein: 3, label: 'H:1' },
    { id: 21, name: 'Papilla de cereales', amount: '2g', carbs: 24, fats: 0.5, protein: 2, label: 'H:1' },
    { id: 22, name: 'AzÃºcar de mesa', amount: '25g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
    
    // PROTEÃNA (P:1)
    { id: 23, name: 'Pescado blanco', amount: '120g', carbs: 0, fats: 2, protein: 22, label: 'P:1' },
    { id: 24, name: 'Molusco', amount: '120g', carbs: 0, fats: 2, protein: 22, label: 'P:1' },
    { id: 25, name: 'Marisco', amount: '65g', carbs: 0, fats: 1.5, protein: 22, label: 'P:1' },
    { id: 26, name: 'AtÃºn lata al natural', amount: '100g', carbs: 0, fats: 1, protein: 22, label: 'P:1' },
    { id: 27, name: 'Claras de huevo', amount: '200g', carbs: 1, fats: 0.2, protein: 22, label: 'P:1' },
    { id: 28, name: 'ProteÃ­na de suero', amount: '30g', carbs: 2, fats: 0.5, protein: 22, label: 'P:1' },
    { id: 29, name: 'Pechuga pollo/pavo', amount: '100g', carbs: 0, fats: 2, protein: 22, label: 'P:1' },
    { id: 30, name: 'Carne roja magra', amount: '90g', carbs: 0, fats: 3, protein: 22, label: 'P:1' },
    { id: 31, name: 'Embutido sin grasa', amount: '50g', carbs: 0, fats: 2, protein: 22, label: 'P:1' },
    { id: 32, name: 'Queso Eatlean', amount: '60g', carbs: 0, fats: 2, protein: 22, label: 'P:1' },
    { id: 33, name: 'Yogur+proteÃ­nas natural', amount: '200g', carbs: 4, fats: 0.5, protein: 22, label: 'P:1' },
    { id: 34, name: 'Soja texturizada', amount: '30g', carbs: 2, fats: 1, protein: 22, label: 'P:1' },
    { id: 35, name: 'Heura (bocados/tiras)', amount: '75g', carbs: 2, fats: 3, protein: 22, label: 'P:1' },
    { id: 36, name: 'SeitÃ¡n', amount: '100g', carbs: 4, fats: 2, protein: 22, label: 'P:1' },
    { id: 37, name: 'Levadura nutricional', amount: '35g', carbs: 3, fats: 1, protein: 22, label: 'P:1' },
    { id: 38, name: 'Aislado proteÃ­na vegetal', amount: '30g', carbs: 1, fats: 0.5, protein: 22, label: 'P:1' },
    
    // GRASA (G:1)
    { id: 39, name: 'AOVE (cuchara sopera)', amount: '12g', carbs: 0, fats: 10, protein: 0, label: 'G:1' },
    { id: 40, name: 'Frutos secos', amount: '15g', carbs: 2, fats: 10, protein: 3, label: 'G:1' },
    { id: 41, name: 'Cacahuete/Crema', amount: '15g', carbs: 2, fats: 10, protein: 4, label: 'G:1' },
    { id: 42, name: 'Pipas calabaza/girasol', amount: '20g', carbs: 2, fats: 10, protein: 4, label: 'G:1' },
    { id: 43, name: 'Semillas lino/chÃ­a', amount: '20g', carbs: 2, fats: 10, protein: 4, label: 'G:1' },
    { id: 44, name: 'Aceitunas sin hueso', amount: '60g', carbs: 1, fats: 10, protein: 1, label: 'G:1' },
    { id: 45, name: 'Coco', amount: '30g', carbs: 2, fats: 10, protein: 1, label: 'G:1' },
    { id: 46, name: 'Aguacate', amount: '60g', carbs: 2, fats: 10, protein: 1.5, label: 'G:1' },
    { id: 47, name: 'Chocolate >85%', amount: '20g', carbs: 2, fats: 10, protein: 2, label: 'G:1' },
    { id: 48, name: 'Gazpacho sin pan', amount: '300ml', carbs: 3, fats: 10, protein: 1, label: 'G:1' },
    { id: 49, name: 'Bebida almendras zero', amount: '600ml', carbs: 2, fats: 10, protein: 1, label: 'G:1' },
    { id: 50, name: 'Mayonesa', amount: '20g', carbs: 0, fats: 10, protein: 0.5, label: 'G:1' },
    { id: 51, name: 'Yogur griego', amount: '80g', carbs: 3, fats: 10, protein: 5, label: 'G:1' },
    { id: 52, name: 'Queso curado/semicurado', amount: '25g', carbs: 0, fats: 10, protein: 6, label: 'G:1' },
    { id: 53, name: 'Tahini', amount: '15g', carbs: 1, fats: 10, protein: 3, label: 'G:1' },
    
    // 0.5P + 0.5H
    { id: 54, name: 'Salsa de soja', amount: '140g', carbs: 12, fats: 1, protein: 11, label: '0.5P+0.5H' },
    { id: 55, name: 'Leche desnatada', amount: '290ml', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 56, name: 'Leche+proteÃ­nas desnatada', amount: '230ml', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 57, name: 'Yogur+proteÃ­nas fresa', amount: '125g', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 58, name: 'Yogur+proteÃ­nas arÃ¡ndanos', amount: '200g', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 59, name: 'Yogur griego desnatado', amount: '170g', carbs: 12, fats: 1, protein: 11, label: '0.5P+0.5H' },
    { id: 60, name: 'Yogur desnatado', amount: '280g', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 61, name: 'Legumbres cocidas', amount: '120g', carbs: 12, fats: 1, protein: 11, label: '0.5P+0.5H' },
    { id: 62, name: 'Legumbres secas', amount: '30g', carbs: 12, fats: 1, protein: 11, label: '0.5P+0.5H' },
    { id: 63, name: 'Harina de garbanzo', amount: '30g', carbs: 12, fats: 1.5, protein: 11, label: '0.5P+0.5H' },
    { id: 64, name: 'Pasta lentejas rojas', amount: '30g', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 65, name: 'Alpro coco/avena', amount: '200ml', carbs: 12, fats: 2, protein: 11, label: '0.5P+0.5H' },
    
    // 0.5P + 0.5G
    { id: 66, name: 'Beyond Burger', amount: '40g', carbs: 1, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 67, name: 'Choriburguer Heura', amount: '65g', carbs: 1, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 68, name: 'Huevo', amount: '1ud (60-70g)', carbs: 1, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 69, name: 'Queso fresco Burgos', amount: '55g', carbs: 1, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 70, name: 'Mozzarella fresca', amount: '45g', carbs: 1, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 71, name: 'JamÃ³n serrano/lomo', amount: '40g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 72, name: 'Carne roja', amount: '35g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 73, name: 'Hamburguesa de pollo', amount: '70g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 74, name: 'Hamburguesa ternera', amount: '60g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 75, name: 'Carne picada vacuno', amount: '55g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 76, name: 'Carne picada cerdo', amount: '55g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 77, name: 'SalmÃ³n/AtÃºn fresco', amount: '55g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 78, name: 'AtÃºn en aceite', amount: '40g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 79, name: 'Ventresca de atÃºn', amount: '50g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 80, name: 'Anchoas en aceite', amount: '50g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 81, name: 'Bonito/Sardina fresco', amount: '80g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 82, name: 'Trucha/Pez espada', amount: '70g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 83, name: 'Tofu', amount: '100g', carbs: 2, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 84, name: 'Tempeh de soja', amount: '80g', carbs: 2, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 85, name: 'Edamame', amount: '80g', carbs: 2, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 86, name: 'Bebida soja sin azÃºcar', amount: '330ml', carbs: 2, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 87, name: 'Yogur Alpro Skyr', amount: '150g', carbs: 2, fats: 5, protein: 11, label: '0.5P+0.5G' },
    
    // 0.25H + 0.2P + 0.5G
    { id: 88, name: 'Leche entera', amount: '165ml', carbs: 6, fats: 5, protein: 4.4, label: '0.25H+0.2P+0.5G' },
    { id: 89, name: 'KÃ©fir', amount: '150ml', carbs: 6, fats: 5, protein: 4.4, label: '0.25H+0.2P+0.5G' },
    { id: 90, name: 'Yogur natural', amount: '165g', carbs: 6, fats: 5, protein: 4.4, label: '0.25H+0.2P+0.5G' },
    { id: 91, name: 'Bebida soja calcio', amount: '230ml', carbs: 6, fats: 5, protein: 4.4, label: '0.25H+0.2P+0.5G' },
    
    // 0.5H + 0.25P + 0.25G
    { id: 92, name: 'Leche semidesnatada', amount: '220ml', carbs: 12, fats: 2.5, protein: 5.5, label: '0.5H+0.25P+0.25G' },
    
    // 0.25H + 0.5P + 0.25G
    { id: 93, name: 'Cacahuete polvo desgraso', amount: '25g', carbs: 6, fats: 2.5, protein: 11, label: '0.25H+0.5P+0.25G' },
    { id: 94, name: 'Cacao puro desgrasado', amount: '25g', carbs: 6, fats: 2.5, protein: 11, label: '0.25H+0.5P+0.25G' },
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