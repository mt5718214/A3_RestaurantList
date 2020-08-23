// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')

//setting static files
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//params
app.get('/restaurants/:id', (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === id)
  res.render('show', { restaurant: restaurant })
})

//透過querystring取得特定資料
app.get('/search', (req, res) => {
  // console.log(req.query.keyword)
  const keyword = req.query.keyword
  const restaurantsFilter = restaurantList.results.filter(restaurant => {
    //比對一筆資料中的三個項目,符合其中一項就回傳true
    return restaurant.name.includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurantsFilter, keyword: keyword })
})

//listen and start server
app.listen(port, () => {
  console.log(`This is restaurantList Website is running on localhost:${port}`)
})