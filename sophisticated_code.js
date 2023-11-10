/* 
FileName: sophisticated_code.js

Description: This code demonstrates a complex algorithm for finding prime numbers using the Sieve of Eratosthenes method.
It generates all prime numbers up to a given limit and stores them in an array.

Author: [Your Name]
Date: [Current Date]
*/

function sieveOfEratosthenes(limit) {
  // Initialize an array to track prime numbers
  const primes = new Array(limit + 1).fill(true);

  // 0 and 1 are not prime numbers
  primes[0] = primes[1] = false;

  // Iterate over the array
  for (let i = 2; i <= Math.sqrt(limit); i++) {
    // Skip if the number is already marked as non-prime
    if (!primes[i]) continue;

    // Mark all multiples of the current number as non-prime
    for (let j = i * i; j <= limit; j += i) {
      primes[j] = false;
    }
  }

  // Collect all prime numbers into a separate array
  const primeNumbers = [];
  for (let k = 0; k <= limit; k++) {
    if (primes[k]) {
      primeNumbers.push(k);
    }
  }

  return primeNumbers;
}

const limit = 1000;
const primesArray = sieveOfEratosthenes(limit);

// Display the prime numbers
console.log("Prime numbers up to", limit, ":");
console.log(primesArray);