import Cardlist from "./Components/Cardlist.jsx";
import Card from "./Components/Card";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cardlist />,
  },{
    path: "/:id",
    element: <Card />,
  }
]);

const App = () => {
  return (
    <RouterProvider
    router={router}
  />
  );
};


export default App;
