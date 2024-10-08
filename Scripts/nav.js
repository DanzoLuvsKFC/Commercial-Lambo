// Menu tings
const navMenuItems = [
    { name: "Home", href: "/Commercial-Lambo/index.html" },
    { name: "Data Visualization", href: "/Commercial-Lambo/Information/data.html" },
    { name: "Design and Research", href: "/Commercial-Lambo/Design/design&research.html" },
    { name: "Theory", href: "/Commercial-Lambo/Theory/theory.html"},
    { name: "About", href: "/Commercial-Lambo/About/about.html" }
];

// Method for the Menu Items
function CreateMenuItems() {
    //selecting my nav tag 
    const nav = document.querySelector('nav');
    const logo = document.createElement('img');
    logo.src = window.location.origin + '/Commercial-Lambo/Images/LAMBO LOGOO.png'; 
    logo.id = 'nav-logo';
    const ul = document.createElement('ul');

    ul.id = 'nav-links';


    //will iterate through my array, and create a list of hyperlinks for my nav
    navMenuItems.forEach(element => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = element.name;
        a.href = element.href;
        a.addEventListener('click', (event) => {
            window.location.href = element.href;
        });

        //add hyperlinks to my list 
        li.appendChild(a);
        a.classList.add('nav-link');
        ul.appendChild(li);
    });

    //lastly the list should get added to the nav element
    nav.appendChild(ul);
    nav.appendChild(logo);
}
 
document.addEventListener ('DOMContentLoaded',CreateMenuItems);