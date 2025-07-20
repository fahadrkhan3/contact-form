document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const formStatus = document.getElementById('formStatus');

    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        clearErrors(); 
        hideFormStatus(); 

        let isValid = true;

       
        if (fullName.value.trim() === '') {
            displayError(fullName, fullNameError, 'Full Name is required.');
            isValid = false;
        }

        if (email.value.trim() === '') {
            displayError(email, emailError, 'Email Address is required.');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            displayError(email, emailError, 'Please enter a valid email address.');
            isValid = false;
        }

        if (subject.value.trim() === '') {
            displayError(subject, subjectError, 'Subject is required.');
            isValid = false;
        }

        if (message.value.trim() === '') {
            displayError(message, messageError, 'Message is required.');
            isValid = false;
        }
       

        if (isValid) {
           
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            loadingSpinner.style.display = 'inline-block';
            submitBtn.appendChild(loadingSpinner); 

            
            setTimeout(() => {
                

                const success = Math.random() > 0.3; 

                
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                loadingSpinner.style.display = 'none';

                if (success) {
                    displayFormStatus('Your message has been sent successfully! We will get back to you soon.', 'success');
                    contactForm.reset(); 
                    clearInputStyles(); 
                } else {
                    displayFormStatus('Failed to send message. Please try again later.', 'error-submit');
                }
            }, 2000); 
        }
    });

    
    clearBtn.addEventListener('click', function() {
        contactForm.reset();
        clearErrors(); 
        clearInputStyles(); 
        hideFormStatus(); 
    });


    
    function displayError(inputElement, errorElement, message) {
        inputElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(function(el) {
            el.textContent = '';
            el.style.display = 'none';
        });
        
    }

    
    function clearInputStyles() {
        const inputElements = document.querySelectorAll('input.error, textarea.error');
        inputElements.forEach(function(el) {
            el.classList.remove('error');
        });
    }

    
    function displayFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type; 
        formStatus.style.display = 'block'; 
        setTimeout(() => {
            formStatus.style.opacity = '1'; 
        }, 10); 
    }

    
    function hideFormStatus() {
        formStatus.style.opacity = '0';
        setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.className = 'form-status'; 
            formStatus.textContent = '';
        }, 500); 
    }

    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});