const axios = require('axios');
const cron = require('node-cron');

let task;
let interval = '*/1 * * * *'; // Default to every 1 minutes

const getWhaleTransactions = async () => {
    const query = `
    {
    ethereum(network: bsc) {
        transfers(
        options: { desc: "block.height", limit: 10, offset: 0 }
        date: { since: "2023-07-15", till: "2023-07-19" }
        currency: { is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" }
        amount: { gt: 0 }
        ) {
        block {
            timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
            }
            height
        }
        sender {
            address
            annotation
        }
        receiver {
            address
            annotation
        }
        currency {
            address
            symbol
        }
        amount
        amount_usd: amount(in: USD)
        transaction {
            hash
        }
        external
        }
    }
    }
    `;
  
    const options = {
      method: 'POST',
      url: 'https://graphql.bitquery.io/',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.BITQUERY_API_KEY,
      },
      data: JSON.stringify({ query }),
    };
  
    try {
      const response = await axios(options);
      console.log('Whale Transactions:', JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      console.error('Error fetching whale transactions:', error);
    }
}
  
// Start cron job to monitor whale transactions
const startCronJob = (cronInterval) => {
    if (task) {
      task.stop();
    }
    task = cron.schedule(cronInterval, getWhaleTransactions);
    task.start();
};

async function monitorTransfer(req, res, _next) {
    const { interval: userInterval } = req.body;
    interval = `*/${userInterval} * * * *`;
    console.log('Reseting whale fetch interval')
    startCronJob(interval);
    res.json({ message: `Interval set to every ${userInterval} minutes.` });
}

module.exports = {
    monitorTransfer
}