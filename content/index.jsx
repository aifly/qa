import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

import ZmitiClockApp from '../components/clock/index.jsx';
import ZmitiToastApp from '../components/toast/index.jsx';

class ZmitiContentApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			toast:'',
			username:'张三',
			tel:'',
			currentQid:0,
			score:100
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var component = null;
		switch(this.props.theme){
			case "PAPER":
			break;
			case "DANGJIAN":
			var mainStyle = {
					background:"#fff url(./assets/images/bg.png) no-repeat center top / cover "
				}
			component = <div className='zmiti-dangjian-content-C lt-full' style={mainStyle}>
				<section className={'zmiti-dangjian-content-user lt-full '+(this.state.hideUser?'hide':'')}  style={mainStyle}>
					<div className='zmiti-dangjian-content-cover'>
						<section className='zmiti-dangjian-content-form'>
							<div className='zmiti-dangjian-content-input'><label>姓名：</label><input value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} placeholder='请输入姓名' type='text'/></div>
							<div className='zmiti-dangjian-content-input'><label>手机号：</label><input value={this.state.tel} onChange={(e)=>{this.setState({tel:e.target.value})}} placeholder='请输入手机号' type='text'/></div>
							<div className='zmiti-dangjian-clock'><ZmitiClockApp></ZmitiClockApp></div>
							<div className='zmiti-dangjian-all-duration'>请在{this.props.duration}s内完成测试</div>
							
							<div className='zmiti-dangjian-toast'>
								{this.state.toast && <ZmitiToastApp toast={this.state.toast}></ZmitiToastApp>}
							</div>
						</section>
					</div>
					<div onTouchTap={this.beginAnswer.bind(this)} className={'zmiti-btn zmiti-begin-answer-btn '+(this.state.username.length>0 && this.state.tel.length>0?'active':'') +  (this.state.beginTap?' tap':'')  }>
						开始答题
					</div>
				</section>

				<section className={'zmiti-dangjian-question-C lt-full' +(this.state.showQList?' active':'')+(this.state.hideList?' hide':'')} style={mainStyle}>
					<header>
						<aside>
							<span>姓名：{this.state.username}</span>
						</aside>
						<aside>
							<div className='zmiti-dangjian-clock-sm'><ZmitiClockApp animate={true} size={30}></ZmitiClockApp></div>
							<div>剩余时间：<span>{this.props.duration}s</span></div>
						</aside>
					</header>
					<svg  width="100%" height="23px" version="1.1"
							xmlns="http://www.w3.org/2000/svg">
						<path strokeDasharray="10,6" d="M0 2 L640 2" stroke='#ccc' strokeWidth={3} >
						</path>
					</svg>
					<section className='zmiti-dangjian-q-scroll' ref='zmiti-dangjian-q-scroll' style={{height:this.viewH - 78}}>
						<section style={{paddingBottom:40}}>
							<div className='zmiti-dangjian-q-title'>
								<article>
									{this.props.question[this.state.currentQid].img && <img src={this.props.question[this.state.currentQid].img}/>}	
									<div>{this.props.question[this.state.currentQid].title}</div>
								</article>
								<div className='zmiti-dangjian-pager'>
									<span>{this.state.currentQid+1}</span>
									<span>{this.props.question.length}</span>
								</div>
							</div>
							<div className='zmiti-dangjian-q-answer-list'>
								{this.props.question[this.state.currentQid].answer.map((item,i)=>{
									return <div 
											onTouchTap={this.chooseMyAnswer.bind(this,i)} key={i} 
											className={'zmiti-dangjian-q-item '+(this.props.myAnswer[this.state.currentQid] === i ? 'active':'')}>
											{item.content}
										</div>
								})}
								{this.props.myAnswer.length>=this.props.question.length && <div onTouchTap={this.submitPaper.bind(this)} className={'zmiti-dangjian-submit-btn ' + (this.state.submit?'active':'')}>提交答卷</div>}
							</div>
						</section>	
					</section>
					<section className='zmiti-dangjian-result-page lt-full' style={mainStyle}>
						<div className='zmiti-dangjian-score-C'>
							<div className='zmiti-dangjian-score'>
								{this.state.score}
								<svg width="100%" height="200px" version="1.1"
							xmlns="http://www.w3.org/2000/svg">
									<circle cx={110} cy='110' r='90' fill='none' strokeDasharray="14,6" stroke='#000'></circle>
								</svg>
							</div>
							<div>{this.state.username}</div>
							<div>恭喜您！</div>
							<div>在本次测试中获得<span>{this.state.score}</span>分</div>
						</div>
						<div className='zmiti-dangjian-result-btn'>
							<span><img src='./assets/images/watch.png'/></span>
							<span>查看答案</span>
						</div>

						<div className='zmiti-dangjian-result-btn'>
							<span><img src='./assets/images/refresh.png'/></span>
							<span>再做一次</span>
						</div>

						<div className='zmiti-dangjian-result-btn'>
							<span><img src='./assets/images/share-ico.png'/></span>
							<span>分享好友</span>
						</div>
					</section>
				</section>
			</div>;
			break;
		}

		return (
			<div className={'zmiti-content-main-ui '+(this.state.showContent ? 'show':'')}>
				{component}
			</div>
		);
	}


	submitPaper(){//提交答卷
		this.setState({
			submit:true
		});

		setTimeout(()=>{
			this.setState({
				submit:false,
				hideList:true
			});			
		},200)
	}


	chooseMyAnswer(i){
		if(!this.props.myAnswer[this.state.currentQid] && this.props.myAnswer[this.state.currentQid] !== 0){
			let {obserable} = this.props;
			obserable.trigger({
				type:'fillAnswer',
				data:i
			});

			setTimeout(()=>{
				if(this.props.myAnswer.length>=this.props.question.length){
					//最后一题目了
					return;
				}
				this.setState({
					currentQid:this.state.currentQid+1
				},()=>{
					this.scroll.refresh();
				})
			},400)
		}
	}


	beginAnswer(){//

		if(this.state.username.length<=0 || this.state.tel.length<=0){
			return;
		}

		let {obserable} = this.props;
		this.setState({
			beginTap:true
		});

		setTimeout(()=>{
			this.setState({
				beginTap:false,
				hideUser:true

			});	

			obserable.trigger({
				type:'toggleQList',
				data:true
			})

		},200);
	}


	componentDidMount() {

		let {IScroll,obserable } = this.props;
		obserable.on('setQuestionScroll',()=>{
			if(this.refs['zmiti-dangjian-q-scroll']){
				this.scroll = new IScroll(this.refs['zmiti-dangjian-q-scroll'],{
					scrollbars:true
				})
				setTimeout(()=>{
					this.scroll.refresh();
				},1000)
			}
			
		});
		
		obserable.on('toggleContent',(data)=>{
			this.setState({
				showContent:data
			});
		});
		obserable.on('toggleQList',(data)=>{
			this.setState({
				showQList:data
			});
		});

	}
}
export default PubCom(ZmitiContentApp);