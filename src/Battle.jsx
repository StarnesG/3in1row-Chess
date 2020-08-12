import React from "react";
import search from "./pic/search.png";
import battle from "./pic/battle.png";
import "./css/Battle.css";


export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      battleflag: true,
      matching: true,
      pltext: "开 始 游 戏",
      word: "开始匹配"
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
      this.props.getBattle(false)
      img.src = search
      this.props.match()
    } else {
      this.setState({
        battleflag: true,
        word: "开始匹配",
        pltext: "开 始 游 戏",
      })
      this.props.getBattle(true)
      img.src = battle
    }
  }

  render() {

    return (
      <div id="battle">
     
        <ul className="play">
          <li>
            <div className="avator"><img id="avator" src={this.props.avator[this.props.opponentinfo.avatorValue]} alt="" /></div>
            <div className='userinfo'>{this.props.opponentinfo.wintimes}</div>
            <div className='userinfo'>{this.props.opponentinfo.playtimes}</div>
            <div className="userid">{this.props.opponentinfo.name}</div>
          </li>
        </ul>


        <div className="mate">
          <img id="match" src={battle} alt="" />
          <div id="pltext">{this.state.pltext}</div>
        </div>

        <ul className="play">
          <li>
            <div className="avator"><img id="avator" src={this.props.avator[this.props.userinfo.avatorValue]} alt="" /></div>
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