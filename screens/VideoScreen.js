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
import { useSelector } from "react-redux";

const videoList = [
  {
    id: 1,
    title: "Iron Man vs Thor - Fight Scene",
    category: "Web Development",
    url: "https://youtu.be/PNdF6xfVMXM",
    oid: "kjiSVunIWpU",
    thumbnail:
      "https://lh3.googleusercontent.com/QBnWTatrdJfL7rLVMnIfTj21IB2kOuCQvG4aOm9Yhjqs-o0c6BCd5Q5BkrZjvCr2engpteOoSQqjCGzKr-C_p_tEgIe9EC18dTmIlOShOkDGg4MsroJNl3N-GV5JIotQQyLKNTe0_g=w2400",
  },
  {
    id: 2,
    title: "Web Development Course",
    category: "Web Development",
    url: "https://youtu.be/XU0FYlY9_E0",
    oid: "XU0FYlY9_E0",
    thumbnail:
      "https://lh3.googleusercontent.com/QBnWTatrdJfL7rLVMnIfTj21IB2kOuCQvG4aOm9Yhjqs-o0c6BCd5Q5BkrZjvCr2engpteOoSQqjCGzKr-C_p_tEgIe9EC18dTmIlOShOkDGg4MsroJNl3N-GV5JIotQQyLKNTe0_g=w2400",
  },
  {
    id: 3,
    title: "Sacrifices I made for my Passion",
    category: "Web Development",
    url: "https://youtu.be/UTCeLfby7O4",
    oid: "UTCeLfby7O4",
    thumbnail:
      "https://lh3.googleusercontent.com/QBnWTatrdJfL7rLVMnIfTj21IB2kOuCQvG4aOm9Yhjqs-o0c6BCd5Q5BkrZjvCr2engpteOoSQqjCGzKr-C_p_tEgIe9EC18dTmIlOShOkDGg4MsroJNl3N-GV5JIotQQyLKNTe0_g=w2400",
  },
  {
    id: 4,
    title: "My Gym Experience",
    category: "Web Development",
    url: "https://youtu.be/hnAlQePLpbE",
    oid: "hnAlQePLpbE",
    thumbnail:
      "https://lh3.googleusercontent.com/QBnWTatrdJfL7rLVMnIfTj21IB2kOuCQvG4aOm9Yhjqs-o0c6BCd5Q5BkrZjvCr2engpteOoSQqjCGzKr-C_p_tEgIe9EC18dTmIlOShOkDGg4MsroJNl3N-GV5JIotQQyLKNTe0_g=w2400",
  },
  {
    id: 5,
    title: "How to Argue?",
    category: "Web Development",
    url: "https://youtu.be/a5pxp-JcRTw",
    oid: "a5pxp-JcRTw",
    thumbnail:
      "https://lh3.googleusercontent.com/QBnWTatrdJfL7rLVMnIfTj21IB2kOuCQvG4aOm9Yhjqs-o0c6BCd5Q5BkrZjvCr2engpteOoSQqjCGzKr-C_p_tEgIe9EC18dTmIlOShOkDGg4MsroJNl3N-GV5JIotQQyLKNTe0_g=w2400",
  },
];

const Item = ({ title, thumbnail, url, navigation, oid, id }) => (
  <TouchableOpacity
    style={{ paddingLeft: 10, paddingRight: 10 }}
    onPress={() => {
      navigation.navigate("VideoPlayer",{
        oid: oid
      });
    }}
  >
    <View style={styles.item}>
      <Image style={styles.category__image} source={{ uri: thumbnail }} />
      <View style={{ marginTop: 10, overflow: "hidden" }}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const VideoScreen = ({ navigation }) => {
  const { categoryTitle } = useSelector((state) => state.videos);

  // console.log("categoryTitle ", categoryTitle);

  const renderItem = ({ item }) => (
    <Item
      navigation={navigation}
      title={item.title}
      thumbnail={item.thumbnail}
      url={item.url}
      oid={item.oid}
      id={item.id}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 15 }}>
        <Image
          style={{
            width: "90%",
            height: 200,
            borderRadius: 15,
            alignSelf: "center",
          }}
          source={{
            uri: "https://lh3.googleusercontent.com/QBnWTatrdJfL7rLVMnIfTj21IB2kOuCQvG4aOm9Yhjqs-o0c6BCd5Q5BkrZjvCr2engpteOoSQqjCGzKr-C_p_tEgIe9EC18dTmIlOShOkDGg4MsroJNl3N-GV5JIotQQyLKNTe0_g=w2400",
          }}
        />
        <Text
          style={{
            fontSize: 20,
            marginLeft: 25,
            // fontWeight: "bold",
            color: "white",
            marginVertical: 10,
          }}
        >
          Videos from category - {categoryTitle}
        </Text>
      </View>
      <FlatList
        data={videoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={{height: 300}}/>}
      />
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#232c38",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#100f30",
    overflow: "hidden",
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    color: "white",
    // flex: 1,
    // flexWrap: "wrap",
    width: 220
  },
  category__image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // marginBottom: 50,
    // backgroundColor: "red",
  },
});
