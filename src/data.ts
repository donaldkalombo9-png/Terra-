import { DietDetails, Recipe, Product } from "./types";

export const DIET_PROFILES: Record<string, DietDetails> = {
  vegetarian: {
    id: "vegetarian",
    title: "Vegetarian Whole Foods",
    icon: "Leaf",
    description: "Vibrant, clean, plant-powered fuel prioritizing nutrient density, complete plant protein pairings, and biological longevity.",
    whyThisDiet: "Plant-based foods reduce chronic systemic inflammation, foster diverse microbiome health, support metabolic cardiovascular markers, and deliver highly bioavailable phytochemical defenders.",
    keyMantra: "Pair dark leafy greens, whole sprouted grains, and robust legumes to form full structural proteins.",
    recommendedFoods: ["Sprouted Lentils & Chickpeas", "Rich Dark Lacinato Kale & Spinach", "Creamy Avocados & Cold-Pressed Oils", "Quinoa, Amaranth, & Spelled Grains", "Tempeh & Organic Sprouted Tofu"],
    avoidFoods: ["All Animal Fleeces & Meat Fats", "Gelatinous Thickening Agents", "Hidden Fish Sauces", "Refined Wheat Pastas", "Non-Organic Dairy Whey"],
    essentialNutrientFocus: ["Iron (Non-heme)", "Vitamin B12 (Supplemental)", "Zinc Bioavailability", "Omega-3 (Algae Sources)"],
    warning: {
      title: "Biological Balance Notice",
      urgency: "moderate",
      message: "Non-Heme plant iron requires synergy with Vitamin C for optimal assimilation. Be strictly mindful of B12 levels, as this vitamin cannot be synthesized directly from unfortified plants.",
      subPoints: [
        "Include lemon juice or bell peppers in spinach/lentil dishes to triple iron uptake.",
        "Take a sublingual Methylcobalamin B12 supplement twice weekly.",
        "Soak beans & raw grains to deactivate phytic phytates that block mineral absorption."
      ],
      allergenTriggers: ["Soy Protein", "Tree Nuts (Almond/Cashew)", "Glutenous Oats"]
    },
    recommendedBoosterTags: ["Pure Plant Protein", "Premium Organic Chia", "Activated Flax Seed"]
  },
  sick: {
    id: "sick",
    title: "Therapeutic & Recovery",
    icon: "HeartPulse",
    description: "Gentle, anti-inflammatory, highly digestible convalescent food designed to support active physical recovery, soothe immunity, and calm systemic distress.",
    whyThisDiet: "Minimizing digestive workload redirects cellular metabolic energy towards structural healing, tissue repair, and immune response activation.",
    keyMantra: "Warming, lightly simmered, blended, and anti-inflammatory nutrients require minimal breakdown energy.",
    recommendedFoods: ["Slow-Simmered Veggie & Ginger Broth", "Warm Organic Jasmine Rice Congee", "Poached Stewed Fruits (Apples/Pears)", "Well-cooked Steamed Zucchini & Carrots", "Active Herbal Infusions (Chamomile)"],
    avoidFoods: ["Abrasive Raw Crunchy Veg", "High-Fat Heavy Dairy", "Highly Spiced Hot Curries", "Refined Granulated Cane Sugars", "Ice-Cold Beverages"],
    essentialNutrientFocus: ["Soothed Gut Lining (L-glutamine)", "Gingerol & Turmeric bio-compounds", "Hydration Mineral Salts", "Light Digestible Carbs"],
    warning: {
      title: "Medical & Recovery Warning",
      urgency: "critical",
      message: "These convalescent food concepts are adjuvant wellness guides. They must NEVER replace customized clinical treatment plans from your active medical team.",
      subPoints: [
        "Seek immediate clinical aid if high fevers or acute digestive pain manifests.",
        "Avoid adding heavy salt to broths if dealing with hypertensive crisis.",
        "Ensure all raw items are fully cooked to neutralize any potential foodborn pathogens in weakened states."
      ],
      allergenTriggers: ["Nightshades (Tomato/Eggplant)", "Soy Sauce (Gluten)", "Citrus Acids"]
    },
    recommendedBoosterTags: ["Soothe Herbal Tea Pack", "Clinical Recovery Salts", "Pure Elderberry Drops"]
  },
  morning: {
    id: "morning",
    title: "Morning Ignition",
    icon: "Sun",
    description: "Stable, high-fiber awakening diet engineered to reset cortisol, baseline glycogen depots, and provide sustained neurotransmitter clarity.",
    whyThisDiet: "Eliminating refined glucose in the morning prevents insulin crashes, leading to focused cognitive reserves and balanced fat oxidation.",
    keyMantra: "Sustained fuel: fiber with healthy lipids to secure stable blood sugars and zero mid-afternoon fatigue.",
    recommendedFoods: ["Steel-Cut Oats with Berries", "Sprouted Chia Potions", "Nutrient-Dense Avocado with Eggs", "Warm Charcoal Lemon Water", "Matcha & Herbal Adaptogens"],
    avoidFoods: ["Industrial Sugary Boxed Cereals", "Refined Flour Croissants", "Heavy Artificial Sweeteners", "Double-Shot Whipped Syrups", "Heavy Fried Meats"],
    essentialNutrientFocus: ["Sustaining Complex Carbs", "Medium Chain Triglycerides", "Prebiotic Fibers", "Antioxidant Polyphenols"],
    warning: {
      title: "Acidity & Stimulant Care",
      urgency: "moderate",
      message: "Consuming heavy central nervous stimulants (like high-caffeine espresso) on an entirely empty stomach raises acidic stomach pH and sparks rapid, unstable insulin rise.",
      subPoints: [
        "Hydrate with 500ml of pure water before tasting hot caffeine or tea.",
        "Always pair early carbohydrates with a fat/oil (like flax seeds or almond butter) to steady the glycaemic response curve."
      ],
      allergenTriggers: ["Gluten", "Lactose (Dairy)", "Bee Pollen"]
    },
    recommendedBoosterTags: ["Ceremonial Matcha", "Cold Brew Pure Extract", "Gut Defense Active Charcoal"]
  },
  gym: {
    id: "gym",
    title: "Athletic & Hypertrophy",
    icon: "Dumbbell",
    description: "Precision high-protein macronutrient architecture designed to repair myofibrillar micro-tears, store glycogen, and fuel peak ATP output.",
    whyThisDiet: "Demanding exercise triggers muscle protein breakdown; loading amino acids creates a positive nitrogen balance necessary for synthesis and adaptation.",
    keyMantra: "High-protein recovery fuels combined with complex glycogen replenishment.",
    recommendedFoods: ["Slices of Lean Poultry & Wild Fish", "Soft Fluffy Egg Whites", "Quinoa, Sweet Potato, & Starch Carbs", "Broccoli, Asparagus Fiber Greens", "Fermented Tempeh crumbles"],
    avoidFoods: ["High-Trans Fat Fast Foods", "Alcoholic Glycogen Blockers", "Excessive Hydrogenated Margarines", "Processed Lunch Meats", "Soda / Heavy Sugar Fluids"],
    essentialNutrientFocus: ["Pure Essential Amino Acids", "Slow Glycemic Complex Carbs", "Creatine Phosphate Synergies", "Anti-Cramping Electrolytes"],
    warning: {
      title: "Kidney Load & Dehydration Warning",
      urgency: "critical",
      message: "Processing excessively high protein levels (greater than 2.2g per kg body weight) requires significant fluid support. Neglecting deep hydration may strain kidney filtration.",
      subPoints: [
        "Increase pure unflavored water intake by minimum 1.2 Liters for daily supplement routines.",
        "Check blood urea nitrogen and electrolyte panels annually during heavy calorie surplus cycles.",
        "Ensure adequate intake of cruciferous potassium greens to offset metabolic acidic load."
      ],
      allergenTriggers: ["Milk Whey (Dairy)", "Peanuts", "Egg Albumin"]
    },
    recommendedBoosterTags: ["Active Whey Isolate", "Hyper-Performance Electrolytes", "Micronized Kreatin Monohydrate"]
  }
};

