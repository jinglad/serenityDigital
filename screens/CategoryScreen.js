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
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCategory, setCategoryTitle} from '../redux/actions';
import {getCategory} from '../data/getCategory';
import {BASE_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';

const Item = ({category, img, navigation, handleSetCategory}) => {
  const {user, access_token, categories} = useSelector(state => state.videos);
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        `${BASE_URL}/api/category/v1/videos_by_category_count/?category=${category}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: 'Token ' + access_token,
          },
        },
      );
      const res = await response.json();
      if (response.status === 200) {
        // console.log(res);
        setCount(res);
      }
      if (!response.ok) {
        alert('An error occured during fething category. Try again');
      }
    };
    fetchApi();

    return () => {
      setCount(null);
    };
  }, []);

  return (
    <TouchableOpacity
      style={{paddingLeft: 10, paddingRight: 10, flex: 1}}
      onPress={() => {
        handleSetCategory(category);
        navigation.navigate('Videos');
      }}>
      <View style={styles.item}>
        <Image style={styles.category__image} source={{uri: img}} />
        <View style={{marginTop: 10}}>
          <Text style={styles.title}>{category}</Text>
          <Text style={{fontSize: 14, marginLeft: 10, color: 'white'}}>
            Videos - {count?.this_category_found_videos | 0}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CategoryScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {user, access_token, categories} = useSelector(state => state.videos);
  const isFocused = useIsFocused();

  const handleSetCategory = category => {
    dispatch(setCategoryTitle(category));
  };

  useEffect(() => {
    getCategory(dispatch, access_token);
  }, [isFocused]);

  const renderItem = ({item}) => (
    <Item
      navigation={navigation}
      handleSetCategory={handleSetCategory}
      category={item.name}
      img={item?.category_thumbnail}
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
  },
});
