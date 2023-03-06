// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51MhF9tEL5MdopOTtgJRP0zQaF4TfXe9ms3oayWvkTbbEwGAEBrKvPWfeg246syyaNcwOH1fyIOA4QdDQfkScIrYG00R98LK3IH"
);
const express = require("express");
const app = express();
app.use(express.static("public"));
import Cart from "../../client/features/cart";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});
