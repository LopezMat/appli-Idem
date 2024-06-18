import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/Home";
import ProjetScreen from "../screens/OnlineScreens/ProjetScreen";
import ProfileScreens from "../screens/OnlineScreens/acount/ProfileScreens";
import EditProfil from "../screens/OnlineScreens/acount/EditProfil";
import EditUser from "../screens/OnlineScreens/acount/EditUser";

const OnlineRouter = createBrowserRouter([
  {
    element: (
      <>
        <App />
      </>
    ),
    errorElement: <ErrorPage />,
    //on déclare les route avec leur vue
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/profil/:id",
        element: <ProfileScreens />
      },
      {
        path: "/profil/edit",
        element: <EditProfil />
      },
      {
        path: "/edit",
        element: <EditUser />
      },
      {
        path: "/projet/:id",
        element: <ProjetScreen />
      },


    ]
  }
])

export default OnlineRouter