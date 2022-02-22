/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/Loading";
import BreedData from "../components/BreedData";
import MorePics from "../components/MorePics";

const BreedInfo = () => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});

  // useEffect(() => {
  //   const getResponse = async () => {
  //     const result = await fetch(`${window.location.pathname}`, {
  //       method: "GET",
  //     });

  //     const json = await result.json();

  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1500);
  //     setInfo(json);
  //   };
  //   getResponse();
  // }, []);

  const { name } = useParams();
  const breedSelected = { name };
  console.log("Breed selected = " + breedSelected.name);

  useEffect(() => {
    fetch(`/${breedSelected.name}`, {
      headers: { breed: `${breedSelected.name}` },
    })
      .then((res) => res.json())
      .then((data) => setInfo(data))
      // .then((data) => {
      //   const selectedBreed = data;
      //   setInfo(selectedBreed);
      // })
      .then(setTimeout(() => setLoading(false), 2000));
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
