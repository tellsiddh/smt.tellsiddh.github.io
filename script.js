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
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
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
    
    // Add scroll effect to navbar (throttled for performance)
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    if (window.scrollY > 50) {
                        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    } else {
                        navbar.style.background = '#fff';
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Animate elements on scroll (optimized)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    // Observe sections (only if they exist)
    document.querySelectorAll('section').forEach(section => {
        // Skip hero and page-header sections from animation
        if (!section.classList.contains('hero') && !section.classList.contains('page-header')) {
            section.classList.add('fade-in-element');
            observer.observe(section);
        }
    });
    
    // Observe cards and product items
    const cardSelectors = ['.product-card', '.category-card', '.feature-item', '.operation-card', '.industry-item', '.choose-item', '.contact-method', '.faq-item', '.office-card'];
    
    cardSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(card => {
            card.classList.add('fade-in-element');
            observer.observe(card);
        });
    });

    // Timeline animation for about page
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.classList.add('fade-in-element');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Stats counter animation for homepage
    const statsCounters = document.querySelectorAll('.stat-item h3, .stat-number, .stat-value, .cap-number');
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
    }, { threshold: 0.5 });

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
                const duration = 1500; // 1.5 seconds
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    current1 = Math.floor(progress * firstNum);
                    current2 = Math.floor(progress * secondNum);
                    
                    if (progress < 1) {
                        element.textContent = `${current1}/${current2}`;
                        requestAnimationFrame(updateCounter);
                    } else {
                        element.textContent = `${firstNum}/${secondNum}`;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                return;
            }
        }
        
        // Regular number handling
        const suffix = originalText.replace(/[\d]/g, '');
        const numberOnly = originalText.replace(/\D/g, '');
        
        if (numberOnly) {
            const targetNum = parseInt(numberOnly);
            const duration = 1500; // 1.5 seconds
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(progress * targetNum);
                
                if (progress < 1) {
                    element.textContent = current + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = targetNum + suffix;
                }
            }
            
            requestAnimationFrame(updateCounter);
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

// Image Modal Functions
function openModal(galleryItem) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    const img = galleryItem.querySelector('img');
    const info = galleryItem.querySelector('.gallery-info');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    
    if (info) {
        caption.innerHTML = `<h3>${info.querySelector('h3').textContent}</h3><p>${info.querySelector('p').textContent}</p>`;
    }
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Toggle Details for Modern Product Cards
function toggleDetails(button) {
    const card = button.closest('.modern-category-card');
    const content = card.querySelector('.expandable-content');
    const isExpanded = content.classList.contains('expanded');
    
    // Close all other cards first
    document.querySelectorAll('.expandable-content.expanded').forEach(item => {
        if (item !== content) {
            item.classList.remove('expanded');
            item.previousElementSibling.classList.remove('active');
        }
    });
    
    // Toggle current card
    if (isExpanded) {
        content.classList.remove('expanded');
        button.classList.remove('active');
    } else {
        content.classList.add('expanded');
        button.classList.add('active');
        
        // Smooth scroll to card
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}