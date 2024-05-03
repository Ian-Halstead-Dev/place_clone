package com.backend.GridCell;

import com.backend.SharedImage.Image;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class GridCell {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String value;
    private int rowPosition;
    private int columnPosition;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    @JsonIgnore
    private Image grid;

    public GridCell() {
    }

    public GridCell(String value, int rowPosition, int columnPosition) {
        this.value = value;
        this.rowPosition = rowPosition;
        this.columnPosition = columnPosition;
    }




    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public int getRowPosition() {
        return rowPosition;
    }

    public void setRowPosition(int rowPosition) {
        this.rowPosition = rowPosition;
    }

    public int getColumnPosition() {
        return columnPosition;
    }

    public void setColumnPosition(int columnPosition) {
        this.columnPosition = columnPosition;
    }

    public Image getGrid() {
        return grid;
    }

    public void setGrid(Image grid) {
        this.grid = grid;
    }
}


