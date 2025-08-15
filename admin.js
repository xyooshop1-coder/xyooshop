const adminProductList = document.getElementById('admin-product-list');
const productForm = document.getElementById('product-form');

db.collection("products").onSnapshot(snapshot => {
    adminProductList.innerHTML = '';
    snapshot.forEach(doc => {
        const product = doc.data();
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₱${product.price} | Qty: ${product.quantity}</p>
            <button class="btn delete-btn">Delete</button>
        `;

        card.querySelector('.delete-btn').addEventListener('click', () => {
            db.collection("products").doc(doc.id).delete();
        });

        adminProductList.appendChild(card);
    });
});

productForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const image = document.getElementById('image').value;

    db.collection("products").add({ name, price, quantity, image });
    productForm.reset();
});
