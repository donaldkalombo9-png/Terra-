import React, { useState } from "react";
import { 
  Leaf, HeartPulse, Sun, Dumbbell, Sparkles, ShoppingBag, BookOpen, 
  HelpCircle, MessageCircleQuestion, Compass, ShieldAlert, Check 
} from "lucide-react";
import { DIET_PROFILES } from "./data";
import { DietDetails, CartItem, Product } from "./types";
import { DietProfileView } from "./components/DietProfileView";
import { StoreView } from "./components/StoreView";
import { AIAdvisor } from "./components/AIAdvisor";

export default function App() {
  // Global View tabs
  const [activeTab, setActiveTab] = useState<"blueprints" | "ai" | "store">("blueprints");
  
  // Selected Diet Profile category (Vegetarian, Health Recovery, Morning energizer, Muscle-builders/Gyms)
  const [activeCategory, setActiveCategory] = useState<string>("vegetarian");
  
  // Cart state management
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Get active selected profile record
  const currentProfile: DietDetails = DIET_PROFILES[activeCategory];

  // Global cart mutation helpers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });

    // Notify client with quick warm confirmation toast
    setToastMessage(`Added "${product.name}" to your basket!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Switch category selectors
  const renderCategoryBtn = (categoryId: string, name: string, colorClass: string) => {
    const isSelected = activeCategory === categoryId;
    let icon = <Leaf className="w-4 h-4" />;

    if (categoryId === "sick") icon = <HeartPulse className="w-4 h-4" />;
    else if (categoryId === "morning") icon = <Sun className="w-4 h-4" />;
    else if (categoryId === "gym") icon = <Dumbbell className="w-4 h-4" />;

    return (
      <button
        key={categoryId}
        type="button"
        id={`category-btn-${categoryId}`}
        onClick={() => {
          setActiveCategory(categoryId);
          // Auto switch to dynamic blueprints view if they click profiles
          if (activeTab === "store") {
            setActiveTab("blueprints");
          }
        }}
        className={`flex items-center gap-2 px-4.5 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
          isSelected 
            ? `${colorClass} border-transparent text-white shadow-sm ring-1 ring-stone-900/5`
            : "bg-white border-stone-150 hover:bg-stone-50 hover:border-stone-300 text-stone-600 shadow-xs"
        }`}
      >
        {icon}
        <span>{name}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col justify-between antialiased">
      
      {/* Toast Alert message panel */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-55 bg-stone-900 text-stone-100 border border-stone-850 px-5 py-3.5 rounded-2xl flex items-center gap-3 shadow-2xl animate-in slide-in-from-bottom-6 fade-in duration-300">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide font-display">{toastMessage}</span>
        </div>
      )}

      {/* Primary Top navigational header bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Brand logotype */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-950 text-stone-100 flex items-center justify-center font-display font-extrabold text-lg select-none">
              D
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#cf8f2b] font-medium leading-none block mb-0.5">
                Dietary Blueprint Hub
              </span>
              <h1 className="text-lg md:text-xl font-display font-bold text-stone-900 leading-tight">
                Food Recipes and Diet Helper
              </h1>
            </div>
          </div>

          {/* Primary View Switch Tabs */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              type="button"
              id="tab-blueprints"
              onClick={() => setActiveTab("blueprints")}
              className={`flex items-center gap-1.5 py-2 px-4.5 rounded-lg text-xs font-semibold transition cursor-pointer font-sans uppercase tracking-wider ${
                activeTab === "blueprints"
                  ? "bg-white text-stone-900 shadow-sm border border-stone-200/40"
                  : "text-stone-500 hover:text-stone-850"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Diets & Recipes</span>
            </button>
            <button
              type="button"
              id="tab-ai-chat"
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-1.5 py-2 px-4.5 rounded-lg text-xs font-semibold transition cursor-pointer font-sans uppercase tracking-wider ${
                activeTab === "ai"
                  ? "bg-white text-stone-900 shadow-sm border border-stone-200/40"
                  : "text-stone-500 hover:text-stone-850"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Dietist</span>
            </button>
            <button
              type="button"
              id="tab-shop"
              onClick={() => setActiveTab("store")}
              className={`flex items-center gap-1.5 py-2 px-4.5 rounded-lg text-xs font-semibold transition cursor-pointer relative font-sans uppercase tracking-wider ${
                activeTab === "store"
                  ? "bg-white text-stone-900 shadow-sm border border-stone-200/40"
                  : "text-stone-500 hover:text-stone-850"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Pantry Market</span>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-stone-900 border border-white text-amber-400 font-mono text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Dynamic Sub-header Category Selector rail list */}
      {activeTab !== "store" && (
        <section className="bg-stone-50 border-b border-stone-200 py-4 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4.5">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold">Category Selection</span>
                <p className="text-xs text-stone-600 font-semibold font-display">Pick your targeted profile to isolate parameters:</p>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {renderCategoryBtn("vegetarian", "Vegetarian", "bg-emerald-800 text-stone-100")}
                {renderCategoryBtn("sick", "Therapeutic Care", "bg-rose-700 text-stone-100")}
                {renderCategoryBtn("morning", "Morning Routine", "bg-amber-600 text-stone-100")}
                {renderCategoryBtn("gym", "Gym / Hypertrophy", "bg-indigo-850 text-stone-100")}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 md:py-10">
        
        {/* VIEW SWITCHER ROUTING */}
        {activeTab === "blueprints" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Left Blueprint profile data render */}
            <DietProfileView 
              profile={currentProfile}
              onAddToCart={handleAddToCart}
              onNavigateToStore={() => setActiveTab("store")}
            />
          </div>
        )}

        {activeTab === "ai" && (
          <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="space-y-1">
              <h2 className="text-xl font-display font-bold text-stone-900">Customized Dietary Questions</h2>
              <p className="text-xs text-stone-500">
                Compose custom symptom questions, raw ingredients you have at hand, or severe allergies to dynamic construct unique culinary blueprints.
              </p>
            </div>
            <AIAdvisor activeCategory={activeCategory} />
          </div>
        )}

        {activeTab === "store" && (
          <div className="animate-in fade-in duration-300">
            <StoreView 
              cart={cart}
              activeCategory={activeCategory}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onClearCart={handleClearCart}
            />
          </div>
        )}

      </main>

      {/* Global disclaimer warning line */}
      <section className="bg-stone-100 border-t border-stone-200 py-4.5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-start gap-4">
            <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-orange-800 leading-normal font-sans">
              <strong className="font-semibold block mb-0.5 font-display">🛡️ CLINICAL LEGAL DISCLAIMER:</strong> All metabolic data, ingredient recommendations, food groups, and AI formulated blueprints present within this software serve as general lifestyle suggestions. These do NOT substitute for diagnostic checkups, therapeutic treatments, or medicine plans written of qualified clinical dietitians or physical care practitioners. Consult clinical teams immediately inside emergencies.
            </p>
          </div>
        </div>
      </section>

      {/* Minimalistic footer page strip */}
      <footer className="bg-white border-t border-stone-250 py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-xs text-stone-400 space-y-1">
          <p className="font-semibold font-display text-stone-500 uppercase tracking-widest text-[9px]">&copy; 2026 Food Recipes and Diet Helper Ltd. All rights reserved.</p>
          <p className="font-light font-sans">Certified food pantry inventory, physical therapeutics parameters, and customized active AI analysis.</p>
        </div>
      </footer>

    </div>
  );
}
