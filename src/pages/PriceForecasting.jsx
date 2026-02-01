import React, { useState } from 'react';

import { TrendingUp, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import BackButton from '../components/BackButton';
import styles from '../styles/PriceForecasting.module.css';
import { useTranslation } from '../services/i18n';

import { PRICE_DATABASE } from '../data/priceData';

const PriceForecasting = () => {
    const { t } = useTranslation();
    const [crop, setCrop] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [market, setMarket] = useState('');
    const [rateType, setRateType] = useState('wholesale');
    const [selectedDate, setSelectedDate] = useState('');
    const [result, setResult] = useState(null);

    const crops = Object.keys(PRICE_DATABASE);
    const states = crop ? Object.keys(PRICE_DATABASE[crop] || {}) : [];
    const districts = state && crop ? Object.keys(PRICE_DATABASE[crop]?.[state] || {}) : [];
    const markets = district && state && crop ? Object.keys(PRICE_DATABASE[crop]?.[state]?.[district] || {}) : [];

    const handleSearch = (e) => {
        e.preventDefault();
        if (!crop || !state || !district || !market) {
            alert('Please fill all fields');
            return;
        }

        const priceData = PRICE_DATABASE[crop]?.[state]?.[district]?.[market];
        if (!priceData) {
            alert('No data found for this combination');
            return;
        }

        let currentPrice = priceData[rateType];
        const trendData = priceData.trend.map((price, idx) => ({
            month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][idx],
            price: price
        }));

        // Calculate price for selected date if provided
        let priceForDate = currentPrice;
        let dateLabel = t('current_price');

        if (selectedDate) {
            const selected = new Date(selectedDate);
            const today = new Date();
            const diffDays = Math.floor((selected - today) / (1000 * 60 * 60 * 24));

            if (diffDays < -180) {
                // More than 6 months ago - use oldest trend data
                priceForDate = Math.round(currentPrice * 0.85);
                dateLabel = `${t('current_price')} on ${selected.toLocaleDateString('en-IN')}`;
            } else if (diffDays < 0) {
                // Historical (within 6 months) - interpolate from trend
                const monthsAgo = Math.abs(Math.floor(diffDays / 30));
                priceForDate = priceData.trend[Math.max(0, 5 - monthsAgo)] || currentPrice;
                dateLabel = `${t('current_price')} on ${selected.toLocaleDateString('en-IN')}`;
            } else if (diffDays > 180) {
                // More than 6 months in future
                priceForDate = Math.round(currentPrice * 1.15);
                dateLabel = `${t('predicted_next_month')} on ${selected.toLocaleDateString('en-IN')}`;
            } else if (diffDays > 0) {
                // Future prediction
                const monthsAhead = Math.ceil(diffDays / 30);
                priceForDate = Math.round(currentPrice * (1 + (monthsAhead * 0.02)));
                dateLabel = `${t('predicted_next_month')} on ${selected.toLocaleDateString('en-IN')}`;
            }
        }

        const predictedPrice = Math.round(currentPrice * 1.05);
        const nextWeekPrice = Math.round(currentPrice * 1.01);
        const changePercent = ((predictedPrice - currentPrice) / currentPrice * 100).toFixed(1);

        setResult({
            crop,
            state,
            district,
            market,
            rateType,
            currentPrice,
            priceForDate,
            dateLabel,
            predictedPrice,
            nextWeekPrice,
            changePercent,
            trendData,
            msp: priceData.msp
        });
    };

    return (
        <div className="container">
            <BackButton />
            <h2 className="text-center" style={{ margin: '1.5rem 0' }}>{t('price_forecasting_title')}</h2>

            <div className="card" style={{ maxWidth: '900px', margin: '0 auto 2rem' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('crop_name')}</label>
                            <select value={crop} onChange={(e) => { setCrop(e.target.value); setState(''); setDistrict(''); setMarket(''); }} required style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                                <option value="">-- {t('choose_crop')} --</option>
                                {crops.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('state')}</label>
                            <select value={state} onChange={(e) => { setState(e.target.value); setDistrict(''); setMarket(''); }} required disabled={!crop} style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                                <option value="">-- {t('state')} --</option>
                                {states.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('district')}</label>
                            <select value={district} onChange={(e) => { setDistrict(e.target.value); setMarket(''); }} required disabled={!state} style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                                <option value="">-- {t('district')} --</option>
                                {districts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('market_mandi')}</label>
                            <select value={market} onChange={(e) => setMarket(e.target.value)} required disabled={!district} style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                                <option value="">-- {t('market_mandi')} --</option>
                                {markets.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('rate_type')}</label>
                            <select value={rateType} onChange={(e) => setRateType(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                                <option value="wholesale">{t('wholesale')}</option>
                                <option value="retail">{t('retail')}</option>
                                <option value="msp">{t('msp')}</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('select_date_opt')}</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                            />
                            <small style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t('date_hint')}</small>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <Search size={18} /> {t('get_forecast')}
                    </button>
                </form>
            </div>

            {result && (
                <div className={styles.marketCard}>
                    <div className={styles.header}>
                        <div>
                            <h3>{result.crop} ({result.rateType === 'wholesale' ? t('wholesale') : result.rateType === 'retail' ? t('retail') : 'MSP'})</h3>
                            <span className={styles.location}>{t('market_mandi')}: {result.market}, {result.district}, {result.state}</span>
                            {result.msp && <span className={styles.location} style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.85rem' }}>{t('msp')}: ₹{result.msp}/quintal</span>}
                        </div>
                    </div>

                    <div className={styles.priceGrid}>
                        <div className={styles.priceItem}>
                            <span className={styles.label}>{t('current_price')}</span>
                            <span className={styles.value}>₹{result.currentPrice}</span>
                        </div>
                        <div className={styles.priceItem}>
                            <span className={styles.label}>{t('next_week_price')}</span>
                            <span className={styles.value}>₹{result.nextWeekPrice}</span>
                        </div>
                        {selectedDate && (
                            <div className={`${styles.priceItem} ${styles.highlight}`}>
                                <span className={styles.label}>{result.dateLabel}</span>
                                <span className={styles.value} style={{ fontSize: '2.25rem', color: '#059669' }}>₹{result.priceForDate}</span>
                                <div style={{ marginTop: '5px', fontSize: '0.75rem', color: '#059669', fontWeight: 'bold' }}>SELECTED DATE PRICE</div>
                            </div>
                        )}
                    </div>

                    <div className={styles.recommendation}>
                        <div className={styles.recIcon}>
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h4>{result.changePercent > 3 ? t('strong_hold_signal') : result.changePercent > 0 ? t('hold_signal') : t('sell_signal')}</h4>
                            <p>
                                {result.changePercent > 3
                                    ? `Prices are expected to rise by ${result.changePercent}%. Consider holding stock for better returns.`
                                    : result.changePercent > 0
                                        ? `Moderate price increase expected. Monitor market conditions.`
                                        : `Prices may decline. Consider selling current stock.`}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceForecasting;
