import { ChainId } from '@pancakeswap/sdk'
import { getNodeRealUrlV2 } from 'utils/nodeReal'

export const SERVER_NODES = {
  [ChainId.BSC]: [
    process.env.NEXT_PUBLIC_NODE_PRODUCTION,
    'https://rpc.ankr.com/polygon/8a211590835087845ff22ee4159e7dc636f0cce7cfb1ecc483fc0fb1cbb99599',
    'https://rpc.ankr.com/polygon/8a211590835087845ff22ee4159e7dc636f0cce7cfb1ecc483fc0fb1cbb99599',
  ].filter(Boolean),
  [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  [ChainId.ETHEREUM]: [
    getNodeRealUrlV2(ChainId.ETHEREUM, process.env.SERVER_NODE_REAL_API_ETH),
    'https://eth.llamarpc.com',
    'https://cloudflare-eth.com',
  ],
  [ChainId.GOERLI]: [
    getNodeRealUrlV2(ChainId.GOERLI, process.env.SERVER_NODE_REAL_API_GOERLI),
    'https://eth-goerli.public.blastapi.io',
  ].filter(Boolean),
} satisfies Record<ChainId, string[]>

export const PUBLIC_NODES = {
  [ChainId.BSC]: [
    process.env.NEXT_PUBLIC_NODE_PRODUCTION,
    getNodeRealUrlV2(ChainId.BSC, process.env.NEXT_PUBLIC_NODE_REAL_API_ETH),
    'https://rpc.ankr.com/polygon/8a211590835087845ff22ee4159e7dc636f0cce7cfb1ecc483fc0fb1cbb99599',
    'https://rpc.ankr.com/polygon/8a211590835087845ff22ee4159e7dc636f0cce7cfb1ecc483fc0fb1cbb99599',
  ].filter(Boolean),
  [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  [ChainId.ETHEREUM]: [
    getNodeRealUrlV2(ChainId.ETHEREUM, process.env.NEXT_PUBLIC_NODE_REAL_API_ETH),
    'https://eth.llamarpc.com',
    'https://cloudflare-eth.com',
  ].filter(Boolean),
  [ChainId.GOERLI]: [
    getNodeRealUrlV2(ChainId.GOERLI, process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI),
    'https://eth-goerli.public.blastapi.io',
  ].filter(Boolean),
} satisfies Record<ChainId, string[]>
