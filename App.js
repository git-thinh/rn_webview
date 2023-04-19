import React from "react";
import {
	StatusBar,
	StyleSheet,
} from 'react-native';
import { 
	NativeBaseProvider,
	Box,
	Button,
	Text,
} from "native-base";

import { WebView } from 'react-native-webview';
import GestureRecognizer, {swipeDirections} from './src/swipe-gestures.js';

const HOST = 'http://192.168.1.50'
		
export default class App extends React.Component {	
	constructor(props) {
		super(props);
		
		this.state = {
			html: `<style type="text/css">body {background-color: #000;}</style>`,
			originWhitelist: ['*'],
			sharedCookiesEnabled: true,
			
			userAgent: '',
			injectedJSBeforeLoaded: '',
			injectedJS: '',
			
			gestureName: '',
		};
	
	}	
	
	componentDidMount() {
		StatusBar.setHidden(true);
		this.loadHtml();
	}
	
	onSwipe(gestureName, gestureState) {
		const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
		this.setState({gestureName: gestureName});		
		this.webref.injectJavaScript(`if(window['__onSWIPE'])window['__onSWIPE']('${gestureName}');true;`);
	}
	onTab() {
		const gestureName = 'TAB';
		this.setState({gestureName: gestureName});		
		this.webref.injectJavaScript(`if(window['__onSWIPE'])window['__onSWIPE']('${gestureName}');true;`);
	}
		
	render(){		
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

		return (
			<NativeBaseProvider>
				<Box w="100%" h="100%" style={{}}>
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
					<GestureRecognizer
						onSwipe={(direction, state) => this.onSwipe(direction, state)}
						tab={this.onTab}
						config={config}
						style={styles.gestureRecognizer}>
						<Button style={styles.loadHtml} onPress={this.loadHtml}>R</Button>
						<Text>{this.state.gestureName}</Text>
					</GestureRecognizer>
				</Box>
			</NativeBaseProvider>
		);
	}
	
	loadHtml = () => {
		console.log('LOAD_HTML....');
		const self = this;
		const time = '?_=' + new Date().getTime().toString();
		fetch(`${HOST}/test.html`+time).then(r=>r.text()).then(html=>{
			fetch(`${HOST}/test.js`+time).then(r=>r.text()).then(js=>{
				fetch(`${HOST}/test.css`+time).then(r=>r.text()).then(css=>{
					const data = '<style type="text/css">'+css+'</style>' + 
						html + 
						'<script>'+js+'</script>';
					self.setState({html:data});
				})
			})
		})
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
  loadHtml: {
		width: 32,
  },
	gestureRecognizer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 70,
		bottom: 0,
		//backgroundColor: 'red'
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
