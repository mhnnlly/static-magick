const fetch = require('node-fetch')
const path = require('path')
const url = require('url')

const extensions = ['.jpg', '.png', '.jpeg']

async function downloadImg (url) {
    let response = await fetch(url);
    let blob = await response.blob();
    return blob
}

exports.magick = async (req, res) => {
    let errRes = (msg) => {
	res.render('error.ejs', {
	    message: msg
	})
    }
    let queryObj = url.parse(req.url, true).query
    let target = queryObj['target']
    if (!target) {
	errRes('Missing Target File')
	return
    }
    let targetExt = path.extname(target)
    if (!targetExt || extensions.indexOf(targetExt) === -1) {
	errRes('Target Must Have Extension jpg/jpeg/png')
	return
    }
    imgBlob = await downloadImg(target)
    imgBuff = await imgBlob.arrayBuffer()
    res.send(Buffer.from(imgBuff))
}
