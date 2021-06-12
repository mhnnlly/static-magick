const crypto = require('crypto')
const fetch = require('node-fetch')
const fs = require('fs')
const gm = require('gm')
const path = require('path')
const {promisify} = require('util')
const url = require('url')

const extensions = ['.jpg', '.png', '.jpeg']
const byteLimit = 10000000 // 10 MB

const filters = {
    'average': (img, args) => img.average(),
    'bitdepth': (img, args) => img.bitdepth(args[0]),
    'blur': (img, args) => img.blur(args[0], args[1]),
    'border': (img, args) => img.border(args[0], args[1]),
    'borderColor': (img, args) => img.borderColor(args[0]),
    'channel': (img, args) => img.channel(args[0]),
    'charcoal': (img, args) => img.charcoal(args[0]),
    'clip': (img, args) => img.clip(),
    'coalesce': (img, args) => img.coalesce(),
    'colorize': (img, args) => img.colorize(args[0], args[1], args[2]),
    'colors': (img, args) => img.colors(args[0]),
    'contrast': (img, args) => img.contrast(args[0]),
    'cycle': (img, args) => img.cycle(args[0]),
    'edge': (img, args) => img.edge(args[0]),
    'emboss': (img, args) => img.emboss(args[0]),
    'enhance': (img, args) => img.enhance(),
    'negative': (img, args) => img.negative()   
}

function hash (str) {
    return crypto.createHash('sha1').update(str).digest('hex')
}

async function fetchImg (url) {
    try {
	let response = await fetch(url, {
	    size: byteLimit
	});
	if (!response.ok)
	    return
	return response
    } catch (err) {
	console.log(err)
	return
    }
}

async function applyFilters (filepath, obj) {
    try {
	let img = gm(filepath)
	for (let key in obj) {
	    if (filters[key]) {
		img = filters[key](img, obj[key].split(','))
	    }
	}
	return img
    } catch (err) {
	console.log(err)
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
    let src = queryObj['src']
    if (!src) {
	errRes('Missing URL Of Source File')
	return
    }
    let srcExt = path.extname(src)
    if (!srcExt || extensions.indexOf(srcExt) === -1) {
	errRes('Src Must Have Extension jpg/jpeg/png')
	return
    }
    let srcpath = path.join(__dirname, '../files/'+hash(src))
    if (!fs.existsSync(srcpath)) {
	imgResp = await fetchImg(src)
	if (!imgResp) {
	    errRes('Either Bad Source URL Or Larger Than 10 MB')
	    return
	}
	imgBuff = Buffer.from(await imgResp.arrayBuffer())
	fs.writeFileSync(srcpath, imgBuff)
    }
    let reqpath = path.join(__dirname, '../files/'+hash(JSON.stringify(queryObj)))
    if (!fs.existsSync(reqpath)) {
	let img = await applyFilters(srcpath, queryObj)
	img.write(reqpath, err => {
	    if (err)
		console.log(err)
	    res.header('Content-Type', 'image/' + srcExt.substr(1))
	    res.sendFile(reqpath)
	})
    } else {
	res.header('Content-Type', 'image/' + srcExt.substr(1))
	res.sendFile(reqpath)
    }
}
