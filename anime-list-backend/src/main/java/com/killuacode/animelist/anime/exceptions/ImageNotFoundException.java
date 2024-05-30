package com.killuacode.animelist.anime.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, code = HttpStatus.NOT_FOUND)
public class ImageNotFoundException extends RuntimeException{

    public ImageNotFoundException(String message) {
        super(message);
    }
}
