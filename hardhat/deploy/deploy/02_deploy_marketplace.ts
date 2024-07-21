import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("YourContract", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  const yourContract = await hre.ethers.getContract<Contract>("YourContract", deployer);
  console.log("👋 Initial greeting:", await yourContract.greeting());

  await deploy("MyNFT", {
    from: deployer,
    log: true,
  });

  const myNFT = await hre.ethers.getContract<Contract>("MyNFT", deployer);
  console.log("MyNFT deployed at:", myNFT.address);

  await deploy("NFTMarketplace", {
    from: deployer,
    log: true,
  });

  const nftMarketplace = await hre.ethers.getContract<Contract>("NFTMarketplace", deployer);
  console.log("NFTMarketplace deployed at:", nftMarketplace.address);
};

deployContracts.tags = ["YourContract", "MyNFT", "NFTMarketplace"];

export default deployContracts;
