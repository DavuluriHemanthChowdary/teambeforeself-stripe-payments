const stripe = require("stripe")("Add your stripe key");
const express = require("express");
const app = express();
app.use(express.static("."));

/// change this to our tbs domain
const YOUR_DOMAIN = "http://localhost:3000/Subscription";

const PORT = process.env.PORT || 3000;
app.get("/", (request, response) => {
  return response.send("hello");
});

app.post("/monthly-subscription", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Monthly Subscription",
            images: [
              "https://image.flaticon.com/icons/png/512/4766/4766928.png",
            ],
          },
          unit_amount: 10000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://teambeforeself-b1c79.web.app/`,
    cancel_url: `https://teambeforeself-b1c79.web.app/`,
  });
  res.redirect(303, session.url);
});

app.post("/yearly-subscription", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Yearly Subscription",
            images: [
              "https://image.flaticon.com/icons/png/512/4766/4766928.png",
            ],
          },
          unit_amount: 120000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://teambeforeself-b1c79.web.app/`,
    cancel_url: `https://teambeforeself-b1c79.web.app/`,
  });
  res.redirect(303, session.url);
});
app.listen(PORT);
