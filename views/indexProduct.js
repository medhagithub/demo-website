const layout = require('../layout');

module.exports = ({ product }) => {
  if (!product || !Array.isArray(product)) {
    // Handle case where products is not defined or not an array
    return layout({
      content: `
        <h1 class="title">No products available</h1>
      `
    });
  }

  const renderedProducts = product
    .map(prod => {
      return `
      <tr>
        <td>${prod.title}</td>
        <td>${prod.price}</td>
        <td>${prod.quantity}</td>

        <td>
          <a href="/admin/products/${prod.id}/edit">
            <button class="button is-link">
              Edit
            </button>
          </a>
        </td>
        <td>
        <form method="POST" action="/admin/products/${prod.id}/delete">
        <button class="button is-danger">Delete</button>
      </form>
        </td>
      </tr>
    `;
    })
    .join('');

  return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">Products</h1>  
        <a href="/admin/products/new" class="button is-primary">New Product</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
    `
  });
};
