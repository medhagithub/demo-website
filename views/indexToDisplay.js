const layout = require('../productLayout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map(product => {
      return `
        <div class="column is-one-quarter">
          <div class="card product-card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="data:image/png;base64, ${product.image}" alt="${product.title}">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h3 class="title is-5">${product.title}</h3>
                <p class="subtitle is-6">&#8377;${product.price}</p>
              </div>
            </div>
            <footer class="card-footer">
              <form action="/cart/products" method="POST">
                <button class="button is-primary is-fullwidth">
                  <i class="fa fa-shopping-cart"></i> Add to Cart
                </button>
              </form>
            </footer>
          </div>
        </div>
      `;
    })
    .join('\n');

  return layout({
    content: `
      <section class="banner">
        <div class="container">
          <div class="columns is-centered">
          </div>
        </div>
      </section>
      
      <section class="section">
        <div class="container">
          <h2 class="title is-2 has-text-centered">Beauty Products</h2>
          <div class="columns is-multiline is-centered">
            ${renderedProducts}  
          </div>
        </div>
      </section>
    `
  });
};
