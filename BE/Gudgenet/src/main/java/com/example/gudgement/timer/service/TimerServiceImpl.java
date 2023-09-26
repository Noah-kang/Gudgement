package com.example.gudgement.timer.service;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@NoArgsConstructor
public class TimerServiceImpl implements TimerService{
/*
    // 타이머 생성
    public Timer createRoomTimer(String gameCode) {
        timerRedisRepository.createGameTimer(gameCode);

        Room room = gameRepository.findRoomByGameCode(gameCode);

        List<CurrentSeatsDTO> currentSeatsDTOs = roomEnterInfoRedisService.getUserEnterInfo(room.getRoomCode());
        for (CurrentSeatsDTO currentSeatsDTO : currentSeatsDTOs) {
            if (currentSeatsDTO.getUserSeq() <= 0) {
                continue;
            }
            roomUserJobRedisRepository.save(RoomUserJob.builder().userSeq(currentSeatsDTO.getUserSeq()).gameCode(gameCode).build());
        }

        return timerRedisRepository.getGameTimerInfo(gameCode);
    }

    // 해당 유저의 타이머 끝남을 표시
    public synchronized void timerEndUser(String gameCode, Long userSeq) {
        Timer timer = timerRedisRepository.getGameTimerInfo(gameCode);

        if (timer == null) {
            return;
        }

        if (timer.getTimerEndUserSeqs().contains(userSeq)) {
            return;
        }

        timer.getTimerEndUserSeqs().add(userSeq);
        timerRedisRepository.updateTimer(gameCode, timer);

        checkTimerEnd(gameCode, timer);
    }

    // 모든 유저의 타이머 끝남 확인
    private synchronized void checkTimerEnd(String gameCode, Timer timer) {
        Room room = gameRepository.findRoomByGameCode(gameCode);

        List<CurrentSeatsDTO> currentSeatsDTOs = roomEnterInfoRedisService.getUserEnterInfo(room.getRoomCode());
        List<Long> enterUsers = currentSeatsDTOs.stream()
                .map(CurrentSeatsDTO::getUserSeq)
                .filter(userSeq -> userSeq > 0) // 빈자리 0을 필터링하여 제외
                .collect(Collectors.toList());

        if (timer.getTimerEndUserSeqs().containsAll(enterUsers)) {
            // 모든 유저의 타이머가 끝났으면 다음 동작 수행
            timerTypeChange(gameCode);
        }
    }*/
}
