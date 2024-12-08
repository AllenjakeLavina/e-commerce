<script lang="ts">
    interface Product {
      id: number;
      name: string;
      price: number;
      image: string;
    }
  
    let products: Product[] = [
      { id: 1, name: "Clay Vase", price: 25, image: "https://via.placeholder.com/200?text=Clay+Vase" },
      { id: 2, name: "Ceramic Bowl", price: 15, image: "https://via.placeholder.com/200?text=Ceramic+Bowl" },
      { id: 3, name: "Pottery Mug", price: 20, image: "https://via.placeholder.com/200?text=Pottery+Mug" },
      { id: 4, name: "Handmade Plate", price: 18, image: "https://via.placeholder.com/200?text=Handmade+Plate" },
    ];
  
    const addToCart = (product: Product) => {
      alert(`${product.name} added to cart!`);
    };
  
    const viewCart = () => {
      alert("Cart is empty. Start shopping!");
    };
  </script>
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="app-container">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-content">
        <h1 class="navbar-title">Pottery Haven</h1>
        <div class="navbar-links">
          <a href="/cart" class="nav-link" aria-label="Go to Cart">
            <i class="fas fa-shopping-cart"></i>
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
            <button
              on:click={() => addToCart(product)}
              class="add-to-cart-button"
              aria-label={`Add ${product.name} to Cart`}
            >
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
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
  </style>
  