import React from "react";
import '../map.css'

const InfoBox = ({ title, cases, isRed, active, total, ...props }) => {
  return (
    <div
      onClick={props.onClick}
      className={`hover:bg-blue-200 transform hover:scale-105  cursor-pointer h-64 overflow-hidden bg-blue-100 rounded-lg shadow-lg ${
        active && "infoBox--selected"
      } ${isRed && "infoBox--red"} `}
    >
      <div className=" text-center px-6 py-4">
        <h2 className="font-bold text-2xl mb-2 text-gray-700">{title}</h2>
        <p>
          {" "}
          <span className="text-4xl text-blue-800 font-extrabold tracking-wider">{cases}</span>
        </p>
        <p>{total} Total </p>
      </div>
    </div>
  );
};

export default InfoBox;
