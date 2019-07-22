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