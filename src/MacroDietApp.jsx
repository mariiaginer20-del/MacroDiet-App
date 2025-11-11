import React, { useState, useEffect } from 'react';
import { Home, Search, Calendar, Settings, ChevronDown, ChevronUp, Plus, BookOpen, Trash2 } from 'lucide-react';

const MacroDietApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [macroFilters, setMacroFilters] = useState({
    carbs: false,
    fats: false,
    protein: false
  });
  const [meals, setMeals] = useState([]);
  const [lastResetDate, setLastResetDate] = useState(null);
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
  mealTypes: [],
  time: { poco: false, medio: false, mucho: false },
  macros: { carbs: false, protein: false, fats: false }
});

const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [newFood, setNewFood] = useState({
    name: '',
    amount: '',
    carbs: 0,
    protein: 0,
    fats: 0
  });
  const [customFoods, setCustomFoods] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);
  const [showEditFoodModal, setShowEditFoodModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [showQuickAddModal, setShowQuickAddModal] = useState(false);
  const [quickAddFood, setQuickAddFood] = useState(null);
  const [quickAddQuantity, setQuickAddQuantity] = useState(1);
  
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
  { id: 1, name: 'Patata', amount: '130g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 2, name: 'Arroz/Pasta/Quinoa', amount: '30g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 3, name: 'Boniato', amount: '120g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 4, name: 'Korn Flakes', amount: '30g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 5, name: 'Copos/Harina Avena', amount: '30g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 6, name: 'Harina Trigo/Espelta', amount: '30g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 7, name: 'Cereales sin azÃºcar', amount: '25g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 8, name: 'Fruta (pieza)', amount: '1ud', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 9, name: 'Zumo de naranja', amount: '230ml', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 10, name: 'DÃ¡tiles/Fruta desecada', amount: '35g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 11, name: 'Mermelada con azÃºcar', amount: '50g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 12, name: 'Miel', amount: '25g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 13, name: 'Gnocchi de patata', amount: '60g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 14, name: 'Pan', amount: '40g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 15, name: 'Pan de molde Bimbo', amount: '2 rebanadas', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 16, name: 'Pan de molde integral', amount: '1.5 rebanadas', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 17, name: 'Tortilla de trigo', amount: '1ud', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 18, name: 'Tortitas arroz/maÃ­z', amount: '25g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 19, name: 'MaÃ­z dulce (lata)', amount: '125g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 20, name: 'Palomitas Popitas Zero', amount: '30g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 21, name: 'Papilla de cereales', amount: '2g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 22, name: 'AzÃºcar de mesa', amount: '25g', carbs: 24, fats: 0, protein: 0, label: 'H:1' },
  { id: 23, name: 'Pescado blanco', amount: '120g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 24, name: 'Molusco', amount: '120g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 25, name: 'Marisco', amount: '65g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 26, name: 'AtÃºn lata al natural', amount: '100g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 27, name: 'Claras de huevo', amount: '200g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 28, name: 'ProteÃ­na de suero', amount: '30g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 29, name: 'Pechuga pollo/pavo', amount: '100g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 30, name: 'Carne roja magra', amount: '90g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 31, name: 'Embutido sin grasa', amount: '50g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 32, name: 'Queso Eatlean', amount: '60g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 33, name: 'Yogur+proteÃ­nas natural', amount: '200g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 34, name: 'Soja texturizada', amount: '30g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 35, name: 'Heura (bocados/tiras)', amount: '75g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 36, name: 'SeitÃ¡n', amount: '100g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 37, name: 'Levadura nutricional', amount: '35g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 38, name: 'Aislado proteÃ­na vegetal', amount: '30g', carbs: 0, fats: 0, protein: 22, label: 'P:1' },
  { id: 39, name: 'AOVE (cuchara sopera)', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 40, name: 'Frutos secos', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 41, name: 'Cacahuete/Crema', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 42, name: 'Pipas calabaza/girasol', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 43, name: 'Semillas lino/chÃ­a', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 44, name: 'Aceitunas sin hueso', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 45, name: 'Coco', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 46, name: 'Aguacate', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 47, name: 'Chocolate >85%', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 48, name: 'Gazpacho sin pan', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 49, name: 'Bebida almendras zero', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 50, name: 'Mayonesa', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 51, name: 'Yogur griego', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 52, name: 'Queso curado/semicurado', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 53, name: 'Tahini', amount: '10g', carbs: 0, fats: 11, protein: 0, label: 'G:1' },
  { id: 54, name: 'Salsa de soja', amount: '140g', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 55, name: 'Leche desnatada', amount: '290ml', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 56, name: 'Leche+proteÃ­nas desnatada', amount: '230ml', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 57, name: 'Yogur+proteÃ­nas fresa', amount: '125g', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 58, name: 'Yogur+proteÃ­nas arÃ¡ndanos', amount: '200g', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 59, name: 'Yogur griego desnatado', amount: '170g', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 60, name: 'Yogur desnatado', amount: '280g', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 61, name: 'Legumbres cocidas', amount: '120g', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 62, name: 'Legumbres secas', amount: '30g', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 63, name: 'Harina de garbanzo', amount: '30g', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 64, name: 'Pasta lentejas rojas', amount: '30g', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 65, name: 'Alpro coco/avena', amount: '200ml', carbs: 12, fats: 0, protein: 11, label: '0.5P+0.5H' },
  { id: 66, name: 'Beyond Burger', amount: '40g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 67, name: 'Choriburguer Heura', amount: '65g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 68, name: 'Huevo', amount: '1ud (60-70g)', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 69, name: 'Queso fresco Burgos', amount: '55g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 70, name: 'Mozzarella fresca', amount: '45g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 71, name: 'JamÃ³n serrano/lomo', amount: '40g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 72, name: 'Carne roja', amount: '35g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 73, name: 'Hamburguesa de pollo', amount: '70g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 74, name: 'Hamburguesa ternera', amount: '60g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 75, name: 'Carne picada vacuno', amount: '55g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 76, name: 'Carne picada cerdo', amount: '55g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 77, name: 'SalmÃ³n/AtÃºn fresco', amount: '55g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 78, name: 'AtÃºn en aceite', amount: '40g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 79, name: 'Ventresca de atÃºn', amount: '50g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 80, name: 'Anchoas en aceite', amount: '50g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 81, name: 'Bonito/Sardina fresco', amount: '80g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 82, name: 'Trucha/Pez espada', amount: '70g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 83, name: 'Tofu', amount: '100g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 84, name: 'Tempeh de soja', amount: '80g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 85, name: 'Edamame', amount: '80g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 86, name: 'Bebida soja sin azÃºcar', amount: '330ml', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 87, name: 'Yogur Alpro Skyr', amount: '150g', carbs: 0, fats: 5.5, protein: 11, label: '0.5P+0.5G' },
  { id: 88, name: 'Leche entera', amount: '165ml', carbs: 6, fats: 5.5, protein: 5.5, label: '0.25H+0.2P+0.5G' },
  { id: 89, name: 'KÃ©fir', amount: '150ml', carbs: 6, fats: 5.5, protein: 5.5, label: '0.25H+0.2P+0.5G' },
  { id: 90, name: 'Yogur natural', amount: '165g', carbs: 6, fats: 5.5, protein: 5.5, label: '0.25H+0.2P+0.5G' },
  { id: 91, name: 'Bebida soja calcio', amount: '230ml', carbs: 6, fats: 5.5, protein: 5.5, label: '0.25H+0.2P+0.5G' },
  { id: 92, name: 'Leche semidesnatada', amount: '220ml', carbs: 12, fats: 2.75, protein: 5.5, label: '0.5H+0.25P+0.25G' },
  { id: 93, name: 'Cacahuete polvo desgraso', amount: '25g', carbs: 6, fats: 2.75, protein: 11, label: '0.25H+0.5P+0.25G' },
  { id: 94, name: 'Cacao puro desgrasado', amount: '25g', carbs: 6, fats: 2.75, protein: 11, label: '0.25H+0.5P+0.25G' },
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

    const savedCustomFoods = localStorage.getItem('customFoods');
    if (savedCustomFoods) setCustomFoods(JSON.parse(savedCustomFoods));
  }, []);

  const toggleMacroFilter = (macro) => {
    setMacroFilters(prev => ({ ...prev, [macro]: !prev[macro] }));
  };

const addCustomFood = () => {
    if (!newFood.name || !newFood.amount) return;
    
    const foodToAdd = {
      id: Date.now(),
      name: newFood.name,
      amount: newFood.amount,
      carbs: parseFloat(newFood.carbs) || 0,
      protein: parseFloat(newFood.protein) || 0,
      fats: parseFloat(newFood.fats) || 0,
      label: generateLabel(parseFloat(newFood.carbs) || 0, parseFloat(newFood.protein) || 0, parseFloat(newFood.fats) || 0),
      isCustom: true
    };
    
    const updatedCustomFoods = [...customFoods, foodToAdd];
    setCustomFoods(updatedCustomFoods);
    localStorage.setItem('customFoods', JSON.stringify(updatedCustomFoods));
    
    setNewFood({ name: '', amount: '', carbs: 0, protein: 0, fats: 0 });
    setShowAddFoodModal(false);
  };

  const generateLabel = (carbs, protein, fats) => {
    const parts = [];
    if (carbs > 0) parts.push(`H:${(carbs / conversions.carbs).toFixed(1)}`);
    if (protein > 0) parts.push(`P:${(protein / conversions.protein).toFixed(1)}`);
    if (fats > 0) parts.push(`G:${(fats / conversions.fats).toFixed(1)}`);
    return parts.join('+');
  };

const deleteCustomFood = (foodId) => {
    if (foodId > 1000) {
      const updatedCustomFoods = customFoods.filter(f => f.id !== foodId);
      setCustomFoods(updatedCustomFoods);
      localStorage.setItem('customFoods', JSON.stringify(updatedCustomFoods));
    }
  };
const confirmDeleteFood = () => {
    if (!foodToDelete) return;
    if (foodToDelete.isCustom) {
      const updatedCustomFoods = customFoods.filter(f => f.id !== foodToDelete.id);
      setCustomFoods(updatedCustomFoods);
      localStorage.setItem('customFoods', JSON.stringify(updatedCustomFoods));
    }
    setShowDeleteModal(false);
    setFoodToDelete(null);
  };

  const openEditModal = (food) => {
    setEditingFood({
      ...food,
      originalId: food.id
    });
    setShowEditFoodModal(true);
  };

const saveEditedFood = () => {
    if (!editingFood.name || !editingFood.amount) return;
    
    const updatedFood = {
      id: editingFood.originalId,
      name: editingFood.name,
      amount: editingFood.amount,
      carbs: parseFloat(editingFood.carbs) || 0,
      protein: parseFloat(editingFood.protein) || 0,
      fats: parseFloat(editingFood.fats) || 0,
      label: generateLabel(parseFloat(editingFood.carbs) || 0, parseFloat(editingFood.protein) || 0, parseFloat(editingFood.fats) || 0),
      isCustom: true
    };
    
    if (editingFood.isCustom) {
      const updatedCustomFoods = customFoods.map(f => 
        f.id === editingFood.originalId ? updatedFood : f
      );
      setCustomFoods(updatedCustomFoods);
      localStorage.setItem('customFoods', JSON.stringify(updatedCustomFoods));
    }
    
    setEditingFood(null);
    setShowEditFoodModal(false);
  };

const filteredFoods = [...foodDatabase, ...customFoods].filter(food => {
  const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
  if (!macroFilters.carbs && !macroFilters.fats && !macroFilters.protein) return matchesSearch;
  
  // Verificar quÃ© macros tiene el alimento (mÃ¡s flexible)
  const hasCarbs = food.carbs > 0;
  const hasFats = food.fats > 0;
  const hasProtein = food.protein > 0;
  
  // Contar cuÃ¡ntos filtros estÃ¡n activos
  const activeFilters = [macroFilters.carbs, macroFilters.protein, macroFilters.fats].filter(Boolean).length;
  
  // Si solo hay 1 filtro activo, mostrar alimentos con ESA macro principalmente
  if (activeFilters === 1) {
    if (macroFilters.carbs) return matchesSearch && food.carbs >= 10;
    if (macroFilters.protein) return matchesSearch && food.protein >= 10;
    if (macroFilters.fats) return matchesSearch && food.fats >= 5;
  }
  
  // Si hay 2+ filtros activos, el alimento debe tener TODAS las macros seleccionadas
  const meetsFilters = 
    (!macroFilters.carbs || hasCarbs) &&
    (!macroFilters.fats || hasFats) &&
    (!macroFilters.protein || hasProtein);
  
  return matchesSearch && meetsFilters;
});

const openQuickAddModal = (food) => {
  setQuickAddFood(food);
  setQuickAddQuantity(1);
  setShowQuickAddModal(true);
};

const confirmQuickAdd = () => {
  if (!quickAddFood) return;
  
  const newMeal = {
    id: Date.now(),
    name: 'Comida rÃ¡pida',
    time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    foods: [{ ...quickAddFood, quantity: quickAddQuantity }]
  };
  const updatedMeals = [...meals, newMeal];
  setMeals(updatedMeals);
  localStorage.setItem('meals', JSON.stringify(updatedMeals));
  
  setShowQuickAddModal(false);
  setQuickAddFood(null);
  setQuickAddQuantity(1);
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
  
  // Resetear todas las cantidades a 1 primero
  const resetFoods = selectedFoods.map(f => ({ ...f, quantity: 1 }));
  
  // Calcular gramos con cantidad = 1
  const baseCarbs = resetFoods.reduce((sum, f) => sum + f.carbs, 0);
  const baseProtein = resetFoods.reduce((sum, f) => sum + f.protein, 0);
  const baseFats = resetFoods.reduce((sum, f) => sum + f.fats, 0);
  
  // Calcular gramos objetivo
  const targetCarbs = goals.carbs * conversions.carbs;
  const targetProtein = goals.protein * conversions.protein;
  const targetFats = goals.fats * conversions.fats;
  
  // Calcular el factor necesario (priorizar el macro con mayor objetivo)
  let factor = 1;
  
  if (goals.carbs > 0 && baseCarbs > 0) {
    factor = targetCarbs / baseCarbs;
  } else if (goals.fats > 0 && baseFats > 0) {
    factor = targetFats / baseFats;
  } else if (goals.protein > 0 && baseProtein > 0) {
    factor = targetProtein / baseProtein;
  }
  
  // NO redondear el factor, redondear solo el resultado final
  setSelectedFoods(resetFoods.map(f => ({
    ...f,
    quantity: Math.round(factor * 1000) / 1000  // 3 decimales para mÃ¡s precisiÃ³n
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

const MacroTag = ({ carbs, fats, protein, conversions }) => {
  // Calcular las unidades con redondeo inteligente
  const carbUnits = carbs > 0 ? Math.round((carbs / conversions.carbs) * 100) / 100 : 0;
  const proteinUnits = protein > 0 ? Math.round((protein / conversions.protein) * 100) / 100 : 0;
  const fatUnits = fats > 0 ? Math.round((fats / conversions.fats) * 100) / 100 : 0;
  
  return (
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
            H:{carbUnits}
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
            P:{proteinUnits}
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
            G:{fatUnits}
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
    { id: 'home', label: 'Mi DÃ­a', icon: Home },
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
                Resumen del DÃ­a
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
                  <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Unidades ProteÃ­na</div>
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
                  <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>CalorÃ­as</div>
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
                  Equivalente en gramos
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
                      ProteÃ­na consumida
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
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    {meals.map(meal => {                    const mealTotals = meal.foods.reduce((sum, f) => ({
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
<button
                onClick={() => setShowAddFoodModal(true)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Plus size={18} />
                AÃ±adir Alimento Personalizado
              </button>

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
            ProteÃ­nas {macroFilters.protein && 'Ã¢Å“â€œ'}
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
                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                  {food.name}
                  {food.isCustom && (
                    <span style={{
                      marginLeft: '0.5rem',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.625rem',
                      background: '#dbeafe',
                      color: '#1e40af',
                      fontWeight: '600'
                    }}>
                      Personalizado
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>{food.amount}</div>
                <MacroTag carbs={food.carbs} fats={food.fats} protein={food.protein} conversions={conversions} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
<button
  onClick={() => openQuickAddModal(food)}
  style={{
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
    background: 'linear-gradient(135deg, #a855f7, #9333ea)',
    color: 'white',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    minWidth: '90px'
  }}
>
  + AÃ±adir
</button>
<button
  onClick={() => openEditModal(food)}
  style={{
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    minWidth: '90px'
  }}
>
  Modificar
</button>
<button
  onClick={() => {
    setFoodToDelete(food);
    setShowDeleteModal(true);
  }}
  style={{
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    minWidth: '90px'
  }}
>
  Eliminar
</button>
              </div>
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
                    ProteÃ­nas {macroFilters.protein && 'Ã¢Å“â€œ'}
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
  {food.quantity !== 1 
    ? `${(parseFloat(food.amount) * food.quantity).toFixed(1)}${food.amount.replace(/[0-9.]/g, '')}`
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
                      <Trash2 size={18} />
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
                        ProteÃ­nas: {((selectedFoods.reduce((sum, f) => sum + (f.protein * f.quantity), 0)) / conversions.protein).toFixed(1)} / {mealTypeGoals[selectedMealType]?.protein || 0}
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

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
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
    Registrar
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
                  Guardar Comida
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
                      Tiempo invertido:
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
  <div style={{ paddingBottom: '6rem' }}>
    <div style={{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '1rem',
      padding: '1.25rem',
      marginBottom: '1rem'
    }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        Mis Recetas Guardadas
      </h2>
      
      <input
        type="text"
        placeholder="Buscar recetas..."
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
    Filtrar por tipo de comida:
  </div>
  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
    {mealTypes.map(mealType => (
      <button
        key={mealType.id}
        onClick={() => {
          const currentTypes = recipeFilters.mealTypes || [];
          const isSelected = currentTypes.includes(mealType.name);
          setRecipeFilters(prev => ({
            ...prev,
            mealTypes: isSelected 
              ? currentTypes.filter(t => t !== mealType.name)
              : [...currentTypes, mealType.name]
          }));
        }}
        style={{
          padding: '0.375rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: (recipeFilters.mealTypes || []).includes(mealType.name) ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.1)',
          color: (recipeFilters.mealTypes || []).includes(mealType.name) ? 'rgb(107, 33, 168)' : 'rgb(147, 51, 234)',
          border: (recipeFilters.mealTypes || []).includes(mealType.name) ? '2px solid rgb(168, 85, 247)' : '1px solid rgba(168, 85, 247, 0.3)',
          cursor: 'pointer'
        }}
      >
        {mealType.name} {(recipeFilters.mealTypes || []).includes(mealType.name) && 'âœ“'}
      </button>
    ))}
  </div>

  <div style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: '600', marginBottom: '0.5rem' }}>
    Filtrar por tiempo:
  </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {['poco', 'medio', 'mucho'].map(time => (
            <button
              key={time}
              onClick={() => setRecipeFilters(prev => ({
                ...prev,
                time: { ...prev.time, [time]: !prev.time[time] }
              }))}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: recipeFilters.time[time] ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.1)',
                color: recipeFilters.time[time] ? 'rgb(107, 33, 168)' : 'rgb(147, 51, 234)',
                border: recipeFilters.time[time] ? '2px solid rgb(168, 85, 247)' : '1px solid rgba(168, 85, 247, 0.3)',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {time} {recipeFilters.time[time] && 'âœ“'}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: '600', marginBottom: '0.5rem' }}>
          Filtrar por macros:
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setRecipeFilters(prev => ({
              ...prev,
              macros: { ...prev.macros, carbs: !prev.macros.carbs }
            }))}
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
            Alto en Hidratos {recipeFilters.macros.carbs && 'âœ“'}
          </button>
          <button
            onClick={() => setRecipeFilters(prev => ({
              ...prev,
              macros: { ...prev.macros, protein: !prev.macros.protein }
            }))}
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
            Alto en ProteÃ­na {recipeFilters.macros.protein && 'âœ“'}
          </button>
          <button
            onClick={() => setRecipeFilters(prev => ({
              ...prev,
              macros: { ...prev.macros, fats: !prev.macros.fats }
            }))}
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
            Alto en Grasas {recipeFilters.macros.fats && 'âœ“'}
          </button>
        </div>
      </div>

{savedMeals.filter(recipe => {
  const matchesSearch = recipe.name.toLowerCase().includes(recipeSearchTerm.toLowerCase());
  
  const matchesMealType = !(recipeFilters.mealTypes || []).length
    || (recipeFilters.mealTypes || []).includes(recipe.type);
  
  const matchesTime = (
    (!recipeFilters.time.poco && !recipeFilters.time.medio && !recipeFilters.time.mucho)
    || recipeFilters.time[recipe.timeInvested]
  );
  
  const recipeTotals = recipe.foods.reduce((sum, f) => ({
    carbs: sum.carbs + (f.carbs * (f.quantity || 1)),
    protein: sum.protein + (f.protein * (f.quantity || 1)),
    fats: sum.fats + (f.fats * (f.quantity || 1))
  }), { carbs: 0, protein: 0, fats: 0 });
  
// Calcular cuÃ¡l es el macro dominante en la receta
const totalMacros = recipeTotals.carbs + recipeTotals.protein + recipeTotals.fats;
const carbsPercentage = (recipeTotals.carbs / totalMacros) * 100;
const proteinPercentage = (recipeTotals.protein / totalMacros) * 100;
const fatsPercentage = (recipeTotals.fats / totalMacros) * 100;

// Una receta es "alta en X" si ese macro representa mÃ¡s del 50% del total
// Y los otros dos macros representan menos del 30% cada uno
const isHighCarbs = carbsPercentage > 50 && proteinPercentage < 30 && fatsPercentage < 30;
const isHighProtein = proteinPercentage > 50 && carbsPercentage < 30 && fatsPercentage < 30;
const isHighFats = fatsPercentage > 50 && carbsPercentage < 30 && proteinPercentage < 30;

const matchesMacros = !recipeFilters.macros.carbs && !recipeFilters.macros.protein && !recipeFilters.macros.fats
  || (recipeFilters.macros.carbs && isHighCarbs)
  || (recipeFilters.macros.protein && isHighProtein)
  || (recipeFilters.macros.fats && isHighFats);
  
  return matchesSearch && matchesMealType && matchesTime && matchesMacros;
}).length === 0 ? (
        <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem 0' }}>
          No hay recetas guardadas
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
{savedMeals.filter(recipe => {
  const matchesSearch = recipe.name.toLowerCase().includes(recipeSearchTerm.toLowerCase());
  
  const matchesMealType = !(recipeFilters.mealTypes || []).length
    || (recipeFilters.mealTypes || []).includes(recipe.type);
  
  const matchesTime = !recipeFilters.time.poco && !recipeFilters.time.medio && !recipeFilters.time.mucho
    || recipeFilters.time[recipe.timeInvested];
  
  const recipeTotals = recipe.foods.reduce((sum, f) => ({
    carbs: sum.carbs + (f.carbs * (f.quantity || 1)),
    protein: sum.protein + (f.protein * (f.quantity || 1)),
    fats: sum.fats + (f.fats * (f.quantity || 1))
  }), { carbs: 0, protein: 0, fats: 0 });
  
  const hasHighCarbs = recipeTotals.carbs > 50;
  const hasHighProtein = recipeTotals.protein > 30;
  const hasHighFats = recipeTotals.fats > 20;
  
const matchesMacros = (
  (!recipeFilters.macros.carbs && !recipeFilters.macros.protein && !recipeFilters.macros.fats)
  || (recipeFilters.macros.carbs && hasHighCarbs)
  || (recipeFilters.macros.protein && hasHighProtein)
  || (recipeFilters.macros.fats && hasHighFats)
);
  
  return matchesSearch && matchesMealType && matchesTime && matchesMacros;
}).map(recipe => {
            const recipeTotals = recipe.foods.reduce((sum, f) => ({
              carbs: sum.carbs + (f.carbs * (f.quantity || 1)),
              protein: sum.protein + (f.protein * (f.quantity || 1)),
              fats: sum.fats + (f.fats * (f.quantity || 1))
            }), { carbs: 0, protein: 0, fats: 0 });

            return (
              <div key={recipe.id} style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: '700', fontSize: '1rem', color: '#1f2937', marginBottom: '0.25rem' }}>
                      {recipe.name}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      {recipe.type} â€¢ Tiempo: {recipe.timeInvested}
                    </div>
                    <MacroTag carbs={recipeTotals.carbs} fats={recipeTotals.fats} protein={recipeTotals.protein} conversions={conversions} />
                  </div>
                </div>

<div style={{ fontSize: '0.75rem', color: '#4b5563', marginBottom: '0.75rem' }}>
  <strong>Ingredientes:</strong>
  <ul style={{ marginTop: '0.25rem', marginLeft: '1.25rem' }}>
    {recipe.foods.map(food => {
      const baseAmount = parseFloat(food.amount.match(/[\d.]+/)?.[0] || 1);
      const unit = food.amount.replace(/[\d.]+/g, '').trim();
      const totalAmount = Math.round(baseAmount * food.quantity);
      
      return (
        <li key={food.id}>
          {food.name} - {totalAmount}{unit}
        </li>
      );
    })}
  </ul>
</div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => loadRecipe(recipe)}
                    style={{
                      flex: 1,
                      padding: '0.625rem',
                      background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                      color: 'white',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Usar Receta
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    style={{
                      padding: '0.625rem 1rem',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: 'white',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
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
                Conversiones de Macros
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
                Define cuÃ¡ntos gramos equivalen a 1 unidad de cada macro
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
                    1 Unidad de ProteÃ­na =
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
                  Tipos de Comidas
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
                  + AÃ±adir
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
                              ProteÃ­na
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
                            Eliminar
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

{showDeleteModal && (
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
              Ã‚Â¿Eliminar alimento?
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Â¿EstÃ¡s seguro de que quieres eliminar <strong>{foodToDelete?.name}</strong>? Esta acciÃ³n no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setFoodToDelete(null);
                }}
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
                onClick={confirmDeleteFood}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditFoodModal && editingFood && (
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
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
              Modificar Alimento
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', display: 'block', marginBottom: '0.5rem' }}>
                  Nombre del alimento *
                </label>
                <input
                  type="text"
                  value={editingFood.name}
                  onChange={(e) => setEditingFood({...editingFood, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', display: 'block', marginBottom: '0.5rem' }}>
                  Cantidad de referencia *
                </label>
                <input
                  type="text"
                  value={editingFood.amount}
                  onChange={(e) => setEditingFood({...editingFood, amount: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#16a34a', display: 'block', marginBottom: '0.5rem' }}>
                    Hidratos (g)
                  </label>
                  <input
                    type="number"
                    value={editingFood.carbs}
                    onChange={(e) => setEditingFood({...editingFood, carbs: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #16a34a',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#2563eb', display: 'block', marginBottom: '0.5rem' }}>
                    ProteÃ­na (g)
                  </label>
                  <input
                    type="number"
                    value={editingFood.protein}
                    onChange={(e) => setEditingFood({...editingFood, protein: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #2563eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d97706', display: 'block', marginBottom: '0.5rem' }}>
                    Grasas (g)
                  </label>
                  <input
                    type="number"
                    value={editingFood.fats}
                    onChange={(e) => setEditingFood({...editingFood, fats: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #d97706',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    setShowEditFoodModal(false);
                    setEditingFood(null);
                  }}
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
                  onClick={saveEditedFood}
                  disabled={!editingFood.name || !editingFood.amount}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: (!editingFood.name || !editingFood.amount) ? '#d1d5db' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: (!editingFood.name || !editingFood.amount) ? 'not-allowed' : 'pointer',
                    opacity: (!editingFood.name || !editingFood.amount) ? 0.5 : 1
                  }}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

{showQuickAddModal && quickAddFood && (
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
        Â¿CuÃ¡nto quieres aÃ±adir?
      </h3>
      
      <div style={{
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{ fontWeight: '600', fontSize: '1rem', color: '#1f2937', marginBottom: '0.5rem' }}>
          {quickAddFood.name}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
          {quickAddFood.amount}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={() => setQuickAddQuantity(Math.max(0.1, quickAddQuantity - 0.1))}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            âˆ’
          </button>
          
          <input
            type="number"
            value={quickAddQuantity}
            onChange={(e) => setQuickAddQuantity(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            style={{
              width: '80px',
              padding: '0.75rem',
              textAlign: 'center',
              border: '2px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}
            min="0.1"
            step="0.1"
          />
          
          <button
            onClick={() => setQuickAddQuantity(quickAddQuantity + 0.1)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            +
          </button>
        </div>
        
        <div style={{
          background: 'linear-gradient(to bottom, #f0fdf4 0%, #f9fafb 100%)',
          border: '1px solid #d1fae5',
          borderRadius: '0.5rem',
          padding: '0.75rem'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: '600', marginBottom: '0.5rem' }}>
            Total a aÃ±adir:
          </div>
          
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            {(quickAddFood.carbs * quickAddQuantity) > 0 && (
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: 'rgba(34, 197, 94, 0.15)',
                color: 'rgb(22, 163, 74)',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}>
                H:{((quickAddFood.carbs * quickAddQuantity) / conversions.carbs).toFixed(1)}
              </span>
            )}
            {(quickAddFood.protein * quickAddQuantity) > 0 && (
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: 'rgba(59, 130, 246, 0.15)',
                color: 'rgb(37, 99, 235)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                P:{((quickAddFood.protein * quickAddQuantity) / conversions.protein).toFixed(1)}
              </span>
            )}
            {(quickAddFood.fats * quickAddQuantity) > 0 && (
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: 'rgba(245, 158, 11, 0.15)',
                color: 'rgb(217, 119, 6)',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}>
                G:{((quickAddFood.fats * quickAddQuantity) / conversions.fats).toFixed(1)}
              </span>
            )}
          </div>
          
          <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>
            {Math.round(quickAddFood.carbs * quickAddQuantity)}g H | {Math.round(quickAddFood.protein * quickAddQuantity)}g P | {Math.round(quickAddFood.fats * quickAddQuantity)}g G
          </div>
          
          <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.5rem' }}>
            Cantidad: {quickAddQuantity !== 1 
              ? `${(parseFloat(quickAddFood.amount) * quickAddQuantity).toFixed(1)}${quickAddFood.amount.replace(/[0-9.]/g, '')}`
              : quickAddFood.amount
            }
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => {
            setShowQuickAddModal(false);
            setQuickAddFood(null);
            setQuickAddQuantity(1);
          }}
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
          onClick={confirmQuickAdd}
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
          Confirmar
        </button>
      </div>
    </div>
  </div>
)}

{showAddFoodModal && (
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
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
              AÃ±adir Alimento Personalizado
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', display: 'block', marginBottom: '0.5rem' }}>
                  Nombre del alimento *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Yogur casero"
                  value={newFood.name}
                  onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', display: 'block', marginBottom: '0.5rem' }}>
                  Cantidad de referencia *
                </label>
                <input
                  type="text"
                  placeholder="Ej: 100g, 1 unidad, 200ml"
                  value={newFood.amount}
                  onChange={(e) => setNewFood({...newFood, amount: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#16a34a', display: 'block', marginBottom: '0.5rem' }}>
                    Hidratos (g)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newFood.carbs}
                    onChange={(e) => setNewFood({...newFood, carbs: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #16a34a',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#2563eb', display: 'block', marginBottom: '0.5rem' }}>
                    ProteÃ­na (g)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newFood.protein}
                    onChange={(e) => setNewFood({...newFood, protein: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #2563eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d97706', display: 'block', marginBottom: '0.5rem' }}>
                    Grasas (g)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newFood.fats}
                    onChange={(e) => setNewFood({...newFood, fats: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #d97706',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                fontSize: '0.75rem',
                color: '#166534'
              }}>
                <strong>Nota:</strong> Introduce los valores nutricionales para la cantidad de referencia que especificaste arriba.
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    setShowAddFoodModal(false);
                    setNewFood({ name: '', amount: '', carbs: 0, protein: 0, fats: 0 });
                  }}
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
                  onClick={addCustomFood}
                  disabled={!newFood.name || !newFood.amount}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: (!newFood.name || !newFood.amount) ? '#d1d5db' : 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: (!newFood.name || !newFood.amount) ? 'not-allowed' : 'pointer',
                    opacity: (!newFood.name || !newFood.amount) ? 0.5 : 1
                  }}
                >
                  AÃ±adir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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