import React from 'react'
import { useUser } from "@civic/auth-web3/react"
import { useAccount } from 'wagmi'
import { Copy, Check } from 'lucide-react'

const CivicWallet = () => {
    const user = useUser();
    const account = useAccount()

    const handleSignin = async() => {
        try {
           await user.signIn();
           
           console.log("signin successfully")
        } catch (error) {  
           console.log(error)
        }
     }
 
     const handleSignOut = async() => {
        try {
           await user.signOut();
           
           console.log("signOut successfully")
        } catch (error) {  
           console.log(error)
        }
     }

  return (
    <aside className='flex items-center gap-[20px]'>
        <button 
        onClick={() => {
            if(!account.address) {
                handleSignin()
            } else {
                handleSignOut()
            }
        }}
        className='rounded-[15px] border-[1px] p-[10px] min-w-[200px] bg-gradient cursor-pointer'>
            { user.isLoading ? "loading.." : account?.address?.length! > 0 ? "Sign Out" : "Sign In" }
        </button>

        <aside className={`flex items-center gap-[10px] ${!account.address && "hidden"} w-[fit-content]`}>
            <h4> { `${account.address?.slice(0,10)}...${account.address?.slice(30,account.address.length-1)}` } </h4>
            <Copy className='w-[15px] h-[15px]' />
        </aside>
    </aside>
  )
}

export default CivicWallet