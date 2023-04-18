import React from "react";
import {
	StatusBar,
	StyleSheet,
} from 'react-native';
import { 
	NativeBaseProvider,
	Box,
	Button,
} from "native-base";

import { WebView } from 'react-native-webview';

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
		};
	
	}	
	
	componentDidMount() {
		const self = this;
		StatusBar.setHidden(true);
		
		fetch('http://192.168.1.50/test.html').then(r=>r.text()).then(s=>{
			self.setState({html:s});
		})
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
