var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const path = require('path');
const csvFilePath = path.join(__dirname, '../data/offense_codes.csv');
const csvFilecrimen = path.join(__dirname, '../data/crime.csv');
const csv = require('csvtojson')


// ************ INSERTAR DATOS EN MONGO DB//
exports.connectDB = function() {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
                if (err) throw err;
                var dbo = db.db("crimenes");
                dbo.collection("ofensiva").insertMany(jsonObj, (err, res) => {
                    if (err) throw err;
                    db.close();
                });
            });
        })

    csv()
        .fromFile(csvFilecrimen)
        .then((jsonObj1) => {
            mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
                if (err) throw err;
                var dbo = db.db("crimenes");
                dbo.collection("crimen").insertMany(jsonObj1, (err, res) => {
                    if (err) throw err;
                    console.log("Number of documents inserted: " + res.insertedCount);
                    db.close();
                });
            });
        })
}


exports.categoria = function(req, res) {
    getcategoria({ "OFFENSE_CATEGORY_ID": "all-other-crimes" }, (documentos) => {
        res.send(documentos);
    })
}

function getcategoria(query, callback) {
    mongoClient.connect(url, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("crimenes"); //here
        findDataCategoria(query, dbase, callback)
            //   client.close();
    });
}

const findDataCategoria = async function(query, db, callback) {
    const collection = db.collection('crimen');
    /*
        collection.find({ "OFFENSE_CATEGORY_ID": "burglary" }).toArray(function(err, docs) {
            console.log(docs.length)
            callback(docs);
        });*/

    collection.group(['OFFENSE_CATEGORY_ID'], {}, { "count": 0 }, "function (obj, prev) { prev.count++; }", function(err, docs) {
        console.log(docs);
        callback(docs);
    });

}