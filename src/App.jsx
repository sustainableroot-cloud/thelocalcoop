import React, { useState } from 'react';
import { 
  Calculator, Truck, ShieldCheck, MapPin, Calendar, ArrowRight, CheckCircle2, 
  BarChart3, RefreshCw, ShoppingCart, UserCheck, Layers, Award, Leaf, Wheat,
  Vote, QrCode, FileText, Lock, Unlock, Users, PlusCircle, DollarSign, Upload
} from 'lucide-react';

export default function TheLocalCoOpApp() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [userRole, setUserRole] = useState('producer_owner');
  const [memberTier, setMemberTier] = useState('producer_standard');
  
  // FeedFlow Calculator State
  const [animalType, setAnimalType] = useState('horse');
  const [animalCount, setAnimalCount] = useState(4);
  const [feedingMonths, setFeedingMonths] = useState(5);
  const [calculatedTons, setCalculatedTons] = useState(3.6);
  const [calculatedBales, setCalculatedBales] = useState(120);

  // Products & Live Database State (Including your Homedale/Wilder stack)
  const [products, setProducts] = useState([
    {
      id: 'prod-homedale-01',
      title: 'Regenerative Multi-Species Mix (Vetch, Alfalfa, Clover, Plantain & Grasses)',
      producer: 'Your Farm (Homedale / Wilder, ID)',
      category: 'animal_feed',
      baleStyle: 'Standard Square / Rectangular',
      weightLbs: 60,
      priceBale: 14.50,
      priceTon: 241.66,
      stockBales: 125, // 113 main stack + 12 spray painted
      rfv: 114,
      cpPct: 12.41,
      moisturePct: 7.75,
      zip: '83676',
      qrHash: 'SR-HOMEDALE-VETCH-001',
      notes: '113 main stack + 12 spray painted bales. Lab tested via High Desert Dairy Lab.'
    },
    {
      id: 'prod-2',
      title: 'Dairy-Grade 2nd Cut Alfalfa',
      producer: 'Walkin\' H Farms (Melba, ID)',
      category: 'animal_feed',
      baleStyle: '3x4 Large Square',
      weightLbs: 1200,
      priceBale: 132.00,
      priceTon: 220.00,
      stockBales: 180,
      rfv: 158,
      cpPct: 21.2,
      zip: '83641',
      qrHash: 'SR-ALF-83641-001'
    }
  ]);

  // Producer Onboarding Form
  const [formData, setFormData] = useState({
    title: 'Homedale Multi-Species Regenerative Forage',
    category: 'animal_feed',
    baleStyle: 'Standard Square',
    avgWeight: '60',
    pricePerBale: '14.50',
    baleCount: '125',
    crudeProtein: '12.41',
    rfv: '114',
    moisture: '7.75',
    zip: '83676'
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(20);
  const [hubTrailerLocked, setHubTrailerLocked] = useState(true);

  // Parliamentary Motion State
  const [activeMotion, setActiveMotion] = useState({
    title: 'Proposal #1: Official Co-Op Name & Bylaw Ratification',
    description: 'Vote to formally adopt "The Local Co-Op, Inc." as our legal multi-stakeholder cooperative entity name.',
    votesForProducer: 15,
    votesAgainstProducer: 1,
    votesForConsumer: 72,
    votesAgainstConsumer: 2,
    hasVoted: false
  });

  const handleCalculateFeed = () => {
    let dailyLbs = animalType === 'cattle' ? 28 : animalType === 'horse' ? 20 : 4;
    const totalLbs = animalCount * dailyLbs * (feedingMonths * 30);
    setCalculatedTons((totalLbs / 2000).toFixed(1));
    setCalculatedBales(Math.ceil(totalLbs / 60));
  };

  const handleProducerSubmit = (e) => {
    e.preventDefault();
    const newProd = {
      id: `prod-${products.length + 1}`,
      title: formData.title,
      producer: 'Your Farm (Homedale / Wilder)',
      category: formData.category,
      baleStyle: formData.baleStyle,
      weightLbs: parseFloat(formData.avgWeight),
      priceBale: parseFloat(formData.pricePerBale),
      priceTon: (parseFloat(formData.pricePerBale) / (parseFloat(formData.avgWeight) / 2000)).toFixed(2),
      stockBales: parseInt(formData.baleCount),
      rfv: parseFloat(formData.rfv),
      cpPct: parseFloat(formData.crudeProtein),
      zip: formData.zip,
      qrHash: `SR-CUSTOM-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setProducts([newProd, ...products]);
    setActiveTab('marketplace');
  };

  const calcSubtotal = selectedProduct ? (selectedProduct.priceBale * orderQuantity) : 0;
  const calcBuyerFee = calcSubtotal * 0.03;
  const calcTotal = calcSubtotal + calcBuyerFee;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-emerald-950 text-white border-b border-emerald-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-lg text-emerald-950 font-black shadow-lg">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-emerald-100 flex items-center gap-2">
                THE LOCAL CO-OP <span className="text-xs bg-emerald-800 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-700">MSC Network</span>
              </h1>
              <p className="text-xs text-emerald-400">Treasure Valley Regional Food & Forage Sovereignty</p>
            </div>
          </div>

          <div className="flex items-center bg-emerald-900/80 p-1 rounded-xl border border-emerald-800 text-xs">
            <span className="text-emerald-400 px-2 font-medium">Role View:</span>
            <button onClick={() => setUserRole('consumer_owner')} className={`px-3 py-1.5 rounded-lg font-semibold transition ${userRole === 'consumer_owner' ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-emerald-300 hover:text-white'}`}>Consumer Owner</button>
            <button onClick={() => setUserRole('producer_owner')} className={`px-3 py-1.5 rounded-lg font-semibold transition ${userRole === 'producer_owner' ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-emerald-300 hover:text-white'}`}>Producer Owner</button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex gap-2 border-t border-emerald-900 overflow-x-auto text-sm font-medium">
          <button onClick={() => setActiveTab('calculator')} className={`py-2.5 px-4 flex items-center gap-2 border-b-2 transition ${activeTab === 'calculator' ? 'border-emerald-400 text-emerald-300 font-bold' : 'border-transparent text-emerald-200 hover:text-white'}`}><Calculator className="w-4 h-4 text-emerald-400" /> FeedFlow Calculator</button>
          <button onClick={() => setActiveTab('marketplace')} className={`py-2.5 px-4 flex items-center gap-2 border-b-2 transition ${activeTab === 'marketplace' ? 'border-emerald-400 text-emerald-300 font-bold' : 'border-transparent text-emerald-200 hover:text-white'}`}><Wheat className="w-4 h-4 text-emerald-400" /> Marketplace</button>
          <button onClick={() => setActiveTab('producer_onboarding')} className={`py-2.5 px-4 flex items-center gap-2 border-b-2 transition ${activeTab === 'producer_onboarding' ? 'border-emerald-400 text-emerald-300 font-bold' : 'border-transparent text-emerald-200 hover:text-white'}`}><PlusCircle className="w-4 h-4 text-emerald-400" /> Add Inventory</button>
          <button onClick={() => setActiveTab('producer_dashboard')} className={`py-2.5 px-4 flex items-center gap-2 border-b-2 transition ${activeTab === 'producer_dashboard' ? 'border-emerald-400 text-emerald-300 font-bold' : 'border-transparent text-emerald-200 hover:text-white'}`}><BarChart3 className="w-4 h-4 text-emerald-400" /> Member Dashboard</button>
          <button onClick={() => setActiveTab('governance')} className={`py-2.5 px-4 flex items-center gap-2 border-b-2 transition ${activeTab === 'governance' ? 'border-emerald-400 text-emerald-300 font-bold' : 'border-transparent text-emerald-200 hover:text-white'}`}><Vote className="w-4 h-4 text-emerald-400" /> Voting (Robert's Rules)</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">Custom Ration & Forage Engine</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">FeedFlow Livestock Nutritional & Tonnage Calculator</h2>
              <p className="text-slate-600 text-sm mt-1">Configure feed programs tailored to your animals' exact nutritional targets using verified lab metrics from Treasure Valley soil and hay samples.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Livestock Type</label>
                  <select value={animalType} onChange={(e) => setAnimalType(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-semibold">
                    <option value="horse">Horses (Avg 1,000 lbs)</option>
                    <option value="cattle">Cattle (1,200 lbs)</option>
                    <option value="sheep">Sheep / Goats (150 lbs)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Animal Count</label>
                  <input type="number" value={animalCount} onChange={(e) => setAnimalCount(parseInt(e.target.value) || 1)} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Feeding Duration (Months)</label>
                  <input type="number" value={feedingMonths} onChange={(e) => setFeedingMonths(parseInt(e.target.value) || 1)} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-semibold" />
                </div>
              </div>
              <button onClick={handleCalculateFeed} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow transition flex items-center gap-2">
                <Calculator className="w-5 h-5" /> Calculate Custom FeedFlow Requirements
              </button>
            </div>

            <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                <span className="text-xs text-emerald-300 uppercase font-semibold">Total Tonnage Required</span>
                <p className="text-4xl font-extrabold mt-1">{calculatedTons} <span className="text-lg font-normal text-emerald-300">Tons</span></p>
              </div>
              <div>
                <span className="text-xs text-emerald-300 uppercase font-semibold">Estimated Standard Bales</span>
                <p className="text-4xl font-extrabold mt-1">{calculatedBales} <span className="text-lg font-normal text-emerald-300">Bales</span></p>
              </div>
              <button onClick={() => setActiveTab('marketplace')} className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold py-3 px-4 rounded-xl shadow text-sm transition text-center">
                Match with Homedale/Wilder Inventory →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">{prod.category.replace('_', ' ')}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> ZIP {prod.zip}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{prod.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">Producer: {prod.producer}</p>
                  {prod.notes && <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">{prod.notes}</p>}
                  
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                    <div><span className="text-slate-400 block text-[10px] uppercase">RFV Index</span><span className="font-bold text-emerald-700">{prod.rfv}</span></div>
                    <div><span className="text-slate-400 block text-[10px] uppercase">Protein</span><span className="font-bold text-emerald-700">{prod.cpPct}%</span></div>
                    <div><span className="text-slate-400 block text-[10px] uppercase">Moisture</span><span className="font-bold text-slate-800">{prod.moisturePct || 7.75}%</span></div>
                  </div>

                  <div className="flex justify-between items-baseline pt-2">
                    <div><span className="text-2xl font-extrabold text-slate-900">${prod.priceBale.toFixed(2)}</span><span className="text-xs text-slate-500"> / unit</span></div>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">${prod.priceTon} / Ton</span>
                  </div>
                </div>
                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Stock: {prod.stockBales} Bales Available</span>
                  <button onClick={() => setSelectedProduct(prod)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm flex items-center gap-1">
                    Order & Schedule <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'producer_onboarding' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">Producer Onboarding Wizard</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">Add Your Hay, Feed or Seed Inventory</h2>
              <p className="text-xs text-slate-500 mt-1">Preloaded with your Homedale/Wilder stack specs and High Desert Dairy Lab metrics.</p>
            </div>
            <form onSubmit={handleProducerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Listing Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Price Per Unit / Bale ($)</label>
                  <input type="number" step="0.01" value={formData.pricePerBale} onChange={(e) => setFormData({...formData, pricePerBale: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Total Bales Available (113 main + 12 painted)</label>
                  <input type="number" value={formData.baleCount} onChange={(e) => setFormData({...formData, baleCount: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Stackyard ZIP (Homedale / Wilder)</label>
                  <input type="text" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Crude Protein % (Lab Verified)</label>
                  <input type="number" step="0.01" value={formData.crudeProtein} onChange={(e) => setFormData({...formData, crudeProtein: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">RFV Index (Lab Verified)</label>
                  <input type="number" value={formData.rfv} onChange={(e) => setFormData({...formData, rfv: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs" />
                </div>
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow transition flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Publish Homedale Stack & Generate QR Tag
              </button>
            </form>
          </div>
        )}

        {activeTab === 'producer_dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 uppercase">Co-Op Member Standing</span>
                <p className="text-lg font-bold text-slate-900 mt-1">Active Producer Owner</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 uppercase">Homedale Stack Inventory</span>
                <p className="text-2xl font-extrabold text-emerald-700 mt-1">125 Bales</p>
                <span className="text-[10px] text-slate-500">113 Main + 12 Spray Painted</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 uppercase">Est. Patronage Dividend</span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">$1,069.20</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 uppercase">Stripe Connect</span>
                <p className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Connected</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'governance' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Parliamentary Procedure Voting Engine (Robert's Rules)</h2>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">Active Floor Motion</span>
              <h3 className="text-base font-bold text-slate-900">{activeMotion.title}</h3>
              <p className="text-xs text-slate-600">{activeMotion.description}</p>
              <div className="flex gap-3 pt-2">
                <button disabled={activeMotion.hasVoted} onClick={() => setActiveMotion({...activeMotion, votesForConsumer: activeMotion.votesForConsumer + 1, hasVoted: true})} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs">Cast Pre-Vote: AYE</button>
                <button disabled={activeMotion.hasVoted} onClick={() => setActiveMotion({...activeMotion, votesAgainstConsumer: activeMotion.votesAgainstConsumer + 1, hasVoted: true})} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs">Cast Pre-Vote: NAY</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedProduct.title}</h3>
                <p className="text-xs text-slate-500">{selectedProduct.producer}</p>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Quantity (Units / Bales)</label>
                <input type="number" value={orderQuantity} onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 1)} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-bold" />
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between"><span>Subtotal:</span><span className="font-bold">${calcSubtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-500"><span>Co-Op Escrow Fee (3%):</span><span>+${calcBuyerFee.toFixed(2)}</span></div>
                <div className="border-t pt-2 flex justify-between font-extrabold text-sm text-slate-900"><span>Total Due:</span><span className="text-emerald-700">${calcTotal.toFixed(2)}</span></div>
              </div>
            </div>
            <button onClick={() => { alert('Order placed! Funds held securely in Stripe Connect escrow.'); setSelectedProduct(null); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow text-sm">
              Confirm Order & Hold in Escrow
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
