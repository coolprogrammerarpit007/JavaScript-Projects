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

const displayMovements = movements => {
  containerMovements.innerHTML = ``;

  movements.forEach((mov, i) => {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const HTMLTEXT = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML(`afterbegin`, HTMLTEXT);
  });
};

displayMovements(account1.movements);

// Calculate Price Balance

const calcPriceBalance = movements => {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
  return balance;
};
calcPriceBalance(account1.movements);

//  Create User Name

const createUserNames = accounts => {
  accounts.forEach(account => {
    const userName = account.owner.toLowerCase().split(` `);
    account.mainUser = userName.map(userId => userId[0]).join(``);
  });
  return accounts;
};

const userAccounts = createUserNames(accounts); // username: stw
// console.log(userAccounts);

// The filter Method

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
