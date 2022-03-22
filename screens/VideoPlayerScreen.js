import React, {useState, useRef} from 'react';
import {StyleSheet, View, Platform, Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import YouTube from 'react-native-youtube';
import YoutubePlayer from "react-native-youtube-iframe";

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const VideoPlayerScreen = () => {
  const video = require('../assets/videos/sample.mp4');

  return (
    <>
      {/* <VideoPlayer
        source={video}
        tapAnywhereToPause={true}
        toggleResizeModeOnFullscreen={true}
        // navigator={navigator}
      /> */}
      <YoutubePlayer
        height={300}
        videoId={"iee2TATGMyI"}
      />
    </>
  );
};

export default VideoPlayerScreen;

const styles = StyleSheet.create({});
