require('dotenv').config({path: ".env.deploy"});

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master', } = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:IgorNK/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'post-deploy': 'npm --prefix ./frontend i && npm --prefix ./frontend run build',
    },
  },
}
