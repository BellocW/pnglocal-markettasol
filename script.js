const binId = "68f577f3d0ea881f40ad158a";  // Replace later
const apiKey = "$2a$10$dg1ruj5g9bHdMEIL5wK4Run/bIr0gdYbE59zJ724P8PPm5TWai2ta";  // Replace later
const binUrl = `https://api.jsonbin.io/v3/b/${binId}`;

async function fetchProducts() {
    const res = await fetch(binUrl, { headers: { "X-Master-Key": apiKey } });
    const data = await res.json();
    const products = data.record.products || [];
    displayProducts(products);
}

function displayProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";
    products.forEach(p => {
        container.innerHTML += `
      <div class="product">
        <h3>${p.name} - K${p.price}</h3>
        <img src="${p.image}" alt="${p.name}" />
        <p>${p.desc}</p>
      </div>
    `;
    });
}

document.getElementById("postBtn").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const desc = document.getElementById("desc").value;
    const image = document.getElementById("image").value;

    const res = await fetch(binUrl, { headers: { "X-Master-Key": apiKey } });
    const data = await res.json();
    const products = data.record.products || [];

    products.push({ name, price, desc, image });

    await fetch(binUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": apiKey
        },
        body: JSON.stringify({ products })
    });

    fetchProducts();
});

fetchProducts();
