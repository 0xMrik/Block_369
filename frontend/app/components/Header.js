import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Box, Text, Button, Flex, Spacer } from "@chakra-ui/react"
import Link from 'next/link'

const Header = () => {
    return (
        <Box
            as="nav"
            p="4"
            display="flex"
            alignItems="center"
            width="100%"
            backgroundColor="gray.800"
        >
            <Link href="/" passHref>
                <Text fontSize="xl" color="white" cursor="pointer">Block 369</Text>
            </Link>
            <Flex ml="4">
                <Link href="/createNFT" passHref>
                    <Button colorScheme="blue" mr="4">Create Lease contract</Button>
                </Link>
                <Link href="/viewNFT" passHref>
                    <Button colorScheme="blue" mr="4">Marketplace</Button>
                </Link>
                <Link href="/dashboard" passHref>
                    <Button colorScheme="blue" mr="4">Dashboard</Button>
                </Link>
            </Flex>
            <Spacer />
            <ConnectButton />
        </Box>
    )
}

export default Header