import React from 'react';
import '../Styles/Row.css';

import GridBox from "./GridBox";
interface props {
  numColumns: number,
  colors: string[],
  row: number,
  currColor: string,
  setCurrColors: React.Dispatch<React.SetStateAction<string[][]>>,
  currColors: string[][],
  onGridBoxClick: (setCurrColors: React.Dispatch<React.SetStateAction<string[][]>>, currColors: string[][], row: number, col: number, color: string, isMouseDown: boolean, wildCardParam: string) => void
  isMouseDown: boolean,
  wildCardParam: string
}

let generateRow = (numColumns: number, colors: string[], row: number, currColor: string,
  setCurrColors: React.Dispatch<React.SetStateAction<string[][]>>,
  currColors: string[][], onGridBoxClick: (setCurrColors: React.Dispatch<React.SetStateAction<string[][]>>, currColors: string[][], row: number, col: number, color: string, isMouseDown: boolean, wildCardParam: string) => void, isMouseDown: boolean, wildCardParam: string) => {
  let arr = [];
  for (let i = 0; i < numColumns; i++) {
    arr.push(<GridBox row={row} column={i} key={i} rgb={colors[i]} currColor={currColor} setCurrColors={setCurrColors} currColors={currColors} onGridBoxClick={onGridBoxClick} isMouseDown={isMouseDown} wildCardParam={wildCardParam} />)
  }
  return arr;

}
let Row: React.FC<props> = ({ numColumns, colors, row, currColor, setCurrColors, currColors, onGridBoxClick, isMouseDown, wildCardParam }) => {
  return (
    <div className="row">
      {generateRow(numColumns, colors, row, currColor, setCurrColors, currColors, onGridBoxClick, isMouseDown, wildCardParam)}
    </div>
  )
}

export default Row;