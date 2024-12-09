<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store'; // Import writable from svelte.store

  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
  }

  // Create a writable store for the cart
  export const cart = writable<Product[]>([]);

  let products: Product[] = [];

  // Fetch the products from the server after the component mounts
  onMount(async () => {
    try {
      const response = await fetch('/api/products'); // Your API endpoint to fetch products
      if (response.ok) {
        products = await response.json(); // Update the products array
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  });

  const addToCart = (product: Product) => {
    // Add the product to the cart store
    cart.update(currentCart => [...currentCart, product]);
    alert(`${product.name} added to cart!`);
  };

  const viewCart = () => {
    alert("Cart is empty. Start shopping!");
  };

  // Function to delete a product
  const deleteProduct = async (name: string) => {
    try {
      const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        // Remove the deleted product from the local array
        products = products.filter(product => product.name !== name);
        alert(`${name} deleted successfully!`);
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
</script>

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"/>
<div class="app-container">
  <!-- Navbar -->
  <nav class="navbar">
    <div class="navbar-content">
      <h1 class="navbar-title">Pottery Haven</h1>
      <div class="navbar-links">
        <a href="/cart" class="nav-link" aria-label="Go to Cart">
          <i class="fa-solid fa-cart-shopping"></i>
        </a>
        <a href="/add-product" class="nav-link" aria-label="Add a new product">
          Add Product
        </a>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="main-content">
    <h2 class="main-title">Welcome to Pottery Haven</h2>
    <div class="product-container">
      {#each products as product}
        <div class="product-card">
          <img src={product.image} alt={product.name} class="product-image" />
          <h3 class="product-name">{product.name}</h3>
          <p class="product-price">${product.price.toFixed(2)}</p>
          <div class="button-container">
            <button
              on:click={() => addToCart(product)}
              class="add-to-cart-button"
              aria-label={`Add ${product.name} to Cart`}
            >
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
            <button
              on:click={() => deleteProduct(product.name)}
              class="delete-button"
              aria-label={`Delete ${product.name}`}
            >
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        </div>
      {/each}
    </div>
  </main>
</div>

<style>
  /* Reset default body margin */
  :global(body) {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #fdf6e3; /* Warm beige background */
  }

  /* Container that holds the full page */
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* Navbar that stretches across the full width */
  .navbar {
    background-color: #ea580c; /* Orange */
    padding: 1rem;
    width: 100%; /* Ensure navbar stretches across the entire page */
  }

  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }

  .navbar-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .navbar-links {
    display: flex;
    gap: 1rem;
  }

  .nav-link {
    background-color: #f59e0b; /* Amber */
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    color: white;
    text-decoration: none;
    transition: background-color 0.2s;
  }

  .nav-link:hover {
    background-color: #fbbf24; /* Light amber */
  }

  /* Main content section */
  .main-content {
    flex-grow: 1;
    max-width: 7xl;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Align items to the top */
    height: calc(100vh - 4rem); /* Make sure the content fits without scrolling */
    overflow: hidden; /* Hide overflow to prevent scrolling */
  }

  .main-title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  /* Product container for horizontal layout */
  .product-container {
    display: flex;
    flex-wrap: nowrap; /* Prevent wrapping */
    gap: 1.5rem;
    overflow-x: auto; /* Allow horizontal scrolling if needed */
    padding: 1rem 0;
    width: 100%;
  }

  /* Product card styles */
  .product-card {
    background-color: white;
    padding: 1rem;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #fef2c7; /* Light orange border */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 250px; /* Set minimum width for each product card */
    flex-shrink: 0; /* Prevent card shrinking */
  }

  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  }

  .product-name {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .product-price {
    font-size: 1rem;
    color: #4b5563; /* Gray */
    margin-bottom: 1rem;
  }

  /* Button container to arrange buttons side by side */
  .button-container {
    display: flex;
    gap: 0.75rem; /* Space between the buttons */
    margin-top: 1rem;
  }

  .add-to-cart-button {
    background-color: #ea580c; /* Orange */
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .add-to-cart-button:hover {
    background-color: #f97316; /* Light orange */
  }

  .delete-button {
    background-color: #f44336; /* Red */
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .delete-button:hover {
    background-color: #d32f2f; /* Darker red */
  }
</style>
