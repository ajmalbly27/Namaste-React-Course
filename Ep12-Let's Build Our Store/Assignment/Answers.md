## Namaste React Course by Akshay Saini

# Chapter 12 - Let's Build Our Store

Also good for reference - https://github.com/tanishraj/learn_react_advanced?tab=readme-ov-file#1-usecontext-vs-redux

## Q1: `useContext` vs `Redux`

Both `useContext` and `Redux` are state management solutions in React, but they serve different purposes and are used in distinct scenarios. Here’s a comparison between the two:

### **1. Purpose and Usage**

- **`useContext`:**
  - Built-in React hook used to pass data down the component tree without manually passing props.
  - Suitable for smaller applications or situations where only a few pieces of state need to be shared across components.
  - **Use case**: Simple global state sharing (e.g., theme, user authentication).
- **Redux:**
  - External library used for state management, especially in larger applications where the state is more complex and needs to be managed in a predictable way.
  - Useful when managing a large, deeply nested state, or when multiple components need to interact with and modify the state.
  - **Use case**: Complex applications requiring central state management with actions, reducers, and a more structured approach.

### **2. Complexity**

- **`useContext`:**

  - Simple to implement and integrate since it's native to React.
  - Does not include side-effect handling or middleware out of the box.
  - May become difficult to manage as the app scales or if the shared state becomes more complex.

- **Redux:**
  - More complex setup, requiring actions, reducers, and a store.
  - Offers middleware (e.g., `redux-thunk`, `redux-saga`) for handling side effects like asynchronous actions.
  - Provides a structured way to manage and scale state in large applications.

### **3. Performance**

- **`useContext`:**
  - When the context value changes, all components consuming the context will re-render. This can lead to performance issues if not managed carefully (e.g., when large state objects are passed through the context).
- **Redux:**
  - Redux allows fine-grained control over when and how components re-render. By using selectors and memoization (`reselect`), you can optimize performance and avoid unnecessary renders.

### **4. State Updates**

- **`useContext`:**

  - State updates are usually handled by passing the setter functions (e.g., `setState`) directly through the context.
  - Lacks centralized control over state updates, making it harder to track changes as the app grows.

- **Redux:**
  - Centralized state and predictable state changes via pure functions (reducers). State updates are done via dispatched actions, which follow a strict flow.
  - Debugging is easier with tools like the **Redux DevTools**.

### **5. Scalability**

- **`useContext`:**
  - Best for small-to-medium sized applications. As complexity increases, managing state across various components becomes cumbersome.
- **Redux:**
  - Designed for larger applications. Its structured approach makes it easier to manage growing state, organize state updates, and scale the app.

### **When to Use Which:**

- **`useContext`**: If you're building a small app or have minimal global state needs (like sharing user information or themes).
- **Redux**: If your app is large, involves complex state logic, or you need advanced features like middleware for async actions.

### Conclusion:

- **useContext** is simple and efficient for sharing state in smaller applications or specific cases.
- **Redux** offers a more structured, scalable approach, especially useful for large applications or where complex state and side-effect management is required.

## Q2: Advantage of using `Redux Toolkit` over `Redux`.

Redux Toolkit (`@reduxjs/toolkit` or RTK) was introduced to simplify and improve the developer experience when using Redux. It provides a more efficient, modern, and less error-prone way of managing Redux state. Here are the **advantages of using Redux Toolkit over traditional Redux**:

### 1. **Simplified Setup**

- **Traditional Redux**: Requires a lot of boilerplate code to set up (e.g., writing action creators, reducers, manually combining reducers, creating the store).
- **Redux Toolkit**: Offers built-in methods like `configureStore`, `createSlice`, and `createAsyncThunk`, which reduce boilerplate and streamline the setup. It automatically combines reducers and includes useful middleware (like `redux-thunk`) by default.

