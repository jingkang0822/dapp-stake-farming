
async function main() {
    
    const [addr1, addr2] = await ethers.getSigners();
    
    const LP1Address = process.env.LP1 || "";
    const LP2Address = process.env.LP2 || "";
    const LP3Address = process.env.LP3 || "";

    let lpFactory_contract = await ethers.getContractFactory("LPFactory");
    let lp1 = await lpFactory_contract.attach(LP1Address);
    let lp2 = await lpFactory_contract.attach(LP2Address);
    let lp3 = await lpFactory_contract.attach(LP3Address);

    console.log('Transfer to');
    let transferTo = "0xb020ad8BBd4E5a68673Dd6F44823Ed5D97C84b2B";
    const amount = ethers.utils.parseEther("5000");

    await (await lp1.transfer(transferTo, amount)).wait();
    await (await lp2.transfer(transferTo, amount)).wait();
    await (await lp3.transfer(transferTo, amount)).wait();
}

async function asyncForEach(array, callback) {
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
