
class App extends React.Component {

    constructor(props) {
	super(props)
	this.state = {srcURL: props.srcURL,
		      filterParams: '&contrast=4&implode=1.2&paint=9&swirl=-240'}
	this.handleChange = this.handleChange.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
	this.resetFilters = this.resetFilters.bind(this)
	this.handleImageLoad = this.handleImageLoad.bind(this)
    }
    
    getParams(state) {
	const enabledFilters = ['blur', 'charcoal', 'colorize', 'colors', 'contrast',
				'cycle', 'edge', 'emboss', 'negative', 'border', 'implode',
				'lower', 'monochrome', 'motionBlur', 'paint', 'raise',
				'roll', 'rotate', 'sepia', 'shade', 'sharpen', 'shear',
				'solarize', 'spread', 'swirl', 'type', 'wave']

	const filtMap = {
	    'blur': (state) => {return state.blurX && state.blurY ?
				       '&blur=' + state.blurX + ',' + state.blurY : ''},
	    'border': (state) => {return state.borderX && state.borderY && state.borderColor ?
					 '&borderColor=' + state.borderColor +
				  '&border=' + state.borderX + ',' + state.borderY : ''},
	    'charcoal': (state) => {return state.charcoalFact ?
				    '&charcoal=' + state.charcoalFact : ''},
	    'colorize': (state) => {return state.colorizeR && state.colorizeG && state.colorizeB ?
				    '&colorize=' + state.colorizeR  + ','
				    + state.colorizeG + ',' + state.colorizeB : ''},
	    'colors': (state) => {return state.colors ? '&colors=' + state.colors : ''},
	    'contrast': (state) => {return state.contrast ? '&contrast=' + state.contrast : ''},
	    'cycle': (state) => {return state.cycle ? '&cycle=' + state.cycle : ''},
	    'edge': (state) => {return state.edge ? '&edge=' + state.edge : ''},
	    'emboss': (state) => {return state.emboss ? '&emboss=' + state.emboss : ''},
	    'negative': (state) => {return state.negative ? '&negative' : ''},
	    'implode': (state) => {return state.implode ? '&implode=' + state.implode : ''},
	    'lower': (state) => {return state.lowerX && state.lowerY ? '&lower=' +
				 state.lowerX + ',' + state.lowerY : ''},
	    'monochrome': (state) => {return state.monochrome ? '&monochrome' : ''},
	    'motionBlur': (state) => {return state.motionRadius && state.motionSigma &&
				      state.motionAngle ? '&motionBlur=' + state.motionRadius +
				      ',' + state.motionSigma + ',' + state.motionAngle : ''},
	    'paint': (state) => {return state.paint ? '&paint=' + state.paint : ''},
	    'raise': (state) => {return state.raiseX && state.raiseY ? '&raise=' + state.raiseX +
				 ',' + state.raiseY : ''},
	    'roll': (state) => {return state.rollX && state.rollY ? '&roll=' + state.rollX +
				',' + state.rollY : ''},
	    'rotate': (state) => {return state.rotateColor && state.rotateA ? '&rotate='+
				  state.rotateColor + ',' + state.rotateA : ''},
	    'sepia': (state) => {return state.sepia ? '&sepia' : ''},
	    'shade': (state) => {return state.shadeA && state.shadeE ? '&shade=' + state.shadeA +
				 ',' + state.shadeE : ''},
	    'sharpen': (state) => {return state.sharpenR && state.sharpenS ? '&sharpen=' +
				   state.sharpenR + ',' + state.sharpenS : ''},
	    'shear': (state) => {return state.shearX && state.shearY ? '&shear=' + state.shearX +
				 ',' + state.shearY : ''},
	    'solarize': (state) => {return state.solarize ? '&solarize=' + state.solarize : '' },
	    'spread': (state) => {return state.spread ? '&spread=' + state.spread : '' },
	    'swirl': (state) => {return state.swirl ? '&swirl=' + state.swirl : '' },
	    'type': (state) => {return state.type ? '&type=' + state.type : '' },
	    'wave': (state) => {return state.waveAmp && state.waveLen ? '&wave=' + state.waveAmp +
				',' + state.waveLen : '' }
	    
	}
	let res = ''
	enabledFilters.forEach((val, index, array) => {
	    res += filtMap[val](state)
	})
	return res
    }

    handleChange(e) {
	e.preventDefault()
	const target = event.target
	const value = target.type === 'checkbox' ? target.checked : target.value
	const name = target.name
	this.setState({
	   [name]: value
	})
	console.log(this.state)
    }

    handleImageLoad() {
	this.setState({
	    isLoading: false
	})
    }

    handleSubmit(e) {
	e.preventDefault()
	this.setState({
	    srcURL: this.state.src,
	    filterParams: this.getParams(this.state),
	    isLoading: true
	})
    }

