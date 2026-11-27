//Hamburger Menu
(() => {
    "use strict";

    const hamburgerMenu = document.querySelector("#hamburger-menu");
    const mobileNav = document.querySelector("#mobile-nav");

    function toggleMenu() {
        mobileNav.classList.toggle("hidden");

        const isOpen = !mobileNav.classList.contains("hidden");
        hamburgerMenu.setAttribute("aria-expanded", isOpen);
    }

    hamburgerMenu.addEventListener("click", toggleMenu);
})();


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

    const hotspotLoader = document.querySelector("#hotspot-loader");
    const hotspotError = document.querySelector("#hotspot-error");

    let hotspotData = [];

    async function getHotspotData() {
        hotspotLoader.classList.remove("hidden");

        try {
            const response = await fetch("https://api.jsonbin.io/v3/b/6b087c3b3957a11c13b4df2e/latest");

            if (!response.ok) {
                throw new Error("Unable to retrieve hotspot data");
            }

            const data = await response.json();
            hotspotData = data.record;

            if (!Array.isArray(hotspotData)) {
                throw new Error("Invalid hotspot data");
            }

            hotspots.forEach(hotspot => {
                hotspot.disabled = false;
            });

        } catch (error) {
            console.log(error);

            hotspotError.textContent = "Unable to load speaker information. Please try again later.";
            hotspotError.classList.remove("hidden");
        }

        hotspotLoader.classList.add("hidden");
    }

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

    getHotspotData();
})();


//Scrolling Animation
(() => {
    "use strict";

    gsap.registerPlugin(ScrollTrigger);

    const canvas = document.querySelector("#explode-view");
    const context = canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 720;

    const frameCount = 300;
    const images = [];

    const speaker = {
        frame: 0
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();

        img.src = `images/animation/bluetooth_animation${i.toString().padStart(4, '0')}.png`;

        images.push(img);
    }

    gsap.to(speaker, {
        frame: frameCount - 1,
        ease: "none",
        snap: "frame",
        scrollTrigger: {
            trigger: "#animation-container",
            start: "center center",
            end: "+=2000",
            pin: true,
            scrub: 1,
            markers: false
        },
        onUpdate: render
    });

    images[0].addEventListener("load", render);

    function render() {
        const img = images[speaker.frame];

        if (!img.complete || img.naturalWidth === 0) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

})();


//X-Ray 
(() => {
    "use strict";

    const slider = document.querySelector("#comparison-slider");
    const overlay = document.querySelector("#xray-overlay");
    const divider = document.querySelector("#comparison-divider");
    const xrayImage = document.querySelector("#xray-speaker");
    const container = document.querySelector("#comparison-container");

    function updateComparison() {
        const value = slider.value;

        overlay.style.width = `${value}%`;
        divider.style.left = `${value}%`;
        xrayImage.style.width = `${container.clientWidth}px`;
    }

    slider.addEventListener("input", updateComparison);
    window.addEventListener("resize", updateComparison);

    updateComparison();
})();


//Materials
(() => {
    "use strict";

    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#materials-container");
    const materialsLoader = document.querySelector("#materials-loader");
    const materialsError = document.querySelector("#materials-error");
    async function getMaterialData() {
        materialsLoader.classList.remove("hidden");

        try {
            const response = await fetch("https://api.jsonbin.io/v3/b/6b0702b9ffd5d16053dd6f50/latest");

            if (!response.ok) {
                throw new Error("Unable to retrieve material data");
            }

            const data = await response.json();

            loadMaterialInfo(data.record);

        } catch (error) {
            console.log(error);

            materialsError.textContent = "Unable to load speaker materials. Please try again later.";
            materialsError.classList.remove("hidden");
        }

        materialsLoader.classList.add("hidden");
    }

    function loadMaterialInfo(materialListData) {
        materialListData.forEach(material => {
            const clone = materialTemplate.content.cloneNode(true);

            const materialHeading = clone.querySelector(".material-heading");
            materialHeading.textContent = material.title;

            const materialDescription = clone.querySelector(".material-description");
            materialDescription.textContent = material.description;

            const materialImage = clone.querySelector(".material-image");
            materialImage.src = material.image;
            materialImage.alt = material.alt;

            materialList.appendChild(clone);
        });
    }

    getMaterialData();

})();