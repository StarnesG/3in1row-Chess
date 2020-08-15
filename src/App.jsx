import React from "react";
import Battle from "./Battle";
import Desk from "./Desk";
import Rtc from "./Rtc";
import Userinfo from "./Userinfo";
import bgI from "./pic/bgi.jpg";

var haha = prompt('欢迎来到这不是三子棋，请输入您的ID')

// 头像图片地址
const pic1 = require("./pic/1.png")
const pic2 = require("./pic/2.png")
const pic3 = require("./pic/3.png")
const pic4 = require("./pic/4.png")


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.rtc = React.createRef();
        this.desk = React.createRef();
        this.state = {
            // getavator: true,
            matching: false,
            avator: [pic1, pic2, pic3, pic4],
            userinfo: {
                name: haha,
                playtimes: 0,
                wintimes: 0,
                avatorValue: 0
            },
            opponentinfo: {
                name: "Enemy",
                playtimes: 0,
                wintimes: 0,
                avatorValue: 0
            }
        }
    }


    //获取battle点击匹配传的值
    fromBattle(val) {
        this.setState({
            matching: val
        })
    }

    //获取info点击切换头像传的值
    fromInfo(val) {
        this.setState({
            userinfo : { avatorValue : val }
        })
    }

    fromUsername(val) {
        this.setState({
            userinfo: {...this.state.userinfo, name: val}
        })
       
    }

    //获取desk游戏胜利时传的值
    fromDeskFinish = (val) => {
        if (val) {
            this.setState({
                userinfo: {  ...this.state.userinfo,playtimes: this.state.userinfo.playtimes+1 }

            })
        }
    }

    fromDeskWin(val) {
        if (val) {
            this.setState({
                userinfo: {  ...this.state.userinfo,wintimes: this.state.userinfo.wintimes+1 }
            })
        }
    }

    //RTC通讯相关
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    fromOp(val) {
        if(val) {
            this.setState({
                opponentinfo: { name : val }
            })
        }
        else {
            this.setState({
                opponentinfo: {
                    name: "",
                    avator: [pic1, pic2, pic3, pic4],
                    playtimes: 0,
                    wintimes: 0, 
                }
            })
        }
    }

    fromDataChannel(val) {
        if(val) {
            if(val.type == 'desk') {
                this.desk.current.opStep(val.data)
            }
            else if(val.type == 'info') {
                console.log('val is ' + JSON.stringify(val))
                this.setState({
                    opponentinfo: {...val.data}
                })
            }
            else {

            }  
        }
    }

    beginMatch() {
        let that = this;
        that.rtc.current.beginMatch();
    }

    endMatch() {
        let that = this;
        that.rtc.current.endMatch();
    }

    sendData(data) {
        let that = this;
        that.rtc.current.sendData(JSON.stringify(data))
    }

    RTCOpen() {
        let that = this;
        that.sendData({
            type : 'info',
            data : that.state.userinfo
        })
    }

    step(val) {
        let that = this;
        that.sendData({
            type : 'desk',
            data : val
        })
    }
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <div id="all" display={"flex"} background={bgI}>
                <Userinfo getInfo={(val) => { this.fromInfo(val) }} userinfo={this.state.userinfo} avator={this.state.avator}></Userinfo>
                <Desk ref={this.desk} getDeskFinish={(val) => { this.fromDeskFinish(val) }} getDeskWin={(val) => { this.fromDeskWin(val) }}
                getStep={(val) => this.step(val)}>
                </Desk>
                <Battle getBattle={(val) => { this.fromBattle(val) }} userinfo={this.state.userinfo} opponentinfo={this.state.opponentinfo} 
                avator={this.state.avator} match={() => {this.beginMatch()}}></Battle>
                <Rtc ref={this.rtc} getOp={(val) => {this.fromOp(val)}} getRTCData={(val) => {this.fromDataChannel(val)}} 
                username={this.state.userinfo.name} opponent={this.state.opponentinfo.name} RTCChannelOpen={() => this.RTCOpen()} 
                RTCChannelClose={() => this.RTCClose()} setToBlack={() => {this.desk.current.setState({ flag : false, waitOp : false })}}>
                </Rtc>
            </div>
        )

    }


}
