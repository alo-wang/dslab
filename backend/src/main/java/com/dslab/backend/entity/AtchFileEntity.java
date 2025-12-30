package com.dslab.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "atch_file")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AtchFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="file_sn")
    private Long fileSn;

    @Column(name="atch_trgt_cd", length = 3, nullable = false)
    private String atchTrgtCd;

    @Column(name="atch_trgt_key", length = 20, nullable = false)
    private String atchTrgtKey;

    @Column(name="file_path", length = 1000, nullable = false)
    private String filePath;

    @Column(name="file_sz", nullable = false)
    private int fileSz;

    @Column(name="file_nm", length = 300, nullable = false)
    private String fileNm;

    @Column(name="uld_file_nm", length = 300, nullable = false)
    private String uldFileNm;

    @Column(name="file_extn_nm", length = 5, nullable = false)
    private String fileExtnNm;

    @Column(name="del_yn", length = 1, nullable = false)
    private String delYn;

    @Column(name="crt_dt", nullable = false)
    private LocalDateTime crtDt;

    @Column(name="del_dt")
    private LocalDateTime delDt;
}
