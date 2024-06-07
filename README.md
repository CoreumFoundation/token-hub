# Next + Netlify Starter

[![Netlify Status](https://api.netlify.com/api/v1/badges/46648482-644c-4c80-bafb-872057e51b6b/deploy-status)](https://app.netlify.com/sites/next-dev-starter/deploys)

This is a [Next.js](https://nextjs.org/) v14 project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and set up to be instantly deployed to [Netlify](https://url.netlify.com/SyTBPVamO)!

This project is a very minimal starter that includes 2 sample components, a global stylesheet, a `netlify.toml` for deployment, and a `jsconfig.json` for setting up absolute imports and aliases. With Netlify, you'll have access to features like Preview Mode, server-side rendering/incremental static regeneration via Netlify Functions, and internationalized routing on deploy automatically.

[![Deploy CoreumFoundation/token-hub to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/CoreumFoundation/token-hub)
(If you click this button, it will create a new repo for you that looks exactly like this one, and sets that repo up immediately for deployment on Vercel)

# Next + Vercel Starter
This is a [Next.js](https://nextjs.org/) v14 project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and set up for instant deployment to [Vercel](https://vercel.com)!

This project offers a minimalistic starter kit that includes a couple of sample components, a global stylesheet, and configurations for absolute imports and aliases. By deploying on Vercel, you gain access to features like edge functions, incremental static regeneration, automatic scaling, and more, enhancing your project's performance and scalability.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCoreumFoundation%2Ftoken-hub) (If you click this button, it will create a new repo for you that looks exactly like this one, and sets that repo up immediately for deployment on Netlify)





# Smart Tokens on Coreum

![Smart](./public/images/smart.png)


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

- **Symbol**:TOKEN
- **Subunit**:utoken
- **Precision**: 0
- **Initial Amount**: 0
- **URL**: http://example.com
- **Description**: Enter Token Description
- **Burn Rate**: 0
- **Send Commission Rate**: 0

### Non-Fungible Tokens (NFTs)

Your Non-Fungible Tokens will be stored in a collection that defines their behavior. After creating a collection, you can mint NFTs and transfer them to others. Each collection can feature its unique set of rules and functionalities.

- **Name**:Collection Name
- **Symbol**: TOKEN
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

## Next + Netlify Starter

[![Netlify Status](https://api.netlify.com/api/v1/badges/46648482-644c-4c80-bafb-872057e51b6b/deploy-status)](https://app.netlify.com/sites/next-dev-starter/deploys)

This is a [Next.js](https://nextjs.org/) v14 project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and set up to be instantly deployed to [Netlify](https://url.netlify.com/SyTBPVamO)!

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

## Testing

### Included Default Testing

We’ve included some tooling that helps us maintain these templates. This template currently uses:

- [Renovate](https://www.mend.io/free-developer-tools/renovate/) - to regularly update our dependencies
- [Cypress](https://www.cypress.io/) - to run tests against how the template runs in the browser
- [Cypress Netlify Build Plugin](https://github.com/cypress-io/netlify-plugin-cypress) - to run our tests during our build process

If your team is not interested in this tooling, you can remove them with ease!

## Conclusion

This document offers a comprehensive overview of the creation, sending, and management of Smart Tokens on the Coreum network. By leveraging the capabilities detailed above, enterprises can harness the power of blockchain technology to enforce custom behaviors and enhance their token functionalities. These advanced features allow for improved operational efficiency, precise control over token dynamics, and enhanced security measures. Additionally, the integration with Netlify facilitates a seamless development experience, enabling quick deployment and robust testing of blockchain applications. This combination empowers businesses to innovate rapidly while maintaining high standards of performance and reliability in their blockchain endeavors.
