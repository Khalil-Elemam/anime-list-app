package com.killuacode.animelist.anime.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNSUPPORTED_MEDIA_TYPE, code = HttpStatus.UNSUPPORTED_MEDIA_TYPE)
public class InvalidImageException extends RuntimeException{

    public InvalidImageException(String message) {
        super(message);
    }
}
