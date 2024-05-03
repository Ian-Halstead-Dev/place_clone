package com.backend.SharedImage;

import com.backend.GridCell.GridCell;
import com.backend.GridCell.GridService;
import com.backend.utils.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Optional;

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
        for(int i = 0; i < (int) data.get("numRows"); i++) {
            for (int j = 0; j < (int) data.get("numColumns"); j++) {
                GridCell g = new GridCell("FFFFFF", j, i);
                image.getGrid().add(g);
                gridService.save(g);
            }
        }
        return image;
    }

    public Optional<Image> findByName(String name) {
        return repo.findById(name);
    }
}
