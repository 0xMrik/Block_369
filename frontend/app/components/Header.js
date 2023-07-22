import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Box, Text, Button, Flex, Spacer, Center } from "@chakra-ui/react"
import Link from 'next/link'

const Header = () => {
    return (
        <Box
            as="nav"
            p="4"
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
            width="100%"
            backgroundColor="gray.800"
        >
            <Text fontSize="xl" color="white" cursor="pointer">Block 369</Text>
            <Flex ml="4" >
                <Link href="/" passHref>
                    <Button colorScheme="blue" mr="4">Home</Button>
                </Link>
                <Link href="/Create" passHref>
                    <Button colorScheme="blue" mr="4">Create</Button>
                </Link>
                <Link href="/Dashboard" passHref>
                    <Button colorScheme="blue" mr="4">Dashboard</Button>
                </Link>
            </Flex>
            <ConnectButton />
        </Box>
    )
}

export default Header