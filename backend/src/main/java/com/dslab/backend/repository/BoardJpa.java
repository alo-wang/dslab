package com.dslab.backend.repository;

import com.dslab.backend.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardJpa extends JpaRepository<BoardEntity,Long> {

}
