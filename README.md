# 🧠 Coreum TokenHub 🌐🔗

![Smart](./public/images/smart.png)


# 🌐 Smart Tokens on the Coreum Network

The Coreum TokenHub empowers enterprises and users alike to create and manage Smart Tokens. With predefined behaviors and deterministic gas fees, tokens issued on Coreum are able to execute advanced, contract-like functions directly on the blockchain. The platform provides a robust framework for token management, offering flexibility and control to meet diverse business, user, and community needs.

## 📑 Table of Contents
1. [Create](#create)
   - [Fungible Tokens](#fungible-tokens-fts)
   - [Non-Fungible Tokens](#non-fungible-tokens-nfts)
2. [Send](#send)
   - [Fungible Tokens](#sending-fungible-tokens)
   - [Non-Fungible Tokens](#sending-non-fungible-tokens)
3. [Token Features](#token-features)
4. [Manage](#manage)


## 🛠️ Create

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

### 🎨 Non-Fungible Tokens (NFTs)
Your Non-Fungible Tokens will be part of a collection that defines their behavior. Post creation, you can mint NFTs and transfer them:
- **Name:** Collection Name
- **Symbol:** TOKEN
- **URI:** ipfs://
- **URI Hash:** Enter CID
- **Description:** Enter token description
- **Royalties:** 0

## 🌟 Token Features

- **Minting (FTs):** 🪙 Allows the issuer to mint additional tokens.
- **Burning:** 🔥 Enables token holders to destroy their tokens. For NFTs, the issuer has the exclusive right to burn.
- **Freezing:** ❄️ Allows the issuer to freeze transactions up to a specified amount for FTs, or any NFT within a class.
- **Whitelisting:** 📋 Requires accounts to be approved by the issuer to receive tokens or hold specific NFTs.
- **IBC:** 🌉 Enables token transfer across IBC-enabled chains; if disabled, the token remains within the Coreum blockchain.
- **Block Smart Contract:** 🚫 Restricts tokens to be sent only to regular user addresses, not to smart contracts.
- **Disable Sending (NFTs):** 🛑 Prevents direct transfers of NFTs between users, encouraging the use of a DEX to ensure royalty payments to creators.
- **Soulbound (NFTs):** 🧬 NFTs cannot be transferred except by the issuer, ideal for user-specific tokens.

## 📤 Send

Send your tokens to a wallet. Note that once sent, tokens cannot be reclaimed unless returned by the receiver:
- **Amount:** 0.00
- **Max Available:** 0.000000 COREUM
- **Destination Chain:** Coreum
- **Destination Address:** Enter Destination Address
- **Fee:** ~0.000000 COREUM
- **Estimated Time:** 1 - 3 minutes

### 🔄 Sending Non-Fungible Tokens
- **NFT:** Select the NFT
- **Destination Chain:** Coreum
- **Destination Address:** Enter Destination Address

## 📊 Manage

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

# Disclaimer

The information provided on this platform is for general informational purposes only. Coreum TokenHub facilitates the creation, sending, and management of Smart Tokens on the Coreum network. However, Coreum does not assume any responsibility or liability for the implications, financial outcomes, legal consequences, or any other impact resulting from the use of this service, including but not limited to token generation events.

## Key Points:

- **No Endorsement**: Coreum does not endorse, sponsor, or validate any tokens created using the Coreum TokenHub. The creation and management of tokens are performed at the discretion and risk of the user.
  
- **User Responsibility**: Users are solely responsible for ensuring that their activities comply with all applicable laws, regulations, and guidelines. Coreum does not provide legal, financial, or professional advice.
  
- **No Liability**: Coreum shall not be held liable for any loss, damage, or harm arising from the use of the Coreum TokenHub, including but not limited to financial losses, legal actions, or regulatory penalties.
  
- **Security and Risks**: Users acknowledge the inherent risks associated with blockchain technology, including but not limited to security vulnerabilities, technological failures, and potential misuse of tokens. Users should conduct their own due diligence and take necessary precautions.
  
- **Feature Use**: The features provided by Coreum TokenHub, such as minting, burning, freezing, and whitelisting, are tools to be used at the user's discretion. Coreum does not guarantee the successful implementation or intended outcome of these features.

By using the Coreum TokenHub, you agree to release Coreum from any and all liability related to your use of the platform. This disclaimer is subject to change without notice.


