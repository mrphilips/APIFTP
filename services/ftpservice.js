let Client = require('ftp')
let fs = require('fs')
let Readable = require('stream').Readable
//let url = '192.168.1.207';
let url='localhost';
let user = 'test';
let password = 'test';

class FTPService {

    static listDirectory(dir){
        let c = new Client();
        c.on('ready', function(){
            c.list(function(err,list){
                if(err) throw err;
                console.dir(list);
                c.end();
            })
        });

        c.connect({
            host: url,
            user: user,
            password: password
        });
    }

    static getFile(res, content) {
        let c = new Client();

        console.log(content);

        c.on('ready', function(){
            c.get(content.uri, function(err, stream) {
                if(err)
                   FTPService.sendFTPError(res,err, content);

                else
                    stream.on('data', (chunk) => {
                        //console.log(chunk.toString());

                        res.send(JSON.stringify({
                            status:200,
                            content: chunk.toString()
                        }))

                    } );
            })
        })

        c.on('error', function(err){
            FTPService.sendFTPError(res, err, content);
        })

        c.connect(content.config)
    }

    static sendFTPError(res, err, content){
        var data = {status:0};

        switch(err.code){
            case 550:
                data.error = content.uri+': Fichier non disponible';
                break;

            case 530:
                data.error = content.config.user+': Connexion non établie';
                break;

            case 'ENOTFOUND':
                data.error = content.config.host+': Serveur FTP introuvable';
                break;

            default:
                data.error = 'Une erreur est survenue';
                break;
        }

        data.error+=' ('+err.code+')';

        res.send(JSON.stringify(data));
    }

    static putFile(res, content) {
        console.log(content);
        let s = new Readable();

        s._read = function noop() {};

        s.push(content.file);
        s.push(null);

       // console.log(s);

        let c = new Client();
        c.on('ready', function(){

            c.put(s, content.uri, function(err) {
                if(err)
                    FTPService.sendFTPError(res,err, content);


                res.send(JSON.stringify({
                        status: 200,
                        content:'OK'
                    }))

                    c.end();
                })
        })

        c.on('error', function(err){
            FTPService.sendFTPError(res, err, content);
        })

        c.connect(content.config);
    }

}

module.exports = FTPService;