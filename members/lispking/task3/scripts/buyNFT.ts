import { Contract, Signer } from 'ethers';
import { artifacts, ethers } from 'hardhat';
import { nftAddress, nftMarketAddress, tokenAddress } from './config';

export async function loadContract(contractName: string, contractAddr: string, deployer: Signer): Promise<Contract> {
    const artifact = await artifacts.readArtifact(contractName);
    return new Contract(contractAddr, artifact.abi, deployer);
  }

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const myToken = await loadContract('MyToken', tokenAddress, deployer);
    const nftMarket = await loadContract('NFTMarket', nftMarketAddress, deployer);

    try {
        const price = ethers.parseEther("1");

        await myToken.connect(deployer).approve(nftMarketAddress, price);
        await nftMarket.connect(deployer).buyItem(0);
    } catch (err) {
        console.log(err);
    }
}

main();
