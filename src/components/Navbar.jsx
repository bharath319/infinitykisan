import React, { useState } from 'react';
import { Leaf, Globe } from 'lucide-react';
import styles from '../styles/Navbar.module.css';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
        { code: 'te', name: 'Telugu', native: 'తెలుగు' },
        { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
        { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
        { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
        { code: 'mr', name: 'Marathi', native: 'मराठी' },
        { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
        { code: 'bn', name: 'Bengali', native: 'বাংলা' },
        { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
        { code: 'ur', name: 'Urdu', native: 'اردو' },
        { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' }
    ];

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContent}`}>
                <div className={styles.brand}>
                    <div className={styles.logoIcon}>
                        <Leaf size={24} color="white" />
                    </div>
                    <span className={styles.brandName}>Infinity Kisan</span>
                </div>

                <div className={styles.actions}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 text-white font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/10"
                    >
                        <Globe size={18} />
                        <span>{languages.find(l => l.code === language)?.native}</span>
                    </button>

                    {isOpen && (
                        <div className={styles.dropdown}>
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        changeLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`${styles.dropdownItem} ${language === lang.code ? styles.active : ''}`}
                                >
                                    <span style={{ fontWeight: 700 }}>{lang.native}</span>
                                    <span style={{ fontSize: '10px', opacity: 0.6 }}>{lang.name.toUpperCase()}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
