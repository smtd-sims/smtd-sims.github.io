//-------------------------------------------------------------
// Home button functionality for logo-container
//-------------------------------------------------------------
const logoContainer = document.querySelector(".logo-container");
if (logoContainer) {
  logoContainer.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  logoContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = "index.html";
    }
  });//-------------------------------------------------------------
// Home button functionality for logo-container
//-------------------------------------------------------------
const logoContainer = document.querySelector(".logo-container");
if (logoContainer) {
  logoContainer.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  logoContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = "index.html";
    }
  });
}

//-------------------------------------------------------------
// Burger menu toggle logic
//-------------------------------------------------------------
const burgerBtn = document.querySelector(".burger-btn");
const burgerIcon = document.querySelector(".burger-icon");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownBackdrop = document.getElementById("dropdownBackdrop");

function closeMenu() {
  if (burgerBtn) burgerBtn.setAttribute("aria-expanded", false);
  if (dropdownMenu) {
    dropdownMenu.setAttribute("aria-hidden", true);
    dropdownMenu.classList.remove("open");
  }
  if (burgerIcon) burgerIcon.classList.remove("open");
  if (dropdownBackdrop) dropdownBackdrop.classList.remove("open");
}

if (burgerBtn) {
  burgerBtn.addEventListener("click", () => {
    const expanded =
      burgerBtn.getAttribute("aria-expanded") === "true" || false;
    burgerBtn.setAttribute("aria-expanded", !expanded);
    dropdownMenu.setAttribute("aria-hidden", expanded);
    dropdownMenu.classList.toggle("open");
    burgerIcon.classList.toggle("open");
    dropdownBackdrop.classList.toggle("open");
  });
}

if (dropdownBackdrop) {
  dropdownBackdrop.addEventListener("click", closeMenu);
}

// Optional: close menu when clicking outside menu and burger
document.addEventListener("click", (e) => {
  if (
    !document.querySelector(".burger-menu").contains(e.target) &&
    !dropdownMenu.contains(e.target)
  ) {
    closeMenu();
  }
});

//-------------------------------------------------------------
// Dropdown menu navigation logic
//-------------------------------------------------------------
if (dropdownMenu) {
  dropdownMenu.addEventListener("click", function (e) {
    const aTag = e.target.closest("a");
    if (!aTag) return;

    // "Mine" section links (always go to index.html)
    if (aTag.hasAttribute("data-mine")) {
      e.preventDefault();
      // Save selected mine to localStorage for title update
      localStorage.setItem("selectedMine", aTag.textContent.trim());
      window.location.href = "index.html";
      closeMenu();
      return;
    }

    // "About" section links
    if (aTag.hasAttribute("data-about")) {
      e.preventDefault();
      const anchor = aTag.getAttribute("href");
      // If already on about.html, scroll to section
      if (window.location.pathname.endsWith("about.html")) {
        const targetId = aTag.getAttribute("data-about");
        const targetDiv = document.getElementById(targetId);
        if (targetDiv) {
          targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
          // Optionally update header title here if desired
        }
        closeMenu();
      } else {
        // If not on about.html, go to about.html with anchor
        window.location.href = anchor;
        closeMenu();
      }
      return;
    }
  });
}

//-------------------------------------------------------------
// Navigation bar functionality (active state and scroll to chart)
//-------------------------------------------------------------
const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
    // Scroll to chart
    const targetId = this.getAttribute("data-scroll");
    if (targetId) {
      const chart = document.getElementById(targetId);
      if (chart) {
        chart.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
});

//-------------------------------------------------------------
// Update active nav item based on scroll position
//-------------------------------------------------------------
// Top line approach
// (function () {
//   // Build a mapping of nav link -> section element (only for links with data-scroll)
//   const tracked = Array.from(navLinks)
//     .map((link) => {
//       const targetId = link.getAttribute("data-scroll");
//       const el = targetId ? document.getElementById(targetId) : null;
//       return el ? { link, el } : null;
//     })
//     .filter(Boolean);

//   if (tracked.length === 0) return; // nothing to track

