# Smart Tokens on Coreum

![Smart](public/smart.png)


Smart tokens on the Coreum network enable enterprises to set predetermined behaviours and deterministic gas fees for certain tokens, facilitating the execution of contract-like functions directly on the blockchain's storage.

## Table of Contents

- [Create](#create)
- [Send](#send)
- [Manage](#manage)
- [Fungible Tokens](#fungible-tokens)
- [Non-Fungible Tokens](#non-fungible-tokens)
- [Token Features](#token-features)

## Create

### Fungible Tokens (FTs)

Your Fungible Tokens will inherit a set of features that determine their behavior.

- **Symbol**: Example: TOKEN
- **Subunit**: Example: utoken
- **Precision**: 0
- **Initial Amount**: 0
- **URL**: http://example.com
- **Description**: Enter Token Description
- **Burn Rate**: 0
- **Send Commission Rate**: 0

### Non-Fungible Tokens (NFTs)

Your Non-Fungible Tokens will be stored in a collection that defines their behavior. After creating a collection, you can mint NFTs and transfer them to others. Each collection can feature its unique set of rules and functionalities.

- **Name**: e.g. Collection Name
- **Symbol**: e.g. TOKEN
- **URI**: ipfs://
- **URI Hash**: Enter CID
- **Description**: Enter token description
- **Royalties**: 0

## Token Features

### Minting (FTs)

If the minting feature is enabled, the issuer can mint more tokens and increase the current supply of the token.

### Burning

If the burning feature is enabled, it allows token holders to burn their tokens. For NFTs, the issuer can burn their token regardless of this feature.

### Freezing

If the freezing feature is enabled on a token, the issuer of the token can freeze an account up to an amount. For NFTs, the issuer can freeze any token in that class, and a frozen token cannot be transferred until it is unfrozen by the issuer.

### Whitelisting

If the whitelisting feature is enabled, then every account that wishes to receive this token or NFT must first be whitelisted by the issuer. This feature allows the issuer to set a whitelisted limit on any account for FTs or to whitelist an account to hold a specific NFT.

### IBC

If the IBC feature is enabled, the token can be transferred over IBC to other IBC-enabled chains. If it is disabled, it can only live on the Coreum blockchain.

### Block Smart Contract

If the block smart contract feature is enabled, then the token can only be sent to regular user addresses and not smart contracts.

### Disable Sending (NFTs)

If this feature is enabled, it will prevent transferring NFTs directly between users. This might be used to force transfer of ownership via a DEX, ensuring the creator of the NFT always gets a royalty fee.

### Soulbound (NFTs)

If the soulbound feature is enabled, the NFT cannot be sent by anyone except the issuer. This is useful for NFTs created for a specific user, ensuring the NFT is not transferred to anyone else.

## Send

Depending on the features of your token, you might need to apply some actions to your token before sending it to other users. Please note, you will not be able to reclaim the assets unless the receiver sends them back to you.

- **Amount**: 0.00
- **Max Available**: 0.000000 COREUM
- **Destination Chain**: Coreum
- **Destination Address**: Enter Destination Address
- **Fee**: ~0.000000 COREUM
- **Estimated Time**: 1 - 3 minutes

### Send NFT

- **NFT**: Select the NFT
- **Destination Chain**: Coreum
- **Destination Address**: Enter Destination Address

## Manage

### View and Manage Smart Tokens

View and manage the Smart Tokens you created or own. Connect your wallet to view and manage your assets. There are many ways to get on-chain data. Here we simply query a public REST server that exposes different endpoints to query the blockchain.

## Conclusion

This document provides an overview of the creation, sending, and management of Smart Tokens on the Coreum network. By utilizing the features outlined above, enterprises can leverage the power of blockchain to enforce custom behaviors and enhance their token functionalities.
