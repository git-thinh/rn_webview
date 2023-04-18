https://github.com/Savinvadim1312/TikTokClone
https://github.com/luizpaulogroup/react-native-tiktok
//////////////////////////////////////////////////////////////////////

- npx react-native@latest init rn_gist

- yarn dev
- npx react-native start
- npx react-native run-android

- adb devices
- adb connect 127.0.0.1:21503
- adb connect 0802937239009815

- adb tcpip 5555
- Unplug USB cap -> adb connect IP_WIFI:5555

- keytool -genkey -v -keystore my-app-key.keystore -alias my-app-alias -keyalg RSA -keysize 2048 -validity 10000
- cd android && ./gradlew assembleRelease

//////////////////////////////////////////////////////////////////////
# https://reactnative.dev/docs/permissionsandroid

    <uses-permission android:name="android.permission.INTERNET" />
		
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
		
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
		
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />

    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
		
//////////////////////////////////////////////////////////////////////
# SVG:
# https://github.com/software-mansion/react-native-svg/blob/main/USAGE.md
# https://github.com/git-thinh/react-native-svg-transformer

- yarn add react-native-svg
- yarn add --dev react-native-svg-transformer

# Edit "metro.config.js" to import SVG file

# yarn add react-native-vector-icons
# https://github.com/oblador/react-native-vector-icons

don't forget to run: 
-- pod update 

and add:

-- apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" 
to android/app/build.gradle

Use Icon:
		import Feather from 'react-native-vector-icons/Feather'
		import Entypo from 'react-native-vector-icons/Entypo'
		
		<Icon as={Feather} name="plus" size={size} color={color} />
		<Icon mt={3} as={Entypo} name="minus" size={size} color={color} />

		AntDesign by AntFinance (298 icons)
		Entypo by Daniel Bruce (v1.0.1 411 icons)
		EvilIcons by Alexander Madyankin & Roman Shamin (v1.10.1, 70 icons)
		Feather by Cole Bemis & Contributors (v4.28.0, 286 icons)
		FontAwesome by Dave Gandy (v4.7.0, 675 icons)
		FontAwesome 5 by Fonticons, Inc. (v5.15.3, 1598 (free) 7848 (pro) icons)
		Fontisto by Kenan Gündoğan (v3.0.4, 615 icons)
		Foundation by ZURB, Inc. (v3.0, 283 icons)
		Ionicons by Ionic (v5.0.1, 1227 icons)
		MaterialIcons by Google, Inc. (v4.0.0, 1517 icons)
		MaterialCommunityIcons by MaterialDesignIcons.com (v6.5.95, 6596 icons)
		Octicons by Github, Inc. (v16.3.1, 250 icons)
		Zocial by Sam Collins (v1.4.0, 100 icons)
		SimpleLineIcons by Sabbir & Contributors (v2.5.5, 189 icons)


//////////////////////////////////////////////////////////////////////
# NATIVE-BASE:
- yarn add native-base react-native-svg react-native-safe-area-context
//////////////////////////////////////////////////////////////////////
# STORAGE:
- yarn add @react-native-async-storage/async-storage
//////////////////////////////////////////////////////////////////////
# REALM:
- yarn add realm


//////////////////////////////////////////////////////////////////////
# NAVIGATION:
- yarn add @react-navigation/native react-native-screens react-native-safe-area-context
		
//////////////////////////////////////////////////////////////////////
# STACK:
- yarn add @react-navigation/stack react-native-gesture-handler @react-native-masked-view/masked-view
# import 'react-native-gesture-handler'; // import this at the top if using gesture handlers

//////////////////////////////////////////////////////////////////////
# TAB:
- yarn add @react-navigation/native react-native-screens react-native-safe-area-context
- yarn add @react-navigation/bottom-tabs

//////////////////////////////////////////////////////////////////////
# TAB-VIEW:
- yarn add react-native-tab-view react-native-pager-view


//////////////////////////////////////////////////////////////////////
# netinfo:
- npm i @react-native-community/netinfo

//////////////////////////////////////////////////////////////////////
# VIDEO:
npm i react-native-video

//////////////////////////////////////////////////////////////////////
# CAMERA:
npm i react-native-vision-camera

- https://www.react-native-vision-camera.com/docs/guides
- https://github.com/mrousavy/react-native-vision-camera/issues/1352
- I added kotlinVersion = "1.7.0" (under buildToolsVersion) to android/build.gradle and error disappeared.


yarn add styled-components
yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-native-fontawesome

//////////////////////////////////////////////////////////////////////
# WEBVIEW:
- yarn add react-native-webview

# Edit "MainApplication.java" to debug by Devtool:
	import android.webkit.WebView;
	
  @Override
  public void onCreate() {
    //....		
		// Debug for Webview		
		WebView.setWebContentsDebuggingEnabled(true);
  }






//////////////////////////////////////////////////////////////////////
# SWIPE-LIST:
- yarn add react-native-swipe-list-view

# https://www.npmjs.com/package/react-native-tab-view
# https://github.com/callstack/react-native-pager-view


///////////////////////////////////////////////////////
# FILE:
- yarn add react-native-document-picker react-native-fs 
- https://github.com/rnmods/react-native-document-picker

//////////////////////////////////////////////////////////////////////
# VIDEO:
- yarn add react-native-video
- yarn add react-native-create-thumbnail

# https://github.com/sanjeevyadavIT/react-native-create-thumbnail
# https://github.com/phuochau/react-native-thumbnail




//////////////////////////////////////////////////////////////////////
# NOTIFY:
- yarn add @upstash/kafka

# https://console.upstash.com/kafka/10d98444-fef8-4a77-b663-2ef89baec16a?tab=details
# https://upstash.com/blog/react-native-logs-kafka

//////////////////////////////////////////////////////////////////////
# WEB-SERVER:
- yarn add "@dr.pogodin/react-native-static-server"

# https://github.com/git-thinh/react-native-static-server--dr.pogodin--rn.0.71.4

0 = STATES.ACTIVE — Up and running.
1 = STATES.CRASHED — Crashed and inactive.
2 = STATES.INACTIVE — Yet not started, or gracefully shut down.
3 = STATES.STARTING — Starting up.
4 = STATES.STOPPING — Shutting down.


//////////////////////////////////////////////////////////////////////
# EVENTS:
- yarn add events
# https://github.com/git-thinh/events









//////////////////////////////////////////////////////////////////////

let a = [];
document.querySelectorAll('.ytd-transcript-segment-list-renderer').forEach(el=>{
    let s = (el.textContent || '').trim();
    s = s.split('\n').join(' ');
    s = s.replace(/\s\s+/g, ' ').trim();
    a.push(s);
});
a.join('^');