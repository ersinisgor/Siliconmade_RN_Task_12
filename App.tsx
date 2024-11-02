import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AntDesign } from "@expo/vector-icons";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: { rate: number; count: number };
  image: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(res => {
      setProducts(res.data);
    });
  }, []);

  const bannerProduct = products[19];
  const width = Dimensions.get("window").width;

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.priceRow}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{item.rating.rate}</Text>
            <AntDesign name="star" size={16} />
          </View>
          <Text style={styles.price}>{item.price.toFixed(2)}TL</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Pressable onPress={() => console.log("menu")}>
            <Feather name="menu" size={24} style={styles.icon} />
          </Pressable>

          <View style={styles.searchContainer}>
            <Pressable onPress={() => console.log("search")}>
              <Feather name="search" style={styles.searchIcon} />
            </Pressable>

            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              placeholderTextColor="gray"
            />
          </View>
          <MaterialCommunityIcons name="bell" size={20} style={styles.icon} />
        </View>

        <View>
          {bannerProduct ? (
            <>
              <Image
                source={{ uri: bannerProduct.image }}
                style={{ width, height: 300 }}
              />
              <View style={styles.saleContainer}>
                <View style={styles.saleAmount}>
                  <Text style={styles.saleAmountText}>50%</Text>
                </View>
                <Text style={styles.saleText}>Special SALE</Text>
              </View>
            </>
          ) : (
            <Text>Loading banner...</Text>
          )}
        </View>

        <View style={styles.bannerIcons}>
          <View style={[styles.iconContainer, { width: (width - 20) / 3 }]}>
            <MaterialIcons name="check-circle" size={24} style={styles.icon} />
            <Text style={styles.iconText}>100% Guaranteed</Text>
          </View>
          <View style={[styles.iconContainer, { width: (width - 20) / 3 }]}>
            <MaterialIcons name="attach-money" size={24} style={styles.icon} />
            <Text style={styles.iconText}>Cash on Delivery</Text>
          </View>
          <View style={[styles.iconContainer, { width: (width - 20) / 3 }]}>
            <MaterialCommunityIcons
              name="cards-heart"
              size={24}
              style={styles.icon}
            />
            <Text style={styles.iconText}>Free Returns</Text>
          </View>
        </View>

        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.container}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5efeb",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2f4156",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5efeb",
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 20,
  },
  searchInput: {
    width: "70%",
    padding: 6,
    backgroundColor: "#f0f0f0",
    color: "#567c8d",
    borderRadius: 16,
  },
  icon: {
    color: "#f5efeb",
    marginRight: 4,
  },
  searchIcon: {
    marginRight: 10,
    color: "#567c8d",
    fontSize: 20,
  },
  saleContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "#f5efeb",
    padding: 4,
    borderRadius: 10,
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-20deg" }],
  },
  saleAmount: {
    backgroundColor: "#FF9900",
    padding: 2,
    borderRadius: 50,
    width: 50,
    height: 50,
    position: "absolute",
    top: -25,
    right: -25,
    justifyContent: "center",
    alignItems: "center",
  },
  saleAmountText: {
    fontSize: 24,
    color: "#f5efeb",
    textAlign: "center",
  },
  saleText: {
    fontSize: 32,
    fontFamily: "arial",
    fontWeight: "bold",
    color: "#FF9900",
    textAlign: "center",
    lineHeight: 42,
  },
  bannerIcons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2f4156",
  },
  iconContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "#f5efeb",
    fontSize: 12,
  },
  productContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#F5F5F5",
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF9900",
  },
});
