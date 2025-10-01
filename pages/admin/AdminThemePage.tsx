import React, { useState, useEffect } from 'react';
import { useData } from '../../DataContext';
import { ThemeData, ButtonTheme } from '../../types';

interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 flex items-center gap-2">
            <input 
                type="color" 
                value={color} 
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-10 p-0 border-0 rounded-md cursor-pointer"
            />
            <input 
                type="text"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
            />
        </div>
    </div>
);

interface ButtonPreviewProps {
    theme: ButtonTheme;
    text: string;
}

const ButtonPreview: React.FC<ButtonPreviewProps> = ({ theme, text }) => {
    const [isHovered, setIsHovered] = useState(false);
    const style: React.CSSProperties = {
        backgroundColor: isHovered ? theme.hoverBg : theme.bg,
        color: isHovered ? theme.hoverText : theme.text,
        borderColor: isHovered ? theme.hoverBorder : theme.border,
        borderWidth: '1px',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.375rem',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
    };

    return (
        <button 
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {text}
        </button>
    );
};

interface ButtonThemeEditorProps {
    title: string;
    theme: ButtonTheme;
    onChange: (newTheme: ButtonTheme) => void;
}

const ButtonThemeEditor: React.FC<ButtonThemeEditorProps> = ({ title, theme, onChange }) => {
    const handleColorChange = (key: keyof ButtonTheme, value: string) => {
        onChange({ ...theme, [key]: value });
    };

    return (
        <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-medium text-gray-900 px-2">{title}</legend>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                {/* Regular State */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">État normal</h4>
                    <ColorPicker label="Couleur de fond" color={theme.bg} onChange={(c) => handleColorChange('bg', c)} />
                    <ColorPicker label="Couleur du texte" color={theme.text} onChange={(c) => handleColorChange('text', c)} />
                    <ColorPicker label="Couleur de la bordure" color={theme.border} onChange={(c) => handleColorChange('border', c)} />
                </div>
                {/* Hover State */}
                 <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">Au survol (Hover)</h4>
                    <ColorPicker label="Couleur de fond" color={theme.hoverBg} onChange={(c) => handleColorChange('hoverBg', c)} />
                    <ColorPicker label="Couleur du texte" color={theme.hoverText} onChange={(c) => handleColorChange('hoverText', c)} />
                    <ColorPicker label="Couleur de la bordure" color={theme.hoverBorder} onChange={(c) => handleColorChange('hoverBorder', c)} />
                </div>
            </div>
            <div className="mt-6 border-t pt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Aperçu</h4>
                <ButtonPreview theme={theme} text="Bouton d'exemple" />
            </div>
        </fieldset>
    );
}

const AdminThemePage: React.FC = () => {
    const { themeData, updateThemeData } = useData();
    const [formData, setFormData] = useState<ThemeData | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (themeData) {
            setFormData(themeData);
        }
    }, [themeData]);

    if (!formData) {
        return <div>Chargement du thème...</div>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(formData) {
            updateThemeData(formData);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        }
    };
    
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                    Gestion du Thème
                </h1>
                <p className="text-gray-600 mt-1">
                    Personnalisez les couleurs des boutons de votre site.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <ButtonThemeEditor 
                    title="Boutons Principaux"
                    theme={formData.primaryButton}
                    onChange={(newTheme) => setFormData(prev => prev ? ({ ...prev, primaryButton: newTheme }) : null)}
                />
                <ButtonThemeEditor 
                    title="Boutons Secondaires"
                    theme={formData.secondaryButton}
                    onChange={(newTheme) => setFormData(prev => prev ? ({ ...prev, secondaryButton: newTheme }) : null)}
                />
                
                <div className="flex justify-end items-center pt-6 border-t">
                    {isSaved && <span className="text-green-600 mr-4 text-sm font-medium">Thème enregistré !</span>}
                    <button type="submit" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
                        Enregistrer le Thème
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminThemePage;