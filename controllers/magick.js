const url = require('url')

exports.magick = (req, res) => {
    let queryObj = url.parse(req.url, true).query
    let target = queryObj['target']
    if (!target) {
	res.render('error.ejs', {
	    message: 'Missing Target Path'
	})
	return
    }
    res.send(queryObj)
}
