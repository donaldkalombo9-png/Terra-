import React, { useState } from "react";
import { 
  ShoppingBag, Search, Filter, Trash2, Plus, Minus, CreditCard, 
  MapPin, ClipboardPaste, Sparkles, Check, ChevronRight, Info, TriangleAlert 
} from "lucide-react";
import { Product, CartItem, DietDetails } from "../types";
import { PRODUCTS, DIET_PROFILES } from "../data";

interface StoreViewProps {
  cart: CartItem[];
  activeCategory: string;
  onAddToCart: (product: Product, quantity?: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
}

export const StoreView: React.FC<StoreViewProps> = ({
  cart,
  activeCategory,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [checkoutStep, setCheckoutStep] = useState<"shopping" | "checkout_form" | "invoice">("shopping");
  
  // Checkout Form states
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [allergyDisclosures, setAllergyDisclosures] = useState("");
  const [deliverySpeed, setDeliverySpeed] = useState("standard");
  const [formErrors, setFormErrors] = useState<{ name?: string; address?: string }>({});

  // Generated completed invoice storage
  const [invoiceDetails, setInvoiceDetails] = useState<any | null>(null);

  // Filter products by search and category filter
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedFilter === "all" || product.targetCategory === selectedFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.healthBenefit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate prices
  const itemsSubtotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const shippingCost = itemsSubtotal > 49 ? 0 : (deliverySpeed === "standard" ? 4.99 : 12.99);
  const estimateTax = itemsSubtotal * 0.08; // 8% tax
  const cartTotal = itemsSubtotal + shippingCost + estimateTax;

  // Aggregate allergen warnings of active cart items to inform the client proactively before purchase
  const cartAllergens = cart.filter(item => item.product.allergenAlert).map(item => ({
    productName: item.product.name,
    alert: item.product.allergenAlert
  }));

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; address?: string } = {};
    if (!customerName.trim()) errors.name = "Receiver Name is required.";
    if (!customerAddress.trim()) errors.address = "Full Shipping Address is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Process payment and generate exquisite invoice details
    const orderId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const originalCartCopy = [...cart];
    
    setInvoiceDetails({
      orderId,
      customerName,
      customerAddress,
      allergyDisclosures,
      deliverySpeed,
      orderDate: new Date(),
      subtotal: itemsSubtotal,
      shipping: shippingCost,
      tax: estimateTax,
      total: cartTotal,
      items: originalCartCopy,
      dieticianNotes: getDietitianInvoiceNote(originalCartCopy, allergyDisclosures)
    });

    setCheckoutStep("invoice");
    onClearCart(); // Flush dynamic cart on successful ordering
  };

  const getDietitianInvoiceNote = (items: CartItem[], disclosure: string) => {
    const isGymFocused = items.some(i => i.product.targetCategory === "gym");
    const isSickFocused = items.some(i => i.product.targetCategory === "sick");
    const isVegFocused = items.some(i => i.product.targetCategory === "vegetarian");

    let note = "Thank you for trusting our Diet Pantry. Keep products stored in dry cool units.";
    if (disclosure && disclosure.trim().length > 0) {
      note += ` 🔬 We have flagged your disclosure regarding absolute allergies: "${disclosure}". Core packing staff will cross-verify seal packaging boundaries accordingly.`;
    }
    if (isGymFocused) {
      note += " 💪 Athletic protein boosters operate best when hydrated with 3L filtered liquids daily. Ensure nitrogen synthesis is monitored.";
    }
    if (isSickFocused) {
      note += " 🍵 Sip restorative infusions slowly at body temperatures (37°C) to prevent severe vascular thermal shocks.";
    }
    if (isVegFocused) {
      note += " 🌱 Plant food proteins and raw chia seeds benefit massively from double soaking pre-intake.";
    }
    return note;
  };

