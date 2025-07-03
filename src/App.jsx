import { createBrowserRouter, RouterProvider } from "react-router";

import { useCtx } from "./context/context";

import StartPage from "./pages/StartPage.jsx";
import QuestionPage from "./pages/QuestionPage.jsx";
import DiplomaPage from "./pages/DiplomaPage.jsx";

//-----------------------------------------------------------
const routs = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/questions",
    element: <QuestionPage />,
  },
  {
    path: "/questions",
    element: <QuestionPage />,
  },
  {
    path: "/diploma",
    element: <DiplomaPage />,
  },
]);

//-----------------------------------------------------------
//-----------------------------------------------------------
const App = () => {
  //from context.jsx
  const { isStart } = useCtx();

  //-----------------------------------------------------------
  return <RouterProvider router={routs} />;
};

export default App;