export const RECIPES: Recipe[] = [
  // Vegetarian Recs
  {
    id: "veg-1",
    name: "Spinach & Chickpea Coconut Infusion",
    duration: 30,
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600&auto=format&fit=crop",
    category: "vegetarian",
    matchPercentage: 99,
    description: "A rich, warming single-pot curry teeming with tender chickpeas, fresh wilted organic spinach, and golden coconut broth.",
    nutrients: {
      calories: 420,
      carbs: 48,
      protein: 15,
      fats: 16,
      benefits: ["Iron Booster", "Fiber-rich Gut", "Zinc Delivery"]
    },
    ingredients: [
      "1 can Organic Chickpeas (rinsed)",
      "4 cups Fresh Lacinato Spinach",
      "1 can Light Organic Coconut Milk",
      "1 tbsp Fresh Grated Ginger & Turmeric",
      "1 whole Squeezed Citrus Lemon (Vitamin C assistant)",
      "1 cup Sprouted Brown Rice (to serve)"
    ],
    steps: [
      "Saute freshly minced ginger, garlic, and sliced onions in coconut oil until soft and deeply fragrant.",
      "Pour in the coconut milk, crushed turmeric root, and raw rinsed chickpeas. Bring to a gentle, bubbling simmer for 20 minutes.",
      "Two minutes before serving, aggregate the fresh spinach, letting it lightly wilt into the hot curry.",
      "Turn off the heat, squeeze in fresh organic lemon juice immediately (this unlocks the non-heme spinach iron!), and serve over warm rice."
    ]
  },
  {
    id: "veg-2",
    name: "High-Nutrient Quinoa power salad",
    duration: 15,
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop",
    category: "vegetarian",
    matchPercentage: 94,
    description: "A cool, deeply refreshing sprouted grain salad packed with crunchy cucumbers, sliced cherry tomatoes, and creamy avocado.",
    nutrients: {
      calories: 380,
      carbs: 42,
      protein: 12,
      fats: 18,
      benefits: ["Complete Protein", "Healthy Fats", "Antioxidants"]
    },
    ingredients: [
      "1 cup Rinsed Sprouted Grain Quinoa",
      "1 half Ripe Avocado (sliced)",
      "1 cup Cherry Tomatoes (halved)",
      "1 cup Diced Persian Cucumber",
      "2 tbsp Raw Hemp Hearts / Chia Seed Mix",
      "1 tbsp Extra Virgin Cold-Pressed Olive Oil"
    ],
    steps: [
      "Boil quinoa in filtered water for 12 minutes (1:2 ratio) then fluff with a fork and let cool.",
      "In a wooden bowl, combine the cucumber pieces, tomato halves, and cooked quinoa.",
      "Toss with olive oil, cold-pressed lemon juice, and a light sprinkling of pink mineral salt.",
      "Garnish with sliced avocado and a handful of protein-rich raw hemp hearts."
    ]
  },

  // Sick Care / Convalescent Recs
  {
    id: "sick-1",
    name: "Golden Ginger & Turmeric Healing Broth",
    duration: 40,
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=600&auto=format&fit=crop",
    category: "sick",
    matchPercentage: 100,
    description: "An incredibly comforting, simple, and warm broth. Designed strictly to hydrate, settle nausea, and reduce gut strain.",
    nutrients: {
      calories: 95,
      carbs: 12,
      protein: 2,
      fats: 4,
      benefits: ["Gut Soothing", "High Electrolytes", "Anti-Nausea"]
    },
    ingredients: [
      "2 large Fresh Turmeric Roots (sliced bruised)",
      "3 inches Fresh Ginger Root (crushed)",
      "2 stalks Fresh Celery & Carrots (chopped)",
      "4 cups Filtered Water / Low-Sodium vegetable stock",
      "1 pinch Black Pepper (essential to unlock turmeric curcumin)",
      "1 stalk Lemongrass (optional, crushed)"
    ],
    steps: [
      "Boil the water or low-sodium veg stock in a deep pot.",
      "Throw in the crushed fresh ginger, sliced turmeric root, celery, and carrot discs.",
      "Add black pepper and lemongrass. Simmer on low-medium heat for 35 minutes until the broth is rich, golden, and highly aromatic.",
      "Strain fully through a mesh colander to yield a pristine, comforting clear broth. Sip slowly at a warm, pleasant temperature."
    ]
  },
  {
    id: "sick-2",
    name: "Restorative Pumpkin & Rice Congee",
    duration: 45,
    difficulty: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?q=80&w=600&auto=format&fit=crop",
    category: "sick",
    matchPercentage: 97,
    description: "A classic soothing Asian rice porridge. Super slow cooked till incredibly soft, making it exceptionally easy on a sensitive stomach.",
    nutrients: {
      calories: 190,
      carbs: 40,
      protein: 4,
      fats: 1,
      benefits: ["Easy Digestion", "Soothing Pectin", "Hydrating Starch"]
    },
    ingredients: [
      "1/2 cup Organic Jasmine White Rice",
      "1 cup Sweet Pumpkin / Butternut Squash cubes",
      "5 cups Pure Filtered Water",
      "1 pinch Sea Salt",
      "1 sheet Toasted Seaweed (Kombu, optional for clean mineral recovery)"
    ],
    steps: [
      "Rinse jasmine rice three times in cold water.",
      "Add the rinsed rice, sweet pumpkin cubes, and water into a tall heavy pot.",
      "Bring up to a rolling boil, then reduce heat to low immediately, covering with a slight vent.",
      "Simmer for 45 minutes, stirring occasionally to prevent sticking, until the rice grains disintegrate and form a creamy, velvety porridge. Serve warm with tiny sea salt grains."
    ]
  },

  // Morning Routine Recs
  {
    id: "morning-1",
    name: "Overnight Raspberry Chia Oats",
    duration: 10,
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1517881917431-1348889736d1?q=80&w=600&auto=format&fit=crop",
    category: "morning",
    matchPercentage: 98,
    description: "A zero-cook breakfast prepped the night before to save morning stress. Packed with fiber and stable energy to avoid mental fog.",
    nutrients: {
      calories: 340,
      carbs: 45,
      protein: 10,
      fats: 9,
      benefits: ["Sustained Energy", "Gut Prebiotics", "High Fiber Awake"]
    },
    ingredients: [
      "1/2 cup Gluten-Free Rolled Oats",
      "1 tbsp Organic Dark Chia Seeds",
      "3/4 cup Unsweetened Organic Coconut Milk",
      "1/2 cup Fresh Sweet Raspberries",
      "1 tbsp Raw Walnut Crumbles",
      "1 drop Natural Vanilla Extract"
    ],
    steps: [
      "Combine rolled oats, chia seeds, vanilla extract, and coconut milk in a clean glass jar (mason jar).",
      "Stir thoroughly, ensuring chia seeds are fully submerged and not clumping at the bottom.",
      "Seal the jar and place in the refrigerator for at least 4 hours (ideally overnight).",
      "In the morning, top with fresh raspberries and crushed walnuts for instant, energizing brain fuel."
    ]
  },
  {
    id: "morning-2",
    name: "Spirulina Berry Breakfast Smoothie",
    duration: 5,
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600&auto=format&fit=crop",
    category: "morning",
    matchPercentage: 92,
    description: "A quick, icy, bright-green morning blender blast. Delivers micronutrients directly to cells for instant mental clarity.",
    nutrients: {
      calories: 220,
      carbs: 29,
      protein: 7,
      fats: 6,
      benefits: ["Deep Chlorophyll", "Polyphenol Flush", "Antioxidants"]
    },
    ingredients: [
      "1 cup Frozen Organic Wild Blueberries",
      "1/2 Frozen Green Banana",
      "1 tsp Premium Organic Spirulina Powder",
      "1 cup Unsweetened Almond Drink / Pure Water",
      "1 tbsp Hemp Seed Hearts",
      "1 handful Fresh Baby Spinach"
    ],
    steps: [
      "Place frozen banana, blueberries, spirulina powder, spinach, and hemp seeds directly into your high-speed blender container.",
      "Pour in the chilled almond drink.",
      "Blend on HIGH speed for 60 seconds until completely creamy, uniform, and velvety green.",
      "Pour with pride into a tall glass, and drink immediately for maximum nutrient absorption."
    ]
  },

  // Gym / High Protein Recs
  {
    id: "gym-1",
    name: "Protem-Max Teriyaki Lean Bowl",
    duration: 25,
    difficulty: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
    category: "gym",
    matchPercentage: 99,
    description: "High-protein recovery fuel designed specifically to rebuild muscle fibers. Clean complex carbs replenish muscle glycogen stores.",
    nutrients: {
      calories: 550,
      carbs: 58,
      protein: 48,
      fats: 9,
      benefits: ["Muscle Synthesis", "Max Protein Density", "High Glycogen Depot"]
    },
    ingredients: [
      "180g Lean organic Chicken Breast (cubed)",
      "1 cup Sweet Potato ( cubed and roasted )",
      "1 cup Steamed Green Broccoli florets",
      "1.5 tbsp Low-Sodium Teriyaki Amino Glaze",
      "1 tsp Organic Toasted Sesame Seeds",
      "1 tsp Cold-Pressed Avocado Oil"
    ],
    steps: [
      "Toss sweet potato cubes in avocado oil and bake at 200°C for 20 minutes until caramelized and tender.",
      "Sear lean chicken cubes in a hot cast-iron pan until fully cooked and high in gold browning.",
      "Toss chicken in the low-sodium amino glaze glaze for the final 60 seconds of cooking.",
      "Serve the glazed protein alongside baked sweet potatoes and steamed broccoli. Sprinkle with sesame seeds and consume within 60 minutes post-training."
    ]
  },
  {
    id: "gym-2",
    name: "Wild Atlantic Salmon & Quinoa Feast",
    duration: 20,
    difficulty: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop",
    category: "gym",
    matchPercentage: 96,
    description: "Packed with clean Omega-3 fats to decrease inflammation from lifting, alongside dense clean proteins and active potassium.",
    nutrients: {
      calories: 610,
      carbs: 44,
      protein: 42,
      fats: 22,
      benefits: ["Omega-3 Defense", "Protein Synthesis", "Electrolyte Load"]
    },
    ingredients: [
      "150g Fresh Wild Salmon Fillet",
      "1 cup Cooked Fluffy Quinoa",
      "8 stalks Fresh Green Asparagus",
      "1 tsp Fresh Squeezed Lemon juice",
      "1 tsp Dill weed",
      "1/2 tbsp Virgin Avocado oil"
    ],
    steps: [
      "Preheat pan. Rub wild salmon fillet with a tiny smear of avocado oil, pink salt, and fresh dill.",
      "Pan-fry or bake salmon for 4-5 minutes per side until flaky, pink, and perfectly moist inside.",
      "Toss fresh asparagus spears in the pan next to salmon for the final 4 minutes of cooking.",
      "Assemble on a plate over high-protein fluffy quinoa, squeeze lemon juice over Asparagus and salmon, and enjoy!"
    ]
  }
];

