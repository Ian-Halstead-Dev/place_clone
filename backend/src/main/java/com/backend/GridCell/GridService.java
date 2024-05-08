package com.backend.GridCell;

import com.backend.SharedImage.Image;
import com.backend.SharedImage.ImageRepo;
import com.backend.utils.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GridService extends AbstractService<GridCell, Integer, GridRepo> {
    @Autowired
    GridRepo repo;

    public GridService(GridRepo repository) {
        super(repository);
    }

    public GridCell findByRowColumnAndGrid(int row, int column, Image grid) {
        return repo.findByRowPositionAndColumnPositionAndGrid(row, column, grid);
    }
}
