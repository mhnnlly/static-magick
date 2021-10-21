const crypto = require('crypto')
const fetch = require('node-fetch')
const ftype = require('file-type')
const fs = require('fs')
const gm = require('gm')
const path = require('path')
const {promisify} = require('util')
const url = require('url')

const extensions = ['image/jpg', 'image/png', 'image/jpeg']
const byteLimit = 3 * 1000 * 1000 // 3 MB
const timeToExpire = 5 * 60 * 1000 // 5 Minutes

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
    'implode': (img, args) => img.implode(args[0]),
    'lower': (img, args) => img.lower(args[0], args[1]),
    'monochrome': (img, args) => img.monochrome(),
    'motionBlur': (img, args) => img.motionBlur(args[0],args[1],args[2]),
    'negative': (img, args) => img.negative(),
    'paint': (img, args) => img.paint(args[0]),
    'raise': (img, args) => img.raise(args[0], args[1]),
    'roll': (img, args) => img.roll(args[0], args[1]),
    'rotate': (img, args) => img.rotate(args[0], args[1]),
    'sepia': (img, args) => img.sepia(),
    'shade': (img, args) => img.shade(args[0], args[1]),
    'sharpen': (img, args) => img.sharpen(args[0], args[1]),
    'shear': (img, args) => img.shear(args[0], args[1]),
    'solarize': (img, args) => img.solarize(args[0]),
    'spread': (img, args) => img.spread(args[0]),
    'swirl': (img, args) => img.swirl(args[0]),
    'type': (img, args) => img.type(args[0]),
    'wave': (img, args) => img.wave(args[0], args[1])
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

function setExpire (path) {
    setTimeout(() => {
	fs.unlink(path, err => {
	    if (err)
		console.log(err)
	})
    }, timeToExpire)
}

const writeFile = promisify(fs.writeFile)

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
    let srcpath = path.join(__dirname, '../files/'+hash(src))
    if (!fs.existsSync(srcpath)) {
	imgResp = await fetchImg(src)
	if (!imgResp) {
	    errRes('Bad Source URL')
	    return
	}
	try {
	    imgBuff = Buffer.from(await imgResp.arrayBuffer())
	} catch(err) {
	    errRes('File Size Must Be <30 MB')
	    return
	}
	await writeFile(srcpath, imgBuff)
	setExpire(srcpath)
    }
    let srcMime = (await ftype.fromFile(srcpath)).mime
    if (extensions.indexOf(srcMime) === -1) {
	fs.unlink(srcpath, err => {
	    console.log(err)
	})
	errRes('File Type Must Be jpg/jpeg/png')
	return
    }
    let reqpath = path.join(__dirname, '../files/'+hash(JSON.stringify(queryObj)))
    if (!fs.existsSync(reqpath)) {
	let img = await applyFilters(srcpath, queryObj)
	img.write(reqpath, err => {
	    if (err)
		console.log(err)
	    res.header('Content-Type', srcMime)//'image/' + srcExt.substr(1))
	    res.sendFile(reqpath)
	    setExpire(reqpath)
	})
    } else {
	res.header('Content-Type', srcMime)//'image/' + srcExt.substr(1))
	res.sendFile(reqpath)
    }
}
