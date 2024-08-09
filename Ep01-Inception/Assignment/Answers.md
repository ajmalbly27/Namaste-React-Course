## Namaste React Course by Akshay Saini

# Chapter 01 - Inception_Assignment_Answers

## Q1: What is `Emmet`?

Emmet is a plugin for text editors that significantly speeds up the process of writing HTML, CSS, and XML code by allowing you to use shorthand syntax to generate large chunks of code quickly. It’s particularly popular among web developers because it enhances productivity and reduces repetitive typing.

Example emmet abbreviations: !, html:5 etc.

- `html:5` gives :

```sh
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

- `!` gives :

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

### Key Features of Emmet

**1. Abbreviation Expansion:** Emmet allows you to type abbreviations that expand into full-fledged HTML, CSS, or XML code snippets. For example, typing `div.container>ul>li*5` and pressing the expansion key (usually Tab or Enter) will generate:

```html
<div class="container">
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```

**2. Nested Elements:** You can create complex nested structures easily. For instance, `nav>ul>li*3>a{Link}` expands to:

```html
<nav>
  <ul>
    <li><a href="">Link</a></li>
    <li><a href="">Link</a></li>
    <li><a href="">Link</a></li>
  </ul>
</nav>
```

**3. Attributes and Classes:** Emmet allows you to add attributes, classes, and IDs directly in the abbreviation. For example, `input[type="text"#username]` expands to:

```html
<input type="text" id="username" />
```

**4. CSS Abbreviations:** It also works with CSS. For example, typing m10 expands to margin: 10px;.

**5. Multiplication:** You can multiply elements. For example, `ul>li.item$*5` expands to:

```html
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
</ul>
```

**6. Content Insertion:** You can insert content directly within elements using curly braces {}. For example, `p{Hello World}` expands to:

```html
<p>Hello World</p>
```

### How to Use Emmet

- **In VS Code:** Emmet is built into Visual Studio Code by default. You can use it out of the box by typing abbreviations and pressing Tab to expand them.

- **In Other Editors:** Emmet is also available as a plugin for many other text editors like Sublime Text, Atom, and WebStorm. Once installed, it works similarly, allowing you to expand abbreviations with a keystroke.

### Benefits of Emmet

- **Speed:** Emmet reduces the time it takes to write repetitive code, allowing you to focus more on logic and design.

- **Efficiency:** By minimizing keystrokes, Emmet helps prevent typing errors and speeds up the coding process.

- **Customization:** You can customize Emmet to suit your workflow, including creating custom snippets and shortcuts.

## Q2: Difference between a Library and Framework?

### Library:

- **Control:** You call the library’s functions when needed, giving you more control over the flow of your application.
- **Scope:** Focused on specific tasks (e.g., DOM manipulation, data formatting).
- **Flexibility:** More flexible; you can integrate it into your code as you see fit.
  Example: jQuery, Lodash.

### Framework:

- **Control:** The framework controls the flow of your application; it calls your code.
- **Scope:** Provides a full structure and set of tools for building an application.
- **Flexibility:** Less flexible; you must follow the framework’s conventions and structure.
  Example: React, Angular.

In summary, a library offers more freedom and is used for specific functionalities, while a framework provides a complete structure and dictates how you build your application.

## Q3: What is CDN? Why do we use it?

A CDN, or Content Delivery Network, is a network of servers distributed across various geographic locations. Its primary purpose is to deliver content to users more quickly and efficiently. Here are some key points about CDNs:

- **Speed and Performance:** CDNs reduce the distance between users and the server hosting the content, leading to faster loading times.
- **Reliability:** By distributing content across multiple servers, CDNs provide redundancy, ensuring that if one server goes down, others can still serve the content.
- **Scalability:** CDNs can handle large amounts of traffic, making them suitable for high-traffic websites and applications.
- **Security:** CDNs can provide additional security measures, such as DDoS protection, by absorbing and dispersing malicious traffic.
- **Content Types:** Commonly distributed content includes images, videos, stylesheets, JavaScript files, and other static assets.

Popular CDN providers include Akamai, Cloudflare, Amazon CloudFront, and Microsoft Azure CDN. By using a CDN, websites can significantly improve their performance, user experience, and reliability.

**Use of CDN's:** CDNs are used to improve the performance, reliability, and security of web applications and websites. Here are the primary reasons for using a CDN:

#### 1. Improved Load Times:

- **Reduced Latency:** CDNs store copies of content on servers distributed around the world, so users can download content from a server that is geographically closer to them, reducing latency.
- **Caching Static Content:** Static assets like images, CSS, and JavaScript files are cached on multiple servers, allowing for faster retrieval.

#### 2. Enhanced Reliability:

- **Load Balancing:** CDNs distribute traffic across multiple servers, reducing the risk of a single server becoming overloaded and ensuring consistent performance even during traffic spikes.
- **Redundancy:** If one server fails, others can take over, ensuring high availability and minimizing downtime.

#### 3. Scalability:

- **Handling Traffic Spikes:** CDNs can handle large amounts of traffic, making them ideal for websites and applications that experience sudden increases in user activity.
- **Offloading Traffic:** By serving content from multiple locations, CDNs offload traffic from the origin server, reducing its load and allowing it to perform better.

#### 4. Security Enhancements:

- **5. DDoS Protection:** CDNs can absorb and mitigate Distributed Denial of Service (DDoS) attacks, protecting the origin server from being overwhelmed.
- **6. SSL/TLS Encryption:** CDNs can provide secure HTTPS connections, encrypting data between users and the CDN servers.

#### 5. Cost Efficiency:

- **7. Reduced Bandwidth Costs:** By offloading traffic to CDN servers, websites can reduce the amount of data that needs to be served from the origin server, potentially lowering bandwidth costs.
- **8. Efficient Resource Utilization:** CDNs optimize content delivery, making efficient use of network resources and reducing overall infrastructure costs.

#### 6. Global Reach:

- **Geographic Coverage:** CDNs have servers located around the world, enabling content delivery to users in various regions with consistent performance.

In summary, using a CDN enhances the overall user experience by providing faster, more reliable, and secure access to web content. It also helps websites handle high traffic volumes efficiently and reduces the load on the origin servers.

## Q4: Why is React known as React?

React is known as "React" because it reflects the core idea behind the library: reactive updates. When React was first developed by Facebook, the goal was to create a user interface library that could efficiently update and render the right components when data changes. This "reactive" nature is central to how React works.

#### Key Reasons Behind the Name:

- **Reactive Rendering:** React efficiently updates and renders only the components that change in response to user actions or data updates. It "reacts" to changes in the underlying data model.
- **Declarative Approach:** In React, you declare what the UI should look like for a given state, and React takes care of updating the UI to match that state. This makes it easier to "react" to data changes without worrying about manually updating the DOM.
- **Interactive UIs:** React enables the creation of interactive UIs, where the user interface "reacts" to user inputs or events in a smooth and efficient manner.
- **Historical Context:** React was initially developed by Jordan Walke at Facebook in 2011 and was later open-sourced in 2013. The name was chosen to emphasize the library's focus on efficient, reactive updates to user interfaces, which was a key innovation at the time.

In summary, React is called "React" because it was designed to efficiently "react" to changes in data and update the user interface accordingly.

## Q5: What is crossorigin in script tag?

The crossorigin attribute in the <script> tag is used to control how requests for the script are handled with respect to cross-origin resource sharing (CORS). This is particularly important when loading scripts from a different origin (domain) than the one your website is served from

#### When to Use crossorigin:

- **Loading Third-Party Scripts:** When loading scripts from third-party CDNs, using the crossorigin attribute ensures that the browser handles cross-origin requests correctly and applies the appropriate CORS policies.
- **Security:** Helps in controlling the security and privacy of the data sent with the requests.
- **Integrity Checks:** When using the integrity attribute for Subresource Integrity (SRI) checks, the crossorigin attribute ensures that the script is fetched in a way that complies with the integrity check.

#### Example with Subresource Integrity (SRI)

```html
<script
  src="https://example.com/script.js"
  crossorigin="anonymous"
  integrity="sha384-..."
></script>
```

In this example, the `crossorigin="anonymous"` attribute ensures that the script is fetched without credentials, and the `integrity` attribute verifies that the fetched script matches the expected hash for security purposes.

## Q6: What is diference between React and ReactDOM?

React and ReactDOM are two distinct libraries in the React ecosystem, each serving a specific purpose in building web applications. Here's a brief overview of the differences between them:

### React

- **Purpose:** React is the core library responsible for building user interfaces by creating and managing components. It provides the tools for defining and organizing the UI, handling state, and implementing the component lifecycle.
- **Scope:** React is platform-agnostic, meaning it can be used to build user interfaces for various platforms, not just the web (e.g., mobile with React Native).

### Key Functions:

- **React.createElement():** Used to create React elements.
- **Component creation:** Allows you to create reusable UI components.
- **State and Props Management:** Helps manage and pass data between components.

### Exapmle:

```javascript
import React from "react";

function MyComponent() {
  return <h1>Hello, World!</h1>;
}
```

### ReactDOM

- **Purpose:** ReactDOM is a library that provides DOM-specific methods that allow React components to interact with the browser’s Document Object Model (DOM). It serves as the glue between React and the web platform.
- **Scope:** ReactDOM is specifically designed for web applications, and it’s used to render React components into the DOM.

### Key Functions:

- **ReactDOM.render():** Renders a React component into the specified DOM node.
- **ReactDOM.createPortal():** Allows you to render children into a different part of the DOM tree.

### Exapmle:

```javascript
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return <h1>Hello, World!</h1>;
}

ReactDOM.render(<App />, document.getElementById("root"));
```

### Summary of Differences:

### React:

- **Library:** Core library for building and defining UI components.
- **Platform:** Platform-agnostic (works with web, mobile, etc.).
- **Functionality:** Focuses on component creation, state management, and UI logic.

### ReactDOM:

- **Library:** Provides methods to manage the DOM and render React components into the web browser.
- **Platform:** Web-specific.
- **Functionality:** Handles rendering of components to the browser's DOM and interactions with the DOM.

In summary, React is the library for building the actual user interface, while ReactDOM is the library that allows React components to be rendered and managed within a web browser's DOM.

## Q7: What is difference between `react.development.js` and `react.production.js` files via CDN ?

When using React via a CDN, you might come across two different versions of the React library: `react.development.js` and `react.production.js`. These files serve different purposes and are intended for different stages of your application development. Here’s how they differ:

### 1. `react.development.js`

- **Purpose:** This version is meant for development.
- **Features:**

  - **Debugging Tools:** Includes detailed error messages, warnings, and other development-friendly features that help you debug issues in your React code.
  - **Verbose:** The file is not minified or optimized, which means it’s larger and contains human-readable code.
  - **Performance:** Because this version has additional checks and debugging tools, it runs slower compared to the production build.

- **Use Case:** You should use this version when you are actively developing your React application. It helps in identifying and fixing bugs more easily.

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
```

### 2. `react.production.js`

- **Purpose:** This version is meant for production.
- **Features:**

  - **Optimized:** The code is minified and optimized for performance. All development-specific warnings and error messages are removed to reduce file size and improve execution speed.
  - **Fast:** Since it lacks development checks and other overhead, this version runs faster and is more suitable for a live, user-facing environment.

- **Use Case:** You should use this version when deploying your React application to production. It ensures the best performance for end users and minimizes the file size.

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
```

### Summary of Differences

- **Size:** `react.production.js` is smaller because it’s minified and stripped of unnecessary development code.
- **Performance:** `react.production.js` is optimized for speed, whereas `react.development.js` includes extra checks and warnings that slow down execution.
- **Debugging:** `react.development.js` is better for debugging because it provides detailed warnings and error messages.

### Practical Example

- **During Development:** Use react.development.js to get meaningful errors and warnings that help you fix issues quickly.
- **For Production:** Switch to react.production.js to ensure your app runs efficiently and loads faster for users.

By using the appropriate version at the correct stage of your project, you can ensure a smooth development experience and an optimized production deployment.

## Q8: What is async and defer ?

`async` and `defer` are two attributes that can be added to <script> tags in HTML to control how and when JavaScript files are loaded and executed. They are used to improve the performance of web pages by optimizing the loading of JavaScript files.

### `async`

- **Purpose:** The `async` attribute tells the browser to download the script file in the background without blocking the rendering of the page. Once the script is downloaded, it is executed immediately.
- **Execution Order:** Scripts with `async` are executed as soon as they are downloaded, which means they might not run in the order they appear in the HTML document.

- **Use Case:** `async` is typically used for scripts that don’t rely on other scripts or the DOM being fully loaded, such as analytics scripts.
- Example:

```html
<script src="script.js" async></script>
```

- **Key Points:**
  - The script is fetched asynchronously and executed as soon as it’s available.
  - Multiple async scripts may execute in any order relative to each other.
  -

### `defer`

- **Purpose:** The `defer` attribute also tells the browser to download the script file in the background, but unlike async, it ensures that the script is executed only after the HTML document has been fully parsed.
- **Execution Order:** Scripts with `defer` are executed in the order they appear in the document, after the HTML is fully parsed.

- **Use Case:** `defer` is useful for scripts that need the entire DOM to be ready before they execute, such as DOM manipulation scripts.
- Example:

```html
<script src="script.js" defer></script>
```

- **Key Points:**
  - The script is fetched asynchronously but executed only after the HTML document has been parsed.
  - Multiple defer scripts are executed in the order they appear in the HTML.

### Summary of Differences

| Attribute | When Script is Downloaded | When Script is Executed      | Execution Order            |
| --------- | ------------------------- | ---------------------------- | -------------------------- |
| `async`   | As soon as possible       | As soon as it's downloaded   | No guaranteed order        |
| `defer`   | As soon as possible       | After the document is parsed | In the order of appearance |

### When to Use Which?

- **Use `async`:** For scripts that can run independently of the rest of the page (e.g., analytics, ads).
- **Use `defer`:** For scripts that depend on the DOM being fully loaded or need to run in a specific order.

These attributes help optimize the loading process, making pages load faster and more efficiently by preventing render-blocking behavior caused by scripts.
