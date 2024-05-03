import { useNavigate } from "react-router-dom"
import '../Styles/App.css';


let loadNext = (navigate: ReturnType<typeof useNavigate>) => {
  let str = "";
  for (let i = 0; i < 8; i++) {
    str += String.fromCharCode((Math.random() * 26) + 97);
  }
  navigate("/grid/" + str);

}

let App = () => {
  let navigate = useNavigate();
  return (
    <div className="App">


      <div className="content">
        <p>Test</p>
        <button onClick={() => loadNext(navigate)}>Next</button>

      </div>
    </div>
  );
}

export default App;
