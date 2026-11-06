# BEAUTY GLOW

Static demo storefront for beauty products, built with HTML, CSS, and vanilla JavaScript.

## Run locally

Open `index.html` in a browser. No build step or package installation is required.

## Pages

- `index.html` — storefront home page
- `catalog.html`, `new.html`, `sale.html` — product listings
- `product.html` — product details, selected with the `id` query parameter
- `cart.html`, `checkout.html`, `favorites.html` — shopping flow
- `login.html`, `profile.html` — demo account and order history
- `about.html`, `delivery.html`, `contacts.html` — store information

## Code layout

- `css/style.css` — shared layout and responsive styles
- `js/products.js` — product data, catalog filtering, and product rendering
- `js/main.js` — shared header, footer, local storage helpers, and home page
- `js/cart.js`, `js/checkout.js`, `js/favorites.js` — shopping flow behavior
- `images/` — product and storefront imagery

This is a front-end demo: accounts, cart contents, favorites, and orders are stored in the browser's `localStorage`. It does not provide server-side accounts, persistent shared inventory, or real payment processing.
