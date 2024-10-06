// Scroll-triggered animations that repeat when sections come into view
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.about, .projects, .contact');

    // Sticky navbar
    navbar.classList.toggle('sticky', window.scrollY > 0);

    // Function to handle scroll animations for multiple sections
    const handleScrollAnimations = () => {
        sections.forEach((section) => {
            const triggerBottom = window.innerHeight * 0.85;
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            
            if (sectionTop < triggerBottom && sectionBottom > 0) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');  // This removes the animation when the section is out of view
            }
        });
    };

    handleScrollAnimations();
});

// Function to handle carousel scrolling
let scrollAmount = 0;
const scrollStep = 300;  // Adjust this value for more or less scroll per click

function scrollCarousel(direction) {
    const carousel = document.querySelector('.project-grid');
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    scrollAmount += direction * scrollStep;
    if (scrollAmount < 0) {
        scrollAmount = 0;  // Prevent scrolling too far left
    } else if (scrollAmount > maxScroll) {
        scrollAmount = maxScroll;  // Prevent scrolling too far right
    }
    
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
}
