const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

function renderProduct(doc) {
  const p = doc.data();
  if (!p.name.toLowerCase().includes(searchInput.value.toLowerCase())) return;

  let buyButton = "";
  if (p.quantity > 0) {
    buyButton = `<button class="buy-btn" onclick="buyProduct('${doc.id}', ${p.price})">Buy Now</button>`;
  } else {
    buyButton = `<button class="buy-btn out" disabled>Out of Stock</button>`;
  }

  productList.innerHTML += `
    <div class="product">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      ${p.discount > 0 ? `<p class="discount">Save $${p.discount}</p>` : ""}
      <p class="price">$${p.price}</p>
      <p class="stock">Stock: ${p.quantity}</p>
      ${buyButton}
    </div>
  `;
}

function loadProducts() {
  db.collection("products").onSnapshot(snapshot => {
    productList.innerHTML = "";
    snapshot.forEach(renderProduct);
  });
}

function buyProduct(id, price) {
  // Extra protection
  db.collection("products").doc(id).get().then(doc => {
    if (!doc.exists || doc.data().quantity <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }
    if (confirm(`Proceed to PayPal to pay $${price}?`)) {
      window.open(`https://www.paypal.me/JhonJoross/${price}`, "_blank");
      setTimeout(() => {
        const productRef = db.collection("products").doc(id);
        db.runTransaction(t => t.get(productRef).then(doc => {
          if (doc.exists && doc.data().quantity > 0) {
            t.update(productRef, { quantity: doc.data().quantity - 1 });
          }
        }));
      }, 3000);
    }
  });
}

searchInput.addEventListener("input", loadProducts);
loadProducts();
