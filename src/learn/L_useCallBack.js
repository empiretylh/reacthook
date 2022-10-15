import React, { useState, useMemo, useEffect } from "react";

export default function CallBack() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const getItems = () => {
    return [number, number + 1, number + 2];
  };

  
  const theme = {
    backgroundColor:dark? '#333' : '#fff',
    color:dark?'#FFF' :'#333',
  }
  return (
    <div style={theme}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      /><br></br>
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Toggle Theme
      </button>
     
    </div>
  );
}

function slowFunction(num) {
  console.log("Calling Slow Function");
  for (let i = 0; i < 1000000000; i++) {
    return num * 2;
  }
}
