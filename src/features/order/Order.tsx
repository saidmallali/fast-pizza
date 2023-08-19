import { useEffect } from "react";
import { Order as OrderInterface } from "../../entities/Order";
import { getOrder } from "../../services/apiRestaurant";
import {
  useLoaderData,
  LoaderFunctionArgs,
  useFetcher,
} from "react-router-dom";
import OrderItem from "./OrderItem";

// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { Pizza } from "../../entities/Pizza";
import UpdateOrder from "./UpdateOrder";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData() as OrderInterface;
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const fetcher = useFetcher();

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold"> Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${
                estimatedDelivery && calcMinutesLeft(estimatedDelivery)
              } minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery:{" "}
          {estimatedDelivery && formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el: Pizza) => el.id === item.pizzaId)
                .ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {orderPrice && formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {priorityPrice && formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery:{" "}
          {orderPrice && formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<OrderInterface | null> {
  const orderData = await getOrder(params.orderId);
  if (orderData) return orderData;
  return null;
}

export default Order;