  return (
    <div className="space-y-6">
      {/* Search and Category Filter Rail */}
      {checkoutStep === "shopping" && (
        <div className="bg-white border border-stone-200 rounded-2xl p-4.5 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Quick search input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search pantry boosters, protein, restorative tea..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 focus:border-stone-500 focus:outline-none rounded-xl py-3 pl-10.5 pr-4 text-xs tracking-wide transition focus:bg-white"
            />
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto overflow-x-auto w-full md:w-auto">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`text-xs py-2 px-3.5 rounded-lg border font-medium font-sans cursor-pointer transition ${
                selectedFilter === "all"
                  ? "bg-stone-900 text-stone-100 border-stone-900"
                  : "bg-white border-stone-200 hover:bg-stone-50 text-stone-600"
              }`}
            >
              All Items
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("vegetarian")}
              className={`text-xs py-2 px-3.5 rounded-lg border font-medium font-sans cursor-pointer transition ${
                selectedFilter === "vegetarian"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-white border-stone-200 hover:bg-stone-50 text-stone-600"
              }`}
            >
              🌿 Vegetarian
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("sick")}
              className={`text-xs py-2 px-3.5 rounded-lg border font-medium font-sans cursor-pointer transition ${
                selectedFilter === "sick"
                  ? "bg-rose-50 text-rose-800 border-rose-300"
                  : "bg-white border-stone-200 hover:bg-stone-50 text-stone-600"
              }`}
            >
              🩹 Therapeutic Care
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("morning")}
              className={`text-xs py-2 px-3.5 rounded-lg border font-medium font-sans cursor-pointer transition ${
                selectedFilter === "morning"
                  ? "bg-amber-50 text-amber-800 border-amber-300"
                  : "bg-white border-stone-200 hover:bg-stone-50 text-stone-600"
              }`}
            >
              ☀️ Morning Routine
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("gym")}
              className={`text-xs py-2 px-3.5 rounded-lg border font-medium font-sans cursor-pointer transition ${
                selectedFilter === "gym"
                  ? "bg-indigo-50 text-indigo-800 border-indigo-300"
                  : "bg-white border-stone-200 hover:bg-stone-50 text-stone-600"
              }`}
            >
              💪 Gym & Elite Active
            </button>
          </div>
        </div>
      )}

      {/* Main Grid splitting Products and Checkout Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SHOP WINDOW */}
        {checkoutStep === "shopping" && (
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-display font-bold text-stone-900">
                Functional Diet Store {selectedFilter !== "all" && <span className="capitalize text-stone-400 font-normal">({selectedFilter})</span>}
              </h2>
              <span className="text-xs font-mono text-stone-500">
                {filteredProducts.length} certified health products found
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-stone-250 rounded-2xl p-12 text-center text-stone-500">
                <Search className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="font-medium">No pantry products found matching. Please adjust your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:border-stone-400 transition-all flex flex-col justify-between"
                  >
                    {/* Visual Banner */}
                    <div className="h-44 relative bg-stone-100 overflow-hidden shrink-0">
                      <img 
                        referrerPolicy="no-referrer"
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover select-none"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        {product.targetCategory !== "all" ? (
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider py-1 px-2.5 rounded-md ${
                            product.targetCategory === "vegetarian" ? "bg-emerald-900 text-emerald-100" :
                            product.targetCategory === "sick" ? "bg-rose-900 text-rose-100" :
                            product.targetCategory === "morning" ? "bg-amber-900 text-amber-100" : "bg-indigo-900 text-indigo-100"
                          }`}>
                            {product.targetCategory} Pack
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono font-bold bg-stone-900/80 text-stone-100 uppercase tracking-wider py-1 px-2.5 rounded-md">
                            General Wellness
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-stone-950 font-mono font-bold rounded-lg text-sm px-2.5 py-1 shadow-sm border border-stone-200">
                        ${product.price}
                      </div>
                    </div>

                    {/* Meta info body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span>Rating: {"★".repeat(Math.floor(product.rating))} ({product.rating})</span>
                          <span>In Stock: {product.stockCount} units</span>
                        </div>
                        <h3 className="font-display font-bold text-stone-900 text-base leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-stone-500 text-xs leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Health benefits & Allergens alert footer inside card */}
                      <div className="space-y-2 pt-2 border-t border-stone-100">
                        <div className="text-[10.5px] text-stone-700 leading-normal flex items-start gap-1.5">
                          <span className="text-emerald-600 font-extrabold shrink-0">✓ Benefit:</span>
                          <span className="italic font-sans">{product.healthBenefit}</span>
                        </div>
                        {product.allergenAlert && (
                          <div className="text-[10px] text-amber-900 bg-amber-50/70 py-1.5 px-2.5 rounded-lg border border-amber-200/50 flex items-start gap-1.5 shrink-0">
                            <TriangleAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span><strong className="font-semibold">Allergen Notice:</strong> {product.allergenAlert}</span>
                          </div>
                        )}
                      </div>

                      {/* Add Button */}
                      <button
                        type="button"
                        onClick={() => onAddToCart(product, 1)}
                        className="w-full bg-stone-900 hover:bg-stone-850 text-stone-100 text-xs font-semibold py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4 text-stone-300" />
                        <span>Add To Pantry Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHECKOUT STEP: CUSTOMER DETAILED FORM */}
        {checkoutStep === "checkout_form" && (
          <div className="lg:col-span-2 bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-display font-bold text-stone-900 flex items-center gap-2.5 mb-2">
              <CreditCard className="w-5.5 h-5.5 text-stone-900" />
              Direct Delivery Information
            </h2>
            <p className="text-xs text-stone-500 mb-6">Complete delivery variables to construct your physical nutritious stock transfer.</p>

            <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-800 font-display block">Receiver Full Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (formErrors.name) setFormErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Donald Kalombo"
                    className={`w-full bg-stone-50 border rounded-xl py-3 px-4 text-xs tracking-wide focus:outline-none focus:bg-white transition ${
                      formErrors.name ? "border-red-400" : "border-stone-200 focus:border-stone-500"
                    }`}
                  />
                  {formErrors.name && <p className="text-[10px] text-red-600 font-mono mt-1">{formErrors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-800 font-display block">Direct Delivery Speed</label>
                  <select
                    value={deliverySpeed}
                    onChange={(e) => setDeliverySpeed(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-stone-50500 font-sans cursor-pointer focus:bg-white"
                  >
                    <option value="standard">Standard Secure Cargo (3-4 Days) - $4.99</option>
                    <option value="expedited">Premium Temperature Locked (24 Hours) - $12.99</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-800 font-display block">Shipping Destination Address *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4.5 h-4.5 text-stone-400" />
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => {
                      setCustomerAddress(e.target.value);
                      if (formErrors.address) setFormErrors(prev => ({ ...prev, address: undefined }));
                    }}
                    placeholder="Street, City, Postcode (e.g., 20 Wimpole Street, London)"
                    className={`w-full bg-stone-50 border rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:bg-white transition ${
                      formErrors.address ? "border-red-400" : "border-stone-200 focus:border-stone-400"
                    }`}
                  />
                </div>
                {formErrors.address && <p className="text-[10px] text-red-600 font-mono mt-1">{formErrors.address}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold text-stone-800 font-display block">Critical Allergen Warnings Disclosure</label>
                  <span className="text-[10px] text-stone-400 font-mono">Optional</span>
                </div>
                <div className="relative">
                  <ClipboardPaste className="absolute left-3 top-3.5 w-4.5 h-4.5 text-stone-400" />
                  <textarea
                    rows={3}
                    value={allergyDisclosures}
                    onChange={(e) => setAllergyDisclosures(e.target.value)}
                    placeholder="Flag any secondary high allergy risks (e.g., 'Severe peanut throat closure risk', 'No nightshades' etc)"
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none transition focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
                <TriangleAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 leading-normal">
                  <strong className="font-semibold">Pantry Safety Standard:</strong> By confirming, packing staff will run strict isolated mechanical sterilizations on whole flax and nut packages to protect cross-contamination lines based on disclosures.
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("shopping")}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-900 cursor-pointer transition uppercase"
                >
                  Back To Shopping
                </button>
                <button
                  type="submit"
                  className="text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-100 py-3.5 px-6 rounded-xl cursor-pointer transition flex items-center gap-1.5"
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Execute Order (${cartTotal.toFixed(2)})</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* CHECKOUT STEP: COMPLETED DIGITAL INVOICE RECEIPT */}
        {checkoutStep === "invoice" && invoiceDetails && (
          <div className="lg:col-span-3 max-w-2xl mx-auto w-full bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-100 pb-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-900 flex items-center justify-center text-amber-400">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-stone-900">Secure Order Confirmed</h2>
                  <p className="text-xs text-stone-500 font-mono">Invoice Identifier: <span className="text-stone-800 font-semibold">{invoiceDetails.orderId}</span></p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block">Shipment Status</span>
                <span className="bg-amber-50 text-amber-800 border-amber-200 border mt-1 text-[11px] font-semibold py-1 px-3 rounded-full uppercase inline-block font-mono tracking-wider">
                  🚚 Preparing Cargo
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 bg-stone-50 border border-stone-150 rounded-2xl p-5 text-xs font-sans">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest block">Consignee Address</span>
                <strong className="block text-stone-900 text-sm">{invoiceDetails.customerName}</strong>
                <p className="text-stone-500 leading-normal">{invoiceDetails.customerAddress}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest block">Logistics Strategy</span>
                <strong className="block text-stone-900 text-sm">
                  {invoiceDetails.deliverySpeed === "standard" ? "Standard Secure Cargo" : "Premium Temp Locked"}
                </strong>
                <p className="text-stone-500">Estimated Delivery: {invoiceDetails.deliverySpeed === "standard" ? "3-4 Business Days" : "Within 24 Hours Max"}</p>
              </div>
            </div>

            {/* Dietitian's Advice Note Block */}
            <div className="bg-amber-50/60 border border-amber-250 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5 font-display">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                Dietitian Nutrition Counselor Dispatch Note
              </span>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                {invoiceDetails.dieticianNotes}
              </p>
            </div>

            {/* Invoice Line Items Pricing table */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-stone-900 text-sm">Certified Stock Listing</h4>
              <div className="border border-stone-150 rounded-2xl overflow-hidden divide-y divide-stone-100">
                {invoiceDetails.items.map((item: CartItem) => (
                  <div key={item.product.id} className="p-4 flex justify-between items-center text-xs">
                    <div className="space-y-1">
                      <strong className="text-stone-900 block">{item.product.name}</strong>
                      <span className="text-stone-500 font-mono uppercase tracking-wider text-[10px] bg-stone-100 rounded-sm px-1.5 py-0.5 border">
                        {item.product.targetCategory} category
                      </span>
                    </div>
                    <div className="text-right font-mono text-stone-700 font-semibold">
                      {item.quantity} x ${item.product.price} ({ (item.product.price * item.quantity).toFixed(2) })
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing math */}
            <div className="border-t border-stone-150 pt-4 space-y-2.5 max-w-xs ml-auto text-xs font-sans">
              <div className="flex justify-between text-stone-500">
                <span>Items Subtotal:</span>
                <span className="font-mono font-semibold">${invoiceDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Shipping Cargo:</span>
                <span className="font-mono font-semibold">
                  {invoiceDetails.shipping === 0 ? "FREE" : `$${invoiceDetails.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Estimate Sales Tax (8%):</span>
                <span className="font-mono font-semibold">${invoiceDetails.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-3 text-stone-900 text-sm font-bold">
                <span className="font-display">Total Invoiced:</span>
                <span className="font-mono">${invoiceDetails.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-150 flex flex-col md:flex-row gap-3 md:items-center justify-between">
              <span className="text-[10px] text-stone-500 font-mono">
                Order Timestamp Ref: {invoiceDetails.orderDate.toISOString()}
              </span>
              <button
                type="button"
                onClick={() => {
                  setCheckoutStep("shopping");
                  setInvoiceDetails(null);
                }}
                className="text-xs bg-stone-900 hover:bg-stone-850 text-stone-100 font-semibold py-3 px-6 rounded-xl cursor-pointer transition uppercase text-center"
              >
                Return To Dietary Pantry
              </button>
            </div>
          </div>
        )}

        {/* SIDEBAR: SHOPPING BASKET SUMMARY */}
        {checkoutStep !== "invoice" && (
          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 space-y-5 h-fit self-start">
            <h2 className="text-sm font-display font-semibold text-stone-900 uppercase tracking-wider flex items-center justify-between pb-3 border-b border-stone-250">
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-stone-600" />
                Pantry Basket
              </span>
              <span className="bg-stone-900 text-stone-100 font-mono text-[10px] py-0.5 px-2 rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </h2>

            {cart.length === 0 ? (
              <div className="py-12 text-center text-stone-400 space-y-2">
                <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="text-xs font-sans">Your pantry cart is empty.</p>
                <p className="text-[10px] font-sans text-stone-400">Select boosters or ingredients from our recipes to load items.</p>
              </div>
            ) : (
              <>
                {/* Scrollable list content */}
                <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="bg-white border border-stone-150 p-3 rounded-xl flex gap-3 items-center justify-between"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <strong className="block text-xs font-semibold text-stone-900 truncate">
                          {item.product.name}
                        </strong>
                        <span className="block text-xs text-stone-500 font-mono">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 shrink-0 bg-stone-100 rounded-lg p-1 border">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-stone-800 w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Trash action */}
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 cursor-pointer shrink-0 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Combined basket allergen flags */}
                {cartAllergens.length > 0 && (
                  <div className="bg-red-50/70 border border-red-250 p-3.5 rounded-xl space-y-1.5 shrink-0">
                    <span className="text-[10px] font-mono font-bold text-red-900 uppercase flex items-center gap-1.5 font-display">
                      <TriangleAlert className="w-4 h-4 text-red-600" />
                      Basket Allergen Alerts:
                    </span>
                    <ul className="space-y-1">
                      {cartAllergens.map((alg, k) => (
                        <li key={k} className="text-[10px] text-red-800 leading-normal pl-3 relative before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:rounded-full before:bg-red-500">
                          <strong className="font-semibold">{alg.productName}:</strong> {alg.alert}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Subtotal math panel */}
                <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs font-sans">
                  <div className="flex justify-between text-stone-500">
                    <span>Selected items subtotal:</span>
                    <span className="font-mono font-bold">${itemsSubtotal.toFixed(2)}</span>
                  </div>
                  {itemsSubtotal > 49 && (
                    <div className="text-[10px] text-emerald-700 bg-emerald-50 py-1 px-2.5 rounded-md text-center border border-emerald-250 font-mono tracking-wide">
                      ⚡ Free standard carbon shipping applied!
                    </div>
                  )}
                </div>

                {/* Go To Form Button */}
                {checkoutStep === "shopping" ? (
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("checkout_form")}
                    className="w-full bg-stone-900 hover:bg-stone-850 text-stone-100 font-semibold py-3.5 rounded-xl transition cursor-pointer text-xs flex items-center justify-center gap-2 uppercase tracking-wider font-display"
                  >
                    <span>Proceed To Shipping</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("shopping")}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 border font-semibold py-3.5 rounded-xl transition cursor-pointer text-xs flex items-center justify-center gap-2 uppercase tracking-wide font-display"
                  >
                    <span>Back to Pantry Items</span>
                  </button>
                )}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
