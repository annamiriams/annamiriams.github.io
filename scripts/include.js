function includeHTML(callback) {
    // Look for all elements with the 'include' tag and a 'src' attribute.
    const includes = document.querySelectorAll('include[src]');
    let remaining = includes.length;

    if (remaining === 0) {
        // If there are no includes, just run the callback immediately.
        callback(); 
        return;
    }

    // Loop through each 'include' element.
    includes.forEach((el) => {
        // Fetch the file specified in the 'src' attribute.
        const file = el.getAttribute('src');

        // Make sure the file exists and fetch it.
        fetch(file)
            // If there is a file to fetch, convert it into plain text (HTML).
            .then((res) => {
                if (!res.ok) throw new Error("Component not found");
                return res.text();
            })
            // This puts the content of the file inside the include element so the page actually has the content (like the navbar).
            .then((data) => {
                el.innerHTML = data;
                el.removeAttribute('src');
            })
            .catch((err) => {
                el.innerHTML = err.message;
                el.removeAttribute('src');
            })
            // Run callback when all includes are done.
            .finally(() => {
                remaining--;
                if (remaining === 0) {
                    callback(); 
                }
            });
    });
}

// Wait until the page has loaded all the HTML before running the rest of the code.
document.addEventListener('DOMContentLoaded', function () {
    // Include all components like the navbar (see above).
    includeHTML(function () {
        // Once all the components like the navbar are added to the page, run the hamburger menu code.
        if (typeof initNavbarMenu === 'function') {
            initNavbarMenu();
        }
    });
});
