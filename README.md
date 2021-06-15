# Static Magick

Static Magick is a Web API for applying Graphics Magick filters
to publicly available static images. The service is available
at ```static.mhennelly.com/magick```. To help with constructing
API requests, please use the interactive UI at ```static.mhennelly.com```.

## Demo

*Source of image: https://unsplash.com/photos/z50C7LRN4_Y*

<div style='display:inline-block;'>
<figure style='float:left;'>
	<img src='https://mhennelly.com/umbrella.jpg' width='100px' alt='Source Image Missing'/>
	<figcaption>mhennelly.com/umbrella.jpg</figcaption>
</figure>

<figure style='float:left;'>
	<img src='https://static.mhennelly.com/magick?src=https://mhennelly.com/umbrella.jpg&negative' width='100px' alt='Source Image Missing'/>
	<figcaption>static.mhennelly.com/magick?src=https://mhennelly.com/umbrella.jpg&negative</figcaption>
</figure>
</div>

## Usage

1. Get the absolute URL of the static image you'd like to edit,
an example would be ```https://mhennelly.com/me.jpg```
2. Add the URL as the query parameter ```src```, so for the
previous example the request becomes ```static.mhennelly.com/magick?src=https://mhennelly.com/me.jpg```
3. Add the edits you'd like to make as additional parameters. For example, to add a brown
border around the image we can request 
```static.mhennelly.com/magick?src=https://mhennelly.com/me.jpg&borderColor=Brown&border=10,10```

## API Documentation

- *src=url* : The absolute URL of the static image
- *blur=radius,sigma* : Take Gaussian blur with radius and std. dev. specified
- *border=x,y* : Add border with dimensions specified
- *borderColor=color* : Specificy border color, be applied before border & be a known color to
GraphicsMagick
- *charcoal=factor* : Apply charcoal filter
- *colorize=r,g,b* : Edit the color channels of the image
- *colors=limit* : Specify an integer upper limit to the number of colors that can be used
- *contrast=factor* : Increase the image contrast
- *cycle=factor* : Cycle the colors
- *edge=factor* : Draw the edges of the image, higher the factor the more edges
- *emboss=factor* : Add an emboss effect
- *negative* : Take the negative of the image

## Acknowledgements

Couldn't have made this API without the fantastic module [gm](https://aheckmann.github.io/gm/).
Great tool, makes interfacing with GraphicsMagick ezpz.

