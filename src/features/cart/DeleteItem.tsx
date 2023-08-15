import { ReactNode } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

interface Props {
  id?: number;
  children?: ReactNode;
  type?: "primary" | "secondary" | "small";
}

const DeleteItem = ({ id, children, type }: Props) => {
  const dispatch = useDispatch();

  const handelDeletItem = () => {
    dispatch(deleteItem(id));
  };
  return (
    <Button type={type} onClick={handelDeletItem}>
      {children ? children : "Delete"}
    </Button>
  );
};

export default DeleteItem;
