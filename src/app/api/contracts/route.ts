import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { allContracts } from "@/constants";

const { fundsVault } = allContracts

export const GET = async(req: NextApiRequest, res: NextApiResponse) => {
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL)
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)
    const contract = new ethers.Contract(fundsVault.address, fundsVault.abi, signer);
    const holdings = await contract.getHoldings();

    console.log("holdings", holdings)
    res.status(200).json({ contract });
    
}