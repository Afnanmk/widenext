import "./style.css";

// ****************************** LOADING SCREEN ********************************* //
const loader = document.getElementById("loader");
const mainContent = document.getElementById("mainContent");
const body = document.body;
const blueBlocks = document.querySelectorAll(".blue-block");

// Function to hide loader and show main content
function hideLoader() {
  // Trigger blue blocks animation
  blueBlocks.forEach(block => {
    block.classList.add("animate-out");
  });
  
  // Wait for all blocks to finish animating (1.2s animation + 1.2s max delay)
  setTimeout(() => {
    loader.classList.add("fade-out");
    
    setTimeout(() => {
      loader.style.display = "none";
      body.classList.remove("loading");
      mainContent.style.visibility = "visible";
    }, 500);
  }, 2400);
}

// Wait for page to fully load, then hide loader after 1 second
window.addEventListener("load", function () {
  setTimeout(hideLoader, 1000);
});






// ****************************** MOBILE MENU TOGGLE ********************************* //
const menuToggle = document.getElementById("menuToggle");
const navDrawer = document.getElementById("navDrawer");
const closeMenu = document.getElementById("closeMenu");

// Open drawer
menuToggle.addEventListener("click", () => {
  navDrawer.classList.remove("-translate-x-full");
  document.body.style.overflow = "hidden"; // Prevent scrolling
});

// Close drawer
closeMenu.addEventListener("click", () => {
  navDrawer.classList.add("-translate-x-full");
  document.body.style.overflow = ""; // Restore scrolling
});

// Close on link click
navDrawer.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navDrawer.classList.add("-translate-x-full");
    document.body.style.overflow = "";
  });
});




// ****************************** SERVICES SECTION ********************************* //
// Get all service items
const serviceItems = document.querySelectorAll(".service-item");

// Set the first item as active by default
if (serviceItems.length > 0) {
  serviceItems[0].classList.add("active");
}

// Add click event listener to each service item
serviceItems.forEach((item) => {
  // Listen for clicks on the title only
  const title = item.querySelector(".service-title");

  title.addEventListener("click", function () {
    const parentItem = this.closest(".service-item");

    // Don't do anything if clicking the already active item
    if (parentItem.classList.contains("active")) {
      return;
    }

    // Remove active class from all items
    serviceItems.forEach((service) => {
      service.classList.remove("active");
    });

    // Add active class to clicked item
    parentItem.classList.add("active");
  });
});

// Optional: Keyboard navigation
document.addEventListener("keydown", function (e) {
  const activeItem = document.querySelector(".service-item.active");
  const activeIndex = Array.from(serviceItems).indexOf(activeItem);

  if (e.key === "ArrowRight" && activeIndex < serviceItems.length - 1) {
    serviceItems[activeIndex + 1].querySelector(".service-title").click();
  } else if (e.key === "ArrowLeft" && activeIndex > 0) {
    serviceItems[activeIndex - 1].querySelector(".service-title").click();
  }
});



// ****************************** VIDEO SECTION ANIMATION ********************************* //
// Video scroll animation - only once
// const videoContainer = document.getElementById("videoContainer");
// const videoSection = document.querySelector(".video-section");
// let videoHasAnimated = false; // Track if animation has played
// let maxScaleReached = 0.7; // Track the maximum scale reached

// const observerOptions = {
//   root: null,
//   rootMargin: "0px",
//   threshold: [0, 0.3, 0.5, 0.7, 1],
// };

// const observerCallback = (entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting && !videoHasAnimated) {
//       const scrollProgress = entry.intersectionRatio;

//       // Calculate scale: from 0.7 to 1 based on scroll progress
//       const scale = 0.7 + scrollProgress * 0.3;

//       // Only increase scale, never decrease
//       if (scale > maxScaleReached) {
//         maxScaleReached = scale;
//         videoContainer.style.transform = `scale(${Math.min(scale, 1)})`;
//       }

//       // When fully in view, expand to full width and stop observing
//       if (scrollProgress > 0.5) {
//         videoContainer.classList.add("video-expanded");
//         videoContainer.style.transform = "scale(1)";
//         videoHasAnimated = true;
//         observer.unobserve(videoSection);
//       }
//     }
//   });
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(videoSection);





// ****************************** ABOUT SECTION ANIMATION ********************************* //
const aboutVideo = document.getElementById("aboutVideo");
const aboutSection = document.querySelector(".about");

const aboutObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

const aboutObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Animate video sliding down from top
      aboutVideo.style.transform = "translateY(0)";
      aboutVideo.style.opacity = "1";
    } else {
      // Reset animation when out of view
      aboutVideo.style.transform = "translateY(-100%)";
      aboutVideo.style.opacity = "0";
    }
  });
};

const aboutObserver = new IntersectionObserver(
  aboutObserverCallback,
  aboutObserverOptions
);
aboutObserver.observe(aboutSection);



// ****************************** PROJECT CARD ANIMATION ********************************* //
import "./work-scroll.js";


// const projectCardObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const cards = entry.target.querySelectorAll(".project-card");
//         const cardImgs = entry.target.querySelectorAll(".card-img");

//         // Card 1: height grows to 600px, THEN scales down and moves up
//         setTimeout(() => {
//           cardImgs[3].style.height = "600px";
//         }, 500);

//         setTimeout(() => {
//           cards[3].style.transform = "translateY(-120%) scale(0.7)";
//           cards[3].style.opacity = "0";
//         }, 2500);

//         // Card 2: height grows to 600px, THEN scales down and moves up
//         setTimeout(() => {
//           cardImgs[2].style.height = "600px";
//         }, 3000);

//         setTimeout(() => {
//           cards[2].style.transform = "translateY(-120%) scale(0.7)";
//           cards[2].style.opacity = "0";
//         }, 5000);

//         // Card 3: height grows to 600px, THEN scales down and moves up
//         setTimeout(() => {
//           cardImgs[1].style.height = "600px";
//         }, 5500);

//         setTimeout(() => {
//           cards[1].style.transform = "translateY(-120%) scale(0.7)";
//           cards[1].style.opacity = "0";
//         }, 7500);

//         // Card 4 grows to fill the space
//         setTimeout(() => {
//           cardImgs[0].style.height = "600px";
//         }, 8000);

//         // Unobserve after animation triggers once
//         projectCardObserver.unobserve(entry.target);
//       }
//     });
//   },
//   {
//     threshold: 0.3,
//   }
// );

// const worksSection = document.querySelector(".works");
// projectCardObserver.observe(worksSection);



// ****************************** TO TOP BUTTON ********************************* //
const toTopBtn = document.getElementById("toTopBtn");

toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});