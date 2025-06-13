"use client"
import {useState, useEffect} from 'react'
import { useUser } from "@civic/auth-web3/react"
import { useAccount } from 'wagmi'
import { Copy, Check } from 'lucide-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const CivicWallet = () => {
    const user = useUser();
    const account = useAccount()
    const [copied, setCopied] = useState(false)

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

     useEffect(() => {
        setTimeout(() => {
            setCopied(false)
        }, 2000)
     }, [copied])

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

        <CopyToClipboard 
            onCopy={() => setCopied(true)}
            text={account?.address?.toString()!}>
            <aside className={`flex items-center gap-[10px] ${!account.address && "hidden"} w-[fit-content] rounded-[15px] p-[10px] border-[1px] cursor-pointer`}>
                <h4> { `${account.address?.slice(0,5)}...${account.address?.slice(36,account.address.length-1)}` } </h4>

                {   !copied ? 
                    <Copy className='w-[15px] h-[15px]' /> 
                    : <Check className='w-[15px] h-[15px]' />
                }
            </aside>
        </CopyToClipboard>
    </aside>
  )
}

export default CivicWallet