import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var conponent = null;
			console.log(this.props.theme)
			switch(this.props.theme){
				case "PAPER":
				conponent = <div>
						<section className='zmiti-main-title'>{this.state.title}</section>
						<div className={'zmiti-main-btn ' + (this.state.tap?'active':'')} onTouchTap={this.beginTest.bind(this)}>开始考试</div>
						<div className={'zmiti-main-form '+(this.state.showForm?'active':'')}>
							<div className='zmiti-form-title'>{window.formTitle||'请输入你的姓名和电话'}</div>
							<div className='zmiti-form-input'>
								<label>姓名 ：</label><input value={this.state.name} onChange={e=>{this.setState({name:e.target.value})}} type='text'/>
							</div>
							<div className='zmiti-form-input'>
								<label>电话 ：</label><input  onChange={e=>{this.setState({tel:e.target.value})}} type='text'/>
							</div>
							<div onTouchTap={this.submit.bind(this)} className={'zmiti-main-submit '+(this.state.submit?'active':'')}>提交</div>
						</div>
					</div>
				break;
				case "DANGJIAN":
					var mainStyle = {
						background:"#fff url(./assets/images/bg.png) no-repeat center top / cover "
					}
					conponent = <div style={mainStyle} className='zmiti-index-dangjian-theme'>
						<section className='zmiti-dangjian-C'>
							<div className='zmiti-dangjian-cover'>
								<svg width="100%" height="300px" version="1.1"
									xmlns="http://www.w3.org/2000/svg">
									<path stroke='#fff' fill='none' d="M0 120 L250 200 L500 120 " strokeWidth={3} />
									<g>
										<path strokeDasharray="10,4" d="M230 130 L230 240" stroke='#fff' />
										<path strokeDasharray="10,4" d="M270 130 L270 240" stroke='#fff' />
										<circle cx='250' cy='120' r = '50' stroke='#fff' strokeWidth='2' fill='#f66'></circle>
										<circle cx='250' cy='120' r = '20' stroke='#fff' strokeWidth='2' fill='#f66'></circle>
									</g>
									</svg>
							</div>
							<div className='zmiti-btn zmiti-begin-btn'>
								参加测试
							</div>
						</section>
					</div>
				break;
			}


		return (
			<div className='zmiti-index-main-ui'>
				{conponent}
			</div>
		);
	}


	componentDidMount() {

	}
}
export default PubCom(ZmitiIndexApp);