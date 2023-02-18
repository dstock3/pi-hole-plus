import { toggleIndicators } from './indicators.js';

export const addMinHandler = () => {
    const handleMinimizeClick = () => {
        toggleIndicators();
        const minimize = document.querySelector('.minimize');
        minimize.textContent = minimize.textContent === '-' ? '+' : '-';
    };
    
    const minimize = document.querySelector('.minimize');
    minimize.addEventListener('click', handleMinimizeClick);
};

