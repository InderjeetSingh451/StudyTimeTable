const axios = require("axios");

module.exports = async function sendEmail(to, subject, text) {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Study Planner",
          email: "study.plainer@gmail.com",
        },
        to: [{ email: to }],
        subject,
        textContent: text,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );
  } catch (err) {
    console.error("Email send failed:", err.response?.data || err.message);
    throw err;
  }
};

