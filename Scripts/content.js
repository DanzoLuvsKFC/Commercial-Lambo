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

   
    updateContent();
    
    setInterval(updateContent, 8000);
});

document.addEventListener("DOMContentLoaded", () => {
    
    const contentText = document.querySelector(".ContentText");

    
    function adjustContentTextWidth() {
        if (window.innerWidth <= 400) {
            contentText.style.width = "100%";
            contentText.style.marginRight = "0";
        } else {
            contentText.style.width = ""; 
        }
    }

    
    adjustContentTextWidth();
    window.addEventListener("resize", adjustContentTextWidth);
});

document.addEventListener("DOMContentLoaded", () => {
    
    const contentText = document.querySelector(".ContentImage");

    
    function adjustContentTextWidth() {
        if (window.innerWidth <= 400) {
            contentText.style.width = "100%";
            contentText.style.marginRight = "0";
        } else {
            contentText.style.width = ""; 
        }
    }


    adjustContentTextWidth();
    window.addEventListener("resize", adjustContentTextWidth);
});

document.addEventListener("DOMContentLoaded", () => {
    
    const contentText = document.querySelector(".ContentDescription");

    
    function adjustContentTextWidth() {
        if (window.innerWidth <= 936) {
            contentText.style.width = "100%";
            contentText.style.marginRight = "0";
            contentText.style.fontSize = "18px"
        } else {
            contentText.style.width = ""; 
        }
    }


    adjustContentTextWidth();
    window.addEventListener("resize", adjustContentTextWidth);
});

