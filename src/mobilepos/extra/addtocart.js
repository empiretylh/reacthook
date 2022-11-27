import React,{useState,useEffect,useMemo,useContext} from 'react';
import SelectProductsContext from '../context/SelectedContext';
const AddToCart = ({item})=>{

    const {selectValue,setSelectValue} = useContext(SelectProductsContext);

    return(
        <div>
          <div className='addtocart'>
            <h5>Add to Cart</h5>
          </div>
        </div>
    )
}

export default AddToCart;