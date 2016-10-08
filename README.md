# grunt-http-convert-https

> convert http to https

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-http-convert-https --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('http-convert-https');
```

## The "http-convert-https" task

### Overview
In your project's Gruntfile, add a section named `http-convert-https` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  converthttps: {
    options: {
        separator: ',',
        punctuation:''
      },
    config:{
      expand: true,
      src: ['test/before.js'],
      httpsJson:{
        "prtldomain":
        [
          {
            "http":"news.sina.cn",
            "https":"snews.sina.cn"
          }
        ]
      },
      httpsJsonBool:false,
      httpsSupportBool:false,
      dest:'build'
    } 
  },
});
```

### Purpose
the 'http-convert-https' is find 'http://xxx' url from the js file by you input,and put the 'http://' change to 'window.prtl.prefix',if the webprotocol is http,the 'window.prtl.prefix' is http,if the webprotocol is https,the 'window.prtl.prefix' is https.

###initConfig

#####httpsJson:
In the grunt.initConfig,the httpsJson is the domain you want to change from http to https.for example:when the webprotocol is http,and the domain is news.sina.cn,in the js file,the Regrex match the http and domain,will change it to '+window.prtl.prefix+''+(window.prtl.type=='http'?'news.sina.cn':'snews.sina.cn')+',if you only want change 'http://' you can didn't write the config.

#####httpsJsonBool:
If the bool is false,the httpsJson can't write in your js file,on the contrary,the json will write in the js file.

#####httpsSupportBool
In the httpsJson,we refer to 'window.prtl.type' ,we should define it in the js.The httpsSupport is a section js which define the 'window.prtl.type'.if the httpsSupportBool is true,this section js will write in your js,we suggest that you put it in true. 

#####window.prtl.cUrlSelf(url,httpsJson)
If the url come from AJAX,and we can't find it by Regrex,we provide the cUrlSelf(url,httpsJson),the first arguement is the prorocol and domain you want to change,
the section argument format is 
```
[ {
       "http":"mjs.sinaimg.cn",
       "https":"mjss.sinaimg.cn"
}]
```
you can add Object in the Array.if you only change the protocol,you can not pass the second argument.

#####window.prtl.cUrlAuto(url)
This method is also change the url form Ajax or other ways,this method will pass parameters from the grunt.initConfig httpsJson,so you must put the httpsJsonBool is true.if you only change the protocol you can didn't write initConfig. 

### Usage Examples


```js
grunt.initConfig({
  converthttps: {
      options: {
        separator: ',',
        punctuation:''
      },
      config:{
        expand: true,
        src: ['test/before.js'],
        httpsJson:{
          "prtldomain":
          [
            {
              "http":"news.sina.cn",
              "https":"snews.sina.cn"
            }
          ]
        },
        httpsJsonBool:false,
        httpsSupportBool:false,
        dest:'build'
      }      
    }
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
change readme    0.2.0
