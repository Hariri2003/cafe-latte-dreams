document.addEventListener("DOMContentLoaded", function () {
    // Load Menu Items (Already exists)
    if (document.getElementById("menu-container")) {
        fetch("menu.json")
            .then(response => response.json())
            .then(data => {
                let menuContainer = document.getElementById("menu-container");
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

    // Save Contact Form Data to Local Storage
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let message = document.getElementById("message").value;

            if (name && email && message) {
                let contactData = { name, email, message };
                localStorage.setItem("contactData", JSON.stringify(contactData));

                alert("Your message has been saved!");
                contactForm.reset(); // Clear the form after submission
            } else {
                alert("Please fill out all fields.");
            }
        });

        // Load Saved Contact Data (if exists)
        let savedContact = localStorage.getItem("contactData");
        if (savedContact) {
            let data = JSON.parse(savedContact);
            document.getElementById("name").value = data.name;
            document.getElementById("email").value = data.email;
            document.getElementById("message").value = data.message;
        }
    }
});
