module.exports = ({content})=>{
return`
<!DOCTYPE html>
<html>
<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        <link href="/css/style.css" rel="stylesheet">
      </head>

<body>
${
    content
}
</body>
</html>`
}