import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

interface Props {
  id?: number;
  currentQuent?: number;
}

const UpdateItemQuantity = ({ id, currentQuent }: Props) => {
  const dispatch = useDispatch();

  const handelIncrease = () => {
    dispatch(increaseItemQuantity(id));
  };

  const handeldecrease = () => {
    dispatch(decreaseItemQuantity(id));
  };

  return (
    <>
      <div className=" flex items-center gap-1 rounded-full bg-yellow-400 md:gap-2 ">
        <Button onClick={handeldecrease} type="round">
          -
        </Button>
        <span>{currentQuent}</span>
        <Button onClick={handelIncrease} type="round">
          +
        </Button>
      </div>
    </>
  );
};

export default UpdateItemQuantity;
