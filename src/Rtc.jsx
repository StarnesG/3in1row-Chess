import React from "react";

export default class Rtc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
      rtcConnection: null,
      rtcDataChannel: null
    }
  }

  componentDidMount() {
    var that = this
    let ws = new WebSocket('ws://localhost:9090');
    ws.onopen = function () { 
      console.log("Connected to the signaling server");
    };
    ws.onerror = function (err) { 
      console.log("Got error", err); 
    };
    ws.onmessage = function (msg) {  
      var data = JSON.parse(msg.data); 
      console.log("Got message", data);
    
      switch(data.type) {  
        //when get noticed to make an offer
        case "makeOffer":
          that.handleMakeOffer(data.dest);
          break;
        //when somebody wants to call us 
        case "offer":
            that.handleOffer(data.offer, data.source); 
            break; 
        case "answer": 
            that.handleAnswer(data.answer);
            that.props.setToBlack(); 
            break; 
        //when a remote peer sends an ice candidate to us 
        case "candidate": 
            that.handleCandidate(data.candidate); 
            break; 
        case "leave": 
            that.handleLeave(); 
            break; 
        default:
            console.log(data.msg) 
            break; 
      } 
    };
    that.setState({
      ws : ws
    })
  }

  send(msg) {
    this.state.ws.send(JSON.stringify(msg));
  }

  //when match sever notices to make an offer
  handleMakeOffer(dest) {
    let that = this
    that.props.getOp(dest);
    //********************** 
    //Starting a peer connection 
    //********************** 

    //using Google public stun server 
    var configuration = { 
      "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }] 
    }
    let rtcConnection = new RTCPeerConnection(configuration, {optional: [{RtpDataChannels: true}]})
    that.setState({
      rtcConnection : rtcConnection
    })
    
    // Setup ice handling 
    that.state.rtcConnection.onicecandidate = function (event) { 
      if (event.candidate) { 
          that.send({ 
            type: "candidate", 
            candidate: event.candidate
          }); 
      } 
    }

    //creating data channel 
    let rtcDataChannel = rtcConnection.createDataChannel("channel", {reliable:true}); 
    that.setState({
      rtcDataChannel : rtcDataChannel
    })
    that.state.rtcDataChannel.onerror = function (error) { 
      console.log("Ooops...error:", error); 
    } 

    //when we receive a message from the other peer, return it to parent component 
    that.state.rtcDataChannel.onopen = function (event) { 
      console.log('rtcDataChannel opened')
      that.props.RTCChannelOpen() 
    } 
    that.state.rtcDataChannel.onmessage = function (event) { 
      console.log('msg via rtcDataChannel: ' + event.data)
      that.props.getRTCData(JSON.parse(event.data)) 
    } 

    that.state.rtcDataChannel.onclose = function () { 
      console.log("data channel is closed"); 
      that.props.RTCChannelClose()
    }

    that.state.rtcConnection.createOffer(function (offer) { 
      that.send({ 
        type: "offer", 
        offer: offer,
        source: that.props.username,
        dest: dest 
      }); 
      that.state.rtcConnection.setLocalDescription(offer); 
    }, function (error) { 
        alert("Error when creating an offer"); 
    });
  }

  //when somebody sends us an offer 
  handleOffer(offer, source) { 
    let that = this
    that.props.getOp(source);
    if(!that.state.rtcConnection) {
      //********************** 
      //Starting a peer connection 
      //********************** 

      //using Google public stun server 
      var configuration = { 
        "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }] 
      }

      let rtcConnection = new RTCPeerConnection(configuration, {optional: [{RtpDataChannels: true}]}); 
      that.setState({
        rtcConnection : rtcConnection
      })
      // Setup ice handling 
      that.state.rtcConnection.onicecandidate = function (event) { 
        if (event.candidate) { 
            that.send({ 
              type: "candidate", 
              candidate: event.candidate
            }); 
        } 
      }

      //creating data channel 
      that.state.rtcDataChannel = rtcConnection.createDataChannel("channel", {reliable:true}); 

      that.state.rtcDataChannel.onerror = function (error) { 
        console.log("Ooops...error:", error); 
      } 

      //when we receive a message from the other peer, return it to parent 
      that.state.rtcDataChannel.onopen = function (event) { 
        console.log('rtcDataChannel opened')
        that.props.RTCChannelOpen() 
      } 

      that.state.rtcDataChannel.onmessage = function (event) {
        console.log('msg via rtcDataChannel: ' + event.data) 
        that.props.getRTCData(JSON.parse(event.data)); 
      } 

      that.state.rtcDataChannel.onclose = function () { 
        console.log("data channel is closed");
        that.props.RTCChannelClose() 
      }
    }
    that.state.rtcConnection.setRemoteDescription(new RTCSessionDescription(offer)); 
  
    //create an answer to an offer 
    that.state.rtcConnection.createAnswer(function (answer) { 
      that.state.rtcConnection.setLocalDescription(answer); 
      that.send({ 
          type: "answer", 
          answer: answer,
          source: that.props.username,
          dest: source 
      }); 
    }, function (error) { 
      alert("Error when creating an answer"); 
    });
  }

  //when we got an answer from a remote user 
  handleAnswer(answer) { 
    if(this.state.rtcConnection) {
      this.state.rtcConnection.setRemoteDescription(new RTCSessionDescription(answer)); 
    }
  }

  //when we got an ice candidate from a remote user 
  handleCandidate(candidate) { 
    if(this.state.rtcConnection) {
      this.state.rtcConnection.addIceCandidate(new RTCIceCandidate(candidate)); 
    }
  }

  handleLeave() { 
    this.props.getOp(null);
    if(this.state.rtcConnection) {
      this.state.rtcConnection.close(); 
      this.state.rtcConnection = null; 
    }
  }

  beginMatch() {
    console.log('matching...')
    let that = this
    that.send({ 
      type: "match", 
      source: that.props.username
    });
  }

  endMatch() {
    let that = this
    that.send({ 
      type: "leave",
      source: that.props.username,
      dest: that.props.opponent 
    }); 
    that.handleLeave();
  }

  sendData(data) {
    this.state.rtcDataChannel.send(data)
  }

  render() {
    return 0
  }

}