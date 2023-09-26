import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  ImageSourcePropType,
  Image,
  Pressable,
} from "react-native";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "@env";
import CustomModal from "../components/CustomModal";
import NavigationButton from "../components/NavigationButton";
import AccountBox from "../components/AccountBox";
import MyPageBackground from "../assets/images/mypageBackground.png";
import MyPageIcon from "../assets/images/mypageIcon.png";
import reactotron from "reactotron-react-native";
import { getAsyncData, updateAsyncData } from "../utils/common";

function SettingAccount() {
  const mypageBackground: ImageSourcePropType =
    MyPageBackground as ImageSourcePropType;
  const analysisIcon: ImageSourcePropType = MyPageIcon as ImageSourcePropType;

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [accounts, setAccounts] = useState<CommonType.Taccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginData = (await getAsyncData(
          "loginData",
        )) as CommonType.TloginData;
        const email = loginData.email;
        // const hasAccounts = loginData.hasAccounts;
        if (email) {
          setTempEmail(email);
          // reactotron.log!("TempEmail", tempEmail);
          // reactotron.log!("hasAccounts", hasAccounts);
        }
      } catch (error) {
        reactotron.log!("이메일 불러오기 실패!", error);
      }
    };

    fetchData();

    if (tempEmail.length > 0) {
      const bringAccounts = async () => {
        const loginData = (await getAsyncData(
          "loginData",
        )) as CommonType.TloginData;
        if (loginData.hasAccounts === 0) {
          fetchAccount();
        }
        if (loginData.hasAccounts === 1) {
          handleReadAccount();
        }
        const hasAccounts = {
          hasAccounts: 2,
        };
        updateAsyncData("loginData", hasAccounts);
      };
      bringAccounts();
    }
  }, [tempEmail]);

  const fetchAccount = async () => {
    await handleCreateAccountRepeatedly(6);
  };

  const handleCreateAccountRepeatedly = async (repetitions: number) => {
    for (let i = 0; i < repetitions; i++) {
      await handleCreateAccount();
    }
  };

  const handleCreateAccount = async () => {
    const sendBE = {
      bankName: "shinhan",
      accountName: "신한저축계좌",
      accountNumber: "1002-345-234-124",
      accountHolder: "강해빈",
      email: tempEmail,
      balance: 122395134,
    };
    try {
      const response = await axios.post(`${API_URL}/account/virtual`, sendBE);
      reactotron.log!("계좌 생성 성공!", response);
      handleReadAccount();
    } catch (error) {
      reactotron.log!("계좌 생성 실패!", error);
    }
  };

  const handleReadAccount = async () => {
    // reactotron.log!("인증된 이메일", tempEmail);
    try {
      const response: AxiosResponse<CommonType.Taccount[]> = await axios.get(
        `${API_URL}/account/${tempEmail}`,
      );
      const responseAccount = response.data;
      setAccounts(responseAccount);
      // reactotron.log!("계좌 불러오기 성공!", accounts);
    } catch (error) {
      reactotron.log!("계좌 불러오기 실패!", error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSelect = (accountId: number) => {
    setSelectedAccountId(accountId);
    accounts.map(account => {
      if (account.virtualAccountId === accountId) {
        account.selected = !account.selected;
      }
    });
  };

  const submitSelect = async () => {
    reactotron.log!("선택된 계좌 아이디", selectedAccountId);
    if (!selectedAccountId) {
      setModalText("계좌를 선택해주세요");
      openModal();
      return;
    }

    if (selectedAccountId !== null) {
      const sendBE = {
        email: tempEmail,
        virtualAccountId: selectedAccountId,
      };
      try {
        const response = await axios.post(`${API_URL}/account`, sendBE);
        reactotron.log!("계좌 연동 성공!", response);

        navigation.navigate("BottomTabNavigator");
        const settingAccountAction = CommonActions.reset({
          index: 0,
          routes: [{ name: "BottomTabNavigator" }],
        });
        navigation.dispatch(settingAccountAction);
      } catch (error) {
        reactotron.log!("계좌 연동 실패!", error);
      }
    }
  };

  return (
    <View className="flex w-screen h-screen">
      <ImageBackground
        source={mypageBackground}
        resizeMode="cover"
        className="flex w-screen h-screen"
      >
        <CustomModal
          alertText={modalText}
          visible={modalVisible}
          closeModal={closeModal}
        />
        <View className="z-10 flex flex-col">
          <View className="flex justify-between items-center px-4">
            <View className="m-7 p-[2px] flex flex-row h-fill w-[140px] justify-center items-center bg-white70 border-solid border-[3px] rounded-xl border-darkgray">
              <Text className="py-1 px-2 w-full text-center bg-darkgray rounded-lg text-white text-sm font-PretendardExtraBold">
                계좌 연동
              </Text>
            </View>
          </View>
          <View className="flex w-full justify-start items-center">
            <View className="overflow-hidden flex flex-col bg-white70 h-fill w-[380px] rounded-3xl border-solid border-[3px] border-darkgray">
              <View className="p-5 flex flex-row items-end justify-between bg-white70 w-fill border-b-[3px] border-darkgray border-solid">
                <View className="gap-4 flex flex-row items-center">
                  <View className="z-10 flex justify-center items-center h-[50px] w-fill p-[3px] bg-white70 border-solid border-[3px] border-darkgray rounded-full">
                    <View className="bg-darkgray h-fill w-fill rounded-full">
                      <Image source={analysisIcon} className="h-10 w-10" />
                    </View>
                  </View>
                  <View className="flex felx-col">
                    <Text className="text-sub01 text-xs font-PretendardExtraBold">
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
                    <View className="flex flex-row">
                      <Text className="mr-1 text-sub01 text-xs font-PretendardExtraBold">
                        주계좌 1개를
                      </Text>
                      <Text className="text-darkgray text-xs font-PretendardExtraBold">
                        선택
                      </Text>
                      <Text className="text-sub01 text-xs font-PretendardExtraBold">
                        해주세요.
                      </Text>
                    </View>
                  </View>
                </View>
                <Text className="text-darkgray50 text-sm font-PretendardExtraBold">
                  3/3
                </Text>
              </View>
              <ScrollView className="h-[74%] w-fill p-3">
                <View className="mb-6">
                  {accounts.map((account: CommonType.Taccount) => {
                    return (
                      <Pressable
                        key={account.virtualAccountId}
                        onPress={() => {
                          handleSelect(account.virtualAccountId);
                        }}
                      >
                        <AccountBox
                          account={account}
                          isSelected={
                            selectedAccountId === account.virtualAccountId
                          }
                          onSelect={handleSelect}
                        />
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <View className="z-10 w-full h-fill bottom-0 absolute pb-10 flex justify-end items-center">
          <NavigationButton
            handleFunction={submitSelect}
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
