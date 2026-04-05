document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to cards
    document.querySelectorAll('.glass-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        card.classList.add('reveal-item');
        revealOnScroll.observe(card);
    });

    // Button hover effects (parallax-like tilt)
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .cta-button');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = btn;
            const x = (e.pageX - offsetLeft - offsetWidth / 2) / 10;
            const y = (e.pageY - offsetTop - offsetHeight / 2) / 10;
            btn.style.transform = `translateY(-3px) rotateX(${y}deg) rotateY(${x}deg)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });

    // Dynamic blob movement
    const blob = document.querySelector('.blob');
    if (blob) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // Console greeting
    console.log("%c🚀 Blushhh | Developed by @ayushkumartht", "color: #6c63ff; font-weight: bold; font-size: 1.2rem;");
    console.log("Welcome to the cosmic modern open-source boilerplate.");
});

// Add these styles dynamically for reveal effect
const style = document.createElement('style');
style.textContent = `
    .reveal-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .reveal-item.reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
