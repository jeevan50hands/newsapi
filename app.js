const request = require('postman-request')
const fs = require('fs')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const news = fs.readFileSync('https://50hands.org/api/jobs_news.json')

const GetNewsFromAPI = () => {
    fs.unlinkSync("jobs_news.json")
    url = "http://newsapi.org/v2/everything?q=Jobs&pageSize=100&sortBy=publishedAt&apiKey=5f84106dae3d475092fb76d3b5f148e5"
    request({ url, 'json': true }, (error, { body }) => {
        if (error) {
            console.log(error);
        } else if (body.error) {
            console.log(body.error);
        } else {
            fs.writeFileSync('https://50hands.org/api/jobs_news.json', JSON.stringify({ NEWS: body.articles }))
        }
    })
}

setInterval(() => {
    GetNewsFromAPI()
}, 3600000);

app.get('/', (req, res) => {
    return res.send(JSON.parse(news))
})

app.get('*', (req, res) => {
    return res.render({
        errorText: '404 Error'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
