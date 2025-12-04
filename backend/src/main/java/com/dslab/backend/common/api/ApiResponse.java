package com.dslab.backend.common.api;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Schema(description = "공통 API 응답 포맷")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder    // 빌더 패턴 메서드 생성, <T>builder().success(true).data(...).error(null).build(); 이런 식으로 사용가능
public class ApiResponse<T> {   // 어떤 종류의 데아터가 오더라고 공통의 포맷을 유지하고 싶기 때문에 제네릭을 사용하는것, 어떤 데이터가 올지 모르는것도 반은 맞음..!
    @Schema(description = "성공 여부", example = "true")
    private boolean success;    // 호출 성공 여부 플래그

    @Schema(description = "응답 데이터")
    private T data;             // 실제 프론트에 넘겨줄 본문 데이터 → 현재는 제네릭 타입으로 설정
    /* 타입별 호출
     * ApiResponse<BoardDto> → data 타입은 BoardDto
     * ApiResponse<List<BoardDto>> → data 타입은 List<BoardDto>
     */

    @Schema(description = "에러 정보 (성공 시 null)")
    private ApiError error;     // 호출 실패시 에러 정보 객체

    public static <T> ApiResponse<T> ok(T data) {
    /*
     * static 메서드로 객체 생성없이 ApiResponse.ok(...) 형태로 호출 가능
     * <T> 선언시 메서드 호출시 타입이 결정된다.
     * ApiResponse<T> 를 리턴.
     * 파라미터 T data 는 감쌀 실제 데이터
     */
        return ApiResponse.<T>builder() // 롬복이 만든 빌더를 사용하는 부분
                // ApiResponse.<T>builder()는 ApiResponse의 빌더를 제네릭 타입 기반으로 만든다는 의미
                .success(true)
                .data(data)     // 빌더에 data 필드를 파라미터로 받은 값으로 설정
                .error(null)    // 에러가 없으면 null로 설정
                .build();       // 여기까지 지정한 필드 값들로 ApiResponse<T> 객체 생성
    }

    // 위 구조처럼 해석하기!
    public static <T> ApiResponse<T> error(ApiError error) {
        return ApiResponse.<T>builder()
                .success(false)
                .data(null)
                .error(error)
                .build();
    }
}