//   // Helper to set the active class consistently
//   function setActiveLink(link) {
//     navLinks.forEach((l) => l.classList.remove("active"));
//     if (link) link.classList.add("active");
//   }

//   // Compute which tracked section's top is closest to the viewport start and activate its link.
//   function updateActiveByScroll() {
//     // Account for sticky header + main-nav so "viewport start" is below them
//     const headerHeight =
//       document.querySelector(".app-header")?.offsetHeight || 0;
//     const navHeight = document.querySelector(".main-nav")?.offsetHeight || 0;
//     const viewportStart = headerHeight + navHeight;

//     let closest = null;
//     let closestDistance = Infinity;

//     tracked.forEach(({ link, el }) => {
//       const rect = el.getBoundingClientRect();
//       // Consider only elements that intersect the viewport area below viewportStart
//       if (rect.bottom <= viewportStart || rect.top >= window.innerHeight)
//         return;
//       // distance between the element's top and the viewportStart line
//       const elTopRelative = rect.top - viewportStart;
//       const distance = Math.abs(elTopRelative);
//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closest = link;
//       }
//     });

//     if (closest && !closest.classList.contains("active")) {
//       setActiveLink(closest);
//     }
//   }

//   // Throttle using requestAnimationFrame
//   let ticking = false;
//   function onScrollOrResize() {
//     if (!ticking) {
//       ticking = true;
//       requestAnimationFrame(() => {
//         updateActiveByScroll();
//         ticking = false;
//       });
//     }
//   }

//   // Listen to scroll and resize; passive for better performance
//   window.addEventListener("scroll", onScrollOrResize, { passive: true });
//   window.addEventListener("resize", onScrollOrResize);

//   // Also update on load and DOMContentLoaded (in case the page isn't at top)
//   window.addEventListener("load", updateActiveByScroll);
//   document.addEventListener("DOMContentLoaded", updateActiveByScroll);
// })();

// Bottom line approach
// (function () {
//   // Build a mapping of nav link -> section element (only for links with data-scroll)
//   const tracked = Array.from(navLinks)
//     .map((link) => {
//       const targetId = link.getAttribute("data-scroll");
//       const el = targetId ? document.getElementById(targetId) : null;
//       return el ? { link, el } : null;
//     })
//     .filter(Boolean);

//   if (tracked.length === 0) return; // nothing to track

//   // Helper to set the active class consistently
//   function setActiveLink(link) {
//     navLinks.forEach((l) => l.classList.remove("active"));
//     if (link) link.classList.add("active");
//   }

//   // Compute which tracked section's top is closest to the viewport start and activate its link.
//   function updateActiveByScroll() {
//     // Account for sticky header + main-nav so "viewport start" is below them
//     const headerHeight =
//       document.querySelector(".app-header")?.offsetHeight || 0;
//     const navHeight = document.querySelector(".main-nav")?.offsetHeight || 0;
//     const viewportStart = headerHeight + navHeight;

//     let closest = null;
//     let closestDistance = Infinity;

//     tracked.forEach(({ link, el }) => {
//       const rect = el.getBoundingClientRect();
//       // Consider only elements that intersect the viewport area below viewportStart
//       if (rect.bottom <= viewportStart || rect.top >= window.innerHeight)
//         return;
//       // distance between the element's top and the viewportStart line
//       const elTopRelative = rect.top - viewportStart;
//       const distance = Math.abs(elTopRelative);
//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closest = link;
//       }
//     });

//     if (closest && !closest.classList.contains("active")) {
//       setActiveLink(closest);
//     }
//   }

//   // Throttle using requestAnimationFrame
//   let ticking = false;
//   function onScrollOrResize() {
//     if (!ticking) {
//       ticking = true;
//       requestAnimationFrame(() => {
//         updateActiveByScroll();
//         ticking = false;
//       });
//     }
//   }

//   // Listen to scroll and resize; passive for better performance
//   window.addEventListener("scroll", onScrollOrResize, { passive: true });
//   window.addEventListener("resize", onScrollOrResize);

//   // Also update on load and DOMContentLoaded (in case the page isn't at top)
//   window.addEventListener("load", updateActiveByScroll);
//   document.addEventListener("DOMContentLoaded", updateActiveByScroll);
// })();

