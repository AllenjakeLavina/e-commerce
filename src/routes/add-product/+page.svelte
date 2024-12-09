<script lang="ts">
  let name = '';
  let price: number | null = null;
  let imageFile: File | null = null;
  let imageUrl = '';
  let cartCount = 3; // Example item count in the cart

  const submitProduct = async () => {
  try {
    if (name && price && imageFile) {
      // Send product data to the backend
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price.toString());
      formData.append('image', imageFile);

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert(`Product "${name}" added successfully!`);
      } else {
        alert('Failed to add product.');
      }
    } else {
      alert("Please fill in all fields.");
    }
  } catch (error: unknown) {
    // Handle the error by checking its type
    if (error instanceof Error) {
      alert(`An error occurred: ${error.message}`);
    } else {
      alert('An unknown error occurred.');
    }
  }
};

  const handleImageUpload = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      imageFile = fileInput.files[0];
      imageUrl = URL.createObjectURL(imageFile); // Create a temporary URL to show the image preview
    }
  };
</script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="container">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-content">
        <h1 class="navbar-title">Pottery Haven</h1>
        <div class="navbar-links">
          <a href="/" class="nav-link">Home</a>
          <!-- Cart Logo with Item Count -->
          <a href="/cart" class="cart-logo">
            <div class="cart-icon">
              <!-- Cart Icon (Using Font Awesome) -->
              <i class="fa-solid fa-cart-shopping"></i>
              {#if cartCount > 0}
                <span class="cart-count">{cartCount}</span>
              {/if}
            </div>
          </a>
        </div>
      </div>
    </nav>
  
    <!-- Main Content -->
    <div class="main">
      <div class="form-container">
        <h2 class="form-title">Add a New Product</h2>
        <form on:submit|preventDefault={submitProduct}>
          <div class="form-group">
            <label for="name" class="form-label">Product Name</label>
            <input id="name" type="text" bind:value={name} class="form-input" />
          </div>
          <div class="form-group">
            <label for="price" class="form-label">Price</label>
            <input id="price" type="number" bind:value={price} class="form-input" />
          </div>
          <div class="form-group">
            <label for="image" class="form-label">Product Image</label>
            <input 
              id="image" 
              type="file" 
              accept="image/*" 
              on:change={handleImageUpload} 
              class="form-input" 
            />
            {#if imageUrl}
              <div class="image-preview">
                <img src={imageUrl} alt="Preview of the product" class="preview-image" />
              </div>
            {/if}
          </div>
          <button type="submit" class="form-button">Add Product</button>
        </form>
      </div>
    </div>
  </div>
  
  <style>
    :global(body) {
      margin: 0;
      font-family: sans-serif;
      background-color: #f3f4f6; /* Light gray */
    }
  
    .container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  
    .navbar {
      background-color: #ea580c; /* Orange */
      padding: 1rem;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
    }
  
    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      max-width: 100%;
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
      background-color: #fbbf24;
    }
  
    /* Cart Logo Styling */
    .cart-logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      position: relative;
    }
  
    .cart-icon {
      font-size: 1.5rem;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
  
    .cart-count {
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
      background-color: #f59e0b;
      color: white;
      border-radius: 50%;
      padding: 0.3rem;
      font-size: 0.75rem;
    }
  
    .main {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 4rem; /* Adjust for navbar height */
    }
  
    .form-container {
      max-width: 22rem;
      padding: 2ch;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-left: 13%;
    }
  
    .form-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  
    .form-group {
      margin-bottom: 1rem;
    }
  
    .form-label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
  
    .form-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
    }
  
    .form-button {
      background-color: #ea580c;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
  
    .form-button:hover {
      background-color: #f97316;
    }
  
    /* Image preview styles */
    .image-preview {
      margin-top: 1rem;
    }
  
    .preview-image {
      max-width: 100%;
      height: auto;
      border-radius: 0.375rem;
      border: 1px solid #d1d5db;
    }
  </style>
  