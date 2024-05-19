const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("./config");
const userModel = require("./models/users")

const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors(
  {
    origin:["https://stock-watchlist-brown.vercel.app","http://localhost:3000","https://stock-monitoring.vercel.app","http://localhost:5173"],
    methods:["GET","POST"],
    credentials:true
  }
));

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      res.status(401).json({ message: "User already exists" });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = new userModel({ name, email, password: hash });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.status(200).json({ message: "success", name: user.name });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/add_stock", async (req, res) => {
  const { email, name, symbol } = req.body;
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      { $push: { stocks: { name, symbol } } },

    );
    res.status(200).json("successful");
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/delete_stock", async (req, res) => {
  const { email,symbol } = req.body;
  try {
    await userModel.findOneAndUpdate(
      { email: email },
      { $pull: { stocks: { symbol: symbol } } }
    );
    res.status(200).json("successful");
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/get_stocks", async (req, res) => {
  
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    // console.log(user);
    if (user) {
      res.status(200).json(user.stocks);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting stocks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/select_stock", async (req, res) => {
  const { email, symbol } = req.body;
  console.log(email,symbol);
  try {
    const user = await userModel.findOneAndUpdate(
      { email: email },
      { $set: { curStock: symbol } },
      { new: true }
    );
    if (user) {
      res.status(200).json({ message: "Stock selected successfully", curStock: user.curStock });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error selecting stock:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/get_selected_stock", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    // console.log(user);
    if (user) {
      res.status(200).json({ curStock: user.curStock });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting selected stock:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/",(_,res)=>{
  res.send("Welcom");
})

app.listen(8000);
