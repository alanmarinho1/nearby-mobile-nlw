import { View, Text } from "react-native";
import { styles } from "./styles";
import React from "react";
import Step from "../step";
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";

export default function Steps() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veja como funciona:</Text>
      <Step
        icon={IconMapPin}
        title="Encontre estabelecimentos"
        description="Veja locais perto de você que são parceiros Nearby"
      />
      <Step
        icon={IconQrcode}
        title="Ative o cupom com QR Code"
        description="Escaneie o código no estabelecimento para usar o benefício"
      />
      <Step
        icon={IconTicket}
        title="Garanta vantagens perto de você"
        description="Ative cupons onde estiver, em diferentes tipos de estabelecimento"
      />
    </View>
  );
}