    resetFilters() {
	this.setState({
	    filterParams: '',
	    blurX: null,
	    blurY: null,
	    borderX: null,
	    borderY: null,
	    borderColor: null,
	    charcoal: null,
	    colorizeR: null,
	    colorizeG: null,
	    colorizeB: null,
	    colors: null,
	    contrast: null,
	    cycle: null,
	    edge: null,
	    emboss: null,
	    edges: null,
	    negative: null,
	    implode: null,
	    lowerX: null,
	    lowerY: null,
	    monochrome: null,
	    motionRadius: null,
	    motionSigma: null,
	    motionAngle: null,
	    paint: null,
	    raiseX: null,
	    raiseY: null,
	    rollX: null,
	    rollY: null,
	    rotateColor: null,
	    rotateA: null,
	    sepia: null,
	    shadeA: null,
	    shadeE: null,
	    sharpenR: null,
	    sharpenS: null,
	    shearX: null,
	    shearY: null,
	    solarize: null,
	    spread: null,
	    swirl: null,
	    type: null,
	    waveAmp: null,
	    waveLen: null
	    
	})
    }
    
    render() {
	let srcURL = this.state.srcURL
	let filterURL = window.location.href + 'magick?src=' +
			this.state.srcURL + this.state.filterParams
	return (
	    <div class='container'>
		<br/>
		<div class='row'>
		    <h1>StaticMagick</h1>
		    <p>Documentation of API <a href='http://github.com/mhennelly/static-magick'>here</a></p>
		</div>
		<div class='row'>
		    <div class='col-3'>
			<div class='row'>
			    <p>The Original Image</p>
			    <figure class='figure'>
				<img src={srcURL} class='figure-img img-fluid rounded img-thumbnail'
				     alt=':)'/>
				<figcaption class='figure-caption'><a href={srcURL}>{srcURL}
								   </a></figcaption>
			    </figure>
			</div>
			<div class='row'>
			    <p>The API Edit</p>
			    <figure class='figure'>
				<img src={filterURL}
				     class='figure-img img-fluid rounded img-thumbnail' alt=':)'
				     onLoad={this.handleImageLoad}/>
				{this.state.isLoading?
				 <div>
				     <strong>Loading...</strong>
				     <div class='spinner-border float-right text-primary spinner-border-sm'
					  role='status' aria-hidden='true'></div>
				 </div>
				 : <figcaption class='figure-caption'><a href={filterURL}>{filterURL}
								      </a><br/><br/>

				       With StaticMagick you can easily apply filters to publicly
				       available static images without needing to download them first.
				       Using this web API you can apply GraphicsMagick edits through
				       HTTP requests in your browser, or you can embed these new
				       images in your own website by using the
				       URL destination as the source. I'd advise you use the latter
				       case for prototyping purposes only, and then if you want to
				       permanently use the image edits you should download them.
				   </figcaption>
				}
			    </figure>
			</div>
		    </div>
		    <div class='col-8 offset-1'>
			<form class='col-12' onSubmit={this.handleSubmit}>
			    <div class='form-group col-8'>
				<label>Static Image Absolute URL:</label>
				<input class='form-control' onChange={this.handleChange} type='text'
				       name='src' placeholder='Ex: https://website.web/image.png'
				       required='true' />
				<small class='form-text text-muted'>
				    Images must be less than 30MB and public
				</small>
			    </div>
			    <div class='form-group row'>
				<label>Blur:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='blurX' placeholder='Radius'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='blurY' placeholder='Sigma'/>
				</div>
				<small class='form-text text-muted'>
				    Apply Gaussian blur to image with radius and standard deviation
				</small>
			    </div>
			    <div class='form-group row'>
				<label>Border:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='borderX' placeholder='Border X-Size'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='borderY' placeholder='Border Y-Size'/>
				</div>
				<div class='col-3'>
				    <select class='form-control' onChange={this.handleChange}
					    name='borderColor'>
					<option>White</option>
					<option>Grey</option>
					<option>Black</option>
					<option>Blue</option>
					<option>Green</option>
					<option>Red</option>
					<option>Yellow</option>
					<option>Brown</option>
					<option>Orange</option>
					<option>Purple</option>
				    </select>
				</div>
				<small class='form-text text-muted'>
				    Add a border to the image
				</small>
			    </div>
			    <div class='row'>
				<div class='form-group col-3'>
				    <label>Charcoal:</label>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='charcoalFact' />
				    <small class='form-text text-muted'>
					Apply a charcoal-like filter, intensity factored by input
				    </small>
				</div>
				<div class='col-9'>
				    <div class='form-group row'>
					<label>Colorize:</label>
					<div class='col-2'>
					    <input class='form-control' onChange={this.handleChange} type='number'
						   name='colorizeR' placeholder='R'/>
					</div>
					<div class='col-2'>
					    <input class='form-control' onChange={this.handleChange} type='number'
						   name='colorizeG' placeholder='G'/>
					</div>
					<div class='col-2'>
					    <input class='form-control' onChange={this.handleChange} type='number'
						   name='colorizeB' placeholder='B'/>
					</div>
				    </div>
				</div>
			    </div>
			    <div class='row'>
				<div class='form-group col-3'>
				    <label>Limit Colors:</label>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='colors'/>
				    <small class='form-text muted'>
					Place an upper-bound on the number of colors for the image
				    </small>
				</div>
				<div class='form-group col-3'>
				    <label>Contrast:</label>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='contrast' />
				</div>
				<div class='form-group col-3'>
				    <label>Cycle Colors:</label>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='cycle' />
				    <small class='form-text muted'>
					Cycle the colors by some factor
				    </small>
				</div>
			    </div>
			    <div class='form-group row'>
				<label>Lower:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='lowerX' placeholder='X'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='lowerY' placeholder='Y'/>
				</div>				
				<small class='form-text text-muted'>
				    Create a pseudo-3D effect of a lowered frame.
				</small>
			    </div>
			    <div class='form-group row'>
				<label>Raise:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='raiseX' placeholder='X'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='raiseY' placeholder='Y'/>
				</div>				
				<small class='form-text text-muted'>
				    Create a pseudo-3D effect of a raised frame.
				</small>
			    </div>
			    <div class='form-group row'>
				<label>Motion Blur:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='motionRadius' placeholder='Radius'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='motionSigma' placeholder='Sigma'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='motionAngle' placeholder='Angle'/>
				</div>
			    </div>
			    <div class='form-group row'>
				<label>Roll:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='rollX' placeholder='X'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='rollY' placeholder='Y'/>
				</div>				
			    </div>
			    <div class='form-group row'>
				<label>Rotate:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='rotateA' placeholder='Angle'/>
				</div>
				<div class='col-3'>
				    <select class='form-control' onChange={this.handleChange}
					    name='rotateColor'>
					<option>White</option>
					<option>Grey</option>
					<option>Black</option>
					<option>Blue</option>
					<option>Green</option>
					<option>Red</option>
					<option>Yellow</option>
					<option>Brown</option>
					<option>Orange</option>
					<option>Purple</option>
				    </select>
				</div>
			    </div>
			    <div class='form-group row'>
				<label>Shear:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='shearX' placeholder='X'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='shearY' placeholder='Y'/>
				</div>				
			    </div>
			    <div class='form-group row'>
				<label>Sharpen:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='sharpenR' placeholder='Radius'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='sharpenS' placeholder='Sigma'/>
				</div>				
			    </div>
			    <div class='form-group row'>
				<label>Shade:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='shadeA' placeholder='Azimuth'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='shadeE' placeholder='Elevation'/>
				</div>
				<small class='form-text text-muted'>
				    Shade image with a light source.
				</small>
			    </div>
			    <div class='form-group row'>
				<label>Wave:</label>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='waveAmp' placeholder='Amplitude'/>
				</div>
				<div class='col-3'>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='waveLen' placeholder='Wavelength'/>
				</div>				
			    </div>
			    <div class='row'>
				<div class='form-group col-3'>
				    <label>Emboss:</label>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='emboss' />
				</div>
				<div class='form-group col-3'>
				    <label>Draw Edges:</label>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='edge' />
				</div>
				<div class='form-group col-3'>
				    <label>Implode:</label>
				    <input class='form-control' onChange={this.handleChange}
					   type='number' step='0.01' name='implode' />
				</div>
			    </div>
			    <div class='row'>
				<div class='form-group col-3'>
				    <label>Solarize:</label>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='solarize' />
				</div>
				<div class='form-group col-3'>
				    <label>Paint Effect:</label>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='paint' />
				</div>
				<div class='form-group col-3'>
				    <label>Swirl:</label>
				    <input class='form-control' onChange={this.handleChange} type='number'
					   name='swirl' />
				</div>
			    </div>
			    <div class='form-group'>
				<div class='form-check'>
				    <input class='form-check-input' onChange={this.handleChange}
					   type='checkbox' name='negative' />
				    <label class='form-check-label'>Negative</label>
				</div>
				<div class='form-check'>
				    <input class='form-check-input' onChange={this.handleChange}
					   type='checkbox' name='sepia' />
				    <label class='form-check-label'>Sepia</label>
				</div>
				<div class='form-check'>
				    <input class='form-check-input' onChange={this.handleChange}
					   type='checkbox' name='monochrome' />
				    <label class='form-check-label'>Monochrome</label>
				</div>
			    </div>
			    <br/>
			    <div class='row'>
				<div class='col-1'>
				    <button type='submit' class='btn btn-primary'>Submit</button>
				</div>
				<div class='col-1 offset-1'>
				    <button type='reset' class='btn btn-secondary'
					    onClick={this.resetFilters}>Reset</button>
				</div>
			    </div>
			</form>
		    </div>
		</div>
	    </div>
)
    }
}

ReactDOM.render(
    <App srcURL='http://mhennelly.com/public/img/umbrella.jpg'/>,
    document.getElementById('react-container')
)


