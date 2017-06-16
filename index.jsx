import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';

import ZmitiLoadingApp from './loading/index.jsx';
import ZmitiIndexApp from './index/index.jsx';
import ZmitiContentApp from './content/index.jsx';
import ZmitiResultApp from './result/index.jsx';

import Obserable from './components/public/obserable';
var obserable = new Obserable();

export class App extends Component {
	constructor(props) {
		super(props);


		this.state = {
			progress:'0%',
			loadingImg:[],
			showLoading:true,
			name:'',
			tel:'',
			arr : ["A",'B','C',"D","E","F","G","H","I","J"],
			score:0,
			myAnswer:[]
			
		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;

		this.zmitiMap = [
				{"name":"北京市", "log":"116.46", "lat":"39.92"},
				{"name":"上海市", "log":"121.48", "lat":"31.22"},
				{"name":"天津市", "log":"117.2", "lat":"39.13"},
				{"name":"重庆市", "log":"106.54", "lat":"29.59"},
				{"name":"石家庄", "log":"114.48", "lat":"38.03"},
				{"name":"太原市", "log":"112.53", "lat":"37.87"},
				{"name":"沈阳市", "log":"123.38", "lat":"41.8"},
				{"name":"长春市", "log":"125.35", "lat":"43.88"},
				{"name":"哈尔滨市", "log":"126.63", "lat":"45.75"},
				{"name":"杭州市", "log":"120.19", "lat":"30.26"},
				{"name":"福州市", "log":"119.3", "lat":"26.08"},
				{"name":"济南市", "log":"106.54", "lat":"29.59"},
				{"name":"郑州市", "log":"113.65", "lat":"34.76"},
				{"name":"武汉市", "log":"114.31", "lat":"30.52"},
				{"name":"长沙市", "log":"113", "lat":"28.21"},
				{"name":"广州市", "log":"113.23", "lat":"23.16"},
				{"name":"海口市", "log":"110.35", "lat":"20.02"},
				{"name":"成都市", "log":"104.06", "lat":"30.67"},
				{"name":"贵阳市", "log":"106.71", "lat":"26.57"},
				{"name":"昆明市", "log":"102.73", "lat":"25.04"},
				{"name":"南昌市", "log":"115.89", "lat":"28.68"},
				{"name":"西安市", "log":"108.95", "lat":"34.27"},
				{"name":"西宁市", "log":"101.74", "lat":"36.56"},
				{"name":"兰州市", "log":"103.73", "lat":"36.03"},
				{"name":"南宁市", "log":"106.54", "lat":"29.59"},
				{"name":"乌鲁木齐市", "log":"87.68", "lat":"43.77"},
				{"name":"呼和浩特市", "log":"111.65", "lat":"40.82"},
				{"name":"拉萨市", "log":"91.11", "lat":"29.97"},
				{"name":"银川市", "log":"106.27", "lat":"38.47"},
				{"name":"台北市", "log":"121.5", "lat":"25.14"},
				{"name":"香港", "log":"114.17", "lat":"22.27"},
				{"name":"澳门", "log":"113.33", "lat":"22.13"},
				{"name":"合肥市", "log":"117.27", "lat":"31.86"},
				{"name":"南京市", "log":"118.78", "lat":"32.04"}
			]
	}
	render() {
		
		var mainStyle={};
		if(this.state.indexBg){
			mainStyle.background = this.state.indexBg? '#fff url('+this.state.indexBg+') no-repeat center / cover' : "#fff url(./assets/images/bg.png) no-repeat center center / cover "
		}

		var data ={
			obserable,
			IScroll,
			theme:this.state.theme,
			title:this.state.title,
			duration:this.state.duration,
			totalDuration:this.state.totalDuration,
			question:this.state.question,
			myAnswer:this.state.myAnswer,
			arr:this.state.arr,
			indexBg:this.state.indexBg,
			indexPage:this.state.indexPage,
			worksid:this.state.worksid,
			needInfo:this.state.needInfo
		}


		var ZmitiCustomApp = null;
			if(this.state.custom && this.state.custom.indexOf('Zmiti')>-1 && this.state.custom.indexOf('App')>-1){
				var ZmitiCustomApp = require('./'+this.state.custom.replace(/Zmiti/ig,'').replace(/App/ig,'').toLowerCase()+'/index.jsx');
			}

		return (
			<div className='zmiti-main-ui' style={mainStyle}>
				{this.state.showLoading && <ZmitiLoadingApp myHeadImg={this.state.headimgurl} progress={this.state.progress}></ZmitiLoadingApp>}
				{!this.state.showLoading && <ZmitiIndexApp {...data}></ZmitiIndexApp>}
				{!this.state.showLoading && <ZmitiContentApp {...this.state} {...data}></ZmitiContentApp>}
				{!this.state.showLoading && <ZmitiResultApp {...data}></ZmitiResultApp>}
				{ZmitiCustomApp &&<ZmitiCustomApp {...data}></ZmitiCustomApp>}
			</div>
		);
	}

	submit(){
		this.setState({
			submit:true
		});

		setTimeout(()=>{
			this.setState({
				submit:false
			});			
		},100);
	}

	beginTest(){

		this.setState({
			tap:true
		});

		setTimeout(()=>{
			this.setState({
				tap:false,
				showForm:true,
			});

		},100);

	}


	getPos(nickname,headimgurl){
	    	var s = this;
	    	 $.ajax({
	        	url:`http://restapi.amap.com/v3/geocode/regeo?key=10df4af5d9266f83b404c007534f0001&location=${wx.posData.longitude},${wx.posData.latitude}&poitype=&radius=100&extensions=base&batch=false&roadlevel=1`+'',
				type:'get',
				error(){

				},
				 cancel:function(){
						        


			    	var idx = Math.random()*s.zmitiMap.length|0;

			    	var latitude = s.zmitiMap[idx].lat; // 纬度，浮点数，范围为90 ~ -90
			        
			        var longitude = s.zmitiMap[idx].log; // 经度，浮点数，范围为180 ~ -180。
			       
			        var accuracy = 100; // 位置精度
			    	wx.posData = {
			        	longitude,
			        	latitude,
			        	accuracy
			        };
			        if((s.nickname || s.headimgurl) && s.openid){
			        	s.getPos(s.nickname,s.headimgurl);
			        }
			    },
				success(data){
					if(data.status === '1' && data.infocode === '10000'){
						
						var addressComponent = data.regeocode.addressComponent;
						var opt = {
					   		type:'map',
					   		address:(addressComponent.city[0]||addressComponent.province)+addressComponent.district,
					   		pos:[wx.posData.longitude,wx.posData.latitude],
					   		nickname:nickname,
					   		headimgurl:headimgurl
					   	}

					   	s.setState({
					   		nickname,
					   		headimgurl,
					   		showUI:true,
					   		latitude:wx.posData.latitude,
					   		longitude:wx.posData.longitude,
					   		usercity:(addressComponent.city[0]||addressComponent.province)+addressComponent.district
					   	});
					   	$.ajax({
							url:'http://api.zmiti.com/v2/weixin/save_userview/',
							type:'post',
							data:{
								worksid:s.worksid,
								wxopenid:s.openid,
								wxname:nickname,
								usercity:opt.address,
								longitude:wx.posData.longitude,
								latitude:wx.posData.latitude
							}
						}).done((data)=>{
							if(data.getret === 0 ){
								
							}else{
								alert('save_userview getret : '+ data.getret +' msg : '+ data.getmsg)
							}
						},()=>{
							//alert('save_userview error');
						})

					   	$.ajax({
					   		url:'http://api.zmiti.com/v2/weixin/add_wxuser/',
					   		type:'post',
					   		data:{
					   			wxopenid:s.openid,
					   			worksid:s.worksid,
					   			nickname:nickname,
					   			headimgurl:headimgurl,
					   			longitude:wx.posData.longitude,
					   			latitude:wx.posData.latitude,
					   			accuracy:wx.posData.accuracy,
					   			wxappid:s.wxappid,
					   			integral:localStorage.getItem('nickname')?0:10
					   		},
					   		error(){
					   			alert('add_wxuser: 服务器返回错误');
					   		},
					   		success(data){
					   			if(data.getret === 0){
					   				
					   				
					   			}else{
					   				alert('getret  : '+ data.getret + ' msg : ' + data.getmsg+ ' .....');
					   			}
					   		}
					   	});

					   	//获取用户积分
						//
				   		$.ajax({
							url:'http://api.zmiti.com/v2/msg/send_msg/',
							data:{
								type:s.worksid,
								content:JSON.stringify(opt),
								to:opt.to||''
							},
							success(data){
								s.state.showUI = true;
								s.forceUpdate();
								//console.log(data);
							}
						})
					}
					else{
						alert('地址信息获取失败')
					}
				}						        	
	        })
    }

	wxConfig(title,desc,img,appId='wxfacf4a639d9e3bcc',worksid){
		   var durl = location.href.split('#')[0]; //window.location;
		        var code_durl = encodeURIComponent(durl);


		        var s = this;

			$.ajax({
				type:'get',
				url: "http://api.zmiti.com/weixin/jssdk.php?type=signature&durl="+code_durl+"&worksid="+worksid,
				dataType:'jsonp',
				jsonp: "callback",
			    jsonpCallback: "jsonFlickrFeed",
			    error(){
			    },
			    success(data){
			    	wx.config({
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							    appId:appId, // 必填，公众号的唯一标识
							    timestamp:'1488558145' , // 必填，生成签名的时间戳
							    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
							    signature: data.signature,// 必填，签名，见附录1
							    jsApiList: [ 'checkJsApi',
											  'onMenuShareTimeline',
											  'onMenuShareAppMessage',
											  'onMenuShareQQ',
											  'onMenuShareWeibo',
											  'hideMenuItems',
											  'showMenuItems',
											  'hideAllNonBaseMenuItem',
											  'showAllNonBaseMenuItem'
									] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});

			    	wx.ready(()=>{

			    		wx.getLocation({
						    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						    fail(){
						    	alert('location fail');
						    },
						    success: function (res) {
						        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						        var speed = res.speed; // 速度，以米/每秒计
						        var accuracy = res.accuracy; // 位置精度

						        wx.posData = {
						        	longitude,
						        	latitude,
						        	accuracy
						        };
						        if((s.nickname || s.headimgurl) && s.openid){
						        	s.getPos(s.nickname,s.headimgurl);
						        }
						       
						    }
						});

			    			 		//朋友圈
	                    wx.onMenuShareTimeline({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        desc: desc,
	                        success: function () { },
	                        cancel: function () { }
	                    });
	                    //朋友
	                    wx.onMenuShareAppMessage({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        type: "link",
	                        dataUrl: "",
	                        desc: desc,
	                        success: function () {
	                        },
	                        cancel: function () { 
	                        }
	                    });
	                    //qq
	                    wx.onMenuShareQQ({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        desc: desc,
	                        success: function () { },
	                        cancel: function () { }
	                    });
			    	});
			    }
			});
		
	}
 
	 

	componentDidMount() {

		 
		
		var s = this;
		$.getJSON('./assets/js/data.json',(data)=>{
			
			this.state.custom = data.custom;
			this.state.indexBg = data.indexBg;
			this.state.indexPage = data.indexPage;
			this.state.needInfo = data.needInfo;
			this.state.title = data.title;
			this.state.theme = data.theme;
			this.state.duration = data.duration;
			this.state.totalDuration = data.duration;
			this.state.question = data.question;
			this.state.worksid = data.worksid;
			this.worksid = data.worksid;
			this.state.wxappid = data.wxappid;
			this.state.wxappsecret = data.wxappsecret;
			this.state.custom = data.custom;
			this.state.level = data.level;
			this.state.questionType = data.questionType;
			this.state.shareDesc = data.shareDesc || '';
			this.state.shareTitle = data.shareTitle || '';
			this.state.shareImg = data.shareImg;
			this.state.showLevel = data.showLevel;
			this.state.title = data.title;
			document.title = this.state.title;
			this.state.wxConfig = this.wxConfig.bind(this);

			
			this.forceUpdate(()=>{
				obserable.trigger({
					type:'setQuestionScroll'
				});
				
			});

			obserable.on('fillAnswer',(data)=>{
				this.state.myAnswer.push(data);
				this.forceUpdate();
			});

			window.s = this;

			obserable.on('countdown',()=>{

				this.timer = setInterval(()=>{
					if(this.state.duration <=0){
						clearInterval(this.timer);
						obserable.trigger({type:'submitPaper'})
					}
					this.setState({
						duration:this.state.duration - 1
					});

				},1000);
			});

			obserable.on('clearCountdown',()=>{
				clearInterval(this.timer);
			});



			obserable.on('clearMyAnswer',(data)=>{
				this.state.myAnswer.length = 0;
				this.forceUpdate();
			});

			obserable.on('modifyShareInfo',(data)=>{
				this.setState({
					shareTitle : data.title,
					shareDesc:data.desc
				});	
			});

			this.setState({
				showLoading:true
			});

			
			if(localStorage.getItem('nickname'+s.worksid) && localStorage.getItem('headimgurl'+s.worksid)&&
				localStorage.getItem('openid'+s.worksid)){
			
				s.setState({
					headimgurl:localStorage.getItem('headimgurl'+s.worksid)
				});
				s.loading(data.loadingImg,(scale)=>{
							s.setState({
								progress:(scale*100|0)+'%'
							})
						},()=>{
						
							s.openid = localStorage.getItem('openid'+s.worksid)
							s.nickname = localStorage.getItem('nickname'+s.worksid);
							s.headimgurl = localStorage.getItem('headimgurl'+s.worksid);
							
							s.setState({
								showLoading:false,
								nickname:s.nickname,
								headimgurl:s.headimgurl,
								openid:s.openid
							});

							s.wxConfig(
								s.state.title,
								s.state.title,
								data.shareImg,
								data.appId,
								s.worksid
							);
							if (wx.posData && wx.posData.longitude) {
								s.getPos(s.nickname, s.headimgurl);
							}

						});
				return;
			}

			
			
			$.ajax({
				url:'http://api.zmiti.com/v2/weixin/getwxuserinfo/',
				data:{
					code:s.getQueryString('code'),
					wxappid:data.wxappid,
					wxappsecret:data.wxappsecret
				},
				error(e){
				},
				success(dt){
					 
					if(dt.getret === 0){
						s.setState({
							headimgurl:dt.userinfo.headimgurl
						});
						s.loading(data.loadingImg,(scale)=>{
							s.setState({
								progress:(scale*100|0)+'%'
							})
						},()=>{
							
							//s.defaultName = dt.userinfo.nickname || data.username || '智媒体';

							localStorage.setItem('nickname'+s.worksid,dt.userinfo.nickname );
							localStorage.setItem('headimgurl'+s.worksid,dt.userinfo.headimgurl);
							localStorage.setItem('openid'+s.worksid,dt.userinfo.openid);
							s.openid = dt.userinfo.openid;
							s.nickname = dt.userinfo.nickname;
							s.headimgurl = dt.userinfo.headimgurl;
							
							s.setState({
								showLoading:false,
								nickname:s.nickname,
								headimgurl:s.headimgurl,
								openid:s.openid
							});

							s.wxConfig(
								s.state.title,
								s.state.title,
								data.shareImg,
								data.appId,
								s.worksid
							);
							if (wx.posData && wx.posData.longitude) {
								s.getPos(dt.userinfo.nickname, dt.userinfo.headimgurl);
							}

						});
						
					}
					else{
						
						s.setState({
							showLoading:true
						});

						if(s.isWeiXin() ){

							/*if(localStorage.getItem('oauthurl'+s.worksid)){
								window.location.href = localStorage.getItem('oauthurl'+s.worksid);
								return;
							}*/

							$.ajax({
								url:'http://api.zmiti.com/v2/weixin/getoauthurl/',
								type:'post',
								data:{
									redirect_uri:window.location.href.replace(/code/ig,'zmiti'),
									scope:'snsapi_userinfo',
									worksid:s.worksid,
									state:new Date().getTime()+''
								},
								error(){
								},
								success(dt){
									if(dt.getret === 0){
										
										localStorage.setItem('oauthurl'+s.worksid,dt.url);
										window.location.href =  dt.url;
									}
								}
							})
						}
						else{

							s.loading(data.loadingImg,(scale)=>{
								s.setState({
									progress:(scale*100|0)+'%'
								})
							},()=>{
								s.setState({
									showLoading:false
								});

								$.ajax({
									url:'http://api.zmiti.com/v2/works/update_pvnum/',
									data:{
										worksid:s.worksid
									},
									success(data){
										if(data.getret === 0){
											console.log(data);
										}
									}
								});


								s.defaultName =  data.username || '智媒体';
							
								
								s.forceUpdate();

						});


						 
						}

					}


				}
			});


			
			
		

			
		});



		$(document).one('touchstart',()=>{
			/*this.refs['talkAudio'].pause();
			this.refs['talkAudio'].muted = true;
			this.refs['talkAudio'].play();
			setTimeout(()=>{
				this.refs['talkAudio'].muted = false;
			},500);
			if(this.refs['audio'] && this.refs['audio'].paused){
				this.refs['audio'].play();
			};*/
		})
		
	}

	loading(arr, fn, fnEnd){
        var len = arr.length;
        var count = 0;
        var i = 0;
        
        function loadimg() {
            if (i === len) {
                return;
            }
            var img = new Image();
            img.onload = img.onerror = function(){
                count++;
                if (i < len - 1) {
                    i++;
                    loadimg();
                    fn && fn(i / (len - 1), img.src);
                } else {
                    fnEnd && fnEnd(img.src);
                }
            };
            img.src = arr[i];
        }
       loadimg();
    }

	isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }

	componentWillMount() {
		var s = this;

	}

	clearRender(){
		clearInterval(this.talkTimer);
	}

	 
}

	ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));
	

