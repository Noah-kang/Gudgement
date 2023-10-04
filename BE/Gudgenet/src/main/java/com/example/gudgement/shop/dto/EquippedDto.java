package com.example.gudgement.shop.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class EquippedDto implements Serializable {
    private Long invenId;
    private Long itemId;
    private String itemName;
    private String itemContent;
    private String itemEffect;
    private String image;
    private boolean isEquipped;
    private String type;
    private long typeId;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer quantity;

    @Builder
    public EquippedDto(Long invenId, Long itemId, String itemName, String itemContent, String itemEffect, String image, boolean isEquipped, String type, Integer quantity, long typeId) {
        this.invenId = invenId;
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.image = image;
        this.isEquipped = isEquipped;
        this.type = type;
        this.quantity = quantity;
        this.typeId = typeId;
    }

}
