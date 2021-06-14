

class App extends React.Component {

    constructor(props) {
	super(props)
	this.state = {srcURL: props.srcURL,
		      filterParams: '&negative'}
	this.handleChange = this.handleChange.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
	this.resetFilters = this.resetFilters.bind(this)
    }
    
    getParams(state) {
	const enabledFilters = ['blur', 'border', 'charcoal', 'colorize', 'colors', 'contrast',
				'cycle', 'edge', 'emboss', 'negative']

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
	    'negative': (state) => {return state.negative ? '&negative=' + state.negative : ''}
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

    handleSubmit(e) {
	e.preventDefault()
	this.setState({
	    srcURL: this.state.src,
	    filterParams: this.getParams(this.state)
	})
    }

    resetFilters() {
	this.setState({
	    filterParams: ''
	})
    }
    
    render() {
	let srcURL = this.state.srcURL
	let filterURL = 'http://localhost:8080/magick?src=' +
			this.state.srcURL + this.state.filterParams
	return (
	    <div class='container'>
		<br/>
		<div class='row'>
		    <h1>Static Magick</h1>
		</div>
		<div class='row'>
		    <div class='col-4'>
			<p>The Original Image</p>
			<figure class='figure'>
			    <img src={srcURL} class='figure-img img-fluid rounded img-thumbnail'
			    alt=':)'/>
			    <figcaption class='figure-caption'><a href={srcURL}>{srcURL}
			    </a></figcaption>
			</figure>
		    </div>
		    <div class='col-4 offset-2'>
			<p>With Filter(s)</p>
			<figure class='figure'>
			    <img src={filterURL}
				 class='figure-img img-fluid rounded img-thumbnail' alt=':)'/>
			    <figcaption class='figure-caption'><a href={filterURL}>{filterURL}
			    </a></figcaption>
			</figure>
		    </div>
		</div>
		<div class='row'>
		    <form class='col-8' onSubmit={this.handleSubmit}>
			<div class='form-group'>
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
				<small>
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
				<small>
				    Cycle the colors by some factor
				</small>
			    </div>
			</div>
			<div class='row'>
			    <div class='form-group col-3'>
				<label>Draw Edges:</label>
				<input class='form-control' onChange={this.handleChange} type='number'
				       name='edge' />
			    </div>
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
			</div>
			<div class='form-check'>
			    <input class='form-check-input' onChange={this.handleChange}
				   type='checkbox' name='negative' />
			    <label class='form-check-label'>Negative</label>
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
)
    }
}

ReactDOM.render(
    <App srcURL='https://c2.staticflickr.com/4/3163/3288022786_bfe343e440_b.jpg'/>,
    document.getElementById('react-container')
)


