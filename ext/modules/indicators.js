import { displayError } from "./error.js";

export const toggleIndicators = () => {
    document.querySelectorAll('.ind').forEach((element, index) => {
        element.classList.toggle('hide');
        const margin = element.classList.contains('hide') ? '0' : (index < 2 ? '5px' : '');
        element.style.marginBottom = margin;
    });
};

export const updateIndicators = (summary) => {
    const num = new Intl.NumberFormat();
    if (('error' in summary) || (summary === undefined)) {
        toggleIndicators();
        displayError(summary.error);
    } else {
        const select = (id) => document.querySelector(`#${id}`);
    
        select('total-queries').textContent = num.format(summary.dns_queries_today);
        select('queries-blocked').textContent = num.format(summary.ads_blocked_today);
        select('per-blocked').textContent = `${Math.round(summary.ads_percentage_today)}%`;
        select('domains-blocked').textContent = num.format(summary.domains_being_blocked); 
    }
};

