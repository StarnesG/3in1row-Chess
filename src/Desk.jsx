import React from "react"
import img0 from "./pic/none.jpg"
import img1 from "./pic/black.jpg"
import img2 from "./pic/white.jpg"
import iarrow from "./pic/arrow.png"
import blank from "./pic/blank.png"


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
            checkBwin: [],
            checkWwin: [],
            // imgqi:document.getElementsByClassName('qizi'),
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
        if (this.props.playing) {
            console.log("clear")
            // var that = this
            e.preventDefault();
            var ind = e.target.getAttribute('data-key');


            if (this.state.flag && a.test(imgqizi[ind].src)) {

                this.state.checkBwin.push(parseInt(ind) + 1);
                imgqizi[ind].src = img1; //图片切换
                blackarrow[0].src = blank; //箭头切换
                whitearrow[0].src = iarrow;
                this.setState({ flag: false })

            }
            else if (!this.state.flag && a.test(imgqizi[ind].src)) {

                this.state.checkWwin.push(parseInt(ind) + 1);

                imgqizi[ind].src = img2;
                blackarrow[0].src = iarrow;
                whitearrow[0].src = blank;
                this.setState({ flag: true })
            }
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
            this.reLoadDesk();
            return
        }
        if (this.checkTie(this.state.checkBwin)) {
            this.setState({
                winState: 'White Win!!'
            })
            alert('White Win!!');
            this.reLoadDesk();
            return
        }
        if (this.state.checkBwin.length === 8 && this.state.checkWwin.length === 8) {
            this.setState({
                winState: 'Draw'
            })
            alert('Draw');
            this.reLoadDesk();
            return
        }
    }


    reLoadDesk() {

        imgqizi[0].src = img0
        imgqizi[1].src = img0
        imgqizi[2].src = img0
        imgqizi[3].src = img0
        imgqizi[4].src = img0
        imgqizi[5].src = img0
        imgqizi[6].src = img0
        imgqizi[7].src = img0
        imgqizi[8].src = img0
        imgqizi[9].src = img0
        imgqizi[10].src = img0
        imgqizi[11].src = img0
        imgqizi[12].src = img0
        imgqizi[13].src = img0
        imgqizi[14].src = img0
        imgqizi[15].src = img0

        this.setState({
            flag: true,
            checkBwin: [],
            checkWwin: [],
            winState: ''
        })

        // imgqizi.forEach((b)=>{
        //     imgqizi[b].src=img0
        // })
        return
    }

    render() {

        return (

            <div id="app">

                <div id="outer">

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
                    <div>&nbsp;黑棋</div> <img className="arrow1" src={iarrow} alt="" />
                </div>
                <div className="down">
                    <img className="arrow2" src={blank} alt="" /><div>&nbsp;白棋</div>
                </div>
            </div>



        )

    }
}


