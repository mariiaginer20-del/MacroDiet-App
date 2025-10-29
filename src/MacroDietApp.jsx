import React, { useState, useEffect } from 'react';
import { Home, Search, Calendar, Settings, ChevronDown, ChevronUp, Plus, BookOpen } from 'lucide-react';

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
    { id: 1, name: 'Patata', amount: '130g', carbs: 24, fats: 0.1, protein: 2.0, label: 'H:1' },
    { id: 2, name: 'Arroz/Pasta/Quinoa', amount: '30g', carbs: 24, fats: 0.5, protein: 2.5, label: 'H:1' },
    { id: 3, name: 'Boniato', amount: '120g', carbs: 24, fats: 0.1, protein: 1.6, label: 'H:1' },
    { id: 4, name: 'Korn Flakes', amount: '30g', carbs: 24, fats: 0.4, protein: 2.4, label: 'H:1' },
    { id: 5, name: 'Copos/Harina Avena', amount: '30g', carbs: 24, fats: 2.5, protein: 4, label: 'H:1' },
    { id: 6, name: 'Harina Trigo/Espelta', amount: '30g', carbs: 24, fats: 0.6, protein: 3.6, label: 'H:1' },
    { id: 7, name: 'Cereales sin azúcar', amount: '25g', carbs: 24, fats: 0.5, protein: 2.5, label: 'H:1' },
    { id: 8, name: 'Fruta (pieza)', amount: '1ud', carbs: 24, fats: 0.3, protein: 0.8, label: 'H:1' },
    { id: 9, name: 'Zumo de naranja', amount: '230ml', carbs: 24, fats: 0.5, protein: 1.7, label: 'H:1' },
    { id: 10, name: 'Dátiles/Fruta desecada', amount: '35g', carbs: 24, fats: 0.2, protein: 1, label: 'H:1' },
    { id: 11, name: 'Mermelada con azúcar', amount: '50g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
    { id: 12, name: 'Miel', amount: '25g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
    { id: 13, name: 'Gnocchi de patata', amount: '60g', carbs: 24, fats: 1, protein: 3, label: 'H:1' },
    { id: 14, name: 'Pan', amount: '40g', carbs: 24, fats: 1.2, protein: 3.8, label: 'H:1' },
    { id: 15, name: 'Pan de molde Bimbo', amount: '2 rebanadas', carbs: 24, fats: 1.6, protein: 4, label: 'H:1' },
    { id: 16, name: 'Pan de molde integral', amount: '1.5 rebanadas', carbs: 24, fats: 1.5, protein: 4.5, label: 'H:1' },
    { id: 17, name: 'Tortilla de trigo', amount: '1ud', carbs: 24, fats: 4, protein: 5.5, label: 'H:1' },
    { id: 18, name: 'Tortitas arroz/maíz', amount: '25g', carbs: 24, fats: 0.7, protein: 2, label: 'H:1' },
    { id: 19, name: 'Maíz dulce (lata)', amount: '125g', carbs: 24, fats: 1.5, protein: 3.5, label: 'H:1' },
    { id: 20, name: 'Palomitas Popitas Zero', amount: '30g', carbs: 24, fats: 3, protein: 3, label: 'H:1' },
    { id: 21, name: 'Papilla de cereales', amount: '2g', carbs: 24, fats: 0, protein: 0.1, label: 'H:1' },
    { id: 22, name: 'Azúcar de mesa', amount: '25g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
    { id: 23, name: 'Pescado blanco', amount: '120g', carbs: 0, fats: 2, protein: 22, label: 'P:1' },
    { id: 24, name: 'Molusco', amount: '120g', carbs: 0, fats: 2, protein: 22, label: 'P:1' },
    { id: 25, name: 'Marisco', amount: '65g', carbs: 0, fats: 1.5, protein: 22, label: 'P:1' },
    { id: 26, name: 'Atún lata al natural', amount: '100g', carbs: 0, fats: 1, protein: 22, label: 'P:1' },
    { id: 27, name: 'Claras de huevo', amount: '200g', carbs: 1, fats: 0.2, protein: 22, label: 'P:1' },
    { id: 28, name: 'Proteína de suero', amount: '30g', carbs: 2, fats: 0.5, protein: 22, label: 'P:1' },
    { id: 29, name: 'Pechuga pollo/pavo', amount: '100g', carbs: 0, fats: 2, protein: 22, label: 'P:1' },
    { id: 30, name: 'Carne roja magra', amount: '90g', carbs: 0, fats: 3, protein: 22, label: 'P:1' },
    { id: 31, name: 'Embutido sin grasa', amount: '50g', carbs: 0, fats: 2, protein: 22, label: 'P:1' },
    { id: 32, name: 'Queso Eatlean', amount: '60g', carbs: 0, fats: 2, protein: 22, label: 'P:1' },
    { id: 33, name: 'Yogur+proteínas natural', amount: '200g', carbs: 4, fats: 0.5, protein: 22, label: 'P:1' },
    { id: 34, name: 'Soja texturizada', amount: '30g', carbs: 2, fats: 1, protein: 22, label: 'P:1' },
    { id: 35, name: 'Heura (bocados/tiras)', amount: '75g', carbs: 2, fats: 3, protein: 22, label: 'P:1' },
    { id: 36, name: 'Seitán', amount: '100g', carbs: 4, fats: 2, protein: 22, label: 'P:1' },
    { id: 37, name: 'Levadura nutricional', amount: '35g', carbs: 3, fats: 1, protein: 22, label: 'P:1' },
    { id: 38, name: 'Aislado proteína vegetal', amount: '30g', carbs: 1, fats: 0.5, protein: 22, label: 'P:1' },
    { id: 39, name: 'AOVE (cuchara sopera)', amount: '12g', carbs: 0, fats: 10, protein: 0, label: 'G:1' },
    { id: 40, name: 'Frutos secos', amount: '15g', carbs: 2, fats: 10, protein: 3, label: 'G:1' },
    { id: 41, name: 'Cacahuete/Crema', amount: '15g', carbs: 2, fats: 10, protein: 4, label: 'G:1' },
    { id: 42, name: 'Pipas calabaza/girasol', amount: '20g', carbs: 2, fats: 10, protein: 4, label: 'G:1' },
    { id: 43, name: 'Semillas lino/chía', amount: '20g', carbs: 2, fats: 10, protein: 4, label: 'G:1' },
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
    { id: 54, name: 'Salsa de soja', amount: '140g', carbs: 12, fats: 1, protein: 11, label: '0.5P+0.5H' },
    { id: 55, name: 'Leche desnatada', amount: '290ml', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 56, name: 'Leche+proteínas desnatada', amount: '230ml', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 57, name: 'Yogur+proteínas fresa', amount: '125g', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 58, name: 'Yogur+proteínas ará¡ndanos', amount: '200g', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 59, name: 'Yogur griego desnatado', amount: '170g', carbs: 12, fats: 1, protein: 11, label: '0.5P+0.5H' },
    { id: 60, name: 'Yogur desnatado', amount: '280g', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 61, name: 'Legumbres cocidas', amount: '120g', carbs: 12, fats: 1, protein: 11, label: '0.5P+0.5H' },
    { id: 62, name: 'Legumbres secas', amount: '30g', carbs: 12, fats: 1, protein: 11, label: '0.5P+0.5H' },
    { id: 63, name: 'Harina de garbanzo', amount: '30g', carbs: 12, fats: 1.5, protein: 11, label: '0.5P+0.5H' },
    { id: 64, name: 'Pasta lentejas rojas', amount: '30g', carbs: 12, fats: 0.5, protein: 11, label: '0.5P+0.5H' },
    { id: 65, name: 'Alpro coco/avena', amount: '200ml', carbs: 12, fats: 2, protein: 11, label: '0.5P+0.5H' },
    { id: 66, name: 'Beyond Burger', amount: '40g', carbs: 1, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 67, name: 'Choriburguer Heura', amount: '65g', carbs: 1, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 68, name: 'Huevo', amount: '1ud (60-70g)', carbs: 1, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 69, name: 'Queso fresco Burgos', amount: '55g', carbs: 1, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 70, name: 'Mozzarella fresca', amount: '45g', carbs: 1, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 71, name: 'Jamón serrano/lomo', amount: '40g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 72, name: 'Carne roja', amount: '35g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 73, name: 'Hamburguesa de pollo', amount: '70g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 74, name: 'Hamburguesa ternera', amount: '60g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 75, name: 'Carne picada vacuno', amount: '55g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 76, name: 'Carne picada cerdo', amount: '55g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 77, name: 'Salmón/Atún fresco', amount: '55g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 78, name: 'Aú¡tún en aceite', amount: '40g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 79, name: 'Ventresca de atún', amount: '50g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 80, name: 'Anchoas en aceite', amount: '50g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 81, name: 'Bonito/Sardina fresco', amount: '80g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 82, name: 'Trucha/Pez espada', amount: '70g', carbs: 0, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 83, name: 'Tofu', amount: '100g', carbs: 2, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 84, name: 'Tempeh de soja', amount: '80g', carbs: 2, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 85, name: 'Edamame', amount: '80g', carbs: 2, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 86, name: 'Bebida soja sin azúcar', amount: '330ml', carbs: 2, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 87, name: 'Yogur Alpro Skyr', amount: '150g', carbs: 2, fats: 5, protein: 11, label: '0.5P+0.5G' },
    { id: 88, name: 'Leche entera', amount: '165ml', carbs: 6, fats: 5, protein: 4.4, label: '0.25H+0.2P+0.5G' },
    { id: 89, name: 'Kéfir', amount: '150ml', carbs: 6, fats: 5, protein: 4.4, label: '0.25H+0.2P+0.5G' },
    { id: 90, name: 'Yogur natural', amount: '165g', carbs: 6, fats: 5, protein: 4.4, label: '0.25H+0.2P+0.5G' },
    { id: 91, name: 'Bebida soja calcio', amount: '230ml', carbs: 6, fats: 5, protein: 4.4, label: '0.25H+0.2P+0.5G' },
    { id: 92, name: 'Leche semidesnatada', amount: '220ml', carbs: 12, fats: 2.5, protein: 5.5, label: '0.5H+0.25P+0.25G' },
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
    const parsedQty = parseFloat(quantity);
    setSelectedFoods(selectedFoods.map(f => 
      f.id === foodId ? { ...f, quantity: Math.max(0.1, isNaN(parsedQty) ? 1 : parsedQty) } : f
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
      quantity: Math.max(0.1, Math.round((f.quantity * avgFactor) * 10) / 10)
    })));
  };

  const registerInMyDay = () => {
    if (selectedFoods.length === 0) return;
    
    const newMeal = {
      id: Date.now(),
      name: selectedMealType,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      foods: selectedFoods.map(f => ({ ...f }))
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

  const MacroTag = ({ carbs, fats, protein, conversions }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
            H:{(carbs / conversions.carbs).toFixed(1)}
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
            P:{(protein / conversions.protein).toFixed(1)}
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
            G:{(fats / conversions.fats).toFixed(1)}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: '0.625rem',
          padding: '0.125rem 0.375rem',
          borderRadius: '0.25rem',
          background: '#f3f4f6',
          color: '#374151',
          fontWeight: '600'
        }}>
          {carbs > 0 && `${Math.round(carbs)}g H`}
          {protein > 0 && (carbs > 0 ? ' | ' : '') + `${Math.round(protein)}g P`}
          {fats > 0 && (carbs > 0 || protein > 0 ? ' | ' : '') + `${Math.round(fats)}g G`}
        </span>
      </div>
    </div>
  );

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
    { id: 'recipes', label: 'Recetas', icon: BookOpen },
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
                Ã°Å¸â€œÅ  Resumen del Día
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>
                    {totals.carbs.toFixed(1)} <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>/ {dailyGoals.carbs}</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Unidades Hidratos</div>
                  <ProgressBar current={totals.carbs} goal={dailyGoals.carbs} color="bg-green-500" />
                  <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '600', marginTop: '0.5rem' }}>
                    Quedan {remaining.carbs.toFixed(1)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>
                    {totals.protein.toFixed(1)} <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>/ {dailyGoals.protein}</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Unidades Proteína</div>
                  <ProgressBar current={totals.protein} goal={dailyGoals.protein} color="bg-blue-500" />
                  <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '600', marginTop: '0.5rem' }}>
                    Quedan {remaining.protein.toFixed(1)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>
                    {totals.fats.toFixed(1)} <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>/ {dailyGoals.fats}</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Unidades Grasa</div>
                  <ProgressBar current={totals.fats} goal={dailyGoals.fats} color="bg-amber-500" />
                  <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '600', marginTop: '0.5rem' }}>
                    Quedan {remaining.fats.toFixed(1)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9333ea' }}>
                    0 <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>/ {dailyGoals.calories}</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Calorías</div>
                  <ProgressBar current={0} goal={dailyGoals.calories} color="bg-amber-500" />
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
                  <span>Ã°Å¸â€œÂ</span> Equivalente en gramos
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a' }}>
                      {Math.round(totals.carbs * conversions.carbs)}g <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>/ {dailyGoals.carbs * conversions.carbs}g</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                      Hidratos consumidos
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1f2937' }}>Quedan {Math.round(remaining.carbs * conversions.carbs)}g</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>
                      {Math.round(totals.protein * conversions.protein)}g <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>/ {dailyGoals.protein * conversions.protein}g</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                      Proteína consumida
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1f2937' }}>Quedan {Math.round(remaining.protein * conversions.protein)}g</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#d97706' }}>
                      {Math.round(totals.fats * conversions.fats)}g <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>/ {dailyGoals.fats * conversions.fats}g</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                      Grasa consumida
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1f2937' }}>Quedan {Math.round(remaining.fats * conversions.fats)}g</div>
                  </div>
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
                    Hidratos {macroFilters.carbs && 'Ã¢Å“â€œ'}
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
                    Proteínas {macroFilters.protein && 'Ã¢Å“â€œ'}
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
                    Grasas {macroFilters.fats && 'Ã¢Å“â€œ'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filteredFoods.map(food => (
                  <div key={food.id} style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    padding: '0.875rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '0.75rem' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>{food.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>{food.amount}</div>
                        <MacroTag carbs={food.carbs} fats={food.fats} protein={food.protein} conversions={conversions} />
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
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                      >
                        + Añadir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
                  {meals.map(meal => {
                    const mealTotals = meal.foods.reduce((sum, f) => ({
                      carbs: sum.carbs + (f.carbs * (f.quantity || 1)),
                      protein: sum.protein + (f.protein * (f.quantity || 1)),
                      fats: sum.fats + (f.fats * (f.quantity || 1))
                    }), { carbs: 0, protein: 0, fats: 0 });

                    return (
                      <div key={meal.id} style={{
                        background: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        padding: '0.875rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>{meal.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>{meal.time}</div>
                            <MacroTag carbs={mealTotals.carbs} fats={mealTotals.fats} protein={mealTotals.protein} conversions={conversions} />
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
                    );
                  })}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '0.75rem' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>{food.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>{food.amount}</div>
                        <MacroTag carbs={food.carbs} fats={food.fats} protein={food.protein} conversions={conversions} />
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
                          cursor: 'pointer',
                          flexShrink: 0
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

        {activeTab === 'calendar' && (
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
                  {mealTypeGoals[selectedMealType]?.carbs || 0}H | {mealTypeGoals[selectedMealType]?.protein || 0}P | {mealTypeGoals[selectedMealType]?.fats || 0}G
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
                    Hidratos {macroFilters.carbs && 'Ã¢Å“â€œ'}
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
                    Proteí­nas {macroFilters.protein && 'Ã¢Å“â€œ'}
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
                    Grasas {macroFilters.fats && 'Ã¢Å“â€œ'}
                  </button>
                </div>
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
                          H:{(food.carbs / conversions.carbs).toFixed(1)}
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
                          P:{(food.protein / conversions.protein).toFixed(1)}
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
                          G:{(food.fats / conversions.fats).toFixed(1)}
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
                      {Math.round(food.carbs)}g H | {Math.round(food.protein)}g P | {Math.round(food.fats)}g G
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
                        {food.quantity > 1 
                          ? `${Math.round(parseFloat(food.amount) * food.quantity)}${food.amount.replace(/[0-9.]/g, '')}`
                          : food.amount
                        }
                      </div>
                    </div>
                    <input
                      type="number"
                      value={food.quantity}
                      onChange={(e) => updateFoodQuantity(food.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: '70px',
                        padding: '0.375rem',
                        textAlign: 'center',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        marginRight: '0.5rem'
                      }}
                      min="0.1"
                      step="0.1"
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
                      Ã°Å¸â€”â€˜Ã¯Â¸Â
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
                        Hidratos: {((selectedFoods.reduce((sum, f) => sum + (f.carbs * f.quantity), 0)) / conversions.carbs).toFixed(1)} / {mealTypeGoals[selectedMealType]?.carbs || 0}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {Math.round(selectedFoods.reduce((sum, f) => sum + (f.carbs * f.quantity), 0))}g / {Math.round((mealTypeGoals[selectedMealType]?.carbs || 0) * conversions.carbs)}g
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ 
                        fontSize: '1rem', 
                        fontWeight: '700', 
                        color: 'rgb(37, 99, 235)',
                        marginBottom: '0.25rem'
                      }}>
                        Proteínas: {((selectedFoods.reduce((sum, f) => sum + (f.protein * f.quantity), 0)) / conversions.protein).toFixed(1)} / {mealTypeGoals[selectedMealType]?.protein || 0}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {Math.round(selectedFoods.reduce((sum, f) => sum + (f.protein * f.quantity), 0))}g / {Math.round((mealTypeGoals[selectedMealType]?.protein || 0) * conversions.protein)}g
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ 
                        fontSize: '1rem', 
                        fontWeight: '700', 
                        color: 'rgb(217, 119, 6)',
                        marginBottom: '0.25rem'
                      }}>
                        Grasas: {((selectedFoods.reduce((sum, f) => sum + (f.fats * f.quantity), 0)) / conversions.fats).toFixed(1)} / {mealTypeGoals[selectedMealType]?.fats || 0}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {Math.round(selectedFoods.reduce((sum, f) => sum + (f.fats * f.quantity), 0))}g / {Math.round((mealTypeGoals[selectedMealType]?.fats || 0) * conversions.fats)}g
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
                      cursor: 'pointer'
                    }}
                  >
                    Ã°Å¸â€œâ€¦ Registrar
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
                  Ã°Å¸â€™Â¾ Guardar Comida
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
                      Ã¢ÂÂ±Ã¯Â¸Â Tiempo invertido:
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
        )}

        {activeTab === 'recipes' && (
          <div style={{ paddingBottom: '6rem', textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ color: '#6b7280' }}>Sección de recetas (próximamente)</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ paddingBottom: '6rem' }}>
            <div style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '1rem',
              padding: '1.25rem',
              marginBottom: '1rem'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
                Ã¢Å¡â„¢Ã¯Â¸Â Conversiones de Macros
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
                  Ã°Å¸ÂÂ½Ã¯Â¸Â Tipos de Comidas
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
                            Ã°Å¸â€”â€˜Ã¯Â¸Â
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