import {
  Alert,
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
import {Button} from 'react-native-elements';

const Item = ({title, thumbnail, url, navigation, oid, id}) => (
  <TouchableOpacity
    style={{paddingLeft: 10, paddingRight: 10}}
    onPress={() => {
      navigation.navigate('VideoPlayer', {
        id,
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
  const {categoryTitle, categories, access_token} = useSelector(
    state => state.videos,
  );
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoList, setVideoList] = useContext(VideosContext);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [next, setNext] = useState(null);

  // console.log(categoryTitle);
  // console.log(access_token);

  const fetchMore = async () => {
    setLoading(true);
    if (next) {
      const response = await fetch(`${next}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Token ${access_token}`,
        },
      });

      if (response.ok) {
        setLoading(false);
        const res = await response.json();
        const newData = [...videos].concat(res.results);
        // console.log(newData);
        dispatch({
          type: 'SET_VIDEOS',
          payload: newData,
        });
        setVideos(newData);
        setNext(res?.next);
      } else {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong with your request');
      }
    }
  };

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

      if (response.status === 200) {
        const res = await response.json();
        setNext(res?.next);
        dispatch({
          type: 'SET_VIDEOS',
          payload: res.results,
        });
        setVideos(res.results);
        setLoading(false);
      }
      if (!response.ok) {
        Alert.alert(
          'Error',
          'An error occured while fetching data. Please try again in a few minutes.',
        );
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      setVideos(null);
    };
  }, [categoryTitle]);

  useEffect(() => {
    setCurrentCategory(categories?.find(cat => cat.name === categoryTitle));

    return () => {
      setCurrentCategory(null);
    };
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
              <>
                <FlatList
                  data={videos}
                  renderItem={renderItem}
                  keyExtractor={item => item.video_oid}
                  ListFooterComponent={
                    <View style={{height: 100}}>
                      {
                        next && <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Button
                          title="Load More"
                          containerStyle={{
                            width: '80%',
                          }}
                          buttonStyle={{
                            height: 40,
                          }}
                          onPress={fetchMore}
                        />
                      </View>
                      }
                    </View>
                  }
                />
              </>
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
