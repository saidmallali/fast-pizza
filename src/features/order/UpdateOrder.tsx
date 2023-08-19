import { Order } from "../../entities/Order";
import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { ActionFunctionArgs, useFetcher } from "react-router-dom";
interface Props {
  order: Order;
}

const UpdateOrder = ({ order }: Props) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export async function action({ request, params }: ActionFunctionArgs) {
  const data = { priority: true };
  await updateOrder(params.orderId!, data);
  return null;
}
