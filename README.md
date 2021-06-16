# Static Magick

Static Magick is a Web API for applying Graphics Magick filters
to publicly available static images. The service is available
at ```static.mhennelly.com/magick```.

Also here's a [form-based UI written in React](https://static.mhennelly.com) to
make constructing requests easier.

## Demo

*Source of image: https://unsplash.com/photos/z50C7LRN4_Y*

Original, publicly available static image at [mhennelly.com/public/img/umbrella.jpg](https://mhennelly.com/public/img/umbrella.jpg)

<img src='https://mhennelly.com/public/img/umbrella.jpg' width='300px' alt='Source Image Missing'/>

New negative edit of the image which is also publicly available at
[static.mhennelly.com/magick?src=https://mhennelly.com/public/img/umbrella.jpg&negative](https://static.mhennelly.com/magick?src=https://mhennelly.com/public/img/umbrella.jpg&negative)

<img src='https://static.mhennelly.com/magick?src=https://mhennelly.com/public/img/umbrella.jpg&negative' width='300px' alt='Source Image Missing'/>

## Usage

1. Get the absolute URL of the static image you'd like to edit,
an example would be ```https://mhennelly.com/public/img/umbrella.jpg```
2. Add the URL as the query parameter ```src```, so for the
previous example the request becomes ```static.mhennelly.com/magick?src=https://mhennelly.com/public/img/umbrella.jpg```
3. Add the edits you'd like to make as additional parameters. For example, to add a brown
border around the image we can request 
```static.mhennelly.com/magick?src=https://mhennelly.com/public/img/umbrella.jpg&borderColor=Brown&border=10,10```

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

