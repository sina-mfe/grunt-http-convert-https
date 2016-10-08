/*
 * http-convert-https
 * https://github.com/sina-mfe/grunt-http-convert-https
 *
 * Copyright (c) 2016 sina-mfe
 * Licensed under the MIT license.
 */



module.exports = function(grunt) {
  'use strict';
  var CONST_prtlprefix="window.prtl.prefix"; 
  grunt.registerMultiTask('http-convert-https', 'convert http to https', function() {
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });
    this.files.forEach(function(f) {
      
      var httpsSupport = '',httpsJson = f.httpsJson,httpsJsonStr = '';
      if(f.httpsSupportBool){  
        // get httpsSupport and put it into files;      
        httpsSupport = "\t\r\n\twindow.prtl={\r\n\t\ttype:'https:'==window.location.protocol?'https':'http',\r\n\t\tprefix:'https:'==window.location.protocol?'https://':'h'+'t'+'t'+'p://',\r\n\t\tcUrlSelf:function(url,const_url){\t\r\n\t\t\tvar index_url = url.indexOf('https'),\r\n\t\t\t\tre_url = url,\r\n\t\t\t\tconst_url = const_url;\r\n\r\n            if (index_url == -1) { \r\n            \tre_url = url = url.replace('h'+'t'+'t'+'p://',window.prtl.prefix);\r\n            \tif(typeof(const_url) == 'undefined') return re_url;\r\n            \tconst_url.forEach(function(element){\r\n            \t\tif(!element.http||!element.https){\r\n            \t\t\tconsole.log('const_url参数不符合规范');\r\n            \t\t}\r\n                \tvar reg = eval('/'+element.http+'/i');\r\n                \tif(reg.test(url)){\r\n                \t\tre_url = url.replace(reg,window.prtl.type=='http'?element.http:element.https);\r\n                \t}\r\n                }) \r\n            }\r\n            return re_url;\r\n        },\r\n        cUrlAuto:function(url){\r\n        \tvar index_url = url.indexOf('https'),\r\n\t\t\t\tre_url = url,\r\n\t\t\t\tconst_url;\r\n\t\t\t\tif(window.httpsjson&&window.httpsjson.prtldomain){\r\n\t\t\t\t\tconst_url = window.httpsjson.prtldomain;\r\n\t\t\t\t}else{\r\n\t\t\t\t\treturn;\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\r\n            if (index_url == -1) { \r\n            \tre_url = url = url.replace('h'+'t'+'t'+'p://',window.prtl.prefix);\r\n            \tif(typeof(const_url) == 'undefined') return re_url;\r\n            \tconst_url.forEach(function(element){\r\n            \t\tif(!element.http||!element.https){\r\n            \t\t\tconsole.log('const_url参数不符合规范');\r\n            \t\t}\r\n                \tvar reg = eval('/'+element.http+'/i');\r\n                \tif(reg.test(url)){\r\n                \t\tre_url = url.replace(reg,window.prtl.type=='http'?element.http:element.https);\r\n                \t}\r\n                }) \r\n            }\r";
      }
      if(f.httpsJsonBool){
        //get httpsJsonStr and put it into files;
        httpsJsonstr = "window.httpsjson="+JSON.stringify(httpsJson);
      }
      //get js
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      var domainlist = httpsJson.prtldomain;
      src += options.punctuation;
      src = dealHttp(src,domainlist);

      grunt.file.write(f.dest, httpsSupport+httpsJsonStr+src);

      grunt.log.writeln('File "' + f.dest + '" created.');
    });

    function dealHttp(fileString,domainlist){
      var result;
      var regstr = /["'](\w+):\/\/([^/:]+)(:\d*)?([^# ][^\\\r\n]*)/g;//该正则只适配url地址
      var isdeal = false;
      var content;
      content=fileString.replace(regstr,function(a,b){
          //获取http的前面的引号类型。
          var refIcon = ['"',"'"];
          var patref = refIcon.indexOf(a[0]);
          if(patref!=-1){
              //处理http和https
              if(a.indexOf("http://")>=0){
                  isdeal=true;
              }
              a = a.replace("http://",refIcon[patref]+"+"+CONST_prtlprefix+"+"+refIcon[patref]);
              domainlist.forEach(function(element) {
                  if(a.indexOf("'"+element.http+"'")==-1&&a.indexOf(element.http)>=0){
                      isdeal=true;
                      a=a.replace(element.http,function(a,b){
                          return refIcon[patref]+"+(window.prtl.type=='http'?'"+element.http+"':'"+element.https+"')+"+refIcon[patref]
                      })
                  }
                  if(a.indexOf("'"+element.https+"'")==-1&&a.indexOf(element.https)>=0){
                      isdeal=true;
                      a=a.replace(element.https,function(a,b){
                          return refIcon[patref]+"+(window.prtl.type=='http'?'"+element.http+"':'"+element.https+"')+"+refIcon[patref]
                      })
                  }
              }, this);
              return a;
              //处理domain
          }
          else{
              //解析错误
          }
          
          return a;
      });

        return content;
    }
   
  });
};