## Namaste React Course by Akshay Saini

# Chapter 08 - Let's Get Classy

## Q1: How do you create `Nested Routes` `react-router-dom` cofiguration ?

In React Router version 6.4 and above, nested routes are set up by nesting `<Route>` elements inside other routes. This version of React Router uses a file-based routing system, making it easier to define routes using `createBrowserRouter` or `createRoutesFromElements`.

Here’s a step-by-step guide on how to create nested routes in React Router 6.4+:

### Step 1: Install `react-router-dom`

First, make sure to install `react-router-dom` in your project.

```bash
npm install react-router-dom
```

### Step 2: Create Components for Routes

Create the components for each route.

For example:

- `App.js` (Root component)
- `Home.js`
- `Dashboard.js`
- `Settings.js`

### Step 3: Define Routes Using `createBrowserRouter`

In version 6.4+, `createBrowserRouter` is often used with `RouterProvider` for declarative routing.

```jsx
// App.js
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Settings from "./Settings";

function RootLayout() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <Outlet /> {/* This is where the child routes will be rendered */}
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

### Step 4: Create Route Components

Here’s a simple setup for `Home.js`, `Dashboard.js`, and `Settings.js`.

```jsx
// Home.js
import React from "react";

function Home() {
  return <h2>Home Page</h2>;
}

export default Home;
```

```jsx
// Dashboard.js
import React from "react";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Outlet /> {/* This allows nested routes like settings to be rendered */}
    </div>
  );
}

export default Dashboard;
```

```jsx
// Settings.js
import React from "react";

function Settings() {
  return <h2>Settings Page</h2>;
}

export default Settings;
```

### Step 5: Run the App

When you navigate to `/dashboard/settings`, the `Dashboard` component will be rendered, along with its nested `Settings` component.

### Explanation

- **`<Outlet />`**: It acts as a placeholder for child routes to be rendered inside a parent route. This is where the nested components will be displayed.
- **Nested Route Structure**: The nested route is defined by placing the child routes inside the `children` array of the parent route in the router configuration.

This setup makes it easy to manage nested routes, keeping your component tree organized and allowing deeper nesting when necessary.

## Q2: Read about `createHashRouter`, `createMemoryRouter` from React Router docs.

In React Router 6.4+, apart from `createBrowserRouter`, you can use `createHashRouter` and `createMemoryRouter` depending on your use case.

### 1. **`createHashRouter`**

The `createHashRouter` function is used when you want to handle routing using the URL hash (i.e., `#`). This is especially useful for applications that are deployed to environments where the server cannot handle regular URL paths (like GitHub Pages).[Read more](https://reactrouter.com/en/main/routers/create-hash-router)

#### How it works:

- It uses the hash portion of the URL (e.g., `example.com/#/dashboard`) to keep track of navigation.
- The browser doesn’t send the hash part of the URL to the server, making it useful in static hosting environments.

#### Example

```jsx
// App.js
import React from "react";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Settings from "./Settings";

function RootLayout() {
  return (
    <div>
      <h1>HashRouter App</h1>
      <Outlet />
    </div>
  );
}

const hashRouter = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={hashRouter} />;
}

export default App;
```

With `createHashRouter`, when you navigate to `/dashboard/settings`, the URL will look like this: `example.com/#/dashboard/settings`.

### 2. **`createMemoryRouter`**

The `createMemoryRouter` is used for non-browser environments, such as testing or React Native apps, or when you don't need a real URL to manage the navigation history (i.e., the navigation is stored in memory).[Read more](https://reactrouter.com/en/main/routers/create-memory-router)

- It doesn’t manipulate the browser’s URL, making it perfect for server-side rendering (SSR) and testing environments.
- You can define an initial route to simulate a browser-like experience without an actual URL change.

#### Example

```jsx
// App.js
import React from "react";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Settings from "./Settings";

function RootLayout() {
  return (
    <div>
      <h1>Memory Router App</h1>
      <Outlet />
    </div>
  );
}

const memoryRouter = createMemoryRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "settings",
              element: <Settings />,
            },
          ],
        },
      ],
    },
  ],
  {
    initialEntries: ["/home"], // Sets initial route to /home
    initialIndex: 0,
  }
);

function App() {
  return <RouterProvider router={memoryRouter} />;
}

export default App;
```

