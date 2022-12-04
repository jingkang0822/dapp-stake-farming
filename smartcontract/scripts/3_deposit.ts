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

    const amount = ethers.utils.parseEther("20");

    console.log(`Addr1 deposit amount: ${amount}`);
    await (await lp1.approve(StakingManagerAddress, amount)).wait();
    await stakingManager.deposit(0, amount);

    console.log(`Acc2 lp: ${await lp1.balanceOf(addr2.address)}`);
    console.log("Transfer lp to acc2");
    await (await lp1.transfer(addr2.address, amount)).wait();
    console.log(`Acc2 lp: ${await lp1.balanceOf(addr2.address)}`);

    console.log(`Deposit amount: ${amount}`);
    await (await lp1.connect(addr2).approve(StakingManagerAddress, amount)).wait();
    await stakingManager.connect(addr2).deposit(0, amount);
    console.log(`Acc2 lp: ${await lp1.balanceOf(addr2.address)}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});