**Example** of store setup using Redux Toolkit:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
```

With **traditional Redux**, you'd need to manually create actions, reducers, and apply middleware, leading to a more verbose setup.

### 2. **Reduced Boilerplate**

- **Traditional Redux**: You have to write separate files for actions, constants, and reducers. This results in a lot of repetitive code, especially when creating action types and action creators.
- **Redux Toolkit**: `createSlice` simplifies action creators and reducers by automatically generating action creators based on the reducer functions you define.

**Example** of `createSlice`:

```javascript
const userSlice = createSlice({
  name: "user",
  initialState: { name: "", email: "" },
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
```

This is more concise compared to traditional Redux, where you'd define action types, action creators, and reducers separately.

### 3. **Immutable Updates and Safety**

- **Traditional Redux**: You are responsible for ensuring immutability in your reducers, often relying on libraries like `immer` or writing spread syntax to handle nested objects or arrays.
- **Redux Toolkit**: Automatically uses `immer` under the hood, allowing you to write “mutative” code in your reducers (e.g., directly modifying state) while ensuring immutability. This reduces errors related to immutability and makes reducer code simpler.

**Example**:

```javascript
// In Redux Toolkit, you can directly modify state.
setUser(state, action) {
  state.name = action.payload.name;
  state.email = action.payload.email;
}
```

This gets transformed into an immutable update behind the scenes.

### 4. **Built-in Middleware and DevTools**

- **Traditional Redux**: You must manually add middleware like `redux-thunk` for async logic and configure the Redux DevTools.
- **Redux Toolkit**: Automatically includes essential middleware like `redux-thunk` and sets up Redux DevTools for you without any additional configuration, improving the development experience out of the box.

### 5. **Simplified Async Logic with `createAsyncThunk`**

- **Traditional Redux**: Handling async logic (e.g., API calls) requires writing action creators, dispatching multiple actions (like `REQUEST`, `SUCCESS`, and `FAILURE`), and often setting up `redux-thunk` or `redux-saga`.
- **Redux Toolkit**: Provides `createAsyncThunk` for handling async logic in a standardized, easy-to-use way. It generates action creators for the pending, fulfilled, and rejected states automatically.

**Example**:

```javascript
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, thunkAPI) => {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
  }
);
```

This simplifies async logic compared to traditional Redux, where you'd manually write the async action creator and handle different states (pending, fulfilled, rejected).

### 6. **Best Practices Built-in**

- **Traditional Redux**: It’s up to the developer to follow best practices (e.g., immutability, organizing code, using middleware), which can lead to inconsistency in large teams or projects.
- **Redux Toolkit**: Enforces and encourages best practices (e.g., immutability via `immer`, structured state slices, and a clear separation of concerns) by default, making the development process more consistent and reducing the risk of errors.

### 7. **Opinionated and Modular**

- **Traditional Redux**: While flexible, it can be overwhelming due to the amount of decision-making required (how to structure actions, reducers, middleware, etc.).
- **Redux Toolkit**: Offers an opinionated set of defaults and modular tools that cover the most common use cases, making it easier to get started and maintain a consistent codebase.

### 8. **Better Integration with TypeScript**

- **Traditional Redux**: Requires more manual type definitions when using TypeScript, which can be tedious.
- **Redux Toolkit**: Provides better TypeScript support with auto-generated types for actions and reducers, making it easier to work with and reducing boilerplate.

### Conclusion

Redux Toolkit is a more modern and efficient way to manage Redux state, especially in medium-to-large applications. It reduces the complexity and boilerplate of traditional Redux, enforces best practices, and improves developer productivity by offering built-in tools like `createSlice` and `createAsyncThunk`. If you're starting a new project or migrating an existing one, Redux Toolkit should be your go-to choice for state management.

## Q3: Explain `Dispatcher`.

In the context of Redux Toolkit, the term "dispatcher" typically refers to the action creator functions generated by the `createSlice` utility. The dispatcher is responsible for creating actions that can be dispatched to the Redux store, initiating state changes. Let's delve into how dispatchers work in Redux Toolkit:

#### **1. Creating Actions with Dispatchers:**

When you use `createSlice` in Redux Toolkit to define a slice of your Redux state, it automatically generates action creators for each reducer function. These generated action creators are known as dispatchers. Dispatchers are functions that, when called, create and dispatch the corresponding action to the Redux store.

**Example:**

Assuming you have a slice for a counter:

```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

Here, increment and decrement are the dispatchers. When you call increment(), it creates an action of type "increment" and dispatches it to the Redux store.

