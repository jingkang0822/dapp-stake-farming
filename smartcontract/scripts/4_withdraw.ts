import { ethers } from "hardhat";
import { RewardToken, StakingManager, LPFactory } from "../typechain";

async function main() {
    
    const LP1Address = process.env.LP1 || "";
    const RwardsTokenAddress = process.env.REWARDSTOKEN || "";
    const StakingManagerAddress = process.env.STAKINGMANAGER || "";
    const [addr1, addr2] = await ethers.getSigners();
    
    let lpFactory_contract = await ethers.getContractFactory("LPFactory");
    let rewardToken_contract = await ethers.getContractFactory("RewardToken");
    let stakingManager_contract = await ethers.getContractFactory("StakingManager");

    let lp1 = await lpFactory_contract.attach(LP1Address);
    let rewardToken = await rewardToken_contract.attach(RwardsTokenAddress);
    let stakingManager = await stakingManager_contract.attach(StakingManagerAddress);

    console.log(`${addr1.address} LP1 balance: ${await lp1.balanceOf(addr1.address)}`);
    console.log(`${addr1.address} Rewards balance: ${await rewardToken.balanceOf(addr1.address)}`);

    let tx = await stakingManager.withdraw(0);
    let receipt = await tx.wait();

    console.log(`${addr1.address} LP1 balance: ${await lp1.balanceOf(addr1.address)}`);
    console.log(`${addr1.address} Rewards balance: ${await rewardToken.balanceOf(addr1.address)}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});
