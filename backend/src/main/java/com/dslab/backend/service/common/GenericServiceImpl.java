package com.dslab.backend.service.common;

import java.util.function.Function;

// @Service
public abstract class GenericServiceImpl<T,R,ID> implements GenericService<T,R>{
    protected final Function<T, R> toDtoMapper;

    protected GenericServiceImpl(Function<T, R> toDtoMapper) {
        this.toDtoMapper = toDtoMapper;
    }
}
