const express = require("express");
const router = express.Router();
const cors = require("cors");
// Pensez à cacher votre clef privée dans votre .env
const stripe = require("@stripe/stripe-js")(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

router.post("/payment", async (req, res) => {
  try {
    // On crée une intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      // Montant de la transaction
      amount: 2000,
      // Devise de la transaction
      currency: "usd",
      // Description du produit
      description: "La description du produit",
    });
    // On renvoie les informations de l'intention de paiement au client
    res.json(paymentIntent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
