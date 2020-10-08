import React from "react";
import numeral from 'numeral'

const Table = ({ countries }) => {
  return (
    <div className="table container ">
      {countries.map(({ country, cases }) => (
        <tr className="odd:bg-white even:bg-blue-200 ">
          <td className="p-2">{country}</td>
          <td className="">
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
