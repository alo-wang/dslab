package com.dslab.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Schema(description = "게시판 DTO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class AtchFileDto {
    @Schema(description = "파일 일련번호", example = "1")
    private Long fileSn;

    private String atchTrgtCd;
    private String atchTrgtKey;
    private String filePath;
    private int fileSz;
    private String fileNm;
    private String uldFileNm;
    private String fileExtnNm;
    private String delYn;
    private LocalDateTime crtDt;
    private LocalDateTime delDt;
}
