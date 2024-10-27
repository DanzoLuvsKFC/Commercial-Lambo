// Menu items configuration
const navMenuItems = [
    { name: "Home", href: "/Commercial-Lambo/index.html" },
    { name: "Data Visualization", href: "/Commercial-Lambo/Information/data.html" },
    { name: "Design and Research", href: "/Commercial-Lambo/Design/design&research.html" },
    { name: "Theory", href: "/Commercial-Lambo/Theory/theory.html" },
    { name: "About", href: "/Commercial-Lambo/About/about.html" }
];

// Function to create menu items
const createMenuItems = () => {
    // Selecting the nav tag
    const nav = document.querySelector('nav');
    const logo = document.createElement('img');
    logo.src = window.location.origin + '/Commercial-Lambo/Images/LAMBO LOGOO.png'; 
    logo.id = 'nav-logo';
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

    // Append list and logo to nav
    nav.appendChild(ul);
    nav.appendChild(logo);
};

// Initialize menu creation when DOM is fully loaded
document.addEventListener('DOMContentLoaded', createMenuItems);
