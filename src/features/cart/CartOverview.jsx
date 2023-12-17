import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="flex items-center justify-between bg-stone-800 text-stone-200 uppercase px-6 py-4 text-sm md:text-base">
      <p className="space-x-4 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link className="text-stone-300"  to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
