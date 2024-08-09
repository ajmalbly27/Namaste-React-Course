const heading = React.createElement(
  "h1",
  { id: "heading", xyz: "abc" },
  "Hello World from React!"
);

console.log(heading); //print a javascript object

const root = ReactDOM.createRoot(document.getElementById("root"));

//here render method take this heading object, create a html tag and put it inside the dom
root.render(heading);
