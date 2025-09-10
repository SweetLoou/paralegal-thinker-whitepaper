// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const contentContainer = document.getElementById('content-container');
    const errorMessage = document.getElementById('error-message');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Check credentials
        if (username === 'admin' && password === 'admin') {
            // Successful login
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';

            // Add fade out animation to login
            loginContainer.style.opacity = '0';
            loginContainer.style.transform = 'scale(0.95)';

            setTimeout(() => {
                loginContainer.classList.add('hidden');
                contentContainer.classList.remove('hidden');

                // Add entrance animation to content
                setTimeout(() => {
                    contentContainer.style.opacity = '1';
                    contentContainer.style.transform = 'translateY(0)';

                    // Trigger scroll animations for sections
                    initScrollAnimations();
                }, 100);
            }, 300);

        } else {
            // Failed login
            errorMessage.textContent = 'Invalid credentials. Please try again.';
            errorMessage.style.display = 'block';

            // Add shake animation to form
            loginForm.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);

            // Clear password field
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    // Add shake animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // Initialize scroll animations
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.white-paper section');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Set initial state for content container
    contentContainer.style.opacity = '0';
    contentContainer.style.transform = 'translateY(20px)';
    contentContainer.style.transition = 'all 0.6s ease-out';

    // Focus on username input when page loads
    usernameInput.focus();

    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetSection = this.getAttribute('data-section');

            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');

            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');

                // Smooth scroll to top of content
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add enter key support for better UX
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !contentContainer.classList.contains('hidden')) {
            return; // Don't interfere with content navigation
        }
    });
});
