import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

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

export const WagmiProvider = ({ children }) => (
  <WagmiConfig config={wagmiConfig}>
    {children}
  </WagmiConfig>
);