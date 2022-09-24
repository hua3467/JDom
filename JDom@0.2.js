/**
 * Version 0.1
 * Author: Aaron Yang
 * Date updated: 12/15/2021
 * JDom is a helper class that creates Dom elements from JSON-structured data.
 * This class creates, updates, and removes HTML nodes by directly manipulating DOM elements. 
 * A performance-optimization algorithm, like diffing algorithm in React, might be added in the future version.    
 */
class JDom {
    /**
     * 
     * @param {Object} node An object that represent the structure of the DOM.
     * @param {String} node.type The tag name of the top-level node.
     * @param {Object} [node.attr]
     * @param {string|HTMLElement|JDom} [node.content] 
     * @param {Object} [node.events] A key-value paired list of events to be listened by eventlistener. For example, { click: e => { console.log("clicked!") } }
     * @param {[Object|string|JDom]} [node.chilren]
     * 
     */
    constructor(node) {
        this.node = node;
        this.elements = this.#makeElement(this.node);
        this.isJDOM = true;
        this.containerSelector = null;
        
    }

    /**
     * 
     * @param {Object} node An object that represent the structure of the DOM.
     * @param {String} node.type The tag name of the top-level node.
     * @param {Object} [node.attr]
     * @param {string|HTMLElement|JDom} [node.content] 
     * @param {Object} [node.events] A key-value paired list of events to be listened by eventlistener. For example, { click: e => { console.log("clicked!") } }
     * @param {[Object|string|JDom]} [node.chilren]
     * @returns HTMLElementelement
     */
    #makeElement(node) {
        
            let ele;
        
            if (node.type) {
                ele = document.createElement(node.type);
            } else {
                throw "A node must contain the type property.";
            }
     


        if (node.attr) {
            for (let key in node.attr) {
                if (key.substring(0, 5) === "data_") {
                    ele.dataset[key.substring(5)] = node.attr[key]
                } else if (key === "style" && typeof (node.attr[key]) !== "string") {
                    for (let styleName in node.attr[key]) {
                        ele[key][styleName] = node.attr[key][styleName]
                    }
                } else {
                    ele[key] = node.attr[key];
                }
            }
        }

        if (node.content) {
            if (node.content.isJDOM) {
                ele.append(node.content.elements);
            } else {
                ele.append(node.content);
            }
            
        }


        if (node.events) {
            for (let key in node.events) {
                ele.addEventListener(key, node.events[key]);
            }
        }


        if (node.children) {
            node.children.forEach(child => {
                if (child) {
                    if(child.isJDOM) {
                        ele.append(child.elements);
                    } else if (typeof(child) === "string") {
                        // ele.append(this.#getDomFromString(child))
                        ele.append(this.#getDomFromString(`<li>${child}</li>`))
                    } else if (child instanceof Element) {
                        ele.append(child);
                    } else {
                        const childEle = this.#makeElement(child);
                        ele.append(childEle)
                    }
                }
                
            });
        }

        return ele;

    }

    /**
     * 
     * @param {string} selector id or class name of the container in DOM
     */
    render(selector) {
        this.containerSelector = selector;
        const container = document.querySelector(this.containerSelector);
        container.append(this.elements);
        return this;
    }

    /**
     * 
     * @param {String} newContent.type The tag name of the top-level node.
     * @param {Object} [newContent.attr]
     * @param {string|HTMLElement|JDom} [newContent.content] 
     * @param {Object} [newContent.events] A key-value paired list of events to be listened by eventlistener. For example, { click: e => { console.log("clicked!") } }
     * @param {[Object|string|JDom]} [newContent.chilren]
     * @param {string} [selector] (Optional) append the new
     */
    update(newContent, selector) {
        try {
            const prevSibling = this.#findCurrentElement().previousSibling;
            this.remove();
            if (typeof(selector) === "undefined") {
                this.elements = this.#makeElement(newContent);
                prevSibling.parentNode.insertBefore(this.elements, prevSibling.nextSibling);
            } else {
                const ele = document.querySelector(selector);
                console.log(this.node)
                ele.replaceWith(this.#makeElement(newContent));
            }
        } catch (err) {
            console.error(error);
        }
        
    }

    /**
     * Remove the current element. To use this function, an id must be assigned to this when creating. 
     */
    remove(){
        this.#findCurrentElement().remove();
        
    }

    #findCurrentElement(){
        if (this.node.attr && typeof(this.node.attr.id) !== "undefined") {
            return document.getElementById(this.node.attr.id);
        } else {
            throw "to use remove() function, an id must be assgiend to this element."
        }
    }

    /**
     * This function adds an event listener to current or the selected element.
     * @param {string} type the event name, e.g., "click"
     * @param {callback} callback the callback function attached to the event
     * @param {string} [selector]   (optional)the CSS selector of the element to add the event if not current element.  
     */
    addEvent(type, callback, selector) {
        if(typeof(selector) === "undefined") {
            this.elements.addEventListener(type, (e) => {callback(e)});
        } else {
            const ele = document.querySelector(selector);
            ele.addEventListener(type, (e) => {callback(e)})
        }
    }

    #getDomFromString(str) {
        const tmpDiv = document.createElement("div");
        tmpDiv.innerHTML = str;
        return tmpDiv.firstElementChild || null;
    }

}