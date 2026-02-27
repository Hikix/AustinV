window.onload = () => {
    // 1. Initialize the typing effect
    if (document.getElementById("typed")) {
        new Typed('#typed', {
            strings: [
                'Problem-Solver', 
                'Visionary', 
                'Robotics Engineer', 
                'Creative Builder', 
                'Systems Designer'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // 2. High-Performance Slideshow Logic
    const track = document.getElementById("image-track");
    const images = track.getElementsByClassName("image");
    if (!track) return;

    // Track internal states
    let percentage = 0;
    let mouseDownAt = 0;
    let prevPercentage = 0;
    let isPaused = false;
    const scrollSpeed = 0.05; // Adjust for speed; lower is smoother

    const updatePosition = (nextPercentage) => {
        // Seamless Infinite Reset logic
        if (nextPercentage <= -100) nextPercentage = 0;
        if (nextPercentage > 0) nextPercentage = -100;

        percentage = nextPercentage;
        track.dataset.percentage = nextPercentage;

        // Direct style updates are faster than .animate() for constant loops
        track.style.transform = `translate(${nextPercentage}%, -50%)`;
        
        for(const image of images) {
            image.style.objectPosition = `${100 + nextPercentage}% center`;
        }
    }

    // This is the "Engine" - it runs at 60fps synced with your monitor
    const animate = () => {
        if (!isPaused) {
            updatePosition(percentage - scrollSpeed);
        }
        requestAnimationFrame(animate);
    }

    // Interaction Handlers
    window.onmousedown = e => {
        mouseDownAt = e.clientX;
        isPaused = true; 
    }

    window.onmousemove = e => {
        if (mouseDownAt === 0) return;

        const mouseDelta = mouseDownAt - e.clientX,
              maxDelta = window.innerWidth / 2;

        const deltaPercentage = (mouseDelta / maxDelta) * -100,
              nextPercentage = prevPercentage + deltaPercentage;

        updatePosition(nextPercentage);
    }

    window.onmouseup = () => {
        mouseDownAt = 0;
        prevPercentage = percentage;
        isPaused = false; 
    }

    // Touch support for mobile devices
    window.ontouchstart = e => window.onmousedown(e.touches[0]);
    window.ontouchend = e => window.onmouseup();
    window.ontouchmove = e => window.onmousemove(e.touches[0]);
    window.onmouseleave = () => window.onmouseup();

    // Kick off the motor
    requestAnimationFrame(animate);
};