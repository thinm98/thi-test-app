// src/api/products.ts
// Function to fetch product list from API

export async function fetchProducts() {
  // Replace with your actual API endpoint
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}
