document.body.innerText = 'Basic Javascript Features'
// Nullish operator
const myAge = null 

console.log('Your age is:' + (myAge ?? ' Age not provided.'))

// Objects

const user = {
  firstName: 'Marco',
  age: 22,
  address: {
    street: 'Street',
    number: 123
  }
}

console.log(JSON.stringify(Object.keys(user)))
console.log(JSON.stringify(Object.values(user)))
console.log(JSON.stringify(Object.entries(user)))

// Destructure

function showAge({age}) {
  return `Of the the use is ${age}`
}

const {firstName: myName, age, address, nickname = 'Bet'} = user

console.log(myName, age, address, nickname)
console.log(showAge(user))

// Rest operator

const {firstName, ...rest} = user

console.log(firstName, rest)

const array = [0,1,2,3,4,5,6,7,8,9]

const [first, second, ...restArray] = array

console.log(first, second, restArray)

const [firstB, ,  third, ...restArrayB] = array

console.log(firstB, third, restArrayB)

// Short Syntax

const car = 'Ferrari'
const color = 'Red'

const auto = {
  car, color
}

console.log(auto)

// Optional chaining

user.address = {
  ...user.address,
  "zip": {
    code: '111',
  }
}

// Wrong way
console.log(user.address ? user.address.zip.code : 'Error')

// Almost right
console.log(
  user.address ? (
    user.address.zip ?
      user.address.zip.code
    : 'Error'
  ) : 'Error'
)

// Right way
console.log(user?.address?.zip?.code ?? 'Error')

// Array methods

for (const i of array) {
  console.log(i)
}

array.forEach((item) => {
  console.log(item)
})

let newArray = array.map((item) => {
  return item * 2
})

console.log(newArray)

newArray = array.filter((item) => item % 2 !== 0).map((item) => item * 10)

console.log(newArray)

const everyItemIsANumber = array.every((item) => typeof item === 'number')

console.log(everyItemIsANumber)

const arrayWithAText = [...array, 'Txt']

const atLeastOneNumberIsNotANumber = arrayWithAText.some((item) => typeof item !== 'number')

console.log(atLeastOneNumberIsNotANumber)

const pair = array.find((item) => item % 2 === 0)

console.log(pair)

const pairIndex = array.findIndex((item) => item % 2 === 0)

console.log(pairIndex)

const sumReduce = array.reduce((prev, curr) => prev += curr, 0)

console.log(sumReduce)

// Template literals

console.log(`Hello ${user.firstName}, your age is ${user.age}`)

// Promises

const sumOfTwoNumber = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a % 2 === 0 ) {
        resolve(a + b )
      }
      reject(`Error: ${a} is not pair`)
    }, 2000);
  })
}

sumOfTwoNumber(1, 2)
  .then((sum) => console.log(`Sum is ${sum}`))
  .catch((err) => console.log(err))
sumOfTwoNumber(10, 2)
  .then((sum) => console.log(`Sum is ${sum}`))
  .catch((err) => console.log(err))

fetch('https://api.github.com/users/itsbetma')
  .then((result) => {
    result.text().then((textResult) => console.log(textResult))
  })
  .catch((err) => console.log(err))
  .finally(() => console.log( 'Finally'))

const searchGitHubData = async () => {
  try {
    const response = await fetch('https://api.github.com/users/itsbetma')
    const body = await response.json()
    return body.name
  } catch (error) {
   console.log(error) 
  }
}

searchGitHubData().then((name) => console.log(name))

// Imports

import {sum, sub, PI} from './lib/math.js'

console.log(`The sum is ${sum(10, 20)}`)
console.log(`The subtractions is ${sub(10,30)}`)
console.log(`PI is ${PI}`)

import * as math from './lib/math'

console.log(math.PI)

import {sum as plus} from './lib/math'

console.log(`The plus is ${plus(20,30)}`)
