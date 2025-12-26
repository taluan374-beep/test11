// ===== Countdown Timer =====
function updateCountdown() {
    const countdown = document.getElementById('countdown');
    if (!countdown) return;
    
    // Set end date to end of current month
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const diff = endOfMonth - now;
    
    if (diff <= 0) {
        countdown.textContent = 'Hết hạn!';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Showcase Items Interaction =====
const showcaseItems = document.querySelectorAll('.showcase-item');

showcaseItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        showcaseItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// ===== Popup Modal Functionality =====
const popupOverlay = document.getElementById('popupOverlay');
const popupContent = document.getElementById('popupContent');
const popupClose = document.getElementById('popupClose');

// Open popup when clicking showcase items
showcaseItems.forEach(item => {
    item.addEventListener('click', () => {
        const popupId = item.getAttribute('data-popup');
        if (popupId) {
            openPopup(popupId);
        }
    });
});

function openPopup(popupId) {
    const template = document.getElementById(`popup-${popupId}`);
    if (template) {
        // Clone the template content
        const content = template.content.cloneNode(true);
        
        // Clear previous content and add new
        popupContent.innerHTML = '';
        popupContent.appendChild(content);
        
        // Show the overlay
        popupOverlay.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Animate metric bars if present
        setTimeout(() => {
            const metricFills = popupContent.querySelectorAll('.metric-fill');
            metricFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        }, 300);
    }
}

function closePopup() {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close popup when clicking close button
popupClose.addEventListener('click', closePopup);

// Close popup when clicking outside the modal
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        closePopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
        closePopup();
    }
});

// ===== Form Submission =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Show success message (in real application, you would send this to a server)
    alert('🎉 Cảm ơn bạn đã gửi yêu cầu!\n\nChúng tôi sẽ liên hệ lại trong vòng 2 giờ làm việc.');
    
    // Reset form
    contactForm.reset();
    
    // Log data for demo purposes
    console.log('Form submitted:', data);
});

// ===== Smooth Scroll for CTA buttons =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.pain-card, .process-step, .pricing-card, .portfolio-item, .testimonial-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Counter Animation for Stats =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasDash = text.includes('-');
        
        let finalValue;
        if (hasDash) {
            // Handle range like "3-5"
            return; // Skip animation for ranges
        } else {
            finalValue = parseInt(text.replace(/[^0-9]/g, ''));
        }
        
        let current = 0;
        const increment = finalValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(counter);
            }
            
            let displayValue = Math.floor(current);
            if (hasPlus) displayValue += '+';
            if (hasPercent) displayValue += '%';
            
            stat.textContent = displayValue;
        }, stepTime);
    });
}

// ===== Pricing Card Hover Effect =====
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        pricingCards.forEach(c => {
            if (!c.classList.contains('featured')) {
                c.style.transform = 'scale(0.98)';
            }
        });
        if (!card.classList.contains('featured')) {
            card.style.transform = 'scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        pricingCards.forEach(c => {
            if (!c.classList.contains('featured')) {
                c.style.transform = 'scale(1)';
            }
        });
    });
});

// ===== Dynamic Year in Footer =====
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < 600) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.002);
    }
});

// ===== Floating CTA Show/Hide =====
const floatingCta = document.querySelector('.floating-cta');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        floatingCta.style.opacity = '1';
        floatingCta.style.pointerEvents = 'auto';
    } else {
        floatingCta.style.opacity = '0';
        floatingCta.style.pointerEvents = 'none';
    }
});

// Initial state
floatingCta.style.opacity = '0';
floatingCta.style.pointerEvents = 'none';
floatingCta.style.transition = 'opacity 0.3s ease';

// ===== Browser Mockup Animation =====
const mockupBrowser = document.querySelector('.mockup-browser');

if (mockupBrowser) {
    setInterval(() => {
        const mockCards = document.querySelectorAll('.mock-card');
        mockCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.background = `linear-gradient(135deg, #667eea ${Math.random() * 50}%, #764ba2 100%)`;
                setTimeout(() => {
                    card.style.background = '#f3f4f6';
                }, 500);
            }, index * 200);
        });
    }, 4000);
}

// ===== Typing Effect for Hero Title (Optional Enhancement) =====
// Uncomment if you want a typing effect
/*
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 500);
}
*/

// ===== Console Easter Egg =====
console.log('%c🚀 LandingPro', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cThiết kế Landing Page chuyên nghiệp, tối ưu chi phí!', 'font-size: 14px; color: #666;');
console.log('%cLiên hệ: hello@landingpro.vn', 'font-size: 12px; color: #999;');
