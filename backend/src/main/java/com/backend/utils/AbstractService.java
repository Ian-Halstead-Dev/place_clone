package com.backend.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public abstract class AbstractService<T, TT, R extends JpaRepository<T, TT>> {
    public R repository;

    public AbstractService(R repository) {
        this.repository = repository;
    }

    public void save(T obj) {
        repository.save(obj);
    }

    public void delete(T obj) {
        repository.delete(obj);
    }

    public List<T> getAll() {
        return repository.findAll();
    }




}
