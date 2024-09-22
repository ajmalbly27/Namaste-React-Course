# To fetch data from an API in your `React` app using `Redux Toolkit`, you can follow these steps:

### 1. **Set Up Redux Slice with Async Thunk**

Redux Toolkit provides `createAsyncThunk` to handle asynchronous logic like API calls. Here's how you can use it.

#### Install Redux Toolkit

If you haven't already, install Redux Toolkit and react-redux:

```bash
npm install @reduxjs/toolkit react-redux
```

#### Define the Slice and Async Thunk

Create a new slice that contains the API call logic.

```javascript
// features/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch data from API
export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (apiUrl, thunkAPI) => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data; // This will be available as action.payload
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add regular reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
```

### 2. **Configure Store**

Add the reducer to your Redux store.

```javascript
// store.js
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/dataSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
```

### 3. **Use Thunk in Your Component**

Now, you can dispatch the `fetchData` thunk from any React component.

```javascript
// App.js or any component
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./features/dataSlice";

const App = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    // Dispatch the thunk with the API URL
    dispatch(fetchData("https://api.example.com/data"));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

### 4. **Handling API Errors**

In this example, the API call will throw an error if the response is not okay, and that error will be caught in the `rejected` case of the thunk.

## Example: **Let's Take Example of pokemon api used in Redux Toolkit**

The **Redux Toolkit Pokémon API example** demonstrates how to fetch and manage asynchronous data using Redux Toolkit. In this case, it fetches Pokémon data from an API and updates the Redux state accordingly.

I'll break down the steps in this example to help you understand how it works.

### Key Concepts in the Example:

1. **API Call**: Fetches data asynchronously from the Pokémon API.
2. **Redux Toolkit**: Uses `createSlice` and `createAsyncThunk` for state management and side effects (like API calls).
3. **Asynchronous Logic**: `createAsyncThunk` is used to handle the async API call and integrate it with the Redux store.

### Example Breakdown:

#### 1. **Set Up Redux Store**

The store is created using Redux Toolkit’s `configureStore`, where slices of the state are combined.

```javascript
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./features/pokemonSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});
```

In this case, we are using one reducer `pokemonReducer` from the Pokémon slice.

#### 2. **Pokemon Slice with `createAsyncThunk`**

This slice manages the state for Pokémon data. It defines an async action to fetch data from the Pokémon API.

```javascript
// features/pokemonSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. Define the async thunk to fetch data from the Pokémon API
export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon", // The name of the action
  async (pokemonName, thunkAPI) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const data = await response.json();
    return data; // Returns the Pokémon data
  }
);

// 2. Create the slice with initial state, reducers, and extra reducers for async action
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state while the API call is in progress
    builder.addCase(fetchPokemon.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Handle fulfilled state when the API call returns successfully
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; // Set the Pokémon data to the state
    });
    // Handle rejected state when the API call fails
    builder.addCase(fetchPokemon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Set the error message to the state
    });
  },
});

export default pokemonSlice.reducer;
```

#### Key Points:

- `createAsyncThunk` manages the asynchronous API call and handles the action lifecycle (pending, fulfilled, rejected).
- `extraReducers` allows you to respond to lifecycle actions generated by the thunk, like setting `loading`, `data`, or `error`.

#### 3. **Using Thunk in a Component**

Once you have the slice and the thunk ready, you can dispatch the `fetchPokemon` action from a React component to fetch data based on a Pokémon name.

```javascript
// App.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "./features/pokemonSlice";

const App = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.pokemon);

  const [pokemonName, setPokemonName] = useState("");

  const handleFetchPokemon = () => {
    dispatch(fetchPokemon(pokemonName));
  };

  return (
    <div>
      <h1>Fetch Pokémon</h1>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      <button onClick={handleFetchPokemon}>Fetch</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <img src={data.sprites.front_default} alt={data.name} />
        </div>
      )}
    </div>
  );
};

