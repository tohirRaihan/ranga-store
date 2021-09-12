// load all product ----------------------------------------
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  // const url = `https://raw.githubusercontent.com/tohirRaihan/test/master/fakeStore.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI ----------------------------------
const showProducts = (products) => {
  for (const product of products) {
    // set image url
    const image = product.image;
    // prepare the div for single product
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="single-product">
        <div>
          <img class="product-image" src=${image}></img>
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <h2>Price: $${product.price}</h2>
        </div>

        <div>
          <div class="rating">
            <div class="rate">
              ${product.rating?.rate} <span class="glyphicon glyphicon-star text-warning" aria-hidden="true"></span>
            </div>
            <div class="count">
              <span class="glyphicon glyphicon-user text-info" aria-hidden="true"></span> ${product.rating?.count}
            </div>
          </div>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></button>
          <button id="details-btn" class="btn btn-primary">Details <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
        </div>
      </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};

// set innerText of a field --------------------------------
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// get inner text and parse it to a float ------------------
const getInputValue = (id) => {
  return parseFloat(document.getElementById(id).innerText);
};

// add product to cart and calculate all -------------------
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  setInnerText('total-Products', count);
};

// main price update function ------------------------------
const updatePrice = (id, value) => {
  const oldPrice = getInputValue(id);
  const newItemPrice = parseFloat(value);
  const total = oldPrice + newItemPrice;
  setInnerText(id, total.toFixed(2));
};

// update delivery charge and total Tax --------------------
const updateTaxAndCharge = () => {
  const price = getInputValue("price");
  if (price > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (price * 0.2).toFixed(2));
  }
  if (price > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (price * 0.3).toFixed(2));
  }
  if (price > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (price * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  setInnerText('total', grandTotal.toFixed(2));
};
