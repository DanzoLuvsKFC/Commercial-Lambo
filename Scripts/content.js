// contentSwitcher.js
document.addEventListener("DOMContentLoaded", () => {
    const contentData = [
        {
            title: "Explore Car Models",
            img: "Images/Greenie.jpeg" ,
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

    function updateContent() {
        const content = contentData[currentIndex];
        titleElement.textContent = content.title;
        imgElement.src = content.img;
        descElement.textContent = content.description;
        linkElement.href = content.link;

        currentIndex = (currentIndex + 1) % contentData.length;
    }

    // Initialize with the first content
    updateContent();
    // Change content every 8 seconds
    setInterval(updateContent, 8000);
});
