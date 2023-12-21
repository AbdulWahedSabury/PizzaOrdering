import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import InputFiled from "../../ui/inputField";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { useState } from "react";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const formError = useActionData();
  const {
    userName,
    position,
    address: positionAddress,
    error: addressError,
    status: addressStatus,
  } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === "loading";
  const totalCartPrice = useSelector(getTotalPrice);
  const totalPriorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalPriorityPrice + totalCartPrice;
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="p-8">
      <h2 className="mb-6 text-xl font-bold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <label className="sm:basis-40">First Name</label>
          <InputFiled
            defaultValue={userName}
            className="w-full"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <label className="sm:basis-40">Phone number</label>
          <InputFiled className="w-full" type="tel" name="phone" required />
          {formError?.phone && <p>{formError.phone}</p>}
          <div></div>
        </div>

        <div className="relative mb-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <label className="sm:basis-40">Address</label>
          <InputFiled
            type="text"
            name="address"
            placeholder="fill Your address"
            defaultValue={positionAddress}
            required
            disabled={isLoadingAddress}
            className="w-full rounded-full px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400"
          />
             
          {!position && (
            <span className="absolute right-[3px] top-[3px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
           
            </span>
          )}
         
        </div>
        {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
        <div className="mb-6 flex items-center gap-4 text-sm font-semibold">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={`${
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }`}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <Button disabled={isSubmitting} type="primary">{`${
            isSubmitting ? "Loading..." : `Order now from ${totalPrice}`
          }`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(data.phone))
    errors.phone = "Please give us your correct phone number.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
