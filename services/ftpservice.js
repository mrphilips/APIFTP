let Client = require('ftp')
let fs = require('fs')


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
               // console.log(stream);

                stream.once('close', function() {c.end();})
                stream.pipe(fs.createWriteStream('hello-copy.txt'));

                fs.readFile('hello-copy.txt', 'utf8', function(err, data){
                    console.log(data);
                    console.log("data");

                    res.send(JSON.stringify({
                        content: data
                    }))

                    fs.unlinkSync('hello-copy.txt');

                })

            })
        })

        c.connect({
            host: url,
            user: user,
            password: password
        })
    }

    static putFile(localURI, remoteURI, content, res) {

        let c = new Client();
        c.on('ready', function(){

            console.log("Creating file...");
            fs.writeFile(localURI, content, function(err){
                if(err)
                    return console.log(err);

                c.put(localURI, remoteURI, function(err) {
                    if(err)
                        throw err;

                    console.log("Deleting file...");
                    fs.unlinkSync(localURI);

                    res.send(JSON.stringify({
                        status: 'OK'
                    }))

                    c.end();
                })
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