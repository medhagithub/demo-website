const layout = require("./layout")
const {getError} = require("../routes/helper")
module.exports = ({ req, errors }) => {
    return layout({
      content: `
      <style>
      body {
        background-color: black;
        color: hotpink;
        font-family: Arial, sans-serif;
      }
      form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        background-color: #222;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
      }
      input[type="text"],
      input[type="file"],
      button {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        border: none;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 16px;
      }
      input[type="text"],
      input[type="file"] {
        background-color: #333;
        color: hotpink;
      }
      button {
        background-color: hotpink;
        color: black;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      button:hover {
        background-color: #ff69b4;
      }
      .error-message {
        color: #ff69b4;
        font-size: 14px;
      }
    </style>
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
              <div class="field">
                <label class="label">Email</label>
                <input class="input" placeholder="Email" name="email" />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <div class="field">
                <label class="label">Password Confirmation</label>
                <input class="input" placeholder="Password Confirmation" name="passwordConfirmation" type="password" />
                <p class="help is-danger">${getError(
                  errors,
                  'passwordConfirmation'
                )}</p>
              </div>
              <button class="button is-primary">Submit</button>
            </form>
            <a href="/signin">Have an account? Sign In</a>
          </div>
        </div>
      </div>
    `
  });
};