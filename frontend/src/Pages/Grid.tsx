import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import Row from "../Components/Row"
import { ChromePicker, ColorResult, CirclePicker } from 'react-color';



let setColor = (setCurrColors: React.Dispatch<React.SetStateAction<string[][]>>, currColors: string[][], row: number, col: number, color: string, isMouseDown: boolean) => {
  if (isMouseDown) {
    const newColors = [...currColors]; // Copy the current colors array
    newColors[row][col] = color; // Update the color
    setCurrColors(newColors); // Update the state
  }
}

const Grid: React.FC = () => {
  const { '*': wildcardParam } = useParams<{ '*': string }>();

  const [currColor, setCurrColor] = useState<string>("FFFFFF");
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [currColors, setCurrColors] = useState<string[][]>([['#7F78D2', '#CA15F6', '#5C8B29', '#3FCE45', '#D1B72D'], ['#A24D44', '#F4954C', '#6ED26A', '#9A23F3', '#3E8F99'], ['#A24D44', '#F4954C', '#6ED26A', '#9A23F3', '#3E8F99'], ['#A24D44', '#F4954C', '#6ED26A', '#9A23F3', '#3E8F99'], ['#A24D44', '#F4954C', '#6ED26A', '#9A23F3', '#3E8F99']])

  useEffect(() => {
    setCurrColor("#ffffff");
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

  }, []);


  return (
    <div>
      <p>{wildcardParam}</p>
      <Row numColumns={30} row={0} colors={currColors[0]} currColor={currColor} setCurrColors={setCurrColors} currColors={currColors} onGridBoxClick={setColor} isMouseDown={isMouseDown} />
      <Row numColumns={30} row={1} colors={currColors[1]} currColor={currColor} setCurrColors={setCurrColors} currColors={currColors} onGridBoxClick={setColor} isMouseDown={isMouseDown} />
      <Row numColumns={30} row={2} colors={currColors[2]} currColor={currColor} setCurrColors={setCurrColors} currColors={currColors} onGridBoxClick={setColor} isMouseDown={isMouseDown} />
      <Row numColumns={30} row={3} colors={currColors[3]} currColor={currColor} setCurrColors={setCurrColors} currColors={currColors} onGridBoxClick={setColor} isMouseDown={isMouseDown} />
      <Row numColumns={30} row={4} colors={currColors[4]} currColor={currColor} setCurrColors={setCurrColors} currColors={currColors} onGridBoxClick={setColor} isMouseDown={isMouseDown} />
      <ChromePicker
        color={currColor}
        onChange={(color: ColorResult) => { setCurrColor(color.hex) }}
      />


      <CirclePicker
        color={currColor}
        onChange={(color: ColorResult) => { setCurrColor(color.hex) }}></CirclePicker>
    </div>
  );
};

export default Grid;
