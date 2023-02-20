'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Arpit Mishra',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-02-18T21:31:17.178Z',
    '2023-02-16T07:42:02.383Z',
    '2023-02-19T09:15:04.904Z',
    '2023-02-18T10:17:24.185Z',
    '2023-02-17T14:11:59.604Z',
    '2023-02-16T17:01:17.194Z',
    '2023-02-15T23:36:17.929Z',
    '2023-02-14T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-US', // de-DE
};

const account2 = {
  owner: 'Rajesh Sharma',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2023-02-01T13:15:33.035Z',
    '2023-01-30T09:48:16.867Z',
    '2023-01-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-02-10T14:43:26.374Z',
    '2023-01-25T18:49:59.371Z',
    '2023-01-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

// Creating Current Date
// const currentDate = new Date();
// labelDate.textContent = `${currentDate.getDate()}/${
//   currentDate.getMonth() + 1
// }/${currentDate.getFullYear()},${currentDate.getHours()}:${currentDate.getMinutes()}`;

/////////////////////////////////////////////////
// Functions

/* ***************************************** */

// Formatting Date and Currency

// Date functionallity

const formattedMovementDate = (date, locale) => {
  const numberOfDaysPassed = (date1, date2) =>
    Math.floor(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = numberOfDaysPassed(new Date(), date);
  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = `${date.getFullYear()}`;
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// Format Currency
const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

/* ****************************** */
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const newMovements = acc.movements.slice();
  const movs = sort ? newMovements.sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const now = new Date(acc.movementsDates[i]);
    const displayDate = formattedMovementDate(now, acc.locale);

    const formattedMovement = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCur(
    Math.abs(out),
    acc.locale,
    acc.currency
  )}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCur(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Creating a logout timer function

const startLogOut = () => {
  const tick = () => {
    let min = `${Math.trunc(timeRemaining / 60)}`.padStart(2, 0);
    let seconds = `${Math.trunc(timeRemaining % 60)}`.padStart(2, 0);
    // 3.On each call print the remaining time to the UI
    labelTimer.textContent = `${min}:${seconds}`;

    // 4. when we reach 0 seconds, stop timer and logout
    if (timeRemaining === 0) {
      clearInterval(logOutTimer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    // Decrese 1 s
    timeRemaining--;
  };
  // 1. setting the time to 5 mins
  let timeRemaining = 300;
  // 2. call the timer every second
  tick();
  const logOutTimer = setInterval(tick, 1000);
  return logOutTimer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time

    const newDate = new Date();
    const options = {
      hour: `numeric`,
      minute: `numeric`,
      day: `numeric`,
      month: `short`,
      year: `numeric`,
      weekday: `short`,
    };

    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(newDate);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Start Logging Out
    // console.log(timer);
    if (timer) clearInterval(timer);
    timer = startLogOut();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // ADD TRANSFER DATE

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Resetting the timer
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOut();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    alert(
      `Your loan application is under request.click okay to further processing`
    );
    const bankApplication = setTimeout(() => {
      // Add movement
      alert(`Your loan application has approved!!, Congrats`);
      currentAccount.movements.push(amount);

      // Add Loan Date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
      if (timer) {
        clearInterval(timer);
      }
      timer = startLogOut();
    }, 3000);
  }
  // Resetting the timer

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    labelWelcome.textContent = `Log in to get started`;
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Converting and Checking Numbers

// All numbers are represented as floating point numbers Internally

// console.log(23 === 23.0);
// console.log(0.1 + 0.2);

// console.log(Number(`78`));
// console.log(+`23`);

// console.log(Number.parseInt(`78px`, 10));
// console.log(Number.parseFloat(`78.89px`, 10));

// console.log(Number.isNaN(`20`));
// console.log(Number.isNaN(20));

// Number.isFinite() is a best way to check if a number is NaN or not

// console.log(Number.isFinite(+`20x`));

// Math rounding function

// Math sqrt()
// console.log(Math.sqrt(5));

// Math max() and min()
// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.min(5, 18, 23, 11, 2));

// console.log(Math.PI * Number.parseFloat(`10px`) ** 2);

// Generating a random number b/w max and min values

// const randomNumber = (min, max) =>
// Math.floor(Math.random() * (max - min) + 1) + min;

// console.log(randomNumber(10, 20));

// Primitive Type:- BigInt

// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 8505);

// BigInt
// console.log(98996587421688888785531354564886684n);

// Working With Date

// const now = new Date();
// console.log(now);
// console.log(new Date(`Sun Feb 19 2023 18:04:15`));
// console.log(new Date(`20 May 2022`));
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2015, 4, 31, 15, 19, 61));

// we can also pass the unix contructor the amount of miliseconds has passed since,the beginning of unix time
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));
// console.log(new Date(365 * 11 * 24 * 60 * 60 * 1000));

// These dates which we are created are some special type of Objects.
// console.log(`*************** Future *********************`);
const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());
// console.log(new Date(2142237180000));
// console.log(Date.now());
// future.setFullYear(2050);
// console.log(future);

// Operations with dates

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(Number(future));

// function to calculate number of days has passed

const numberOfDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const day1 = numberOfDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
// console.log(day1);

// Exprementing With Interaliztion API
// Exprementing with numbers

// const number = 3888476.985;
// const options = {
//   style: `currency`,
//   unit: `mile-per-hour`,
//   currency: `INR`,
//   // useGrouping: false,
// };
// console.log(
//   `USA:   ${new Intl.NumberFormat(`en-US`, options).format(number)} `
// );
// console.log(
//   `Germany:  ${new Intl.NumberFormat(`de-DE`, options).format(number)} `
// );
// console.log(
//   `Syria:  ${new Intl.NumberFormat(`ar-SY`, options).format(number)} `
// );

// Praticing,Timers,setTimeOut() and setIntervl()

// setTimeOut() runs only one time after the function is called wheres setInterval() keeps running untill e stop it

// so we can use setTimeout() to execute a particular code in the future

// Ordering Pizza
// const ingredients = [`Tomato`, `Masroom`];
// console.log(`Your Order will arive in some time!!`);
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here,is your pizza with ${ing1} & ${ing2}`),
//   3000,
//   ...ingredients
// );
// console.log(`Waiting!!`);

// // we can clearTimer function as well
// if (ingredients.includes(`Tomato`)) {
//   clearTimeout(pizzaTimer);
// }

// setInterval():- it will call itself after a regular Interva

// setInterval(() => {
//   const newDate = new Date();
//   const hours = `${newDate.getHours()}`.padStart(2, 0);
//   const minutes = `${newDate.getMinutes()}`.padStart(2, 0);
//   const seconds = `${newDate.getSeconds()}`.padStart(2, 0);
//   console.log(`${hours}:${minutes}:${seconds}`);
// }, 1000);
