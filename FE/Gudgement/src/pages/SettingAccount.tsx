import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  ImageSourcePropType,
  Image,
  Pressable,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import MyPageBackground from "../assets/images/mypageBackground.png";
import MyPageIcon from "../assets/images/mypageIcon.png";
import ShinhanLogo from "../assets/images/shinhanLogo.png";
import ArrowIcon from "../assets/icons/arrowIcon.svg";
import CheckBoxOn from "../assets/icons/checkBoxOn.svg";
import CheckBoxOff from "../assets/icons/checkBoxOff.svg";
import NavigationButton from "../components/NavigationButton";

const accounts = Array(10).fill(0);
function SettingAccount() {
  const mypageBackground: ImageSourcePropType =
    MyPageBackground as ImageSourcePropType;
  const analysisIcon: ImageSourcePropType = MyPageIcon as ImageSourcePropType;
  const arrowIcon: ImageSourcePropType = ArrowIcon as ImageSourcePropType;
  const checkBoxOn: ImageSourcePropType = CheckBoxOn as ImageSourcePropType;
  const checkBoxOff: ImageSourcePropType = CheckBoxOff as ImageSourcePropType;
  const shinhanLogo: ImageSourcePropType = ShinhanLogo as ImageSourcePropType;

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [isSelected, setSelection] = useState(false);

  const toggleCheckbox = () => {
    setSelection(!isSelected);
  };

  return (
    <View className="flex">
      <ImageBackground
        source={mypageBackground}
        resizeMode="cover"
        className="flex w-screen h-screen"
      >
        <View className="z-10 flex flex-col">
          <View className="flex flex-row justify-between items-center px-4">
            <Pressable onPress={() => navigation.navigate("SettingName")}>
              <WithLocalSvg width={50} height={50} asset={arrowIcon} />
            </Pressable>
            <View className="m-7 p-[2px] flex flex-row h-fill w-[140px] justify-center items-center bg-white70 border-solid border-[3px] rounded-xl border-darkgray">
              <Text className="py-1 px-2 w-full text-center bg-darkgray rounded-lg text-white text-sm font-PretendardExtraBold">
                계좌 연동
              </Text>
            </View>
            <View className="bg-transparent h-10 w-10" />
          </View>
          <View className="flex w-full justify-center items-center">
            <View className="overflow-hidden flex flex-col bg-white70 h-fill w-[380px] rounded-3xl border-solid border-[3px] border-darkgray">
              <View className="p-5 flex flex-row items-end justify-between bg-white70 w-fill border-b-[3px] border-darkgray border-solid">
                <View className="gap-4 flex flex-row items-center">
                  <View className="z-10 flex justify-center items-center h-[50px] w-fill p-[3px] bg-white70 border-solid border-[3px] border-darkgray rounded-full">
                    <View className="bg-darkgray h-fill w-fill rounded-full">
                      <Image source={analysisIcon} className="h-10 w-10" />
                    </View>
                  </View>
                  <View className="flex felx-col">
                    <Text className="mr-1 text-sub01 text-xs font-PretendardExtraBold">
                      연동한 계좌정보는 저희가
                    </Text>

                    <View className="flex flex-row">
                      <Text className="text-darkgray text-xs font-PretendardExtraBold">
                        안전하게 보관
                      </Text>
                      <Text className="text-sub01 text-xs font-PretendardExtraBold">
                        할게요.
                      </Text>
                    </View>
                    {/* <Text className="text-sub01 text-xs font-PretendardExtraBold">
                      공개되지 않아요.
                    </Text> */}
                  </View>
                </View>
                <Text className="text-darkgray50 text-sm font-PretendardExtraBold">
                  3/3
                </Text>
              </View>
              <ScrollView className="h-[570px] w-fill p-3">
                {accounts.map((e: number) => {
                  return (
                    <View
                      key={e}
                      className="m-2 p-4 flex flex-row justify-between items-center rounded-2xl bg-white border-[3px] border-darkgray border-solid"
                    >
                      <View className="flex flex-row items-center">
                        <View className="mr-4 z-12 w-12 h-12 object-cover overflow-hidden flex justify-center items-center rounded-full border-[3px] border-darkgray border-solid">
                          <Image
                            source={shinhanLogo}
                            className="z-11 w-12 h-12"
                          />
                        </View>
                        <View className="flex flex-col gap-1">
                          <Text className="text-darkgray text-md font-PretendardBold">
                            우리꿈저축예금
                          </Text>
                          <Text className="text-darkgray50 text-2xs font-PretendardBold">
                            우리 1002-****-***-****
                          </Text>
                          <Text className="text-sub02 text-xs font-PretendardBold">
                            잔액 25,999원
                          </Text>
                        </View>
                      </View>
                      <Pressable onPress={toggleCheckbox}>
                        {isSelected ? (
                          <WithLocalSvg
                            width={40}
                            height={40}
                            asset={checkBoxOn}
                          />
                        ) : (
                          <WithLocalSvg
                            width={40}
                            height={40}
                            asset={checkBoxOff}
                          />
                        )}
                      </Pressable>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
        <View className="z-0 w-full h-full absolute pb-10 flex justify-end items-center">
          <NavigationButton
            screenName="SettingName"
            text="다 음"
            height="lg"
            width="lg"
            size="md"
            color="deepgreen"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default SettingAccount;
