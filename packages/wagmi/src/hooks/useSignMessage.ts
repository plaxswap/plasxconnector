import { useCallback } from 'react'
import { useAccount, useSignMessage as useSignMessageWagmi } from 'wagmi'

export function useSignMessage() {
  const { address, connector } = useAccount()
  const { signMessageAsync: sign } = useSignMessageWagmi()

  return {
    signMessageAsync: useCallback(
      async (args: { message: string }) => {
        if (connector?.id === 'bsc' && typeof window !== 'undefined' && window.BinanceChain && address) {
          const res = await window.BinanceChain.bnbSign?.(address, args.message)
          if (res) return res.signature
          return null
        }
        return sign(args)
      },
      [address, connector?.id, sign],
    ),
  }
}
