/* =========================================================
   PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
       MOBILE NAVIGATION
       ========================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("open");
        });


        /* Close mobile menu after clicking a link */

        const mobileNavLinks =
            document.querySelectorAll("#navMenu a");

        mobileNavLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
            });

        });

    }


    /* =========================================================
       CONTACT FORM
       ========================================================= */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* Get form values */

                const nameElement =
                    document.getElementById("name");

                const emailElement =
                    document.getElementById("email");

                const subjectElement =
                    document.getElementById("subject");

                const messageElement =
                    document.getElementById("message");

                const formMessage =
                    document.getElementById("formMessage");


                const name =
                    nameElement
                        ? nameElement.value.trim()
                        : "";

                const email =
                    emailElement
                        ? emailElement.value.trim()
                        : "";

                const subject =
                    subjectElement
                        ? subjectElement.value.trim()
                        : "";

                const message =
                    messageElement
                        ? messageElement.value.trim()
                        : "";


                /* Basic validation */

                if (!name || !email || !message) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please fill in all required fields.";

                    }

                    return;
                }


                /* Sending message */

                if (formMessage) {

                    formMessage.textContent =
                        "Sending message...";

                }


                try {

                    const response =
                        await fetch("/contact", {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                name: name,

                                email: email,

                                subject: subject,

                                message: message

                            })

                        });


                    const result =
                        await response.json();


                    /* Success */

                    if (response.ok) {

                        if (formMessage) {

                            formMessage.textContent =
                                "✓ Message sent successfully!";

                        }

                        contactForm.reset();

                    }


                    /* Server error */

                    else {

                        if (formMessage) {

                            formMessage.textContent =
                                result.message ||
                                "Something went wrong.";

                        }

                    }


                }


                /* Connection error */

                catch (error) {

                    console.error(
                        "Contact form error:",
                        error
                    );


                    if (formMessage) {

                        formMessage.textContent =
                            "Unable to connect to the server.";

                    }

                }

            }
        );

    }


    /* =========================================================
       SECTION SCROLL ANIMATION
       ========================================================= */

    const sections =
        document.querySelectorAll(
            ".section, .soft-section"
        );


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        sections.forEach(function (section) {

            sectionObserver.observe(section);

        });

    }


    /* =========================================================
       EDUCATION CARD SCROLL ANIMATION
       ========================================================= */

    const educationCards =
        document.querySelectorAll(
            "#education .education-card"
        );


    if ("IntersectionObserver" in window) {

        const educationObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "education-visible"
                            );


                            /*
                               Stop observing this card
                               after it has appeared
                            */

                            educationObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.15
                }

            );


        educationCards.forEach(function (card) {

            educationObserver.observe(card);

        });

    }


    /* =========================================================
       ACTIVE NAVIGATION
       ========================================================= */

    const allSections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            "#navMenu a"
        );


    function updateActiveNavigation() {

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

    }


    /* Run active navigation while scrolling */

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /* Run once when page loads */

    updateActiveNavigation();


});

/* =========================================================
   PORTFOLIO INTERACTIVE ANIMATIONS & HANDLERS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       1. MOBILE NAVIGATION
       ========================================================= */
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("open");
        });

        const mobileNavLinks = document.querySelectorAll("#navMenu a");
        mobileNavLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
            });
        });
    }

    /* =========================================================
       2. SKILL PROGRESS BAR ANIMATION ON SCROLL
       ========================================================= */
    const skillCards = document.querySelectorAll(".compact-skill-card");

    if ("IntersectionObserver" in window) {
        const skillObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const progressBars = entry.target.querySelectorAll(".progress span");
                        progressBars.forEach(function (bar) {
                            const progressValue = bar.style.getPropertyValue("--progress");
                            bar.style.width = progressValue || "0%";
                        });
                        skillObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        skillCards.forEach(function (card) {
            skillObserver.observe(card);
        });
    }

    /* =========================================================
       3. INTERACTIVE 3D TILT EFFECT ON PROJECTS
       ========================================================= */
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        });
    });

    /* =========================================================
       4. CONTACT FORM INTEGRATION (UNTOUCHED BACKEND CONNECTION)
       ========================================================= */
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const nameElement = document.getElementById("name");
            const emailElement = document.getElementById("email");
            const subjectElement = document.getElementById("subject");
            const messageElement = document.getElementById("message");
            const formMessage = document.getElementById("formMessage");

            const name = nameElement ? nameElement.value.trim() : "";
            const email = emailElement ? emailElement.value.trim() : "";
            const subject = subjectElement ? subjectElement.value.trim() : "";
            const message = messageElement ? messageElement.value.trim() : "";

            if (!name || !email || !message) {
                if (formMessage) {
                    formMessage.textContent = "Please fill in all required fields.";
                }
                return;
            }

            if (formMessage) {
                formMessage.textContent = "Sending message...";
            }

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
                    if (formMessage) {
                        formMessage.textContent = "✓ Message sent successfully!";
                    }
                    contactForm.reset();
                } else {
                    if (formMessage) {
                        formMessage.textContent = result.message || "Something went wrong.";
                    }
                }
            } catch (error) {
                console.error("Contact form error:", error);
                if (formMessage) {
                    formMessage.textContent = "Unable to connect to the server.";
                }
            }
        });
    }

    /* =========================================================
       5. SECTION SCROLL REVEAL & NAVIGATION
       ========================================================= */
    const sections = document.querySelectorAll(".section, .soft-section");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.12 }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    const allSections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#navMenu a");

    function updateActiveNavigation() {
        let current = "";
        allSections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();
});