export const protected = (req, res, next) => {
	if ( !req.user ) {
		return res.redirect('back');
	}

	next();
}

// Example
export const userLevel2 = (req, res, next) => protected(req, res, () => {
	if ( req.user.lvl < 2 ) {
		return res.redirect('back');
	}
	
	next();
});
