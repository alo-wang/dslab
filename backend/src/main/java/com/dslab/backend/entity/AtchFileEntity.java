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
    Long fileSn;

    @Column(name="atch_trgt_cd", length = 3, nullable = false)
    String atchTrgtCd;

    @Column(name="atch_trgt_key", length = 20, nullable = false)
    String atchTrgtKey;

    @Column(name="file_path", length = 100, nullable = false)
    String filePath;

    @Column(name="file_sz", nullable = false)
    int fileSz;

    @Column(name="file_nm", length = 300, nullable = false)
    String fileNm;

    @Column(name="uld_file_nm", length = 300, nullable = false)
    String uldFileNm;

    @Column(name="file_extn_nm", length = 5, nullable = false)
    String fileExtnNm;

    @Column(name="del_yn", length = 1)
    String delYn;

    @Column(name="crt_dt")
    LocalDateTime crtDt;

    @Column(name="del_dt")
    LocalDateTime delDt;
}
