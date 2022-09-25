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
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {setVideos} from '../redux/actions';
import {Alert} from 'react-native';
import {Button} from 'react-native-elements';

const Item = ({id, navigation, thumbnail, title, oid}) => {
  // console.log(title);
  return (
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
};

const SavedVideos = ({navigation, route}) => {
  const {videos, access_token, user} = useSelector(state => state?.videos);
  const [savedVideos, setSavedVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [next, setNext] = useState(null);

  const getSavedVideos = async () => {
    const response = await fetch(`${BASE_URL}/api/category/v1/video/?saved`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + access_token,
      },
    });

    if (response.status === 200) {
      const res = await response.json();
      dispatch(setVideos(res.results));
      setSavedVideos(res.results);
      setNext(res?.next);
      setLoading(false);
    } else {
      Alert.alert(
        'Error',
        'An error occured fetching savedvideos. Please try again in a few minutes.',
      );
    }
  };

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
        const newData = [...savedVideos].concat(res.results);
        dispatch(setVideos(newData));
        setSavedVideos(newData);
        setNext(res?.next);
      } else {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong with your request');
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getSavedVideos();
  }, [isFocused]);

  const renderItem = ({item}) => (
    <Item
      id={item?.id}
      navigation={navigation}
      oid={item?.video_oid}
      thumbnail={item?.videos_thumbnail}
      title={item?.title}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.category__top}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          Hey, {user?.username}
        </Text>
        <Text style={{fontSize: 16, color: 'white'}}>Your Saved Videos</Text>
      </View>
      {loading ? (
        <Text style={{color: 'white', marginTop: 20, textAlign: 'center'}}>
          Loading...
        </Text>
      ) : (
        <>
          {savedVideos?.length > 0 ? (
            <FlatList
              data={savedVideos}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              ListFooterComponent={
                <View style={{height: 120}}>
                  <View style={{height: 100}}>
                    {next && (
                      <View
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
                    )}
                  </View>
                </View>
              }
            />
          ) : (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  width: 250,
                  margin: 'auto',
                  marginTop: 70,
                }}>
                You have no saved videos.
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SavedVideos;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  },
});
