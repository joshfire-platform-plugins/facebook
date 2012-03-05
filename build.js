module.exports = {
  "xcodeproj":function(runtime,params,callback) {

    runtime.copyFileInXcodeProject("phonegap-plugin-facebook-connect/native/ios/FacebookConnectPlugin.m","Project/Plugins/FacebookConnectPlugin.m");
    runtime.copyFileInXcodeProject("phonegap-plugin-facebook-connect/native/ios/FacebookConnectPlugin.h","Project/Plugins/FacebookConnectPlugin.h");
    runtime.copyFileInXcodeProject("FBConnect-ios/","Project/Plugins/FBConnect/");
    
    //runtime.copyFileInXcodeProject("phonegap-plugin-facebook-connect/lib/facebook-ios-sdk/src/facebook-ios-sdk.xcodeproj/","Project/Plugins/FBConnect/facebook-ios-sdk.xcodeproj/");
    runtime.copyFileInXcodeProject("facebook_js_sdk.js","www/_joshfire_factory_facebook_js_sdk.js");
    
    runtime.replaceInFile("Project/Plugins/FacebookConnectPlugin.m",/REPLACE_ME/g,params["options"]["appsecret"],function(err) {



      runtime.readPlist("Project/PhoneGap.plist",function(err,data) {
        if (err) return callback(err);

        data["Plugins"]["com.phonegap.facebook.Connect"] = "FacebookConnectPlugin";

        runtime.writePlist("Project/PhoneGap.plist",data,function(err) {
          if (err) return callback(err);


          runtime.readPlist("Project/Info.plist",function(err,data) {
            if (err) return callback(err);

            data["CFBundleURLTypes"] = [{
              "CFBundleURLName":"com.facebook.phonegap.myscheme", // TODO!
              "CFBundleURLSchemes": ["fb"+params["options"]["appid"]]
            }];

            runtime.writePlist("Project/Info.plist",data,function(err) {
              if (err) return callback(err);


              runtime.modifyPbxproj([
                
                ["add_filereference",["facebook-ios-sdk.xcodeproj","pb-project","B8F9EB4E1502457700DCC14B","Project/Plugins/FBConnect/facebook-ios-sdk.xcodeproj","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "facebook-ios-sdk.xcodeproj", "B8F9EB4E1502457700DCC14B", "B8438B4414C5E33D0061526C"]], //root


                ["add_group",[ "FBConnect", "B8F9EB5B1502461600DCC14B", "Plugins/FBConnect"]],
                ["add_file_to_group_by_guid",[ "FBConnect", "B8F9EB5B1502461600DCC14B", "B8438B9214C5E33E0061526C"]], //Plugins
                
                ["add_group",[ "JSON", "B8F9EB5D1502461600DCC14B", "JSON"]],
                ["add_file_to_group_by_guid",["JSON", "B8F9EB5D1502461600DCC14B","B8F9EB5B1502461600DCC14B" ]], //FBConnect
                

                
                ["add_file_to_group_by_guid",["FBDialog.bundle", "B8F9EB5C1502461600DCC14B", "B8F9EB5B1502461600DCC14B"]], //FBConnect
                ["add_filereference",["FBDialog.bundle","plug-in","B8F9EB5C1502461600DCC14B","FBDialog.bundle","\"<group>\""]],
                ["add_buildfile",["FBDialog.bundle","B8F9EB5C1502461600DCC14B","B8F9EB741502461600DCC14B"]],
                ["add_file_to_resources_phase",["FBDialog.bundle", "B8F9EB741502461600DCC14B"]],


                ["quick_add_objc",["FBDialog.m","B8F9EB661502461600DCC14B","B8F9EB7E1502461600DCC14B", "FBDialog.m", "B8F9EB5B1502461600DCC14B", "B8438B4B14C5E33D0061526C", "Sources"]],

                ["quick_add_objc",["FBLoginDialog.m","B8F9EB641502461600DCC14B","B8F9EB7D1502461600DCC14B", "FBLoginDialog.m", "B8F9EB5B1502461600DCC14B", "B8438B4B14C5E33D0061526C", "Sources"]],
                ["quick_add_objc",["Facebook.m","B8F9EB611502461600DCC14B","B8F9EB7C1502461600DCC14B", "Facebook.m", "B8F9EB5B1502461600DCC14B", "B8438B4B14C5E33D0061526C", "Sources"]],
                ["quick_add_objc",["FBRequest.m","B8F9EB601502461600DCC14B","B8F9EB7B1502461600DCC14B", "FBRequest.m", "B8F9EB5B1502461600DCC14B", "B8438B4B14C5E33D0061526C", "Sources"]],
                ["quick_add_objc",["SBJsonWriter.m","B8F9EB731502461600DCC14B","B8F9EB7A1502461600DCC14B", "SBJsonWriter.m", "B8F9EB5D1502461600DCC14B", "B8438B4B14C5E33D0061526C", "Sources"]],
                ["quick_add_objc",["SBJsonParser.m","B8F9EB711502461600DCC14B","B8F9EB791502461600DCC14B", "SBJsonParser.m", "B8F9EB5D1502461600DCC14B", "B8438B4B14C5E33D0061526C", "Sources"]],
                ["quick_add_objc",["SBJsonBase.m","B8F9EB6F1502461600DCC14B","B8F9EB781502461600DCC14B", "SBJsonBase.m", "B8F9EB5D1502461600DCC14B", "B8438B4B14C5E33D0061526C", "Sources"]],
                ["quick_add_objc",["SBJSON.m","B8F9EB6D1502461600DCC14B","B8F9EB771502461600DCC14B", "SBJSON.m", "B8F9EB5D1502461600DCC14B", "B8438B4B14C5E33D0061526C", "Sources"]],
                ["quick_add_objc",["NSString+SBJSON.m","B8F9EB6B1502461600DCC14B","B8F9EB761502461600DCC14B", "NSString+SBJSON.m", "B8F9EB5D1502461600DCC14B", "B8438B4B14C5E33D0061526C", "Sources"]], 
                ["quick_add_objc",["NSObject+SBJSON.m","B8F9EB691502461600DCC14B","B8F9EB751502461600DCC14B", "NSObject+SBJSON.m", "B8F9EB5D1502461600DCC14B", "B8438B4B14C5E33D0061526C", "Sources"]],
              

                ["quick_add_objc",["FacebookConnectPlugin.m","B8F9EB691502461601DCC14B","B8F9EB751502461601DCC14B", "Plugins/FacebookConnectPlugin.m", "B8438B9214C5E33E0061526C", "B8438B4B14C5E33D0061526C", "Sources"]], //Plugins
                
                ["add_filereference",["FacebookConnectPlugin.h","sourcecode.c.h","B8F9EB651502461601DCC14B","Plugins/FacebookConnectPlugin.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "FacebookConnectPlugin.h", "B8F9EB651502461601DCC14B", "B8438B9214C5E33E0061526C"]], //Plugins
                 

                ["add_filereference",["FBDialog.h","sourcecode.c.h","B8F9EB651502461600DCC14B","FBDialog.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "FBDialog.h", "B8F9EB651502461600DCC14B", "B8F9EB5B1502461600DCC14B"]], //FBConnect
                
                ["add_filereference",["JSON.h","sourcecode.c.h","B8F9EB671502461600DCC14B","JSON.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "JSON.h", "B8F9EB671502461600DCC14B", "B8F9EB5D1502461600DCC14B"]], //JSON

                ["add_filereference",["FBLoginDialog.h","sourcecode.c.h","B8F9EB631502461600DCC14B","FBLoginDialog.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "FBLoginDialog.h", "B8F9EB631502461600DCC14B", "B8F9EB5B1502461600DCC14B"]], //FBConnect

                ["add_filereference",["Facebook.h","sourcecode.c.h","B8F9EB621502461600DCC14B","Facebook.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "FBRequest.h", "B8F9EB621502461600DCC14B", "B8F9EB5B1502461600DCC14B"]], //FBConnect

                ["add_filereference",["FBRequest.h","sourcecode.c.h","B8F9EB5F1502461600DCC14B","FBRequest.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "FBRequest.h", "B8F9EB5F1502461600DCC14B", "B8F9EB5B1502461600DCC14B"]], //FBConnect

                ["add_filereference",["FBConnect.h","sourcecode.c.h","B8F9EB5E1502461600DCC14B","FBConnect.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "FBConnect.h", "B8F9EB5E1502461600DCC14B", "B8F9EB5B1502461600DCC14B"]], //FBConnect

                ["add_filereference",["NSObject+SBJSON.h","sourcecode.c.h","B8F9EB681502461600DCC14B","NSObject+SBJSON.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "JSON.h", "B8F9EB681502461600DCC14B", "B8F9EB5D1502461600DCC14B"]], //JSON

                ["add_filereference",["NSString+SBJSON.h","sourcecode.c.h","B8F9EB6A1502461600DCC14B","NSString+SBJSON.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "NSString+SBJSON.h", "B8F9EB6A1502461600DCC14B", "B8F9EB5D1502461600DCC14B"]], //JSON

                ["add_filereference",["SBJSON.h","sourcecode.c.h","B8F9EB6C1502461600DCC14B","SBJSON.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "SBJSON.h", "B8F9EB6C1502461600DCC14B", "B8F9EB5D1502461600DCC14B"]], //JSON

                ["add_filereference",["SBJsonBase.h","sourcecode.c.h","B8F9EB6E1502461600DCC14B","SBJsonBase.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "SBJsonBase.h", "B8F9EB6E1502461600DCC14B", "B8F9EB5D1502461600DCC14B"]], //JSON

                ["add_filereference",["SBJsonParser.h","sourcecode.c.h","B8F9EB701502461600DCC14B","SBJsonParser.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "SBJsonParser.h", "B8F9EB701502461600DCC14B", "B8F9EB5D1502461600DCC14B"]], //JSON

                ["add_filereference",["SBJsonWriter.h","sourcecode.c.h","B8F9EB721502461600DCC14B","SBJsonWriter.h","\"<group>\""]],
                ["add_file_to_group_by_guid",[ "SBJsonWriter.h", "B8F9EB721502461600DCC14B", "B8F9EB5D1502461600DCC14B"]], //JSON

                

                ["add_target_dependency",["facebook-ios-sdk", "B8F9EB5A150245D000DCC14B","B8F9EB59150245D000DCC14B" ]],
                ["add_dependency_to_target",["B8438B5114C5E33D0061526C","B8F9EB5A150245D000DCC14B" ]],

                ["add_container_item_proxy",["facebook-ios-sdk", "B8F9EB59150245D000DCC14B","B8F9EB4E1502457700DCC14B", "D2AAC07D0554694100DB518D", "1" ]],
                ["add_container_item_proxy",["facebook-ios-sdk", "B8F9EB551502457700DCC14B","B8F9EB4E1502457700DCC14B", "D2AAC07E0554694100DB518D", "2" ]],


                ["add_group",[ "Products", "B8F9EB4F1502457700DCC14B", "Products"]],
                ["add_file_to_group_by_guid",["libfacebook_ios_sdk.a", "B8F9EB561502457700DCC14B","B8F9EB4F1502457700DCC14B" ]],    
                ["add_reference_proxy", ["libfacebook_ios_sdk.a", "B8F9EB561502457700DCC14B", "archive.ar", "libfacebook_ios_sdk.a", "B8F9EB551502457700DCC14B", "BUILT_PRODUCTS_DIR"]],


                ["add_project_reference",["facebook-ios-sdk.xcodeproj", "B8F9EB4E1502457700DCC14B", "B8F9EB4F1502457700DCC14B"]],

                ["add_build_setting", ["Debug", "HEADER_SEARCH_PATHS", "/Users/Shared/PhoneGap/Frameworks/PhoneGap.framework/Headers", "B8438B9714C5E33E0061526C"]],
                ["add_build_setting", ["Release", "HEADER_SEARCH_PATHS", "/Users/Shared/PhoneGap/Frameworks/PhoneGap.framework/Headers", "B8438B9814C5E33E0061526C"]]
                
              ],function(err) {
                callback(err);
              });
            });
          });

        });
      });

    });
    
        

  },

 "bootstrap":function(runtime, params, callback) {

  //TODO insert script tags, also to _joshfire_factory_facebook_js_sdk
    runtime.readFile("phonegap-plugin-facebook-connect/www/pg-plugin-fb-connect.js",function(err, cnt) {
      if (err) return callback(err);

      callback(null, params["content"]+cnt);
    });
  }
};