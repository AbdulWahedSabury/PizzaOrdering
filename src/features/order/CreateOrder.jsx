import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import InputFiled from "../../ui/inputField";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { useState } from "react";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const formError = useActionData();
  const userName = useSelector((store) => store.user.userName);
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

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <label className="sm:basis-40">Address</label>
          <InputFiled
            type="text"
            name="address"
            placeholder="fill Your address"
            required
            className="w-full rounded-full px-3 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400"
          />
        </div>
        <div></div>

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
