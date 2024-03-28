module.exports = ({ content }) => {
    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Shop</title>
          
          <!-- Google Font -->
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
          
          <!-- Font Awesome -->
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
          
          <!-- Bulma CSS -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
          
          <!-- Custom CSS -->
          <link href="/css/main.css" rel="stylesheet">
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">

          <!-- Custom Styles -->
          <style>
            /* Dark Theme */
            body {
              font-family: 'Roboto', sans-serif;
              background-color: #1e1e1e;
              color: #ffffff;
              margin: 0;
              padding: 0;
            }
            
            header nav.navbar {
              background-color: #333;
            }
            
            .navbar-top {
              padding: 10px 0;
            }
            
            .social a {
              color: #ffffff;
              margin-right: 10px;
            }
            
            .navbar-bottom {
              background-color: #222;
              padding: 10px 0;
            }
            
            .navbar-container {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            
            .title {
              color: #ffffff;
              font-size: 1.5rem;
              margin: 0;
            }
            
            .navbar-buttons {
              display: flex;
            }
            
            .navbar-item {
              margin-left: 10px;
            }
            
            .navbar-item a {
              color: #ffffff;
              text-decoration: none;
              display: flex;
              align-items: center;
            }
            
            .navbar-item a i {
              margin-right: 5px;
            }
            .centered {
                display: flex;
                justify-content: center;
            }
            
    
          </style>
        </head>
  
        <body>
          <header>
           
            <nav class="navbar navbar-bottom">
              <div class="container navbar-container">
                <div class="centered>
                  <a href="/">
                    <h3 class="title">LURE</h3>
                  </a>
                </div>
                <div class="navbar-item">
                  <div class="navbar-buttons">
                    <div class="navbar-item">
                      <a href="/"> Products</a>
                    </div>
                    <div class="navbar-item">
                      <a href="/cart"><i class="fa fa-gift"></i> Cart</a>
                    </div>
                    <div>
                    <a href="/signin"><i class="fas fa-user"></i> Sign In</a>
                   </div>

                </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
  
          ${content}
        </body>
      </html>
    `;
};
