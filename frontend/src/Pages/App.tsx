import { useNavigate } from "react-router-dom"
import '../Styles/App.css';
import axios from 'axios';
import { useState } from 'react';


let loadNext = async (navigate: ReturnType<typeof useNavigate>, count: number, rows: number, columns: number, roomToLoad: string | null) => {

  let str = "";
  if (roomToLoad === null) {
    if (rows <= 0 || columns <= 0) {
      alert('Please select a number of rows and columns');
      return;
    }
    str = "";
    for (let i = 0; i < 8; i++) {
      str += String.fromCharCode((Math.random() * 26) + 97);

    }
    try {
      if (count > 5) {
        alert("There has been an error. Please try again later.")
      }


      let data = await axios.post("http://localhost:8080/image", { name: str, numRows: rows, numColumns: columns });



    }
    catch (e) {
      loadNext(navigate, count + 1, rows, columns, roomToLoad);
    }
  }
  else {
    str = roomToLoad
  }



  navigate("/grid/" + str);

}

let App = () => {
  let [currRows, changeCurrRows] = useState<number>(0);
  let [currColumns, changeCurrColumns] = useState<number>(0);
  let navigate = useNavigate();
  let [currRoom, changeCurrRoom] = useState<string>("");
  return (
    <div className="App">


      <div className="content">
        <p>Test</p>

        <label >Rows: </label><input type="text" onChange={(e) => { changeCurrRows(parseInt(e.target.value)); }} />
        <label >Columns: </label><input type="text" onChange={(e) => { changeCurrColumns(parseInt(e.target.value)); }} />
        <button onClick={() => loadNext(navigate, 0, currRows, currColumns, null)}>Next</button>
        <br />
        <label >Current Room: </label><input type="text" onChange={(e) => { changeCurrRoom((e.target.value)); }} />
        <button onClick={() => loadNext(navigate, 0, currRows, currColumns, currRoom)}>Next</button>

      </div>
    </div>
  );
}

export default App;
