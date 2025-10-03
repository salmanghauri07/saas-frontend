// app/providers.jsx
"use client"; // mark this as a Client Component

import { Provider } from "react-redux";
import store from "./store/store";

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
