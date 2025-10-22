import React, { useState, useEffect } from 'react';
import { Trash2, Calculator, ChefHat, Clock, Save, Search, Plus, Edit3, X } from 'lucide-react';

const MacroDietApp = () => {
  const [activeTab, setActiveTab] = useState('meal-planner');
  
  // Base de datos de alimentos
  const foods = [
    // 1 HIDRATO DE CARBONO
    { id: 1, name: 'Patata', grams: 130, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 2, name: 'Arroz/Pasta', grams: 30, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 3, name: 'Boniato', grams: 120, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 4, name: 'Korn Flakes', grams: 30, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 5, name: 'Avena', grams: 30, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 6, name: 'Harina de trigo/espelta', grams: 30, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 7, name: 'Cereales', grams: 25, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 8, name: 'Fruta (1 pieza)', grams: 1, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 9, name: 'Zumo de naranja', grams: 230, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 10, name: 'Dátiles', grams: 35, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 11, name: 'Mermelada con azúcar', grams: 50, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 12, name: 'Miel', grams: 25, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 13, name: 'Gnocchi', grams: 60, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 14, name: 'Pan', grams: 40, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 15, name: 'Pan Bimbo (2 rebanadas)', grams: 46, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 16, name: 'Pan Bimbo integral (1.5 rebanadas)', grams: 35, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 17, name: 'Tortilla integral', grams: 1, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 18, name: 'Tortitas de arroz', grams: 24, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 19, name: 'Maíz', grams: 125, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 20, name: 'Palomitas', grams: 30, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    { id: 21, name: 'Azúcar', grams: 25, carbs: 1, protein: 0, fat: 0, categories: ['carbs'] },
    
    // 1 PROTEÍNA
    { id: 22, name: 'Pescado blanco', grams: 120, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 23, name: 'Molusco', grams: 120, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 24, name: 'Marisco', grams: 65, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 25, name: 'Atún lata al natural', grams: 100, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 26, name: 'Claras de huevo', grams: 200, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 27, name: 'Proteína en polvo', grams: 30, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 28, name: 'Carne blanca sin piel', grams: 100, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 29, name: 'Carne roja corte magro', grams: 90, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 30, name: 'Embutido sin grasa', grams: 50, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 31, name: 'Queso Eatlean', grams: 60, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 32, name: 'Yogur +proteínas Hacendado Natural', grams: 200, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 33, name: 'Soja o proteína de guisante', grams: 30, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 34, name: 'Bocados o tiras de Heura', grams: 75, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 35, name: 'Seitán', grams: 100, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    { id: 36, name: 'Levadura nutricional', grams: 35, carbs: 0, protein: 1, fat: 0, categories: ['protein'] },
    
    // 1 GRASA
    { id: 37, name: 'AOVE (aceite oliva)', grams: 12, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 38, name: 'Frutos secos', grams: 15, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 39, name: 'Crema de cacahuete', grams: 15, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 40, name: 'Pipas calabaza/girasol', grams: 20, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 41, name: 'Semillas lino/chía', grams: 20, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 42, name: 'Aceitunas', grams: 60, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 43, name: 'Coco', grams: 30, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 44, name: 'Aguacate', grams: 60, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 45, name: 'Chocolate 85%', grams: 20, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 46, name: 'Gazpacho sin pan', grams: 300, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 47, name: 'Bebida almendras/avellanas', grams: 600, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 48, name: 'Mayonesa', grams: 20, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 49, name: 'Yogur griego', grams: 80, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 50, name: 'Queso curado/semi', grams: 25, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 51, name: 'Queso de cabra/tierno', grams: 30, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    { id: 52, name: 'Tahini', grams: 15, carbs: 0, protein: 0, fat: 1, categories: ['fat'] },
    
    // ALIMENTOS MIXTOS
    { id: 53, name: 'Salsa de soja', grams: 140, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 54, name: 'Leche desnatada', grams: 290, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 55, name: 'Leche desnatada +proteínas', grams: 230, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 56, name: 'Yogur +proteínas Fresa', grams: 125, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 57, name: 'Yogur +proteínas Arándanos', grams: 200, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 58, name: 'Yogur griego desnatado', grams: 170, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 59, name: 'Yogur desnatado', grams: 260, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 60, name: 'Legumbres cocidas', grams: 120, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 61, name: 'Legumbres secas', grams: 30, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 62, name: 'Harina de garbanzo', grams: 30, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 63, name: 'Pasta de lentejas rojas', grams: 30, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 64, name: 'Alpro coco o avena', grams: 200, carbs: 0.5, protein: 0.5, fat: 0, categories: ['protein', 'carbs'] },
    { id: 65, name: 'Beyond Burger', grams: 40, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 66, name: 'Choriburger (Heura)', grams: 65, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 67, name: 'Huevo entero', grams: 65, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 68, name: 'Queso Burgos', grams: 55, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 69, name: 'Mozzarella', grams: 45, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 70, name: 'Jamón serrano/lomo', grams: 40, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 71, name: 'Carne roja grasa', grams: 35, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 72, name: 'Hamburguesa de pollo', grams: 70, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 73, name: 'Hamburguesa de ternera', grams: 60, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 74, name: 'Carne picada vacuno', grams: 55, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 75, name: 'Carne picada cerdo', grams: 55, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 76, name: 'Salmón/Atún fresco', grams: 55, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 77, name: 'Atún en AOVE', grams: 40, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 78, name: 'Ventresca de atún', grams: 50, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 79, name: 'Anchoas en AOVE', grams: 50, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 80, name: 'Bonito/Sardina fresco', grams: 80, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 81, name: 'Tofu', grams: 100, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 82, name: 'Tempeh de soja', grams: 80, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 83, name: 'Edamame', grams: 80, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 84, name: 'Bebida soja sin azúcar', grams: 330, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 85, name: 'Yogur Alpro', grams: 150, carbs: 0, protein: 0.5, fat: 0.5, categories: ['protein', 'fat'] },
    { id: 86, name: 'Leche entera', grams: 165, carbs: 0.25, protein: 0.25, fat: 0.5, categories: ['carbs', 'protein', 'fat'] },
    { id: 87, name: 'Kéfir', grams: 150, carbs: 0.25, protein: 0.25, fat: 0.5, categories: ['carbs', 'protein', 'fat'] },
    { id: 88, name: 'Yogur natural', grams: 165, carbs: 0.25, protein: 0.25, fat: 0.5, categories: ['carbs', 'protein', 'fat'] },
    { id: 89, name: 'Bebida soja calcio', grams: 230, carbs: 0.25, protein: 0.25, fat: 0.5, categories: ['carbs', 'protein', 'fat'] },
    { id: 90, name: 'Leche semidesnatada', grams: 220, carbs: 0.5, protein: 0.25, fat: 0.25, categories: ['carbs', 'protein', 'fat'] },
    { id: 91, name: 'Cacahuete en polvo', grams: 25, carbs: 0.25, protein: 0.5, fat: 0.25, categories: ['carbs', 'protein', 'fat'] },
    { id: 92, name: 'Cacao puro desgrasado', grams: 25, carbs: 0.25, protein: 0.5, fat: 0.25, categories: ['carbs', 'protein', 'fat'] }
  ];

  const mealPlans = {
    'Desayuno': { carbs: 2.5, protein: 0, fat: 2 },
    'Almuerzo': { carbs: 1.5, protein: 1, fat: 0 },
    'Comida': { carbs: 2.5, protein: 1, fat: 2 },
    'Cena': { carbs: 2.5, protein: 1, fat: 2 }
  };

  // Estado para manejar cambios en el plan de comidas
  const [currentMealPlans, setCurrentMealPlans] = useState(() => {
    const saved = localStorage.getItem('mealPlans');
    return saved ? JSON.parse(saved) : mealPlans;
  });

  // Conversiones basadas en tu sistema de equivalencias
  const CONVERSION_FACTORS = {
    carbs: 217 / 9,    // 24.11g = 1 unidad hidrato
    protein: 65 / 3,   // 21.67g = 1 unidad proteína  
    fat: 64 / 6        // 10.67g = 1 unidad grasa
  };

  // Objetivos diarios totales basados en tu información
  const DAILY_TARGETS = {
    carbs: 9, // unidades
    protein: 3, // unidades
    fat: 6, // unidades
    calories: 1709, // kcal
    carbsGrams: 217, // gramos
    proteinGrams: 65, // gramos
    fatGrams: 64 // gramos
  };

  // Estados
  const [selectedMeal, setSelectedMeal] = useState('Desayuno');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [calculationResult, setCalculationResult] = useState(null);
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['carbs', 'protein', 'fat']);
  const [manualFoods, setManualFoods] = useState([]);
  const [manualResult, setManualResult] = useState(null);
  const [newRecipeName, setNewRecipeName] = useState('');
  const [customFoods, setCustomFoods] = useState(() => {
    const saved = localStorage.getItem('customFoods');
    return saved ? JSON.parse(saved) : [];
  });
  const [dailyLog, setDailyLog] = useState(() => {
    const saved = localStorage.getItem('dailyLog');
    const today = new Date().toDateString();
    const savedData = saved ? JSON.parse(saved) : { date: today, entries: [] };
    
    // Si es un día diferente, limpiar el log
    if (savedData.date !== today) {
      return [];
    }
    return savedData.entries || [];
  });
  const [historicalLogs, setHistoricalLogs] = useState(() => {
    const saved = localStorage.getItem('historicalLogs');
    return saved ? JSON.parse(saved) : {};
  });
  const [expandedEntries, setExpandedEntries] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedHistoryDate, setSelectedHistoryDate] = useState(null);
  const [newLogEntry, setNewLogEntry] = useState({
    mealType: 'Desayuno',
    foods: [],
    time: ''
  });
  const [editingMealPlan, setEditingMealPlan] = useState(null);
  const [tempMealPlan, setTempMealPlan] = useState({});

  // useEffect para guardar datos en localStorage
  useEffect(() => {
    localStorage.setItem('mealPlans', JSON.stringify(currentMealPlans));
  }, [currentMealPlans]);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('customFoods', JSON.stringify(customFoods));
  }, [customFoods]);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('dailyLog', JSON.stringify({
      date: today,
      entries: dailyLog
    }));
  }, [dailyLog]);
  const [newCustomFood, setNewCustomFood] = useState({
    name: '',
    grams: '',
    carbsGrams: '',
    proteinGrams: '',
    fatGrams: '',
    dataType: 'per100g' // 'per100g' o 'perUnit'
  });

  // Combinar alimentos base con personalizados
  const allFoods = [...foods, ...customFoods];

  // Funciones auxiliares
  const filteredFoods = allFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || 
      food.categories.some(category => selectedCategories.includes(category));
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const addFood = (food) => {
    const target = activeTab === 'calculator' ? setManualFoods : setSelectedFoods;
    target(prev => {
      const existing = prev.find(f => f.id === food.id);
      if (existing) {
        return prev.map(f => f.id === food.id ? { ...f, quantity: f.quantity + 1 } : f);
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const updateQuantity = (foodId, quantity, isManual = false) => {
    const target = isManual ? setManualFoods : setSelectedFoods;
    if (quantity <= 0) {
      target(prev => prev.filter(f => f.id !== foodId));
      return;
    }
    target(prev => 
      prev.map(f => f.id === foodId ? { ...f, quantity: parseFloat(quantity) || 0 } : f)
    );
  };

  const calculateMacros = (isManual = false) => {
    const foodList = isManual ? manualFoods : selectedFoods;
    const totals = foodList.reduce((acc, food) => ({
      carbs: acc.carbs + (food.carbs * food.quantity),
      protein: acc.protein + (food.protein * food.quantity),
      fat: acc.fat + (food.fat * food.quantity),
      grams: acc.grams + (food.grams * food.quantity)
    }), { carbs: 0, protein: 0, fat: 0, grams: 0 });

    if (isManual) {
      const calories = (totals.carbs * 4) + (totals.protein * 4) + (totals.fat * 9);
      setManualResult({ ...totals, calories });
    } else {
      const targetMacros = currentMealPlans[selectedMeal];
      const differences = {
        carbs: targetMacros.carbs - totals.carbs,
        protein: targetMacros.protein - totals.protein,
        fat: targetMacros.fat - totals.fat
      };
      setCalculationResult({ totals, differences, target: targetMacros });
    }
  };

  const optimizeMeal = () => {
    if (selectedFoods.length === 0) return;
    const targetMacros = currentMealPlans[selectedMeal];
    
    const optimized = selectedFoods.map(food => {
      let newQuantity = food.quantity;
      
      if (food.carbs > 0) {
        newQuantity = Math.max(0.1, targetMacros.carbs / selectedFoods.filter(f => f.carbs > 0).length / food.carbs);
      }
      if (food.protein > 0) {
        newQuantity = Math.max(0.1, targetMacros.protein / selectedFoods.filter(f => f.protein > 0).length / food.protein);
      }
      if (food.fat > 0) {
        newQuantity = Math.max(0.1, targetMacros.fat / selectedFoods.filter(f => f.fat > 0).length / food.fat);
      }
      
      return { ...food, quantity: Math.round(newQuantity * 10) / 10 };
    });
    
    setSelectedFoods(optimized);
    calculateMacros();
  };

  const saveRecipe = () => {
    if (newRecipeName && selectedFoods.length > 0) {
      const totals = selectedFoods.reduce((acc, food) => ({
        carbs: acc.carbs + (food.carbs * food.quantity),
        protein: acc.protein + (food.protein * food.quantity),
        fat: acc.fat + (food.fat * food.quantity),
        grams: acc.grams + (food.grams * food.quantity)
      }), { carbs: 0, protein: 0, fat: 0, grams: 0 });

      const recipe = {
        id: Date.now(),
        name: newRecipeName,
        ingredients: [...selectedFoods],
        totalMacros: totals
      };
      
      setRecipes(prev => [...prev, recipe]);
      setNewRecipeName('');
      alert('Receta guardada');
    }
  };

  const loadRecipe = (recipe) => {
    setSelectedFoods(recipe.ingredients);
    setActiveTab('meal-planner');
  };

  const addCustomFood = () => {
    if (newCustomFood.name && newCustomFood.grams && 
        (newCustomFood.carbsGrams || newCustomFood.proteinGrams || newCustomFood.fatGrams)) {
      
      const portionSize = parseFloat(newCustomFood.grams);
      const carbsGrams = parseFloat(newCustomFood.carbsGrams) || 0;
      const proteinGrams = parseFloat(newCustomFood.proteinGrams) || 0;
      const fatGrams = parseFloat(newCustomFood.fatGrams) || 0;
      
      let carbsInPortion, proteinInPortion, fatInPortion;
      let originalNutrition;
      
      if (newCustomFood.dataType === 'per100g') {
        // Datos por 100g - calcular para la porción
        carbsInPortion = (carbsGrams * portionSize) / 100;
        proteinInPortion = (proteinGrams * portionSize) / 100;
        fatInPortion = (fatGrams * portionSize) / 100;
        
        originalNutrition = {
          carbsPer100g: carbsGrams,
          proteinPer100g: proteinGrams,
          fatPer100g: fatGrams,
          dataType: 'per100g'
        };
      } else {
        // Datos por unidad - usar directamente
        carbsInPortion = carbsGrams;
        proteinInPortion = proteinGrams;
        fatInPortion = fatGrams;
        
        // Para mostrar "por 100g" calculamos la proporción
        const carbsPer100g = (carbsGrams * 100) / portionSize;
        const proteinPer100g = (proteinGrams * 100) / portionSize;
        const fatPer100g = (fatGrams * 100) / portionSize;
        
        originalNutrition = {
          carbsPer100g: Math.round(carbsPer100g * 10) / 10,
          proteinPer100g: Math.round(proteinPer100g * 10) / 10,
          fatPer100g: Math.round(fatPer100g * 10) / 10,
          dataType: 'perUnit',
          originalCarbsPerUnit: carbsGrams,
          originalProteinPerUnit: proteinGrams,
          originalFatPerUnit: fatGrams
        };
      }
      
      // Convertir a unidades de macros
      const carbUnits = carbsInPortion / CONVERSION_FACTORS.carbs;
      const proteinUnits = proteinInPortion / CONVERSION_FACTORS.protein;
      const fatUnits = fatInPortion / CONVERSION_FACTORS.fat;
      
      // Determinar categorías
      const categories = [];
      if (carbUnits > 0) categories.push('carbs');
      if (proteinUnits > 0) categories.push('protein');
      if (fatUnits > 0) categories.push('fat');
      
      const customFood = {
        id: Date.now() + Math.random(),
        name: newCustomFood.name,
        grams: portionSize,
        carbs: Math.round(carbUnits * 100) / 100,
        protein: Math.round(proteinUnits * 100) / 100,
        fat: Math.round(fatUnits * 100) / 100,
        categories: categories,
        isCustom: true,
        originalNutrition: originalNutrition
      };
      
      setCustomFoods(prev => [...prev, customFood]);
      setNewCustomFood({ name: '', grams: '', carbsGrams: '', proteinGrams: '', fatGrams: '', dataType: 'per100g' });
      alert('Alimento personalizado añadido');
    } else {
      alert('Completa nombre, peso y al menos un macronutriente');
    }
  };

  const deleteCustomFood = (foodId) => {
    setCustomFoods(prev => prev.filter(food => food.id !== foodId));
  };

  // Funciones para el registro diario
  const addToLog = (foods, mealType) => {
    const currentTime = new Date().toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const logEntry = {
      id: Date.now(),
      mealType: mealType || newLogEntry.mealType,
      foods: foods.map(food => ({ ...food })),
      time: currentTime,
      timestamp: Date.now()
    };
    
    setDailyLog(prev => [...prev, logEntry]);
  };

  const deleteLogEntry = (entryId) => {
    setDailyLog(prev => prev.filter(entry => entry.id !== entryId));
  };

  const calculateDailyTotals = () => {
    return dailyLog.reduce((totals, entry) => {
      const entryTotals = entry.foods.reduce((acc, food) => ({
        carbs: acc.carbs + (food.carbs * food.quantity),
        protein: acc.protein + (food.protein * food.quantity),
        fat: acc.fat + (food.fat * food.quantity),
        grams: acc.grams + (food.grams * food.quantity)
      }), { carbs: 0, protein: 0, fat: 0, grams: 0 });
      
      return {
        carbs: totals.carbs + entryTotals.carbs,
        protein: totals.protein + entryTotals.protein,
        fat: totals.fat + entryTotals.fat,
        grams: totals.grams + entryTotals.grams
      };
    }, { carbs: 0, protein: 0, fat: 0, grams: 0 });
  };

  const calculateRemaining = () => {
    const consumed = calculateDailyTotals();
    const consumedCalories = (consumed.carbs * 4) + (consumed.protein * 4) + (consumed.fat * 9);
    const consumedGrams = {
      carbs: consumed.carbs * CONVERSION_FACTORS.carbs,
      protein: consumed.protein * CONVERSION_FACTORS.protein,
      fat: consumed.fat * CONVERSION_FACTORS.fat
    };
    
    return {
      units: {
        carbs: DAILY_TARGETS.carbs - consumed.carbs,
        protein: DAILY_TARGETS.protein - consumed.protein,
        fat: DAILY_TARGETS.fat - consumed.fat
      },
      grams: {
        carbs: DAILY_TARGETS.carbsGrams - consumedGrams.carbs,
        protein: DAILY_TARGETS.proteinGrams - consumedGrams.protein,
        fat: DAILY_TARGETS.fatGrams - consumedGrams.fat
      },
      calories: DAILY_TARGETS.calories - consumedCalories,
      consumed: {
        units: consumed,
        grams: consumedGrams,
        calories: consumedCalories
      }
    };
  };

  // Funciones para editar planes de comida
  const startEditingMealPlan = (mealName) => {
    setEditingMealPlan(mealName);
    setTempMealPlan({ ...currentMealPlans[mealName] });
  };

  const saveMealPlan = () => {
    if (editingMealPlan && tempMealPlan.carbs !== undefined && tempMealPlan.protein !== undefined && tempMealPlan.fat !== undefined) {
      setCurrentMealPlans(prev => ({
        ...prev,
        [editingMealPlan]: {
          carbs: parseFloat(tempMealPlan.carbs) || 0,
          protein: parseFloat(tempMealPlan.protein) || 0,
          fat: parseFloat(tempMealPlan.fat) || 0
        }
      }));
      setEditingMealPlan(null);
      setTempMealPlan({});
    }
  };

  const cancelEditingMealPlan = () => {
    setEditingMealPlan(null);
    setTempMealPlan({});
  };

  const resetMealPlansToDefault = () => {
// eslint-disable-next-line no-restricted-globals
    if (confirm('¿Estás seguro de que quieres restaurar los valores por defecto de todas las comidas?')) {
      setCurrentMealPlans({ ...mealPlans });
    }
  };

  // Funciones para gestión de datos
  const exportData = () => {
    const dataToExport = {
      mealPlans: currentMealPlans,
      recipes: recipes,
      customFoods: customFoods,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dieta_macros_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          
          if (importedData.mealPlans) setCurrentMealPlans(importedData.mealPlans);
          if (importedData.recipes) setRecipes(importedData.recipes);
          if (importedData.customFoods) setCustomFoods(importedData.customFoods);
          
          alert('✅ Datos importados correctamente');
        } catch (error) {
          alert('❌ Error al importar datos. Asegúrate de que el archivo sea válido.');
        }
      };
      reader.readAsText(file);
    }
    // Limpiar el input
    event.target.value = '';
  };

  const clearAllData = () => {
// eslint-disable-next-line no-restricted-globals
    if (confirm('⚠️ ¿Estás seguro de que quieres eliminar TODOS los datos?\n\nEsto incluye:\n- Alimentos personalizados\n- Recetas guardadas\n- Configuración de comidas\n- Registro diario\n\n¡Esta acción no se puede deshacer!')) {
      // Limpiar localStorage
      localStorage.removeItem('mealPlans');
      localStorage.removeItem('recipes');
      localStorage.removeItem('customFoods');
      localStorage.removeItem('dailyLog');
      
      // Resetear estados
      setCurrentMealPlans({ ...mealPlans });
      setRecipes([]);
      setCustomFoods([]);
      setDailyLog([]);
      
      alert('🗑️ Todos los datos han sido eliminados');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📊 Calculadora de Dieta por Intercambio de Macros</h1>
      
      {/* Navegación */}
      <div className="flex gap-2 mb-6 border-b">
        {[
          { id: 'meal-planner', label: 'Planificador', icon: Clock },
          { id: 'calculator', label: 'Calculadora', icon: Calculator },
          { id: 'daily-log', label: 'Mi Día', icon: 'Calendar' },
          { id: 'custom-foods', label: 'Mis Alimentos', icon: Plus },
          { id: 'recipes', label: `Recetas (${recipes.length})`, icon: ChefHat },
          { id: 'settings', label: 'Configuración', icon: 'Settings' }
        ].map(tab => {
          const Icon = tab.icon === 'Calendar' ? 
            () => <span className="text-lg">📅</span> : 
            tab.icon === 'Settings' ?
            () => <span className="text-lg">⚙️</span> :
            tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4 inline mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === 'meal-planner' && (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <div className="flex gap-4 items-center mb-3">
              <select 
                value={selectedMeal} 
                onChange={(e) => setSelectedMeal(e.target.value)}
                className="border rounded px-3 py-2"
              >
                {Object.keys(currentMealPlans).map(meal => (
                  <option key={meal} value={meal}>{meal}</option>
                ))}
              </select>
              <div className="text-sm">
                Objetivo: {currentMealPlans[selectedMeal].carbs}H | {currentMealPlans[selectedMeal].protein}P | {currentMealPlans[selectedMeal].fat}G
              </div>

          {/* Modal para editar plan de comida */}
          {editingMealPlan && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-lg">✏️ Editar {editingMealPlan}</h4>
                  <button
                    onClick={cancelEditingMealPlan}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Unidades de Hidratos:</label>
                    <input
                      type="number"
                      value={tempMealPlan.carbs || ''}
                      onChange={(e) => setTempMealPlan(prev => ({ ...prev, carbs: e.target.value }))}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      step="0.1"
                      min="0"
                      placeholder="Ej: 2.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Unidades de Proteína:</label>
                    <input
                      type="number"
                      value={tempMealPlan.protein || ''}
                      onChange={(e) => setTempMealPlan(prev => ({ ...prev, protein: e.target.value }))}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      step="0.1"
                      min="0"
                      placeholder="Ej: 1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Unidades de Grasa:</label>
                    <input
                      type="number"
                      value={tempMealPlan.fat || ''}
                      onChange={(e) => setTempMealPlan(prev => ({ ...prev, fat: e.target.value }))}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      step="0.1"
                      min="0"
                      placeholder="Ej: 2"
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Vista previa:</strong><br/>
                    Calorías estimadas: {((parseFloat(tempMealPlan.carbs) || 0) * 4 + (parseFloat(tempMealPlan.protein) || 0) * 4 + (parseFloat(tempMealPlan.fat) || 0) * 9).toFixed(0)} kcal
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={saveMealPlan}
                      className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                      💾 Guardar Cambios
                    </button>
                    <button
                      onClick={cancelEditingMealPlan}
                      className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
              <button
                onClick={() => startEditingMealPlan(selectedMeal)}
                className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                Editar
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar alimentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
              {[
                { id: 'carbs', label: 'Hidratos', color: 'bg-green-100 text-green-800' },
                { id: 'protein', label: 'Proteínas', color: 'bg-blue-100 text-blue-800' },
                { id: 'fat', label: 'Grasas', color: 'bg-yellow-100 text-yellow-800' }
              ].map(category => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-all ${
                    selectedCategories.includes(category.id)
                      ? `${category.color} border-current`
                      : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {category.label} {selectedCategories.includes(category.id) ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
            {filteredFoods.map(food => (
              <div key={food.id} className="border rounded p-2 hover:bg-gray-50 cursor-pointer"
                   onClick={() => addFood(food)}>
                <div className="font-medium text-sm">{food.name}</div>
                <div className="text-xs text-gray-600">{food.grams}g {food.isCustom && '(Personalizado)'}</div>
                <div className="text-xs">
                  {food.carbs > 0 && <span className="bg-green-200 px-1 rounded mr-1">H:{food.carbs}</span>}
                  {food.protein > 0 && <span className="bg-blue-200 px-1 rounded mr-1">P:{food.protein}</span>}
                  {food.fat > 0 && <span className="bg-yellow-200 px-1 rounded">G:{food.fat}</span>}
                </div>
              </div>
            ))}
          </div>

          {selectedFoods.length > 0 && (
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-bold mb-3">Alimentos seleccionados:</h4>
              <div className="space-y-2">
                {selectedFoods.map(food => (
                  <div key={food.id} className="flex items-center gap-4 bg-white p-2 rounded">
                    <div className="flex-1">
                      <div className="font-medium">{food.name}</div>
                      <div className="text-sm text-gray-600">{(food.grams * food.quantity).toFixed(0)}g</div>
                    </div>
                    <input
                      type="number"
                      value={food.quantity}
                      onChange={(e) => updateQuantity(food.id, e.target.value)}
                      className="w-20 px-2 py-1 border rounded text-center"
                      step="0.1"
                      min="0"
                    />
                    <button
                      onClick={() => updateQuantity(food.id, 0)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => calculateMacros()}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Calcular
                </button>
                <button
                  onClick={optimizeMeal}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Optimizar
                </button>
                <button
                  onClick={() => {
                    addToLog(selectedFoods, selectedMeal);
                    alert(`${selectedMeal} registrado en tu día`);
                  }}
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                  disabled={selectedFoods.length === 0}
                >
                  📅 Registrar en Mi Día
                </button>
                <button
                  onClick={() => setSelectedFoods([])}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}

          {calculationResult && (
            <div className="bg-white border rounded p-4">
              <h4 className="font-bold mb-3">Resultado:</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-green-600">
                    {calculationResult.totals.carbs.toFixed(1)}
                  </div>
                  <div className="text-sm">Hidratos (obj: {calculationResult.target.carbs})</div>
                  <div className={`text-xs ${calculationResult.differences.carbs > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {calculationResult.differences.carbs > 0 ? `Faltan ${calculationResult.differences.carbs.toFixed(1)}` : 'Perfecto'}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">
                    {calculationResult.totals.protein.toFixed(1)}
                  </div>
                  <div className="text-sm">Proteína (obj: {calculationResult.target.protein})</div>
                  <div className={`text-xs ${calculationResult.differences.protein > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {calculationResult.differences.protein > 0 ? `Faltan ${calculationResult.differences.protein.toFixed(1)}` : 'Perfecto'}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-yellow-600">
                    {calculationResult.totals.fat.toFixed(1)}
                  </div>
                  <div className="text-sm">Grasa (obj: {calculationResult.target.fat})</div>
                  <div className={`text-xs ${calculationResult.differences.fat > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {calculationResult.differences.fat > 0 ? `Faltan ${calculationResult.differences.fat.toFixed(1)}` : 'Perfecto'}
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <strong>Peso total: {calculationResult.totals.grams.toFixed(0)}g</strong>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'calculator' && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Calculadora Manual</h3>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar alimentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
              {[
                { id: 'carbs', label: 'Hidratos', color: 'bg-green-100 text-green-800' },
                { id: 'protein', label: 'Proteínas', color: 'bg-blue-100 text-blue-800' },
                { id: 'fat', label: 'Grasas', color: 'bg-yellow-100 text-yellow-800' }
              ].map(category => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-all ${
                    selectedCategories.includes(category.id)
                      ? `${category.color} border-current`
                      : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {category.label} {selectedCategories.includes(category.id) ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {filteredFoods.map(food => (
              <div key={food.id} className="border rounded p-2 hover:bg-gray-50 cursor-pointer"
                   onClick={() => addFood(food)}>
                <div className="font-medium text-sm">{food.name}</div>
                <div className="text-xs text-gray-600">{food.grams}g</div>
              </div>
            ))}
          </div>

          {manualFoods.length > 0 && (
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-bold mb-3">Alimentos:</h4>
              {manualFoods.map(food => (
                <div key={food.id} className="flex items-center gap-4 mb-2 bg-white p-2 rounded">
                  <div className="flex-1">{food.name}</div>
                  <input
                    type="number"
                    value={food.quantity}
                    onChange={(e) => updateQuantity(food.id, e.target.value, true)}
                    className="w-20 px-2 py-1 border rounded text-center"
                    step="0.1"
                  />
                  <button onClick={() => updateQuantity(food.id, 0, true)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => calculateMacros(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Calcular
                </button>
                <button
                  onClick={() => { setManualFoods([]); setManualResult(null); }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}

          {manualResult && (
            <div className="bg-white border rounded p-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-green-600">{manualResult.carbs.toFixed(1)}</div>
                  <div className="text-sm">Hidratos</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">{manualResult.protein.toFixed(1)}</div>
                  <div className="text-sm">Proteína</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-yellow-600">{manualResult.fat.toFixed(1)}</div>
                  <div className="text-sm">Grasa</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600">{manualResult.calories.toFixed(0)}</div>
                  <div className="text-sm">Calorías</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'daily-log' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl">📅 Mi Registro Diario</h3>
            <div className="text-sm text-gray-600">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {/* Resumen del día */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-4 text-center">📊 Resumen del Día</h4>
            
            {(() => {
              const remaining = calculateRemaining();
              const consumedPercent = {
                carbs: Math.round((remaining.consumed.units.carbs / DAILY_TARGETS.carbs) * 100),
                protein: Math.round((remaining.consumed.units.protein / DAILY_TARGETS.protein) * 100),
                fat: Math.round((remaining.consumed.units.fat / DAILY_TARGETS.fat) * 100),
                calories: Math.round((remaining.consumed.calories / DAILY_TARGETS.calories) * 100)
              };

              return (
                <>
                  {/* Progreso en unidades */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {remaining.consumed.units.carbs.toFixed(1)} / {DAILY_TARGETS.carbs}
                      </div>
                      <div className="text-sm text-gray-600">Unidades Hidratos</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(consumedPercent.carbs, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1">
                        {remaining.units.carbs >= 0 
                          ? `Quedan ${remaining.units.carbs.toFixed(1)}` 
                          : `Exceso ${Math.abs(remaining.units.carbs).toFixed(1)}`
                        }
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {remaining.consumed.units.protein.toFixed(1)} / {DAILY_TARGETS.protein}
                      </div>
                      <div className="text-sm text-gray-600">Unidades Proteína</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(consumedPercent.protein, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1">
                        {remaining.units.protein >= 0 
                          ? `Quedan ${remaining.units.protein.toFixed(1)}` 
                          : `Exceso ${Math.abs(remaining.units.protein).toFixed(1)}`
                        }
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {remaining.consumed.units.fat.toFixed(1)} / {DAILY_TARGETS.fat}
                      </div>
                      <div className="text-sm text-gray-600">Unidades Grasa</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(consumedPercent.fat, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1">
                        {remaining.units.fat >= 0 
                          ? `Quedan ${remaining.units.fat.toFixed(1)}` 
                          : `Exceso ${Math.abs(remaining.units.fat).toFixed(1)}`
                        }
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {remaining.consumed.calories.toFixed(0)} / {DAILY_TARGETS.calories}
                      </div>
                      <div className="text-sm text-gray-600">Calorías</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(consumedPercent.calories, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1">
                        {remaining.calories >= 0 
                          ? `Quedan ${remaining.calories.toFixed(0)}` 
                          : `Exceso ${Math.abs(remaining.calories).toFixed(0)}`
                        }
                      </div>
                    </div>
                  </div>

                  {/* Resumen en gramos */}
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-bold text-center mb-3">📏 Equivalente en gramos</h5>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-bold text-green-600">
                          {remaining.consumed.grams.carbs.toFixed(0)}g / {DAILY_TARGETS.carbsGrams}g
                        </div>
                        <div className="text-xs text-gray-600">Hidratos consumidos</div>
                        <div className="text-xs">
                          {remaining.grams.carbs >= 0 
                            ? `Quedan ${remaining.grams.carbs.toFixed(0)}g` 
                            : `Exceso ${Math.abs(remaining.grams.carbs).toFixed(0)}g`
                          }
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600">
                          {remaining.consumed.grams.protein.toFixed(0)}g / {DAILY_TARGETS.proteinGrams}g
                        </div>
                        <div className="text-xs text-gray-600">Proteína consumida</div>
                        <div className="text-xs">
                          {remaining.grams.protein >= 0 
                            ? `Quedan ${remaining.grams.protein.toFixed(0)}g` 
                            : `Exceso ${Math.abs(remaining.grams.protein).toFixed(0)}g`
                          }
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-yellow-600">
                          {remaining.consumed.grams.fat.toFixed(0)}g / {DAILY_TARGETS.fatGrams}g
                        </div>
                        <div className="text-xs text-gray-600">Grasa consumida</div>
                        <div className="text-xs">
                          {remaining.grams.fat >= 0 
                            ? `Quedan ${remaining.grams.fat.toFixed(0)}g` 
                            : `Exceso ${Math.abs(remaining.grams.fat).toFixed(0)}g`
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Registro de comidas */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg">🍽️ Comidas Registradas ({dailyLog.length})</h4>
              <button
                onClick={() => setDailyLog([])}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                disabled={dailyLog.length === 0}
              >
                Limpiar Día
              </button>
            </div>

            {dailyLog.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-4xl mb-4">🍽️</div>
                <div className="text-gray-500">
                  <div className="font-medium">No has registrado comidas hoy</div>
                  <div className="text-sm mt-2">Ve al Planificador para crear comidas y registrarlas aquí</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {dailyLog
                  .sort((a, b) => a.timestamp - b.timestamp)
                  .map(entry => {
                    const entryTotals = entry.foods.reduce((acc, food) => ({
                      carbs: acc.carbs + (food.carbs * food.quantity),
                      protein: acc.protein + (food.protein * food.quantity),
                      fat: acc.fat + (food.fat * food.quantity),
                      grams: acc.grams + (food.grams * food.quantity)
                    }), { carbs: 0, protein: 0, fat: 0, grams: 0 });

                    const entryCalories = (entryTotals.carbs * 4) + (entryTotals.protein * 4) + (entryTotals.fat * 9);

                    return (
                      <div key={entry.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="font-bold text-lg">{entry.mealType}</h5>
                            <div className="text-sm text-gray-600">⏰ {entry.time}</div>
                          </div>
                          <button
                            onClick={() => deleteLogEntry(entry.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-4 gap-3 mb-3 text-sm text-center">
                          <div className="bg-green-100 p-2 rounded">
                            <div className="font-bold">{entryTotals.carbs.toFixed(1)}</div>
                            <div className="text-xs">Uni. H</div>
                          </div>
                          <div className="bg-blue-100 p-2 rounded">
                            <div className="font-bold">{entryTotals.protein.toFixed(1)}</div>
                            <div className="text-xs">Uni. P</div>
                          </div>
                          <div className="bg-yellow-100 p-2 rounded">
                            <div className="font-bold">{entryTotals.fat.toFixed(1)}</div>
                            <div className="text-xs">Uni. G</div>
                          </div>
                          <div className="bg-purple-100 p-2 rounded">
                            <div className="font-bold">{entryCalories.toFixed(0)}</div>
                            <div className="text-xs">kcal</div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-600">
                          <strong>Alimentos:</strong> {entry.foods.map(food => 
                            `${food.name} (${food.quantity}x)`
                          ).join(', ')}
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-1">
                          Peso total: {entryTotals.grams.toFixed(0)}g
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'custom-foods' && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Mis Alimentos Personalizados</h3>
          
          <div className="bg-green-50 p-4 rounded">
            <h4 className="font-bold mb-3">Añadir Nuevo Alimento</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre del alimento:</label>
                <input
                  type="text"
                  placeholder="Ej: Mi tortita de trigo"
                  value={newCustomFood.name}
                  onChange={(e) => setNewCustomFood(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de datos:</label>
                <select
                  value={newCustomFood.dataType}
                  onChange={(e) => setNewCustomFood(prev => ({ ...prev, dataType: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="per100g">Por cada 100g del alimento</option>
                  <option value="perUnit">Por unidad de producto</option>
                </select>
              </div>
            </div>
            
            <div className={`p-3 rounded mb-4 text-sm ${
              newCustomFood.dataType === 'per100g' 
                ? 'bg-blue-100' 
                : 'bg-orange-100'
            }`}>
              {newCustomFood.dataType === 'per100g' ? (
                <>
                  <strong>📋 Modo: Por 100g</strong><br/>
                  Introduce los macronutrientes como aparecen en la etiqueta nutricional (por cada 100g).
                </>
              ) : (
                <>
                  <strong>🍪 Modo: Por unidad</strong><br/>
                  Introduce los macronutrientes totales que contiene una unidad completa del producto.
                </>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {newCustomFood.dataType === 'per100g' 
                    ? 'Peso de la porción (g):' 
                    : 'Peso de una unidad (g):'
                  }
                </label>
                <input
                  type="number"
                  placeholder={newCustomFood.dataType === 'per100g' ? 'Ej: 250' : 'Ej: 45'}
                  value={newCustomFood.grams}
                  onChange={(e) => setNewCustomFood(prev => ({ ...prev, grams: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                  step="1"
                  min="1"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {newCustomFood.dataType === 'per100g' 
                    ? 'Peso de la porción que vas a consumir' 
                    : 'Peso de una unidad del producto'
                  }
                </div>
              </div>
              <div></div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {newCustomFood.dataType === 'per100g' 
                    ? 'Hidratos por 100g:' 
                    : 'Hidratos por unidad:'
                  }
                </label>
                <input
                  type="number"
                  placeholder="Ej: 15.5"
                  value={newCustomFood.carbsGrams}
                  onChange={(e) => setNewCustomFood(prev => ({ ...prev, carbsGrams: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                  step="0.1"
                  min="0"
                />
                <div className="text-xs text-gray-500 mt-1">
                  gramos de carbohidratos {newCustomFood.dataType === 'per100g' ? 'por 100g' : 'por unidad'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {newCustomFood.dataType === 'per100g' 
                    ? 'Proteínas por 100g:' 
                    : 'Proteínas por unidad:'
                  }
                </label>
                <input
                  type="number"
                  placeholder="Ej: 25.0"
                  value={newCustomFood.proteinGrams}
                  onChange={(e) => setNewCustomFood(prev => ({ ...prev, proteinGrams: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                  step="0.1"
                  min="0"
                />
                <div className="text-xs text-gray-500 mt-1">
                  gramos de proteínas {newCustomFood.dataType === 'per100g' ? 'por 100g' : 'por unidad'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {newCustomFood.dataType === 'per100g' 
                    ? 'Grasas por 100g:' 
                    : 'Grasas por unidad:'
                  }
                </label>
                <input
                  type="number"
                  placeholder="Ej: 8.2"
                  value={newCustomFood.fatGrams}
                  onChange={(e) => setNewCustomFood(prev => ({ ...prev, fatGrams: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                  step="0.1"
                  min="0"
                />
                <div className="text-xs text-gray-500 mt-1">
                  gramos de grasas {newCustomFood.dataType === 'per100g' ? 'por 100g' : 'por unidad'}
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={addCustomFood}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Calcular y Añadir
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3">Alimentos Personalizados ({customFoods.length})</h4>
            {customFoods.length === 0 ? (
              <div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded">
                No tienes alimentos personalizados aún
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customFoods.map(food => (
                  <div key={food.id} className="border rounded p-4 bg-green-50">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-bold">{food.name}</h5>
                      <button
                        onClick={() => deleteCustomFood(food.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      <strong>Porción:</strong> {food.grams}g
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">📊 Unidades de Macros:</div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-center">
                        {food.carbs > 0 && (
                          <div className="bg-green-200 p-2 rounded">
                            <div className="font-bold">{food.carbs}</div>
                            <div>Hidratos</div>
                          </div>
                        )}
                        {food.protein > 0 && (
                          <div className="bg-blue-200 p-2 rounded">
                            <div className="font-bold">{food.protein}</div>
                            <div>Proteína</div>
                          </div>
                        )}
                        {food.fat > 0 && (
                          <div className="bg-yellow-200 p-2 rounded">
                            <div className="font-bold">{food.fat}</div>
                            <div>Grasa</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {food.originalNutrition && (
                      <div className="text-xs text-gray-500 border-t pt-2">
                        <div className="font-medium mb-1">
                          {food.originalNutrition.dataType === 'per100g' ? '🥗 Por 100g:' : '🍪 Por unidad:'}
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-center">
                          {food.originalNutrition.dataType === 'per100g' ? (
                            <>
                              {food.originalNutrition.carbsPer100g > 0 && (
                                <div>{food.originalNutrition.carbsPer100g}g H</div>
                              )}
                              {food.originalNutrition.proteinPer100g > 0 && (
                                <div>{food.originalNutrition.proteinPer100g}g P</div>
                              )}
                              {food.originalNutrition.fatPer100g > 0 && (
                                <div>{food.originalNutrition.fatPer100g}g G</div>
                              )}
                            </>
                          ) : (
                            <>
                              {food.originalNutrition.originalCarbsPerUnit > 0 && (
                                <div>{food.originalNutrition.originalCarbsPerUnit}g H</div>
                              )}
                              {food.originalNutrition.originalProteinPerUnit > 0 && (
                                <div>{food.originalNutrition.originalProteinPerUnit}g P</div>
                              )}
                              {food.originalNutrition.originalFatPerUnit > 0 && (
                                <div>{food.originalNutrition.originalFatPerUnit}g G</div>
                              )}
                            </>
                          )}
                        </div>
                        {food.originalNutrition.dataType === 'perUnit' && (
                          <div className="mt-2 pt-1 border-t border-gray-200">
                            <div className="font-medium mb-1">📊 Equivale por 100g:</div>
                            <div className="grid grid-cols-3 gap-1 text-center">
                              {food.originalNutrition.carbsPer100g > 0 && (
                                <div>{food.originalNutrition.carbsPer100g}g H</div>
                              )}
                              {food.originalNutrition.proteinPer100g > 0 && (
                                <div>{food.originalNutrition.proteinPer100g}g P</div>
                              )}
                              {food.originalNutrition.fatPer100g > 0 && (
                                <div>{food.originalNutrition.fatPer100g}g G</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Recetas</h3>
          
          <div className="bg-blue-50 p-4 rounded">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Nombre de la receta..."
                value={newRecipeName}
                onChange={(e) => setNewRecipeName(e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
              />
              <button
                onClick={saveRecipe}
                disabled={!newRecipeName || selectedFoods.length === 0}
                className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Guardar
              </button>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {selectedFoods.length} alimentos seleccionados en el planificador
            </div>
          </div>

          <div className="grid gap-4">
            {recipes.map(recipe => (
              <div key={recipe.id} className="border rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold">{recipe.name}</h5>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadRecipe(recipe)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Usar
                    </button>
                    <button
                      onClick={() => setRecipes(prev => prev.filter(r => r.id !== recipe.id))}
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-sm text-center mb-2">
                  <div className="bg-green-100 p-2 rounded">
                    <div className="font-bold">{recipe.totalMacros.carbs.toFixed(1)}</div>
                    <div className="text-xs">H</div>
                  </div>
                  <div className="bg-blue-100 p-2 rounded">
                    <div className="font-bold">{recipe.totalMacros.protein.toFixed(1)}</div>
                    <div className="text-xs">P</div>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded">
                    <div className="font-bold">{recipe.totalMacros.fat.toFixed(1)}</div>
                    <div className="text-xs">G</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <div className="font-bold">{recipe.totalMacros.grams.toFixed(0)}g</div>
                    <div className="text-xs">Peso</div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600">
                  <strong>Ingredientes:</strong> {recipe.ingredients.map(i => i.name).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h3 className="font-bold text-xl">⚙️ Configuración</h3>
          
          {/* Configuración de planes de comida */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              🍽️ Configuración de Comidas
              <button
                onClick={resetMealPlansToDefault}
                className="ml-auto bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                🔄 Restaurar Valores por Defecto
              </button>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(currentMealPlans).map(([mealName, macros]) => (
                <div key={mealName} className="bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-bold">{mealName}</h5>
                    <button
                      onClick={() => startEditingMealPlan(mealName)}
                      className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      Editar
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm text-center mb-3">
                    <div className="bg-green-100 p-2 rounded">
                      <div className="font-bold">{macros.carbs}</div>
                      <div className="text-xs">Hidratos</div>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <div className="font-bold">{macros.protein}</div>
                      <div className="text-xs">Proteína</div>
                    </div>
                    <div className="bg-yellow-100 p-2 rounded">
                      <div className="font-bold">{macros.fat}</div>
                      <div className="text-xs">Grasa</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center">
                    ~{((macros.carbs * 4) + (macros.protein * 4) + (macros.fat * 9)).toFixed(0)} kcal estimadas
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-blue-100 rounded text-sm">
              <strong>💡 Consejo:</strong> Puedes modificar los objetivos de macros de cada comida según tus necesidades específicas. 
              Los cambios se aplicarán inmediatamente en el Planificador y cálculos del Registro Diario.
            </div>
          </div>

          {/* Resumen de configuración actual */}
          <div className="bg-white border rounded-lg p-6">
            <h4 className="font-bold text-lg mb-4">📊 Resumen de tu Configuración</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-3">📈 Totales Diarios Actuales:</h5>
                {(() => {
                  const currentTotals = Object.values(currentMealPlans).reduce((acc, meal) => ({
                    carbs: acc.carbs + meal.carbs,
                    protein: acc.protein + meal.protein,
                    fat: acc.fat + meal.fat
                  }), { carbs: 0, protein: 0, fat: 0 });
                  
                  const currentCalories = (currentTotals.carbs * 4) + (currentTotals.protein * 4) + (currentTotals.fat * 9);
                  
                  return (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Hidratos:</span>
                        <span className="font-bold">{currentTotals.carbs} unidades ({(currentTotals.carbs * CONVERSION_FACTORS.carbs).toFixed(0)}g)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Proteína:</span>
                        <span className="font-bold">{currentTotals.protein} unidades ({(currentTotals.protein * CONVERSION_FACTORS.protein).toFixed(0)}g)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grasa:</span>
                        <span className="font-bold">{currentTotals.fat} unidades ({(currentTotals.fat * CONVERSION_FACTORS.fat).toFixed(0)}g)</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Calorías estimadas:</span>
                        <span className="font-bold">{currentCalories.toFixed(0)} kcal</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
              
              <div>
                <h5 className="font-medium mb-3">🎯 Objetivos Originales del Sistema:</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Hidratos:</span>
                    <span>9 unidades (217g)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Proteína:</span>
                    <span>3 unidades (65g)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grasa:</span>
                    <span>6 unidades (64g)</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Calorías:</span>
                    <span>1709 kcal</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-100 rounded text-sm">
              <strong>⚠️ Nota:</strong> Los objetivos del "Registro Diario" siguen usando los valores originales del sistema (9H, 3P, 6G). 
              Esta configuración solo afecta a los planes individuales de comida.
            </div>
          </div>

          {/* Información del sistema */}
          <div className="bg-gray-50 p-4 rounded text-sm">
            <h5 className="font-medium mb-2">🔢 Factores de Conversión del Sistema:</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-bold">1 Unidad Hidrato</div>
                <div className="text-gray-600">{CONVERSION_FACTORS.carbs.toFixed(2)}g</div>
              </div>
              <div>
                <div className="font-bold">1 Unidad Proteína</div>
                <div className="text-gray-600">{CONVERSION_FACTORS.protein.toFixed(2)}g</div>
              </div>
              <div>
                <div className="font-bold">1 Unidad Grasa</div>
                <div className="text-gray-600">{CONVERSION_FACTORS.fat.toFixed(2)}g</div>
              </div>
            </div>
          </div>

          {/* Gestión de datos */}
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h4 className="font-bold text-lg mb-4 text-red-800">💾 Gestión de Datos</h4>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border">
                <h5 className="font-medium mb-3">📤 Exportar mis datos</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Descarga un archivo de respaldo con todos tus alimentos personalizados, recetas y configuración.
                </p>
                <button
                  onClick={exportData}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
                >
                  📥 Descargar Backup
                </button>
              </div>

              <div className="bg-white p-4 rounded border">
                <h5 className="font-medium mb-3">📥 Importar datos</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Carga un archivo de respaldo para restaurar tus datos guardados.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                  id="importFile"
                />
                <label
                  htmlFor="importFile"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer inline-flex items-center gap-2"
                >
                  📁 Seleccionar Archivo
                </label>
              </div>

              <div className="bg-white p-4 rounded border border-red-200">
                <h5 className="font-medium mb-3 text-red-700">🗑️ Limpiar todos los datos</h5>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>⚠️ ¡Cuidado!</strong> Esta acción eliminará permanentemente todos tus datos: 
                  alimentos personalizados, recetas, configuración y registro diario.
                </p>
                <button
                  onClick={clearAllData}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  🗑️ Eliminar Todo
                </button>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-100 rounded text-sm">
              <strong>💡 Dato importante:</strong> Todos tus datos se guardan automáticamente en tu navegador. 
              No se envían a ningún servidor externo, manteniendo tu privacidad total.
              <br/><br/>
              <strong>📅 Registro diario:</strong> Se limpia automáticamente cada día para empezar fresco.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MacroDietApp;