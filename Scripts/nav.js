// Menu items configuration
const navMenuItems = [
    { name: "HOME", href: "/Commercial-Lambo/index.html" },
    { name: "CARS", href: "/Commercial-Lambo/Information/data.html" },
    { name: "DESIGN", href: "/Commercial-Lambo/Design/design&research.html" },
    { name: "THEORY", href: "/Commercial-Lambo/Theory/theory.html" },
    { name: "ABOUT", href: "/Commercial-Lambo/About/about.html" }
];

// Function to create menu items
const createMenuItems = () => {
    // Selecting the nav tag
    const nav = document.querySelector('nav');
    
    /*
    // Commenting out image/logo creation
    const logo = document.createElement('img');
    logo.src = window.location.origin + '/Commercial-Lambo/Images/LAMBO LOGOO.png'; 
    logo.id = 'nav-logo';
    */
    
    const ul = document.createElement('ul');
    ul.id = 'nav-links';

    // Iterate through array to create nav hyperlinks
    navMenuItems.forEach(element => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = element.name;
        a.href = element.href;
        a.addEventListener('click', (event) => {
            window.location.href = element.href;
        });

        // Add hyperlink to list item and nav list
        li.appendChild(a);
        a.classList.add('nav-link');
        ul.appendChild(li);
    });

    // Append list to nav
    nav.appendChild(ul);

    /*
    // Commenting out appending the logo to the nav
    nav.appendChild(logo);
    */
};

// Initialize menu creation when DOM is fully loaded
document.addEventListener('DOMContentLoaded', createMenuItems);
