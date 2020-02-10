const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const cards = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    res.render("layout")
})

server.get("/index", function(req, res) {
    res.render("layout")
})

server.get("/sobre", function(req,res) {
    res.render("sobre")
})

server.get("/receitas", function(req,res) {
    res.render("receitas", {items: cards })
})

server.get("/receita" , function(req, res) {
    const id = req.query.id 

    const card = cards.find(function(card) {
        return card.id == id
    })

    return res.render("receita", { item: card })
})

server.listen(5000, function() {
    console.log("server is running")
})