import { ethers, providers } from "ethers";
import abi from "../contracts/abi.json"

const bscProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/', { name: 'binance', chainId: 56 })
const contract = new ethers.Contract(process.env.REACT_APP_TOKEN_ADDRESS, abi , bscProvider)

export async function getTotalBurnt() {
    const data = await contract.totalBurnt();
    return data;
}

export async function getCurrentSupply() {
    const data = await contract.currentSupply();
    return data ? data / ("1e" + 18) : 0;
}

export async function getTotalEarnings(address) {
    const data = await contract.balanceOf(address);
    return data ? data / ("1e" + 18) : 0;
}