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
					
		
		let ua, js0, js1;
		
		ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36';
		
		js0 = `
			window.isNativeApp = true;
			//window.ReactNativeWebView.postMessage("Hi injectedJSBeforeLoaded")
			//setInterval(function(){window.ReactNativeWebView.postMessage(new Date().toString())},3000)			
			
			true; // note: this is required, or you'll sometimes get silent failures
		`;
		// js0 = `
		// 	window.onerror = function(message, sourcefile, lineno, colno, error) {
		// 		alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
		// 		return true;
		// 	};
		// 	true;
		// `;
		
		js1 = `
			window.ReactNativeWebView.postMessage("Hi injectedJS")
			true; // note: this is required, or you'll sometimes get silent failures
		`;
		
		this.state = {
			//url: 'https://chat.zalo.me/',
			//url: 'https://www.facebook.com/marketplace/category/propertyrentals',
			//url: 'https://ssyoutube.com/en57/youtube-video-downloader',
			//url: 'https://www.facebook.com/',
			//url: 'about:blank',
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
						height: 100%;
					}
				</style>
				<video width="320" height="240" controls autoplay loop>
					<source src="https://www.googleapis.com/drive/v3/files/1b9Guu-AZ8neB-xXxCouzbmyEnjFKq9KX?alt=media&key=AIzaSyBaFkdIAOLibT2fVlUsuhmRwRQggYx8OAM" type="video/mp4">
				</video>
				
			`,
			
			userAgent: ua,
			originWhitelist: ['*'],
			sharedCookiesEnabled: true,
			
			injectedJSBeforeLoaded: js0,
			injectedJS: js1,
		};
	
	}	
	
	onWEB_SERVER_EVENT = (url) => {
		console.log('onWEB_SERVER_EVENT = ', url)	
		this.setState({url: url});		
	}
	
	componentDidMount() {		
		//EventEmitter.on('WEB_SERVER_EVENT', this.onWEB_SERVER_EVENT);
	}
	
	render(){		
		return (
			<NativeBaseProvider>
				<Box w="100%" h="100%">
					<WebView
						ref={(r) => (this.webref = r)}
						source={{ 
							html: this.state.html
							//uri: this.state.url,
							//headers: { 'my-custom-header-key': 'my-custom-header-value',},
							//headers: { Cookie: 'cookie1=asdf; cookie2=dfasdfdas', },
						}}
						//userAgent={this.state.userAgent}
						originWhitelist={this.state.originWhitelist}
						sharedCookiesEnabled={this.state.sharedCookiesEnabled}
						
						//injectedJavaScriptBeforeContentLoadedForMainFrameOnly={true}
						//injectedJavaScriptForMainFrameOnly={true}
													
						allowingReadAccessToURL={true}
						allowFileAccessFromFileURLs={true}
						allowUniversalAccessFromFileURLs={true}
						
						allowsInlineMediaPlayback={true}
						mediaPlaybackRequiresUserAction={true}
						
						// If true, this will allow access to the file system via file:// URI's.
						allowFileAccess={true}
						
						//onNavigationStateChange={this.handleWebViewNavigationStateChange}
						//onFileDownload = {this.handleWebViewFileDownload}
						
						//onMessage={this.handleWebViewMessage}
						//injectedJavaScript={this.state.injectedJS}
						//injectedJavaScriptBeforeContentLoaded={this.state.injectedJSBeforeLoaded}
						
						//onShouldStartLoadWithRequest={this.handleWebViewShouldStartLoadWithRequest}
						
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
		//EventEmitter.emit('WEB_SERVER_EVENT', 'https://google.com.vn');
		
		let js = 'true';
		
		js = `; 
			//let s = "?????????? testPress = " + window.isNativeApp;
			//window.ReactNativeWebView.postMessage(s)
			
			
				(async function() {
					const url = 'https://youtu.be/2USh8OmgiJE';
					const r = await fetch('/api/convert', {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
							// 'Content-Type': 'application/x-www-form-urlencoded',
						},
						body: JSON.stringify({
							url: url
						})
					});
					const v = await r.json();
					console.log('????????? = ', v);
					window.ReactNativeWebView.postMessage(JSON.stringify(v));
				})();
			
			true;`
		
		//this.webref.injectJavaScript(js);
	}
	
	handleWebViewShouldStartLoadWithRequest = (request) => {			
		console.log('URL = ', request.url)
		return true;
		
		// // If we're loading the current URI, allow it to load
		// if (request.url === currentURI) return true;
		// // We're loading a new URL -- change state first
		// setURI(request.url);
		// return false;		
	}
	
	handleWebViewMessage = (msgEvent) => {	
		const s = msgEvent.nativeEvent.data;
		console.log(`MSG: `,s);
	}
	
	handleWebViewFileDownload = (nativeEvent) => {
		const { downloadUrl } = nativeEvent;
		// --> Your download code goes here <--		
	}
	
	handleWebViewNavigationStateChange = (newNavState) => {
	    // newNavState looks something like this:
	    // {
	    //   url?: string;
	    //   title?: string;
	    //   loading?: boolean;
	    //   canGoBack?: boolean;
	    //   canGoForward?: boolean;
	    // }
	    const { url } = newNavState;
	    if (!url) return;
	
	    // handle certain doctypes
	    if (url.includes('.pdf')) {
	      this.webview.stopLoading();
	      // open a modal with the PDF viewer
	    }
	
	    // one way to handle a successful form submit is via query strings
	    if (url.includes('?message=success')) {
	      this.webview.stopLoading();
	      // maybe close this view?
	    }
	
	    // one way to handle errors is via query string
	    if (url.includes('?errors=true')) {
	      this.webview.stopLoading();
	    }
	
	    // redirect somewhere else
	    if (url.includes('google.com')) {
	      const newURL = 'https://reactnative.dev/';
	      const redirectTo = 'window.location = "' + newURL + '"';
	      this.webview.injectJavaScript(redirectTo);
	    }
	  };
	
	
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		width: '100%',
		height: '100%',
  },
  webview: {
		marginBottom: 50,
  },
	button: {
		position: 'absolute',
		fontSize: 13,
		left: 0,
		right: 0,
		bottom: 10,
	}
});
