## Namaste React Course by Akshay Saini

# Chapter 02 - Igniting_our_App_Assignment_Answers

## Q: What is `NPM`?

`NPM` is a tool used to manage JavaScript packages and dependencies. It allows developers to easily install, update, and share libraries, making development more efficient. `NPM` includes a vast online repository where developers can find and publish packages, promoting community collaboration. It also features a command-line interface (CLI) for managing projects, including handling dependencies and running scripts. `NPM` is bundled with Node.js, making it a core tool in the JavaScript ecosystem for both front-end and back-end development.

### How to initialize `npm`?

```
npm init
```

`npm init -y` can be used to skip the setup step, `npm` takes care of it and creates the `package.json` json file automatically , but without configurations.

## Q: What is `Parcel/Webpack`? Why do we need it?

A: `Parcel/Webpack` is type of a web application bundler used for development and productions purposes or power our application with different type functionalities and features.
It offers blazing fast performance utilizing multicore processing, and requires zero configuration. Parcel can take any type of file as an entry point, but an HTML or JavaScript file is a good place to start.
Parcel/Webpack are type of bundlers that we use to power our application with different type functionalities and features.

### Parcel Features:

- HMR (Hot Module Replacement) - parcel keeps track of file changes via file watcher algorithm and renders the changes in the files
- File watcher algorithm - made with C++
- Minification
- Cleaning our code
- DEV and production Build
- Super fast building algorithm
- Image optimization
- Caching while development
- Compresses
- Compatible with older version of browser
- HTTPS in dev
- Port Number
- Consistent hashing algorithm
- Zero Configuration
- Automatic code splitting

### installation commands:

- Install:

```
npm install -D parcel
```

`-D` is used for development and as a development dependency.

- Parcel Commands :
  - For development build:
  ```
  npx parcel <entry_point>
  ```
  - For production build :
  ```
  npx parcel build <entry_point>
  ```

## Q: What is `.parcel-cache`?

The `.parcel-cache` directory is a folder created by Parcel when you build or serve your project. This cache directory is used to store intermediate build artifacts, which helps Parcel speed up subsequent builds.

### Key Points About `.parcel-cache`:

1. **Caching for Faster Builds**:

   - Parcel uses the `.parcel-cache` directory to store information about the files it has processed. When you make changes to your project and rebuild, Parcel can skip processing files that haven’t changed, which significantly reduces build times.

2. **Persistent Cache**:

   - The cache is persistent, meaning it remains between builds. If you stop the development server or close your project and come back later, Parcel will still use the cache to speed up the build process.

3. **Safe to Delete**:

   - The `.parcel-cache` folder is safe to delete. If you ever encounter issues or want to free up space, you can delete the `.parcel-cache` directory. Parcel will simply regenerate it the next time you build or serve your project. However, deleting it may lead to longer build times initially since Parcel will need to reprocess everything.

4. **Location**:
   - The `.parcel-cache` folder is typically created at the root of your project directory, alongside other folders like `src`, `dist`, or `node_modules`.

The `.parcel-cache` directory is an important part of how Parcel optimizes the build process. It helps to reduce build times by caching processed files and reusing them in future builds. If you’re looking to troubleshoot build issues or clear space, you can delete this folder without worry, knowing that Parcel will recreate it as needed.

## Q: - What is `npx`?

`npx` is a command-line tool that comes bundled with `npm` starting from version 5.2.0. It stands for **Node Package Execute** and is used to execute packages directly from the npm registry without needing to install them globally on your system.

### Key Features of `npx`:

1. **Run Packages Without Installing**:

   - With `npx`, you can run commands from npm packages without having to install them globally. For example, if you want to use a CLI tool just once or for a specific project, you can use `npx` to execute it without cluttering your global environment with unnecessary packages.
   - Example:
     ```bash
     npx create-react-app my-app
     ```
     This command will execute the `create-react-app` package to create a new React application, even if you haven't installed `create-react-app` globally.

2. **Ensures Latest Version**:
   - When you use `npx` to run a package, it fetches the latest version of that package from the npm registry (unless a specific version is specified). This is useful when you want to make sure you're using the most recent version of a tool.
3. **Execute Local Project Binaries**:

   - `npx` can also run binaries that are installed locally in your project’s `node_modules` directory. This is handy when working with project-specific tools that shouldn't be installed globally.
   - Example:
     ```bash
     npx eslint src/
     ```
     This will run the locally installed `eslint` in your project without requiring a global installation.

4. **Avoids Global Pollution**:
   - By using `npx`, you can avoid the clutter of globally installed packages, which helps keep your environment clean and avoids potential version conflicts.
