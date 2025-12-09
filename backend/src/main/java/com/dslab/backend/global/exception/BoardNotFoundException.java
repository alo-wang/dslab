package com.dslab.backend.global.exception;

public class BoardNotFoundException extends RuntimeException {
    public BoardNotFoundException(String message){
        super(message);
    }
}
