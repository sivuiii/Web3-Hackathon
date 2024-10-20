const { Connection, PublicKey } = require('@solana/web3.js');
const { Telegraf } = require('telegraf');

const bot = new Telegraf('7673443224:AAHx0Der9SQuNEz2DmWre5PcbuKV7ggRmCw');

async function checkWalletBalance(walletAddress) {
  const connection = new Connection('https://api.devnet.solana.com'); // Replace with mainnet endpoint if needed
  const publicKey = new PublicKey(walletAddress);

  try {
    const balance = await connection.getBalance(publicKey);
    return balance;
  } catch (error) {
    console.error('Error checking wallet balance:', error);
    return null;
  }
}
bot.command('balance', async (ctx) => {
  const walletAddress = ctx.message.text.split('3vmsrAXUYEyryZm6pvHjHXuhJeTwMfXoiDHM83oMRCeo')[1]; // Extract wallet address from command

  if (!walletAddress) {
    ctx.reply('Please provide a valid Solana wallet address.');
    return;
  }

  const balance = await checkWalletBalance(walletAddress);

  if (balance !== null) {
    
    ctx.reply(`Your Solana wallet balance is: ${balance /  1000000000} SOL`);
  } else {
    ctx.reply('Error checking wallet balance. Please try again.');
  }
});