const errorContainer = document.querySelector('.error-container');

const displayError = (error) => {
    errorContainer.textContent = error;
    errorContainer.style.display = 'block';
    errorContainer.classList.remove('hide');
};
  
const removeError = () => {
    errorContainer.textContent = '';
    errorContainer.style.display = 'none';
    errorContainer.classList.add('hide');
};

export { displayError, removeError }

