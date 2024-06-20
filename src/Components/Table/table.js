import React, { useEffect, useState } from 'react';
import './table.css';
import { formatDistanceToNow } from 'date-fns';

const Table = ({ tableData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.title}</td>
              <td>{data.type}</td>
              <td>{formatDistanceToNow(new Date(data.addedAt), { addSuffix: true })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
