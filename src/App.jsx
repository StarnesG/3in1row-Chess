import React from "react";
import Battle from "./Battle";
import Desk from "./Desk";
import Userinfo from "./Userinfo";
import bgI from "./pic/bgi.jpg";



// 头像图片地址
const pic1 = require("./pic/1.png")
const pic2 = require("./pic/2.png")
const pic3 = require("./pic/3.png")
const pic4 = require("./pic/4.png")


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // getavator: true,
            matching: false,
            playing: 0,
            userinfo: {
                name: "Player",
                avator: [pic1, pic2, pic3, pic4],
                playtimes: 0,
                wintimes: 0,
            },
            changeAv: 0  //更改头像用的 参数

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
            changeAv: val
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



    render() {

        

        return (

            <div id="all" display={"flex"} background={bgI}>

                <Userinfo getInfo={(val) => { this.fromInfo(val) }} getUsername={(val) => { this.fromUsername(val) }} userinfo={this.state.userinfo}></Userinfo>
                <Desk getDeskFinish={(val) => { this.fromDeskFinish(val) }} getDeskWin={(val) => { this.fromDeskWin(val) }}></Desk>
                <Battle getBattle={(val) => { this.fromBattle(val) }} userinfo={this.state.userinfo} avt={this.state.changeAv}></Battle>

            </div>
        )

    }


}
