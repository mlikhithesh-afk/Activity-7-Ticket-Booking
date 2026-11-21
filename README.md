# Ticket Booking System — Activity 7

A polished, responsive IPL ticket-booking demonstration built to explore JavaScript DOM selectors, HTML selector forms, event listeners, input validation, and live calculations.

## Activity objective

Use JavaScript DOM selectors and form controls to read user selections, validate ticket quantity, calculate a live booking total, and update the page without reloading it.

## Features

- Dark, stadium-inspired interface with responsive navigation and an illustrated hero.
- Four RCB home-fixture match cards, each with a working **Book Now** button.
- Match and stand dropdowns, plus a quantity input limited to 1–10 tickets.
- Live booking summary with ticket price, subtotal, and total.
- Accessible toast notifications for selection changes and demo booking confirmation.
- Explicit frontend-demo messaging: no real tickets or payment are processed.
- Reduced-motion support, keyboard focus styling, semantic sections, and form labels.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

The Google Fonts import is optional; the page falls back to system sans-serif fonts if the font service is unavailable.

## Project structure

```text
Activity-7-Ticket-Booking/
├── index.html
├── style.css
├── app.js
├── README.md
└── .gitignore
```

## Run with VS Code Live Server

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Choose a match, stand, and ticket quantity; the booking summary updates as you make changes.

The project also works by opening `index.html` directly in a modern browser.

## How selector forms work

The match and stand controls are native HTML `<select>` elements, and the ticket count is a number input. `app.js` reads the selected controls with `document.getElementById()` and `document.querySelector()`. `change` listeners react to match and stand changes; an `input` listener validates and reacts to quantity changes. Match-card buttons select the corresponding match and scroll to the booking form.

## Price calculation

Each stand option carries its price per ticket in a `data-price` attribute. The app multiplies that price by the validated quantity:

```text
subtotal = ticket price × ticket quantity
total = subtotal
```

There are no additional fees in this frontend demonstration. For example, Premium Stand at ₹1,500 × 3 tickets = ₹4,500.

## Screenshots

_Add screenshots of the desktop and mobile layouts here._

## GitHub repository

Repository: `Activity-7-Ticket-Booking`

URL: https://github.com/mlikhithesh-afk/Activity-7-Ticket-Booking
