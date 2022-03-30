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
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCategory, setCategoryTitle} from '../redux/actions';
import {BASE_URL} from '@env';


const Item = ({category, img, videos, navigation, handleSetCategory}) => (
  <TouchableOpacity
    style={{paddingLeft: 10, paddingRight: 10, flex: 1}}
    onPress={() => {
      handleSetCategory(category);
      // console.log("category ", category);
      navigation.navigate('Videos');
    }}>
    <View style={styles.item}>
      <Image style={styles.category__image} source={{uri: img}} />
      <View style={{marginTop: 10}}>
        <Text style={styles.title}>{category}</Text>
        <Text style={{fontSize: 14, marginLeft: 10, color: 'white'}}>
          Videos - {videos}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const CategoryScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user, access_token, categories} = useSelector(state => state.videos);

  // console.log(user);
  // console.log(categories);

  const handleSetCategory = category => {
    dispatch(setCategoryTitle(category));
    // console.log("categpry from handleSetcategory ", category);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/category/v1/categories/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + access_token,
      },
    })
      .then(res => res.json())
      .then(data => {
        dispatch(setCategory(data));
      })
      .catch(err => alert(err.message));
  }, []);

  const renderItem = ({item}) => (
    <Item
      navigation={navigation}
      handleSetCategory={handleSetCategory}
      category={item.name}
      img="https://lh3.googleusercontent.com/QBnWTatrdJfL7rLVMnIfTj21IB2kOuCQvG4aOm9Yhjqs-o0c6BCd5Q5BkrZjvCr2engpteOoSQqjCGzKr-C_p_tEgIe9EC18dTmIlOShOkDGg4MsroJNl3N-GV5JIotQQyLKNTe0_g=w2400"
      videos={7}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.category__top}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          Hey, {user?.username}
        </Text>
        <Text style={{fontSize: 16, color: 'white'}}>
          Find categories of your interest
        </Text>
      </View>
      {categories?.length > 0 && (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={<View style={{height: 120}} />}
          // style={{flex: 1}}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#232c38',
    height: '100%',
  },
  category__top: {
    marginBottom: 30,
    marginLeft: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#100f30',
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    color: 'white',
  },
  category__image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // marginBottom: 50,
    // backgroundColor: "red",
  },
});
