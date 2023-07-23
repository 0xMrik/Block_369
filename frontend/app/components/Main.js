"use client"
import { Flex, Text, Input, Button } from "@chakra-ui/react"
import { useAccount } from 'wagmi'


const Main = () => {

    const { isConnected } = useAccount()

    return (
        <Flex p="2rem" width="100%" height="85vh" justifyContent="center" alignItems="center">
            {isConnected ? (
                <Flex direction="column" width="100%">
                    <Flex alignItems="center" justifyContent="center" mt="2rem">
                        <Text>Bienvenue sur Block369</Text>
                        {/* <AllNFT /> */}
                    </Flex> 
                </Flex>
            ) : (
                <Flex p="2rem" justifyContent="center" alignItems="center">
                    <Text>Please connect your Wallet.</Text>
                </Flex>
            )}
        </Flex>
    )
}

export default Main