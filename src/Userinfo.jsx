import React from "react";
import pic1 from "./pic/1.png";
import pic2 from "./pic/2.png";
import pic3 from "./pic/3.png";
import pic4 from "./pic/4.png";
import "./css/Userinfo.css";


var style1 = { display: "block" }, style2 = { display: "none" }, style3 = { display: "none" },
  style4 = { display: "none" }, style5 = { display: "none" }, style7 = { display: "block" };


export default class Userinfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "0",
      buttonflag: true,
    }
  }

  // 切换头像
  handleChange(e) {
    let userimg = document.getElementsByClassName('profilepic')
    let i = 0
    this.setState({ value: e.target.value });
    for (i = 0; i < 4; i++) { userimg[i].style.display = "none" };
    userimg[e.target.value].style.display = "block";
    this.props.getInfo(e.target.value)
  }

  // 确定后选择头像选项隐藏
  handleSub(e) {
    let select = document.getElementById('select');
    e.preventDefault();
    select.style.display = "none";
  }

  render() {

    return (

      <div id="userinfo">
        <div className="rules">
          <h1>游戏规则：</h1>

          <h2>双方轮流下子，若不慎其中三子连成任意的直线 (横、竖、斜) 则对方获胜</h2>

        </div>
        <div className="info">

          <img className="profilepic" src={pic1} alt="avator" style={style1}></img>
          <img className="profilepic" src={pic2} alt="avator" style={style2}></img>
          <img className="profilepic" src={pic3} alt="avator" style={style3}></img>
          <img className="profilepic" src={pic4} alt="avator" style={style4}></img>
          <img className="profilepic" src={this.props.userinfo.avator[0]} alt="avator" style={style5}></img>

          <div id="username">{this.props.userinfo.name}</div>

          <table id="employeeTable">
            <thead>
              <tr>
                <th>游戏局数</th>
                <th>胜利场次</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.userinfo.playtimes}</td>
                <td>{this.props.userinfo.wintimes}</td>
              </tr>
            </tbody>
          </table>

          <div id="select" style={style7}>
            <label >
              点击选择头像
          <select value={this.state.value} onChange={this.handleChange.bind(this)}>
                <option value="0">rabit</option>
                <option value='1'>owl</option>
                <option value='2'>cat</option>
                <option value='3'>bear</option>
              </select>
              <input id="sure" type="button" value="确认" onClick={this.handleSub.bind(this)} />
            </label>
          </div>


        </div>
        <div className="me">
          <br />
          &emsp; &emsp;Creat By Starnes <br />
          &emsp; &emsp; &emsp; O(∩_∩)O  <br />
          &nbsp;Starnesg464@gmail.com
        </div>
      </div>

    )

  }

}