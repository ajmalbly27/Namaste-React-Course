## URLSearchParams:

`URLSearchParams` is a built-in JavaScript interface that makes it easy to work with query parameters in a URL. It provides methods to create, read, update, and delete query parameters in a structured way, which is especially useful when working with URLs that contain multiple query parameters for things like searches, filters, or pagination.

### Basic Example of `URLSearchParams`

Suppose you have a URL like this:

```
https://example.com/search?query=apple&sort=asc&page=2
```

The part after the `?` is the query string: `query=apple&sort=asc&page=2`.

Using `URLSearchParams`, you can access each parameter individually, add new ones, or modify existing ones.

### Creating and Using `URLSearchParams`

#### 1. **Reading Query Parameters**

You can read specific query parameters using `.get()`:

```javascript
const url = "https://example.com/search?query=apple&sort=asc&page=2";
const params = new URLSearchParams(url.split("?")[1]);

console.log(params.get("query")); // Output: "apple"
console.log(params.get("sort")); // Output: "asc"
console.log(params.get("page")); // Output: "2"
```

#### 2. **Adding and Modifying Parameters**

You can add a new parameter or update an existing one with `.set()`:

```javascript
params.set("page", "3"); // Updates the page parameter to 3
params.set("category", "fruits"); // Adds a new parameter category=fruits
console.log(params.toString()); // Output: "query=apple&sort=asc&page=3&category=fruits"
```

#### 3. **Deleting Parameters**

You can delete a parameter using `.delete()`:

```javascript
params.delete("sort");
console.log(params.toString()); // Output: "query=apple&page=3&category=fruits"
```

#### 4. **Looping Through Parameters**

You can use `.forEach()` to loop through all parameters:

```javascript
params.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```

#### 5. **Creating a New URL with Updated Query Parameters**

If you want to create a new URL with updated query parameters, you can use `URL` in combination with `URLSearchParams`:

```javascript
const baseURL = "https://example.com/search";
const newUrl = new URL(baseURL);
newUrl.search = params.toString(); // Attach modified query params

console.log(newUrl.toString()); // Output: "https://example.com/search?query=apple&page=3&category=fruits"
```

### Why Use `URLSearchParams`?

- **Easier Parsing**: It’s more structured and readable than manually parsing query strings.
- **Auto-Encoding**: Automatically encodes parameters, preventing issues with special characters.
- **Flexibility**: Great for building and manipulating URLs dynamically, especially for search functionality in web applications.

`URLSearchParams` is a convenient tool to handle URL query parameters efficiently and safely.

## Difference between `useParams` and `useSearchParams`:

In React Router, `useParams` and `useSearchParams` are hooks that help retrieve information from the URL. They’re useful when you want to work with route parameters or query strings.

---

### 1. `useParams`

The `useParams` hook is used to access the **dynamic parameters** of a route. It returns an object with key-value pairs representing each parameter in the route.

For example, in a route definition like `/users/:userId`, `userId` is a dynamic segment that can be accessed with `useParams`.

**Example:**

```javascript
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams(); // Extracts userId from the URL

  return <h1>User ID: {userId}</h1>;
}

// If the URL is /users/123, it will display "User ID: 123"
```

### 2. `useSearchParams`

The `useSearchParams` hook is used to access **query parameters** in the URL (the `?key=value` part). It returns a `URLSearchParams` object, which has methods to get, set, or delete query parameters.

**Example:**

```javascript
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query"); // Extracts 'query' parameter from the URL

  return <h1>Search Query: {query}</h1>;
}

// If the URL is /search?query=React, it will display "Search Query: React"
```

You can also update the search parameters by calling `setSearchParams` with a new object or URLSearchParams instance.

---

In summary:

- **`useParams`** is for accessing dynamic route parameters (e.g., `/users/:userId`).
- **`useSearchParams`** is for working with URL query parameters (e.g., `/search?query=React`).

Both make it easier to handle route and query data directly in functional components.

## Debouncing:

Debouncing is a technique used to control the rate at which a function is executed, often applied in scenarios where an event (like typing in a search box) is triggered frequently and could cause multiple, potentially unnecessary, API calls. When applied to a search API, debouncing delays the execution of the API call until a specified amount of time has passed since the user stopped typing. This way, the function only executes once after the user pauses, reducing the number of API requests and improving efficiency.

Here’s how debouncing in a search API works:

1. **User Types**: The user begins typing in the search input.
2. **Delay Timer Starts**: For every keystroke, the debounce function starts a timer.
3. **Reset on Keystroke**: If the user continues typing before the timer finishes, the previous timer is cleared, and a new one starts.
4. **API Call on Pause**: If the user stops typing for the specified duration, the timer completes, triggering a single API call with the current search query.

For example, in a React app, if you’re using a debounce function with a 300ms delay, the API call will only happen if the user hasn’t typed for 300ms. This prevents excessive calls and improves performance.

Here's a sample implementation in JavaScript:

```javascript
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// Usage in search API function
const handleSearch = debounce((query) => {
  fetch(`https://api.example.com/search?q=${query}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}, 300);
```

In this example, `handleSearch` will only call the API if 300ms has passed since the last keystroke, helping to prevent an overload of requests.

## Caching(Caching Search):

Caching in terms of search is a technique used to store the results of previous search queries so they can be quickly retrieved if the same or similar query is made again, without needing to call the API or database repeatedly. This improves performance and reduces the load on servers, as it minimizes the number of actual API calls.

### How Caching Works in Search:

1. **User Searches**: A user enters a search query, like "apple."
2. **Cache Check**: The system first checks if the query "apple" has already been searched and if the results are stored in the cache.
3. **Cached Result**:
   - If "apple" exists in the cache, the stored results are immediately returned, skipping the API call.
4. **No Cache Found**:
   - If there’s no cache entry for "apple," an API call is made to fetch the results from the server.
   - The new search results are stored in the cache with the query "apple" as the key, so next time this query won’t need an API call.

### Example:

Suppose you’re using an e-commerce app to search for products:

- First, you search for “laptop.” Since it’s the first search, it triggers an API call, retrieves the results, and stores them in the cache.
- Later, if you search “laptop” again, the app will fetch the results from the cache instantly rather than making another API call, making it faster and reducing server load.

### Simple Code Example:

Here’s a basic example of how you might cache search results in JavaScript:

```javascript
// Cache object to store previous search results
const searchCache = {};

// Function to perform search with caching
function search(query) {
  if (searchCache[query]) {
    console.log("Cache hit:", searchCache[query]); // Get from cache if available
    return searchCache[query];
  } else {
    // Simulate API call
    const apiResult = `Results for ${query}`; // Imagine this came from an API
    searchCache[query] = apiResult; // Store in cache
    console.log("API call made:", apiResult);
    return apiResult;
  }
}