Here, `createMemoryRouter` doesn’t modify the URL, and you can specify an initial route (`initialEntries`) and index to simulate the starting point in the routing history.

### Key Differences

| **Router Type**      | **Use Case**                                  | **URL Changes**       | **Example Use Cases**                        |
| -------------------- | --------------------------------------------- | --------------------- | -------------------------------------------- |
| `createHashRouter`   | When server cannot handle full URLs           | Uses hash (`#/route`) | Static sites (e.g., GitHub Pages)            |
| `createMemoryRouter` | For non-browser environments, testing, or SSR | Does not change URL   | Testing, server-side rendering, React Native |

Each of these routers fits specific scenarios, so choose based on the needs of your app.

## Q3: What is the order of life cycle method calls in Class Based Components ?

`Answer-1:` Following is the order of lifecycle methods calls in `Class Based Components`:

### Full Lifecycle Method Flow

1. **Mounting:**

   - `constructor()`
   - `render()`
   - `componentDidMount()`

2. **Updating (due to props or state changes):**

   - `render()`
   - `componentDidUpdate()`

3. **Unmounting:**
   - `componentWillUnmount()`s

`Answer-2:` In React, **Class-Based Components** have a defined set of lifecycle methods that are invoked at different stages of a component's life. These methods can be categorized into three phases: **Mounting**, **Updating**, and **Unmounting**.

Here’s the order of the lifecycle method calls:

### 1. **Mounting Phase**

When an instance of a component is being created and inserted into the DOM, the following methods are called in order:

1. **`constructor(props)`**

   - This is the first method called when a component is initialized.
   - It’s used to set the initial state and bind event handlers, if needed.

   ```js
   constructor(props) {
     super(props);
     this.state = {
       // initialize state
     };
   }
   ```

2. **`static getDerivedStateFromProps(props, state)`**

   - This is called **before rendering**.
   - It allows the component to update its state based on changes in props.

   ```js
   static getDerivedStateFromProps(nextProps, prevState) {
     // return updated state based on props, or null to update nothing
   }
   ```

3. **`render()`**

   - The `render` method is required and returns the JSX that will be rendered to the DOM.

   ```js
   render() {
     return (
       <div>
         {/* JSX content */}
       </div>
     );
   }
   ```

4. **`componentDidMount()`**

   - This is called **after** the component has been mounted (inserted into the DOM).
   - It is typically used for side-effects like data fetching, DOM manipulation, etc.

   ```js
   componentDidMount() {
     // perfect for API calls or initializing external libraries
   }
   ```

### 2. **Updating Phase**

When a component’s props or state changes, it re-renders. During this process, the following lifecycle methods are called:

1. **`static getDerivedStateFromProps(props, state)`**

   - This is called during the updating phase as well, right before rendering when the props or state changes.
   - Like in the mounting phase, it can update the state based on the incoming props.

2. **`shouldComponentUpdate(nextProps, nextState)`**

   - This method determines whether the component should re-render or not.
   - By default, it returns `true`, meaning the component re-renders, but you can override it for optimization.

   ```js
   shouldComponentUpdate(nextProps, nextState) {
     // return true if re-render is necessary, false to skip
     return true;
   }
   ```

3. **`render()`**

   - Called again to re-render the component.

4. **`getSnapshotBeforeUpdate(prevProps, prevState)`**

   - This is called right **before** the changes are reflected in the DOM.
   - It can be used to capture information (e.g., scroll position) before the update.
   - The value returned by this method will be passed to `componentDidUpdate()`.

   ```js
   getSnapshotBeforeUpdate(prevProps, prevState) {
     // capture scroll position, return a value to pass to componentDidUpdate
     return null;
   }
   ```

5. **`componentDidUpdate(prevProps, prevState, snapshot)`**

   - This is called right after the DOM has been updated.
   - It’s a good place for updating anything that depends on the DOM after render, such as making network requests or adjusting UI elements based on new data.

   ```js
   componentDidUpdate(prevProps, prevState, snapshot) {
     // side effects after the update
   }
   ```

