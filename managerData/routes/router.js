var news = require('../services/news')
var body_parser = require('body-parser');
var db = require('../persistence/db');
exports.assignRoutes = function(app) {
    app.use(body_parser.urlencoded({ extended: true }));
    //Insertar datos
    // db.connectDB();

    //   app.get('/news/:tipo', db.selectNews);
    //  app.post('/noticia', db.selectNew);

}