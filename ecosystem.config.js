module.exports = {
    apps: [{
        name: 'tutorial-2',
        script: './bin/WWW'
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-18-220-131-37.us-east-2.compute.amazonaws.com',
            key: '~/.ssh/tutorial.pem',
            ref: 'origin/master',
            repo: 'https://github.com/mrphilips/APIFTP.git',
            path: '/home/ubuntu/tutorial-2',
            'post-deploy': 'sudo npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
}