### 3. **Unmounting Phase**

When a component is being removed from the DOM, the following method is called:

1. **`componentWillUnmount()`**

   - This is called just before the component is destroyed and unmounted from the DOM.
   - Use this method to clean up subscriptions, timers, or any other resources to prevent memory leaks.

   ```js
   componentWillUnmount() {
     // clean up listeners, intervals, or anything related to the component
   }
   ```

### 4. **Error Handling (Optional)**

If there are errors during rendering, lifecycle methods, or in constructors of child components, the following method is called:

1. **`componentDidCatch(error, info)`**

   - This is called when a child component throws an error.
   - You can log the error, display a fallback UI, or handle it gracefully in this method.

   ```js
   componentDidCatch(error, info) {
     // handle errors
   }
   ```

### Full Lifecycle Method Flow (Summary)

1. **Mounting:**

   - `constructor()`
   - `static getDerivedStateFromProps()`
   - `render()`
   - `componentDidMount()`

2. **Updating (due to props or state changes):**

   - `static getDerivedStateFromProps()`
   - `shouldComponentUpdate()`
   - `render()`
   - `getSnapshotBeforeUpdate()`
   - `componentDidUpdate()`

3. **Unmounting:**

   - `componentWillUnmount()`

4. **Error Handling:**
   - `componentDidCatch()`

These lifecycle methods help manage the component's behavior during its existence, allowing you to control its rendering, updates, and eventual removal.

## Q4: Why do we use componentDidMount ?

We use the `componentDidMount()` method in React class components to execute code after the component has been rendered and added to the DOM. It's a lifecycle method that is called **once**, right after the component is mounted (inserted into the DOM tree).

Here are the key reasons why `componentDidMount()` is useful:

### 1. **Fetching Data (API Calls)**

It is the perfect place to make **API calls** or fetch data from external sources. Since the component is already rendered, you can fetch data and update the component's state, which will then trigger a re-render to display the fetched data.

```js
componentDidMount() {
  fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => {
      this.setState({ data });
    });
}
```

### 2. **Setting Up Subscriptions**

You can set up **event listeners**, **subscriptions**, or start **timers** in this method. These are often dependent on the component being fully rendered and ready.

For example, if you want to listen to window resize events:

```js
componentDidMount() {
  window.addEventListener('resize', this.handleResize);
}
```

### 3. **DOM Manipulation**

Since the DOM is now accessible, you can perform **direct DOM manipulation** (though this is generally not encouraged in React because React manages the DOM). However, for certain cases like integrating with third-party libraries (e.g., jQuery, D3), `componentDidMount()` is where you would initialize these libraries.

```js
componentDidMount() {
  const el = document.getElementById('some-element');
  // Perform some DOM manipulation or third-party library interaction here
}
```

### 4. **Starting Animations**

You can initiate **CSS animations** or transitions when the component is fully mounted and visible on the page.

```js
componentDidMount() {
  setTimeout(() => {
    this.setState({ isVisible: true });
  }, 500);
}
```

### 5. **Interacting with Child Components**

You can also **access refs** to child components or DOM elements in `componentDidMount()` because it is only after this point that the component is fully rendered.

```js
componentDidMount() {
  this.inputRef.current.focus();
}
```

### 6. **Performance Optimization (Deferred Initialization)**

Sometimes, you may need to delay **heavy operations** (like data fetching or expensive calculations) to improve the performance of the initial render. `componentDidMount()` allows you to perform such operations after the component is visible.

---

### Why Not Before Mounting?

