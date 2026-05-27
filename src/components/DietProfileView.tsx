import React, { useState } from "react";
import { 
  Leaf, HeartPulse, Sun, Dumbbell, TriangleAlert, Timer, 
  CheckCircle2, XCircle, Flame, ShoppingBag, Info, Eye, ChevronRight 
} from "lucide-react";
import { DietDetails, Recipe, Product } from "../types";
import { RECIPES, PRODUCTS } from "../data";

interface DietProfileViewProps {
  profile: DietDetails;
  onAddToCart: (product: Product, quantity?: number) => void;
  onNavigateToStore: () => void;
}

export const DietProfileView: React.FC<DietProfileViewProps> = ({ 
  profile, 
  onAddToCart,
  onNavigateToStore
}) => {
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [addedPacks, setAddedPacks] = useState<Record<string, boolean>>({});

  // Filter curated recipes for this specific category
  const activeRecipes = RECIPES.filter((r) => r.category === profile.id);

  // Get matching store items for this diet
  const recommendedStoreProducts = PRODUCTS.filter(
    (p) => p.targetCategory === profile.id
  );

  // Dynamic icon matching corresponding to Lucide specs
  const renderProfileIcon = (iconName: string) => {
    switch (iconName) {
      case "Leaf":
        return <Leaf className="w-10 h-10 text-emerald-600" />;
      case "HeartPulse":
        return <HeartPulse className="w-10 h-10 text-rose-600 animate-pulse" />;
      case "Sun":
        return <Sun className="w-10 h-10 text-amber-500" />;
      case "Dumbbell":
        return <Dumbbell className="w-10 h-10 text-indigo-600" />;
      default:
        return <Info className="w-10 h-10 text-stone-600" />;
    }
  };

  // Convert recipe ingredients list into a beautiful mock product pack and add to cart!
  const handleAddAllRecipeIngredientsToCart = (recipe: Recipe) => {
    const virtualProduct: Product = {
      id: `virtual-pack-${recipe.id}`,
      name: `${recipe.name} (Fresh Ingredients Pack)`,
      price: 24.99,
      rating: 4.9,
      imageUrl: recipe.imageUrl,
      description: `All pre-portioned cold-shipped fresh ingredients required to cook: ${recipe.name}. Spices included.`,
      healthBenefit: `Full organic ingredient toolkit matched for: ${profile.title}.`,
      targetCategory: profile.id as any,
      allergenAlert: `Ingredients contain possible allergens: ${profile.warning.allergenTriggers.join(", ")}. Check recipe list before cooking.`,
      stockCount: 50
    };
    onAddToCart(virtualProduct, 1);
    setAddedPacks(prev => ({ ...prev, [recipe.id]: true }));
    setTimeout(() => {
      setAddedPacks(prev => ({ ...prev, [recipe.id]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Bio Focus Jumbotron Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 shadow-xs">
              {renderProfileIcon(profile.icon)}
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 rounded-full py-1 px-3.5 border border-stone-200">
                Diet Blueprint Target
              </span>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-stone-900 mt-1">
                {profile.title}
              </h1>
            </div>
          </div>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-2xl font-sans">
            {profile.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {profile.essentialNutrientFocus.map((stat, i) => (
              <span key={i} className="text-xs bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-xl font-mono text-stone-700">
                ⚡ Focus: {stat}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 md:w-80 space-y-2 shrink-0">
          <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest block">Diet Goal Mantra</span>
          <p className="text-xs leading-relaxed italic text-stone-700 font-sans">
            &ldquo;{profile.keyMantra}&rdquo;
          </p>
        </div>
      </div>

      {/* Warning Zone Callout */}
      <div className={`p-6 border-l-4 rounded-2xl shadow-xs leading-relaxed bg-white border border-stone-200 ${
        profile.warning.urgency === "critical" ? "border-l-rose-500" : "border-l-amber-500"
      }`}>
        <div className="flex items-start gap-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            profile.warning.urgency === "critical" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
          }`}>
            <TriangleAlert className="w-5.5 h-5.5" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-display font-bold text-stone-900 text-base md:text-lg flex items-center gap-2">
              {profile.warning.title}
              <span className={`text-[10px] font-mono capitalize tracking-wide py-0.5 px-2 rounded-full font-semibold border ${
                profile.warning.urgency === "critical" ? "bg-rose-50 text-rose-700 border-rose-250" : "bg-amber-50 text-amber-700 border-amber-250"
              }`}>
                {profile.warning.urgency} Caution
              </span>
            </h3>
            <p className="text-stone-700 text-sm font-semibold leading-normal">
              {profile.warning.message}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
                <span className="text-xs font-semibold text-stone-900 font-display flex items-center gap-2.5">
                  🛡️ Essential Protocols & Tips:
                </span>
                <ul className="space-y-1.5">
                  {profile.warning.subPoints.map((pt, idx) => (
                    <li key={idx} className="text-stone-600 text-xs pl-3 relative before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-stone-400 font-sans">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
                <span className="text-xs font-semibold text-stone-900 font-display flex items-center gap-2.5">
                  🌾 Known Allergen Triggers & Risks:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {profile.warning.allergenTriggers.map((alg, idx) => (
                    <span key={idx} className="text-xs bg-red-50/70 text-red-700 border border-red-200 px-2.5 py-1 rounded-lg font-medium">
                      {alg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Foods Side-by-Side Blueprint */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
          <h2 className="text-lg font-display font-bold text-stone-900 flex items-center gap-2.5 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Foods You Should Have
          </h2>
          <div className="space-y-3">
            {profile.recommendedFoods.map((food, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl border border-stone-100 bg-stone-50/50 hover:bg-stone-50 transition">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
                <p className="text-sm font-medium text-stone-800 leading-tight">{food}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
          <h2 className="text-lg font-display font-bold text-stone-900 flex items-center gap-2.5 mb-4">
            <XCircle className="w-5 h-5 text-rose-500" />
            Foods You Should Limit / Avoid
          </h2>
          <div className="space-y-3">
            {profile.avoidFoods.map((food, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl border border-stone-100 bg-stone-50/50 hover:bg-stone-50 transition">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2"></span>
                <p className="text-sm font-medium text-stone-800 leading-tight">{food}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pre-Curated Recipes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-xl font-display font-bold text-stone-800">
              Approved Culinary Recipes
            </h2>
            <p className="text-xs text-stone-500">Curated by our culinary nutrionists for {profile.title}</p>
          </div>
          <span className="text-xs font-mono font-bold text-stone-400">
            {activeRecipes.length} Recipes Matched
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              className="bg-white border border-stone-200 rounded-2xl shadow-xs overflow-hidden flex flex-col md:flex-row group"
            >
              {/* Image banner */}
              <div className="h-44 md:h-auto md:w-44 shrink-0 relative overflow-hidden bg-stone-100">
                <img 
                  referrerPolicy="no-referrer"
                  src={recipe.imageUrl} 
                  alt={recipe.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-2 left-2 bg-stone-900/85 backdrop-blur-xs text-stone-100 text-[10px] font-mono font-bold uppercase tracking-wider py-1 px-2.5 rounded-md flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-500 animate-pulse" />
                  {recipe.nutrients.calories} kcal
                </div>
              </div>

              {/* Recipe Info Pane */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                      🎯 Match {recipe.matchPercentage}%
                    </span>
                    <span className="text-xs text-stone-500 font-mono flex items-center gap-1.5">
                      <Timer className="w-3.5 h-3.5 text-stone-400" /> {recipe.duration} mins
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-stone-950 text-base md:text-lg leading-tight group-hover:text-amber-700 transition">
                    {recipe.name}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">
                    {recipe.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveRecipe(recipe)}
                    className="text-xs font-medium text-stone-900 border border-stone-300 rounded-lg hover:bg-stone-50 hover:border-stone-550 transition py-2 px-3 flex items-center gap-1 px-4 cursor-pointer"
                  >
                    <span>View Recipe</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddAllRecipeIngredientsToCart(recipe)}
                    className={`text-xs font-medium rounded-lg transition py-2 px-3 flex items-center gap-1 cursor-pointer shrink-0 transition-colors duration-200 ${
                      addedPacks[recipe.id]
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-900 hover:bg-stone-800 text-stone-100"
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-stone-300" />
                    <span>{addedPacks[recipe.id] ? "Added!" : "Get Pack ($24.99)"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Booster Shop card linkage */}
      <div className="p-6 bg-stone-900 text-stone-100 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
              Integrated Kitchen Pantry Store
            </span>
            <h2 className="text-xl font-display font-medium text-stone-100">
              Unlock Peak Efficiency with Curated Foods
            </h2>
            <p className="text-xs text-stone-300 max-w-xl font-sans">
              Enhance food recipes with specialty organic boosters, herbal infusions, and clean hydration salts available in our integrated store. Add items to support your targeted needs directly.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToStore}
            className="text-xs font-semibold bg-stone-100 text-stone-950 px-5.5 py-3 rounded-xl hover:bg-stone-200 transition shrink-0 cursor-pointer flex items-center gap-1"
          >
            <span>Visit Full Pantry Store</span>
            <ChevronRight className="w-4 h-4 text-stone-900" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {recommendedStoreProducts.slice(0, 3).map((product) => (
            <div 
              key={product.id}
              className="bg-stone-850 border border-stone-800 rounded-xl p-4.5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-stone-400 bg-stone-900 border border-stone-700 px-2 py-0.5 rounded-md uppercase">
                    Pantry Item
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">${product.price}</span>
                </div>
                <h4 className="font-display font-medium text-stone-100 text-sm">{product.name}</h4>
                <p className="text-stone-400 text-[11px] leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onAddToCart(product, 1)}
                className="w-full bg-stone-100/10 hover:bg-stone-100/20 text-stone-100 text-xs font-medium py-2 rounded-lg transition shrink-0 border border-stone-800 font-sans cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Basket</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe detailed detail popup modal */}
      {activeRecipe && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            
            {/* Modal header image */}
            <div className="h-44 md:h-56.5 bg-stone-100 relative shrink-0">
              <img 
                referrerPolicy="no-referrer"
                src={activeRecipe.imageUrl} 
                alt={activeRecipe.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent"></div>
              <button 
                type="button"
                onClick={() => setActiveRecipe(null)}
                className="absolute top-4 right-4 text-stone-100 bg-stone-900/80 hover:bg-stone-950 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer font-bold border border-stone-700 transition"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6 text-stone-100">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase bg-stone-900/40 border border-amber-400/30 px-2 py-0.5 rounded-md pr-1.5 inline-block mr-2">
                  🍳 {activeRecipe.difficulty} Cook
                </span>
                <h2 className="text-xl md:text-2xl font-display font-bold mt-1.5">{activeRecipe.name}</h2>
              </div>
            </div>

            {/* Modal content body container */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
              {/* Nutritional block */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 space-y-3">
                <span className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-widest block">
                  Nutrient Metrics (Per Single Serving)
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white border border-stone-150 rounded-xl p-2.5">
                    <span className="block text-xs text-stone-500">Calories</span>
                    <strong className="block text-base font-mono font-bold text-stone-900">{activeRecipe.nutrients.calories}</strong>
                  </div>
                  <div className="bg-white border border-stone-150 rounded-xl p-2.5">
                    <span className="block text-xs text-stone-500">Protein</span>
                    <strong className="block text-base font-mono font-bold text-stone-900">{activeRecipe.nutrients.protein}g</strong>
                  </div>
                  <div className="bg-white border border-stone-150 rounded-xl p-2.5">
                    <span className="block text-xs text-stone-500">Carbohydrate</span>
                    <strong className="block text-base font-mono font-bold text-stone-900">{activeRecipe.nutrients.carbs}g</strong>
                  </div>
                  <div className="bg-white border border-stone-150 rounded-xl p-2.5">
                    <span className="block text-xs text-stone-500">Lipids / Fat</span>
                    <strong className="block text-base font-mono font-bold text-stone-900">{activeRecipe.nutrients.fats}g</strong>
                  </div>
                </div>
              </div>

              {/* Ingredients section */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-stone-900 text-sm md:text-base">Organic Ingredients List</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activeRecipe.ingredients.map((ing, k) => (
                    <div key={k} className="flex items-center gap-2 p-2.5 bg-stone-50 border border-stone-100 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-900 shrink-0"></span>
                      <span className="text-xs text-stone-700 font-sans">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooking directions steps */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-stone-900 text-sm md:text-base">Step-By-Step Culinary Instructions</h4>
                <div className="space-y-4">
                  {activeRecipe.steps.map((st, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="w-6 h-6 rounded-full bg-stone-900 text-stone-100 font-mono text-xs font-semibold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-xs text-stone-600 leading-relaxed font-sans">{st}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal action footer */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex flex-col md:flex-row gap-3 md:items-center md:justify-between shrink-0">
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-mono">
                <Info className="w-4 h-4 text-emerald-600" /> Matches active parameters for {profile.title}.
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveRecipe(null)}
                  className="text-xs font-semibold text-stone-600 border border-stone-300 bg-white hover:bg-stone-50 py-3 px-5 rounded-xl cursor-pointer transition flex-1 md:flex-none uppercase text-center"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAddAllRecipeIngredientsToCart(activeRecipe);
                  }}
                  className={`text-xs font-semibold py-3 px-5 rounded-xl cursor-pointer transition flex items-center justify-center gap-1.5 flex-1 md:flex-none transition-colors duration-200 ${
                    addedPacks[activeRecipe.id]
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-900 hover:bg-stone-850 text-stone-100"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>{addedPacks[activeRecipe.id] ? "Added Pack!" : "Get All Fresh Ingredients ($24.99)"}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
