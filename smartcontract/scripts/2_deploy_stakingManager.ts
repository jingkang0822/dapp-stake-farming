
import { ethers } from "hardhat";
import { solidityKeccak256 } from "ethers/lib/utils";
import { RewardToken, StakingManager } from "../typechain";

async function grantRewardTokenMinterRole(
    stakingManagerAddress: string,
    rewardToken: RewardToken
) {
    console.log("Grant reward token minter role...");
    
    const transaction = await rewardToken.grantRole(
        solidityKeccak256(["string"], ["MINTER_ROLE"]),
        stakingManagerAddress
    );
    return await transaction.wait();
}

async function createStakingPool(
    stakingManager: StakingManager,
    stakeTokenAddress: string
) {
    console.log(`Create staking pool: ${stakeTokenAddress} ...`);
    
    return await stakingManager.createPool(stakeTokenAddress);
}

async function main() {
    
    const LP1Address = process.env.LP1 || "";
    const LP2Address = process.env.LP2 || "";
    const LP3Address = process.env.LP3 || "";

    // Deploy RewardToken
    let rewardToken_contract = await ethers.getContractFactory("RewardToken");
    let rewardToken = await rewardToken_contract.deploy();
    await rewardToken.deployed();
    console.log("RewardToken address:", rewardToken.address);

    // Deploy Staking Manager
    let stakingManager_contract = await ethers.getContractFactory("StakingManager");
    let stakingManager = await stakingManager_contract.deploy(rewardToken.address, ethers.utils.parseEther("200"));
    await stakingManager.deployed();
    console.log("StakingManager address:", stakingManager.address);

    // Grant Reward Token Minter to Staking Manager
    await grantRewardTokenMinterRole(stakingManager.address, rewardToken);

    // Create LP Farming Pool
    await createStakingPool(stakingManager, LP1Address);
    await createStakingPool(stakingManager, LP2Address);
    await createStakingPool(stakingManager, LP3Address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});
