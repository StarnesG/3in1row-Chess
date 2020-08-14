import React from "react";
import "./css/Desk.css";
import img0 from "./pic/none.jpg";
import img1 from "./pic/black.jpg";
import img2 from "./pic/white.jpg";
import iarrow from "./pic/arrow.png";
import blank from "./pic/blank.png";
import { useImperativeHandle } from "react";


// var img = document.getElementsByTagName("img")
var blackarrow = document.getElementsByClassName('arrow1')
var whitearrow = document.getElementsByClassName('arrow2')
var imgqizi = document.getElementsByClassName('qizi')
var a = /\/none/


export default class Desk extends React.Component {
    constructor() {
        super();
        this.state = {
            playing: false,
            flag: true,
            waitOp: true,
            checkBwin: [],
            checkWwin: [],
            endResults: {
                arr1: [1, 2, 3],
                arr2: [2, 3, 4],
                arr3: [5, 6, 7],
                arr4: [6, 7, 8],
                arr5: [9, 10, 11],
                arr6: [10, 11, 12],
                arr7: [13, 14, 15],
                arr8: [14, 15, 16],

                arr9: [1, 5, 9],
                arr10: [5, 9, 13],
                arr11: [2, 6, 10],
                arr12: [6, 10, 14],
                arr13: [3, 7, 11],
                arr14: [7, 11, 15],
                arr15: [4, 8, 12],
                arr16: [8, 12, 16],

                arr17: [1, 6, 11],
                arr18: [6, 11, 16],
                arr19: [5, 10, 15],
                arr20: [2, 7, 12],
                arr21: [3, 6, 9],
                arr22: [4, 7, 10],
                arr23: [7, 10, 13],
                arr24: [8, 11, 14]
            },
            winState: ''
        }
    }

    // 点击格子下棋
    handleClick(e) {
 
            e.preventDefault();
            if(this.state.waitOp) {
                alert('等待对手...')
                return 0
            }
            var ind = e.target.getAttribute('data-key');


            if (this.state.flag && a.test(imgqizi[ind].src)) {

                this.state.checkBwin.push(parseInt(ind) + 1);
                imgqizi[ind].src = img1; //图片切换
                blackarrow[0].src = (blackarrow[0].src == iarrow ? blank : iarrow); //箭头切换
                whitearrow[0].src = (whitearrow[0].src == iarrow ? blank : iarrow);
                this.setState({ waitOp : true })
                this.props.getStep(ind)
            }
            else if (!this.state.flag && a.test(imgqizi[ind].src)) {

                this.state.checkWwin.push(parseInt(ind) + 1);

                imgqizi[ind].src = img2;
                blackarrow[0].src = (blackarrow[0].src == iarrow ? blank : iarrow);
                whitearrow[0].src = (whitearrow[0].src == iarrow ? blank : iarrow);
                this.setState({ waitOp : true })
                this.props.getStep(ind)
            }
        // }

    }

    //收到对手数据，下对手的那一步
    opStep(ind) {
        if (!this.state.flag && a.test(imgqizi[ind].src)) {
            this.state.checkBwin.push(parseInt(ind) + 1);
            imgqizi[ind].src = img1; //图片切换
            blackarrow[0].src = (blackarrow[0].src == iarrow ? blank : iarrow); //箭头切换
            whitearrow[0].src = (whitearrow[0].src == iarrow ? blank : iarrow);
            this.setState({ waitOp : false })
        }
        else if (this.state.flag && a.test(imgqizi[ind].src)) {
            this.state.checkWwin.push(parseInt(ind) + 1);
            imgqizi[ind].src = img2;
            blackarrow[0].src = (blackarrow[0].src == iarrow ? blank : iarrow);
            whitearrow[0].src = (whitearrow[0].src == iarrow ? blank : iarrow);
            this.setState({ waitOp : false })
        }
    }


    // 检测 三连数组集 任意一个是否是另一数组的子集
    checkTie(m) {

        let oneWin = false
        Object.keys(this.state.endResults).forEach((it) => {

            let inc = this.state.endResults[it].every((t) => {
                return m.includes(t)
            })

            if (inc) {
                oneWin = true
            }
        })

        return oneWin
    }


    checkWin = () => {

        if (this.checkTie(this.state.checkWwin)) {
            this.setState({
                winState: 'Black Win!!'
            })
            alert('Black Win!!');
            this.reLoadDesk();  //重新加载棋盘
            this.props.getDeskFinish(true) //游戏场次+1
            if(this.state.flag) {
                this.props.getDeskWin(true) //胜利场次+1
            }
            return 0
        }
        if (this.checkTie(this.state.checkBwin)) {
            this.setState({
                winState: 'White Win!!'
            })
            alert('White Win!!');
            this.reLoadDesk();
            this.props.getDeskFinish(true)
            if(!(this.state.flag)) {
                this.props.getDeskWin(true) //胜利场次+1
            }
            return 0
        }
        if (this.state.checkBwin.length === 8 && this.state.checkWwin.length === 8) {
            this.setState({
                winState: 'Draw'
            })
            alert('Draw');
            this.reLoadDesk();
            this.props.getDeskFinish(true)
            return 0
        }
    }

    //重新加载棋盘
    reLoadDesk() {
        var i=0
        var that = this
        for(i=0;i<16;i++)(
            imgqizi[i].src=img0
        )

        if(this.state.flag) {
            this.setState({
                flag : false,
                waitOp : false
            })
        }
        else {
            this.setState({
                flag : true,
                waitOp : true
            })
        }
        this.setState({
            checkBwin: [],
            checkWwin: [],
            winState: ''
        })
        return
    }

    render() {

        return (

            <div id="app">

                <div id="desk">

                    <div className="box1"><img className="qizi" alt="" data-key="0" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="1" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="2" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="3" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>

                    <div className="box1"><img className="qizi" alt="" data-key="4" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="5" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="6" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="7" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>

                    <div className="box1"><img className="qizi" alt="" data-key="8" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="9" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="10" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="11" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>

                    <div className="box1"><img className="qizi" alt="" data-key="12" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="13" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="14" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>
                    <div className="box1"><img className="qizi" alt="" data-key="15" onClick={this.handleClick.bind(this)} onLoad={this.checkWin} src={img0} /></div>

                </div>

                <div className="up">
        <div>&nbsp;{(this.state.flag ? '白棋' : '黑棋')}</div> <img className="arrow1" src={(this.state.flag ? iarrow : blank)} alt="" />
                </div>
                <div className="down">
                    <img className="arrow2" src={(this.state.flag ? blank : iarrow)} alt="" /><div>&nbsp;{(this.state.flag ? '黑棋' : '白棋')}</div>
                </div>
                
            </div>



        )

    }
}


