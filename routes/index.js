var express = require('express');
var bodyParser = require('body-parser')
var FTPService = require('../services/ftpservice')
var Client = require('ftp')

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/testJSON', function(req, res){
  res.setHeader('Content-Type', 'application/json');

  res.send(JSON.stringify({
      status:200,
      content:'TEST JSON OK'
  }));
})

router.get('/test',function(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
 /*   res.send(JSON.stringify({
      a: 1
    }
    ));*/

    FTPService.getFile('/', res);
    //FTPService.putFile("myFile.txt", "clientFile.txt", "New File", res);
})

/* POST event */
router.post('/send', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log(req.body.b);

    res.send(JSON.stringify({
        content: 'post'
    }
    ));
})

module.exports = router;
