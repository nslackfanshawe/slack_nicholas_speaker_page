const hamburgerMenu = document.querySelector("#hamburger-menu");
const mobileNav = document.querySelector("#mobile-nav");

function toggleMenu() {
    mobileNav.classList.toggle("hidden");

    const isOpen = !mobileNav.classList.contains("hidden");
    hamburgerMenu.setAttribute("aria-expanded", isOpen);
}

hamburgerMenu.addEventListener("click", toggleMenu);