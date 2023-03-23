package com.main.server.like.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.like.entity.Like;
import com.main.server.like.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FindLikeService {

    private final LikeRepository likeRepository;

    public Like id(Long id) {
        return likeRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));
    }
}
