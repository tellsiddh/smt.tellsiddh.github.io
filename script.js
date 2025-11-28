// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links (only for same-page links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const enquiryForm = document.querySelector('.enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company') || 'Not specified';
            const designation = formData.get('designation') || 'Not specified';
            const phone = formData.get('phone') || 'Not provided';
            const location = formData.get('location') || 'Not specified';
            const subject = formData.get('subject');
            const productSpecs = formData.get('product-specs') || 'Not specified';
            const enquiry = formData.get('enquiry');
            const urgent = formData.get('urgent') ? 'YES' : 'NO';
            
            // Create mailto link with detailed information
            const mailtoLink = `mailto:samirmetal@vsnl.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `ENQUIRY DETAILS\n` +
                `================\n\n` +
                `Contact Information:\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Company: ${company}\n` +
                `Designation: ${designation}\n` +
                `Phone: ${phone}\n` +
                `Location: ${location}\n\n` +
                `Enquiry Type: ${subject}\n` +
                `Urgent Requirement: ${urgent}\n\n` +
                `Product Specifications:\n${productSpecs}\n\n` +
                `Detailed Requirements:\n${enquiry}\n\n` +
                `---\nThis enquiry was sent through the Samir Metal & Tubes website contact form.`
            )}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for your enquiry! Your email client will open to send the message. We will respond within 24 hours.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '#fff';
                navbar.style.backdropFilter = 'none';
            }
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections (only if they exist)
    document.querySelectorAll('section').forEach(section => {
        // Skip hero and page-header sections from animation
        if (!section.classList.contains('hero') && !section.classList.contains('page-header')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        }
    });
    
    // Observe cards and product items
    const cardSelectors = ['.product-card', '.category-card', '.feature-item', '.operation-card', '.industry-item', '.choose-item', '.contact-method', '.faq-item', '.office-card'];
    
    cardSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    });

    // Timeline animation for about page
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });

    // Stats counter animation for homepage
    const statsCounters = document.querySelectorAll('.stat-item h3');
    const countUpObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                // Check if it contains numbers (either regular numbers or "24/7" format)
                if (/\d/.test(text)) {
                    animateCounter(target);
                    countUpObserver.unobserve(target);
                }
            }
        });
    });

    statsCounters.forEach(counter => {
        countUpObserver.observe(counter);
    });

    function animateCounter(element, target) {
        const originalText = element.textContent;
        
        // Special handling for "24/7" format
        if (originalText.includes('/')) {
            const parts = originalText.split('/');
            const firstNum = parseInt(parts[0]);
            const secondNum = parseInt(parts[1]);
            
            if (!isNaN(firstNum) && !isNaN(secondNum)) {
                let current1 = 0;
                let current2 = 0;
                const increment1 = firstNum / 30;
                const increment2 = secondNum / 30;
                
                const timer = setInterval(() => {
                    current1 += increment1;
                    current2 += increment2;
                    
                    if (current1 >= firstNum && current2 >= secondNum) {
                        element.textContent = `${firstNum}/${secondNum}`;
                        clearInterval(timer);
                    } else {
                        element.textContent = `${Math.ceil(current1)}/${Math.ceil(current2)}`;
                    }
                }, 40);
                return;
            }
        }
        
        // Regular number handling
        const suffix = originalText.replace(/[\d]/g, '');
        const numberOnly = originalText.replace(/\D/g, '');
        
        if (numberOnly) {
            let current = 0;
            const targetNum = parseInt(numberOnly);
            const increment = targetNum / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNum) {
                    element.textContent = targetNum + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.ceil(current) + suffix;
                }
            }, 40);
        }
    }

    // Product category expansion (for products page)
    document.querySelectorAll('.product-category').forEach(category => {
        const header = category.querySelector('.category-header');
        if (header) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                const details = category.querySelector('.category-details');
                if (details) {
                    details.classList.toggle('expanded');
                    // Add smooth height transition
                    if (details.style.maxHeight) {
                        details.style.maxHeight = null;
                    } else {
                        details.style.maxHeight = details.scrollHeight + "px";
                    }
                }
            });
        }
    });
});