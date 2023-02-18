'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Display Movements

const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = ``;

  const movs = sort
    ? movements.slice().sort((num1, num2) => num1 - num2)
    : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const HTMLTEXT = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML(`afterbegin`, HTMLTEXT);
  });
};

// Calculate Price Balance

const calcPriceBalance = acc => {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
  acc.balance = balance;
};

// Calculate Summary to the Account and display

const calcDisplaySummary = acc => {
  const depositBalance = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // console.log(depositBalance);
  labelSumIn.textContent = `${depositBalance}€`;

  const withdrawalAmt = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrawalAmt)}€`;

  const intrestAmt = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${intrestAmt}€`;
};

//  Create User Name

const createUserNames = accounts => {
  accounts.forEach(account => {
    const userName = account.owner.toLowerCase().split(` `);
    account.mainUser = userName.map(userId => userId[0]).join(``);
  });
  return accounts;
};

// Update UI Functionality

const updateUI = acc => {
  // Display movements
  displayMovements(acc.movements);

  // Display Summary
  calcDisplaySummary(acc);

  // Display balance
  calcPriceBalance(acc);
};

const userAccounts = createUserNames(accounts); // username: stw
// console.log(userAccounts);

// The filter Method

// Implementing Login functionlity

// Event Handlers....
let currentAccount;
btnLogin.addEventListener('click', e => {
  // Prevent form from submitting
  e.preventDefault();
  // console.log(`Logged In!!`);
  currentAccount = accounts.find(
    acc => acc.mainUser === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log(`Working!!`);
    // Display UI and a welcome message

    labelWelcome.textContent = `Good Day, ${currentAccount.owner.slice(
      0,
      currentAccount.owner.indexOf(' ')
    )}`;

    // Display User Account Details
    containerApp.style.opacity = '1';

    // Clear Input Fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginPin.blur();

    // Updating UI
    updateUI(currentAccount);
  }
});

// Transfer Money functionallity

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.mainUser === inputTransferTo.value
  );

  inputTransferTo.value = ``;
  inputTransferAmount.value = ``;

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.mainUser !== currentAccount.mainUser
  ) {
    // console.log(`You can transfer`);
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// Implementing Loan functionality

// Close Account Functionality

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  console.log(`Your loan Application is in process`);
  const loanGranted = currentAccount.movements.some(
    mov => mov >= Number(inputLoanAmount.value) * 0.1
  );
  if (loanGranted && Number(inputLoanAmount.value) > 0) {
    console.log(`Your loan Application has Approved!!`);
    // Adding positive movement to the account
    currentAccount.movements.push(Number(inputLoanAmount.value));
    // Updating the UI
    updateUI(currentAccount);
  }

  // Clear the loan Application
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.mainUser === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    //  Delete User Account
    accounts.splice(
      accounts.findIndex(acc => acc.mainUser === currentAccount.mainUser),
      1
    );

    // Hide UI
    containerApp.style.opacity = 0;
  }

  // Clear the field
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  console.log(accounts);
});

