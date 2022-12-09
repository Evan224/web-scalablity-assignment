import Cardlist from "./Components/Cardlist.jsx";
import CardDetail from "./Components/CardDetail.jsx";
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
    path: "/detail/:id",
    element: <CardDetail/>,
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
