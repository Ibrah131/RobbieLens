///////// theme slider /////////


// Config default theme
const defaultTheme = 'dark'; // Change this to 'dark', 'twilight', or '' for no theme
////////////////



function applyTheme(newTheme) { /////applyTheme function
    if (newTheme === '') { //if root theme choosed on slider: Remove theme or Apply no theme (or apply root theme)
        document.documentElement.className = ''; // Remove current theme
        document.querySelector(".slider-button").className = "slider-button";
        document.querySelector(".slider-circle").className = "slider-circle";

    } else { // If another theme choosed : Apply themes
        document.documentElement.className = `theme-${newTheme}`; 
        document.querySelector(".slider-button").className = `slider-button ${newTheme}`; // Change bg color
        document.querySelector(".slider-circle").className = `slider-circle ${newTheme}`; // Slide and change bg icon
    }
    
    currentTheme = newTheme; // Update current theme
    localStorage.setItem('theme', newTheme); // Save the current theme in localStorage
}


let currentTheme = '';

window.addEventListener('load', () => { //listen to page loading, to apply first theme
    if (window.performance.getEntriesByType('navigation')[0]?.type === 'reload') { // if page loading occured with refresh btn/F5
        applyTheme(defaultTheme); 
    } else if (document.referrer && !document.referrer.includes(window.location.hostname)) { //if the page is loaded from an external site (via document.referrer), meaning if the user comes from a different domain, the defaultTheme is applied. If the referrer contains the same hostname, this condition will be false.
        applyTheme(defaultTheme); 
    }else{ //if window loaded from navigation or back/forward btns x)
        if (localStorage.getItem('theme')) { //if a theme has been previously applied and saved
            applyTheme(localStorage.getItem('theme')); // Apply saved theme

        } else { //if no theme has been previously applied and saved
            applyTheme(''); // Apply root theme
        }
    }
});



document.querySelector(".slider-circle").addEventListener("click", function (event) { // Event listener when the slider circle is clicked
    event.preventDefault();
    if (currentTheme === 'dark') {
        applyTheme('twilight'); // From dark to twilight
    } else if (currentTheme === 'twilight') {  // From twilight to root
        applyTheme(''); // Apply root theme
    } else { // If in root
        applyTheme('dark'); // From default to dark
    }
});
