let db;
const ent = require('ent');
let fsx = require('fs');


module.exports = (_db) =>{
    db = _db;
    return User;
}

let User = class {
    static userExist(_login,_password){
        return new Promise((next) => {
            db.query("SELECT * FROM admin WHERE (email = ? OR pseudo = ?) AND password = ?", [_login, _login, _password])
                .then((result) =>{
                    if (result[0] !== undefined){

                        db.query("UPDATE admin SET login_date = NOW() WHERE admin.id = ?", [parseInt(result[0].id, 10)])
                            .then((results)=>{
                                db.query("SELECT * FROM admin WHERE id = ?", [parseInt(result[0].id, 10)])
                                    .then((result)=> {
                                        next(result[0]);
                                    }).catch((error) => {
                                    next(error.message)
                                })
                            }).catch((error) =>{
                            next(error)});
                    }
                    else{
                        next(new Error("Identification echoué Veuillez Recommencer"))
                    }
                }).catch((err) => {
                next(err)
            })
        })
    }

    static setTheme(theme, profil){
        return new Promise((next)=>{
            db.query("INSERT INTO theme (name,profil) VALUES (?,?)", [theme,profil])
                .then((result)=>{
                    next(result);
                }).catch((err)=>{
                next(err);
            });
        });
    }
    static getTheme(){
        return new Promise((next)=>{
            db.query("select * from theme where id != 0")
                .then((result)=>{
                    next(result);
                }).catch((err)=>{
                next(err);
            });
        });
    }

    static setOdd(theme){
        return new Promise((next)=>{
            db.query("INSERT INTO odd (name,content,id_image,profil) VALUES (?,?,?,?)", [theme.titre,theme.content,parseInt(theme.image,10),theme.Profil])
                .then((result)=>{
                    next(result);
                }).catch((err)=>{
                next(err);
            });
        });
    }
    static getOdd(){
        return new Promise((next)=>{
            db.query("select * from odd where id != 0")
                .then((result)=>{
                    next(result);
                }).catch((err)=>{
                next(err);
            });
        });
    }

    static getImages(){
        return new Promise((next)=>{
            db.query('select * from images where id != 11 ORDER BY id DESC')
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err);
            });
        });
    }
    static setImages(mages){
        return new Promise((next)=>{
            db.query('INSERT INTO images (nom_image) VALUES(?)', [mages])
                .then((result)=>{
                    next(result);
                }).catch((err)=>{
                next(err);
            });
        });
    }

    static getGroupes(){
        return new Promise((next)=>{
            db.query('select * from onglets')
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err);
            });
        });
    }
    static setArticle(elements){
        return new Promise((next)=>{
            db.query('INSERT INTO articles (titre,id_image,id_onglets,id_theme,id_odd,date_creation, content) VALUES(?,?,?,?,?,NOW(),?)',[elements.titre,elements.image,elements.groupe,elements.theme,elements.odd, elements.content])
            .then((result)=>{
                next(result);
            }).catch((err)=>{
                next(err);
            });
        });
    }
    static getArticles(){
        return new Promise((next)=>{
            db.query('SELECT *, images.nom_image imgs, odd.name odd, onglets.nom onglet, theme.name theme, YEAR(articles.date_creation) ye, MONTH(articles.date_creation) mth, DAY(articles.date_creation) jr, HOUR(articles.date_creation) hr, MINUTE(articles.date_creation) min FROM articles LEFT JOIN images ON articles.id_image = images.id LEFT JOIN odd ON articles.id_odd = odd.id LEFT JOIN theme ON articles.id_theme = theme.id LEFT JOIN onglets ON articles.id_onglets = onglets.id ORDER BY articles.id DESC')
                .then((result)=>{
                   for(let i in result){
                       result[i].content = ent.decode(result[i].content)
                       continue;
                   }
                    next(result);
                }).catch((err)=>{
                next(err);
            });
        });
    }

    static getArticle(){
        return new Promise((next)=>{
            db.query('SELECT *, images.nom_image FROM articles LEFT JOIN images ON articles.id_image = images.id ORDER BY articles.id DESC')
            .then((result)=>{
                for(let i in result){
                    result[i].content = ent.decode(result[i].content)
                    continue;
                }
                next(result);
            }).catch((err)=>{
                next(err);
            });
        });
    }


    static getNumberTheme(){
        return new Promise((next)=>{
            db.query("SELECT COUNT(id) num from theme")
                .then((result)=>{
                    next(result[0]);
                }).catch((err)=>{
                next(err);
            });
        });
    }
    static getNumberArticles(){
        return new Promise((next)=>{
            db.query("SELECT COUNT(id) num from articles")
                .then((result)=>{
                    next(result[0]);
                }).catch((err)=>{
                next(err);
            });
        });
    }
}