import React from "react"
import search from "./pic/search.png"
import battle from "./pic/battle.png"


export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      battleflag:true,
      matching: true,
      pltext: "正在寻找对手. . .",
      word:"开始匹配"
    }
  }


  maChing (){
    let img = document.getElementById('match')
   
    this.props.getBattle("123")
    
    if(this.state.battleflag){
      this.setState({
      battleflag:false,
      word :"游 戏 中",
      pltext: "正在寻找对手. . .",
      })
      img.src = search
    }else{
      this.setState({
        battleflag:true,
        word :"开始匹配",
        pltext: "正在寻找对手. . .",
        })
        img.src = battle
    }
  }

  render() {

    return (
      <div id="battle">
        <div className="play">123</div>
        <div className="mate">
          <img id="match" src={battle} alt="" />
          <div id="pltext">{this.state.pltext}</div>
        </div>
        <div className="play">321</div>
        <button id="button" onClick={(e)=>{this.maChing(e)}}>{this.state.word}</button>
      </div >
    )

  }

}