// Usage
search("laptop"); // API call made
search("laptop"); // Cache hit, no API call
```

In this example, the first search for "laptop" stores the result in the cache. The second time "laptop" is searched, it retrieves the result from the cache directly, improving efficiency.

## `useMemo`

The `useMemo` hook in React is used to memoize the result of a computation and prevent it from being re-calculated on every render. It can improve performance in components by caching expensive calculations that are only re-evaluated when their dependencies change.

### Syntax

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### Parameters

- **Callback Function**: The first parameter is a function that performs the expensive computation.
- **Dependency Array**: The second parameter is an array of dependencies. The memoized value will only be recalculated if any dependency changes.

### Example Use Case

```javascript
import React, { useState, useMemo } from "react";

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // Expensive calculation that depends on 'count'
  const expensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    return count * 2;
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double Count: {expensiveCalculation}</h2>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
}
```

### How `useMemo` Works Here

- When the `count` changes, the expensive calculation is recalculated.
- When the `input` changes, the component re-renders, but `useMemo` prevents recalculating the expensive operation because `count` has not changed.

### When to Use `useMemo`

Use `useMemo` when:

- You have an expensive computation in your component.
- The value calculated doesn’t need to change on every render but only when specific dependencies change.

It's best to use `useMemo` selectively since overusing it can lead to code complexity without much benefit.

## `useCallback`

`useCallback` is particularly helpful for optimizing performance in React applications. It helps prevent unnecessary re-creations of functions, which can lead to inefficient renders, especially in components where functions are frequently passed down as props or used in dependencies of other hooks like `useEffect`.

### Key Reasons to Use `useCallback`

1. **Prevent Re-Rendering of Child Components**:
   When functions are passed as props to child components, React re-creates these functions on every render by default. If a child component depends on that function as a prop, it may re-render every time the parent renders, even if the function’s logic hasn’t changed. `useCallback` ensures that the function reference remains the same, preventing unnecessary child re-renders.

2. **Stabilize Dependencies for Other Hooks**:
   When functions are used as dependencies in hooks like `useEffect` or `useMemo`, they need a stable reference to avoid unintended side effects. Without `useCallback`, each render would recreate a new function reference, causing the hook to run every time, even if the dependencies haven't changed in value.

3. **Optimize Performance in Large or Complex Applications**:
   In larger applications, repeated re-creation of functions can lead to a measurable performance cost. While small applications may not see a significant difference, in complex apps with numerous components, memoizing callbacks can contribute to smoother performance by reducing unnecessary re-renders and operations.

### Example Without `useCallback`

Imagine a parent component passing a callback function to a child component without using `useCallback`. Here’s how it could lead to unwanted re-renders:

```javascript
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // Creating a new function on every render
  const handleClick = () => console.log("Clicked!");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input onChange={(e) => setInput(e.target.value)} />
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  console.log("ChildComponent rendered");
  return <button onClick={onClick}>Child Button</button>;
}
```

In this example:

- Each time the `ParentComponent` re-renders (such as when `count` or `input` changes), `handleClick` is redefined.
- `ChildComponent` receives a new function reference for `onClick` each time, causing it to re-render unnecessarily.

### Example With `useCallback`

With `useCallback`, we can ensure `handleClick` is only redefined when necessary:

### Solution with `React.memo`

To prevent unnecessary re-renders in `ChildComponent`, we can wrap it in `React.memo`, which memoizes the component itself. `React.memo` will only re-render the child if its props have changed.

Here’s how it works:

```javascript
import React, { useState, useCallback } from "react";

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // Memoize the handleClick function to avoid re-creating it on every render
  const handleClick = useCallback(() => {
    console.log("Clicked with count:", count);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <input
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
      />
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

// Wrap ChildComponent with React.memo to avoid unnecessary re-renders
const ChildComponent = React.memo(({ onClick }) => {
  console.log("ChildComponent rendered");
  return <button onClick={onClick}>Click Me</button>;
});
```

### Explanation of What’s Happening

- **`React.memo`**: Wrapping `ChildComponent` with `React.memo` means it will only re-render if its props change. Since `handleClick` is memoized with `useCallback` and doesn’t change unless `count` changes, `ChildComponent` will not re-render when only `input` changes.
- **onChange of `input`**: When `input` changes, `ParentComponent` re-renders, but `ChildComponent` won’t re-render due to `React.memo`.

By combining `useCallback` with `React.memo`, you can optimize rendering behavior effectively, ensuring that child components only re-render when needed based on prop changes.

### Summary

- `useCallback` helps prevent re-creating functions on every render.
- `React.memo` prevents re-rendering of child components when their props haven’t changed.

Together, they can significantly reduce unnecessary renders in your React components, enhancing performance.

## `useRef`

The `useRef` hook in React creates a mutable reference object that persists across re-renders. It’s mainly used to access and modify DOM elements directly or to store a value that doesn’t need to trigger a re-render when it changes.

### Syntax

```javascript
const refContainer = useRef(initialValue);
```

### Key Characteristics of `useRef`

- **Returns a Mutable Object**: The object returned has a `.current` property that can hold any value.
- **Does Not Cause Re-renders**: Updating a value in `useRef` does not trigger a component re-render.
- **Persists Across Renders**: The value stored in `.current` persists across re-renders, making it useful for storing values that need to survive multiple renders.

### Common Use Cases for `useRef`

1. **Accessing DOM Elements Directly**:
   You can use `useRef` to directly interact with a DOM element without triggering re-renders. This is often useful for focusing input fields, scrolling, or interacting with HTML elements.

   ```javascript
   import React, { useRef } from "react";

   function FocusInput() {
     const inputRef = useRef(null);

     const handleClick = () => {
       // Access the input DOM element and set focus
       inputRef.current.focus();
     };

     return (
       <div>
         <input
           ref={inputRef}
           type="text"
           placeholder="Click the button to focus"
         />
         <button onClick={handleClick}>Focus Input</button>
       </div>
     );
   }
   ```

   - Here, `inputRef.current.focus()` accesses and focuses the input element directly.

2. **Storing Previous Values Across Renders**:
   `useRef` can hold the previous value of a prop or state variable across renders without re-rendering the component.

   ```javascript
   import React, { useState, useEffect, useRef } from "react";

   function Counter() {
     const [count, setCount] = useState(0);
     const prevCountRef = useRef();

     useEffect(() => {
       prevCountRef.current = count; // Update previous count after each render
     });

     return (
       <div>
         <h1>Current Count: {count}</h1>
         <h2>Previous Count: {prevCountRef.current}</h2>
         <button onClick={() => setCount(count + 1)}>Increment</button>
       </div>
     );
   }
   ```

   - `prevCountRef.current` holds the value of `count` from the previous render, allowing you to compare it with the current `count`.

3. **Avoiding Re-Initialization of Values**:
   Sometimes, you need a value to persist across renders without re-initializing it each time (like a timer ID or interval). `useRef` is perfect for storing such values.

   ```javascript
   import React, { useState, useRef } from "react";

   function Timer() {
     const [seconds, setSeconds] = useState(0);
     const intervalRef = useRef();

     const startTimer = () => {
       intervalRef.current = setInterval(() => {
         setSeconds((prev) => prev + 1);
       }, 1000);
     };

     const stopTimer = () => {
       clearInterval(intervalRef.current);
     };

     return (
       <div>
         <h1>Timer: {seconds} seconds</h1>
         <button onClick={startTimer}>Start</button>
         <button onClick={stopTimer}>Stop</button>
       </div>
     );
   }
   ```

   - `intervalRef` stores the interval ID so you can clear it later with `stopTimer` without causing unnecessary re-renders.

### Summary

- `useRef` allows you to reference DOM elements directly.
- It can store values that persist across renders without causing re-renders.
- It’s helpful for managing previous values, storing values that don’t need to trigger re-renders, and handling side effects like intervals and timers.

In general, `useRef` is useful when you need to manage a mutable value that doesn’t affect the render output.
