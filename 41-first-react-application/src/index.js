import { createRoot } from "react-dom/client";
import App from "./App.js";
import Clicker from "./Clicker.js";
import "./style.css";

const root = createRoot(document.querySelector("#root"));

const toto = "there";
root.render(
  <>
    {/* Some comment
    <h1 style={{ color: "coral", backgroundColor: "floralwhite" }}>
      Hello {toto ? "yes" : "no"}
    </h1>   
    <p className="cute-paragraph">lorem impsum...</p> */}
    <App clickersCount={3}>
      <h1>My 10th React App</h1>
      <h2>And a fancy subtitle</h2>
    </App>
  </>
);
