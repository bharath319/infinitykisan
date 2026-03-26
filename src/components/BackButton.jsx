import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../services/i18n';

const BackButton = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <button
            onClick={() => navigate('/')}
            className="btn btn-outline"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '1.5rem',
                padding: '10px 20px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                border: 'none',
                background: 'transparent',
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                cursor: 'pointer'
            }}
        >
            <ArrowLeft size={24} /> {t('back_to_dashboard')}
        </button>
    );
};

export default BackButton;
