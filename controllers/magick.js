const fetch = require('node-fetch')
const path = require('path')
const url = require('url')

const extensions = ['.jpg', '.png', '.jpeg']
const byteLimit = 10000000 // 10 MB

async function downloadImg (url) {
    try {
	let response = await fetch(url, {
	    size: byteLimit
	});
	let blob = await response.blob();
	return blob
    } catch (err) {
	return
    }
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
    if (!imgBlob) {
	errRes('File Larger Than 10 MB')
	return
    }
    imgBuff = await imgBlob.arrayBuffer()
    res.header('Content-Type', 'image/' + targetExt.substr(1))
    res.send(Buffer.from(imgBuff))
}
