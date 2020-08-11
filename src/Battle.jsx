import React from "react";
import search from "./pic/search.png";
import battle from "./pic/battle.png";
// import pic1 from "./pic/1.png";
// import pic2 from "./pic/2.png";
// import pic3 from "./pic/3.png";
// import pic4 from "./pic/4.png";
import "./css/Battle.css";


export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      battleflag: true,
      matching: true,
      pltext: "开 始 游 戏",
      word: "开始匹配",
      here: "123"
    }
  }


  maChing() {
    let img = document.getElementById('match')

    if (this.state.battleflag) {

      this.setState({
        battleflag: false,
        word: "游 戏 中",
        pltext: "正在寻找对手. . .",
      })
      this.props.getBattle(true)
      img.src = search

    } else {
      this.setState({
        battleflag: true,
        word: "开始匹配",
        pltext: "开 始 游 戏",
      })
      this.props.getBattle(false)
      img.src = battle
    }
  }

  render() {

    return (
      <div id="battle">
     
        <ul className="play">
          <li>
            <div className="avator"><img id="avator" src={this.props.userinfo.avator[this.props.avt]} alt="" /></div>
            <div className='userinfo'>{this.props.userinfo.wintimes}</div>
            <div className='userinfo'>{this.props.userinfo.playtimes}</div>
            <div className="userid">{this.props.userinfo.name}</div>
          </li>
        </ul>


        <div className="mate">
          <img id="match" src={battle} alt="" />
          <div id="pltext">{this.state.pltext}</div>
        </div>

        <ul className="play">
          <li>
            <div className="avator"><img id="avator" src={this.props.userinfo.avator[this.props.avt]} alt="" /></div>
            <div className='userinfo'>我方{this.props.userinfo.wintimes}</div>
            <div className='userinfo'>{this.props.userinfo.playtimes}</div>
            <div className="userid">{this.props.userinfo.name}</div>
          </li>
        </ul>

        <button id="button" onClick={(e) => { this.maChing(e) }}>{this.state.word}</button>
      </div >
    )

  }

}