// Sort functionality
let sorted = false;
btnSort.addEventListener(`click`, e => {
  e.preventDefault();
  console.log('sorting!!');
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

/////////////////////////////////////////////////

// Slice Method:- this method don't mutate the original array

let arr = [`a`, `b`, `c`, `d`, `e`];
// console.log(arr.slice(0, 3));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(1, -2));

// slice method to create a shallow copy of an array
// console.log(arr.slice());

// Splice Method:-

// the diff. b/w slice and splice method is that it mutates the original array

// splice method is used to remove elements.

// console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(3, 2);
// console.log(arr);

// Reverse Method
// this method does mutate the array

let arr2 = [`a`, `b`, `c`, `d`, `e`];
const arr3 = [`J`, `i`, `h`, `g`, `f`];
// console.log(arr3.reverse());
// console.log(arr3);

// concat

const letters = arr2.concat(arr3);
// console.log(letters);

// Join Method
// console.log(letters.join(`-`));

// Looping Array: Using forEach() method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// looping over using for of loop

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`${movement}$ are deposited!!`);
//   } else {
//     console.log(`${Math.abs(movement)}$ are withdrawn`);
//   }
// }

// looping over using forEach loop

// one thing to mind,you can not use continue and break keywords on forEach loop

// movements.forEach((movement, index, array) => {
//   if (movement > 0) {
//     console.log(`${movement}$ are deposited!!`);
//   } else {
//     console.log(`${Math.abs(movement)}$ are withdrawn`);
//   }
// });

// forEach on Maps and Sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// console.log(`Maps`);
// currencies.forEach((currency, initials, map) => {
//   console.log(currency, initials, map);
// });

console.log(`*******************************`);
// console.log(`Sets`);

const uniqueCurrencies = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

// console.log(uniqueCurrencies);

// Remember: Sets has not any order
// uniqueCurrencies.forEach((currency, index, set) => {
//   console.log(`Currency${index}: ${currency} ,${set}`);
// });

// Coding Challenge# 1:-

// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const checkDogs = (arr1, arr2) => {
  const dogs1 = [...arr1];
  const dogs2 = [...arr2];
  // console.log(dogs1);
  dogs1.shift();
  dogs1.pop();
  dogs1.pop();

  const allDogs = [...dogs1, ...dogs2];
  allDogs.forEach((age, num) => {
    if (age >= 3) {
      console.log(`Dog number ${num + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${num + 1} is an puppy, and is ${age} years old`);
    }
  });
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Coding Challenge: #2:-
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = arr => {
  const dogsAge = [...arr];

  const humanAge = dogsAge.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

  const adultHumanAge = humanAge.filter(age => age >= 18);

  const avergaeAdultHumanAge =
    adultHumanAge.reduce((acc, age) => acc + age, 0) / adultHumanAge.length;

  return `Adult Human Age for Adult dog: ${avergaeAdultHumanAge}`;
};

const adultAge1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const adultAge2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(adultAge1);
// console.log(adultAge2);

// Coding Challenge #3:-

// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge1 = ages => {
  const avergaeAdultHumanAgeOfDog = ages
    .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
    .filter(age => age >= 18)
    .reduce((acc, age, i, adultArr) => acc + age / adultArr.length, 0);
  return avergaeAdultHumanAgeOfDog;
};

// console.log(
//   `Average Human age of a adult dog: ${calcAverageHumanAge1([
//     5, 2, 4, 1, 15, 8, 3,
//   ])}`
// );
// Data Transformations:- map,filter and reuce method in Array

// Map method:- map returns a new Array containing the reults of applying an operation on all original array elements

// filter method:- filter returns a new Array containing the array elements, that passed a specified test

// reduce method:- reduce boils all array elements down to one single value(eg:- adding all elemets together)

// map method:-

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

const movementsUsd = movements.map(mov => mov * euroToUsd);

// console.log(movements);
// console.log(movementsUsd);

const movementsDescription = movements.map((mov, index, arr) => {
  if (mov > 0) {
    return `Movement ${index + 1}: ${mov} $ deposit to your account `;
  } else {
    return `Movement ${index + 1}: ${mov} $ withdrawn to your account `;
  }
});

// console.log(movementsDescription);
// console.log(movements);

// The Filter Method

// Array of deposits
const deposits = movements.filter(mov => mov > 0);
// console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// The Reduce Method

// accumltor-> like a Snowball
const balance = movements.reduce((acc, mov) => {
  return acc + mov;
}, 0);
// console.log(balance);

// Max Value

// const maxValue = movements.reduce((max, mov) => {
//   if (mov > max) {
//     return mov;
//   } else {
//     return max;
//   }
// }, movements[0]);

// Generating Max value using reduce method
const maxValue = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);

// console.log(maxValue);

// The Magic of chaining Methods

// It's like an Pipeline
const depositAccountBalance = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, move) => acc + move, 0);

// console.log(depositAccountBalance);

// find method in JavaScript

// we can use find method on an arraay to retrieve a single element based on a certain condition

const firstWithdrawal = Math.abs(movements.find(mov => mov < 0));
// console.log(movements);
// console.log(`First Withdrawal: ${firstWithdrawal}`);

// console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

// Now Using for-of loop
// console.log(Object.entries(account));
// console.log(`Jessica's Account details: ${Object.entries(account)}`);
// console.log(account);

// const accountObjects = Object.values(accounts);
// // console.log(accountObjects);

// let jessicaAccount;
// for (const account of accountObjects) {
//   if (account.owner === 'Jessica Davis') {
//     console.log(`This is the account, I was looking for!!`);
//     jessicaAccount = account;
//     break;
//   }
//   continue;
// }

// console.log(jessicaAccount);

// console.log(movements);
// console.log(movements.includes(-130));

// some and every method on Arrays

const positiveMovement = movements.some(mov => mov > 5000);
// console.log(positiveMovement);

