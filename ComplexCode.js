/*
   Filename: ComplexCode.js

   Description: This JavaScript code snippet implements a complex and elaborate online shopping cart system. It includes features such as product searching, filtering, sorting, adding to cart, updating cart, removing from cart, calculating total, applying discounts, and managing user authentication.

   Note: The code below is a simplified version for demonstration purposes and is not a complete implementation.

   Author: Your Name
   Date: Current Date
*/

// Mock products data
const products = [
  { id: 1, name: 'Product 1', price: 10.99, category: 'Category A' },
  { id: 2, name: 'Product 2', price: 19.99, category: 'Category B' },
  // ... More product objects
];

// Cart object to manage cart data
const cart = {
  items: [],
  total: 0,
  // ... Additional cart properties and methods
};

// Function to search products by name
function searchProducts(query) {
  const results = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  return results;
}

// Function to filter products by category
function filterProducts(category) {
  const results = products.filter(product =>
    product.category === category
  );
  return results;
}

// Function to sort products by price (ascending or descending)
function sortProducts(sortOrder) {
  const sortedProducts = [...products];
  sortedProducts.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
  return sortedProducts;
}

// Function to add a product to the cart
function addToCart(productId, quantity = 1) {
  const product = products.find(product => product.id === productId);
  if (product) {
    const cartItem = cart.items.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
    updateCartTotal();
    console.log('Product added to cart!');
  } else {
    console.log('Product not found!');
  }
}

// Function to update cart total
function updateCartTotal() {
  cart.total = cart.items.reduce((total, item) =>
    total + (item.product.price * item.quantity), 0);
  return cart.total;
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  const itemIndex = cart.items.findIndex(item => item.product.id === productId);
  if (itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);
    updateCartTotal();
    console.log('Product removed from cart!');
  } else {
    console.log('Product not found in cart!');
  }
}

// Function to apply a discount to the cart total
function applyDiscount(discountPercentage) {
  if (discountPercentage >= 0 && discountPercentage <= 100) {
    const discount = (cart.total * discountPercentage) / 100;
    cart.total -= discount;
    console.log(`Discount applied: -${discount.toFixed(2)}`);
  }
}

// Function to authenticate a user
function authenticateUser(username, password) {
  // Authentication logic here
  // ...
}

// Example usage:
const searchResults = searchProducts('product 1');
console.log('Search Results:', searchResults);

const filteredProducts = filterProducts('Category A');
console.log('Filtered Products:', filteredProducts);

const sortedProducts = sortProducts('asc');
console.log('Sorted Products:', sortedProducts);

addToCart(1, 2);
addToCart(2);
console.log('Cart:', cart);

removeFromCart(1);
console.log('Cart:', cart);

applyDiscount(10);
console.log('Cart Total:', cart.total);

authenticateUser('example_user', 'password123');
