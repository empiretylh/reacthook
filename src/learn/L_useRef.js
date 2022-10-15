import React, { useState, useMemo, useEffect, useRef } from "react";

export default function Ref() {
  const [name, setName] = useState("");
  const renderCount = useRef(0);
  const inputRef = useRef()

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  function focus(){
    console.log(inputRef.current.focus())
    inputRef.current.value ='Some Value'
      
  }

  return (
    <>
      <input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} />
      <div>My name is {name}</div>
      <div>I rendered {renderCount.current} times</div>
      <button onClick={focus}>Focus</button>
    </>
  );
}
