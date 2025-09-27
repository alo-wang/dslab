package com.dslab.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Schema(description = "게시판 DTO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class BoardDto {
    @Schema(description = "게시판 일련번호", example = "1")
    private Long pstSn;

    @Schema(description = "게시글 제목", example = "게시글 제목입니다....!")
    private String ttl;
    private String cn;
    private Long inqCnt;
    private String delYn;
    private LocalDateTime crtDt;
    private LocalDateTime mdfcnDt;
    private LocalDateTime delDt;
}
