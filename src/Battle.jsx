import React from "react"
import search from "./pic/search.png"
import battle from "./pic/battle.png"


export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matching: true
    }
  }




  maChing = (data) => {
    let img = document.getElementById('match')
    let word = document.getElementById('button')
    img.src = search
    word.innerHTML = "游 戏 中"
    this.props.content(data)
  }

  render() {

    return (
      <div id="battle">
        <div className="play">123</div>
        <div className="mate"><img id="match" src={battle} alt="" /></div>
        <div className="play">321</div>
        <button id="button" onClick={this.maChing.bind(this,this.state.matching)}>匹配对手</button>
      </div >
    )

  }

}