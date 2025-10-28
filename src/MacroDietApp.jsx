const calculateOptimalPortions = () => {
    if (selectedFoods.length === 0) return;
    
    const goals = mealTypeGoals[selectedMealType];
    const targetCarbs = goals.carbs * conversions.carbs;
    const targetProtein = goals.protein * conversions.protein;
    const targetFats = goals.fats * conversions.fats;
    
    // Calcular cuánto aporta cada alimento por unidad
    const foodContributions = selectedFoods.map(food => ({
      food,
      carbsPerUnit: food.carbs,
      proteinPerUnit: food.protein,
      fatsPerUnit: food.fats
    }));
    
    // Encontrar el factor de escala óptimo iterativamente
    let bestFactor = 1;
    let minError = Infinity;
    
    // Probar diferentes factores de escala
    for (let factor = 0.1; factor <= 5; factor += 0.1) {
      const scaledCarbs = selectedFoods.reduce((sum, f) => sum + (f.carbs * f.quantity * factor), 0);
      const scaledProtein = selectedFoods.reduce((sum, f) => sum + (f.protein * f.quantity * factor), 0);
      const scaledFats = selectedFoods.reduce((sum, f) => sum + (f.fats * f.quantity * factor), 0);
      
      // Calcular error ponderado (priorizamos acercarnos al objetivo)
      const carbError = Math.abs(scaledCarbs - targetCarbs) / Math.max(targetCarbs, 1);
      const proteinError = Math.abs(scaledProtein - targetProtein) / Math.max(targetProtein, 1);
      const fatError = Math.abs(scaledFats - targetFats) / Math.max(targetFats, 1);
      
      const totalError = carbError + proteinError + fatError;
      
      if (totalError < minError) {
        minError = totalError;
        bestFactor = factor;
      }
    }
    
    // Aplicar el mejor factor encontrado con un pequeño ajuste al alza para no quedarse corto
    const adjustedFactor = bestFactor * 1.05;
    
    setSelectedFoods(selectedFoods.map(f => ({
      ...f,
      quantity: Math.max(0.1, Math.round((f.quantity * adjustedFactor) * 10) / 10)
    })));
  };