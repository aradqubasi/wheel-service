var express = require('express');
var router = express.Router();

/*POST iwant*/
router.post('/', function(req, res, next) {
    // var stuff = req.param('stuff');
    // var stuff = 'nothing'
    var stuff = req.query.stuff
    var user = ''
    var isAnonymous = req.body.isAnonymous
    if (isAnonymous) {
        user = 'Someone'
    }
    else {
        user = req.body.email;
    }
    var db = req.db;
    var collection = db.get('iwants');
    collection.insert({
        "email":user,
        "isAnonymous":isAnonymous,
        "stuff":stuff
    }, function(err, doc) {
        if (err) {
            res.send('Error');
        }
        else {
            res.send(user + ' wants ' + stuff);
        }
    });
    // res.send(user + ' wants ' + stuff);
});

/*GET what users want*/
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('iwants');
    collection.find({}, {}, function (e, docs) {
        res.send(docs);
    });
})

module.exports = router;