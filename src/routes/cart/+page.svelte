<script lang="ts">
    interface CartItem {
      name: string;
      price: number;
    }
  
    let cartItems: CartItem[] = []; // Define cartItems as an array of CartItem objects
  </script>
  
  <div class="cart">
    <h1>Your Cart</h1>
    {#if cartItems.length === 0}
      <p>Your cart is empty!</p>
    {:else}
      <ul>
        {#each cartItems as item}
          <li>{item.name} - ${item.price}</li>
        {/each}
      </ul>
    {/if}
  </div>
  