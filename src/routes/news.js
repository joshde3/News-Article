const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('', async(req, res) => {
    try {
        const newsAPI = await axios.get(`http://newsapi.org/v2/everything?q=news&sortBy=popularity&apiKey=29f33115b9334dcfb2d8772b71132fd3`)
        res.render('news', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            res.render('news', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('news', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
    } 
})

newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`http://newsapi.org/v2/everything?q=${search}&apiKey=29f33115b9334dcfb2d8772b71132fd3`)
        res.render('newsSearch', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})


module.exports = newsRouter 
