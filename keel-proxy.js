// keel-proxy.js (CommonJS)
const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/gh-webhook", async (req, res) => {
  const payload = req.body;

  // Normalize casing
  if (payload?.repository?.full_name) {
    payload.repository.full_name = payload.repository.full_name.toLowerCase();
  }

  if (payload?.registry_package?.namespace) {
    payload.registry_package.namespace =
      payload.registry_package.namespace.toLowerCase();
  }

  if (payload?.registry_package?.name) {
    payload.registry_package.name = payload.registry_package.name.toLowerCase();
  }

  try {
    await axios.post("https://keel.upayan.dev/v1/webhooks/github", payload, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Keel-Proxy",
      },
    });
    res.status(200).send("Forwarded to Keel");
  } catch (err) {
    console.error("Forwarding error:", err.message);
    res.status(500).send("Error forwarding to Keel");
  }
});

app.listen(8080, () => {
  console.log("Keel webhook proxy listening on :8080");
});
