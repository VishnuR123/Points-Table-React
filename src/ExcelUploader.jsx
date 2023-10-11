import React, { useState,useEffect } from 'react';

import { utils, read } from 'xlsx';
import PointsTable from './PointsTable';

function ExcelUploader() {

    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch the file from the public folder
          const response = await fetch('/Oct11Ind.xlsx');
          const blob = await response.blob();
  
          // Create a FileReader object to read the blob
          const reader = new FileReader();
  
          reader.onload = (e) => {
            const data = e.target.result;
            const workbook = read(data, { type: 'binary' });
  
            // Assuming the data is in the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
  
            // Convert sheet data to an array of objects
            const sheetData =utils.sheet_to_json(sheet);
  
            // Update the state with the sheet data
            setData(sheetData);
            
          };
  
          reader.readAsBinaryString(blob);
        } catch (error) {
          console.error("Error fetching or reading the XLSX file:", error);
        }
      };

      fetchData();
    }, []);
    
    return (
      <div>
        <PointsTable data={data} />
        <br /><br />
        <h1>All Player Data</h1><br />
        <table className='master'>
          <thead>
            <tr>
              <th>Players</th>
              <th>Details</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.Title}</td>
                <td>{item.Details}</td>
                <td>{item.Points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  }
export default ExcelUploader;


