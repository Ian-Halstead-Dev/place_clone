package com.backend.SharedImage;



import com.backend.GridCell.GridCell;
import com.backend.GridCell.GridService;
import com.backend.utils.ResponseType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.GeneratedValue;
import java.util.*;

@RestController()
@RequestMapping("/image")
public class ImageController {

    @Autowired
    ImageService service;

    @Autowired
    GridService gridService;

    @PostMapping("")
    private ResponseEntity<ResponseType<Image>> createImage(@RequestBody HashMap<String, Object> body) {
      Image image;
        try {
            image = service.createImage(body);
      } catch (ResponseStatusException e) {
            return ResponseType.error(e);
        }



        return ResponseType.success(image);
    }

    @GetMapping("/containsKey/{id}")
    private ResponseEntity<ResponseType<Boolean>> dbContainsImage(@PathVariable String id) {
        return ResponseType.success(service.findByName(id).isPresent());
    }

    @GetMapping("/{id}")
    private ResponseEntity<ResponseType<Image>> getImage(@PathVariable String id) {
        Optional<Image> imageO = service.findByName(id);
        if (!imageO.isPresent()) {
           return ResponseType.error(HttpStatus.NOT_FOUND, "Image not found");
        }

        return ResponseType.success(imageO.get());
    }

    @GetMapping("/gridAsArray/{id}")
    private ResponseEntity<ResponseType<String[][]>> getStatusAsArray(@PathVariable String id) {
        try {
            return ResponseType.success(service.gridToArray(id));
        } catch (ResponseStatusException e) {
            return ResponseType.error(e);
        }
    }



    @PutMapping("/changeOneCell/{id}")
    private ResponseEntity<ResponseType<String>> changeCell(@PathVariable String id, @RequestBody HashMap<String, Object> hash) {

        try {
            service.changeOneCell(id, hash.get("color").toString(), Integer.parseInt(hash.get("row").toString()),  Integer.parseInt(hash.get("column").toString()) );
        } catch(ResponseStatusException e) {
            return ResponseType.error(e);
        }
        return ResponseType.success();
    }

}
