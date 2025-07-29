document.addEventListener('DOMContentLoaded', function () {
    includeHTML();
});

function includeHTML() {
    const includes = document.querySelectorAll('include[src]');
    let remaining = includes.length;

    includes.forEach((el) => {
        const file = el.getAttribute('src');

        fetch(file)
            .then((res) => {
                if (!res.ok) throw new Error("Component not found");
                return res.text();
            })
            .then((data) => {
                el.innerHTML = data;
                el.removeAttribute('src');
            })
            .catch((err) => {
                el.innerHTML = err.message;
                el.removeAttribute('src');
            })
            .finally(() => {
                remaining--;
                if (remaining === 0) initNavControls(); // run your menu code if needed
            });
    });

    if (remaining === 0) initNavControls();
}

function initNavControls() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }
}
