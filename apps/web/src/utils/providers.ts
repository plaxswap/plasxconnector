import { createPublicClient, http } from 'viem'
import { bsc, polygon } from 'viem/chains'

export const BSC_PROD_NODE = process.env.NEXT_PUBLIC_NODE_PRODUCTION || 'https://polygon.llamarpc.com'

export const bscRpcProvider = createPublicClient({
  transport: http(BSC_PROD_NODE),
  chain: bsc,
})

export const polygonRpcProvider = createPublicClient({
  transport: http(BSC_PROD_NODE),
  chain: polygon,
})
