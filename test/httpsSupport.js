	
	window.prtl={
		type:'https:'==window.location.protocol?'https':'http',
		prefix:'https:'==window.location.protocol?'https://':'h'+'t'+'t'+'p://',
		cUrlSelf:function(url,const_url){	
			var index_url = url.indexOf('https'),
				re_url = url,
				const_url = const_url;

            if (index_url == -1) { 
            	re_url = url = url.replace('h'+'t'+'t'+'p://',window.prtl.prefix);
            	if(typeof(const_url) == 'undefined') return re_url;
            	const_url.forEach(function(element){
            		if(!element.http||!element.https){
            			console.log('const_url参数不符合规范');
            		}
                	var reg = eval("/"+element.http+"/i");
                	if(reg.test(url)){
                		re_url = url.replace(reg,window.prtl.type=='http'?element.http:element.https);
                	}
                }) 
            }
            return re_url;
        },
        cUrlAuto:function(url){
        	var index_url = url.indexOf('https'),
				re_url = url,
				const_url;
				if(window.httpsjson&&window.httpsjson.prtldomain){
					const_url = window.httpsjson.prtldomain;
				}else{
					return;
				}
				

            if (index_url == -1) { 
            	re_url = url = url.replace('h'+'t'+'t'+'p://',window.prtl.prefix);
            	if(typeof(const_url) == 'undefined') return re_url;
            	const_url.forEach(function(element){
            		if(!element.http||!element.https){
            			console.log('const_url参数不符合规范');
            		}
                	var reg = eval("/"+element.http+"/i");
                	if(reg.test(url)){
                		re_url = url.replace(reg,window.prtl.type=='http'?element.http:element.https);
                	}
                }) 
            }
            return re_url;
        }
	}


