/**
 * Marcenaria Premium - Main JavaScript
 *
 * @package Marcenaria_Premium
 */

(function() {
    'use strict';

    // Multi-Step Form Handler
    const form = document.getElementById('marcenaria-form');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step:not(.form-success-step)');
    const successStep = form.querySelector('.form-success-step');
    const progressFill = document.getElementById('progress-fill');
    const progressValue = document.getElementById('progress-value');
    const currentStepEl = document.getElementById('current-step');
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');
    const formNav = document.getElementById('form-nav');

    let currentStep = 1;
    const totalSteps = steps.length;

    // Initialize
    updateProgress();
    validateCurrentStep();

    // Event Listeners
    btnNext.addEventListener('click', nextStep);
    btnBack.addEventListener('click', prevStep);
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('input', validateCurrentStep);
    form.addEventListener('change', validateCurrentStep);

    function nextStep() {
        if (currentStep < totalSteps) {
            steps[currentStep - 1].classList.remove('active');
            currentStep++;
            steps[currentStep - 1].classList.add('active');
            updateProgress();
            validateCurrentStep();
            scrollToForm();
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            steps[currentStep - 1].classList.remove('active');
            currentStep--;
            steps[currentStep - 1].classList.add('active');
            updateProgress();
            validateCurrentStep();
            scrollToForm();
        }
    }

    function updateProgress() {
        const progress = Math.round((currentStep / totalSteps) * 100);
        progressFill.style.width = progress + '%';
        progressValue.textContent = progress;
        currentStepEl.textContent = currentStep;

        // Show/hide back button
        btnBack.style.display = currentStep > 1 ? 'inline-flex' : 'none';

        // Show/hide next/submit buttons
        if (currentStep === totalSteps) {
            btnNext.style.display = 'none';
            btnSubmit.style.display = 'inline-flex';
        } else {
            btnNext.style.display = 'inline-flex';
            btnSubmit.style.display = 'none';
        }
    }

    function validateCurrentStep() {
        const currentStepEl = steps[currentStep - 1];
        const requiredInputs = currentStepEl.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (input.type === 'radio') {
                const name = input.name;
                const checked = currentStepEl.querySelector(`input[name="${name}"]:checked`);
                if (!checked) {
                    isValid = false;
                }
            } else if (!input.value.trim()) {
                isValid = false;
            }
        });

        btnNext.disabled = !isValid;
        btnSubmit.disabled = !isValid;
    }

    function scrollToForm() {
        const formSection = document.getElementById('aplicar');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `
            <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Enviando...
        `;

        const formData = new FormData(form);
        formData.append('action', 'marcenaria_form_submit');
        formData.append('nonce', marcenariaPremium.nonce);

        try {
            const response = await fetch(marcenariaPremium.ajaxUrl, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                showSuccess();
            } else {
                alert(result.data.message || 'Erro ao enviar. Tente novamente.');
                resetSubmitButton();
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Erro de conexão. Tente novamente.');
            resetSubmitButton();
        }
    }

    function showSuccess() {
        steps.forEach(step => step.style.display = 'none');
        successStep.style.display = 'block';
        formNav.style.display = 'none';
        
        // Hide progress bar
        document.querySelector('.progress-bar').style.display = 'none';
    }

    function resetSubmitButton() {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = `
            Enviar Aplicação para Análise
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
        `;
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation class on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .section-header');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                el.classList.add('animate-fade-up');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run on load

    // CSS for spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        .form-step {
            display: none;
        }
        .form-step.active {
            display: block;
        }
    `;
    document.head.appendChild(style);

})();
