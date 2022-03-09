import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import {setCategoryTitle} from "../redux/actions";

const categoryData = [
  {
    id: 1,
    category: "Nature",
    img: "https://lh3.googleusercontent.com/W7wMzRYwGnx4zxxbNn3hr31pTKBnA7XFnRBEAnAC7eGCQ7BUF8gMjlSDtPmQJEWw554TY6a06qBHAekzDQYYYbYAGuX4BtEIwipUlYbyA1fE9fC-OnmpCsu_iGsGCkPaaWlIUDyZgQ=w2400",
    videos: 7,
  },
  {
    id: 2,
    category: "Photography",
    img: "https://lh3.googleusercontent.com/SWbuBrXPHHtV1m_ki3PFuDvkWBXlk4DcrAjcBXUhFfJ-UWJKvBj6nPknHZZZLLc5UWEKO7pgqvPJ62vDssZkozLArkf0lsU2FA7v91Ps_7_MUZCfCE8VQSqmbQj7cD-ZjSklAAKaSQ=w2400",
    videos: 14,
  },
  {
    id: 3,
    category: "Web Development",
    img: "https://lh3.googleusercontent.com/QBnWTatrdJfL7rLVMnIfTj21IB2kOuCQvG4aOm9Yhjqs-o0c6BCd5Q5BkrZjvCr2engpteOoSQqjCGzKr-C_p_tEgIe9EC18dTmIlOShOkDGg4MsroJNl3N-GV5JIotQQyLKNTe0_g=w2400",
    videos: 23,
  },
  {
    id: 4,
    category: "Nature",
    img: "https://lh3.googleusercontent.com/W7wMzRYwGnx4zxxbNn3hr31pTKBnA7XFnRBEAnAC7eGCQ7BUF8gMjlSDtPmQJEWw554TY6a06qBHAekzDQYYYbYAGuX4BtEIwipUlYbyA1fE9fC-OnmpCsu_iGsGCkPaaWlIUDyZgQ=w2400",
    videos: 7,
  },
  {
    id: 5,
    category: "Photography",
    img: "https://lh3.googleusercontent.com/SWbuBrXPHHtV1m_ki3PFuDvkWBXlk4DcrAjcBXUhFfJ-UWJKvBj6nPknHZZZLLc5UWEKO7pgqvPJ62vDssZkozLArkf0lsU2FA7v91Ps_7_MUZCfCE8VQSqmbQj7cD-ZjSklAAKaSQ=w2400",
    videos: 14,
  },
  {
    id: 6,
    category: "Web Development",
    img: "https://lh3.googleusercontent.com/QBnWTatrdJfL7rLVMnIfTj21IB2kOuCQvG4aOm9Yhjqs-o0c6BCd5Q5BkrZjvCr2engpteOoSQqjCGzKr-C_p_tEgIe9EC18dTmIlOShOkDGg4MsroJNl3N-GV5JIotQQyLKNTe0_g=w2400",
    videos: 23,
  },
  {
    id: 7,
    category: "Web Development",
    img: "https://lh3.googleusercontent.com/QBnWTatrdJfL7rLVMnIfTj21IB2kOuCQvG4aOm9Yhjqs-o0c6BCd5Q5BkrZjvCr2engpteOoSQqjCGzKr-C_p_tEgIe9EC18dTmIlOShOkDGg4MsroJNl3N-GV5JIotQQyLKNTe0_g=w2400",
    videos: 23,
  },
];

const Item = ({ category, img, videos, navigation, handleSetCategory }) => (
  <TouchableOpacity
    style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}
    onPress={() => {
      handleSetCategory(category)
      // console.log("category ", category);
      navigation.navigate("Videos");
    }}
  >
    <View style={styles.item}>
      <Image style={styles.category__image} source={{ uri: img }} />
      <View style={{ marginTop: 10 }}>
        <Text style={styles.title}>{category}</Text>
        <Text style={{ fontSize: 14, marginLeft: 10, color: "white" }}>
          Videos - {videos}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const CategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSetCategory = (category) => {
    dispatch(setCategoryTitle(category));
    // console.log("categpry from handleSetcategory ", category);
  };

  const renderItem = ({ item }) => (
    <Item
      navigation={navigation}
      handleSetCategory={handleSetCategory}
      category={item.category}
      img={item.img}
      videos={item.videos}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.category__top}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Hey, Jihan Chowdhury
        </Text>
        <Text style={{ fontSize: 16, color: "white" }}>Find categories of your interest</Text>
      </View>
      <FlatList
        data={categoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={{height: 120}}/>}
        // style={{flex: 1}}
      />
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#232c38",
  },
  category__top: {
    marginBottom: 30,
    marginLeft: 10,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#100f30",
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    color: "white",
  },
  category__image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // marginBottom: 50,
    // backgroundColor: "red",
  },
});
