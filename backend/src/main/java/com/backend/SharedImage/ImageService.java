package com.backend.SharedImage;

import com.backend.GridCell.GridCell;
import com.backend.GridCell.GridService;
import com.backend.utils.AbstractService;
import com.backend.utils.ResponseType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.regex.*;

@Service
public class ImageService extends AbstractService<Image, String, ImageRepo> {
    @Autowired
    ImageRepo repo;

    @Autowired
    GridService gridService;

    public ImageService(ImageRepo repository) {
        super(repository);
    }

    public Image createImage(HashMap<String, Object> data) {
        if(findByName(data.get("name").toString()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Image with name already exists");
        }
        Image image = new Image(data.get("name").toString(), (int) data.get("numRows"), (int) data.get("numColumns") );
        List<GridCell> grid = image.getGrid();
        for(int i = 0; i < (int) data.get("numRows"); i++) {
            for (int j = 0; j < (int) data.get("numColumns"); j++) {
                GridCell g = new GridCell("FFFFFF", j, i);
               grid.add(g);
                g.setGrid(image);
                gridService.save(g);
            }
        }
        save(image);
        return image;
    }

    public Optional<Image> findByName(String name) {
        return repo.findById(name);
    }

    public void changeOneCell(String id, String color, int row, int column) {
        if(!isValidHexColor(color)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Color must be a 6 character hex color containing only uppercase letters A-F or digits 0-9");
        }
        Optional<Image> imageO = findByName(id);
        if (!imageO.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found");
        }

        Image image = imageO.get();

        gridService.findByRowColumnAndGrid(row, column, image).setValue(color);
        gridService.save(gridService.findByRowColumnAndGrid(row, column, image));
        save(image);
    }

    private static boolean isValidHexColor(String color) {
        // Regular expression for a valid hex color code
        String hexColorPattern = "^[A-F0-9]{6}$";

        // Create a Pattern object
        Pattern pattern = Pattern.compile(hexColorPattern);

        // Match the input string with the pattern, converting it to uppercase
        Matcher matcher = pattern.matcher(color.toUpperCase());

        // Check if the input string matches the pattern
        return matcher.matches();
    }

    public String[][] gridToArray(String id) {

        Optional<Image> imageO = findByName(id);
        if (!imageO.isPresent()) {
          throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found");
        }

        Image image = imageO.get();

        int numRows = image.getNumRows();
        int numColumns = image.getNumColumns();
        String[][] data = new String[numRows][numColumns];

        for(int i = 0; i < numRows; i++ ){
            for(int j = 0; j < numColumns; j++) {
                data[i][j] = gridService.findByRowColumnAndGrid(i, j, image).getValue();
            }

        }
        return data;
    }
}
