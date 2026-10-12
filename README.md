# KURGAN Meat Catalog

Responsive product catalogue with category filters and a client-side shopping cart. Built with vanilla JavaScript, HTML and CSS.

## Task

Show a food catalogue with product details and prices, and allow visitors to assemble a cart on desktop and mobile.

## Technical solution

Product data is kept in a JavaScript array. Category filtering, cart quantities and price totals are handled in the browser. Cart quantities persist in localStorage; no application server is required for the catalogue interactions.

## Implementation

- Separate home and catalogue pages with a Vercel rewrite for `/catalog`.
- Category filters for product groups and dietary categories.
- Cart drawer, item quantity controls, totals and a mobile cart bar.
- Checkout reveals the listed contact phone number. It does not place an order or process payment.
- Cart state is guarded against invalid localStorage contents.

## Stack

Vanilla JavaScript · HTML · CSS · localStorage · Vercel

## Run locally

Open `index.html` in a local static server. The catalogue route expects root-based paths; Vite is not required.

## Live demo

[https://kurgan-meat.vercel.app](https://kurgan-meat.vercel.app)
