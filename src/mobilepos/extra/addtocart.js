import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallBack,
} from "react";
import SelectProductsContext from "../context/SelectedContext";

import {
  Col,
  Row,
  Container,
  Table,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
const AddToCart = ({ item }) => {
  const { selectValue, setSelectValue, handleAdd, selectData } = useContext(
    SelectProductsContext
  );

  const Click = async (item) => {
    let d = {
      id: item.id,
      qty: 1,
      price: item.price,
      check: true,
      total: item.price,
      name: item.name,
    };
    handleAdd(d);
  };

  // console.log("Render Cart Data");

  return (
    <div>
      <div className="addtocart" onClick={() => Click(item)}>
        <h5>Add to Cart</h5>
      </div>
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  // Perform a deep equality check on the props
  console.log(prevProps,nextProps,'What Data')
  // return isEqual(prevProps, nextProps);
}

export default React.memo(AddToCart,areEqual);
