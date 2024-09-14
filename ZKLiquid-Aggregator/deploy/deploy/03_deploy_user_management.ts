import { DeployFunction } from "hardhat-deploy/types";

const deployUserManagement: DeployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("UserManagement", {
        from: deployer,
        log: true,
    });
};

deployUserManagement.tags = ["UserManagement"];

export default deployUserManagement;
