const request = require('postman-request')
const fs = require('fs')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()

const GetNewsFromAPI = () => {
    url = "http://newsapi.org/v2/everything?q=Jobs&pageSize=100&sortBy=publishedAt&apiKey=5f84106dae3d475092fb76d3b5f148e5"
    request({ url, 'json': true }, (error, { body }) => {
        if (error) {
            console.log(error);
        } else if (body.error) {
            console.log(body.error);
        } else {
            fs.unlinkSync("jobs_news.json")
            fs.writeFileSync('jobs_news.json', JSON.stringify({ NEWS: body.articles }))

        }
    })
}
app.get('/news', (req, res) => {
    GetNewsFromAPI()
    return res.send({ NEWS: "Done" })
})

app.get('/', (req, res) => {

    return res.send({ NEWS: "Get News" })
})


app.get('/getnews', (req, res) => {
    const news = fs.readFileSync('jobs_news.json')
    return res.send(JSON.parse(news))
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
