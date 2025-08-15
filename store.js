const productList = document.getElementById('product-list');
const paypalLink = "https://www.paypal.me/JhonJoross";

db.collection("products").onSnapshot(snapshot => {
    productList.innerHTML = '';
    snapshot.forEach(doc => {
        const product = doc.data();
        const card = document.createElement('div');
        card.className = 'product-card';

        if (product.quantity <= 0) {
            card.classList.add('out-of-stock');
        }

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₱${product.price}</p>
            <button class="btn" ${product.quantity <= 0 ? 'disabled' : ''}>
                Buy Now
            </button>
        `;

        card.querySelector('button').addEventListener('click', () => {
            if (product.quantity > 0) {
                window.location.href = `${paypalLink}/${product.price}`;
            }
        });

        productList.appendChild(card);
    });
});
