import React, { useState,useEffect } from 'react';

import { utils, read } from 'xlsx';
import PointsTable from './PointsTable';
import Test from './Test';
import Team from './Team';

function ExcelUploader() {

    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch the file from the public folder
          const response = await fetch('/Oct12.xlsx');
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

            // Inside the map function, add a console.log to inspect each row
            const newData = sheetData.map((row) => {
                const pointsValue = parseInt(row.Field1.match(/\d+/)[0]);
                const countryValue = (row.dftransfer_plyrskill.substring(0, 3));
                const match = row.dftransfer_plyrskill.match(/- ([A-Z]+)/);
                const extractedString = match ? match[1] : null;
                return { ...row, Points: pointsValue, Country: countryValue, Role: extractedString };
            });

            setData(newData);
            
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
        <br />
        <h1>Individual Teams</h1>
        <Team data={data} />
        {/* <Test data={data}/> */}
        <br />
        <h1>All Player Data</h1><br />

        <table className='master'>
          <thead>
            <tr>
              <th>Players</th>
              <th>Points</th>
              <th>Country</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={`${item.Country}`}>
                <td>{item.Title}</td>
                <td>{item.Points}</td>
                <td>{item.Country}</td>
                <td>{item.Role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  }
export default ExcelUploader;


