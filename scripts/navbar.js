function initNavbarMenu() {
    const hamburger = document.querySelector('.hamburger');
    const links = document.querySelector('.links');

    if (hamburger && links) {
        hamburger.addEventListener('click', () => {
            links.classList.toggle('active');

            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !expanded);
        });
    }
}
