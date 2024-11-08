document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".MainSection, .SecondarySection, .ThirdSection");

    const observerOptions = {
        root: null,
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add("section-hidden");
        sectionObserver.observe(section);
    });
});
