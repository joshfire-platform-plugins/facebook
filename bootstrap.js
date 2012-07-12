/**
 * @fileoverview Bootstrap hook that completes the bootstrap script
 * with the code needed for Facebook Connect
 */
define([], function () {
  return function (runtime, params, callback) {
    params.content += 'Joshfire.factory.plugins.facebookconnect = ' +
      JSON.stringify({
        "options": {
          "appid": params.options.appid
        }
      }) +
      ";";

    //todo!
    if (params.deployconf.deployer=="xcodeproj") {
      runtime.readFile("phonegap-plugin-facebook-connect/www/pg-plugin-fb-connect.js",function(err, cnt_pg) {
        if (err) return callback(err);
        runtime.readFile("facebook_js_sdk.js",function(err, cnt_sdk) {
          if (err) return callback(err);

          callback(null, params["content"]+cnt_pg+cnt_sdk);
        });
      });
    } else {
      callback(null, params["content"]);
    }
  };
});