const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "386c029f677b84a725d76362de9104b4ba734d615d40a7d7e9551a5d8f2a07b2": 100,
  "28e2e3356acce8b9dc57edf73689b773d729347f134c06e8bcff8a38f766ffd4": 50,
  "e158299e3f73b4387ae1a20a7c2506aed69b72b8a8ef9e9f422bb1e4adf4cc34": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

// 386c029f677b84a725d76362de9104b4ba734d615d40a7d7e9551a5d8f2a07b2
// 8e2e3356acce8b9dc57edf73689b773d729347f134c06e8bcff8a38f766ffd4
// e158299e3f73b4387ae1a20a7c2506aed69b72b8a8ef9e9f422bb1e4adf4cc34