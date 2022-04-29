# JDom

This function convert a JSON-structured data into DOM.

The function receives an object in following structure:

```Javascript
{
    type: "p",    // type of the DOM element you want to create
    content: "Method to add text.",
    attr: {      // the attributs you want to set for the element
        className: "text-big",
        innerHTML: "Another method to add content.",    // you can create the child nodes by using innerHTML
        style: {    // add inline styles here
            color: "red",
            fontSize: "1em"
        }
    },
    children: [                     // you can also create the child nodes by adding node objects, this support event lisener for the children.
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

Example:

```javascript
const card = newElement({
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

Following HTML document will be created:

```html
    <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">some text...</p>
    </div>
```

Then, the the event listener will be added to `<p class="card-text">some text...</p>` element:

```javascript
node.addeventListener("click", e => { console.log("clicked"); } )
```