//Hamburger Menu
const hamburgerMenu = document.querySelector("#hamburger-menu");
const mobileNav = document.querySelector("#mobile-nav");

function toggleMenu() {
    mobileNav.classList.toggle("hidden");

    const isOpen = !mobileNav.classList.contains("hidden");
    hamburgerMenu.setAttribute("aria-expanded", isOpen);
}

hamburgerMenu.addEventListener("click", toggleMenu);

//AR-Model
(() => {
    "use strict";

    const modelViewer = document.querySelector("#speaker-model");
    const hotspots = document.querySelectorAll(".Hotspot");
    const infoBox = document.querySelector("#hotspot-info");
    const infoTitle = document.querySelector("#hotspot-title");
    const infoDescription = document.querySelector("#hotspot-description");
    const infoImage = document.querySelector("#hotspot-image");
    const closeButton = document.querySelector("#close-hotspot");
    const progressBar = document.querySelector(".progress-bar");
    const updateBar = document.querySelector(".update-bar");

    const hotspotData = [
        {
            id: "sound",
            title: "Powerful Immersive Sound",
            description: "Experience rich, detailed audio through a carefully designed speaker system. From deep bass to crisp highs, enjoy a balanced listening experience.",
            image: "images/front.png",
            alt: "Close-up of the speaker driver"
        },
        {
            id: "controls",
            title: "Effortless Control",
            description: "Take control of your listening experience with conveniently positioned buttons. Easily adjust your music and access essential functions.",
            image: "images/top.png",
            alt: "Close-up of the speaker controls"
        },
        {
            id: "usbc",
            title: "USB-C Connectivity",
            description: "Enjoy convenient USB-C connectivity with a modern connection designed for easy charging and everyday use.",
            image: "images/back.png",
            alt: "Close-up of the USB-C port"
        },
        {
            id: "headphones",
            title: "Headphone Support",
            description: "Connect your wired headphones directly to the speaker for a more personal listening experience.",
            image: "images/back.png",
            alt: "Close-up of the headphone connection"
        },
        {
            id: "design",
            title: "Crafted with Precision",
            description: "Combining modern styling with carefully selected finishes, the speaker's exterior is designed to complement your space.",
            image: "images/Overall.png",
            alt: "Close-up of the speaker exterior"
        }
    ];

    function showHotspotInfo(event) {
        const hotspotId = event.currentTarget.dataset.hotspot;

        const selectedHotspot = hotspotData.find(
            (hotspot) => hotspot.id === hotspotId
        );

        if (!selectedHotspot) {
            return;
        }

        infoTitle.textContent = selectedHotspot.title;
        infoDescription.textContent = selectedHotspot.description;
        infoImage.src = selectedHotspot.image;
        infoImage.alt = selectedHotspot.alt;

        infoBox.classList.remove("hidden");

        hotspots.forEach((hotspot) => {
            hotspot.classList.remove("active");
        });

        event.currentTarget.classList.add("active");
    }

    function closeHotspotInfo() {
        infoBox.classList.add("hidden");

        hotspots.forEach((hotspot) => {
            hotspot.classList.remove("active");
        });
    }

    function updateProgress(event) {
        const progress = event.detail.totalProgress * 100;

        updateBar.style.width = `${progress}%`;

        if (progress < 100) {
            progressBar.classList.remove("hide");
        } else {
            progressBar.classList.add("hide");
        }
    }
    
    hotspots.forEach((hotspot) => {
        hotspot.addEventListener("click", showHotspotInfo);
    });

    closeButton.addEventListener("click", closeHotspotInfo);
    modelViewer.addEventListener("progress", updateProgress);
})();
