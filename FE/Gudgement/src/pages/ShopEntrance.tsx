import { ImageBackground, Pressable, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { IMAGE_URL } from "@env";

function ShopEntrance() {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  return (
    <View className="flex flex-1 w-full h-full">
      <ImageBackground
        source={{
          uri: `${IMAGE_URL}/asset/shopBackground.png`,
        }}
        resizeMode="cover"
        className="flex-1"
      >
        <Pressable
          className="absolute bg-deepgreen top-[42%] left-[42%] rounded-[20px]"
          onPress={() => navigation.navigate("Shop", { category: "칭호" })}
        >
          <Text className=" font-PretendardBold text-[16px] p-5 text-white">
            칭호
          </Text>
        </Pressable>
        <View className="top-2/4">
          <Pressable
            className="absolute bg-pink-500 left-[5%] rounded-[20px]"
            onPress={() => navigation.navigate("Shop", { category: "치장" })}
          >
            <Text className=" font-PretendardBold text-[16px] p-5 text-white">
              치장
            </Text>
          </Pressable>
          <Pressable
            className="absolute bg-blue-500 right-[5%] rounded-[20px]"
            onPress={() => navigation.navigate("Shop", { category: "캐릭터" })}
          >
            <Text className=" font-PretendardBold text-[16px] p-5 text-white">
              캐릭터
            </Text>
          </Pressable>
          <Pressable
            className="absolute bg-sub01 top-20 right-[40%] rounded-[20px]"
            onPress={() => navigation.navigate("Shop", { category: "소모품" })}
          >
            <Text className=" font-PretendardBold text-[16px] p-5 text-white">
              소모품
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

export default ShopEntrance;
