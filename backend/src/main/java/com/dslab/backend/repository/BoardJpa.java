package com.dslab.backend.repository;

import com.dslab.backend.entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardJpa extends JpaRepository<BoardEntity,Long> {
    // 삭제 안 된 것만 조회
    List<BoardEntity> findByDelYn(String delYn);
    Page<BoardEntity> findByDelYn(String delYn, Pageable pageable);
}
