auth.onAuthStateChanged(user => {
  if (!user) location.href = "login.html";
  else loadAdminProducts();
});

function logout() {
  auth.signOut();
}

function addProduct() {
  db.collection("products").add({
    name: pname.value,
    price: parseFloat(pprice.value),
    discount: parseFloat(pdiscount.value),
    quantity: parseInt(pqty.value),
    image: pimage.value
  }).then(() => {
    pname.value = pprice.value = pdiscount.value = pqty.value = pimage.value = "";
  });
}

function deleteProduct(id) {
  if (confirm("Delete product?")) {
    db.collection("products").doc(id).delete();
  }
}

function loadAdminProducts() {
  const adminList = document.getElementById("admin-products");
  db.collection("products").onSnapshot(snapshot => {
    adminList.innerHTML = "";
    snapshot.forEach(doc => {
      const p = doc.data();
      adminList.innerHTML += `
        <div>
          <b>${p.name}</b> - $${p.price} (Stock: ${p.quantity})
          <button onclick="deleteProduct('${doc.id}')">Delete</button>
        </div>
      `;
    });
  });
}
