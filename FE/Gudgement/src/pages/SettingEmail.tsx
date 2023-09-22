import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ImageBackground,
  ImageSourcePropType,
  Image,
  Pressable,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import MyPageBackground from "../assets/images/mypageBackground.png";
import MyPageIcon from "../assets/images/mypageIcon.png";
import ArrowIcon from "../assets/icons/arrowIcon.svg";
import NavigationButton from "../components/NavigationButton";
import axios, { AxiosResponse } from "axios";
import Reactotron from "reactotron-react-native";
import { getAsyncData } from "../utils/common";
import { API_URL } from "@env";

function SettingEmail() {
  const mypageBackground: ImageSourcePropType =
    MyPageBackground as ImageSourcePropType;
  const analysisIcon: ImageSourcePropType = MyPageIcon as ImageSourcePropType;
  const arrowIcon: ImageSourcePropType = ArrowIcon as ImageSourcePropType;

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [tempUserId, setTempUserId] = useState(0);

  const getTempUserId = async () => {
    try {
      const responseGetId = await getAsyncData("id");
      Reactotron.log!("아이디 확인 성공!", responseGetId);
      setTempUserId(responseGetId ? parseInt(responseGetId, 10) : 0);
    } catch (error) {
      Reactotron.log!("아이디 확인 실패!", error);
    }
  };

  const handleFetchEmail = async (currentEmail: string) => {
    const sendBE = {
      id: tempUserId,
      email: currentEmail,
    };
    Reactotron.log!("sendBE", sendBE);
    try {
      const response: AxiosResponse<CommonType.TemailCode> = await axios.post(
        `${API_URL}/member/email/send`,
        sendBE,
      );
      Reactotron.log!("인증 메일 요청 성공!", response.data);
      if (response.status === 200) {
        const mailCode = response.data.toString();
        setCheckNumber(mailCode);
        setEmail(currentEmail);
        // 이메일로 전송된 인증 코드를 입력하세요! 알림 모달창
      }
    } catch (error) {
      // 인증 메일 요청 실패! 알림 모달창
      Reactotron.log!("인증 메일 요청 실패!", error);
    }
  };

  const handleFetchNumber = async (currentNumber: string) => {
    Reactotron.log!(currentNumber);
    if (checkNumber === currentNumber) {
      Reactotron.log!("이메일 인증 코드 동일!", checkNumber, currentNumber);
      try {
        const sendBE = {
          id: tempUserId,
          email: email,
        };
        const response: AxiosResponse<CommonType.TemailUpdate[]> =
          await axios.post(`${API_URL}/member/update/email`, sendBE);
        Reactotron.log!("인증 메일 등록 성공!", response.data);
        if (response.status === 200) {
          const mailCode = response.data.toString();
          setCheckNumber(mailCode);
          navigation.navigate("SettingName");
        }
      } catch (error) {
        // 인증 메일 등록 실패! 알림 모달창
        Reactotron.log!("인증 메일 등록 실패!", error);
      }
    } else {
      // 인증 코드를 다시 확인해주세요! 알림 모달창
    }
  };

  useEffect(() => {
    getTempUserId();
  }, []);

  return (
    <View className="flex">
      <ImageBackground
        source={mypageBackground}
        resizeMode="cover"
        className="flex w-screen h-screen"
      >
        <View className="z-10 flex flex-col">
          <View className="flex flex-row justify-between items-center px-4">
            <Pressable onPress={() => navigation.navigate("Login")}>
              <WithLocalSvg width={50} height={50} asset={arrowIcon} />
            </Pressable>
            <View className="m-7 p-[2px] flex flex-row h-fill w-[140px] justify-center items-center bg-white70 border-solid border-[3px] rounded-xl border-darkgray">
              <Text className="py-1 px-2 w-full text-center bg-darkgray rounded-lg text-white text-sm font-PretendardExtraBold">
                본인 인증
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
                    <View className="flex flex-row">
                      <Text className="mr-1 text-sub01 text-xs font-PretendardExtraBold">
                        인증된 이메일정보는
                      </Text>
                      <Text className="text-darkgray text-xs font-PretendardExtraBold">
                        안전하게
                      </Text>
                    </View>
                    <View className="flex flex-row">
                      <Text className="text-darkgray text-xs font-PretendardExtraBold">
                        보관
                      </Text>
                      <Text className="text-sub01 text-xs font-PretendardExtraBold">
                        되며 다른 사용자에게
                      </Text>
                    </View>
                    <Text className="text-sub01 text-xs font-PretendardExtraBold">
                      공개되지 않아요.
                    </Text>
                  </View>
                </View>
                <Text className="text-darkgray50 text-sm font-PretendardExtraBold">
                  1/3
                </Text>
              </View>
              <View className="h-fill w-fill">
                <SafeAreaView className="mx-4 w-fit">
                  <View className="flex flex-row mt-4 mb-3 w-full justify-around items-center">
                    <TextInput
                      onChangeText={setEmail}
                      value={email}
                      placeholder="이메일"
                      placeholderTextColor="darkgray"
                      className="h-[60px] w-[230px] p-4 mr-2 bg-white rounded-xl border-solid border-[3px] text-darkgray border-darkgray text-sm font-PretendardExtraBold"
                    />
                    <NavigationButton
                      handleFunction={() => handleFetchEmail(email)}
                      text="인증받기"
                      height="lg"
                      width="sm"
                      size="md"
                      color="lightsky"
                    />
                  </View>
                  <TextInput
                    onChangeText={setNumber}
                    value={number}
                    placeholder="인증 번호"
                    placeholderTextColor="darkgray"
                    keyboardType="numeric"
                    className="h-[60px] bt-3 mb-4 p-4 bg-white rounded-xl border-solid border-[3px] border-darkgray text-darkgray text-sm font-PretendardExtraBold"
                  />
                </SafeAreaView>
              </View>
            </View>
          </View>
        </View>
        <Pressable className="z-0 w-full h-full absolute pb-10 flex justify-end items-center">
          <NavigationButton
            handleFunction={() => handleFetchNumber(number)}
            text="다 음"
            height="lg"
            width="lg"
            size="md"
            color="deepgreen"
          />
        </Pressable>
      </ImageBackground>
    </View>
  );
}

export default SettingEmail;
