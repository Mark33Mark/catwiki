import React, { useState, useEffect } from "react";
import BreedSearch from "../components/BreedSearch";
import LoadingSpinner from "../components/Loading";

const Landing = () => {
  const [isLoading, setIsLoading] = useState([true]);
  const [names, setNames] = useState([""]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setNames(data))
      .then(setTimeout(() => setIsLoading(false), 4000));
  }, []);

  console.log(names);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="homepage" style={{ backgroundColor: "black" }}>
        <BreedSearch names={names} />
      </div>
    </>
  );
};

export default Landing;
