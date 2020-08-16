const request = require('postman-request')
const fs = require('fs')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
    // const news = fs.readFileSync('jobs_news.json')
const news = { NEWS: '' }

const GetNewsFromAPI = () => {
    console.log('i am running');
    // fs.unlinkSync("jobs_news.json")
    url = "http://newsapi.org/v2/everything?q=Jobs&pageSize=100&sortBy=publishedAt&apiKey=5f84106dae3d475092fb76d3b5f148e5"
    request({ url, 'json': true }, (error, { body }) => {
        if (error) {
            console.log(error);
        } else if (body.error) {
            console.log(body.error);
        } else {
            // fs.writeFileSync('jobs_news.json', JSON.stringify({ NEWS: body.articles }))
            news.NEWS = body.articles
        }
    })
}

setInterval(() => {
    GetNewsFromAPI()
}, 10000);

app.get('/', (req, res) => {
    // return res.send(JSON.parse(news))
    return res.send(news)

})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
