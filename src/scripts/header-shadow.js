// Script to add shadow to header on scroll
// DOMContentLoaded
// astro:page-load
document.addEventListener("astro:page-load", function () {
  const header = document.getElementById("site-header");

  // Only proceed if header exists
  if (!header) return;

  // Since we've checked header exists, we can safely use it
  const toggleHeaderShadow = () => {
    if (window.scrollY > 0) {
      header.classList.add("shadow-md");
    } else {
      header.classList.remove("shadow-md");
    }
  };

  // Check initial state
  toggleHeaderShadow();

  // Add scroll event listener
  window.addEventListener("scroll", toggleHeaderShadow);
});
