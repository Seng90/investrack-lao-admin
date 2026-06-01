import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/settingsStore";

createRoot(document.getElementById("root")!).render(<App />);

