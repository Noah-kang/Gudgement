package com.example.gudgement.shop.dto;

import com.example.gudgement.shop.entity.Inventory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class InventoryDto {
    private Long invenId;
    private Long itemId;
    private Long memberId;
    private boolean equipped;

    @Builder
    public InventoryDto(Long invenId, Long itemId, Long memberId, boolean equipped) {
        this.invenId = invenId;
        this.itemId = itemId;
        this.memberId = memberId;
        this.equipped = equipped;
    }

    public static InventoryDto invenDto(Inventory inventory){
        return InventoryDto.builder()
                .invenId(inventory.getInvenId())
                .itemId(inventory.getItemId().getItemId())
                .memberId(inventory.getMember().getMemberId())
                .equipped(inventory.isEquipped())
                .build();
    }
}