// Every Method: condition
const allPositiveMovement = movements.every(mov => mov > 5000);
// console.log(allPositiveMovement);

// flat and flatMap array Methods

const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], 13, 14];

// console.log(array.flat());

const arrayDeep = [[[1, 2], 3], [[4, [5, 6]]], [[[7, 8, 9], 10]]];

// console.log(arrayDeep.flat(3));

const accountMovements = accounts.map(acc => acc.movements);
const allMovements = accountMovements.flat();
// console.log(allMovements);

const completeBalance = allMovements.reduce((ace, move) => ace + move, 0);
// console.log(completeBalance);

// Sorting

const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// Numbers
// console.log(movements);
// console.log(movements.sort());

// num1 and num are consective numbers
// return<0 => A,B(keep order)
// return>0 => B,A(switch order)

// Ascending Order
// movements.sort((num1, num2) => {
//   if (num1 > num2) {
//     return 1;
//   }
//   if (num2 > num1) {
//     return -1;
//   }
// });

// console.log(movements);

// Descending Order
// movements.sort((num1, num2) => {
//   if (num1 > num2) {
//     return -1;
//   }
//   if (num2 > num1) {
//     return 1;
//   }
// });

// console.log(movements);

// we can make this more simpllify

// console.log(movements);
const sortedArray = movements.sort((num1, num2) => num1 - num2);
// console.log(sortedArray);

// More ways of creating and filling Array
// generating Arrays programmatically

const x = new Array(7);

// Empty arrays + fill method
// x.fill(5);
x.fill(9, 3, 6);
// console.log(x);

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr1.fill(39, 2, 5);
// console.log(arr1);

// Array.from
// here this from is not using as method instead using as constructor function
const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

const randomDiceRolls = Array.from({ length: 100 }, (_, i) =>
  Math.floor(Math.random() * 101)
);
// console.log(randomDiceRolls);

// labelBalance.addEventListener('click', e => {
//   const movementsUI = Array.from(
//     document.querySelectorAll(`.movements__value`)
//   );
//   console.log(movementsUI);
//   const movementsValue = movementsUI.map(el => el.textContent.replace(`€`, ``));
//   console.log(movementsValue);
// });

// Coding Challenge #4:-

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Task #1:-
dogs.forEach(
  dog => (dog.recommendPortion = Math.floor(dog.weight ** 0.75 * 28))
);

// console.log(dogs);

// Task #2:-

const sarahDog = dogs.find(dog => dog.owners.includes(`Sarah`));
// console.log(sarahDog);
// console.log(
//   `Sarah's dog is ${
//     sarahDog.recommendPortion < sarahDog.curFood
//       ? `eating too much!!`
//       : `Not eating too much!!`
//   }`
// );

// Task #3:-

// console.log(
//   Object.entries({ weight: 22, curFood: 250, owners: ['Alice', 'Bob'] })
// );
// console.log(dogs);
const ownersEatTooMuch = dogs
  .filter(dog => dog.recommendPortion < dog.curFood)
  .map(dog => dog.owners)
  .flat();

const ownersEatTooLess = dogs
  .filter(dog => dog.recommendPortion > dog.curFood)
  .map(dog => dog.owners)
  .flat();

// console.log(ownersEatTooMuch);
// console.log(ownersEatTooLess);

// Task #4:-
// console.log(
//   `${ownersEatTooMuch[0]},${ownersEatTooMuch[1]},and ${ownersEatTooMuch[2]}'s dog eat too much`
// );
// console.log(
//   `${ownersEatTooLess[0]},${ownersEatTooLess[1]},and ${ownersEatTooLess[2]}'s dog eat too Less`
// );

// Task #5:-
// console.log(dogs.some(dog => dog.recommendPortion === dog.curFood));

// // Task #6:-
// console.log(
//   dogs.some(
//     dog =>
//       dog.curFood > dog.recommendPortion * 0.9 &&
//       dog.curFood < dog.recommendPortion * 1.1
//   )
// );

// Task #7:-

const okayFoodDogs = dogs.filter(
  dog =>
    dog.curFood > dog.recommendPortion * 0.9 &&
    dog.curFood < dog.recommendPortion * 1.1
);

// console.log(okayFoodDogs);

// Task #8:-
const recommendFoodDogs = dogs
  .slice()
  .sort((a, b) => a.recommendPortion - b.recommendPortion);
// console.log(recommendFoodDogs);
