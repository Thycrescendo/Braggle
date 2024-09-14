const express = require("express");
const dotenv = require("dotenv");
// const morgan = require("morgan");

const colors = require("colors");
const { exec } = require("child_process");

dotenv.config({ path: "./config/config.env" });

const app = express();

//Body Parser

app.use(express.json());

app.post("/rundeploy", (req, res) => {
  const deployCommand =
    // "npx hardhat run scripts/deploy-omega.js --network sepolia";
    "npx hardhat run scripts/deploy.js --network fuji";
  ("npx hardhat run scripts/deploy-token.js --network amoy");
  ("npx hardhat run scripts/deploy-faucet.js --network amoy");

  exec(deployCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return res.status(500).send("Error deploying");
    }
    const contractAddress = stdout.trim();
    console.log(contractAddress);

    res.status(200).send("Deployment successful");
  });
});

app.post("/runverify", (req, res) => {
  const deployCommand =
    "npx hardhat run scripts/verify-token.js --network sepolia";

  exec(deployCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return res.status(500).send("Error deploying");
    }
    console.log(`Deploy output: ${stdout}`);
    res.status(200).send("Deployment successful");
  });
});
//connect to database

// connectDB();

//DEV LOGGING MIDDLEWARE
// if (process.env.NODE_ENV === "development") {
//   // app.use(logger);
//   app.use(morgan("dev"));
// }

//Mount routers
// app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);