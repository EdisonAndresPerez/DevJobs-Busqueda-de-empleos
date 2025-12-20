fetch('../01-javascript/data.json')
.then(response => response.json())
.then(data => console.log(data))