#### **2. Dispatching Actions:**

Once a dispatcher is invoked, it triggers the corresponding reducer logic defined in your slice. This results in a state change, and the updated state is then stored in the Redux store.

**Example:**

```jsx
import { useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

const CounterComponent = () => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <p>Counter: {value}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};
```

In this example, the useDispatch hook is used to get access to the dispatch function, and the increment and decrement dispatchers are called when the corresponding buttons are clicked.

#### **3. Benefit of Dispatchers::**

The use of dispatchers generated by createSlice in Redux Toolkit reduces boilerplate and ensures a consistent and straightforward way to interact with your Redux store. It encapsulates the logic of creating actions and dispatching them, making your code more maintainable and readable.

In summary, dispatchers in Redux Toolkit are the action creator functions automatically generated by createSlice, providing a convenient way to create and dispatch actions to modify the Redux store's state.

## Q4: Explain `Reducer`.

A **reducer** in Redux is a **pure function** that determines how the state of an application changes in response to an **action**. The reducer receives the current state and an action, then returns a new state based on the action type. Reducers play a central role in Redux's state management pattern by being the only way to update the state in a predictable manner.

### 1. **What is a Reducer?**

A reducer is a function that:

- **Takes the current state** and an **action** as its arguments.
- **Returns a new state** based on the type of action.

Reducers are pure functions, meaning:

- They do not mutate the original state.
- They do not perform side effects (such as API calls or modifying external data).
- Given the same input (state and action), they always return the same output (new state).

### 2. **The Anatomy of a Reducer**

A typical reducer looks like this:

```javascript
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
```

### Breakdown:

