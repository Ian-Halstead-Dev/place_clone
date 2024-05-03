package com.backend.SharedImage;


import com.sun.istack.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface ImageRepo  extends JpaRepository<Image, String> {
    Optional<Image> findById( String id);


}