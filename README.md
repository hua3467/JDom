# JDom

This class convert a JSON-structured data into DOM.

## Use
```Javascript
// Create the instance:
const myElement = new JDom({your JSON object});

// Render in the DOM:
myElement.render("class-name or idName");
```

The constructor receives an object in following structure:

```Javascript
{
    type: "p",    // type of the DOM element you want to create
    content: "You can add your content here",   // string, HTML element, or JDom object are accepted. 
    attr: {      // the attributs you want to set for the element
        className: "text-big",
        innerHTML: "Another method to add content.",    // you can create the child nodes by using innerHTML
        style: {    // add inline styles here
            color: "red",
            fontSize: "1em"
        }
    },
    children: [     // you can also create the child nodes by adding node objects, this support event lisener for the children.
        {
            type: "h4",
            props: {
                className: "title",
                innerHTML: "Title Text"
            }
        }  
    ],
    events: {    // This is a list of the events to listen.
        click: e => { console.log("clicked") }    
    }
}
```

## Examples

```javascript
const card = new JDom({
        type: "div",
        attr: {
            className: "card-body"
        },
        children: [
            {
                type: "h4",
                attr: {
                    className: "card-title",
                    innerHTML: "Title"
                }
            },{
                type: "p",
                content: "some text...",
                attr: {
                    className: "card-text",
                },
                events: {
                    click: e => { console.log("clicked"); }
                }
            }
        ]
    });
```

To insert the element into your HTML document, use `render()` function:

```javascript
card.render(".container");
```

Following DOM elements will be created:

```html
    <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">some text...</p>
    </div>
```

and the the event listener will be added to `<p class="card-text">some text...</p>` element:

```javascript
card.addeventListener("click", e => { console.log("clicked"); } )
```

## Update @0.2

You can create a list by adding an array of string to children:

```JavaScript
new JDom({
            type: 'ul',
            children: ["first item", "second item", "third item"]
        }).render(".text-list");
```

Result:

```html
<ul>
    <li>first item</li>
    <li>second item</li>
    <li>third item</li>
</ul>
```

If the container element is not ```ul``` or ```ol```, a list of ```p``` tag will be created:

```JavaScript
new JDom({
            type: 'div',
            children: ["first item", "second item", "third item"]
        }).render(".text-list");
```

Result:

```html
<div>
    <p>first item</p>
    <p>second item</p>
    <p>third item</p>
</div>
```
