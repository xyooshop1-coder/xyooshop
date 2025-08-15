const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

function renderProduct(doc) {
  const p = doc.data();
  if (!p.name.toLowerCase().includes(searchInput.value.toLowerCase())) return;

  productList.innerHTML += `
    <div class="product">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      ${p.discount > 0 ? `<p class="discount">Save $${p.discount}</p>` : ""}
      <p>Price: $${p.price}</p>
      <p>Stock: ${p.quantity}</p>
      <button onclick="buyProduct('${doc.id}', ${p.price})" ${p.quantity <= 0 ? "disabled" : ""}>
        ${p.quantity > 0 ? "Buy Now" : "Out of Stock"}
      </button>
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
}

searchInput.addEventListener("input", loadProducts);
loadProducts();
