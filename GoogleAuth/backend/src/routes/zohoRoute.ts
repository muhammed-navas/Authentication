// ./routes/zohoRoute.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Create a router object
const router = express.Router();

// ✅ Step 1: Redirect to Zoho OAuth login
router.get("/login", (req, res) => {
  const authURL = `https://accounts.zoho.com/oauth/v2/auth?scope=AaaServer.profile.Read&client_id=${process.env.ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${process.env.ZOHO_REDIRECT_URI}`;
  res.redirect(authURL);
});

// ✅ Step 2: Callback and Token Exchange
router.get("/callback", async (req:any, res:any) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Authorization code not found in query.");
  }

  try {
    // Exchange code for token
    const tokenRes = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          code,
          client_id: process.env.ZOHO_CLIENT_ID,
          client_secret: process.env.ZOHO_CLIENT_SECRET,
          redirect_uri: process.env.ZOHO_REDIRECT_URI,
          grant_type: "authorization_code",
        },
      }
    );

    const { access_token } = tokenRes.data;

    // Fetch user info using access_token
    const profileRes = await axios.get(
      "https://accounts.zoho.com/oauth/user/info",
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    );

    const user = profileRes.data;

    res.send(
      `<h2>Zoho Login Successful!</h2><pre>${JSON.stringify(
        user,
        null,
        2
      )}</pre>`
    );
  } catch (error) {
    console.error("Zoho OAuth Error:", error.response?.data || error.message);
    res.status(500).send("Zoho authentication failed.");
  }
});

// Export the router
export default router;
