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
const promoBanner = document.querySelector('.promo-banner');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll =====
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

// ===== Form Submission =====
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());
        
        // Show success message
        alert('🎉 Đặt lịch thành công!\n\nCảm ơn bạn đã đặt lịch tại Serene Spa.\nChúng tôi sẽ gọi xác nhận trong vòng 30 phút.');
        
        // Reset form
        bookingForm.reset();
        
        console.log('Booking submitted:', data);
    });
}

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

document.querySelectorAll('.service-card, .pricing-card, .review-card, .about-features li').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Floating Buttons Show/Hide =====
const floatingButtons = document.querySelector('.floating-buttons');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        floatingButtons.style.opacity = '1';
        floatingButtons.style.pointerEvents = 'auto';
    } else {
        floatingButtons.style.opacity = '0';
        floatingButtons.style.pointerEvents = 'none';
    }
});

// Initial state
floatingButtons.style.opacity = '0';
floatingButtons.style.pointerEvents = 'none';
floatingButtons.style.transition = 'opacity 0.3s ease';

// ===== Set minimum date for booking =====
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
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
            card.style.transform = 'translateY(-8px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        pricingCards.forEach(c => {
            if (!c.classList.contains('featured')) {
                c.style.transform = '';
            }
        });
    });
});

// ===== Dynamic Year =====
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// ===== Console Branding =====
console.log('%c🌿 Serene Spa', 'font-size: 24px; font-weight: bold; color: #8b7355;');
console.log('%cSpa cao cấp tại Sài Gòn', 'font-size: 14px; color: #888;');
