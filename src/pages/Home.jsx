import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Activity, TrendingUp, DollarSign, Calendar, MessageSquare, MapPin, CloudSun, ChevronRight } from 'lucide-react';
import styles from '../styles/Home.module.css';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../services/i18n';
import MapPicker from '../components/MapPicker';

const Home = () => {
    const { location, updateLocation } = useLocation();
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation();
    const [isMapOpen, setIsMapOpen] = useState(false);

    const features = [
        {
            title: t('crop_recommendation'),
            desc: t('crop_recommendation_desc'),
            icon: <Sprout size={32} />,
            color: "emerald",
            link: "/recommend"
        },
        {
            title: t('disease_detection'),
            desc: t('disease_detection_desc'),
            icon: <Activity size={32} />,
            color: "red",
            link: "/disease"
        },
        {
            title: t('yield_profit'),
            desc: t('yield_profit_desc'),
            icon: <DollarSign size={32} />,
            color: "yellow",
            link: "/yield"
        },
        {
            title: t('price_forecasting'),
            desc: t('price_forecasting_desc'),
            icon: <TrendingUp size={32} />,
            color: "blue",
            link: "/forecast"
        },
        {
            title: t('crop_planner'),
            desc: t('crop_planner_desc'),
            icon: <Calendar size={32} />,
            color: "purple",
            link: "/planner"
        },
        {
            title: t('ai_assistant'),
            desc: t('ai_assistant_desc'),
            icon: <MessageSquare size={32} />,
            color: "teal",
            link: "/chat"
        }
    ];

    const handleLocationSelect = (pos) => {
        updateLocation(pos.lat, pos.lng);
        setIsMapOpen(false);
    };

    return (
        <div className={styles.homeContainer}>
            {isMapOpen && (
                <MapPicker
                    onLocationSelect={handleLocationSelect}
                    onClose={() => setIsMapOpen(false)}
                />
            )}
            <header className={styles.hero}>
                <div className="container">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className={styles.title}>{t('welcome')}</h1>
                            <p className={styles.subtitle}>{t('subtitle')}</p>
                        </div>
                    </div>

                    <div className={styles.weatherCard}>
                        <div className={styles.weatherMain}>
                            <div className={styles.location} onClick={() => setIsMapOpen(true)} style={{ cursor: 'pointer' }}>
                                <MapPin size={16} /> {location.name}
                            </div>
                            <div className={styles.temp}>
                                <CloudSun size={24} className="text-yellow-400" />
                                <span>28°C</span>
                            </div>
                        </div>
                        <div className={styles.date}>
                            {new Date().toLocaleDateString(language === 'en' ? 'en-IN' : language, { weekday: 'long', day: 'numeric', month: 'short' })}
                        </div>
                    </div>
                </div>
            </header>

            <section className="container pb-20">
                <h2 className={styles.sectionTitle}>{t('our_services')}</h2>
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <Link to={feature.link} key={index} className={styles.featureCard}>
                            <div className={`${styles.iconWrapper} ${styles[feature.color]}`}>
                                {feature.icon}
                            </div>
                            <div className="flex flex-col flex-1">
                                <h3 className={styles.cardTitle}>{feature.title}</h3>
                                <p className={styles.cardDesc}>{feature.desc}</p>
                            </div>
                            <ChevronRight size={20} className="text-stone-300 group-hover:text-stone-500 transition-all ml-auto" />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
