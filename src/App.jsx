import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Cart from "./features/cart/Cart";
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder";
import Order, {loader as orderLoader} from "./features/order/Order";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import { action as updateOrderAction } from "./features/order/UpdatePriority";
import AppLayout from "./ui/AppLayout";
import "./index.css";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/menu",
        element: <Menu />,
        errorElement: <Error />,
        loader: menuLoader,
      },
      { path: "/order/new", element: <CreateOrder />, action : createOrderAction },
      { path: "/order/:orderId", loader:orderLoader, action : updateOrderAction, element: <Order /> },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
