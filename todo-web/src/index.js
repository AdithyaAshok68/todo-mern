import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";



import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Layout /> */}
  </React.StrictMode>
);
