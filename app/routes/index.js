import { Router } from 'express';
import pkg from '../../package.json';

const router = Router();

router.use((req, res, next) => {
	res.locals.sitename = pkg.name;
	res.locals.cookies = req.cookies;
	res.locals.session = req.session;
	res.locals.user = req.user;

	next();
})

router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'HomePage'
	});
})

export default router;