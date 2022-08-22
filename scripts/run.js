
    //for deploying something to the BlockChain ,We need to habe Wallet Address
    //here we have to address first one is addres of owner who is deploying smart contract
    //and other is random person-let's say if wave from any random user
    const main = async () => {
        const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
        const waveContract = await waveContractFactory.deploy();
        await waveContract.deployed();
        console.log("Contract Radhe:", waveContract.address);
      
        let waveCount;
        waveCount = await waveContract.getTotalWaves();
        console.log(waveCount.toNumber());
      
        /**
         * Let's send a few waves!
         */
        let waveTxn = await waveContract.wave("A message!");
        await waveTxn.wait(); // Wait for the transaction to be mined
      
        const [_, randomPerson] = await hre.ethers.getSigners();
        waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
        await waveTxn.wait(); // Wait for the transaction to be mined
      
        let allWaves = await waveContract.getAllWaves();
        console.log(allWaves);
      };
      
      const runMain = async () => {
        try {
          await main();
          process.exit(0);
        } catch (error) {
          console.log(error);
          process.exit(1);
        }
      };
      
      runMain();

//IMP Note
//when we run scripts/run.js (+npx hardhat stuffs) it's actually
//Creating a new Local Ethereum network
//Deploying our contract
//then ,when the script ends Hardhat will automatically destroy that local network
