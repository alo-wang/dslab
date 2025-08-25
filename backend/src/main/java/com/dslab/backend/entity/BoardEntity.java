package com.dslab.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    @Column(name="pst_sn")
    long pstSn;

    @Column(name="ttl")
    String ttl;

    @Column(name="cn", columnDefinition = "TEXT")
    String cn;

    @Column(name="inq_cnt")
    long inqCnt;

    @Column(name="del_yn", length = 1)
    String delYn;

    @Column(name="crt_dt")
    LocalDateTime crtDt;

    @Column(name="mdfcn_dt")
    LocalDateTime mdfcnDt;

    @Column(name="del_dt")
    LocalDateTime delDt;
}
