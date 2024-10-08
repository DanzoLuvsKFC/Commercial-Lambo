// Create a dynamic footer using JavaScript
window.onload = function() {
    // Create footer element
    const footer = document.createElement('footer');
    footer.style.textAlign = "center";
    footer.style.padding = "20px";
    footer.style.backgroundColor = "#333";
    footer.style.color = "#fff";

    // Create contact information text
    const contactInfo = document.createElement('p');
    contactInfo.innerText = "Contact us at: lamborghiniOverferrari@gmail.com"; 
    footer.appendChild(contactInfo);

    // Create a div to hold the social media icons
    const socialMediaDiv = document.createElement('div');
    socialMediaDiv.style.marginTop = "10px";

    // Social media icons
    const socialMedias = [
        { 
            link: "https://www.instagram.com/lamborghini?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", 
            imgSrc: `${window.location.origin}/Commercial-Lambo/Images/Insta%20Logo.png`,  
            altText: "Instagram"
        },
        { 
            link: "https://www.tiktok.com/@lamborghini?is_from_webapp=1&sender_device=pc", 
            imgSrc: `${window.location.origin}/Commercial-Lambo/Images/TiktokLogo.png`,  
            altText: "Tiktok"
        }
    ];

    // Loop through the social media array and create image links
    socialMedias.forEach(media => {
        const anchor = document.createElement('a');
        anchor.href = media.link;
        anchor.target = "_blank";  

        const image = document.createElement('img');
        image.src = media.imgSrc;  
        image.alt = media.altText;
        image.style.width = "30px";
        image.style.margin = "0 10px";

        anchor.appendChild(image);
        socialMediaDiv.appendChild(anchor);
    });

    footer.appendChild(socialMediaDiv);

    // Append footer to the body
    document.body.appendChild(footer);
};