export default App;
```

#### Key Points:

- The component uses `useDispatch` to dispatch the `fetchPokemon` action and `useSelector` to get data from the store.
- `fetchPokemon` is dispatched with the `pokemonName` parameter, which fetches data from the API and updates the state.
- The component then renders the Pokémon's data, displays a loading state while fetching, and handles errors gracefully.

### Summary:

- **Redux Toolkit's `createAsyncThunk`** is used to manage asynchronous API requests.
- **`createSlice`** handles the state and updates it based on the thunk's lifecycle (pending, fulfilled, rejected).
- The example effectively separates API logic, state management, and UI, keeping your code organized and scalable.

# Explain `RTK Query Quick Start`

**RTK Query** is a powerful data-fetching and caching tool built into Redux Toolkit, designed to simplify data fetching and state management in your app. It helps reduce boilerplate and provides features like caching, automatic re-fetching, and more, without needing to write extra code for managing the request lifecycle (loading, success, error states).

Here’s an explanation of the **RTK Query Quick Start** to help you get going.

### 1. **Setup**

First, you need to install the necessary packages:

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. **Create an API Slice**

The `createApi` method is the core of RTK Query. It allows you to define endpoints, the base URL, and how to fetch data from the server.

```javascript
// services/pokemonApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create an API slice using createApi
export const pokemonApi = createApi({
  reducerPath: "pokemonApi", // Unique key for this API slice in the store
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }), // Base URL for API requests
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`, // Fetch data for a specific Pokémon by name
    }),
  }),
});

// Export the auto-generated hook for the `getPokemonByName` endpoint
export const { useGetPokemonByNameQuery } = pokemonApi;
```

### Breakdown:

- `createApi`: This is the core function of RTK Query where we define the API configuration (base URL, endpoints, etc.).
- `fetchBaseQuery`: A small wrapper around the native `fetch` function to make simple `GET` requests.
- `endpoints`: Defines various endpoints (like `getPokemonByName`) for fetching data. Each endpoint can either be a **query** (for data fetching) or a **mutation** (for data-altering requests like POST, PUT, DELETE).

### 3. **Add the API Slice to the Redux Store**

To make the API slice available throughout your app, integrate it into your Redux store.

```javascript
// store.js
import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./services/pokemonApi";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer, // Add the pokemonApi reducer to the store
  },
  // Adding the api middleware enables caching, invalidation, and other features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
```

### Breakdown:

- **reducer**: The reducer for the API slice is included in the store, allowing it to manage API-related state.
- **middleware**: The RTK Query middleware handles caching, re-fetching, and more. Adding it ensures that RTK Query features work as expected.

### 4. **Fetching Data in a Component**

Now, you can use the auto-generated hooks to fetch data in your components.

```javascript
// App.js
import React, { useState } from "react";
import { useGetPokemonByNameQuery } from "./services/pokemonApi";

function App() {
  const [pokemonName, setPokemonName] = useState("pikachu");

  // Hook to fetch Pokémon data, automatically refetches when pokemonName changes
  const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);

  return (
    <div>
      <h1>Pokémon Lookup</h1>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <img src={data.sprites.front_default} alt={data.name} />
        </div>
      )}
    </div>
  );
}

export default App;
```

### Breakdown:

- **useGetPokemonByNameQuery**: This is the auto-generated hook for the `getPokemonByName` query. It automatically handles fetching, caching, and updating the data based on the Pokémon name.
- **data, error, isLoading**: These values are returned by the hook and represent the current state of the request:
  - `data`: The response data (Pokémon details).
  - `error`: Any error encountered during the request.
  - `isLoading`: Whether the request is in progress.

### 5. **Features of RTK Query**

- **Automatic caching and re-fetching**: If you request the same data again, RTK Query will use the cached data rather than fetching it again unless invalidated.
- **Simplified API calls**: You don’t need to manually dispatch actions to handle loading, success, or error states; RTK Query does that for you.
- **Optimistic updates**: When using mutations (e.g., POST, PUT, DELETE requests), you can configure optimistic updates, so the UI updates instantly before the server responds.

### Summary of Quick Start:

1. Install the necessary packages.
2. Define an API slice using `createApi`.
3. Add the API slice to the Redux store.
4. Use auto-generated hooks in your components to fetch data.

RTK Query simplifies data fetching and state management, letting you focus more on your app logic and less on boilerplate code.
