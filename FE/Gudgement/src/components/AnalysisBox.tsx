import { useEffect } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";

import Config from "react-native-config";

import ProgressBar from "./ProgressBar";
import { ANALYZE_BOX_IMAGE, checkSpendRate } from "../utils/common";

import { CommonType } from "../types/CommonType";

function AnalysisBox({
  ProgressBarVisible,
  spend,
  percent,
  setSpend,
  setPercent,
}: {
  ProgressBarVisible: boolean;
  spend: {
    text: string;
    color: string;
    img: number;
  };
  percent: number;
  setSpend: React.Dispatch<
    React.SetStateAction<{
      text: string;
      color: string;
      img: number;
    }>
  >;
  setPercent: React.Dispatch<number>;
}) {
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    enabled: false,
  });

  useEffect(() => {
    refetch();
    if (userData) {
      setPercent(userData.rate.rate);
      checkSpendRate(userData, percent, setSpend);
    }
  }, [percent, refetch, userData]);

  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  if (!userData?.monthOverconsumption) {
    return (
      <View className="w-[380px] h-fill bg-white py-4 flex-row justify-evenly items-center border-[3px] border-darkgray rounded-2xl">
        <View className="flex flex-row justify-center items-center space-x-6">
          <Image
            source={{ uri: `${Config.IMAGE_URL}${ANALYZE_BOX_IMAGE[0]}` }}
            className="w-16 h-12"
            resizeMode="contain"
          />
          <View className="flex flex-col space-y-2">
            <Text className="text-black font-PretendardBold text-xs">
              내 정보에서 목표 소비 금액을 설정하면
            </Text>
            <Text className="text-black font-PretendardBold text-xs">
              {userData?.nickname}님의 소비를 분석해드려요.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="w-fill">
      <>
        <View className="w-[400px] h-fill bg-white py-4 flex-row justify-evenly items-center border-[3px] border-darkgray rounded-2xl">
          <View className="flex flex-row justify-center items-center space-x-6">
            <Text
              className={`font-PretendardExtraBold ${spend.color} text-2lg`}
            >
              {spend.text}
            </Text>
            <Image
              source={{
                uri: `${Config.IMAGE_URL}${ANALYZE_BOX_IMAGE[spend.img]}`,
              }}
              className="w-16 h-12"
              resizeMode="contain"
            />
          </View>
          <View className="flex flex-col items-end">
            <Text className="text-darkgray font-PretendardExtraBold text-xs">
              이번 달 소비
            </Text>
            <Text className="text-darkgray font-PretendardExtraBold text-lg">
              {userData?.rate.totalAmount
                ? userData?.rate.totalAmount.toLocaleString("ko-KR")
                : 0}{" "}
              원
            </Text>
          </View>
        </View>
        {ProgressBarVisible && (
          <View className="">
            <ProgressBar percent={percent >= 1 ? 1.02 : percent} />
          </View>
        )}
      </>
    </View>
  );
}

export default AnalysisBox;
