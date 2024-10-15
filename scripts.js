// scripts.js

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
                section.classList.remove('active');  // Removes animation when section is out of view
            }
        });
    };

    handleScrollAnimations();
});

// Lava lamp effect
const canvas = document.getElementById('lavaLampCanvas');
const ctx = canvas.getContext('2d');
let bubbles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 10 + 5; // Halved radius
        this.dx = Math.random() * 0.75 - 0.375; // Halved speed
        this.dy = Math.random() * 0.75 - 0.375; // Halved speed
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 209, 178, 0.3)';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx *= -1;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy *= -1;
        }
    }
}

function createBubbles() {
    bubbles = [];
    for (let i = 0; i < 30; i++) {
        bubbles.push(new Bubble());
    }
}

function animateBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
    });
    requestAnimationFrame(animateBubbles);
}

createBubbles();
animateBubbles();

// Interactive mouse-following bubbles
canvas.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    bubbles.forEach(bubble => {
        const dx = mouseX - bubble.x;
        const dy = mouseY - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            const force = 0.025; // Halved force for smoother interaction
            bubble.dx += dx * force;
            bubble.dy += dy * force;
        }
    });
});

// UFO movement functionality
const ufoElement = document.getElementById('ufo');
let mouseXPos = window.innerWidth / 2;
let mouseYPos = window.innerHeight / 2;
let ufoX = mouseXPos - 250; // Adjusted initial offset
let ufoY = mouseYPos - 250;

function animateUfo() {
    // Desired offset distance from the cursor
    const followOffset = 550; // Set to 450px as per user preference
    const repelThreshold = 300; // Set to 200px for repelling

    // Calculate the distance between UFO and mouse
    const dx = mouseXPos - ufoX;
    const dy = mouseYPos - ufoY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > followOffset) {
        // Follow behavior: Move towards the desired position at followOffset
        const dirX = dx / distance;
        const dirY = dy / distance;

        // Desired position at the offset distance
        const desiredX = mouseXPos - dirX * followOffset;
        const desiredY = mouseYPos - dirY * followOffset;

        // Smoothly move the UFO towards the desired position
        ufoX += (desiredX - ufoX) * 0.05; // Adjust the 0.05 for smoothing speed
        ufoY += (desiredY - ufoY) * 0.05;
    } else if (distance < repelThreshold) {
        // Repel behavior: Move away from the mouse
        const repelDistance = repelThreshold - distance; // How much to repel
        const repelFactor = 0.05; // Repelling strength

        // Calculate normalized direction vector for repulsion
        const repelDirX = -dx / distance;
        const repelDirY = -dy / distance;

        // Apply repulsion
        ufoX += repelDirX * repelDistance * repelFactor;
        ufoY += repelDirY * repelDistance * repelFactor;
    }
    // Between 200px and 450px: No action

    // Update the UFO's position
    ufoElement.style.left = `${ufoX}px`;
    ufoElement.style.top = `${ufoY}px`;

    requestAnimationFrame(animateUfo);
}

window.addEventListener('mousemove', (e) => {
    mouseXPos = e.clientX;
    mouseYPos = e.clientY;
});

// Start the UFO animation
animateUfo();

// Project details popup functionality
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', function() {
        const title = this.querySelector('.project-content h3').innerText;
        const description = this.querySelector('.project-content p').innerText;
        const imageSrc = this.querySelector('img').src;
        let role = 'Developer'; // Default role
        let link = '#'; // Default link
        let videoEmbedCode = ''; // Initialize video embed code

        // Get the project-details element
        const projectDetails = document.getElementById('project-details');

        // Remove any existing project-specific classes
        projectDetails.className = 'project-details';

        // Check which project is clicked and set specific details
        if (title === 'City Slickers') {
            role = 'Lead Developer & Designer';
            link = 'https://store.steampowered.com/app/123456/City_Slickers'; // Replace with actual link
            // Add a specific class to the project-details for City Slickers
            projectDetails.classList.add('city-slickers');
            // YouTube embed code
            videoEmbedCode = `
                <div class="video-wrapper">
                    <iframe src="https://www.youtube.com/embed/vhejg10rmlc?si=f_IwqTdUb9q2R1Lb" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            `;
        }
        // Add else if blocks for other projects if needed
        else {
            // Set role and link for other projects as needed
            role = 'Developer';
            link = '#';
            videoEmbedCode = ''; // No video for other projects
        }

        // Populate the project details
        document.getElementById('details-title').innerText = title;
        document.getElementById('details-description').innerText = description;
        document.getElementById('details-image').src = imageSrc;
        document.getElementById('details-role').innerText = role;
        document.getElementById('details-link').href = link;

        // Insert the video embed code
        document.getElementById('video-container').innerHTML = videoEmbedCode;

        // Show the popup
        document.querySelector('.overlay').style.display = 'block';
        projectDetails.style.display = 'block';

        // Prevent background scrolling
        document.body.classList.add('modal-open');

        // Add active class for CSS transitions
        setTimeout(() => {
            projectDetails.classList.add('active');
        }, 10);
    });
});

function closeProjectDetails() {
    const projectDetails = document.getElementById('project-details');
    projectDetails.classList.remove('active');

    // Allow background scrolling
    document.body.classList.remove('modal-open');

    // Wait for transition to end before hiding
    setTimeout(() => {
        projectDetails.style.display = 'none';
        document.querySelector('.overlay').style.display = 'none';
        // Clear the video container to stop the video
        document.getElementById('video-container').innerHTML = '';
        // Remove any project-specific classes
        projectDetails.className = 'project-details';
    }, 300);
}

document.getElementById('close-details').addEventListener('click', closeProjectDetails);
document.querySelector('.overlay').addEventListener('click', closeProjectDetails);

// Custom smooth scrolling function with adjustable duration and offset
function smoothScroll(target, duration, offset = 200) { // Increased offset to 200
    let targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime){
        if (startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            // Ensure we are exactly at the target position
            window.scrollTo(0, targetPosition);
        }
    }

    // Easing function for smoother scrolling
    function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Adjusted smooth scrolling for anchor links with slower speed, interpolation, and increased offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScroll(target, 1500, 200); // Duration in milliseconds (1500ms = 1.5s), offset by 200 pixels
        }
    });
});