Using `componentDidMount()` ensures that any operations that depend on the DOM being ready are done **after** the component is mounted. Methods like `constructor()` or `render()` happen before the component is actually placed in the DOM, so they cannot reliably handle DOM-dependent tasks (e.g., measuring the component's size, manipulating it, or fetching data).

In summary, `componentDidMount()` is crucial for running side effects that rely on the component being fully rendered and mounted in the DOM.

## Q5: Why do we use componentWillUnmount? Show with example ?

`componentWillUnmount()` is a lifecycle method in React class components that is called **right before** the component is removed from the DOM. It's primarily used for **cleanup operations** when a component is being unmounted to avoid memory leaks and other issues.

### Why We Use `componentWillUnmount()`

The primary reasons for using `componentWillUnmount()` include:

1. **Cleanup of Event Listeners**

   - If your component has set up event listeners (e.g., listening to window resize or scroll events), you should remove those listeners when the component is unmounted to prevent them from continuing to listen when the component no longer exists.

2. **Clear Intervals or Timers**

   - If your component uses `setInterval` or `setTimeout`, you should clear these when the component is unmounted to avoid unnecessary memory usage and potential errors.

3. **Cancel API Calls or Subscriptions**

   - If your component is subscribed to external data streams, such as WebSockets, or if it’s making API calls, you should unsubscribe or cancel those subscriptions to avoid trying to update the state of an unmounted component.

4. **Cleanup of Side Effects**
   - If your component interacts with external libraries or DOM elements, you should clean up any effects to prevent memory leaks or inconsistent behavior.

### Example of `componentWillUnmount()`

Here’s an example of a component that sets up a window resize event listener and an interval timer when it mounts, and then cleans them up when it unmounts.

```jsx
import React, { Component } from "react";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      counter: 0,
    };
  }

  // Setting up event listeners and intervals in componentDidMount
  componentDidMount() {
    // Listen for window resize
    window.addEventListener("resize", this.handleResize);

    // Start an interval that updates the counter every second
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ counter: prevState.counter + 1 }));
    }, 1000);
  }

  // Cleanup in componentWillUnmount
  componentWillUnmount() {
    // Remove the event listener to avoid memory leaks
    window.removeEventListener("resize", this.handleResize);

    // Clear the interval to stop it from running
    clearInterval(this.intervalId);
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  render() {
    return (
      <div>
        <h1>Window Width: {this.state.windowWidth}px</h1>
        <h2>Counter: {this.state.counter}</h2>
      </div>
    );
  }
}

export default MyComponent;
```

### Breakdown of the Example:

1. **`componentDidMount()`**:

   - We add a window resize event listener using `window.addEventListener()`.
   - We also start an interval that increments the `counter` state every second using `setInterval()`.

2. **`componentWillUnmount()`**:
   - We clean up by removing the resize event listener using `window.removeEventListener()`.
   - We stop the interval timer by calling `clearInterval()` with the ID of the timer (`this.intervalId`).

Without this cleanup, the component could cause memory leaks and performance issues:

- The window event listener would keep running even after the component is gone.
- The `setInterval` would continue running in the background, potentially updating the state of a component that no longer exists.

### Key Takeaways:

- **Memory Leaks**: If you don't remove event listeners, clear intervals, or unsubscribe from external sources in `componentWillUnmount()`, they can continue running in memory, causing performance problems.
- **Good Practice**: Always clean up resources that were set up during the lifecycle of a component (in `componentDidMount()` or any other method that creates side effects).

## Q6: (Research) Why do we use super(props) in constructor ?

In React class components, when you define a constructor, you typically use `super(props)` as the first line of the constructor. This is essential for several reasons, particularly in JavaScript's class-based inheritance model.

### Why We Use `super(props)` in the Constructor

1. **Inheriting from the Parent Class (`React.Component`)**

   - When a class extends another class (in this case, `React.Component`), you need to call the parent class's constructor using `super()`.
   - This is because a child class needs to pass control back to the parent class to ensure it initializes properly.
   - In React, the parent class (`React.Component`) handles important initialization logic related to the component, such as setting up the component’s `this` context.

2. **Passing `props` to the Parent Class**
   - When using `super(props)`, you are passing the component’s `props` to the parent class's constructor (`React.Component`).
   - This is necessary because `React.Component` uses `props` internally, and without passing `props` to `super()`, `this.props` would be undefined in your component.

### Example:

```jsx
import React, { Component } from "react";

class MyComponent extends Component {
  constructor(props) {
    super(props); // Passes props to the React.Component constructor
    this.state = {
      message: "Hello, world!",
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <p>{this.props.greeting}</p> {/* Accessing props */}
      </div>
    );
  }
}

export default MyComponent;
```

### What Happens Without `super(props)`?

- If you don’t call `super(props)` inside the constructor, `this.props` will be **undefined** inside the constructor and methods of your component. You’ll lose access to the `props` passed from the parent component.

For example, omitting `super(props)` would result in the following error:

```plaintext
Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

### Key Points to Remember:

1. **`super()`**:
   - If you don’t pass `props` to `super()`, the `this.props` will be undefined in your component.
2. **JavaScript Class Inheritance**:

   - When a class extends another class, calling `super()` is required to execute the parent class's constructor and ensure the subclass is properly initialized.

3. **Accessing `this`**:
   - Before calling `super()`, you cannot reference `this` in the constructor. Calling `super(props)` allows you to reference `this` and initialize `state` or access `props`.

---

### Conclusion:

In React class components, `super(props)` is essential to properly initialize the component and to ensure that `props` are passed to the parent `React.Component` class. It allows you to access `this.props` inside the constructor and throughout your component, ensuring that the React component behaves correctly.

## Q7: (Research) Why can't we have the callback function of useEffect async ?

You cannot make the callback function of `useEffect` directly `async` because `useEffect` is designed to either return `undefined` or a **cleanup function**, not a Promise. Making the `useEffect` callback `async` would cause it to return a Promise, which React doesn’t expect and cannot handle as a cleanup function.

### Explanation:

When you define an `async` function, it implicitly returns a Promise. However, the return value of the `useEffect` callback is reserved for cleanup purposes. React expects either:

- **Nothing (`undefined`)**: This is the default case when there's no cleanup needed.
- **A cleanup function**: If your effect creates side effects that need to be cleaned up (e.g., event listeners, subscriptions, or timers), you return a cleanup function to remove those effects when the component unmounts or when the dependencies change.

If you make the `useEffect` callback `async`, it will return a Promise instead of a cleanup function, which would cause unexpected behavior.

### Why Can’t the `useEffect` Callback Be Async?

- **`async` functions return Promises**: In JavaScript, an `async` function automatically wraps its return value in a Promise. React expects a synchronous cleanup function from `useEffect`, not a Promise.

- **Effect Cleanup**: React uses the return value of the `useEffect` callback for cleanup. If the function is `async`, it returns a Promise, which React doesn’t know how to handle for cleanup purposes.

### Example of Why Async Doesn't Work Directly:

```jsx
// This will cause an error or warning
useEffect(async () => {
  const data = await fetchData();
  setData(data); // Setting state after async operation
}, []);
```

React will throw a warning or error because the `async` function returns a Promise, which is not what React expects for effect cleanup.

### The Correct Way to Handle Asynchronous Operations in `useEffect`:

Instead of making the `useEffect` callback `async`, you can handle asynchronous operations **inside** the effect callback by defining an `async` function within it and then calling it. This keeps the `useEffect` callback itself synchronous, which React can handle correctly.

#### Correct Example:

```jsx
useEffect(() => {
  // Define an async function inside useEffect
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      setData(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call the async function
  fetchData();
}, []);
```

Here, the `fetchData` function is asynchronous, but the `useEffect` callback itself is synchronous and returns `undefined`, which is what React expects.

### Handling Cleanup in Asynchronous Effects

If your effect involves asynchronous operations that need cleanup, you can still return a cleanup function from `useEffect`. For example, if you're subscribing to a WebSocket or using a `setTimeout` or `setInterval`, you can clean them up in the cleanup function.

Example with asynchronous cleanup:

```jsx
useEffect(() => {
  let isSubscribed = true;

  const fetchData = async () => {
    const result = await fetch("https://api.example.com/data");
    if (isSubscribed) {
      setData(result);
    }
  };

  fetchData();

  // Cleanup function
  return () => {
    isSubscribed = false; // Prevent state update after component unmounts
  };
}, []);
```

### Key Points to Remember:

- **`useEffect` expects a synchronous cleanup function**, not a Promise. Making the callback `async` will cause it to return a Promise, which React can't handle.
- You can perform async operations inside `useEffect` by defining an `async` function and calling it inside the effect.
- Always ensure that the `useEffect` callback remains synchronous, and if you need to handle cleanup, return a synchronous cleanup function.

By following this pattern, you can handle async operations in `useEffect` without breaking React's lifecycle behavior.
