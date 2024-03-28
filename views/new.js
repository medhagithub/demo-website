const layout = require('../layout');
const { getError } = require('../../routes/helper');

module.exports = ({ errors }) => {
    return layout({
      content: `
      <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="subtitle">Create a Product</h1>

        <form method="POST" enctype="multipart/form-data">
          <div class="field">
            <label class="label">Title</label>
            <input class="input" placeholder="Title" name="title">
            <p class="help is-danger">${getError(errors, 'title')}</p>
          </div>
          
          <div class="field">
            <label class="label">Price</label>
            <input class="input" placeholder="Price" name="price">
            <p class="help is-danger">${getError(errors, 'price')}</p>
          </div>
          
          <div class="field">
          <label class="label">Quantity</label>
          <input class="input" placeholder="Quantity" name="quantity">
          <p class="help is-danger">${getError(errors, 'quantity')}</p>
        </div>

          <div class="field">
            <label class="label">Image</label>            
            <input type="file" name="image" />
          </div>
          <br />
          <button class="button is-primary">Create</button>
        </form>
      </div>
    </div>
  `
});
};
 //default value of form is get method
   //enctype is "application/x-www-from-urlencoded"