// Closest to middle
(function () {
  // Build a mapping of nav link -> section element (only for links with data-scroll)
  const tracked = Array.from(navLinks)
    .map((link) => {
      const targetId = link.getAttribute("data-scroll");
      const el = targetId ? document.getElementById(targetId) : null;
      return el ? { link, el } : null;
    })
    .filter(Boolean);

  if (tracked.length === 0) return; // nothing to track

  // Helper to set the active class consistently
  function setActiveLink(link) {
    navLinks.forEach((l) => l.classList.remove("active"));
    if (link) link.classList.add("active");
  }

  // Compute which tracked section is closest to viewport center and activate its link
  function updateActiveByScroll() {
    const viewportCenter = window.innerHeight / 2;
    let closest = null;
    let closestDistance = Infinity;

    tracked.forEach(({ link, el }) => {
      const rect = el.getBoundingClientRect();
      // Skip if completely outside viewport
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const elCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = link;
      }
    });

    if (closest && !closest.classList.contains("active")) {
      setActiveLink(closest);
    }
  }

  // Throttle using requestAnimationFrame
  let ticking = false;
  function onScrollOrResize() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveByScroll();
        ticking = false;
      });
    }
  }

  // Listen to scroll and resize; passive for better performance
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);

  // Also update on load and DOMContentLoaded (in case the page isn't at top)
  window.addEventListener("load", updateActiveByScroll);
  document.addEventListener("DOMContentLoaded", updateActiveByScroll);
})();

//-------------------------------------------------------------
// Close menu when any link inside dropdown is clicked
//-------------------------------------------------------------
if (dropdownMenu) {
  dropdownMenu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeMenu();
  });
}

//-------------------------------------------------------------
// Update header tiles based on menu selection (persist across reload!)
//-------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const headerTitle = document.querySelector(".header-title");

  // On index.html, update header title based on localStorage value
  if (window.location.pathname.endsWith("index.html") && headerTitle) {
    const selectedMine = localStorage.getItem("selectedMine");
    if (selectedMine) {
      headerTitle.textContent = selectedMine.toUpperCase() + " MINE";
    }
  }

  // On about.html, update header title on Mine menu click (optional, local only)
  if (window.location.pathname.endsWith("about.html") && dropdownMenu) {
    const menuHeadings = dropdownMenu.querySelectorAll(".menu-heading");
    // Find the "Mine" heading index
    const minesHeadingIndex = Array.from(menuHeadings).findIndex(
      (h) => h.textContent.trim().toLowerCase() === "mine"
    );
    // Get all <li> elements
    const allItems = Array.from(dropdownMenu.querySelectorAll("li"));
    // Get all <a> under "Mine" only
    const validLinks = [];
    if (minesHeadingIndex !== -1) {
      let i = minesHeadingIndex + 1;
      while (
        i < allItems.length &&
        !allItems[i].classList.contains("menu-heading")
      ) {
        const link = allItems[i].querySelector("a");
        if (link) validLinks.push(link);
        i++;
      }
    }
    validLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        // update the header title locally (won't persist after navigation)
        if (headerTitle)
          headerTitle.textContent =
            link.textContent.trim().toUpperCase() + " MINE";
        // Note: Navigation to index.html will occur immediately after due to dropdown logic
      });
    });
  }
});

//-------------------------------------------------------------
// Inventory Table
//-------------------------------------------------------------
// None

}

//-------------------------------------------------------------
// Burger menu toggle logic
//-------------------------------------------------------------
const burgerBtn = document.querySelector(".burger-btn");
const burgerIcon = document.querySelector(".burger-icon");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownBackdrop = document.getElementById("dropdownBackdrop");

function closeMenu() {
  if (burgerBtn) burgerBtn.setAttribute("aria-expanded", false);
  if (dropdownMenu) {
    dropdownMenu.setAttribute("aria-hidden", true);
    dropdownMenu.classList.remove("open");
  }
  if (burgerIcon) burgerIcon.classList.remove("open");
  if (dropdownBackdrop) dropdownBackdrop.classList.remove("open");
}

