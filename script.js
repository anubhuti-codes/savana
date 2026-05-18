// PRODUCTS
const products = [
  { id: 1, name: "Floral Dress", price: 1499, image: "images/floral-dress.jpg" },
  { id: 2, name: "Denim Jacket", price: 999, image: "images/denim-jacket.jpg" },
  { id: 3, name: "Leather Boots", price: 1999, image: "images/leather-boots.webp" },
  { id: 4, name: "Casual T-Shirt", price: 799, image: "images/tshirt.jpg" },
  { id: 5, name: "Black Heels", price: 1299, image: "images/heels.jpg" },
  { id: 6, name: "Handbag", price: 999, image: "images/handbag.jpg" },
  { id: 7, name: "White Sneakers", price: 1499, image: "images/sneakers.jpg" },
  { id: 8, name: "Summer Top", price: 699, image: "images/top.jpg" },
  { id: 9, name: "Oversized Hoodie", price: 1599, image: "images/hoodie.jpg" },
  { id: 10, name: "Straight Fit Jeans", price: 1399, image: "images/jeans.jpg" },
  { id: 11, name: "Crop Top", price: 599, image: "images/crop-top.jpg" },
  { id: 12, name: "Maxi Dress", price: 1799, image: "images/maxi-dress.jpg" },
  { id: 13, name: "Formal Blazer", price: 2199, image: "images/blazer.jpg" },
  { id: 14, name: "Printed Skirt", price: 899, image: "images/skirt.jpg" },
  { id: 15, name: "Denim Shorts", price: 799, image: "images/shorts.jpg" },
  { id: 16, name: "Woolen Sweater", price: 1499, image: "images/sweater.jpg" },
  { id: 17, name: "Party Gown", price: 2999, image: "images/gown.jpg" },
  { id: 18, name: "Traditional Dress Set", price: 2299, image: "images/traditional-dress.jpg" },
  { id: 19, name: "Cargo Pants", price: 899, image: "images/cargo-pants.jpg" },
  { id: 20, name: "Leather Handbag", price: 1999, image: "images/leather-bag.jpg" },
  { id: 21, name: "Track Pants", price: 999, image: "images/track-pants.jpg" }
];

// SALE PRODUCTS
const saleProducts = [
  { id: 201, name: "Red Dress", price: 899, oldPrice: 1999, image: "images/red-dress.jpg" },
  { id: 202, name: "Blue Denim Jacket", price: 999, oldPrice: 2499, image: "images/blue-jacket.jpg" },
  { id: 203, name: "Casual Sneakers", price: 1199, oldPrice: 4999, image: "images/casual-sneakers.jpg" },
  { id: 204, name: "Floral Top", price: 499, oldPrice: 1299, image: "images/floral-top.jpg" },
  { id: 205, name: "Black Jeans", price: 899, oldPrice: 1999, image: "images/black-jeans.jpg" },
  { id: 206, name: "Winter Coat", price: 1799, oldPrice: 3999, image: "images/coat.jpg" },
  { id: 207, name: "Pink Hoodie", price: 999, oldPrice: 2199, image: "images/pink-hoodie.jpg" },
  { id: 208, name: "Elegant Heels", price: 799, oldPrice: 1899, image: "images/elegant-heels.jpg" },
  { id: 209, name: "Corset Hoodie", price: 699, oldPrice: 1599, image: "images/corset-hoodie.jpg" },
  { id: 210, name: "Fitted Shirt", price: 599, oldPrice: 1399, image: "images/shirt.jpg" },
  { id: 211, name: "Denim Skirt", price: 749, oldPrice: 1699, image: "images/denim-skirt.jpg" },
  { id: 212, name: "Running Shoes", price: 1399, oldPrice: 3499, image: "images/running-shoes.jpg" }
];

// DOM
const productList = document.getElementById("productList");
const saleList = document.getElementById("saleList");

