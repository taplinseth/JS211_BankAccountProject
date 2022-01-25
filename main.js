class Transaction {
    constructor(amount, payee) {
        this.date = new Date();
        this.amount = amount;
        this.payee = payee;
    }

}

class BankAccount {
    constructor(accountNumber, owner) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = [];
    }

    balance() {
        let currentBalance = 0;
        for (let i=0; i < this.transactions.length; i++) {
            currentBalance += this.transactions[i].amount;
        }
        return currentBalance;
    }

    deposit(amt) {
        if (amt > 0) {
            const transaction = new Transaction(amt);
            this.transactions.push(transaction);
        } else {
            return "invalid deposit";
        }
    }

    charge(amt, payee) {
        let balance = this.balance();
        if (amt + balance >= 0) {
            const transaction = new Transaction(amt, payee);
            this.transactions.push(transaction);
        } else {
            return "declined";
        }
    }
}

class SavingsAccount extends BankAccount {
    constructor(accountNumber, owner, interestRate) {
        super(accountNumber, owner);
        this.accountNumber = accountNumber;
        this.interestRate = interestRate;
    }

    accrueInterest() {
        const balance = this.balance();
        return (balance * this.interestRate) + balance;
    }
}

const assert = require('assert');
if (typeof describe === 'function'){
    describe('BankAccount', () => {
        it('should check that BankAccount holds an accountNumber, owner, and transactions', () => {
            const bankAccount =  new BankAccount(12345, 'Bob');
            assert.equal(bankAccount.accountNumber, 12345);
            assert.equal(bankAccount.owner, 'Bob')
            assert.equal(bankAccount.transactions.length, 0);
        });

        it('can calculate balance correctly', () => {
            const bankAccount =  new BankAccount(12345, 'Bob');
            bankAccount.deposit(2500);
            assert.equal(bankAccount.balance(), 2500);
            bankAccount.charge(-1000, "Cabela's");
            assert.equal(bankAccount.balance(), 1500);
            bankAccount.deposit(-500);
            assert.equal(bankAccount.balance(), 1500);
            bankAccount.charge(-3000, "Cabela's");
            assert.equal(bankAccount.balance(), 1500);
        });
    })

    describe('Transaction', () => {
        it('should check that Transaction holds correct amount, payee, and date', () => {
            const transaction =  new Transaction(-1700, "Cabela's");
            assert.equal(transaction.amount, -1700);
            assert.equal(transaction.payee, "Cabela's")
            assert.equal(transaction.date, Date());
        });
    })

    describe('Transaction', () => {
        it('should check that SavingsAccount holds correct accountNumber, owner, and interestRate', () => {
            const savingsAccount = new SavingsAccount(23456, "Bob", 0.01);
            assert.equal(savingsAccount.accountNumber, 23456);
            assert.equal(savingsAccount.owner, "Bob");
            assert.equal(savingsAccount.interestRate, 0.01);
        });

        it('should add money to savings account and calculate new account balance after interest', () => {
            const savingsAccount = new SavingsAccount(23456, "Bob", 0.01);
            savingsAccount.deposit(2000);
            assert.equal(savingsAccount.balance(), 2000);
            assert.equal(savingsAccount.accrueInterest(), 2020);
        });
    })
}