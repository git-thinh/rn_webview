import React from "react";
import {
  Platform,
	Animated,
	Dimensions,
	StatusBar,
	StyleSheet,
} from 'react-native';
import { 
	NativeBaseProvider,
	useColorModeValue,
	useDisclose,
	ScrollView,
	Pressable,
	Container,
	Actionsheet,
	Divider,
	Box,
	Avatar,
	AspectRatio,
	Button,
	Icon,
	Image,
	Center,
	Stack,
	VStack,
	HStack,
	Heading,
	Text,
	Path,
	View,
	Spacer,
} from "native-base";

import { WebView } from 'react-native-webview';

export default class App extends React.Component {	
	constructor(props) {
		super(props);
		
		this.state = {
			html: `
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<style type="text/css">
					body {
						padding: 0;
						margin: 0;
						background-color: #000;
						overflow: hidden;
					}
					video {		
						position: fixed;
						height: 100vh;
						z-index: 0;
					}
					#playpause {						
						position: fixed;
						z-index: 5;
						left: 0;
						top: 0;
						width: 100%;
						height: 100vh;
						right: 0;
						bottom: 0;
						color: orangered;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					#playpause.play svg{
						display: none;
					}
					#progress{
						position: fixed;
						bottom: 0;
						height: 3px;
						background-color: red;
						z-index: 1;
						left: 0;
					}
					#btn-search{
						z-index: 9;
						position: fixed;
						left: calc(100vw - 60px);
						top: 15px;					
						color: #fff;
						height: 28px;
						width: 28px;
					}
					.list-action{
						padding: 0;
						margin: 0;
						z-index: 9;
						display: flex;
						position: fixed;
						left: calc(100vw - 60px);
						top: 60px;
						height: calc(100vh - 60px);
						width: 45px;
						align-items: center;
						justify-content: center;
						flex-direction: column;
					}
					.list-action li{
						padding: 0;
						margin: 0;
						list-style: none;
						width: 45px;
						height: 45px;
						display: flex;
						justify-content: center;
						align-items: center;				
						margin-bottom: 25px;
						color: #fff;
					}
					.list-action li svg{
						width: 83%;
						height: auto;
						opacity: 0.7;
					}
				</style>
				<div id="playpause" class="play">
					<svg xmlns="http://www.w3.org/2000/svg" width="126" height="126" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
						<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
					</svg>
				</div>
				<video
					loop
					autoPlay
					playsInline
					disablePictureInPicture
					id="video"
					src="https://www.googleapis.com/drive/v3/files/1b9Guu-AZ8neB-xXxCouzbmyEnjFKq9KX?alt=media&key=AIzaSyBaFkdIAOLibT2fVlUsuhmRwRQggYx8OAM">
					<track label="English" kind="subtitles" srclang="en" src="https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt" default>
				</video>
				<div id="progress"></div>
				<ul class="list-action">
					<li>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi-action bi-person" viewBox="0 0 16 16">
						  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
						</svg>
					</li>
					<li>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi-action bi-heart" viewBox="0 0 16 16">
						  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
						</svg>
					</li>
					<li>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
						  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
						</svg>
					</li>
					<li>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
						  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
						</svg>
					</li>
					<li>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
						  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
						</svg>
					</li>
				</ul>
				<svg id="btn-search" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
				  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
				</svg>
				<script>
					var video = document.getElementById('video');
					var progress = document.getElementById('progress');
					var playpause = document.getElementById('playpause');
					
					video.addEventListener('loadedmetadata', function() {
						setTimeout(function(){
							playpause.click();
						},1500)						
					});
					
					video.addEventListener('timeupdate', function() {
						progress.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
					});
					
					playpause.addEventListener('click', function(e) {
						let css = ''
						if (video.paused || video.ended){
							css = 'play'
							video.play();
						} else {
							css = 'pause'
							video.pause();
						}
						playpause.className = css;
					});	
				</script>				
			`,
			//https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt
			//https://www.googleapis.com/drive/v3/files/1b9Guu-AZ8neB-xXxCouzbmyEnjFKq9KX?alt=media&key=AIzaSyBaFkdIAOLibT2fVlUsuhmRwRQggYx8OAM
			originWhitelist: ['*'],
			sharedCookiesEnabled: true,
			
			userAgent: '',
			injectedJSBeforeLoaded: '',
			injectedJS: '',
		};
	
	}	
	
	componentDidMount() {
	}
	
	render(){		
		return (
			<NativeBaseProvider>
				<Box w="100%" h="100%">
					<WebView
						//renderLoading={LoadingSpinner}
						
						ref={(r) => (this.webref = r)}
						source={{ html: this.state.html}}
						
						sharedCookiesEnabled={true}
						allowUniversalAccessFromFileURLs={true}
						allowFileAccessFromFileURLs={true}
						allowFileAccess={true}
						
						startInLoadingState={true}
						pullToRefreshEnabled={true}
						allowsBackForwardNavigationGestures={true}
						onContentProcessDidTerminate={() => this.webref.reload()}
						
						mediaPlaybackRequiresUserAction={false}
						allowsInlineMediaPlayback={true}
						allowsFullscreenVideo={false}
						
						onMessage={this.onWebviewMessage}
						
						style={styles.webview}
					/>
					<Button style={styles.button} onPress={this.testPress}>Test</Button>
				</Box>
			</NativeBaseProvider>
		);
	}
	
	////////////////////////////////////////////////////////////////////////////////
	testPress = () => {		
		console.log('TEST_PRESS....');
		let js = '';
		
		js = `; 
			let s = "?????????? testPress = " + window.isNativeApp;
			window.ReactNativeWebView.postMessage(s);			
			true;
		`;		
		this.webref.injectJavaScript(js);
	}
		
	onWebviewMessage = (msgEvent) => {	
		const s = msgEvent.nativeEvent.data;
		console.log(`MSG: `,s);
	}	
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		width: '100%',
		height: '100%',
  },
  webview: {
  },
	button: {
		position: 'absolute',
		fontSize: 13,
		left: 0,
		right: 0,
		bottom: 10,
		display: 'none',
	}
});
