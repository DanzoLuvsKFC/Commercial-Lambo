window.onload = () => {
    const footer = document.createElement('footer');
    footer.classList.add('custom-footer');
    footer.style.textAlign = "center";
    footer.style.padding = "20px";
    footer.style.backgroundColor = "#FAFAFA";
    footer.style.color = "#181818";

    // Paragraph 1
    const contactInfo1 = document.createElement('p');
    contactInfo1.innerText = "ACADEMIC CONCEPT";
    contactInfo1.classList.add('contact-info-1');  // Custom class
    footer.appendChild(contactInfo1);

    // Paragraph 2
    const contactInfo2 = document.createElement('p');
    contactInfo2.innerText = "This website was made for academic purposes only and only explores a new concept to present the original Lamborghini website.";
    contactInfo2.classList.add('contact-info-2');  // Custom class
    footer.appendChild(contactInfo2);

    // Paragraph 3
    const contactInfo3 = document.createElement('p');
    contactInfo3.innerText = "© 2024 | Designed by Danzo. All Rights Reserved.";
    contactInfo3.classList.add('contact-info-3');  // Custom class
    footer.appendChild(contactInfo3);

    // Social Media Links
    const socialMediaDiv = document.createElement('div');
    socialMediaDiv.style.marginTop = "10px";
    const socialMedias = [
        { 
            link: "https://www.facebook.com/Lamborghini", 
            imgSrc: "/Commercial-Lambo/Images/facebook (1).png",  
            altText: "Facebook"
        },
        { 
            link: "https://www.instagram.com/lamborghini?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", 
            imgSrc: "/Commercial-Lambo/Images/instagram.png",  
            altText: "Instagram"
        },
        { 
            link: "https://www.tiktok.com/@lamborghini?is_from_webapp=1&sender_device=pc", 
            imgSrc: "C:\Users\Danie\OneDrive\Documents\GitHub\Commercial-Lambo\Images\tiktok.png",  
            altText: "Tiktok"
        }
        
    ];

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
    document.body.appendChild(footer);
};

