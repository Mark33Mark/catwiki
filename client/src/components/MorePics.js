/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/Loading";

const MorePics = (id) => {
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState({});

  console.log(id.breedId);

  useEffect(() => {
    const getResponse = async () => {
      const result = await fetch(`/more-pics/${id.breedId}`, {
        method: "GET",
      });

      const json = await result.json();

      setTimeout(() => {
        setLoading(false);
      }, 1500);
      setGallery(json);
    };
    getResponse();
  }, []);

  console.log(gallery);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="other-photos">
        <div className="photos">
          {gallery.map((photo, index) => (
            <a href={photo.url} target="_blank" rel="noreferrer" key={index}>
              <img src={photo.url} alt={id.breedId} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default MorePics;
