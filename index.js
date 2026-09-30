const ethers = require('ethers');
const chalk = require('chalk');
const Table = require('cli-table3');
const ora = require('ora');
const figlet = require('figlet');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

// ============================================
//  EVM Wallet Bulk Generator
//  Created by: Yusuf Abdulah
// ============================================

const WALLETS_DIR = path.join(__dirname, 'wallets');

function showBanner() {
  console.clear();
  console.log('');
  console.log(
    chalk.cyan(
      figlet.textSync('EVM Wallet', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
      })
    )
  );
  console.log(
    chalk.cyan(
      figlet.textSync('Generator', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
      })
    )
  );
  console.log('');
  console.log(
    chalk.gray('  ═══════════════════════════════════════════════════════════════')
  );
  console.log(
    chalk.white('  ██ ') +
      chalk.bold.greenBright('Bulk Generate EVM Wallets') +
      chalk.white(' ██  ') +
      chalk.gray('v1.0.0')
  );
  console.log(
    chalk.white('  ██ ') +
      chalk.yellow('Created by: ') +
      chalk.bold.magentaBright('Yusuf Abdulah') +
      chalk.white('   ██')
  );
  console.log(
    chalk.gray('  ═══════════════════════════════════════════════════════════════')
  );
  console.log('');
}

function generateWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
    path: wallet.mnemonic.path,
  };
}

function displayWalletsTable(wallets) {
  const table = new Table({
    head: [
      chalk.bold.cyan('#'),
      chalk.bold.cyan('Address'),
      chalk.bold.cyan('Private Key'),
    ],
    colWidths: [5, 46, 70],
    style: {
      head: [],
      border: ['gray'],
    },
    chars: {
      top: '═',
      'top-mid': '╤',
      'top-left': '╔',
      'top-right': '╗',
      bottom: '═',
      'bottom-mid': '╧',
      'bottom-left': '╚',
      'bottom-right': '╝',
      left: '║',
      'left-mid': '╟',
      mid: '─',
      'mid-mid': '┼',
      right: '║',
      'right-mid': '╢',
      middle: '│',
    },
  });

  wallets.forEach((w, i) => {
    table.push([
      chalk.yellow(i + 1),
      chalk.greenBright(w.address),
      chalk.gray(w.privateKey),
    ]);
  });

  console.log(table.toString());
}

async function saveToFile(wallets, format) {
  await fs.ensureDir(WALLETS_DIR);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  if (format === 'txt') {
    const filename = `wallets_${timestamp}.txt`;
    const filepath = path.join(WALLETS_DIR, filename);

    let content = '';
    content += '══════════════════════════════════════════════════════════════\n';
    content += '  EVM Wallet Generator - Bulk Generated Wallets\n';
    content += '  Created by: Yusuf Abdulah\n';
    content += `  Generated at: ${new Date().toLocaleString()}\n`;
    content += `  Total Wallets: ${wallets.length}\n`;
    content += '══════════════════════════════════════════════════════════════\n\n';

    wallets.forEach((w, i) => {
      content += `━━━━━━━━━━━━━━━━━ Wallet #${i + 1} ━━━━━━━━━━━━━━━━━\n`;
      content += `Address     : ${w.address}\n`;
      content += `Private Key : ${w.privateKey}\n`;
      content += `Mnemonic    : ${w.mnemonic}\n`;
      content += `Path        : ${w.path}\n\n`;
    });

    content += '══════════════════════════════════════════════════════════════\n';
    content += '⚠️  WARNING: Keep your private keys and mnemonics safe!\n';
    content += '    Never share them with anyone.\n';
    content += '══════════════════════════════════════════════════════════════\n';

    await fs.writeFile(filepath, content, 'utf-8');
    return filepath;
  }

  if (format === 'csv') {
    const filename = `wallets_${timestamp}.csv`;
    const filepath = path.join(WALLETS_DIR, filename);

    let content = 'No,Address,Private Key,Mnemonic,Derivation Path\n';
    wallets.forEach((w, i) => {
      content += `${i + 1},"${w.address}","${w.privateKey}","${w.mnemonic}","${w.path}"\n`;
    });

    await fs.writeFile(filepath, content, 'utf-8');
    return filepath;
  }

  if (format === 'json') {
    const filename = `wallets_${timestamp}.json`;
    const filepath = path.join(WALLETS_DIR, filename);

    const data = {
      generator: 'EVM Wallet Generator',
      author: 'Yusuf Abdulah',
      generatedAt: new Date().toISOString(),
      totalWallets: wallets.length,
      wallets: wallets.map((w, i) => ({
        id: i + 1,
        address: w.address,
        privateKey: w.privateKey,
        mnemonic: w.mnemonic,
        derivationPath: w.path,
      })),
    };

    await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
    return filepath;
  }
}

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.bold.white('Select an option:'),
      choices: [
        {
          name: chalk.greenBright('🔑  Generate Wallets'),
          value: 'generate',
        },
        {
          name: chalk.blueBright('📂  View Saved Files'),
          value: 'view',
        },
        {
          name: chalk.redBright('❌  Exit'),
          value: 'exit',
        },
      ],
    },
  ]);
  return action;
}

