# Static Magick

Static Magick is a Web API for applying Graphics Magick filters
to publicly available static images. The service is available
at ```static.mhennelly.com/magick```.

Also here's a [form-based UI written in React](https://static.mhennelly.com) to
make constructing requests easier.

## Demo

Original image at [old.mhennelly.com/public/img/umbrella.jpg](https://old.mhennelly.com/public/img/umbrella.jpg)
(Source: Unsplash)

Swirl/paint edit of the image:
[https://static.mhennelly.com/magick?src=http://old.mhennelly.com/public/img/umbrella.jpg&contrast=4&implode=1.2&paint=9&swirl=-240](https://static.mhennelly.com/magick?src=http://old.mhennelly.com/public/img/umbrella.jpg&contrast=4&implode=1.2&paint=9&swirl=-240)

The web API was designed with HTTP/GET & query-params instead of HTTP/POST because HTTP/GET makes the edited images easy to embed.
An example of how the embedded edits can be used is available at [mhennelly.com](https://www.mhennelly.com).

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

