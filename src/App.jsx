import { createBrowserRouter, RouterProvider } from "react-router";

import StartPage from "./pages/StartPage.jsx";
import QuestionPage from "./pages/QuestionPage.jsx";
import { useCtx } from "./context/context";

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
