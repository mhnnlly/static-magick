

class App extends React.Component {

    constructor(props) {
	super(props)
	this.state = {date: new Date(),
		      srcURL: props.srcURL,
		      filterParams: '&negative'}
    }

    componentDidMount() {
	this.timerID = setInterval(
	    () => this.tick(),
	    1000)
    }

    componentWillUnmount() {
	clearInterval(this.timerID)
    }

    tick() {
	this.setState({
	    date: new Date()
	})
    }
    
    render() {
	let srcURL = this.state.srcURL
	let filterURL = 'http://localhost:8080/magick?src=' +
			this.state.srcURL + this.state.filterParams
	return (
	    <div class='container'>
		<div class='row'>
		    <h1>Static Magick</h1>
		</div>
		<div class='row'>
		    <div class='col-sm-4'>
			<p>The Original Static Image</p>
			<figure class='figure'>
			    <img src={srcURL} class='figure-img img-fluid rounded'
			    alt=':)'/>
			    <figcaption class='figure-caption'><a href={filterURL}>{srcURL}
			    </a></figcaption>
			</figure>
		    </div>
		    <div class='col-sm-4'>
			<p>The Filtered Result</p>
			<figure class='figure'>
			    <img src={filterURL}
				 class='figure-img img-fluid rounded' alt=':)'/>
			    <figcaption class='figure-caption'><a href={filterURL}>{filterURL}
			    </a></figcaption>
			</figure>
		    </div>
		</div>
		<div class='row'>
		    <form>
			<label>
			    Static Image Absolute URL:
			    <input type='text' name='src'/>
			</label>
			<input type='submit' value='Submit'/>
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


