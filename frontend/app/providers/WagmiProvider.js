import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: `${NEXT_PUBLIC_ALCHEMY_ID}` }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Block369',
  projectId: `${NEXT_PUBLIC_PROJECT_ID_CLOUD_CONNECT}`,
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