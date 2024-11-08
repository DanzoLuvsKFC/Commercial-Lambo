// contentSwitcher.js
document.addEventListener("DOMContentLoaded", () => {
    const contentData = [
        {
            title: "Explore Car Models",
            img: "Images/Greenie.jpeg",
            description: "View all the different types of available car models presented through eye-catching visuals.",
            link: "Information/data.html"
        },
        {
            title: "Designing Lamborghini",
            img: "Images/Yello.jpeg",
            description: "See how the website was developed and constructed into what it is today.",
            link: "Design/design&research.html"
        },
        {
            title: "Application of Theory",
            img: "Images/Greya.jpeg",
            description: "See all of the work and research that was conducted to develop this website.",
            link: "Theory/dv.html"
        }
    ];

    let currentIndex = 0;
    const titleElement = document.querySelector(".ContentTitle");
    const imgElement = document.querySelector(".ContentImage img");
    const descElement = document.querySelector(".ContentDescription");
    const linkElement = document.querySelector(".ExploreLink");

    function fadeOut() {
        // Add the fade-out class to elements to make them transparent
        titleElement.classList.add("fade-out");
        imgElement.classList.add("fade-out");
        descElement.classList.add("fade-out");
        linkElement.classList.add("fade-out");
    }

    function fadeIn() {
        // Remove the fade-out class to fade elements back in
        titleElement.classList.remove("fade-out");
        imgElement.classList.remove("fade-out");
        descElement.classList.remove("fade-out");
        linkElement.classList.remove("fade-out");
    }

    function updateContent() {
        // First, fade out the elements, then update them after the fade-out is complete
        fadeOut();

        setTimeout(() => {
            const content = contentData[currentIndex];
            titleElement.textContent = content.title;
            imgElement.src = content.img;
            descElement.textContent = content.description;
            linkElement.href = content.link;

            // Move to the next item in the array
            currentIndex = (currentIndex + 1) % contentData.length;

            // Fade in the new content
            fadeIn();
        }, 500); // Wait for 0.5s (500ms) for fade-out to complete
    }

    // Initialize the content and start the interval
    updateContent();
    setInterval(updateContent, 8000);
});


