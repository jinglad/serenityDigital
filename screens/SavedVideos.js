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
import {useSelector} from 'react-redux';

const Item = ({id, navigation, thumbnail, title, oid}) => {
  // console.log(title);
  return (
    <TouchableOpacity
      style={{paddingLeft: 10, paddingRight: 10}}
      onPress={() => {
        navigation.navigate('VideoPlayer', {
          id
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
  const {videos, access_token, user} = useSelector(state => state.videos);
  const [savedVideos, setSavedVideos] = useState(null);

  const getSavedVideos = async () => {
    const response = await fetch(`${BASE_URL}/api/category/v1/video/?saved`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + access_token,
      },
    });
    const res = await response.json();
    if (response.status === 200) {
      // console.log(res);
      setSavedVideos(res);
    } else {
      alert(
        'An error occured fetching savedvideos. Please try again in a few minutes.',
      );
    }
  };

  useEffect(() => {
    getSavedVideos();
  }, [route]);

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
      {savedVideos?.length > 0 && (
        <FlatList
          data={savedVideos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={<View style={{height: 120}} />}
        />
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
