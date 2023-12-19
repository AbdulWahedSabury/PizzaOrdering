import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { useSelector } from "react-redux";
import {formatCurrency} from '../../utils/helpers'

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);
  if(totalQuantity === 0 ) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 text-stone-200 uppercase px-6 py-4 text-sm md:text-base">
      <p className="space-x-4 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link className="text-stone-300"  to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
