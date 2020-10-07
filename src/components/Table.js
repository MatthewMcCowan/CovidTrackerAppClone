import React from "react";

const Table = ({ countries }) => {
  return (
    <div className="table container ">
      {countries.map(({ country, cases }) => (
        <tr className="odd:bg-white even:bg-gray-300 ">
          <td className="py-2 ">{country}</td>
          <td className="">
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
