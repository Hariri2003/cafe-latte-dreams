document.addEventListener("DOMContentLoaded", function () {

    /** ============================
     *  FUNCTION 1: Load Menu Items
     *  ============================ */
    if (document.getElementById("menu-container")) {
        fetch("menu.json")
            .then(response => response.json())
            .then(data => {
                let menuContainer = document.getElementById("menu-container");
                menuContainer.innerHTML = "";
                data.forEach(item => {
                    let menuItem = document.createElement("div");
                    menuItem.classList.add("menu-item");
                    menuItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p class="price">${item.price}</p>
                    `;
                    menuContainer.appendChild(menuItem);
                });
            })
            .catch(error => console.error("Error loading menu:", error));
    }

    /** ==============================
     *  FUNCTION 2: Contact Form Handling
     *  ============================== */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            if (name && email && message) {
                let contactData = { name, email, message, date: new Date().toLocaleString() };
                
                localStorage.setItem("contactData", JSON.stringify(contactData));
                alert("Your message has been saved!");
                contactForm.reset();
                loadContactData();
            } else {
                alert("Please fill out all fields.");
            }
        });

        function loadContactData() {
            let savedContact = JSON.parse(localStorage.getItem("contactData"));
            if (savedContact) {
                document.getElementById("name").value = savedContact.name;
                document.getElementById("email").value = savedContact.email;
                document.getElementById("message").value = savedContact.message;
            }
        }

        loadContactData(); // Load saved contact data on page load
    }

    /** ==============================
     *  FUNCTION 3: Reviews Handling
     *  ============================== */
    const reviewForm = document.getElementById("reviewForm");
    const reviewsContainer = document.getElementById("reviewsContainer");
    const clearReviewsBtn = document.getElementById("clearReviews");

    function loadReviews() {
        const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviewsContainer.innerHTML = "";

        if (savedReviews.length === 0) {
            reviewsContainer.innerHTML = "<p>No reviews yet. Be the first to leave a review!</p>";
        } else {
            savedReviews.forEach((review, index) => {
                let reviewItem = document.createElement("div");
                reviewItem.classList.add("review-item");
                reviewItem.innerHTML = `
                    <strong>${review.name} (${review.rating} Stars)</strong>
                    <p>${review.text}</p>
                    <small>Posted on ${review.date}</small>
                    <button class="deleteReview" data-index="${index}">Delete</button>
                `;
                reviewsContainer.appendChild(reviewItem);
            });

            document.querySelectorAll(".deleteReview").forEach(button => {
                button.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    let savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
                    savedReviews.splice(index, 1);
                    localStorage.setItem("reviews", JSON.stringify(savedReviews));
                    loadReviews();
                });
            });
        }
    }

    if (reviewForm) {
        reviewForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let reviewerName = document.getElementById("reviewerName").value.trim();
            let rating = document.getElementById("rating").value;
            let reviewText = document.getElementById("reviewText").value.trim();

            if (reviewerName && rating && reviewText) {
                let reviewData = {
                    name: reviewerName,
                    rating: rating,
                    text: reviewText,
                    date: new Date().toLocaleString()
                };

                let savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
                savedReviews.push(reviewData);
                localStorage.setItem("reviews", JSON.stringify(savedReviews));

                alert("Thank you for your review!");
                reviewForm.reset();
                loadReviews();
            } else {
                alert("Please fill out all fields.");
            }
        });
    }

    if (clearReviewsBtn) {
        clearReviewsBtn.addEventListener("click", function () {
            localStorage.removeItem("reviews");
            loadReviews();
        });
    }

    loadReviews(); // Load existing reviews on page load

    /** ==============================
     *  FUNCTION 4: Dynamic Navigation
     *  ============================== */
    function highlightActivePage() {
        let navLinks = document.querySelectorAll("nav ul li a");
        let currentPath = window.location.pathname.split("/").pop();

        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    highlightActivePage();
});
/** ==============================
 *  FUNCTION 5: Login / SignUp
 *  ============================== */

// SIGN UP MULTIPLE USERS
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;

        if (email && password) {
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if user already exists
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                document.getElementById("signupMessage").textContent = "Email already registered.";
                return;
            }

            // Add new user
            users.push({ email, password });
            localStorage.setItem("users", JSON.stringify(users));
            document.getElementById("signupMessage").textContent = "Account created successfully!";
            signupForm.reset();
        } else {
            document.getElementById("signupMessage").textContent = "Please fill in all fields.";
        }
    });
}


// LOGIN ANY USER
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            alert("You are successfully signed in!");
            window.location.href = "index.html"; // Redirect to home page
        } else {
            document.getElementById("loginMessage").textContent = "Invalid email or password.";
        }
    });
}

