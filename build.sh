#build JS file
cd phonegap-plugin-facebook-connect/lib/facebook-js-sdk && php all.js.php > ../../../facebook_js_sdk.js && cd ../../../ && patch < phonegap-plugin-facebook-connect/lib/facebook-js-patch 

#copy proper FBConnect dir
rm -rf FBConnect-ios
mkdir FBConnect-ios
cp -r phonegap-plugin-facebook-connect/lib/facebook-ios-sdk/src/ FBConnect-ios/