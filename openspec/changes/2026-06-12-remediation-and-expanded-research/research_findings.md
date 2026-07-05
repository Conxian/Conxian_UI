# Research Findings: Cross-Chain Interoperability & Institutional DeFi (Updated July 2026)

## 1. Bitcoin & Stacks (sBTC)
- **Security Model**: sBTC uses a decentralized 2-way peg secured by a 70% threshold of reputable signers.
- **Finality**: Stacks and sBTC state automatically fork with Bitcoin, ensuring 100% Bitcoin Finality.
- **Deposit Timeline**: Requires 3 Bitcoin blocks (~30 mins) before sBTC is minted on Stacks.
- **Clarity Integration**:
    - Contracts use `contract-call?` to the sBTC token contract (e.g., `SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token`).
    - Standard functions: `transfer`, `get-balance`.
    - Supports `restrict-assets?` for fine-grained asset control during execution.

## 2. BitVM (BitVM2 & BitVM3)
- **BitVM2 Architecture**: Optimistic bridge with Groth16 SNARK verification on BN254.
- **Chunking Strategy**: Splitting verification into 364 independent taps (1 validating tap for arithmetic, 363 hashing taps for state chain) to fit within Bitcoin's script limits.
- **BitVM3 Improvements**: Uses Garbled Circuits and BitHash, reducing dispute costs by ~3000x and improving verifier efficiency.

## 3. RGB Protocol (v0.11.1 vs v0.12)
- **Production Status**: RGB v0.11.1 is the institutional standard (supported by Tether). v0.12 is experimental.
- **Client-Side Validation**: State transitions are validated by the client (consignments) rather than global consensus.
- **Consensus Upgrades**:
    - **Fast-Forward (Ffv)**: Soft-fork equivalent at contract level. New rules valid for updated wallets, old wallets ignore.
    - **Push-Back**: Hard-fork equivalent, requires asset reissuance.
- **Commitment Schemes**: Uses `Opret` and `Tapret` for deterministic commitments in Bitcoin transactions.

## 4. Institutional Auth & Identity (Better Auth)
- **Passkey (WebAuthn)**: Better Auth supports passkeys natively via `@better-auth/passkey`.
- **Passkey-First Registration**: `requireSession: false` allows registration without an existing session, using a `resolveUser` callback for account creation.
- **Extensions**: Supports WebAuthn extensions (PRF, credProps, largeBlob) for advanced security.
- **TEE/HSM Mapping**: Identity mapping from Passkey to TEE/HSM-stored keys is achieved through `clientExtensionResults` and secure context resolution.

## 5. Bridging & Interoperability
- **xReserve**: Standard for bridging assets like USDC from Ethereum to Stacks.
- **Chainhooks**: Canonical way to monitor on-chain events and trigger automated extraction/payouts (Sovereign Tax).
- **Fee Estimation**: `fetchFeeEstimate` from `@stacks/transactions` is essential for institutional predictability.
