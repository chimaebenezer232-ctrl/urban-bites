// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


// CLOSE MENU AFTER CLICKING A LINK

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Open navigation menu");

    });

});

// SCROLL ANIMATIONS

const revealElements = document.querySelectorAll(
    ".about, .food-card, .gallery-item, .contact-content"
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(
    function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(function (element) {
    observer.observe(element);
});

// WHATSAPP FOOD ORDERING WITH QUANTITY

const orderButtons = document.querySelectorAll(".order-button");

orderButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const foodCard = button.closest(".food-card");

        const foodName = button.dataset.food;

        const foodPrice = Number(button.dataset.price);

        const quantityInput = foodCard.querySelector(".quantity-input");

        const quantity = Number(quantityInput.value);

        if (!Number.isInteger(quantity) || quantity < 1) {
            alert("Please enter a valid quantity.");
            return;
        }

        const totalPrice = foodPrice * quantity;

        const message = `Hello Urban Bites! I would like to order:

Food: ${foodName}
Price: ₦${foodPrice.toLocaleString("en-NG")}
Quantity: ${quantity}
Total: ₦${totalPrice.toLocaleString("en-NG")}`;

        const phoneNumber = "2348118058969";

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

    });

});