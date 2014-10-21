var generic_pool     = require('generic-pool');
var mysql            = require('mysql');

var db = {};

db.pool = generic_pool.Pool({
    name: 'mysql',
    create: function(callback) {
        var config = {
            host     : "your host",
            port     : 3306,
            user     : "root",
            password : "your password",
            database : "your database"
        };
        var client = mysql.createConnection(config);
        client.connect(function(err) {
            if(err) console.error('Database Connection Error', err);
            callback(err, client);
        });
    },
    destroy: function(client) {
        client.end();
    },
    max: 10,
    min: 2,
    idleTimeoutMillis : 30000,
    log : false
});


db.process = process.on('exit', function (){
    pool.drain(function() {
        pool.destroyAllNow();
    });
});

module.exports = db
