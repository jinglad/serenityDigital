import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import VideoPlayer from 'react-native-video-controls';
import YouTube from 'react-native-youtube';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useSelector} from 'react-redux';
import {VideosContext} from '../App';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

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

const VideoPlayerScreen = ({route, navigation}) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [referVideos, setReferVideos] = useState([]);
  const currentVideo = useRef();

  const {videos} = useSelector(state => state.videos);

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

  useEffect(() => {
    currentVideo.current = videos.find(
      video => video.video_oid === route.params.oid,
    );
  }, [route.params.oid]);

  useEffect(() => {
    const rest = videos.filter(video => video.video_oid !== route.params.oid);
    setReferVideos(rest);
  }, [route.params.oid]);

  // console.log(referVideos);

  return (
    <View style={styles.container}>
      {/* <VideoPlayer
        source={video}
        tapAnywhereToPause={true}
        toggleResizeModeOnFullscreen={true}
        // navigator={navigator}
      /> */}
      <YoutubePlayer height={230} videoId={route.params.oid} play />
      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.button}
          buttonStyle={{
            // backgroundColor: '#E61E05',
            // height: 60,
            width: 150,
            borderRadius: 5,
          }}
          title={'Like'}
          // onPress={() => navigation.navigate('Registration')}
        />
        <Button
          containerStyle={styles.button}
          buttonStyle={{
            backgroundColor: '#840D01',
            // height: 30,
            width: 150,
            borderRadius: 5,
          }}
          title={'Favourite'}
          // onPress={() => navigation.navigate('Login')}
        />
      </View>
      <Text
        style={{
          marginLeft: 20,
          marginTop: 10,
          fontSize: 16,
          width: '90%',
          overflow: 'hidden',
          color: 'white',
        }}>
        {currentVideo.current?.title}
      </Text>
      {referVideos?.length > 0 ? (
        <FlatList
          data={referVideos}
          renderItem={renderItem}
          keyExtractor={item => item.video_oid}
          ListFooterComponent={<View style={{height: 350}} />}
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
            No other videos available on this category now
          </Text>
        </View>
      )}
    </View>
  );
};

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#232c38',
    height: '100%',
  },
  video: {
    alignSelf: 'center',
    width: width,
    height: height / 2,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  button: {
    margin: 5,
  },
});
