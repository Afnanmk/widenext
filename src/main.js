import './style.css'


// ****************************** SERVICES SECTION ********************************* //
// Get all service items
const serviceItems = document.querySelectorAll('.service-item');

// Set the first item as active by default
if (serviceItems.length > 0) {
    serviceItems[0].classList.add('active');
}

// Add click event listener to each service item
serviceItems.forEach(item => {
    // Listen for clicks on the title only
    const title = item.querySelector('.service-title');
    
    title.addEventListener('click', function() {
        const parentItem = this.closest('.service-item');
        
        // Don't do anything if clicking the already active item
        if (parentItem.classList.contains('active')) {
            return;
        }
        
        // Remove active class from all items
        serviceItems.forEach(service => {
            service.classList.remove('active');
        });
        
        // Add active class to clicked item
        parentItem.classList.add('active');
    });
});

// Optional: Keyboard navigation
document.addEventListener('keydown', function(e) {
    const activeItem = document.querySelector('.service-item.active');
    const activeIndex = Array.from(serviceItems).indexOf(activeItem);
    
    if (e.key === 'ArrowRight' && activeIndex < serviceItems.length - 1) {
        serviceItems[activeIndex + 1].querySelector('.service-title').click();
    } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        serviceItems[activeIndex - 1].querySelector('.service-title').click();
    }
});




 // ****************************** VIDEO SECTION ANIMATION ********************************* //
  // Video scroll animation - only once
const videoContainer = document.getElementById('videoContainer');
const videoSection = document.querySelector('.video-section');
let videoHasAnimated = false; // Track if animation has played
let maxScaleReached = 0.7; // Track the maximum scale reached

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.3, 0.5, 0.7, 1]
};

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !videoHasAnimated) {
      const scrollProgress = entry.intersectionRatio;
      
      // Calculate scale: from 0.7 to 1 based on scroll progress
      const scale = 0.7 + (scrollProgress * 0.3);
      
      // Only increase scale, never decrease
      if (scale > maxScaleReached) {
        maxScaleReached = scale;
        videoContainer.style.transform = `scale(${Math.min(scale, 1)})`;
      }
      
      // When fully in view, expand to full width and stop observing
      if (scrollProgress > 0.5) {
        videoContainer.classList.add('video-expanded');
        videoContainer.style.transform = 'scale(1)';
        videoHasAnimated = true;
        observer.unobserve(videoSection);
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(videoSection);



  // ****************************** ABOUT SECTION ANIMATION ********************************* //
  // About section video animation - only once
const aboutVideo = document.getElementById('aboutVideo');
const aboutSection = document.querySelector('.about');
let hasAnimated = false; // Track if animation has played

const aboutObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const aboutObserverCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
      // Animate video sliding down from top
      aboutVideo.style.transform = 'translateY(0)';
      aboutVideo.style.opacity = '1';
      
      // Mark as animated and stop observing
      hasAnimated = true;
      aboutObserver.unobserve(aboutSection);
    }
  });
};

const aboutObserver = new IntersectionObserver(aboutObserverCallback, aboutObserverOptions);
aboutObserver.observe(aboutSection);