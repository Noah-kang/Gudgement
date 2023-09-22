package com.example.gudgement.match.controller;

import com.example.gudgement.match.dto.MatchDto;
import com.example.gudgement.match.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/betting-room")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @PostMapping("/match")
    public void addUserToRoomAndTier(@RequestBody MatchDto matchDto) {
        matchService.addUserToRoomAndTier(matchDto);
    }

    @GetMapping("/getUser")
    public Set<String> getUsersInRoomAndTier(@RequestBody MatchDto matchDto) {
        return matchService.getUsersInRoomAndTier(matchDto);
    }

    @GetMapping("/{room}/{tier}/user-count")
    public long getUsersCountInRoomAndTier(
            @PathVariable String room,
            @PathVariable String tier) {
        return matchService.getUsersCountInRoomAndTier(room, tier);
    }

    @DeleteMapping("/{room}/{tier}/remove-user")
    public void removeUserFromRoomAndTier(@RequestBody MatchDto matchDto) {
        matchService.removeUserFromRoomAndTier(matchDto);
    }
}
