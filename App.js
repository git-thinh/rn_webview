const HOST = 'http://192.168.1.50'
//const HOST = 'http://192.168.1.50:5050'
//const HOST = 'https://doc.iot.vn/api/curl?url=https://rn_webview_html.thinhifis3199.workers.dev'

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

import DocumentPicker, {
	types
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';

import { WebView } from 'react-native-webview';
import GestureRecognizer, {swipeDirections} from './src/SwipeGestures.js';

import {EventEmitter} from 'events';
import myEmitter from './src/EventEmitter.js';
		
export default class App extends React.Component {	
	constructor(props) {
		super(props);
		
		this.state = {			
			html: `<style type="text/css">body {background-color: #000;}</style>`,
			originWhitelist: ['*'],
			sharedCookiesEnabled: true,
			
			userAgent: '',
			injectedJSBeforeLoaded: `window.__isMobiApp=true;window.__host='${HOST}';true;`,
			injectedJS: '',
			
			eventName: '',
		};	
	}	
		
	onTab(){
		const eventName = 'TAB';		
		this.setState({eventName: eventName});
		this.webref.injectJavaScript(`if(window['__onEVENT'])window['__onEVENT']('${eventName}');true;`);		
	}
	
	loadHtml = (callback) => {
		const self = this;
		const time = '?_=' + new Date().getTime().toString();
		fetch(`${HOST}/index.html`+time).then(r1=>r1.text()).then(html=>{
			fetch(`${HOST}/app.js`+time).then(r2=>r2.text()).then(js=>{
				const data = html + '<script>'+js+'</script>';
				self.setState({html:data});
				if(callback) callback();
			})
		}).catch(error => {
      console.error('????????????????? = ',error); // catching the error and handling it the way you see fit.
    });
	}
	
	componentDidMount() {
		const self = this;
		StatusBar.setHidden(true);
				
		this.loadHtml(()=>{
			//const countEmitter = EventEmitter.listenerCount(myEmitter, 'TAB');
			myEmitter.on('TAB', ()=>self.onTab());
		});
	}
		
	onSwipe(eventName, gestureState) {
		const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
		this.setState({eventName: eventName});		
		this.webref.injectJavaScript(`if(window['__onEVENT'])window['__onEVENT']('${eventName}');true;`);
	}
	
	onWebviewMessage = (msgEvent) => {	
		const s = msgEvent.nativeEvent.data;
		console.log(`JS: message = `,s);
		switch(s){
			case 'FILE_BROWSER':
				this.fileBrowser((a)=>{				
					if (a && a.length > 0) {
						console.log('FILES = ',a);
						const files = a.map(r=>r.uri).join('^');
						this.webref.injectJavaScript(`if(window['__onEVENT'])window['__onEVENT']('FILE_BROWSER','${files}');true;`);
					}
				});
			break;
		}
	}	
	
	////////////////////////////////////////////////////////////////////////////////
	
	fileBrowser(callback) {
		DocumentPicker.pick({
			allowMultiSelection: true,
			type: [types.allFiles],
			//type: [types.audio, types.video],
		}).then((a) => {
			callback(a);
		}).catch((err) => {
			// Handling Exception
			if (DocumentPicker.isCancel(err)) {
				// If user canceled the document selection
				console.log('ERROR: Canceled');
				callback([]);
			} else {
				// For Unknown Error
				console.log('ERROR: Unknown Error = ' + JSON.stringify(err));
				//throw err;
				callback(null);
			}
		})
	};
	
	////////////////////////////////////////////////////////////////////////////////
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
						source={{ 
							html: this.state.html,
							baseUrl: 'http://localhost'
						}}
						
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
						//injectedJavaScript={this.state.injectedJS}
						injectedJavaScriptBeforeContentLoaded={this.state.injectedJSBeforeLoaded}
						
						style={styles.webview}
					/>
					<Button style={styles.button} onPress={this.testPress}>Test</Button>
					<GestureRecognizer
						onSwipe={(direction, state) => this.onSwipe(direction, state)}
						tab={this.onTab}
						config={config}
						style={styles.gestureRecognizer}>
						<Button style={styles.loadHtml} onPress={()=>this.loadHtml(null)}>R</Button>
						<Text>{this.state.eventName}</Text>
					</GestureRecognizer>
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
