

**1. Difference between DOM selectors:**

getElementById gets one element by ID. It's fast and only returns that element or null.

getElementsByClassName gets a live HTML collection of all elements with that class name. The collection updates automatically if we add/remove elements.

querySelector is like CSS selectors - we can use any CSS selector pattern. It only returns the first match.

querySelectorAll also accepts CSS selectors but returns all matching elements in a static list.

**2. Creating and inserting elements:**

We create a new element using document.createElement(), then add content and insert it somewhere:

```javascript
let newDiv = document.createElement('div');
newDiv.textContent = 'Hello world';
document.body.appendChild(newDiv);
```

We can also use insertBefore(), insertAdjacentElement(), or innerHTML to insert elements.

**3. Event Bubbling:

When we click on an element, the event starts from that element and "bubbles up" through its ancestor elements. So if we click on a button inside a div inside the body, the click event is fired on the button first, then the div, then the body. It travels from target to document root.

**4. Event Delegation:**

Instead of attaching event listeners to many child elements, we attach one to their parent. As events bubble, we check what was actually clicked and act accordingly. It's ideal for dynamic content and uses less memory than individual listeners.

**5. preventDefault() vs stopPropagation():**

preventDefault() stops the browser's default action (like following a link or submitting a form) but lets the event keep bubbling.

stopPropagation() will prevent the event from bubbling to parent elements but won't prevent the browser's default behavior. 

We can use both if needed.
