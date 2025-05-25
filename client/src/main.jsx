import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "./components/common/theme-provider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
        <Toaster position="buttom-right" reverseOrder={false} />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