1. **State**: The first argument in the reducer is the current state. If the reducer doesn’t receive a state (for example, the first time it's called), it uses a default `initialState`.
2. **Action**: The second argument is the **action**, which is a plain object that has at least a `type` property describing what happened (e.g., `{ type: 'INCREMENT' }`). The action can also carry additional data in a `payload` property.

3. **Switch Statement**: Inside the reducer, a `switch` statement (or `if`-`else` block) is often used to determine how the state should change based on the action's `type`. Each case in the switch corresponds to a specific action type.

4. **Return New State**: The reducer returns a new state object. **It never mutates the existing state** directly but instead creates a new version of the state with the necessary updates.

5. **Default Case**: If the action type doesn't match any cases, the reducer returns the current state (unchanged). This ensures that unknown actions don't affect the state.

### 3. **Example of a Reducer in Redux**

Let's take a simple counter application:

```javascript
const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
```

In this `counterReducer`:

- The state contains a single property, `count`.
- When an action of type `'INCREMENT'` is dispatched, the reducer increases the `count` by 1.
- When an action of type `'DECREMENT'` is dispatched, the reducer decreases the `count` by 1.
- If any other action type is dispatched, the state remains unchanged (via the `default` case).

### 4. **Pure Functions and Immutability in Reducers**

Reducers must be **pure functions**, which means they should:

- Not mutate the state or action.
- Not produce side effects (e.g., API calls, logging, or modifying global variables).
- Always return the same output for the same input.

For example, in the counter reducer above, instead of modifying `state.count` directly, the reducer returns a new object that copies the existing state using the spread operator (`...state`) and updates only the `count` property. This ensures that Redux's state is **immutable** and predictable.

### 5. **Combining Reducers**

In a real-world application, the Redux state is often divided into different parts, each managed by its own reducer. To handle this, Redux provides a `combineReducers` function to merge multiple reducers into a single root reducer.

**Example of combining reducers:**

```javascript
import { combineReducers } from "redux";

// Individual reducers
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
};

const userReducer = (state = { name: "", loggedIn: false }, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, name: action.payload, loggedIn: true };
    case "LOGOUT":
      return { ...state, name: "", loggedIn: false };
    default:
      return state;
  }
};

// Combine reducers into one root reducer
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});
```

In this example:

- `counterReducer` handles the state related to the `count`.
- `userReducer` handles user login state.
- `combineReducers` merges these into a single `rootReducer`. This allows the Redux store to maintain a state object with multiple slices, like `{ counter: { count: 0 }, user: { name: '', loggedIn: false } }`.

### 6. **Key Concepts for Reducers**

- **State should never be mutated directly**: Instead of modifying the state object directly, always return a new state object with updated values.
- **Pure functions**: Reducers are predictable because they don’t have side effects. This makes them easier to test.
- **Switch statements**: Reducers usually employ `switch` statements to handle different action types, but other methods (like if-else or even a mapping structure) can be used.
- **Default case**: Always provide a default case in your reducer to return the current state when an unknown action type is received.

### 7. **Why are Reducers Important?**

- **Predictability**: Reducers allow you to manage state in a predictable way. Given the same state and action, a reducer will always produce the same new state.
- **Separation of Concerns**: Each reducer manages a specific part of the state, making the codebase more organized and easier to maintain.
- **Testability**: Because reducers are pure functions, they are easy to unit test. You simply pass in a state and an action, and check that the correct new state is returned.

### Conclusion

A **reducer** in Redux is a pure function that takes the current state and an action, and returns a new state based on the action’s type. It ensures that the state updates are predictable, immutable, and free of side effects. Reducers are the heart of Redux's state management, defining how the application’s state changes in response to dispatched actions.

## Q5: Explain slice.

In **Redux Toolkit (RTK)**, a **slice** is a concept that combines **reducers**, **actions**, and **initial state** in one place, making the Redux workflow much simpler. It is created using the `createSlice` function, which automatically generates action creators and action types based on the reducer functions you provide.

### 1. **What is a Slice in Redux Toolkit?**

A **slice** represents a portion (or "slice") of the Redux state, typically handling a specific piece of state and the logic for modifying that state. Each slice contains:

- **Initial state**: The starting state for that part of the application.
- **Reducers**: Functions that determine how the state changes in response to actions.
- **Actions**: Automatically generated action creators that correspond to each reducer.

The `createSlice` function is used to define a slice. It takes an object with `name`, `initialState`, and `reducers` properties and returns a slice object with the reducer functions and action creators.

### 2. **Structure of a Slice**

Here’s a breakdown of the structure when creating a slice using `createSlice`:

```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter", // Name of the slice
  initialState: { value: 0 }, // Initial state of this slice
  reducers: {
    // Reducer functions that define how state changes
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Export the generated action creators
export const { increment, decrement, reset } = counterSlice.actions;

// Export the reducer function to be included in the Redux store
export default counterSlice.reducer;
```

### 3. **Key Parts of a Slice**

1. **Name**:

   - The `name` property defines the slice's name and is used to prefix action types. For example, the action type for `increment` would be `'counter/increment'` when using the above slice.

2. **Initial State**:

   - The `initialState` defines the default state of the slice. It could be any value (like a number, object, array, etc.) depending on what state you want to manage.

3. **Reducers**:

   - The `reducers` property contains the reducer functions. Each function defines how to update the state when a specific action is dispatched. Unlike traditional Redux, you can **mutate** the state directly in these reducer functions thanks to **Immer**, which is integrated into Redux Toolkit. Immer allows writing "mutative" code (like `state.value += 1`), but under the hood, it ensures the state remains immutable by creating a copy of the state.

4. **Generated Actions**:
   - For each reducer, `createSlice` automatically generates an action creator function. For example, when you define the `increment` reducer, RTK will automatically generate an `increment` action creator that you can use to dispatch actions like `dispatch(increment())`.

### 4. **Using a Slice**

To use a slice in a Redux store, you export the slice’s reducer function and include it when creating the store.

**Example of Using the Slice in a Redux Store:**

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // Import the reducer from the slice

const store = configureStore({
  reducer: {
    counter: counterReducer, // Add the slice's reducer to the store
  },
});

export default store;
```

Here, the `counterSlice.reducer` is added to the Redux store’s reducers. The state is now updated based on the actions dispatched by the slice.

### 5. **Dispatching Actions from a Slice**

You can use the automatically generated action creators in your components to dispatch actions and update the state.

**Example of Dispatching Actions in a React Component:**

```javascript
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "./counterSlice"; // Import actions from the slice

const CounterComponent = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value); // Access the state from the slice

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default CounterComponent;
```

In this example, the `increment`, `decrement`, and `reset` actions are dispatched by interacting with buttons in the UI. The component reads the state value from the Redux store using `useSelector`.

### 6. **Extra Reducers (Handling External Actions)**

In some cases, you may want your slice to handle actions generated outside of the slice, such as actions dispatched from another slice or asynchronous actions created using `createAsyncThunk`.

To handle these external actions, you can use the `extraReducers` field in `createSlice`. It allows the slice to respond to actions that are not explicitly defined in its `reducers` field.

**Example of Using `extraReducers`:**

```javascript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async action to fetch data
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  return response.json();
});

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
```

In this example, the `userSlice` listens to the actions (`pending`, `fulfilled`, and `rejected`) generated by the `fetchUser` async thunk and updates its state accordingly.

### 7. **Benefits of Using `createSlice` in RTK**

- **Less Boilerplate**: `createSlice` reduces the boilerplate code that’s typically associated with defining actions, action types, and reducers manually in traditional Redux.
- **Automatic Action Creation**: Action creators are automatically generated for each reducer you define, which simplifies dispatching actions.
- **Simplified Reducer Logic**: Thanks to Immer, you can write reducers in a mutable style while maintaining immutability under the hood.
- **Built-in Support for ExtraReducers**: Easily handle actions from other slices or async thunks using the `extraReducers` field.
- **Better Organization**: Since each slice contains its initial state, reducers, and actions in one place, the code is easier to manage and understand.

### Conclusion

A **slice** in Redux Toolkit represents a piece of state and the logic to manage it. It combines the initial state, reducers, and actions into a single structure, simplifying the process of managing state in your application. By using `createSlice`, Redux Toolkit helps reduce the boilerplate of traditional Redux, makes the state management process more intuitive, and provides features like automatic action creation and handling async actions with `extraReducers`.

## Q6: Explain selector.

In Redux, a **selector** is a function that retrieves specific pieces of data from the Redux state. **Selectors** are used to extract and compute values from the Redux store, making it easier to manage how state is accessed within your components or logic.

Selectors provide a clean and centralized way to access data from the store and can also perform computations on that data (without changing the state). They play an important role in keeping components decoupled from the actual shape of the Redux state.

### 1. **What is a Selector?**

A **selector** is simply a function that:

- **Takes the Redux state** as an argument.
- **Returns a piece of the state** or a derived value based on the state.

Selectors are typically used with the `useSelector` hook (in React apps using Redux) or within mapStateToProps (in older React-Redux code) to pull data from the store into a component.

### 2. **Basic Example of a Selector**

Let's say you have a Redux state that looks like this:

```javascript
const initialState = {
  user: {
    name: "Raza",
    age: 25,
  },
  posts: [
    { id: 1, title: "Redux Toolkit Basics", content: "..." },
    { id: 2, title: "Learning React", content: "..." },
  ],
};
```

To retrieve the `user` object from this state, you would write a selector like this:

```javascript
const selectUser = (state) => state.user;
```

You can then use this selector in your component with `useSelector`:

```javascript
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector(selectUser); // Use the selector to get the user object from the Redux state

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
    </div>
  );
};
```

### 3. **Benefits of Using Selectors**

- **Centralized Logic**: Selectors help centralize and encapsulate state access logic. Instead of accessing the state directly in multiple places in your app, you define selectors that encapsulate how to retrieve certain parts of the state.
- **Reusability**: Once defined, selectors can be reused across components to consistently pull the same piece of state, reducing code duplication.
- **Decoupling State Shape**: Selectors make it easier to change the structure of your Redux state without needing to update every component that accesses the state. You only need to update the selector logic.
- **Memoization**: When combined with libraries like `reselect`, selectors can also be optimized through **memoization**, ensuring that they only recompute when necessary, improving performance.

### 4. **Advanced Example of a Selector**

Let's say you want to retrieve only the titles of all the posts from the state. You can create a selector for that:

```javascript
const selectPostTitles = (state) => state.posts.map((post) => post.title);
```

Then use this selector in your component:

```javascript
const PostList = () => {
  const postTitles = useSelector(selectPostTitles);

  return (
    <ul>
      {postTitles.map((title, index) => (
        <li key={index}>{title}</li>
      ))}
    </ul>
  );
};
```

In this example:

- The `selectPostTitles` selector extracts the titles from the `posts` array in the state.
- The component uses this selector to get the titles and renders them in a list.

### 5. **Memoized Selectors with Reselect**

If a selector performs an expensive calculation (e.g., filtering, sorting, or computing derived data), you might want to avoid recomputing it unless the state changes. This is where **memoized selectors** come in, which can be created using the `reselect` library.

**Reselect** provides a `createSelector` function that memoizes selectors. It only recomputes the value if the input to the selector has changed, which can help improve performance in large applications.

**Example using `createSelector`:**

```javascript
import { createSelector } from "reselect";

