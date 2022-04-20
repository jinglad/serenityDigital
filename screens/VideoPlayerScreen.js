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
import {setUser} from '../redux/actions';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

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
  const [render, setRender] = useState(false);
  const [currentLoader, setCurrentLoader] = useState(false);
  const [isRecentNull, setIsRecentNull] = useState(true);
  const [recentVideos, setRecentVideos] = useState(null);
  const [currentRecent, setCurrentRecent] = useState(null);
  const [recent, setRecent] = useState(1);
  const [recentLoad, setRecentLoad] = useState(true);

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

  // const getCurrentVideo = async (id, access_token) => {
  //   setCurrentLoader(true);
  //   const response = await fetch(`${BASE_URL}/api/category/v1/video/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: 'Token ' + access_token,
  //     },
  //   });
  //   const res = await response.json();
  //   setCurrentLoader(false);
  //   if (response.status === 200) {
  //     setCurrentVideo(res);
  //     // console.log(res);
  //     setUserLiked(
  //       res?.videolikes?.likeusers?.find(userId => userId === user?.id),
  //     );
  //   } else {
  //     alert(
  //       'An error occured fetching Video. Please try again in a few minutes.',
  //     );
  //   }
  // };

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
      const newCurentSaved = currentUserSavedVideos?.video?.find(
        vid => vid === currentVideo?.id,
      );
      setCurrentSaved(newCurentSaved);
    } else {
      alert(
        'An error occured fetching savedvideos. Please try again in a few minutes.',
      );
    }
  };

  const getRecentVideos = async () => {
    // setRecentLoad(true);
    const response = await fetch(`${BASE_URL}/api/category/v1/recent/videos/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + access_token,
      },
    });
    const res = await response.json();
    if (response.status === 200) {
      // console.log(res);
      if (user?.recentshownvideos !== null) {
        // console.log(currentVideo);
        // setIsRecentNull(false);
        const currentUserRecentVideos = res?.find(
          video => video?.user === user?.id,
        );
        if (currentUserRecentVideos && currentVideo) {
          const videoExist = currentUserRecentVideos?.video?.find(
            vid => vid === currentVideo?.id,
          );
          // console.log(videoExist);
          if (!videoExist) {
            currentUserRecentVideos?.video?.push(currentVideo?.id);
            updateRecentVideos(
              currentUserRecentVideos?.id,
              recentVideos?.video,
            );
          }
        }
      } else if (user?.recentshownvideos === null) {
        createRecent();
      }
      // handleRecentVideos(isNull, currentUserRecentVideos);
      const currentUserRecentVideos = res?.find(
        video => video?.user === user?.id,
      );
      // console.log(currentUserSavedVideos);
      setRecentVideos(currentUserRecentVideos);
      const newCurentRecent = currentUserRecentVideos?.video?.find(
        vid => vid === currentVideo?.id,
      );
      setCurrentRecent(newCurentRecent);
      // setRecentLoad(false);
    } else {
      alert(
        'An error occured fetching savedvideos. Please try again in a few minutes.',
      );
    }
  };

  // handle Recent Videos

  const createRecent = async () => {
    const response = await fetch(`${BASE_URL}/api/category/v1/recent/videos/`, {
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
    if (response.ok) {
      setRecent(prev => prev + 1);
    }
  };

  // console.log(currentVideo?.id);

  const updateRecentVideos = async (id, video) => {
    // console.log('updated', video);
    const response = await fetch(
      `${BASE_URL}/api/category/v1/recent/videos/${id}/`,
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
    // console.log(res);
    if (response.ok) {
      // console.log('updated ', res);
      setRecent(prev => prev + 1);
    }
  };

  useEffect(() => {
    const userInfo = async () => {
      const response = await fetch(
        `${BASE_URL}/api/accounts/v1/userlist/${user?.id}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: `Token ${access_token}`,
          },
        },
      );
      const res = await response.json();
      if (response.status === 200) {
        // console.log("user ", res);
        dispatch(setUser(res));
      } else {
        alert(
          'An error occured during fetching data. Please try again in a few minutes.',
        );
      }
    };

    userInfo();
  }, [saved, recent]);

  useEffect(() => {
    setCurrentVideo(videos?.find(vid => vid.id === route.params.id));
    const current = videos?.find(vid => vid.id === route.params.id);
    setUserLiked(
      current?.videolikes?.likeusers?.find(userId => userId === user?.id),
    );
  }, [route.params.id]);

  useEffect(() => {
    getSavedVideos();
    // console.log('working')
    let time = setTimeout(() => {
      setRender(true);
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [route.params.id, saved, render]);

  useEffect(() => {
    getRecentVideos();
  }, [route.params.id, recent, currentVideo]);

  useEffect(() => {
    const rest = videos.filter(video => video.id !== route.params.id);
    setReferVideos(rest);

    return () => {
      setReferVideos(null);
    };
  }, [route.params.id]);

  const postLike = async () => {
    // console.log('working on creating')
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
    if (response.ok) {
      setLiked(prev => prev + 1);
      // console.log('post like ', res);
      let updatedVideo = {...currentVideo};
      // console.log(updatedVideo.videolikes);
      updatedVideo.videolikes = res;
      setCurrentVideo(updatedVideo);
      setUserLiked(user?.id);
    } else {
      // console.log(res);
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
    // console.log('updated like ', res);
    // console.log('user', user)
    if (response.ok) {
      setLiked(prev => prev + 1);
      let updatedVideo = {...currentVideo};
      // console.log(updatedVideo.videolikes);
      updatedVideo.videolikes = res;
      setCurrentVideo(updatedVideo);
    }

    if (!response.ok) {
      alert(
        'Sorry, Could not perform the action. Please try again in a few minutes.',
      );
    }
  };

  // console.log(currentVideo);

  // console.log(savedVideos);

  const handleLike = () => {
    if (!currentVideo?.videolikes) {
      // console.log('created');
      postLike();
    } else {
      const userExist = currentVideo?.videolikes?.likeusers?.find(
        userId => userId === user?.id,
      );
      if (!userExist) {
        // console.log('updated');
        setUserLiked(currentVideo?.videolikes?.likeusers.push(user?.id));
        updateLike(
          currentVideo?.videolikes?.likeusers,
          currentVideo?.videolikes?.id,
        );
      } else {
        // console.log('delete');
        const newLikeUsers = currentVideo?.videolikes?.likeusers?.filter(
          userId => userId !== user?.id,
        );
        setUserLiked(null);
        updateLike(newLikeUsers, currentVideo?.videolikes?.id);
      }
    }
  };

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
    // console.log(res);
    if (response.ok) {
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
    if (response.ok) {
      // console.log("updated ", res);
      setSaved(prev => prev + 1);
    } else {
      // console.log(res);
      alert(
        'Sorry, Could not perform the action. Please try again in a few minutes.',
      );
    }
  };

  const handleFavourite = () => {
    if (!user?.savevideos) {
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

  // console.log("currentVideo", currentVideo);

  return (
    <View style={styles.container}>
      {/* <VideoPlayer
        source={video}
        tapAnywhereToPause={true}
        toggleResizeModeOnFullscreen={true}
        // navigator={navigator}
      /> */}
      {!currentVideo ? (
        <Text style={{color: 'white', marginTop: 20, textAlign: 'center'}}>
          Loading...
        </Text>
      ) : (
        <>
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
              title={currentSaved ? 'Saved' : 'Save'}
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
        </>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
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
