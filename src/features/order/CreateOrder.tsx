import { useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Form,
  ActionFunctionArgs,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { clearCart, getCart, getTotaleCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { fetchAddress, getUserAddress } from "../user/userSlice";
import { AppDispatch } from "../../store";
import { Coords } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const formErrors = useActionData() as ErrorForm;
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state: RootState) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const acctuposition = position as Coords;

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totaleCartPrice = useSelector(getTotaleCartPrice);
  // const dispatch = useDispatch();
  const dispatch: AppDispatch = useDispatch();
  const priorityPrice = withPriority ? totaleCartPrice * 0.2 : 0;

  const cartRealPric = totaleCartPrice + priorityPrice;

  const isSubmitting = navigation.state === "submitting";

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let s go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className=" mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div onClick={(e) => console.log(e)} className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="  mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!acctuposition.latitude && !acctuposition.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              acctuposition.latitude && acctuposition.longitude
                ? `${acctuposition.latitude}, ${acctuposition.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now from  ${formatCurrency(cartRealPric)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
interface ErrorForm {
  phone: string;
}
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const phoneData = data.phone;

  // customer: data.customer as string,
  //   phone: data.phone as string,
  const order = {
    ...data,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === "true",
  };

  console.log("order", order);
  const errors = {} as ErrorForm;
  if (!isValidPhone(phoneData as string))
    errors.phone =
      "Please give us your correct phone number. we might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  console.log("newOrder", newOrder);

  //Do not overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
