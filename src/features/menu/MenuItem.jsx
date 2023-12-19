import { formatCurrency } from "../../utils/helpers";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { addItem, getCurrentQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantity(id));
  const isInCart = currentQuantity > 0 ?? 0;

  function handleAddItem (e){
    e.preventDefault();
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity : 1,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem));
  }
  return (
    <li className="py-2 flex gap-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="mt-0.5">{name}</p>
        <p className="capitalize italic text-stone-600">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm font-semibold">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-start uppercase text-stone-400">Sold out</p>
          )}
        
          {isInCart && <div className="flex items-center gap-4 sm:gap-8">
            <UpdateItemQuantity pizzaId={id} />
             <DeleteItem pizzaId={id} />
          </div> }
          {!soldOut && !isInCart &&  <Button onClick = {handleAddItem} type='small'>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
