import React, { useState } from "react";
import Item from "./DnDComps/Item";
import DropWrapper from "./DnDComps/DropWrapper";
import Col from "./DnDComps/Col";
import { statuses } from "./utils/data";
import "./DnD.css";
const Homepage = ({ data }) => {
  const [items, setItems] = useState(data);
  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i._id !== item._id)
        .concat({ ...item, status, icon: mapping.icon });

      // const returnArray = newItems.reverse();
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <div className={"row"}>
      {statuses.map((s) => {
        return (
          <div key={s.status} className={"col-wrapper"}>
            <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col>
                {items
                  .filter((i) => i.status === s.status)
                  .map((i, idx) => (
                    <Item
                      key={i._id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      status={s}
                    />
                  ))}
              </Col>
            </DropWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
