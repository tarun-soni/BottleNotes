import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "../utils/data/types";

import { statuses } from "../utils/data/index";
import { updateNote } from "../../../actions/notes";
import { useDispatch } from "react-redux";

const DropWrapper = ({ onDrop, children, status }) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item, monitor) => {
      const itemIndex = statuses.findIndex((si) => si.status === item.status);
      const statusIndex = statuses.findIndex((si) => si.status === status);

      return [itemIndex + 1, itemIndex - 1, itemIndex];
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
      const newValue = {
        title: item.title,
        desc: item.desc,
        status: status,
      };

      dispatch(updateNote(newValue, item._id));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={"drop-wrapper"}>
      {React.cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapper;
