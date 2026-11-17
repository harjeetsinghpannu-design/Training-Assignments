function bankAccount() {
    const accounts = [
        {
            accountNo: "ACC001",
            cardNo: "1234567890123456",
            pin: "1234",
            balance: 5000
        },
        {
            accountNo: "ACC002",
            cardNo: "2234567890123456",
            pin: "2345",
            balance: 12000
        },
        {
            accountNo: "ACC003",
            cardNo: "3234567890123456",
            pin: "3456",
            balance: 8500
        },
        {
            accountNo: "ACC004",
            cardNo: "4234567890123456",
            pin: "4567",
            balance: 20000
        },
        {
            accountNo: "ACC005",
            cardNo: "5234567890123456",
            pin: "5678",
            balance: 15000
        }
    ];

    function withdraw(cardNo, pin, amount) {
        const matchIndex = accounts.findIndex(element => {
            return element.cardNo === cardNo && element.pin === pin;
        });

        if (matchIndex === -1) {
            throw Error("Account doesn't exist. Please enter valid account details.");
        }

        if (accounts[matchIndex].balance < amount) {
            throw Error("Amount being withdrawn is more than the balance");
        }

        accounts[matchIndex].balance -= amount;

        return accounts[matchIndex].balance;
    }

    function deposit(cardNo, pin, amount) {
        const matchIndex = accounts.findIndex(element => {
            return element.cardNo === cardNo && element.pin === pin;
        });

        if (matchIndex === -1) {
            throw Error("Account doesn't exist. Please enter valid account details.");
        }

        accounts[matchIndex].balance += amount;

        return accounts[matchIndex].balance;
    }

    return {
        withdraw,
        deposit
    };
}

function startTransaction() {
    const cardNo = prompt("Enter Card Number:");
    const pin = prompt("Enter Account PIN:");
    const operation = prompt("Enter operation to be performed (withdraw/deposit):").toLowerCase();

    if (operation !== "withdraw" && operation !== "deposit") {
        throw Error("Invalid operation. Enter a valid operation");
    }

    const amount = Number(prompt(`Enter amount to ${operation}:`));

    if (Number.isNaN(amount)) {
        throw Error("Please enter a valid amount");
    }

    if (amount <= 0) {
        throw Error(`Can't ${operation} zero or negative amount.`);
    }

    let updatedBalance;

    if (operation === "withdraw") {
        updatedBalance = bank.withdraw(cardNo, pin, amount);
        // console.log(`Amount has been withdrawn. Current balance is ${updatedBalance}`);
        alert(`Amount has been withdrawn. Current balance is ${updatedBalance}`);
    }
    else {
        updatedBalance = bank.deposit(cardNo, pin, amount);
        // console.log(`Amount has been deposited. Current balance is ${updatedBalance}`);
        alert(`Amount has been deposited. Current balance is ${updatedBalance}`);
    }
}

const bank = bankAccount();
let continueTransaction = true;

while (continueTransaction) {
    try {
        startTransaction();
    }
    catch (error) {
        console.log(error.message);
        alert(error.message);
    }
    continueTransaction = confirm(
        "Would you like to access the banking portal again?"
    );
}

alert("Thank you for using the banking portal.");