// DISPLAY PRODUCTS
function displayProducts(items) {
  productList.innerHTML = "";

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button class="add-btn">Add to Cart</button>
    `;

    card.querySelector(".add-btn").addEventListener("click", () => {
      addToCart(product.id, "main");
    });

    productList.appendChild(card);
  });
}

// DISPLAY SALE
function displaySale(items) {
  saleList.innerHTML = "";

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p><span class="original-price">₹${product.oldPrice}</span> ₹${product.price}</p>
      <button class="add-btn">Add to Cart</button>
    `;

    card.querySelector(".add-btn").addEventListener("click", () => {
      addToCart(product.id, "sale");
    });

    saleList.appendChild(card);
  });
}

// CART
let cart = [];

// ADD TO CART
function addToCart(id, type) {
  let product = type === "main"
    ? products.find(p => p.id === id)
    : saleProducts.find(p => p.id === id);

  if (!product) return;

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  showToast(product.name + " added to cart!");
}

// RENDER CART + SUMMARY
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");

  // NEW summary elements 
  const subtotalEl = document.getElementById("subtotal");
  const deliveryEl = document.getElementById("delivery");
  const finalTotalEl = document.getElementById("finalTotal");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty 🛒</p>";
    cartCount.innerText = 0;

    if (subtotalEl) subtotalEl.innerText = "₹0";
    if (deliveryEl) deliveryEl.innerText = "₹0";
    if (finalTotalEl) finalTotalEl.innerText = "₹0";

    return;
  }

  let subtotal = 0;
  let totalItems = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;
    totalItems += item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <p>${item.name}</p>
      <p>₹${item.price}</p>
      <div>
        <button class="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="increase">+</button>
      </div>
    `;

    div.querySelector(".increase").addEventListener("click", (e) => {
      e.stopPropagation();
      item.quantity++;
      renderCart();
    });

    div.querySelector(".decrease").addEventListener("click", (e) => {
      e.stopPropagation();

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(index, 1);
      }

      renderCart();
    });

    cartItems.appendChild(div);
  });

  // DELIVERY LOGIC
  let delivery = subtotal > 2000 ? 0 : 50;
  let finalTotal = subtotal + delivery;

  cartCount.innerText = totalItems;

  if (subtotalEl) subtotalEl.innerText = "₹" + subtotal;
  if (deliveryEl) deliveryEl.innerText = "₹" + delivery;
  if (finalTotalEl) finalTotalEl.innerText = "₹" + finalTotal;
}

// CART TOGGLE
const cartIcon = document.getElementById("cartIcon");
const cartBox = document.getElementById("cart");

cartIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  cartBox.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!cartBox.contains(e.target) && !cartIcon.contains(e.target)) {
    cartBox.classList.remove("active");
  }
});

// CHECKOUT
const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Order placed successfully!");
  cart = [];
  renderCart();
});

// TOAST
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// SEARCH
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase().trim();

  const filteredMain = products.filter(product =>
    product.name.toLowerCase().includes(value)
  );

  const filteredSale = saleProducts.filter(product =>
    product.name.toLowerCase().includes(value)
  );

  displayProducts(filteredMain);
  displaySale(filteredSale);

  showNoResults(filteredMain, filteredSale, value);
});

// NO RESULTS
function showNoResults(main, sale, value) {
  let message = document.getElementById("noResults");

  if (!message) {
    message = document.createElement("p");
    message.id = "noResults";
    message.style.textAlign = "center";
    message.style.marginTop = "20px";
    message.style.fontWeight = "600";
    productList.parentElement.appendChild(message);
  }

  if (main.length === 0 && sale.length === 0 && value !== "") {
    message.innerText = "No products found";
  } else {
    message.innerText = "";
  }
}

// INIT
displayProducts(products);
displaySale(saleProducts);
renderCart();

// NEWSLETTER
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = this.querySelector('input').value;

  if (email.includes('@') && email.includes('.')) {
    alert('Subscribed successfully!');
    this.reset();
  } else {
    alert('Enter valid email');
  }
});