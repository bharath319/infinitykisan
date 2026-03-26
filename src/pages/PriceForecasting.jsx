import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, MapPin, Calendar } from 'lucide-react';
import BackButton from '../components/BackButton';
import styles from '../styles/PriceForecasting.module.css';
import { useTranslation } from '../services/i18n';
import { PRICE_DATABASE } from '../data/priceData';

/**
 * PriceForecasting Component
 * Optimized for local farmers with multi-unit support, 
 * and specific date-based forecasting.
 */
const PriceForecasting = () => {
  const { t } = useTranslation();
  const [crop, setCrop] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [market, setMarket] = useState('');
  const [rateType, setRateType] = useState('wholesale');
  const [selectedDate, setSelectedDate] = useState('');
  const [unit, setUnit] = useState('quintal'); // Supported: quintal, kg, tonne
  const [result, setResult] = useState(null);

  // Unit conversion factors relative to Quintal (100Kg)
  const conversionFactors = {
    quintal: 1,
    kg: 0.01,
    tonne: 10
  };

  const unitLabels = {
    quintal: t('quintals') || 'Quintals',
    kg: 'KG',
    tonne: 'Tonne'
  };

  // Derived memoized data for dropdown menus
  const crops = useMemo(() => Object.keys(PRICE_DATABASE).sort(), []);
  const states = useMemo(() => crop ? Object.keys(PRICE_DATABASE[crop] || {}).sort() : [], [crop]);
  const districts = useMemo(() => (crop && state) ? Object.keys(PRICE_DATABASE[crop]?.[state] || {}).sort() : [], [crop, state]);
  const markets = useMemo(() => (crop && state && district) ? Object.keys(PRICE_DATABASE[crop]?.[state]?.[district] || {}).sort() : [], [crop, state, district]);

  /**
   * Handles the search submit and calculates predictive pricing
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!crop || !state || !district || !market) return;

    const priceData = PRICE_DATABASE[crop]?.[state]?.[district]?.[market];
    if (!priceData) return;

    const currentPrice = priceData[rateType];
    const trend = priceData.trend || [];

    // Robust MSP Lookup: try market-specific, then crop-wide, then calculate estimate
    let msp = priceData.msp;
    let isEstimatedMSP = false;

    if (msp === null || msp === undefined || msp <= 0) { // Also check if MSP is non-positive
      // Find typical MSP for this crop from other markets
      const cropData = PRICE_DATABASE[crop];
      for (const s in cropData) {
        for (const d in cropData[s]) {
          for (const m in cropData[s][d]) {
            if (cropData[s][d][m].msp > 0) { // Check if MSP is valid
              msp = cropData[s][d][m].msp;
              break;
            }
          }
          if (msp) break;
        }
        if (msp) break;
      }
    }

    // Default: Calculate estimated MSP as 75% of current market price if still missing
    if (!msp || msp <= 0) {
      msp = Math.round(currentPrice * 0.75);
      isEstimatedMSP = true;
    }

    // Prediction logic:
    // 1. Calculate general growth factor based on 6-month trend
    const isRising = trend.length > 1 && trend[trend.length - 1] > trend[0];
    const monthlyGrowthRate = isRising ? 0.05 : -0.02; // +5% or -2% per month
    const dailyGrowthRate = monthlyGrowthRate / 30;

    const predictedPrice = Math.round(currentPrice * (1 + monthlyGrowthRate));

    setResult({
      crop, state, district, market, rateType,
      currentPrice,
      predictedPrice,
      dailyGrowthRate,
      msp,
      isEstimatedMSP,
      changePercent: (((predictedPrice - currentPrice) / currentPrice) * 100).toFixed(1)
    });
  };

  /**
   * Reactive Date Calculation: Updates whenever the user selects a new date
   */
  const dateForecast = useMemo(() => {
    if (!result || !selectedDate) return null;

    const today = new Date();
    const targetDate = new Date(selectedDate);

    // Normalize dates to remove time impact
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return {
        price: Math.round(result.currentPrice * (1 + (result.dailyGrowthRate * diffDays))),
        label: targetDate.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
      };
    }
    return null;
  }, [result, selectedDate]);

  /**
   * Converts base price (per quintal) to selected unit
   */
  const convertPrice = (price) => {
    if (price === null || price === undefined) return null;
    const val = typeof price === 'number' ? price : parseFloat(price);
    if (isNaN(val)) return null;
    const converted = val * conversionFactors[unit];
    return unit === 'kg' ? converted.toFixed(2) : Math.round(converted);
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundImage: "url('/priceforcasting.png')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="container" style={{ paddingBottom: '4rem', paddingTop: '1.5rem' }}>
        <BackButton />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', padding: '1rem 2.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <h1 className="text-center" style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: '#111827', textShadow: '0 1px 2px rgba(255,255,255,1)' }}>{t('price_forecasting_title')}</h1>
            </div>
        </div>

      {/* Selection Form Section - Aligned with CropRecommendation theme */}
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto 2.5rem', borderRadius: '16px' }}>
        <form onSubmit={handleSearch} className={styles.form} style={{ padding: '1.5rem' }}>
          <div className={styles.inputGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>

            <div className={styles.inputGroup} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)' }}>{t('crop_name')}</label>
              <select
                value={crop}
                onChange={(e) => { setCrop(e.target.value); setState(''); setDistrict(''); setMarket(''); setResult(null); }}
                required
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid var(--primary)', background: '#fff' }}
              >
                <option value="">-- {t('choose_crop')} --</option>
                {crops.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className={styles.inputGroup} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)' }}>{t('state')}</label>
              <select
                value={state}
                onChange={(e) => { setState(e.target.value); setDistrict(''); setMarket(''); setResult(null); }}
                disabled={!crop}
                required
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: crop ? '#fff' : '#f9fafb' }}
              >
                <option value="">-- {t('state')} --</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className={styles.inputGroup} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)' }}>{t('district')}</label>
              <select
                value={district}
                onChange={(e) => { setDistrict(e.target.value); setMarket(''); setResult(null); }}
                disabled={!state}
                required
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: state ? '#fff' : '#f9fafb' }}
              >
                <option value="">-- {t('district')} --</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className={styles.inputGroup} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)' }}>{t('market_mandi')}</label>
              <select
                value={market}
                onChange={(e) => { setMarket(e.target.value); setResult(null); }}
                disabled={!district}
                required
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: district ? '#fff' : '#f9fafb' }}
              >
                <option value="">-- {t('market_mandi')} --</option>
                {markets.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className={styles.inputGroup} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)' }}>{t('rate_type')}</label>
              <select value={rateType} onChange={(e) => { setRateType(e.target.value); setResult(null); }} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <option value="wholesale">{t('wholesale')}</option>
                <option value="retail">{t('retail')}</option>
              </select>
            </div>

            <div className={styles.inputGroup} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)' }}>{t('select_date_opt')}</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', pointerEvents: 'none' }} />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ padding: '10px 36px 10px 12px', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }}
                />
              </div>
              <small style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '2px' }}>{t('date_hint')}</small>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)', display: 'block', marginBottom: '4px' }}>{t('unit')}</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }}>
                <option value="quintal">{unitLabels.quintal}</option>
                <option value="kg">{unitLabels.kg}</option>
                <option value="tonne">{unitLabels.tonne}</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: 'auto', height: '48px' }}>
              <Search size={20} /> {t('get_forecast')}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className={styles.marketCard} style={{ padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }}>
            <div className={styles.header} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px' }}>
                  <MapPin size={16} /> {result.state}
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                  {result.market}, {result.district}
                </h3>
                <div style={{ color: '#6b7280', fontSize: '1rem', marginTop: '4px' }}>
                  {result.crop} — {result.rateType === 'wholesale' ? t('wholesale') : t('retail')}
                </div>
              </div>
              <div className={styles.priceTag} style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>{t('current_price')}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111827' }}>₹{convertPrice(result.currentPrice)}</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px',
                  color: result.changePercent >= 0 ? '#059669' : '#DC2626',
                  background: result.changePercent >= 0 ? '#ecfdf5' : '#fef2f2',
                  padding: '4px 10px', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '800'
                }}>
                  {result.changePercent >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(result.changePercent)}% {result.changePercent >= 0 ? 'Increase' : 'Decrease'}
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className={styles.priceGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div className={styles.priceItem} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #eef2f7', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>{result.isEstimatedMSP ? 'Est. Support Price' : t('msp')}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#15803d' }}>
                  ₹{convertPrice(result.msp)}
                </div>
                <small style={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                  {result.isEstimatedMSP ? 'Calculated Fair Rate' : 'Government Guaranteed'}
                </small>
              </div>

              <div className={`${styles.priceItem} ${styles.highlight}`} style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '16px', border: '2px solid var(--primary)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary-dark)', textTransform: 'uppercase', marginBottom: '8px' }}>{t('predicted_next_month')}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--primary-dark)' }}>₹{convertPrice(result.predictedPrice)}</div>
                <small style={{ color: 'var(--primary)', fontSize: '0.7rem' }}>Model Expectation</small>
              </div>

              {dateForecast && (
                <div className={styles.priceItem} style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #dbeafe', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1e40af', textTransform: 'uppercase', marginBottom: '8px' }}>Rate on {dateForecast.label}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e40af' }}>₹{convertPrice(dateForecast.price)}</div>
                  <small style={{ color: '#60a5fa', fontSize: '0.7rem' }}>Forecasted Rate</small>
                </div>
              )}
            </div>

            {/* Recommendation Banner */}
            <div className={styles.recommendation} style={{
              marginTop: '2.5rem', background: 'linear-gradient(to right, #f8fafc, #fff)',
              padding: '1.5rem', borderRadius: '16px', border: '1px solid #eef2f7',
              display: 'flex', gap: '1.5rem', alignItems: 'center'
            }}>
              <div className={styles.recIcon} style={{
                background: result.changePercent > 3 ? '#10b981' : result.changePercent > 0 ? '#f59e0b' : '#ef4444',
                color: 'white', padding: '12px', borderRadius: '12px'
              }}>
                {result.changePercent > 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
              </div>
              <div>
                <h4 style={{ margin: 0, color: '#111827', fontSize: '1.1rem' }}>
                  {result.changePercent > 3
                    ? t('strong_hold_signal')
                    : result.changePercent > 0
                      ? t('hold_signal')
                      : t('sell_signal')}
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5 }}>
                  {result.changePercent > 3
                    ? "Strong upward trend. Holding stock is highly recommended for maximum profit."
                    : result.changePercent > 0
                      ? "Market is rising steadily. Consider holding or selling in small batches."
                      : "Downward trend detected. Consider selling to avoid price drops."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default PriceForecasting;
