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

    static getFile(uri, res) {
        let c = new Client();
        c.on('ready', function(){
            c.get('CHR335.DAT', function(err, stream) {
                //console.log(stream);

                stream.on('data', (chunk) => {
                    //console.log(chunk.toString());

                    res.send(JSON.stringify({
                        content: chunk.toString()
                    }))

                } );
            })
        })

        c.connect({
            host: url,
            user: user,
            password: password
        })
    }

    static putFile(text, remoteURI, content, res) {
        let fContent = `A 
                TOTAL RANDOM
            FILE CONTENT.`;


        let s = new Readable();

        s._read = function noop() {};

        s.push(text);
        s.push(null);

        console.log(s);

        let c = new Client();
        c.on('ready', function(){

            c.put(s, remoteURI, function(err) {
                    if(err)
                        throw err;

                    res.send(JSON.stringify({
                        status: 'OK'
                    }))

                    c.end();
                })
        })

        c.connect({
            host: url,
            user: user,
            password: password
        });
    }

}

module.exports = FTPService;