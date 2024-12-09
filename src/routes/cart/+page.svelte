<script lang="ts">
  interface CartItem {
    name: string;
    price: number;
  }

  let cartItems: CartItem[] = []; // Define cartItems as an array of CartItem objects
</script>

<div class="cart-container">
  <h1 class="cart-title">Your Cart</h1>

  <!-- Home Button -->
  <a href="/" class="home-button">
    <button class="home-button-style">Home</button>
  </a>

  {#if cartItems.length === 0}
    <p class="empty-cart-message">Your cart is empty!</p>
  {:else}
    <div class="cart-items-container">
      {#each cartItems as item}
        <div class="cart-item">
          <h3 class="cart-item-name">{item.name}</h3>
          <p class="cart-item-price">${item.price.toFixed(2)}</p>
          <button class="remove-button">Remove</button>
        </div>
      {/each}
    </div>
    <div class="cart-total">
      <p><strong>Total: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</strong></p>
    </div>
    <button class="checkout-button">Proceed to Checkout</button>
  {/if}
</div>

<style>
  /* Container for cart page */
  .cart-container {
    padding: 2rem;
    max-width: 900px;
    margin: 0 auto;
    background-color: #fdf6e3; /* Warm beige background */
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* Cart title */
  .cart-title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  /* Home button styles */
  .home-button {
    display: inline-block;
    margin-bottom: 1.5rem;
  }

  .home-button-style {
    background-color: #ea580c; /* Orange */
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
  }

  .home-button-style:hover {
    background-color: #f97316; /* Light orange */
  }

  /* Message when cart is empty */
  .empty-cart-message {
    font-size: 1.25rem;
    color: #4b5563;
  }

  /* Container for the list of cart items */
  .cart-items-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Individual cart item card */
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 1rem;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #fef2c7;
  }

  .cart-item-name {
    font-size: 1.125rem;
    font-weight: 600;
  }

  .cart-item-price {
    font-size: 1rem;
    color: #4b5563;
  }

  .remove-button {
    background-color: #f44336; /* Red */
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .remove-button:hover {
    background-color: #d32f2f; /* Darker red */
  }

  /* Total amount and checkout button */
  .cart-total {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    font-weight: bold;
  }

  .checkout-button {
    background-color: #f59e0b; /* Amber */
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 1.125rem;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 1.5rem;
  }

  .checkout-button:hover {
    background-color: #fbbf24; /* Light amber */
  }
</style>
