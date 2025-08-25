package com.dslab.backend.controller;

import com.dslab.backend.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/board")
public class BoardController {
    @Autowired
    private BoardService boardService;


}
