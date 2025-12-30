package com.dslab.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "board")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="pst_sn")
    private Long pstSn;

    @Column(name="ttl")
    private String ttl;

    @Column(name="cn", columnDefinition = "TEXT")
    private String cn;

    @Column(name="inq_cnt")
    private Long inqCnt = 0L;   // 기본값 0

    @Column(name="del_yn", length = 1)
    private String delYn;

    @Column(name="crt_dt")
    private LocalDateTime crtDt;

    @Column(name="mdfcn_dt")
    private LocalDateTime mdfcnDt;

    @Column(name="del_dt")
    private LocalDateTime delDt;
}
