import { View, Text, Alert, Modal, StatusBar, ScrollView } from "react-native";
import { useLocalSearchParams, router, Redirect } from "expo-router";
import { api } from "@/services/api";
import { useEffect, useState, useRef } from "react";
import Loading from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { PropsDetails, Details } from "@/components/market/datails";
import Coupon from "@/components/market/coupon";
import { Button } from "@/components/button";
import { useCameraPermissions, CameraView } from "expo-camera";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<DataProps>();
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [permissions, requestPermissions] = useCameraPermissions();
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get("/markets/" + params.id);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível carregar os lugares", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    }
  }
  async function handlerOpenCamera() {
    try {
      const { granted } = await requestPermissions();
      if (!granted)
        return Alert.alert("Ops", "Nao foi possivel acessar a camera");
      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Nao foi possivel acessar a camera");
    }
  }
  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);
    Alert.alert(
      "Cupom",
      "Não é possivel reutilizar cupons. Deseja realmente resgatar o cupom?",
      [
        {
          style: "cancel",
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => getCoupon(id),
        },
      ]
    );
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);
      const { data } = await api.patch("/coupons/" + id);
      Alert.alert("Cupom", data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível carregar o cupom");
    } finally {
      setCouponIsFetching(false);
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (loading) {
    return <Loading />;
  }
  if (!data) {
    return <Redirect href="/home" />;
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
      <ScrollView>
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handlerOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>
      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isloading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
