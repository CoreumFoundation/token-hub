# Smart Tokens on Coreum

![Smart](./public/images/smart.png)


# Smart Tokens on the Coreum Network

Smart tokens on the Coreum network empower enterprises to establish predefined behaviors and deterministic gas fees for specific tokens. This streamlines the execution of contract-like functions directly on the blockchain's storage layer.

## Table of Contents
1. [Create](#create)
   - [Fungible Tokens](#fungible-tokens)
   - [Non-Fungible Tokens](#non-fungible-tokens)
2. [Send](#send)
   - [Fungible Tokens](#sending-fungible-tokens)
   - [Non-Fungible Tokens](#sending-non-fungible-tokens)
3. [Manage](#manage)
4. [Token Features](#token-features)

## Create

### Fungible Tokens (FTs)
Your Fungible Tokens will inherit features that dictate their behavior:
- **Symbol:** TOKEN
- **Subunit:** utoken
- **Precision:** 0
- **Initial Amount:** 0
- **URL:** [http://example.com](http://example.com)
- **Description:** Enter Token Description
- **Burn Rate:** 0
- **Send Commission Rate:** 0

### Non-Fungible Tokens (NFTs)
Your Non-Fungible Tokens will be part of a collection that defines their behavior. Post creation, you can mint NFTs and transfer them:
- **Name:** Collection Name
- **Symbol:** TOKEN
- **URI:** ipfs://
- **URI Hash:** Enter CID
- **Description:** Enter token description
- **Royalties:** 0

## Token Features

- **Minting (FTs):** Allows the issuer to mint additional tokens.
- **Burning:** Enables token holders to destroy their tokens. For NFTs, the issuer has the exclusive right to burn.
- **Freezing:** Allows the issuer to freeze transactions up to a specified amount for FTs, or any NFT within a class.
- **Whitelisting:** Requires accounts to be approved by the issuer to receive tokens or hold specific NFTs.
- **IBC:** Enables token transfer across IBC-enabled chains; if disabled, the token remains within the Coreum blockchain.
- **Block Smart Contract:** Restricts tokens to be sent only to regular user addresses, not to smart contracts.
- **Disable Sending (NFTs):** Prevents direct transfers of NFTs between users, encouraging the use of a DEX to ensure royalty payments to creators.
- **Soulbound (NFTs):** NFTs cannot be transferred except by the issuer, ideal for user-specific tokens.

## Send

Send your tokens to a wallet. Note that once sent, tokens cannot be reclaimed unless returned by the receiver:
- **Amount:** 0.00
- **Max Available:** 0.000000 COREUM
- **Destination Chain:** Coreum
- **Destination Address:** Enter Destination Address
- **Fee:** ~0.000000 COREUM
- **Estimated Time:** 1 - 3 minutes

### Sending Non-Fungible Tokens
- **NFT:** Select the NFT
- **Destination Chain:** Coreum
- **Destination Address:** Enter Destination Address

## Manage

View and manage the Smart Tokens you own. Connect your wallet to access and administer your assets through a public REST server that provides various endpoints for querying blockchain data.


## Next + Netlify Starter

[![Netlify Status](https://api.netlify.com/api/v1/badges/46648482-644c-4c80-bafb-872057e51b6b/deploy-status)](https://app.netlify.com/sites/next-dev-starter/deploys)

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Installation options

**Option one:** One-click deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/CoreumFoundation/token-hub)

**Option two:** Manual clone

1. Clone this repo: `git clone https://github.com/CoreumFoundation/token-hub.git`
2. Navigate to the directory and run `npm install`
3. Run `npm run dev`
4. Make your changes
5. Connect to [Netlify](https://url.netlify.com/Bk4UicocL) manually (the `netlify.toml` file is the one you'll need to make sure stays intact to make sure the export is done and pointed to the right stuff)


# Next + Vercel Starter

**Option one:** One-click deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCoreumFoundation%2Ftoken-hub)

**Option two:** Manual clone
1. Clone this repo: `git clone https://github.com/CoreumFoundation/token-hub.git`
2. Navigate to the directory and run `npm install`
3. Run `npm run dev`
4. Make your changes
5. Connect to [Vercel](https://vercel.com/) manually (the `netlify.toml` file is the one you'll need to make sure stays intact to make sure the export is done and pointed to the right stuff)

## Testing

### Included Default Testing

We’ve included some tooling that helps us maintain these templates. This template currently uses:

- [Renovate](https://www.mend.io/free-developer-tools/renovate/) - to regularly update our dependencies
- [Cypress](https://www.cypress.io/) - to run tests against how the template runs in the browser
- [Cypress Netlify Build Plugin](https://github.com/cypress-io/netlify-plugin-cypress) - to run our tests during our build process

If your team is not interested in this tooling, you can remove them with ease!

## Conclusion

This document offers a comprehensive overview of the creation, sending, and management of Smart Tokens on the Coreum network. By leveraging the capabilities detailed above, enterprises can harness the power of blockchain technology to enforce custom behaviors and enhance their token functionalities. These advanced features allow for improved operational efficiency, precise control over token dynamics, and enhanced security measures. Additionally, the integration with Netlify facilitates a seamless development experience, enabling quick deployment and robust testing of blockchain applications. This combination empowers businesses to innovate rapidly while maintaining high standards of performance and reliability in their blockchain endeavors.
