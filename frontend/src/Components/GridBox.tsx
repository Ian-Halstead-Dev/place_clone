interface props {
  rgb: string;
  row: number;
  column: number;
  currColor: string;
  setCurrColors: React.Dispatch<React.SetStateAction<string[][]>>;
  currColors: string[][];
  onGridBoxClick: (setCurrColors: React.Dispatch<React.SetStateAction<string[][]>>, currColors: string[][], row: number, col: number, color: string, isMouseDown: boolean, wildCardParam: string) => void;
  isMouseDown: boolean;
  wildCardParam: string;

}

const GridBox: React.FC<props> = ({ rgb, row, column, currColor, setCurrColors, currColors, onGridBoxClick, isMouseDown, wildCardParam }) => {
  // Parse the RGB string into an array of numbers


  // Create an inline style with the RGB values
  const style = {
    backgroundColor: `#${rgb}`
  };

  return (
    <div className="color-element" style={style}
      onMouseOver={() => { onGridBoxClick(setCurrColors, currColors, row, column, currColor, isMouseDown, wildCardParam) }}
      onMouseDown={() => { onGridBoxClick(setCurrColors, currColors, row, column, currColor, true, wildCardParam) }}
    >
    </div >
  );
};
export default GridBox;