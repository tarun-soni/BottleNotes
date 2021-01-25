import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "../utils/data/types";

import { statuses } from "../utils/data/index";

const DropWrapper = ({ onDrop, children, status }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item, monitor) => {
      //TODO : logic here for submit to blockchain (if approach 2)

      console.log("item", item);
      console.log("monitor", monitor);

      const itemIndex = statuses.findIndex((si) => si.status === item.status);
      const statusIndex = statuses.findIndex((si) => si.status === status);

      console.log("statusIndex", statusIndex);
      console.log("itemIndex", itemIndex);
      return [itemIndex + 1, itemIndex - 1, itemIndex];
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
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