// Basic selector to get the posts from the state
const selectPosts = (state) => state.posts;

// Memoized selector to get the posts with more than 100 likes
const selectPopularPosts = createSelector([selectPosts], (posts) =>
  posts.filter((post) => post.likes > 100)
);
```

In this example:

- `selectPosts` is a basic selector that retrieves the posts.
- `selectPopularPosts` is a memoized selector created using `createSelector`. It filters the posts to only include those with more than 100 likes.
- `selectPopularPosts` will only recompute the filtered posts if the `posts` array changes.

You can then use this memoized selector in your component:

```javascript
const PopularPosts = () => {
  const popularPosts = useSelector(selectPopularPosts);

  return (
    <ul>
      {popularPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
```

### 6. **Composing Selectors**

You can compose selectors by building more complex selectors from simpler ones.

For example, you can have one selector to get the user and another to get a derived piece of information about the user:

```javascript
const selectUser = (state) => state.user;
const selectUserAge = (state) => state.user.age;

const selectIsUserAdult = createSelector([selectUserAge], (age) => age >= 18);
```

In this example:

- `selectUser` and `selectUserAge` are basic selectors to get the user and their age.
- `selectIsUserAdult` is a memoized selector that checks if the user is an adult, reusing the `selectUserAge` selector.

### 7. **When to Use Selectors**

You should use selectors whenever you:

- Need to retrieve a specific part of the state.
- Need to perform a computation or transformation on the state data before using it.
- Want to ensure consistency when accessing the same data from multiple components.
- Need memoization to improve performance for expensive calculations.

### Conclusion

Selectors in Redux allow you to extract and manipulate data from the Redux store in a reusable and centralized way. They help keep your code clean, decoupled from the state structure, and easier to maintain. For more complex use cases, memoization with `reselect` can ensure efficient state access, improving performance by recalculating values only when necessary.

## Q7: Explain `createSlice` and the configuration it takes.

The `createSlice` function is a key feature of **Redux Toolkit (RTK)** that simplifies the process of writing Redux logic. It allows you to define the state, reducers, and action creators for a slice of your Redux state in a single function. With `createSlice`, you can avoid the typical boilerplate in traditional Redux, such as writing action types and action creators manually.

### **What is `createSlice`?**

`createSlice` is a function that:

- Accepts an object with configuration options (like the slice name, initial state, and reducer functions).
- Automatically generates Redux action creators and action types.
- Returns an object containing the generated reducer function and action creators.

### **Basic Example of `createSlice`**

```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter", // Name of the slice
  initialState: { value: 0 }, // Initial state for the slice
  reducers: {
    increment: (state) => {
      state.value += 1; // Redux Toolkit allows "mutative" logic
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions; // Auto-generated action creators
export default counterSlice.reducer; // Auto-generated reducer function
```

### **Key Parts of `createSlice` Configuration**

The object passed into `createSlice` contains several key properties that define how your slice behaves. Let's break these down:

#### 1. **`name` (required)**

- The `name` is a string that identifies the slice.
- The `name` is used to generate action types in the format of `'sliceName/actionType'`.
- Example: For the `increment` action in a `counter` slice, the action type will be `counter/increment`.

```javascript
name: 'counter',
```

#### 2. **`initialState` (required)**

- The `initialState` defines the default state for the slice.
- It can be any value (e.g., a number, string, object, or array), depending on the part of the state the slice manages.
- This state is the starting point when the slice is first added to the store.

```javascript
initialState: { value: 0 },
```

#### 3. **`reducers` (required)**

- `reducers` is an object where the keys are the names of **reducer functions**, and the values are the reducer functions themselves.
- Each reducer function defines how the state should change in response to an action.
- RTK allows you to write "mutative" logic inside reducer functions (e.g., `state.value += 1`), but under the hood, it ensures that the state remains immutable by using **Immer**.

Each function inside `reducers` automatically generates an action creator and an action type based on its key name.

Example:

```javascript
reducers: {
  increment: (state) => {
    state.value += 1; // Directly "mutating" the state is allowed with RTK
  },
  decrement: (state) => {
    state.value -= 1;
  },
  reset: (state) => {
    state.value = 0;
  },
},
```

In this example:

- `increment` modifies the state by increasing `value` by 1.
- `decrement` reduces `value` by 1.
- `reset` sets `value` to 0.

The corresponding action creators (`increment`, `decrement`, and `reset`) are automatically generated, and the action types will be prefixed with the slice name (`counter/increment`, `counter/decrement`, etc.).

#### 4. **`extraReducers` (optional)**

- `extraReducers` is used to handle actions that aren't defined within this slice’s `reducers` field.
- It is most commonly used for responding to **external actions**, such as those created by `createAsyncThunk` or from other slices.
- Unlike the `reducers` field, you don’t directly define action creators here. Instead, you respond to actions from other slices or asynchronous actions.

There are two ways to write `extraReducers`:

- **Using a builder callback** (recommended):

  ```javascript
  extraReducers: (builder) => {
    builder
      .addCase(someAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(someAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(someAction.rejected, (state) => {
        state.status = 'failed';
      });
  },
  ```

- **Using an object notation**:
  ```javascript
  extraReducers: {
    [someAction.pending]: (state) => {
      state.status = 'loading';
    },
    [someAction.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    },
    [someAction.rejected]: (state) => {
      state.status = 'failed';
    },
  },
  ```

#### 5. **`initialState` as a Function (optional)**

- You can define `initialState` as a function to dynamically generate the initial state.
- This is useful when the initial state depends on factors like environment variables or local storage.

```javascript
initialState: () => ({
  value: localStorage.getItem('counter') || 0,
}),
```

### **What Does `createSlice` Return?**

The object returned by `createSlice` contains several properties:

1. **`reducer`**: The reducer function to be passed to `configureStore` when creating the Redux store.
2. **`actions`**: An object containing the auto-generated action creators for each reducer function.
3. **`name`**: The slice name (for internal use).
4. **`caseReducers`**: The original reducers provided to `createSlice`, in case you need to access them directly.

Here’s an example:

```javascript
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

console.log(counterSlice);
// {
//   name: "counter",
//   reducer: function,  // The reducer function
//   actions: { increment: function, decrement: function },  // Auto-generated action creators
//   caseReducers: { increment: function, decrement: function }
// }
```

### **Using `createSlice` in Your App**

To integrate the slice into your Redux store, you do the following:

1. **Create the Store**: Import the reducer from the slice and add it to the store configuration.

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer, // Include the slice's reducer
  },
});

export default store;
```

2. **Dispatch Actions**: Use the generated action creators to dispatch actions from components.

```javascript
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./counterSlice";

const CounterComponent = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};
```

### **Advantages of Using `createSlice`**

1. **Reduced Boilerplate**: Automatically generates action creators and action types, reducing the need to write them manually.
2. **Mutative Reducer Logic**: Thanks to **Immer**, you can write reducers that "mutate" state without actually mutating it, keeping state updates concise and clean.
3. **Simplicity**: All related logic (state, reducers, actions) is centralized in one place, making it easier to manage.
4. **Built-in Support for Async Logic**: Easily handle asynchronous actions or actions from other slices using `extraReducers`.
5. **Improved Code Readability**: Encapsulates each piece of the application’s state and logic in its own slice, which makes the code more modular and easier to reason about.

### **Conclusion**

`createSlice` is a powerful utility in Redux Toolkit that simplifies writing Redux logic by bundling action types, action creators, and reducers in a single location. It reduces boilerplate, allows you to write simpler mutative logic with Immer, and is designed to work seamlessly with the rest of the Redux Toolkit features.
