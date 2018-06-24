#!/usr/bin/env node

import { join } from 'path';

import Express from 'express';
import mongoose from 'mongoose';

import helmet from 'helmet';
import csurf from 'csurf';
import morgan from 'morgan';
import multer from 'multer';

import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'express-flash';

import nodeSassMiddleware from 'node-sass-middleware';
import postCssMiddleware from 'postcss-middleware';
import autoprefixer from 'autoprefixer';

import passport from 'passport';

import chalk from 'chalk';
import signale from 'signale';

// ROUTES
import mainRoute from './routes/index';


dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/project-name');

const port = process.env.PORT || 3000;
const db = mongoose.connection;
const rootDir = join(__dirname, '..');

const app = Express();

db.on('connected', () => signale.success('Mongoose connected'))
db.on('disconnected', () => signale.fatal('Mongoose disconnected'))

app.set('view engine', 'pug');
app.set('views', join(rootDir, 'views'));

app.use(session({ secret: 'secret-session-key' }))
app.use(cookieParser());

app.use(helmet());
app.use(flash());
app.use(csurf({ cookie: true }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(nodeSassMiddleware({
  src: join(rootDir, 'public', 'sass'),
  dest: join(rootDir, 'public', 'css'),
  prefix: '/css',
  debug: false,
  outputStyle: 'compressed',
}));

app.use(postCssMiddleware({
  plugins: [
    autoprefixer({
      browsers: [
        'last 2 versions',
        '> 1%',
      ],
    }),
  ],
  src: req => join(rootDir, 'public', 'css', req.path === '/' ? 'master' : req.path),
}));

// Public folder
app.use(Express.static(join(rootDir, 'public')))

// Error handling
app.use((error, req, res, next) => {
  if ( error ) {
    signale.fatal(error);

    if ( /(dev|deve)lopment/g.test(process.env.NODE_ENV) ) {
      return res.send({ error })
    }

    return res.send(500);
  }

  return next();
})

// Routes
app.use(mainRoute);

// Page not found error
app.get('*', (req,res) => {
	res.render('error', {
    error: {
      code: 404,
      message: 'Whoops! Page not found..'
    }
  });
})

app.listen(port, () => {
  console.clear();
  signale.success(chalk`{cyan Web Server} running at: {yellow {underline http://localhost{dim :${port}}}}`);
})