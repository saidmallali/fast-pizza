import { formatCurrency } from "../../utils/helpers";
function OrderItem() {
  // const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>{/* <span>{quantity}&times;</span> {name} */}</p>
        {/* <p>{formatCurrency(totalPrice)}</p> */}
      </div>
    </li>
  );
}

export default OrderItem;
