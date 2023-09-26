package com.example.gudgement.game.service;

import com.example.gudgement.CardService;
import com.example.gudgement.timer.service.TimerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class GameRoundServiceImpl implements GameRoundService {

    @Override
    public void startRound(String roomNumber) {

    }

}
