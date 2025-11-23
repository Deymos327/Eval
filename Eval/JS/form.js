document.addEventListener('DOMContentLoaded', function() 
{
    initFormSubmission();
    initInputValidation();
    initStarRating();
    initAutoResizeTextarea();
});

function initFormSubmission() {
    const form = document.querySelector('form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('input');
        const feedbackTextarea = document.getElementById('message');
        const ratingInput = document.getElementById('rating');
        
        const name = nameInput ? nameInput.value : '';
        const feedback = feedbackTextarea ? feedbackTextarea.value : '';
        const rating = ratingInput ? ratingInput.value : '';
        
        console.log('Отзыв отправлен:', { name, feedback, rating });
        
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
        } else {
            alert('Отзыв отправлен! Спасибо за ваше мнение.');
        }
        
        this.reset();
        
        if (window.ratingSystem) {
            window.ratingSystem.resetRating();
        }
        
        if (feedbackTextarea) {
            feedbackTextarea.style.height = '50px';
        }
        
        if (successMessage) {
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
}


function initInputValidation() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = this.checkValidity() ? '#2ecc71' : '#e74c3c';
            } else {
                this.style.borderColor = '#D27046'; 
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.value.length > 0) {
                this.style.borderColor = this.checkValidity() ? '#2ecc71' : '#e74c3c';
            }
        });
    });
}


function initStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    
    if (!ratingInput && stars.length > 0) {
        const form = document.querySelector('form');
        if (form) {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.id = 'rating';
            hiddenInput.name = 'rating';
            form.appendChild(hiddenInput);
        }
    }
    
    let currentRating = 0;

    stars.forEach((star, index) => {
        star.setAttribute('data-value', index + 1);
        
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            currentRating = value;
            
            const ratingField = document.getElementById('rating');
            if (ratingField) {
                ratingField.value = value;
            }
            
            updateStarsDisplay();
        });
        
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.getAttribute('data-value'));
            
            stars.forEach(s => {
                const sValue = parseInt(s.getAttribute('data-value'));
                if (sValue <= value) {
                    s.classList.add('hovered');
                } else {
                    s.classList.remove('hovered');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            stars.forEach(s => {
                s.classList.remove('hovered');
            });
            updateStarsDisplay();
        });
    });

    function updateStarsDisplay() {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'));
            
            if (value <= currentRating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    window.ratingSystem = {
        getCurrentRating: function() {
            return currentRating;
        },
        resetRating: function() {
            currentRating = 0;
            const ratingField = document.getElementById('rating');
            if (ratingField) {
                ratingField.value = '';
            }
            stars.forEach(star => {
                star.classList.remove('selected');
            });
        }
    };
}

function initAutoResizeTextarea() {
    const textarea = document.getElementById('message');
    if (!textarea) return;
    
    const minHeight = 50;
    
    textarea.style.height = minHeight + 'px';
    textarea.style.transition = 'height 0.3s ease-in-out';
    
    function autoResize(element) {
        const currentHeight = element.clientHeight;
        
        const originalTransition = element.style.transition;
        element.style.transition = 'none';
        
        element.style.height = 'auto';
        
        const newHeight = Math.max(element.scrollHeight, minHeight);
        
        element.style.transition = originalTransition;
        
        if (Math.abs(newHeight - currentHeight) > 1) {
            element.style.height = newHeight + 'px';
        }
    }
    
    textarea.addEventListener('input', function() {
        autoResize(this);
    });
    
    window.addEventListener('resize', function() {
        autoResize(textarea);
    });
    
    setTimeout(() => {
        autoResize(textarea);
    }, 100);
}


function initStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    let currentRating = 0;
    let isRatingSelected = false;

    stars.forEach((star, index) => {
        star.setAttribute('data-value', index + 1);
    });

    stars.forEach(star => {
        star.addEventListener('click', function(e) {
            e.preventDefault();
            const value = parseInt(this.getAttribute('data-value'));
            currentRating = value;
            isRatingSelected = true;
            ratingInput.value = value;
            
            updateStarsDisplay();
            console.log('Выбран рейтинг:', value);
        });
    });

    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            const value = parseInt(this.getAttribute('data-value'));
            highlightStars(value);
        });
    });

    stars.forEach(star => {
        star.addEventListener('mouseleave', function() {
            if (isRatingSelected) {
                updateStarsDisplay();
            } else {
                resetStarsHighlight();
            }
        });
    });

    function highlightStars(upToValue) {
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            if (starValue <= upToValue) {
                star.classList.add('hovered');
            } else {
                star.classList.remove('hovered');
            }
        });
    }

    function resetStarsHighlight() {
        stars.forEach(star => {
            star.classList.remove('hovered');
        });
    }

    function updateStarsDisplay() {
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            
            if (starValue <= currentRating) {
                star.classList.add('selected');
                star.classList.remove('hovered');
            } else {
                star.classList.remove('selected');
                star.classList.remove('hovered');
            }
        });
    }

    function resetRating() {
        currentRating = 0;
        isRatingSelected = false;
        ratingInput.value = '';
        resetStarsHighlight();
        stars.forEach(star => {
            star.classList.remove('selected');
        });
    }

    window.ratingSystem = {
        getCurrentRating: function() {
            return currentRating;
        },
        resetRating: resetRating
    };
}