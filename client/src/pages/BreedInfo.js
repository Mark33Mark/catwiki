/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/Loading";
import BreedData from "../components/BreedData";
import MorePics from "../components/MorePics";

const BreedInfo = () => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});

  const { name } = useParams();
  const breedSelected = { name };
  console.log("Breed selected = " + breedSelected.name);

  useEffect(() => {
    fetch(`/${breedSelected.name}`, {
      headers: { breed: `${breedSelected.name}` },
    })
      .then((res) => res.json())
      .then((data) => setInfo(data))

      .then(setTimeout(() => setLoading(false), 2500));
  }, []);

  console.log(info);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Header />
      <BreedData breedInfo={info} />
      <h3 style={{ padding: "0 2rem" }}>Gallery:</h3>
      <MorePics breedId={info.id} />
    </>
  );
};

export default BreedInfo;
