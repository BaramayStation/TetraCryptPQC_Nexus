
# TetraCryptPQC Rust Implementation

This directory contains the Rust implementation of post-quantum cryptographic algorithms for TetraCryptPQC.

## Planned Features

- ML-KEM (Kyber) key encapsulation mechanism
- SLH-DSA (Dilithium) signature scheme
- Falcon signature scheme
- BIKE key encapsulation mechanism
- ChaCha20-Poly1305 encryption
- ZK-STARK proof generation and verification
- Security threat scanning
- Compliance report generation

## Implementation Plan

1. Create Rust crate with necessary dependencies:
   - `pqcrypto` for post-quantum algorithms
   - `chacha20poly1305` for symmetric encryption
   - `actix-web` for API server
   - `serde` for serialization

2. Implement cryptographic primitives as a Rust library

3. Create REST API server to expose cryptographic functions

4. Package as a standalone executable or WebAssembly module

## Getting Started

This is a placeholder for the Rust implementation. When implementing the actual Rust backend:

```bash
# Create new Rust project
cargo new tetracrypt-pqc

# Add dependencies
cd tetracrypt-pqc
cargo add pqcrypto chacha20poly1305 actix-web serde

# Build the project
cargo build --release
```

## API Design

The Rust API server will expose the following endpoints:

- `POST /api/key/mlkem` - Generate ML-KEM keypair
- `POST /api/key/slhdsa` - Generate SLH-DSA keypair
- `POST /api/key/falcon` - Generate Falcon keypair
- `POST /api/key/bike` - Generate BIKE keypair
- `POST /api/sign` - Sign a message
- `POST /api/verify` - Verify a signature
- `POST /api/encrypt` - Encrypt data
- `POST /api/decrypt` - Decrypt data
- `POST /api/zk/generate` - Generate ZK proof
- `POST /api/scan` - Scan for security threats
- `POST /api/compliance` - Generate compliance report

The TypeScript application will communicate with these endpoints through the bridge module.
