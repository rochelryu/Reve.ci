var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var ent = require('ent');
const { check, validationResult } = require('express-validator');

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
    const storagePublish = multer.diskStorage({
        destination: __dirname+ "/../public/images/",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    let uploadPublish = multer({
        storage: storagePublish,
    }).array("filepond", 19);
    /* GET users listing. */
    router.get('/', async function(req, res, next) {
        const NumThe = await Reve.getNumberTheme();
        const Article = await Reve.getNumberArticles();
        /*const all = await Reve.userExist("admin",pass);
        console.log(all)*/
        let info = {}
        info.NumThe = NumThe.num;
        info.numArticle = Article.num;
        res.render('admin/index', { title: 'Admin Reve', info:info });
    });
    router.get('/login', async function(req, res, next) {
        const all = await Reve.userExist("core","fake");
        console.log(all)
        res.render('admin/index', { title: 'Admin Reve' });
    });
    router.get('/createGalery', async function(req, res, next) {
        let save = await Reve.getImages();
        let info = {}
        info.images = save;
        res.render('admin/gallery', { title: 'Admin Gallery',info:info });
    });
    router.get('/createTheme', async (req,res,next)=>{
        const themes = await Reve.getTheme();
        const Images = await Reve.getImages();
        let info ={}
        info.themes = themes;
        info.Images = Images;
        res.render('admin/createTheme', {title: "Gestion Theme",info:info });
    });
    router.get('/createODD', async (req, res, next)=>{
        const Odd = await Reve.getOdd();
        const Images = await Reve.getImages();
        let info ={};
        info.Odd = Odd;
        info.Images = Images;
        res.render('admin/createOdd', {title: "Gestion Odd", info:info})
    })
    router.get('/createArticle', async (req, res, next)=>{
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
        res.render('admin/createArticle', {title: "Gestion Articles",info:info})
    })
    router.post('/theme', async (req,res,next)=>{
        const name = req.body.theme;
        const profil = req.body.profil;
       const create = await  Reve.setTheme(name, profil);
        res.redirect('/admin/reve/createTheme')

    })
    router.post('/odd', async (req,res,next)=>{
        let ele = req.body;
        ele.content = ent.encode(ele.content)
        console.log(ele)
        const create = await Reve.setOdd(ele);
        console.log(create)
        res.redirect('/admin/reve/createODD')

    })
    router.post('/createArticle',async (req,res,next)=>{
        if(req.body.who == "createArticle"){
            const elements = req.body;
            elements.content = ent.encode(elements.content)
            const createArticle = await Reve.setArticle(elements);
            res.redirect('/admin/reve/createArticle')
        }
    })
    router.post('/gal', uploadPublish, async (req, res, next)=>{
        let shareTab = new Array();
        console.log(req.files)
        for (let file in req.files){
            let save = await Reve.setImages(req.files[file].filename);
            continue;
        }
        res.redirect('/admin/reve/createGalery');
    })

    /* GET home page. */


}).catch(error => {
    console.log('connect echec');
    next(error);
})

    module.exports = router;
