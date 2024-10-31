const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

// Simuler une base de données d'utilisateurs
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Route pour obtenir tous les utilisateurs
app.get("/users", (req, res) => {
  res.json(users);
});

// Route pour obtenir un utilisateur par ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}`);
});
