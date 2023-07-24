import { gql } from "@apollo/client";

export const GET_OWNED_NFTS = gql`
  query GetOwnedNFTs($owner: String!) {
    nfts(where: { to: $owner }) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;

export const GET_OWNED_LISTED_NFTS = gql`
query GetOwnedListedNFTs($owner: String!) {
  nfts(
    where: {
      to: "${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}"
      from: $owner 
    }
  ) {
    id
    from
    to
    tokenURI
    price
  }
}
`;

export const GET_LISTED_NFTS = gql`
  query GetListedNFTs($currentAddress: String!) {
    nfts(
      where: {
        to: "${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}"
        from_not: $currentAddress
      }
    ) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;