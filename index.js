const app = require('express')()
const port = 8080

app.get('/', (req, res) => {
    res.send(':^)')
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
