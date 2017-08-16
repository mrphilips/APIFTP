/*module.exports = {
    apps: [{
        name: 'tutorial-2',
        script: './bin/index.js'
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-13-59-42-82.us-east-2.compute.amazonaws.com',
            key: '~/.ssh/tutorial.pem',
            ref: 'origin/master',
            repo: 'https://github.com/mrphilips/APIFTP.git',
            path: '/home/ubuntu/tutorial-2',
            'post-deploy': 'sudo npm install && sudo pm2 startOrRestart ecosystem.config.js'
        }
    }
}*/

module.exports = {
    apps: [{
        name: 'omschr',
        script: './bin/index.js'
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-18-220-223-224.us-east-2.compute.amazonaws.com',
            key: '~/.ssh/devoms.pem',
            ref: 'origin/master',
            repo: 'https://github.com/mrphilips/APIFTP.git',
            path: '/home/ubuntu/server',
            'post-deploy': 'sudo npm install && sudo pm2 startOrRestart ecosystem.config.js'
        }
    }
}