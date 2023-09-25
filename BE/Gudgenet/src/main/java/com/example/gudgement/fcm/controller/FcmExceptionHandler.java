package com.example.gudgement.fcm.controller;

import com.example.gudgement.fcm.exception.FcmErrorException;
import com.example.gudgement.member.exception.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class FcmExceptionHandler {

    @ExceptionHandler(value = FcmErrorException.class)
    public ResponseEntity<ErrorResponse> fcmException(FcmErrorException e) {
        log.error("[fcmException] {} : {}", e.getErrorCode(), e.getMessage());
        return ResponseEntity.ok(ErrorResponse.builder().build());
    }
}
