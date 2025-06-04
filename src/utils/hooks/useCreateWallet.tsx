import React from 'react'
import { userHasWallet } from "@civic/auth-web3"
import { useUser } from '@civic/auth-web3/react'
import { useConnect } from 'wagmi'


const useCreateWallet = async() => {
    const user = await useUser()
    // const { connect, connectors } = useConnect()

    // const connectWallet = () => connect({
    //     connector: connectors[0]
    // })

    if(user.user && !userHasWallet(user)) {
        await user?.createWallet()
    }

    return ""
}

export default useCreateWallet