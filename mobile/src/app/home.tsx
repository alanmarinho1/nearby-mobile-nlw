import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { fontFamily, colors } from "@/styles/theme";
import { router } from "expo-router";

import { api } from "@/services/api";

import { Categories, CategoryProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import MapView, { Callout, Marker } from "react-native-maps";

import * as Location from "expo-location";

type MarkestProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home() {
  const [categories, setCategories] = useState<CategoryProps>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarkestProps[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      //   console.log(data);
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível carregar as categorias");
    }
  }
  async function fetchMarkets() {
    try {
      if (!category) return;
      const { data } = await api.get("/markets/category/" + category);
      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível carregar os lugares");
    }
  }
  async function getCurrentLocation() {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (granted) {
      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
    }
  }

  useEffect(() => {
    getCurrentLocation();
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchMarkets();
  }, [category]);
  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />
        {markets.map((item) => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
              <View>
                <Text
                  style={{
                    fontFamily: fontFamily.medium,
                    fontSize: 14,
                    color: colors.gray[600],
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.regular,
                    fontSize: 12,
                    color: colors.gray[600],
                  }}
                >
                  {item.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Places data={markets} />
    </View>
  );
}
