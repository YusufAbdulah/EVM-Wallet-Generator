# 🔑 EVM Wallet Bulk Generator

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Ethereum-EVM-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white" alt="Ethereum">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Created%20By-Yusuf%20Abdulah-purple?style=for-the-badge" alt="Author">
</p>

<p align="center">
  <b>Bulk generate EVM-compatible wallets (Ethereum, BSC, Polygon, Arbitrum, etc.) instantly from your terminal.</b>
</p>

---

## ✨ Features

- 🚀 **Bulk Generation** — Generate up to 10,000 wallets in a single batch
- 🔐 **Full Wallet Data** — Address, Private Key, Mnemonic Phrase & Derivation Path
- 📄 **Multiple Export Formats** — Save as TXT, CSV, or JSON
- 🎨 **Beautiful CLI** — Interactive terminal interface with colors & animations
- ⚡ **Fast & Lightweight** — Powered by ethers.js v6
- 🌐 **EVM Compatible** — Works with all EVM chains (ETH, BSC, Polygon, Avalanche, Arbitrum, etc.)

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/evm-wallet-generator.git
   cd evm-wallet-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the bot**
   ```bash
   npm start
   ```

## 📖 Usage

### Interactive Mode

Simply run the bot and follow the interactive prompts:

```bash
node index.js
```

You will be presented with a menu:
- **🔑 Generate Wallets** — Start generating wallets
- **📂 View Saved Files** — View previously generated wallet files
- **❌ Exit** — Exit the application

### Generation Options

1. **Number of wallets** — Enter how many wallets you want to generate (1 - 10,000)
2. **Save format** — Choose your preferred export format:
   - 📄 **TXT** — Human-readable text file
   - 📊 **CSV** — Spreadsheet compatible (Excel, Google Sheets)
   - 📋 **JSON** — Structured data for developers
   - ❌ **Don't save** — Display only, without saving

## 📁 Output

Generated wallets are saved in the `wallets/` directory with the following data:

| Field | Description |
|-------|-------------|
| **Address** | Public EVM wallet address (0x...) |
| **Private Key** | Secret key for signing transactions |
| **Mnemonic** | 12-word recovery phrase (BIP-39) |
| **Derivation Path** | HD wallet path (m/44'/60'/0'/0/0) |

## 📂 Project Structure

```
evm-wallet-generator/
├── index.js          # Main application
├── package.json      # Dependencies & scripts
├── .gitignore        # Git ignore rules
├── README.md         # Documentation
└── wallets/          # Generated wallet files (git-ignored)
```

## ⚠️ Security Warning

> **IMPORTANT:** Your private keys and mnemonic phrases are extremely sensitive!
> 
> - 🔒 **NEVER** share your private keys or mnemonics with anyone
> - 🔒 **NEVER** commit wallet files to public repositories
> - 🔒 Store generated files in a secure, encrypted location
> - 🔒 The `wallets/` directory is git-ignored by default for your safety

## 🛠️ Tech Stack

- **[ethers.js](https://docs.ethers.org/)** — Ethereum library for wallet generation
- **[chalk](https://github.com/chalk/chalk)** — Terminal string styling
- **[inquirer](https://github.com/SBoudrias/Inquirer.js)** — Interactive CLI prompts
- **[ora](https://github.com/sindresorhus/ora)** — Elegant terminal spinners
- **[figlet](https://github.com/patorjk/figlet.js)** — ASCII art text
- **[cli-table3](https://github.com/cli-table/cli-table3)** — Unicode tables for CLI

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Created by Yusuf Abdulah**

---

<p align="center">
  <i>⭐ If you find this tool useful, please give it a star! ⭐</i>
</p>
