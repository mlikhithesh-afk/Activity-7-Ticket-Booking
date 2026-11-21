"use strict";

const matchSelect = document.getElementById("matchSelect");
const standSelect = document.getElementById("standSelect");
const quantityInput = document.getElementById("ticketQuantity");
const bookingForm = document.querySelector("#bookingForm");
const toast = document.getElementById("toast");

const summaryElements = {
    match: document.getElementById("summaryMatch"),
    stand: document.getElementById("summaryStand"),
    ticketPrice: document.getElementById("summaryTicketPrice"),
    quantity: document.getElementById("summaryQuantity"),
    subtotal: document.getElementById("summarySubtotal"),
    total: document.getElementById("summaryTotal")
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
});

const matchNames = {
    "rcb-csk": "Royal Challengers Bengaluru vs Chennai Super Kings",
    "rcb-mi": "Royal Challengers Bengaluru vs Mumbai Indians",
    "rcb-srh": "Royal Challengers Bengaluru vs Sunrisers Hyderabad",
    "rcb-kkr": "Royal Challengers Bengaluru vs Kolkata Knight Riders"
};

const standNames = {
    general: "General Stand",
    premium: "Premium Stand",
    vip: "VIP Stand",
    pavilion: "Pavilion Stand"
};

let toastTimer;

function calculateTotal() {
    const selectedOption = standSelect.options[standSelect.selectedIndex];
    const ticketPrice = Number(selectedOption.dataset.price);
    const quantity = Number(quantityInput.value);
    return {
        ticketPrice,
        quantity,
        subtotal: ticketPrice * quantity
    };
}

function validateQuantity() {
    const parsedQuantity = Number(quantityInput.value);
    let validQuantity = Number.isFinite(parsedQuantity) ? Math.floor(parsedQuantity) : 1;

    if (validQuantity < 1) {
        validQuantity = 1;
    } else if (validQuantity > 10) {
        validQuantity = 10;
    }

    if (quantityInput.value !== String(validQuantity)) {
        quantityInput.value = String(validQuantity);
    }

    quantityInput.setCustomValidity("");
    return validQuantity;
}

function updateBookingSummary() {
    const { ticketPrice, quantity, subtotal } = calculateTotal();

    summaryElements.match.textContent = matchNames[matchSelect.value];
    summaryElements.stand.textContent = standNames[standSelect.value];
    summaryElements.ticketPrice.textContent = currencyFormatter.format(ticketPrice);
    summaryElements.quantity.textContent = String(quantity);
    summaryElements.subtotal.textContent = currencyFormatter.format(subtotal);
    summaryElements.total.textContent = currencyFormatter.format(subtotal);
}

function showToast(message) {
    if (toastTimer) {
        window.clearTimeout(toastTimer);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
        toastTimer = undefined;
    }, 3200);
}

matchSelect.addEventListener("change", () => {
    updateBookingSummary();
    showToast(`Booking summary updated · Match changed to ${matchNames[matchSelect.value]}.`);
});

standSelect.addEventListener("change", () => {
    updateBookingSummary();
    showToast(`Booking summary updated · ${standNames[standSelect.value]} selected.`);
});

quantityInput.addEventListener("input", () => {
    const quantity = validateQuantity();
    updateBookingSummary();
    showToast(`Booking summary updated · Quantity set to ${quantity} ${quantity === 1 ? "ticket" : "tickets"}.`);
});

document.querySelectorAll(".book-now-button").forEach((button) => {
    button.addEventListener("click", () => {
        matchSelect.value = button.dataset.match;
        updateBookingSummary();
        document.getElementById("ticket-booking").scrollIntoView({ behavior: "smooth" });
        showToast(`Match selected · ${matchNames[matchSelect.value]}.`);
    });
});

bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validateQuantity();

    if (!bookingForm.reportValidity()) {
        return;
    }

    updateBookingSummary();
    const { quantity, subtotal } = calculateTotal();
    showToast(`Demo booking confirmed · ${matchNames[matchSelect.value]} · ${standNames[standSelect.value]} · ${quantity} ${quantity === 1 ? "ticket" : "tickets"} · ${currencyFormatter.format(subtotal)} total. No payment was processed.`);
});

updateBookingSummary();
