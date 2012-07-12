/**
 * @fileoverview Startfile hook that injects the appropriate script
 * if deploy is not "xcodeproj"
 */
define([], function () {
  return function (runtime, params, callback) {
    var add = '<div id="fb-root"></div>';

    if (params.deployconf.deployer!="xcodeproj") {
      add+="<"+"script>(function() {"+
          "var e = document.createElement('script'); e.async = true;"+
          "e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';"+
          "document.getElementById('fb-root').appendChild(e);"+
          "}());</"+"script>";
    }
    params.content = runtime.bodyAppend(params.content, add);

    callback(null, params.content);
  };
});