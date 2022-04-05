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
import {Button} from 'react-native-elements';
import VideoPlayer from 'react-native-video-controls';
import YouTube from 'react-native-youtube';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useDispatch, useSelector} from 'react-redux';
import {BASE_URL} from '@env';
import {getUserInfo} from '../data/getUserInfo';
import { setUser } from '../redux/actions';

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
  const [currentVideo, setCurrentVideo] = useState(null);
  const [userLiked, setUserLiked] = useState(null);
  const [liked, setLiked] = useState(1);
  const [savedVideos, setSavedVideos] = useState(null);
  const [isSavedNull, setIsSavedNull] = useState(true);
  const [saved, setSaved] = useState(1);
  const [currentSaved, setCurrentSaved] = useState(null);

  const dispatch = useDispatch();

  const {videos, access_token, user} = useSelector(state => state.videos);

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

  const getCurrentVideo = async (id, access_token) => {
    const response = await fetch(`${BASE_URL}/api/category/v1/video/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + access_token,
      },
    });
    const res = await response.json();
    if (response.status === 200) {
      setCurrentVideo(res);
      // console.log(res);
      setUserLiked(
        res?.videolikes?.likeusers?.find(userId => userId === user?.id),
      );
    } else {
      alert(
        'An error occured fetching Video. Please try again in a few minutes.',
      );
    }
  };

  const getSavedVideos = async () => {
    const response = await fetch(`${BASE_URL}/api/category/v1/save/videos/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + access_token,
      },
    });
    const res = await response.json();
    if (response.status === 200) {
      // console.log(res);
      if (res?.length > 0) setIsSavedNull(false);
      const currentUserSavedVideos = res?.find(
        video => video?.user === user?.id,
      );
      // console.log(currentUserSavedVideos);
      setSavedVideos(currentUserSavedVideos);
      setCurrentSaved(
        currentUserSavedVideos?.video?.find(vid => vid === currentVideo?.id),
      );
    } else {
      alert(
        'An error occured fetching savedvideos. Please try again in a few minutes.',
      );
    }
  };

  useEffect(() => {
    const userInfo = async () => {
      const response = await fetch(`${BASE_URL}/api/accounts/v1/userlist/${user?.id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${access_token}`,
        },
      });
      const res = await response.json();
      if (response.status === 200) {
        console.log(res);
        dispatch(setUser(res));
      } else {
        alert(
          'An error occured during fetching data. Please try again in a few minutes.',
        );
      }
    }

    userInfo();
  }, [saved]);

  useEffect(() => {
    getSavedVideos();
  }, [route.params.id, saved]);

  useEffect(() => {
    getCurrentVideo(route.params.id, access_token);
  }, [route.params.id, liked]);

  useEffect(() => {
    const rest = videos.filter(video => video.id !== route.params.id);
    setReferVideos(rest);

    return () => {
      setReferVideos(null);
    };
  }, [route.params.id]);

  const postLike = async () => {
    const response = await fetch(`${BASE_URL}/api/category/v1/like/videos/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + access_token,
      },
      body: JSON.stringify({
        likevideo: currentVideo?.id,
        likeusers: [user?.id],
      }),
    });
    const res = await response.json();
    if (response.status === 200) {
      setLiked(prev => prev + 1);
    }
    if (!response.ok) {
      alert(
        'Sorry, Could not perform the action. Please try again in a few minutes.',
      );
    }
  };

  // console.log("user", user);

  const updateLike = async (likeusers, id) => {
    const response = await fetch(
      `${BASE_URL}/api/category/v1/like/videos/${id}/`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Token ' + access_token,
        },
        body: JSON.stringify({
          likevideo: currentVideo?.id,
          likeusers,
        }),
      },
    );

    const res = await response.json();

    if (response.status === 200) {
      setLiked(prev => prev + 1);
    }

    if (!response.ok) {
      alert(
        'Sorry, Could not perform the action. Please try again in a few minutes.',
      );
    }
  };

  // console.log(savedVideos);

  const handleLike = () => {
    if (!currentVideo?.videolikes) {
      postLike();
    } else {
      const userExist = currentVideo?.videolikes?.likeusers?.find(
        userId => userId === user?.id,
      );
      if (!userExist) {
        currentVideo?.videolikes?.likeusers.push(user?.id);
        updateLike(
          currentVideo?.videolikes?.likeusers,
          currentVideo?.videolikes?.id,
        );
      } else {
        // console.log("delete")
        const newLikeUsers = currentVideo?.videolikes?.likeusers?.filter(
          userId => userId !== user?.id,
        );
        updateLike(newLikeUsers, currentVideo?.videolikes?.id);
      }
    }
  };

  // handle favourite

  const createSavedVideos = async () => {
    const response = await fetch(`${BASE_URL}/api/category/v1/save/videos/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + access_token,
      },
      body: JSON.stringify({
        user: user?.id,
        video: [currentVideo?.id],
      }),
    });
    const res = await response.json();
    if (response.status === 200) {
      // console.log("created ", res);
      setSaved(prev => prev + 1);
    } else {
      alert(
        'Sorry, Could not perform the action. Please try again in a few minutes.',
      );
    }
  };

  const updateSavedVideos = async (id, video) => {
    const response = await fetch(
      `${BASE_URL}/api/category/v1/save/videos/${id}/`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Token ' + access_token,
        },
        body: JSON.stringify({
          user: user?.id,
          video,
        }),
      },
    );
    const res = await response.json();
    if (response.status === 200) {
      // console.log("updated ", res);
      setSaved(prev => prev + 1);
    } else {
      // console.log(res);
      alert(
        'Sorry, Could not perform the action. Please try again in a few minutes.',
      );
    }
  };

  // console.log(user?.savevideos);

  const handleFavourite = () => {
    if (isSavedNull) {
      createSavedVideos();
    } else {
      const videoExist = savedVideos?.video?.find(
        vid => vid === currentVideo?.id,
      );
      // console.log(videoExist);
      if (!videoExist) {
        savedVideos?.video?.push(currentVideo?.id);
        updateSavedVideos(savedVideos?.id, savedVideos?.video);
      } else {
        const newVideo = savedVideos?.video?.filter(
          video => video !== currentVideo?.id,
        );
        updateSavedVideos(savedVideos?.id, newVideo);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <VideoPlayer
        source={video}
        tapAnywhereToPause={true}
        toggleResizeModeOnFullscreen={true}
        // navigator={navigator}
      /> */}
      <YoutubePlayer height={230} videoId={currentVideo?.video_oid} play />
      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.button}
          buttonStyle={{
            // backgroundColor: '#E61E05',
            // height: 60,
            width: 150,
            borderRadius: 5,
          }}
          title={userLiked ? 'Unlike' : 'Like'}
          onPress={handleLike}
        />
        <Button
          containerStyle={styles.button}
          buttonStyle={{
            backgroundColor: '#840D01',
            // height: 30,
            width: 150,
            borderRadius: 5,
          }}
          title={currentSaved ? 'Saved' : 'save'}
          onPress={handleFavourite}
        />
      </View>
      <Text
        style={{
          marginLeft: 20,
          marginTop: 10,
          marginBottom: 40,
          fontSize: 16,
          width: '90%',
          overflow: 'hidden',
          color: 'white',
        }}>
        {currentVideo?.title}
      </Text>
      {referVideos?.length > 0 ? (
        <FlatList
          data={referVideos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
