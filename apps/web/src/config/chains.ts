import { ChainId } from '@pancakeswap/sdk'
import memoize from 'lodash/memoize'
import invert from 'lodash/invert'
import { polygon as bsc_, bscTestnet, goerli, mainnet, Chain } from 'wagmi/chains'

export const CHAIN_QUERY_NAME = {
  [ChainId.ETHEREUM]: 'eth',
  [ChainId.GOERLI]: 'goerli',
  [ChainId.BSC]: 'polygon',
  [ChainId.BSC_TESTNET]: 'bscTestnet',
} as const satisfies Record<ChainId, string>

const CHAIN_QUERY_NAME_TO_ID = invert(CHAIN_QUERY_NAME)

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined
  return CHAIN_QUERY_NAME_TO_ID[chainName] ? +CHAIN_QUERY_NAME_TO_ID[chainName] : undefined
})

const bsc = {
  ...bsc_,
  rpcUrls: {
    ...bsc_.rpcUrls,
    public: {
      ...bsc_.rpcUrls.public,
      http: ['https://rpc.ankr.com/polygon/8a211590835087845ff22ee4159e7dc636f0cce7cfb1ecc483fc0fb1cbb99599'],
    },
    default: {
      ...bsc_.rpcUrls.default,
      http: ['https://rpc.ankr.com/polygon/8a211590835087845ff22ee4159e7dc636f0cce7cfb1ecc483fc0fb1cbb99599'],
    },
  },
} satisfies Chain

export const CHAINS = [bsc, mainnet, bscTestnet, goerli]

/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
export const L2_CHAIN_IDS: ChainId[] = []