if (burgerBtn) {
  burgerBtn.addEventListener("click", () => {
    const expanded =
      burgerBtn.getAttribute("aria-expanded") === "true" || false;
    burgerBtn.setAttribute("aria-expanded", !expanded);
    dropdownMenu.setAttribute("aria-hidden", expanded);
    dropdownMenu.classList.toggle("open");
    burgerIcon.classList.toggle("open");
    dropdownBackdrop.classList.toggle("open");
  });
}

if (dropdownBackdrop) {
  dropdownBackdrop.addEventListener("click", closeMenu);
}

// Optional: close menu when clicking outside menu and burger
document.addEventListener("click", (e) => {
  if (
    !document.querySelector(".burger-menu").contains(e.target) &&
    !dropdownMenu.contains(e.target)
  ) {
    closeMenu();
  }
});

//-------------------------------------------------------------
// Dropdown menu navigation logic
//-------------------------------------------------------------
if (dropdownMenu) {
  dropdownMenu.addEventListener("click", function (e) {
    const aTag = e.target.closest("a");
    if (!aTag) return;

    // "Mine" section links (always go to index.html)
    if (aTag.hasAttribute("data-mine")) {
      e.preventDefault();
      // Save selected mine to localStorage for title update
      localStorage.setItem("selectedMine", aTag.textContent.trim());
      window.location.href = "index.html";
      closeMenu();
      return;
    }

    // "About" section links
    if (aTag.hasAttribute("data-about")) {
      e.preventDefault();
      const anchor = aTag.getAttribute("href");
      // If already on about.html, scroll to section
      if (window.location.pathname.endsWith("about.html")) {
        const targetId = aTag.getAttribute("data-about");
        const targetDiv = document.getElementById(targetId);
        if (targetDiv) {
          targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
          // Optionally update header title here if desired
        }
        closeMenu();
      } else {
        // If not on about.html, go to about.html with anchor
        window.location.href = anchor;
        closeMenu();
      }
      return;
    }
  });
}

//-------------------------------------------------------------
// Navigation bar functionality (active state and scroll to chart)
//-------------------------------------------------------------
const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
    // Scroll to chart
    const targetId = this.getAttribute("data-scroll");
    if (targetId) {
      const chart = document.getElementById(targetId);
      if (chart) {
        chart.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  });
});

//-------------------------------------------------------------
// Close menu when any link inside dropdown is clicked
//-------------------------------------------------------------
if (dropdownMenu) {
  dropdownMenu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeMenu();
  });
}

//-------------------------------------------------------------
// Update header tiles based on menu selection (persist across reload!)
//-------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const headerTitle = document.querySelector(".header-title");

  // On index.html, update header title based on localStorage value
  if (window.location.pathname.endsWith("index.html") && headerTitle) {
    const selectedMine = localStorage.getItem("selectedMine");
    if (selectedMine) {
      headerTitle.textContent = selectedMine.toUpperCase() + " MINE";
    }
  }

  // On about.html, update header title on Mine menu click (optional, local only)
  if (window.location.pathname.endsWith("about.html") && dropdownMenu) {
    const menuHeadings = dropdownMenu.querySelectorAll(".menu-heading");
    // Find the "Mine" heading index
    const minesHeadingIndex = Array.from(menuHeadings).findIndex(
      (h) => h.textContent.trim().toLowerCase() === "mine"
    );
    // Get all <li> elements
    const allItems = Array.from(dropdownMenu.querySelectorAll("li"));
    // Get all <a> under "Mine" only
    const validLinks = [];
    if (minesHeadingIndex !== -1) {
      let i = minesHeadingIndex + 1;
      while (
        i < allItems.length &&
        !allItems[i].classList.contains("menu-heading")
      ) {
        const link = allItems[i].querySelector("a");
        if (link) validLinks.push(link);
        i++;
      }
    }
    validLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        // update the header title locally (won't persist after navigation)
        if (headerTitle)
          headerTitle.textContent =
            link.textContent.trim().toUpperCase() + " MINE";
        // Note: Navigation to index.html will occur immediately after due to dropdown logic
      });
    });
  }
});

//-------------------------------------------------------------
// Inventory Table
//-------------------------------------------------------------
// None
