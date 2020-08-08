import React from "react"
import Battle from "./Battle"
import Desk from "./Desk"
import Userinfo from "./Userinfo"

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            matching: false,
            playing: false
        }
    }

    fromBattle(val) {
        this.setState({
            matching: val
        })
    }

    // openDesk(){
    //     setTimeout(() => {
    //         this.setState({playing:true})
    //         console.log(this.state.playing)
    //     }
    //         , 1000)
    // }


    render() {
        console.log(this.state.matching)

        // if (this.state.matching) {
        
        //     this.openDesk()
        // }
      

        return (

            <div id="all">
                <Userinfo></Userinfo>
                <Desk></Desk>
                <Battle getBattle={(val)=>{this.fromBattle(val)}}></Battle>
            </div>
        )

    }


}
