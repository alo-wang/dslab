package com.dslab.backend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class BoardDto {
    private Long pstSn;
    private String ttl;
    private String cn;
    private Long inqCnt;
    private String delYn;
    private LocalDateTime crtDt;
    private LocalDateTime mdfcnDt;
    private LocalDateTime delDt;
}
