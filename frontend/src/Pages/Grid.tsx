import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import Row from "../Components/Row"
import { ChromePicker, ColorResult, CirclePicker } from 'react-color';
import axios from 'axios';



let setColor = (setCurrColors: React.Dispatch<React.SetStateAction<string[][]>>, currColors: string[][], row: number, col: number, color: string, isMouseDown: boolean, wildCardParam: string) => {
  if (isMouseDown) {
    let asyncFunc = async () => {
      try {
        await axios.put("http://localhost:8080/image/changeOneCell/" + wildCardParam, { row: row, column: col, color: color })

      } catch (e) {
        console.log(e)
      }

    }

    asyncFunc();

    const newColors = [...currColors]; // Copy the current colors array
    newColors[row][col] = color; // Update the color
    setCurrColors(newColors); // Update the state
  }
  else {
    // TODO: Code in here to change color on hover
  }
}

let generateGrid = (row: number, col: number, setCurrColors: React.Dispatch<React.SetStateAction<string[][]>>, currColors: string[][], isMouseDown: boolean, currColor: string, wildCardParam: string) => {
  let data: any = [];
  for (let i = 0; i < row; i++) {
    data.push(<Row key={i} numColumns={col} row={i} colors={currColors[i]} currColor={currColor} setCurrColors={setCurrColors} currColors={currColors} onGridBoxClick={setColor} wildCardParam={wildCardParam} isMouseDown={isMouseDown} />);
  }
  return data;
}



const Grid: React.FC = () => {
  const { '*': wildcardParam } = useParams<{ '*': string }>();

  const [currColor, setCurrColor] = useState<string>("FFFFFF");
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [currColors, setCurrColors] = useState<string[][]>([])
  const [row, setRow] = useState<number>(0);
  const [col, setCol] = useState<number>(0);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    let asyncFunc = async () => {
      try {
        let data = await axios.get("http://localhost:8080/image/gridAsArray/" + wildcardParam)
        let arr = data.data.data;
        setRow(arr.length);
        setCol(arr[0].length);
        setCurrColors(arr);
        setPageLoaded(true);
      }
      catch (e) {
        console.log(e);
      }


    }

    asyncFunc();


  }, []);


  return (
    pageLoaded ? (
      <div>
        <p>{wildcardParam}</p>
        <div className="grid">
          {generateGrid(row, col, setCurrColors, currColors, isMouseDown, currColor, wildcardParam!)}
        </div>
        <ChromePicker
          color={currColor}
          onChange={(color: ColorResult) => { setCurrColor(color.hex.slice(1)) }}
        />
        <CirclePicker
          color={currColor}
          onChange={(color: ColorResult) => { setCurrColor(color.hex.slice(1)) }}
        />
      </div>
    ) : <div></div>
  );
};

export default Grid;
