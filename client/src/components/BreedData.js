import React from "react";
import Dashboard from "./Dashboard";

const BreedData = (props) => {

  console.log(props); 
  return (
    <div className="breed-data">
      <div className="photo-container">
        <img
          src={props.breedInfo.image.url}
          alt="Placeholder"
          className="photo"
        />
      </div>
      <div className="right">
        <div className="text">
          <h4>{props.breedInfo.name}</h4>
          <p>{props.breedInfo.description}</p>
        </div>
        <Dashboard info={props.breedInfo} />
      </div>
    </div>
  );
};

export default BreedData;
