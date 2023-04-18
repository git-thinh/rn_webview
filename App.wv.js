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
					}
					video {
						width: 100%;
						margin: -10px 0 0 0;
					}
					#btn-play {
						background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFNDZDNDg2MEEzMjFFMjExOTBEQkQ4OEMzRUMyQjhERCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNkU0NTY5NkE0MDcxMUUyQjgwQkYzQzhCMDZBRTU1NCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNkU0NTY5NUE0MDcxMUUyQjgwQkYzQzhCMDZBRTU1NCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQzQ0QwNDBBMDJBNEUyMTFCOTZEQzYyRDgyRUVBOUZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU0NkM0ODYwQTMyMUUyMTE5MERCRDg4QzNFQzJCOEREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kBUJ9AAAAXFJREFUeNrsmLtOAkEUhneQyiAdDTExGlYMBaW9oq/ge8jlUbwkthTY2EGBLehbKK0UxsQgVK7/SWbMZo3j3mbmxPAnXyi2+fIzZ3dmRBAEHucUPO6hBhUyNXAH3umxJRZgCBo/nCKCe+DVoliUN5LUCd46lFOMwk4iPCRCiDl+Ko5X3RJOm99OEcGAyVyIrFO8lEPE9jXTBNvgRq4ba6+ZuAs5nFMwy3NQdFOcRpBSBtfgk6ugykkebZoUpGyBqyxtmhZUaYFnzoKqzcukbdoUVDkGT5wFKSVwEadNV4IqR3+16VrQkxuSVRxBVzvqKija+tQl/fafyx00u7/YBxOOU0yttcEHx9fMPphy/JJQa50krdkUrIMHjruZDdBN25ppwYOsrZkSpNZ68hDFast/Bg7Bo4nDu+7g/m/Oxc6u3+YMnBY6wTEDwXvdbmYXvDi82aKrP183xZQd0LcsSktrIC9PvV+neH1HvRZ0kC8BBgADq2RhyZa7BQAAAABJRU5ErkJggg==');
					}
					#progress{
						
					}
					#progress-bar{
						
					}
				</style>
				<div id="btn-play"/>
				<video
					loop
					autoPlay
					playsInline
					disablePictureInPicture
					id="video"
					src="https://www.googleapis.com/drive/v3/files/1b9Guu-AZ8neB-xXxCouzbmyEnjFKq9KX?alt=media&key=AIzaSyBaFkdIAOLibT2fVlUsuhmRwRQggYx8OAM"
				>
					<track label="English" kind="subtitles" srclang="en" src="https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt" default>
				</video>
				<progress id="progress" value="0" min="0">
					<span id="progress-bar"></span>
				</progress>
				<script>
					var video = document.getElementById('video');
					var progress = document.getElementById('progress');
					var progressBar = document.getElementById('progress-bar');
							
					// Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
					video.addEventListener('loadedmetadata', function() {
						progress.setAttribute('max', video.duration);
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
