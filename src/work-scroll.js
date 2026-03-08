import { scroll } from "motion";

window.addEventListener("load", () => {

  // ======================================================
  // WORKS / CARDS — scroll-linked pinned animation
  // ======================================================
  const section = document.querySelector(".works");
  if (!section) return;

  const SCROLL_DISTANCE = window.innerHeight * 3;

  const stickyWrap = document.createElement("div");
  stickyWrap.style.position = "relative";
  stickyWrap.style.height   = SCROLL_DISTANCE + section.offsetHeight + "px";
  section.parentNode.insertBefore(stickyWrap, section);
  stickyWrap.appendChild(section);
  section.style.position = "sticky";
  section.style.top      = "0";

  const cards    = Array.from(section.querySelectorAll(".project-card"));
  const cardImgs = Array.from(section.querySelectorAll(".card-img"));

  [...cards, ...cardImgs].forEach(el => {
    el.style.transition = "none";
    el.style.willChange = "transform, opacity, height";
  });

  const origH = cardImgs.map(img => img.getBoundingClientRect().height || img.offsetHeight);

  const exits = [
    { card: cards[3], img: cardImgs[3], h0: origH[3] },
    { card: cards[2], img: cardImgs[2], h0: origH[2] },
    { card: cards[1], img: cardImgs[1], h0: origH[1] },
  ];
  const lastImg = cardImgs[0];
  const lastH0  = origH[0];

  function lerp(a, b, t) {
    t = Math.max(0, Math.min(1, t));
    return a + (b - a) * t;
  }

  let worksComplete = false;

  scroll(
    (info) => {
      const p = typeof info === "number" ? info : info?.y?.progress ?? info?.progress ?? 0;

      // When works finishes, kick off video animation manually
      if (!worksComplete && p >= 0.99) {
        worksComplete = true;
        startVideoAnimation();
      }
      // If user scrolls back up, reset the flag
      if (worksComplete && p < 0.95) {
        worksComplete = false;
      }

      exits.forEach(({ card, img, h0 }, i) => {
        const segStart = i / 3;
        const segEnd   = (i + 1) / 3;

        if (p <= segStart) {
          img.style.height     = h0 + "px";
          card.style.transform = "translateY(0px) scale(1)";
          card.style.opacity   = "1";
          return;
        }

        if (p >= segEnd) {
          img.style.height     = "600px";
          card.style.transform = "translateY(-120%) scale(0.7)";
          card.style.opacity   = "0";
          return;
        }

        const local = (p - segStart) / (segEnd - segStart);

        if (local < 0.4) {
          const t = local / 0.4;
          img.style.height     = lerp(h0, 600, t) + "px";
          card.style.transform = "translateY(0px) scale(1)";
          card.style.opacity   = "1";
        } else {
          const t = (local - 0.4) / 0.6;
          img.style.height     = "600px";
          card.style.transform = `translateY(${lerp(0, -120, t)}%) scale(${lerp(1, 0.7, t)})`;
          card.style.opacity   = String(lerp(1, 0, t));
        }
      });

      if (p > 0.66) {
        lastImg.style.height = lerp(lastH0, 600, Math.min(1, (p - 0.66) / 0.34)) + "px";
      } else {
        lastImg.style.height = lastH0 + "px";
      }
    },
    { target: stickyWrap, offset: ["start start", "end end"] }
  );


  // ======================================================
  // VIDEO SECTION
  // ======================================================
  const videoContainer = document.getElementById("videoContainer");
  const videoSection   = document.querySelector(".video-section");
  if (!videoContainer || !videoSection) return;

  let videoHasAnimated = false;
  let maxScaleReached  = 0.7;

  // Set initial scale so it's ready to animate
  videoContainer.style.transform = "scale(0.7)";

  function startVideoAnimation() {
    if (videoHasAnimated) return;

    // Use window scroll to drive the video scale from here
    function onScroll() {
      if (videoHasAnimated) {
        window.removeEventListener("scroll", onScroll);
        return;
      }

      const rect = videoSection.getBoundingClientRect();
      const viewH = window.innerHeight;

      // How far the video section has entered the viewport (0 → 1)
      const ratio = Math.max(0, Math.min(1, (viewH - rect.top) / viewH));
      const scale = lerp(0.7, 1, ratio);

      if (scale > maxScaleReached) {
        maxScaleReached = scale;
        videoContainer.style.transform = `scale(${scale})`;
      }

      if (ratio >= 0.5) {
        videoContainer.classList.add("video-expanded");
        videoContainer.style.transform = "scale(1)";
        videoHasAnimated = true;
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll);
    // Fire once immediately in case video section is already in view
    onScroll();
  }

});