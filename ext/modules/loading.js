export const showLoading = (el) => {
    const loadingContainer = document.createElement("div");
    loadingContainer.className = "load-container";
    
    const loadingSpinner = document.createElement("div");
    loadingSpinner.className = "load";
    
    loadingContainer.appendChild(loadingSpinner);
    
    el.appendChild(loadingContainer);
}

export const removeLoading = (el) => {
    const loadingContainer = el.querySelector(".load-container");
    if (loadingContainer) {
      el.removeChild(loadingContainer);
    }
};