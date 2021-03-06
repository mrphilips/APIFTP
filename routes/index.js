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
      content:'JSON TEST OK'
  }));
})


router.post('/getFile', function(req, res){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

//    console.log(req.body);

    FTPService.getFile(res, req.body);

})

router.get('/test',function(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

    console.log(req.url);

    /*   res.send(JSON.stringify({
         a: 1
       }
       ));*/

    FTPService.getFile('/', res);
    //FTPService.putFile("myFile.txt", "clientFile.txt", "New File", res);
})



/* POST event */
router.post('/sendFile', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log(req.body.b);

    FTPService.putFile(res, req.body);


    /*res.send(JSON.stringify({
        content: 'post'
    }
    ));*/

})

module.exports = router;
