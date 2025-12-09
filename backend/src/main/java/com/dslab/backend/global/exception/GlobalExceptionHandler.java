package com.dslab.backend.global.exception;

import com.dslab.backend.common.api.ApiError;
import com.dslab.backend.common.api.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice   // 모든 @RestController 대상 글로벌 예외 처리기
public class GlobalExceptionHandler {
    /**
     * [404] 게시글을 찾을 수 없음
     */
    public ResponseEntity<ApiResponse<?>> handleBoardNotFound(BoardNotFoundException ex){
        ApiError error = ApiError.builder()
                .code("B404")   // 임의로 정한 비즈니스 코드 규칙
                .message(ex.getMessage())
                .build();

        // HTTP 상태코드는 404
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(error));
    }
}
