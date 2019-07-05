var express = require('express');
var router = express.Router();
var mysql = require('promise-mysql');

mysql.createConnection({
            host:"localhost",
    database:"reve",
    user:"root",
    password: "oeildufaucon225R#"
        }).then(db=>{
            console.log('connect reussi');
    const Reve = require("../Models/Reve")(db);
    /* GET home page. */
    router.get('/', async function(req, res, next) {
        let info = {}
        const Images = await Reve.getImages();
        const Odd = await Reve.getOdd();
        const Themes = await Reve.getTheme();
        const Groupes = await Reve.getGroupes();
        const Article = await Reve.getArticles();
        info.Images = Images;
        info.Odd = Odd;
        info.Themes = Themes;
        info.Article = Article;
        info.Groupes = Groupes;
        res.render('index', { title: 'Reve', info:info });
    });
}).catch(error => {
            console.log('connect echec');
            next(error);
        })
module.exports = router;



