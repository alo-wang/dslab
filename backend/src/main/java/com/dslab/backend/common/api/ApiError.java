package com.dslab.backend.common.api;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Schema(description = "에러 정보")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiError {
    @Schema(description = "에러 코드", example = "404")
    private String code;

    @Schema(description = "에러 메시지", example = "게시글을 찾을 수 없습니다.")
    private String message;
}
