import React from "react"

export default class Userinfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playtimes: 0,
      wintimes: 0
    }
  }

  render() {
    // var username=prompt('请输入您的名字')
    var username="Starnes"
    return (

      <div id="userinfo">
        <div className="rules">
          <h1>游戏规则：</h1>

          <h2>双方轮流下子，若不慎其中三子连成任意的直线 (横、竖、斜) 则对方获胜</h2>

        </div>
        <div className="info">

          <div id="profilepic"></div>
          <div id="username">{username}</div>

          <table id="employeeTable">
            <thead>
              <th>游戏局数</th>
              <th>胜利场次</th>
            </thead>
            <tr>
              <td>{this.state.playtimes}</td>
              <td>{this.state.wintimes}</td>
            </tr>
          </table>

        </div>
        <div className="me">321</div>
      </div>

    )

  }

}