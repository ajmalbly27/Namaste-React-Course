## Namaste React Course by Akshay Saini

# Chapter 11 - Data is the New Oil

## Q1: What is `prop drilling` ?

Prop drilling refers to the process of passing data (or props) from one component to another through multiple layers of components, even if some of those intermediary components don't need the data themselves. In React, this can become an issue when many components are involved, leading to cumbersome and difficult-to-maintain code.

For example, if you have a parent component and a deeply nested child component that needs some data from the parent, you may have to pass that data through several intermediary components that don’t directly use the data themselves. This makes the code harder to manage, as any changes in the structure of the component tree might require changing the props in multiple components.

Here's a simple illustration:

```jsx
function Grandparent() {
  const data = "Important data";
  return <Parent data={data} />;
}

function Parent({ data }) {
  return <Child data={data} />;
}

function Child({ data }) {
  return <GrandChild data={data} />;
}

function GrandChild({ data }) {
  return <div>{data}</div>;
}
```

In the example above, `data` is passed through `Parent`, `Child`, and `GrandChild`, even though only `GrandChild` actually needs the data.

### Solutions to Avoid Prop Drilling:

- **Context API**: React's Context API allows data to be passed directly to the components that need it, bypassing intermediary components.
- **State Management Libraries**: Tools like Redux or Zustand provide a global state management solution, helping avoid prop drilling altogether.

By using these solutions, you can make your code cleaner and easier to maintain!

## Q2: What is lifting the state up ?

**Lifting the state up** is a pattern in React where you move the shared state to the closest common ancestor of the components that need to access or modify that state. This pattern helps to centralize the state, allowing multiple components to share and modify the same data.

### Why Lift State Up?

When two or more sibling components need to share the same state or data, instead of keeping separate states in each component and trying to synchronize them, the state is moved (or "lifted up") to their nearest common parent. This ensures the data is consistent and accessible to all the components that need it.

### How It Works

1. **Identify the common ancestor** of the components that need the shared state.
2. Move the state and its handler functions to the common parent.
3. Pass the state and functions down as props to the child components that need them.

### Example:

Imagine you have two sibling components, `Input` and `Display`, and both need access to the same data. Instead of managing state in both components, you can lift the state to their parent.

```jsx
function Parent() {
  const [text, setText] = useState("");

  return (
    <div>
      <Input text={text} setText={setText} />
      <Display text={text} />
    </div>
  );
}

function Input({ text, setText }) {
  return (
    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
  );
}

function Display({ text }) {
  return <p>{text}</p>;
}
```

In this example:

- The `Parent` component holds the shared state `text` and the function `setText`.
- `Input` and `Display` receive the `text` value as a prop from `Parent`.
- `Input` can modify the state using the `setText` function, while `Display` shows the updated state.

### Benefits:

- **Data consistency**: By having a single source of truth for the state, all components rely on the same data.
- **Simplified synchronization**: There’s no need to manually sync state between sibling components.

### When to Use:

Use lifting state up when:

- Multiple components need access to the same state.
- You want to avoid duplicating state and logic across components.

This pattern is especially useful in forms and UI components that need to reflect shared data across different parts of the UI.

## Q3: What is Context `Provider` and Context `Consumer` ?

In React, the **Context API** provides a way to share data across the component tree without having to pass props manually at every level. Two important parts of this API are the **Context Provider** and **Context Consumer**, which work together to manage and distribute data across your components.

### Context Provider

The **Provider** component is responsible for "providing" the data (or state) to the components that need it. It allows any descendant components to access the data without passing props through every intermediate component in the tree.

### Context Consumer

The **Consumer** component is used to "consume" or access the data provided by the **Provider**. It can be used in any component that needs the data, without relying on props.

### How They Work Together

The **Provider** wraps around a component tree and supplies data to all the child components, while the **Consumer** is used in the components that need access to that data.

### Example:

1. **Create the Context**: Use `React.createContext()` to create a context object.
2. **Provide the Context**: Use the `Provider` to supply data to child components.
3. **Consume the Context**: Use the `Consumer` to access that data wherever it is needed.

#### Code Example:

```jsx
import React, { createContext, useState } from "react";

// 1. Create a Context
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  return (
    // 2. Provide the Context
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}

function ThemeButton() {
  return (
    // 3. Consume the Context using the Consumer
    <ThemeContext.Consumer>
      {(theme) => (
        <button style={{ background: theme === "dark" ? "#333" : "#fff" }}>
          {theme} mode
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default App;
```

### Breakdown:

1. **ThemeContext** is created using `createContext()`. This is where the context object is defined.
2. **ThemeContext.Provider** wraps around the `Toolbar` component in `App`, supplying the `theme` state as its value. All descendant components of the `Provider` can access the value without needing to pass it down via props.
3. **ThemeContext.Consumer** is used in the `ThemeButton` component to access the `theme` value provided by the `Provider`. The function inside the `Consumer` receives the `theme` as an argument and renders the button based on the theme.

### Modern Approach (Using `useContext`):

Using the `Consumer` can sometimes make the code harder to read. With React hooks, we can use the `useContext` hook to consume the context more easily.

```jsx
import React, { useContext } from "react";

function ThemeButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      {theme} mode
    </button>
  );
}
```

In this updated version, we use the `useContext` hook to directly access the `theme` value without needing to use a `Consumer` component, which simplifies the code.

### Summary:

- **Provider**: Supplies the context (data) to all child components.
- **Consumer**: Retrieves the context (data) in components that need it.
- **useContext Hook**: A modern, simpler way to access context directly in functional components.

By using the Context API, you can avoid **prop drilling** and manage state more efficiently in larger component trees.

## Q4: If you don’t pass a value to the provider does it take the default value?

Yes, if you don't pass a value to the **Provider**, the context will take the **default value** defined when you created the context using `createContext()`.

When you create a context in React using `createContext()`, you can provide a default value like this:

```jsx
const MyContext = React.createContext("default value");
```

This default value will be used if the context is consumed in a component but there is no `Provider` wrapping that component or if the `Provider` doesn't explicitly pass a value.

### Example:

```jsx
import React, { createContext } from "react";

// Creating a context with a default value
const MyContext = createContext("default value");

function App() {
  return (
    <div>
      <ComponentWithoutProvider />
      <ComponentWithProvider />
    </div>
  );
}

function ComponentWithoutProvider() {
  return (
    <MyContext.Consumer>
      {(value) => <p>No Provider: {value}</p>}
    </MyContext.Consumer>
  );
}

function ComponentWithProvider() {
  return (
    <MyContext.Provider value="provided value">
      <MyContext.Consumer>
        {(value) => <p>With Provider: {value}</p>}
      </MyContext.Consumer>
    </MyContext.Provider>
  );
}

export default App;
```

### Output:

- `ComponentWithoutProvider` will display: **No Provider: default value** because no `Provider` is wrapping it, so it uses the default value from `createContext()`.
- `ComponentWithProvider` will display: **With Provider: provided value** because it is wrapped in a `Provider` that supplies a value.

### Key Points:

- If a **Provider** is not used, or no value is passed to the **Provider**, the components that consume the context will use the default value specified when the context was created.
- This behavior allows you to handle cases where you may not always want to pass a value explicitly.
