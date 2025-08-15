import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const catalogEl = document.getElementById('catalog');
const searchEl = document.getElementById('search');

// Helper functions
const fmt = (n) => new Intl.NumberFormat('en-US', { 
  style: 'currency', 
  currency: CURRENCY 
}).format(n);

// Render products
function render(products) {
  // ... (your existing render function)
}

// Live products feed
const qProducts = query(collection(db, 'products'), orderBy('name'));
onSnapshot(qProducts, snap => {
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  render(items);
});
