

class App extends React.Component {

    constructor(props) {
	super(props)
	this.state = {srcURL: props.srcURL,
		      filterParams: '&negative'}
	this.handleChange = this.handleChange.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    getParams(state) {
	const filters = ['blur']

	const filtMap = {
	    'blur': (state) => {return state.blurX && state.blurY ?
				'&blur=' + state.blurX + ',' + state.blurY : ''}
	}
	let res = ''
	filters.forEach((val, index, array) => {
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
				   name='src' placeholder='Ex: https://website.web/image.png'/>
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
			<button type='submit' class='btn btn-primary'>Submit</button>
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


