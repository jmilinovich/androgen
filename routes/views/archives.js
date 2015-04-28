var keystone = require('keystone');
var _ = require('underscore');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	// Set locals
	locals.section = 'archives';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};
	
	// Load other posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('6');
		
		q.exec(function(err, results) {
			
			locals.data.posts = results;
			
			next(err);
		});
		
	});
	
	// Render the view
	view.render('archives');
	
};
