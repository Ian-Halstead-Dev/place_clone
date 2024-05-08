import { useNavigate } from "react-router-dom"
import '../Styles/App.css';
import axios from 'axios';


let loadNext = async (navigate: ReturnType<typeof useNavigate>, count: number) => {
  let str = "";
  for (let i = 0; i < 8; i++) {
    str += String.fromCharCode((Math.random() * 26) + 97);

  }
  try {
    if (count > 5) {
      alert("There has been an error. Please try again later.")
    }


    let data = await axios.post("http://localhost:8080/image", { name: str, numRows: 10, numColumns: 10 });

  }
  catch (e) {
    loadNext(navigate, count + 1);
  }
  navigate("/grid/" + str);

}

let App = () => {
  let navigate = useNavigate();
  return (
    <div className="App">


      <div className="content">
        <p>Test</p>
        <button onClick={() => loadNext(navigate, 0)}>Next</button>

      </div>
    </div>
  );
}

export default App;
