import { CommonType } from "../types/CommonType";
import { useState } from "react";
import { Image, View, Text, Pressable } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import {
  KAKAO_LOGIN_REST_API_KEY,
  KAKAO_LOGIN_REDIRECT_URI,
  SERVER_URL,
  IMAGE_URL,
} from "@env";
import axios from "axios";
import { setAsyncData } from "../utils/common";
import reactotron from "reactotron-react-native";
import { queryClient } from "../../queryClient";

function Login() {
  const [showWebView, setShowWebView] = useState(false);

  const handleLogin = () => {
    setShowWebView(true);
  };

  const fetchAccessToken = async (code: string) => {
    try {
      const response = await axios.post<CommonType.TkakaoLogin>(
        `${SERVER_URL}/?code=${code}`,
      );
      setShowWebView(false);
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const id = response.data.id;
      const expiredTime = response.data.refreshTokenExpiration;

      try {
        const loginData: CommonType.TloginData = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          expiredTime: expiredTime,
          id: id,
          email: "none",
        };
        const responseLogin = await setAsyncData("loginData", loginData);
        reactotron.log!("스토리지에 저장 성공!", responseLogin);
      } catch (error) {
        reactotron.log!("스토리지 초기화 실패!", error);
      }
      setShowWebView(false);

      /**
       * accessToken 잘 받아왔다면
       * 로그인 여부는 asyncStorage에서,
       * user정보는 서버로부터 다시 불러오게합니다.
       */
      queryClient.invalidateQueries(["isLoggedIn"]);
      queryClient.invalidateQueries(["fetchUserInfo"]);
    } catch (error) {
      reactotron.log!("인가 코드 전달 실패!", error);
    }
  };

  const getAuthorizationCode = async (event: WebViewMessageEvent) => {
    const url = event.nativeEvent.url;
    const exp = "code=";
    const searchIdx = url.indexOf(exp);

    if (searchIdx !== -1) {
      const code = url.substring(searchIdx + exp.length);

      reactotron.log!("code", code);
      await fetchAccessToken(code);
    }
  };

  const handleAuthorizationCode = async (event: WebViewMessageEvent) => {
    try {
      await getAuthorizationCode(event);
    } catch (error) {
      reactotron.log!("에러 발생!", error);
    }
  };

  if (showWebView) {
    return (
      <WebView
        className="flex"
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_LOGIN_REST_API_KEY}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}`,
        }}
        injectedJavaScript={
          'window.ReactNativeWebView.postMessage("this is message from web");'
        }
        javaScriptEnabled={true}
        onMessage={event => {
          if (!event.nativeEvent.loading) {
            handleAuthorizationCode(event);
          }
        }}
      />
    );
  }
  return (
    <View className="flex flex-row justify-center items-end h-full pb-20">
      <Pressable
        onPress={handleLogin}
        className="flex flex-row justify-center items-center w-[300px] py-4 bg-buy rounded-lg border-solid border-[3px] border-darkgray"
      >
        <Image
          source={{ uri: `${IMAGE_URL}/asset/kakaoLogo.png` }}
          className="h-8 w-9 mr-6"
        />
        <Text className="text-center text-darkgray text-md font-PretendardExtraBold">
          카카오로 시작하기
        </Text>
      </Pressable>
    </View>
  );
}

export default Login;
