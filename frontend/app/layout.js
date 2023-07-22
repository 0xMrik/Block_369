"use client"
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet, sepolia
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: 'LLTWC1m79oaBWtalEdxW_Tjb2IJ6NJ2N' }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Block369',
  projectId: '9f8620e2c37a317b8493ba7537c3aba7',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/50153/block369/version/latest',
  cache: new InMemoryCache(),
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <ApolloProvider client={client}>
              <ChakraProvider>
                {children}
              </ChakraProvider>
            </ApolloProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}