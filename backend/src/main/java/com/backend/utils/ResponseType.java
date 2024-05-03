package com.backend.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

public class ResponseType<T> {
    T data;
    String errorMessage;

    public ResponseType(T data, String errorMessage) {
        this.data = data;
        this.errorMessage = errorMessage;
    }

    public T getData() {
        return data;
    }



    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public static <T> ResponseEntity<ResponseType<T>> success(T data) {
        return ResponseEntity.ok(new ResponseType<>(data, null));
    }

    // I supress this warning because Java doesn't know if the HashTable is of type T.
    // Even though it is technically not, I want to return an empty object and this achieves that
    // This solution is hacky, but the only way I could think of to make it work with our current typing system
    @SuppressWarnings("unchecked")
    public static <T> ResponseEntity<ResponseType<T>> success() {
        return ResponseEntity.ok(new ResponseType<>((T) new Hashtable<String, String>(), null));
    }

    public static <T> ResponseEntity<ResponseType<T>> error(String error, HttpStatus status) {
        return ResponseEntity.status(status).body(new ResponseType<>(null, error));
    }

    public static <T> ResponseEntity<ResponseType<T>> error( HttpStatus status, String error) {
        return ResponseEntity.status(status).body(new ResponseType<>(null, error));
    }
    public static <T> ResponseEntity<ResponseType<T>> error(ResponseStatusException e) {
        return ResponseEntity.status(e.getStatus()).body(new ResponseType<>(null, e.getReason()));
    }
}
