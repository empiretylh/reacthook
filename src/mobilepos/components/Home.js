import React, { Component } from "react";
import { useQuery } from "react-query";
import database from "../services/database";

export default function Home() {
  const products = useQuery(["products"], database.getProducts);
  const category = useQuery(["category"], database.getCategorys);
  const sales = useQuery(["sales"], database.getSales);
  const expense = useQuery(["expense"], database.getExpense);
  const profile = useQuery(["profile"], database.getProfile);

  if (products.isLoading) return "Loading...";

  if (products.error) return "An error has occurred: " + products.error.message;

  console.log(products.datadata);

  console.log("render");

  return (
    <div>
      <p>Home</p>
      {products.data.data.map((item, id) => (
        <p key={id}>{item.name}</p>
      ))}
      {products.data.data.map((item, id) => (
        <p key={id}>{item.name}</p>
      ))}
      {products.data.data.map((item, id) => (
        <p key={id}>{item.name}</p>
      ))}

{products.data.data.map((item, id) => (
        <p key={id}>{item.name}</p>
      ))}
{products.data.data.map((item, id) => (
        <p key={id}>{item.name}</p>
      ))}{products.data.data.map((item, id) => (
        <p key={id}>{item.name}</p>
      ))}
 
    </div>
  ); 
}
