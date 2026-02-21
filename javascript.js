
// Initialize the typing effect
document.addEventListener('DOMContentLoaded', () => {
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
    backDelay: 2000, // How long it stays on the screen before backspacing
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
});

// ... Keep all your existing slideshow and scroll logic below this ...
const track = document.getElementById("image-track");
let autoScrollInterval;
const scrollSpeed = 0.05; // Adjust this number to change speed (smaller = slower)

const handleOnDown = e => {
    track.dataset.mouseDownAt = e.clientX;
    pauseAutoScroll(); // Stop moving when user clicks
}

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";  
    track.dataset.prevPercentage = track.dataset.percentage || "0";
    startAutoScroll(); // Resume moving when user lets go
}

const updateSlider = (nextPercentage) => {
    track.dataset.percentage = nextPercentage;
    
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });
    
    for(const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
    updateSlider(nextPercentage);
}

// Automatic Scroll Logic
const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
        let currentPercentage = parseFloat(track.dataset.percentage) || 0;
        let nextPercentage = currentPercentage - scrollSpeed;

        // Reset to 0 if it reaches the end (-100) for a loop effect
        if (nextPercentage <= -100) nextPercentage = 0;

        track.dataset.percentage = nextPercentage;
        track.dataset.prevPercentage = nextPercentage;
        updateSlider(nextPercentage);
    }, 16); // ~60 frames per second
}

const pauseAutoScroll = () => {
    clearInterval(autoScrollInterval);
}

// Global listeners
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp();
window.ontouchend = e => handleOnUp();
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);
window.onmouseleave = () => handleOnUp();

// Initialize
startAutoScroll();