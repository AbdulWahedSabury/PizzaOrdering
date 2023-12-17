import { Link } from "react-router-dom";
import UserName from "../features/user/UserName";
import SearchOrder from "./searchOrder";
export default function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 px-4 py-3 font-semibold text-stone-700 sm:px-6 sm:py-4">
      <Link className="uppercase" to="/">
        Fast pizza react
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}
