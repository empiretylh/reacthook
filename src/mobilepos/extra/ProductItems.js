import React,{useMemo} from "react";

import AddToCart from "./addtocart";

import axios from "axios";

function numberWithCommas (x = 0)  {
	return x
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		.concat(" Ks");
};

const ProductItem = React.memo(({ item }) => {
	return (
		<div className="sales-productItem">
			<img
				src={
					(item.pic && item.pic === "/media/null") ||
					item.pic === "null" ||
					item.pic === null
						? "https://static.thenounproject.com/png/101825-200.png"
						: axios.defaults.baseURL + item.pic
				}
				onError={({ currentTarget }) => {
					currentTarget.src =
						"https://static.thenounproject.com/png/101825-200.png";
				}}
			/>

			<h5>{item.name}</h5>
			<h6 className={"price-text"}>{numberWithCommas(item.price)}</h6>
			<div>
				<p>Price {item.price}</p>
				<AddToCart item={item} />
			</div>

			<p className={"qty-text"}>{item.qty}</p>
		</div>
	);
});

const ProductsItem = ({ items }) => {
	console.log("Here I Render ", items);

	const data = useMemo(()=>{
		console.log('Re Updating....')
		return items;


	},[items])

	return (
		<>
			{data.map((item, index) => (
				<ProductItem item={item} key={index} />
			))}
		</>
	);
};

export default React.memo(ProductsItem);
