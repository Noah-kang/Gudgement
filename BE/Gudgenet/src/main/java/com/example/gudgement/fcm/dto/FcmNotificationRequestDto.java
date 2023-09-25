package com.example.gudgement.fcm.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FcmNotificationRequestDto {
    private Long memberId;
    private String title;
    private String content;

    @Builder
    public FcmNotificationRequestDto(Long memberId, String title, String content) {
        this.memberId = memberId;
        this.title = title;
        this.content = content;
    }
}
