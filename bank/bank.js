const readline = require('readline');

class BankAccount {
  constructor(name, balance = 0) {
    this.name = name;
    this.balance = balance;
  }


  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited $${amount}. New balance is $${this.balance}.`);
    } else {
      console.log("Invalid amount. Please enter a positive number.");
    }
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log("Invalid amount. Please enter a positive number.");
    } else if (amount > this.balance) {
      console.log("Insufficient funds.");
    } else {
      this.balance -= amount;
      console.log(`Withdrawn $${amount}. New balance is $${this.balance}.`);
    }
  }


  viewBalance() {
    console.log(`Account balance for ${this.name}: $${this.balance}.`);
  }
}


const accounts = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function createAccount() {
  rl.question("Enter your name: ", (name) => {
    rl.question("Enter initial balance (optional): ", (balance) => {
      balance = parseFloat(balance) || 0;
      const account = new BankAccount(name, balance);
      accounts.push(account);
      console.log(`Account created for ${name} with a balance of $${balance}.`);
      runApplication();
    });
  });
}


function accountTransaction() {
  rl.question("Enter your name: ", (name) => {
    const account = accounts.find(acc => acc.name === name);
    if (!account) {
      console.log("Account not found.");
      runApplication();
      return;
    }
    rl.question("Enter transaction type (deposit/withdraw/view): ", (transaction) => {
      switch (transaction) {
        case "deposit":
          rl.question("Enter deposit amount: ", (depositAmount) => {
            depositAmount = parseFloat(depositAmount);
            account.deposit(depositAmount);
            runApplication();
          });
          break;
        case "withdraw":
          rl.question("Enter withdrawal amount: ", (withdrawAmount) => {
            withdrawAmount = parseFloat(withdrawAmount);
            account.withdraw(withdrawAmount);
            runApplication();
          });
          break;
        case "view":
          account.viewBalance();
          runApplication();
          break;
        default:
          console.log("Invalid transaction type.");
          runApplication();
          break;
      }
    });
  });
}

function runApplication() {
  rl.question("Enter action (create/transaction/exit): ", (action) => {
    switch (action) {
      case "create":
        createAccount();
        break;
      case "transaction":
        accountTransaction();
        break;
      case "exit":
        console.log("Exiting application.");
        rl.close();
        return;
      default:
        console.log("Invalid action.");
        rl.prompt();
        break;
    }
  });
}


runApplication();