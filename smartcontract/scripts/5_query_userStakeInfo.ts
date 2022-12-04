import { ethers } from "hardhat";
import { RewardToken, StakingManager, LPFactory } from "../typechain";

async function main() {
    
    const LP1Address = process.env.LP1 || "";
    const StakingManagerAddress = process.env.STAKINGMANAGER || "";
    const [addr1, addr2] = await ethers.getSigners();
    
    let stakingManager_contract = await ethers.getContractFactory("StakingManager");
    let lpFactory_contract = await ethers.getContractFactory("LPFactory");

    let stakingManager = await stakingManager_contract.attach(StakingManagerAddress);
    let lp1 = await lpFactory_contract.attach(LP1Address);

    console.log(`${addr1.address} Staked: ${await stakingManager.getStaked(0)}`);
    console.log(`${addr1.address} Rewards: ${await stakingManager.getTotalRewards(0)}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});
