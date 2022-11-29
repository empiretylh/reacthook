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
  const { selectValue, setSelectValue } = useContext(SelectProductsContext);

  const [data,setData] = useState()

  const isSelectd = useMemo(() => {
    const v = selectValue && selectValue.filter((o) => o.id === item.id);
    setData(v[0])
    console.log(v, "is Selected");
    if (v.length > 0) {

      return true;
    } else {
      return false;
    }
  }, [selectValue, setSelectValue, item]);

  const Click = async (item) => {
    let d = {
      id: item.id,
      qty: 1,
      price: item.price,
      check: true,
      total: item.price,
      name: item.name,
    };
    const a = await setSelectValue((prev) => prev.concat(d));
  };

  console.log(isSelectd && selectValue.qty, "wweeee");



  if (isSelectd) {
    
  } else {
    return (
      <div>
        <div className="addtocart" onClick={() => Click(item)}>
          <h5>Add to Cart</h5>
        </div>
      </div>
    );
  }
};

export default AddToCart;
