
import { ethers } from "hardhat";

async function main() {
    
    const LPS = JSON.parse(process.env.LP_LIST || "");

    const start = async () => {
        await asyncForEach(LPS, async (lp: any) => {
            
            console.log(`${lp.NAME} deploying...`);

            let contract = await ethers.getContractFactory("LPFactory");
            let contract_deployed = await contract.deploy(
                lp.NAME, 
                lp.SYMBOL, 
                (BigInt(lp.TOTAL_SUPPLY)).toString()
            );
            await contract_deployed.deployed();

            console.log(`${lp.NAME}, Name: ${await contract_deployed.name()}`);
            console.log(`${lp.NAME}, Symbol: ${await contract_deployed.symbol()}`);
            console.log(`${lp.NAME}, Total Supply: ${await contract_deployed.totalSupply()}`);
            console.log(`${lp.NAME}, Contract address: ${contract_deployed.address}`);
        });
    }
    await start();
}

async function asyncForEach(array: any, callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});
