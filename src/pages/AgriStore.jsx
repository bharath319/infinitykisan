import React, { useState, useRef } from 'react';
import { FileText, MapPin, Package, ArrowRight, Loader2, Store } from 'lucide-react';
import { useTranslation } from '../services/i18n';
import { analyzeDiseaseReport } from '../services/gemini';
import { useLocation } from '../context/LocationContext';
import BackButton from '../components/BackButton';

const AgriStore = () => {
    const { t, language } = useTranslation();
    const { location } = useLocation();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');

    // Mock store data generator
    const generateShops = (products) => {
        const shopNamesPool = [
            "Kisan Seva Kendra", "Bharat Agri Inputs", "Green World Fertilizers", 
            "Modern Farm Solutions", "Grama Seva Store", "Pradhan Mantri Krishi Kendra",
            "Annapurna Seeds & Fertilizers", "Jai Kisan Agri Shop", "Nature Care Inputs",
            "Siddhi Vinayak Agro", "Green Harvest Solutions", "Village Agri Hub"
        ];

        // Shuffle and pick 4-5 random shops
        const selectedShops = shopNamesPool
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 2) + 4);

        return selectedShops.map((name, index) => {
            const distance = (Math.random() * 4 + 0.5).toFixed(1);
            const rating = (Math.random() * 1 + 4).toFixed(1);
            
            return {
                id: index,
                name,
                distance: `${distance} km`,
                rating,
                contact: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
                inventory: products.map(p => ({
                    name: p,
                    status: Math.random() > 0.3 ? t('in_stock') : t('limited_stock'),
                    price: `₹${Math.floor(Math.random() * 500) + 200}`
                }))
            };
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setError(t('invalid_file_error') || 'Please upload a valid PDF file.');
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result;
                try {
                    const result = await analyzeDiseaseReport(base64, language);
                    setReportData({
                        ...result,
                        shops: generateShops([...result.pesticides, ...result.fertilizers])
                    });
                } catch (err) {
                    setError(err.message || t('analysis_failed_error') || 'Failed to analyze PDF. Please try again.');
                    console.error(err);
                } finally {
                    setIsAnalyzing(false);
                }
            };
            reader.readAsDataURL(file);
        } catch (err) {
            setError(t('file_read_error') || 'Error reading file.');
            setIsAnalyzing(false);
        }
    };

    const handleManualSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const items = searchQuery.split(',').map(s => s.trim()).filter(s => s);
        setReportData({
            disease: 'Manual Search',
            pesticides: items.filter(i => i.toLowerCase().includes('pesti') || i.toLowerCase().includes('cide') || Math.random() > 0.5),
            fertilizers: items.filter(i => !i.toLowerCase().includes('pesti') && !i.toLowerCase().includes('cide') && Math.random() > 0.5),
            shops: generateShops(items)
        });
    };

    return (
        <div className="w-full min-h-screen pb-20" style={{ backgroundImage: "url('/agristorebackground.png')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <BackButton />
                
                {/* Header */}
                <div className="bg-[#10B981] rounded-3xl p-10 text-white shadow-xl mb-8 mt-6">
                    <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                        <Store size={40} />
                        {t('agri_store')}
                    </h1>
                    <p className="text-white/90 text-lg font-medium">
                        {t('agri_store_subtitle')}
                    </p>
                </div>

                {!reportData ? (
                    <div className="space-y-6">
                        {/* PDF Upload Card */}
                        <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full max-w-lg border-4 border-dashed border-stone-100 rounded-[3rem] p-12 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group mb-6"
                            >
                                <div className="w-20 h-20 bg-stone-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-all">
                                    {isAnalyzing ? (
                                        <Loader2 size={40} className="text-emerald-500 animate-spin" />
                                    ) : (
                                        <FileText size={40} className="text-stone-300 group-hover:text-emerald-500" />
                                    )}
                                </div>
                                <h3 className="text-xl font-black text-stone-800 mb-2">
                                    {isAnalyzing ? t('analyzing_report') : t('upload_report_title')}
                                </h3>
                                <p className="text-stone-400 font-medium">{t('upload_report_hint')}</p>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleFileUpload} 
                                    className="hidden" 
                                    accept=".pdf"
                                />
                            </div>

                            <div className="flex items-center gap-4 w-full max-w-lg my-4">
                                <div className="h-px bg-stone-100 flex-1"></div>
                                <span className="text-stone-300 font-bold text-xs uppercase tracking-widest">{t('or_divider')}</span>
                                <div className="h-px bg-stone-100 flex-1"></div>
                            </div>

                            {/* Manual Search Input */}
                            <form onSubmit={handleManualSearch} className="w-full max-w-lg relative group">
                                <input 
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('search_placeholder')}
                                    className="w-full bg-stone-50 border-2 border-stone-100 rounded-3xl px-8 py-6 text-lg font-bold text-stone-700 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all pr-20"
                                />
                                <button 
                                    type="submit"
                                    className="absolute right-3 top-3 bottom-3 aspect-square bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
                                >
                                    <ArrowRight size={24} />
                                </button>
                            </form>
                            <p className="text-xs text-stone-400 mt-4 font-medium">{t('search_tip')}</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Recommendations Section */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                                    <Package size={24} />
                                </span>
                                <div>
                                    <h2 className="text-2xl font-black text-stone-800">{t('recommendations')}</h2>
                                    <p className="text-stone-400 font-bold text-xs uppercase tracking-widest">{reportData.disease === 'Manual Search' ? t('manual_search') : reportData.disease}</p>
                                </div>
                                <button 
                                    onClick={() => setReportData(null)}
                                    className="ml-auto text-stone-400 hover:text-stone-600 font-bold text-sm"
                                >
                                    {t('upload_new')}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-black text-stone-800 text-sm uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                        {t('pesticides')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {reportData.pesticides.map((p, i) => (
                                            <span key={i} className="px-4 py-2 bg-stone-50 text-stone-700 rounded-xl font-bold text-sm border border-stone-100">
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-black text-stone-800 text-sm uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        {t('fertilizers')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {reportData.fertilizers.map((f, i) => (
                                            <span key={i} className="px-4 py-2 bg-stone-50 text-stone-700 rounded-xl font-bold text-sm border border-stone-100">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shops Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-2xl font-black text-stone-800">{t('nearby_shops')}</h2>
                                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                                    <MapPin size={14} />
                                    {location.name}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {reportData.shops.map(shop => (
                                    <div key={shop.id} className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 hover:border-emerald-200 transition-all group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex gap-4">
                                                <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-all text-stone-400 group-hover:text-emerald-500">
                                                    <Store size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-stone-800">{shop.name}</h3>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-stone-400 text-sm font-bold flex items-center gap-1">
                                                            <MapPin size={12} /> {shop.distance}
                                                        </span>
                                                        <span className="text-amber-500 text-sm font-bold flex items-center gap-1">
                                                            ★ {shop.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 max-w-md">
                                                <div className="flex flex-wrap gap-2">
                                                    {shop.inventory.map((item, idx) => (
                                                        <div key={idx} className="bg-stone-50 rounded-xl px-3 py-2 border border-stone-100 flex items-center justify-between gap-4 flex-1 min-w-[140px]">
                                                            <div>
                                                                <p className="text-[10px] font-black text-stone-400 uppercase leading-none mb-1">{item.name}</p>
                                                                <p className="text-xs font-black text-stone-700">{item.price}</p>
                                                            </div>
                                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                                                                item.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                            }`}>
                                                                {item.status}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <a 
                                                    href={`tel:${shop.contact}`}
                                                    className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all"
                                                >
                                                    <i className="fas fa-phone"></i>
                                                </a>
                                                <button className="flex-1 md:flex-none px-6 py-4 bg-[#10B981] text-white font-black rounded-2xl hover:bg-[#059669] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100">
                                                    {t('directions')} <ArrowRight size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgriStore;
