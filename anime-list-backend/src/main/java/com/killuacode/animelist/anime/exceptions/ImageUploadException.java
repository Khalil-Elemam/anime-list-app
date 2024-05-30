package com.killuacode.animelist.anime.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, code = HttpStatus.BAD_REQUEST)
public class ImageUploadException extends RuntimeException{

    public ImageUploadException(String message) {
        super(message);
    }
}
