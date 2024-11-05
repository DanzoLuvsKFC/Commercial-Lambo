// contentSwitcher.js
document.addEventListener("DOMContentLoaded", () => {
    const contentData = [
        {
            title: "Explore Models",
            img: "Images/image1.jpg",
            description: "Description for content piece 1",
            link: "Information/data.html"
        },
        {
            title: "Designing Lamborghini",
            img: "Images/image2.jpg",
            description: "Description for content piece 2",
            link: "Design/design&research.html"
        },
        {
            title: "Application of Theory",
            img: "Images/image3.jpg",
            description: "Description for content piece 3",
            link: "Theory/dv.html"
        }
    ];

    let currentIndex = 0;
    const titleElement = document.querySelector(".ContentTitle");
    const imgElement = document.querySelector(".ContentImage");
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
    // Change content every 5 seconds
    setInterval(updateContent, 5000);
});
