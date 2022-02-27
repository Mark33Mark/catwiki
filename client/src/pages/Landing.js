import React, { useState, useEffect } from "react";
import BreedSearch from "../components/BreedSearch";

const Landing = () => {
  
  const [names, setNames] = useState([""]);

  useEffect( () => {
    fetch('/api/')
      .then(res => res.json())
      .then(data => {
        const breeds = data.map((cats)=>cats.name);
        setNames(breeds);
      });
    }, []);

  console.log(names);

  return (
    <>
      <div className="homepage" style={{ backgroundColor: "black" }}>
        <BreedSearch names={names} />
      </div>
    </>
  );
};

export default Landing;
