const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
const { to, subject, text } = req.body;

const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
});

try {
await transporter.sendMail({
from: `"Rancho Adamito" <${process.env.EMAIL_USER}>`,
to,
subject,
text,
});
res.status(200).send("Correo enviado");
} catch (err) {
console.error("Error al enviar:", err);
res.status(500).send("Error al enviar el correo");
}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});