async function getGenerateOptions() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'count',
      message: chalk.white('How many wallets to generate?'),
      default: '10',
      validate: (val) => {
        const num = parseInt(val);
        if (isNaN(num) || num < 1) return 'Please enter a valid number (min: 1)';
        if (num > 10000) return 'Maximum 10,000 wallets per batch';
        return true;
      },
    },
    {
      type: 'list',
      name: 'format',
      message: chalk.white('Save format:'),
      choices: [
        { name: chalk.yellow('📄 TXT  - Text file'), value: 'txt' },
        { name: chalk.green('📊 CSV  - Spreadsheet compatible'), value: 'csv' },
        { name: chalk.blue('📋 JSON - Structured data'), value: 'json' },
        { name: chalk.gray('❌ Don\'t save'), value: 'none' },
      ],
    },
  ]);

  return {
    count: parseInt(answers.count),
    format: answers.format,
  };
}

async function viewSavedFiles() {
  await fs.ensureDir(WALLETS_DIR);
  const files = await fs.readdir(WALLETS_DIR);

  if (files.length === 0) {
    console.log('');
    console.log(chalk.yellow('  ⚠️  No saved wallet files found.'));
    console.log('');
    return;
  }

  console.log('');
  console.log(chalk.bold.cyan('  📂 Saved Wallet Files:'));
  console.log(chalk.gray('  ─────────────────────────────────────────────'));

  files.forEach((file, i) => {
    const filepath = path.join(WALLETS_DIR, file);
    const stats = fs.statSync(filepath);
    const size = (stats.size / 1024).toFixed(2);
    console.log(
      chalk.white(`  ${i + 1}. `) +
        chalk.greenBright(file) +
        chalk.gray(` (${size} KB)`)
    );
  });

  console.log(chalk.gray('  ─────────────────────────────────────────────'));
  console.log(chalk.gray(`  📁 Location: ${WALLETS_DIR}`));
  console.log('');
}

async function run() {
  showBanner();

  while (true) {
    const action = await mainMenu();

    if (action === 'exit') {
      console.log('');
      console.log(
        chalk.bold.cyan('  👋 Thank you for using EVM Wallet Generator!')
      );
      console.log(
        chalk.gray('  Created by: ') + chalk.bold.magentaBright('Yusuf Abdulah')
      );
      console.log('');
      process.exit(0);
    }

    if (action === 'view') {
      await viewSavedFiles();
      continue;
    }

    if (action === 'generate') {
      const options = await getGenerateOptions();
      const wallets = [];

      console.log('');
      const spinner = ora({
        text: chalk.cyan(`Generating ${options.count} EVM wallets...`),
        spinner: 'dots12',
        color: 'cyan',
      }).start();

      const startTime = Date.now();

      for (let i = 0; i < options.count; i++) {
        const wallet = generateWallet();
        wallets.push(wallet);

        if (options.count <= 100 || i % Math.floor(options.count / 100) === 0) {
          const progress = ((i + 1) / options.count * 100).toFixed(1);
          spinner.text = chalk.cyan(
            `Generating wallets... ${progress}% (${i + 1}/${options.count})`
          );
        }
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      spinner.succeed(
        chalk.greenBright(
          `Successfully generated ${options.count} wallets in ${elapsed}s`
        )
      );
      console.log('');

      // Show table preview (max 20 rows)
      const previewCount = Math.min(wallets.length, 20);
      if (wallets.length > 20) {
        console.log(
          chalk.gray(`  Showing first ${previewCount} of ${wallets.length} wallets:`)
        );
      }
      displayWalletsTable(wallets.slice(0, previewCount));

      // Save to file
      if (options.format !== 'none') {
        const saveSpinner = ora({
          text: chalk.cyan('Saving wallets to file...'),
          spinner: 'dots',
          color: 'cyan',
        }).start();

        try {
          const filepath = await saveToFile(wallets, options.format);
          saveSpinner.succeed(
            chalk.greenBright(`Wallets saved to: `) + chalk.underline.white(filepath)
          );
        } catch (err) {
          saveSpinner.fail(chalk.red(`Failed to save: ${err.message}`));
        }
      }

      // Summary
      console.log('');
      console.log(chalk.gray('  ─────────────────────────────────────────────'));
      console.log(
        chalk.bold.white('  📊 Summary')
      );
      console.log(
        chalk.white('  Total Generated : ') + chalk.greenBright(wallets.length)
      );
      console.log(
        chalk.white('  Time Elapsed    : ') + chalk.yellow(`${elapsed}s`)
      );
      console.log(
        chalk.white('  Network         : ') + chalk.cyan('EVM Compatible (ETH, BSC, Polygon, etc.)')
      );
      console.log(chalk.gray('  ─────────────────────────────────────────────'));
      console.log('');

      console.log(
        chalk.bold.red('  ⚠️  WARNING: ') +
          chalk.yellow('Keep your private keys & mnemonics safe!')
      );
      console.log(
        chalk.yellow('  Never share them with anyone. Store them securely.')
      );
      console.log('');
    }
  }
}

// Handle errors gracefully
process.on('uncaughtException', (err) => {
  console.error(chalk.red('\n  ❌ Error: ') + err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error(chalk.red('\n  ❌ Error: ') + err.message);
  process.exit(1);
});

// Run the app
run().catch(console.error);