export const PRODUCTS: Product[] = [
  // Vegetarian boosters
  {
    id: "prod-veg-1",
    name: "Pure Plant-Based Sprouted Pea Protein",
    price: 34.99,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=300&auto=format&fit=crop",
    description: "Cold-press extracted, allergen-free organic pea protein powder. Non-GMO, zero sugar, yielding 25g absolute amino acids per scoop.",
    healthBenefit: "Supplies complete structural protein chain to vegetarians to support muscle, cellular growth, and enzymic repair.",
    targetCategory: "vegetarian",
    allergenAlert: "Zero soy, zero dairy. Formulated in a facility that briefly handles coconut.",
    stockCount: 140
  },
  {
    id: "prod-veg-2",
    name: "Organic Raw Chia Seed Power Tub",
    price: 12.99,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=300&auto=format&fit=crop",
    description: "Premium black organic chia seeds, extremely high in prebiotic mucilage fiber, magnesium, and plant-derived ALA Omega-3 fats.",
    healthBenefit: "Formulates a soothing digestive gel that supports constant, stable hydration and clean cardiovascular heart markers.",
    targetCategory: "vegetarian",
    allergenAlert: "Gluten free.",
    stockCount: 88
  },
  {
    id: "prod-veg-3",
    name: "Cold-Pressed Algae-Derived Omega-3 Drops",
    price: 26.50,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=300&auto=format&fit=crop",
    description: "Pure sustainably farmed ocean-algae liquid yielding premium EPA and DHA. Bypasses the fish, giving direct purity without heavy metal toxic risks.",
    healthBenefit: "Maintains elite neural focus, cognitive memory processing, and actively cuts down joint friction strain.",
    targetCategory: "vegetarian",
    allergenAlert: "Sourced from real saltwater microalgae.",
    stockCount: 50
  },

  // Sick care boosters
  {
    id: "prod-sick-1",
    name: "Soothe Herbal Defense Tea (Chamomile & Grated Ginger)",
    price: 9.99,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=300&auto=format&fit=crop",
    description: "An incredibly aromatic organic botanical tea blend featuring whole chamomile blossoms, cracked ginger stem, and sweet peppermint leaves.",
    healthBenefit: "Calms irritated gut walls, cuts down active throat itchiness, settles erratic digestive spasms, and promotes high-quality sleep to assist healing.",
    targetCategory: "sick",
    allergenAlert: "Contains chamomile ( Asteraceae botanical family ).",
    stockCount: 200
  },
  {
    id: "prod-sick-2",
    name: "Clinical Hydration Premium Minerals",
    price: 14.50,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf4?q=80&w=300&auto=format&fit=crop",
    description: "Medical-grade clean balanced salt powders (Sodium chloride, Potassium citrate, High absorption magnesium glycinate). Zero chemical dyes.",
    healthBenefit: "Re-establishes cellular fluid balance during periods of sickness, fever, dehydration, or gastrointestinal water loss.",
    targetCategory: "sick",
    allergenAlert: "Sugar free and stevia free to guarantee zero gut irritation.",
    stockCount: 110
  },
  {
    id: "prod-sick-3",
    name: "Concentrated Raw Elderberry Wellness Drops",
    price: 19.99,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=300&auto=format&fit=crop",
    description: "Highly potent standard extract of organic Sambucus Elderberries with extra high bioflavonoids, Zinc citrate, and natural Vitamin C.",
    healthBenefit: "Supports direct cellular immune defense, cuts down cold symptom intensity, and actively neutralizes dangerous free radical cells.",
    targetCategory: "sick",
    allergenAlert: "Highly concentrated botanical extract.",
    stockCount: 75
  },

  // Morning routine boosters
  {
    id: "prod-morn-1",
    name: "Ceremonial Uji Matcha Pure Stoneground",
    price: 29.99,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=300&auto=format&fit=crop",
    description: "First-harvest culinary shaded green tea matcha from Kyoto, Japan. Stoneground daily, packed with unique L-Theanine amino acids.",
    healthBenefit: "Sparks smooth, crisp focus and alertness over 6 hours without the crash, jitters, or heart palpitations of instant coffee.",
    targetCategory: "morning",
    allergenAlert: "Contains real high-antioxidant green tea tea-polyphenols.",
    stockCount: 95
  },
  {
    id: "prod-morn-2",
    name: "Gut-Defense Organic Activated Charcoal",
    price: 16.99,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop",
    description: "Ultra-fine medical grade activated charcoal powder sourced entirely from steam-activated sustainable organic coconut shells.",
    healthBenefit: "Adsorbs heavy toxins, reduces morning bloating pressure, and helps neutralize heavy metabolic waste inside the gastrointestinal tube.",
    targetCategory: "morning",
    allergenAlert: "Take strictly 2 hours apart from any essential health prescriptions to prevent adsorption reduction.",
    stockCount: 60
  },

  // Gym boosters
  {
    id: "prod-gym-1",
    name: "Elite Micellar Grass-Fed Whey Isolate",
    price: 49.99,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=300&auto=format&fit=crop",
    description: "Cold-filtered grass-fed bovine whey protein isolate. Emulsified with sunflower lecithin, 27g protein, 0g sugar, and 6.2g branched-chain aminos per scoop.",
    healthBenefit: "Increases myofibrillar skeletal protein synthesis, accelerates macro-tear healing, and optimizes athletic muscle gain.",
    targetCategory: "gym",
    allergenAlert: "Contains Dairy peptides (Whey) and Sunflower lecithin traces.",
    stockCount: 120
  },
  {
    id: "prod-gym-2",
    name: "Peak ATP Micronized Kreatin Pure",
    price: 24.99,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300&auto=format&fit=crop",
    description: "100% Ultra-micronized pharmaceutical grade Creatine Monohydrate. Zero flavor, zero synthetic carriers, zero graininess.",
    healthBenefit: "Recharges muscular ATP phosphagen stores, boosting explosive lifting performance, raw strength output, and fiber cell hydration.",
    targetCategory: "gym",
    allergenAlert: "Micronized pure fine crystalline substance.",
    stockCount: 160
  },
  {
    id: "prod-gym-3",
    name: "Intratech Hydration Electrolyte Blend",
    price: 18.99,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1527352724903-89ea97fd0abd?q=80&w=300&auto=format&fit=crop",
    description: "Advanced electrolyte formula featuring highly bioavailable Potassium aspartate, Magnesium chelate, Pink Himalayan sodium, and Coconut water crystals.",
    healthBenefit: "Prevents full-body muscular cramping, maintains intracellular osmotic pressure, and offsets exercise sodium perspiration.",
    targetCategory: "gym",
    allergenAlert: "Contains dried natural coconut water powder.",
    stockCount: 130
  }
];
