# JDom

This class convert a JSON-structured data into DOM.

## Use

```Javascript
// Create the instance:
const myElement = new JDom({your_JSON_object});

// Render in the DOM element with selected class name or id name:
myElement.render(".class-name or #idName");
```

The constructor receives an object in following structure:

```Javascript
{
    type: "p",    // type of the DOM element you want to create
    content: "You can add your content here",   // [optional] string, HTML element, or JDom object are accepted. 
    attr: {      // [optional] the attributs you want to set for the element
        className: "text-big",
        innerHTML: "Another method to add content.",    // [optional] you can create the child nodes by using innerHTML
        style: {    // [optional] add inline styles here
            color: "red",
            fontSize: "1em"
        }
    },
    children: [     // [optional] you can also create the child nodes by adding node objects, this support event lisener for the children.
        {
            type: "h4",
            props: {
                className: "title",
                innerHTML: "Title Text"
            }
        }  
    ],
    events: {    // [optional] This is a list of the events to listen.
        click: e => { console.log("clicked") }    
    }
}
```

## Examples

Create a card and append it to a container.

Your HTML:

```HTML
<div class="container"></div>
```

JavaScript:

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

card.render(".container");
```

Following DOM elements will be created:

```html
    <div class="container">
        <div class="card-body">
            <h4 class="card-title">Title</h4>
            <p class="card-text">some text...</p>
        </div>
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
<div class="text-list">
    <ul>
        <li>first item</li>
        <li>second item</li>
        <li>third item</li>
    </ul>
</div>

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
<div class="text-list">
    <div>
        <p>first item</p>
        <p>second item</p>
        <p>third item</p>
    </div>
</div>
```
