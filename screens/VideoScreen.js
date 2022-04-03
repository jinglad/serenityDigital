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
import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setVideos} from '../redux/actions';
import {BASE_URL} from '@env';
import {VideosContext} from '../App';

const Item = ({title, thumbnail, url, navigation, oid, id}) => (
  <TouchableOpacity
    style={{paddingLeft: 10, paddingRight: 10}}
    onPress={() => {
      navigation.navigate('VideoPlayer', {
        oid: oid,
      });
    }}>
    <View style={styles.item}>
      <Image style={styles.category__image} source={{uri: thumbnail}} />
      <View style={{marginTop: 10, overflow: 'hidden'}}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const VideoScreen = ({navigation}) => {
  const {categoryTitle, categories, access_token} = useSelector(state => state.videos);
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoList, setVideoList] = useContext(VideosContext);
  const [currentCategory, setCurrentCategory] = useState(null);

  // console.log(categoryTitle);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        `${BASE_URL}/api/category/v1/video/?category=${categoryTitle}`,
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
        dispatch({
          type: 'SET_VIDEOS',
          payload: res,
        });
        setVideos(res);
        setLoading(false);
      }
      if (!response.ok) {
        alert(
          'An error occured while fetching data. Please try again in a few minutes.',
        );
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryTitle]);

  useEffect(() => {
    setCurrentCategory(categories.find(cat => cat.name === categoryTitle));
  }, [categoryTitle]);

  const renderItem = ({item}) => (
    <Item
      navigation={navigation}
      title={item.title}
      thumbnail={item.videos_thumbnail}
      url={item.youtube_video_link}
      oid={item.video_oid}
      id={item?.id}
    />
  );

  // console.log(access_token);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom: 15}}>
        <Image
          style={{
            width: '90%',
            height: 200,
            borderRadius: 15,
            alignSelf: 'center',
          }}
          source={{
            uri: currentCategory?.category_thumbnail,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            marginLeft: 25,
            // fontWeight: "bold",
            color: 'white',
            marginVertical: 10,
          }}>
          Videos from category - {categoryTitle}
        </Text>
      </View>
      <>
        {loading ? (
          <Text style={{color: 'white', marginTop: 20, textAlign: 'center'}}>
            Loading...
          </Text>
        ) : (
          <>
            {videos?.length > 0 ? (
              <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={item => item.video_oid}
                ListFooterComponent={<View style={{height: 300}} />}
              />
            ) : (
              <Text
                style={{color: 'white', marginTop: 20, textAlign: 'center'}}>
                No Videos Available
              </Text>
            )}
          </>
        )}
      </>
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#232c38',
    height: '100%',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#100f30',
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
    // flex: 1,
    // flexWrap: "wrap",
    width: 220,
  },
  category__image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // marginBottom: 50,
    // backgroundColor: "red",
  },
});
