require('dotenv').config({path: ".env.deploy"});

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master', } = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/IgorNK/web-plus-pm2-deploy',
      path: DEPLOY_PATH,
      'post-deploy': 'npm i ./frontend && npm --prefix ./frontend run build',
    },
  },
}
