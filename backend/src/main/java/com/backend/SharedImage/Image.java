package com.backend.SharedImage;



import com.backend.GridCell.GridCell;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Image {

    /*
     * The annotation @ID marks the field below as the primary key for the table created by springboot
     * The @GeneratedValue generates a value if not already present, The strategy in this case is to start from 1 and increment for each table
     */
    @Id
    private String id;

    private int numRows;
    private int numColumns;

    @OneToMany()
    private List<GridCell> grid;

    public Image() {
    }

    public Image(String id, int numRows, int numColumns) {
        this.id = id;
        this.numRows = numRows;
        this.numColumns = numColumns;
        grid = new ArrayList<>();

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getNumRows() {
        return numRows;
    }

    public void setNumRows(int rows) {
        this.numRows = rows;
    }

    public int getNumColumns() {
        return numColumns;
    }

    public void setNumColumns(int columns) {
        this.numColumns = columns;
    }

    public List<GridCell> getGrid() {
        return grid;
    }

    public void setGrid(List<GridCell> grid) {
        this.grid = grid;
    }
}
