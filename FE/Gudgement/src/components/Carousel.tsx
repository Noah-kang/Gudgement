import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";

import React, { useState } from "react";
import RenderItems from "./RenderItems";
import { CommonType } from "../types/CommonType";

interface ICarousel {
  gap: number;
  offset: number;
  items?: CommonType.Titem[] | CommonType.TinvenItem[];
  pageWidth: number;
  setSelectItem: React.Dispatch<React.SetStateAction<number>>;
  component: string;
}

function Carousel({
  offset,
  pageWidth,
  gap,
  items,
  setSelectItem,
  component,
}: ICarousel) {
  const [page, setPage] = useState(0);
  const renderItem: ListRenderItem<
    CommonType.Titem | CommonType.TinvenItem
  > = ({ item }) => {
    return <RenderItems item={item} page={page} component={component} />;
  };
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
    setSelectItem(newPage);
  };
  const setIndicatorColor = (index: number) => {
    if (index === page) {
      return "bg-white";
    }
    return "bg-gray-400";
  };
  return (
    <View className="flex justify-center items-center">
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={items}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: CommonType.Titem | CommonType.TinvenItem) =>
          `${item.typeId}`
        }
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        ListEmptyComponent={() => (
          <Text className="mt-20 font-PretendardBlack text-[16px] text-white">
            아무것도 없음
          </Text>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <View className="w-full justify-center h-fit flex flex-row items-center mt-2 space-x-4">
        {items ? (
          Array.from({ length: items.length }, (_, i) => i).map(i => (
            <View
              key={`indicator_${i}`}
              className={`${setIndicatorColor(i)} w-2 h-2 rounded-full`}
            />
          ))
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}

export default Carousel;
