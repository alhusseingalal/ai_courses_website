// Main JavaScript for Portfolio Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typed.js
    if (document.querySelector('.typed')) {
        let typed = new Typed('.typed', {
            strings: ["AI Engineer", "Desktop Application Developer", "Web Developer", "Machine Learning Specialist"],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1000,
            loop: true
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Projects filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);

    // Update active nav link based on scroll position
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Skills progress animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-progress');
            bar.style.width = percentage;
        });
    }
    
    // Animate skills when skills section is in view
    const skillsSection = document.querySelector('#skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }

    // Form validation
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const message = document.querySelector('#message');
            
            if (!name.value.trim()) {
                valid = false;
                showError(name, 'Name is required');
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                valid = false;
                showError(email, 'Email is required');
            } else if (!isValidEmail(email.value)) {
                valid = false;
                showError(email, 'Please enter a valid email');
            } else {
                removeError(email);
            }
            
            if (!message.value.trim()) {
                valid = false;
                showError(message, 'Message is required');
            } else {
                removeError(message);
            }
            
            if (valid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'alert alert-success';
                    successMsg.textContent = 'Your message has been sent successfully!';
                    contactForm.prepend(successMsg);
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                }, 2000);
            }
        });
    }

    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-msg') || document.createElement('div');
        
        errorMsg.className = 'error-msg';
        errorMsg.textContent = message;
        
        if (!formGroup.querySelector('.error-msg')) {
            formGroup.appendChild(errorMsg);
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-msg');
        
        if (errorMsg) {
            formGroup.removeChild(errorMsg);
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Dark mode toggle
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    
    if (darkModeToggle) {
        // Check for saved theme preference or use preferred color scheme
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
