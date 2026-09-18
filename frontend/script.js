/* =========================
   MOBILE NAVIGATION
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("open");

});


/* Close mobile menu after clicking a link */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("open");

    });

});


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const formMessage =
        document.getElementById("formMessage");


    /* Basic validation */

    if (!name || !email || !message) {

        formMessage.textContent =
            "Please fill in all required fields.";

        return;

    }


    formMessage.textContent =
        "Sending message...";


    try {

        const response = await fetch("/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: name,

                email: email,

                subject: subject,

                message: message

            })

        });


        const result = await response.json();


        if (response.ok) {

            formMessage.textContent =
                "✓ Message sent successfully!";

            contactForm.reset();

        } else {

            formMessage.textContent =
                result.message ||
                "Something went wrong.";

        }


    } catch (error) {

        console.error(
            "Contact form error:",
            error
        );

        formMessage.textContent =
            "Unable to connect to the server.";

    }

});


/* =========================
   SCROLL ANIMATION
========================= */

const sections =
    document.querySelectorAll(
        ".section, .soft-section"
    );


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


sections.forEach(function (section) {

    observer.observe(section);

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const allSections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", function () {

    let current = "";

    allSections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        if (
            window.scrollY >= sectionTop
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});