//UI 
var userNameInput = document.querySelector('#username');
var connectBtn = document.querySelector('#connectButton');
var disconnectBtn = document.querySelector('#disconnectButton');

//global variable
var username = null;
var opponent = null;

//signaling server
var ws = new WebSocket('ws://localhost:9090');
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
       handleMakeOffer(data.dest);
       break;
     //when somebody wants to call us 
     case "offer":
        handleOffer(data.offer, data.source); 
        break; 
     case "answer": 
        handleAnswer(data.answer); 
        break; 
     //when a remote peer sends an ice candidate to us 
     case "candidate": 
        handleCandidate(data.candidate); 
        break; 
     case "leave": 
        handleLeave(); 
        break; 
     default:
        console.log(data.msg) 
        break; 
  } 
};
var send = function(msg) {
  ws.send(JSON.stringify(msg));
}
//RTC connection
var rtcConnection = null;
var rtcDataChannel = null;

//click binding
connectBtn.addEventListener('click', function() {
  username = userNameInput.value;
  send({ 
    type: "match", 
    source: username
  }); 
})
//when match sever notices to make an offer
function handleMakeOffer(dest) {
  opponent = dest
  //********************** 
  //Starting a peer connection 
  //********************** 

  //using Google public stun server 
  var configuration = { 
    "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }] 
  }

  rtcConnection = new RTCPeerConnection(configuration, {optional: [{RtpDataChannels: true}]}); 

  // Setup ice handling 
  rtcConnection.onicecandidate = function (event) { 
    if (event.candidate) { 
        send({ 
          type: "candidate", 
          candidate: event.candidate
        }); 
    } 
  }

  //creating data channel 
  rtcDataChannel = rtcConnection.createDataChannel("channel", {reliable:true}); 

  rtcDataChannel.onerror = function (error) { 
    console.log("Ooops...error:", error); 
  } 

  //when we receive a message from the other peer, display it on the screen 
  rtcDataChannel.onmessage = function (event) { 
    console.log('msg via rtcDataChannel: ' + event.data)
    //updateBoardState(); 
  } 

  rtcDataChannel.onclose = function () { 
    console.log("data channel is closed"); 
  }

  rtcConnection.createOffer(function (offer) { 
    send({ 
       type: "offer", 
       offer: offer,
       source: username,
       dest: dest 
    }); 
    rtcConnection.setLocalDescription(offer); 
 }, function (error) { 
    alert("Error when creating an offer"); 
 });
}
//when somebody sends us an offer 
function handleOffer(offer, source) { 
  opponent = source; 
  if(!rtcConnection) {
    //********************** 
    //Starting a peer connection 
    //********************** 

    //using Google public stun server 
    var configuration = { 
      "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }] 
    }

    rtcConnection = new RTCPeerConnection(configuration, {optional: [{RtpDataChannels: true}]}); 

    // Setup ice handling 
    rtcConnection.onicecandidate = function (event) { 
      if (event.candidate) { 
          send({ 
            type: "candidate", 
            candidate: event.candidate
          }); 
      } 
    }

    //creating data channel 
    rtcDataChannel = rtcConnection.createDataChannel("channel", {reliable:true}); 

    rtcDataChannel.onerror = function (error) { 
      console.log("Ooops...error:", error); 
    } 

    //when we receive a message from the other peer, display it on the screen 
    rtcDataChannel.onmessage = function (event) {
      console.log('msg via rtcDataChannel: ' + event.data) 
      //updateBoardState(); 
    } 

    rtcDataChannel.onclose = function () { 
      console.log("data channel is closed"); 
    }
  }
  rtcConnection.setRemoteDescription(new RTCSessionDescription(offer)); 
 
  //create an answer to an offer 
  rtcConnection.createAnswer(function (answer) { 
     rtcConnection.setLocalDescription(answer); 
     send({ 
        type: "answer", 
        answer: answer,
        source: username,
        dest: opponent 
     }); 
  }, function (error) { 
     alert("Error when creating an answer"); 
  });
};

//when we got an answer from a remote user 
function handleAnswer(answer) { 
  rtcConnection.setRemoteDescription(new RTCSessionDescription(answer)); 
};

//when we got an ice candidate from a remote user 
function handleCandidate(candidate) { 
  rtcConnection.addIceCandidate(new RTCIceCandidate(candidate)); 
};

//hang up 
disconnectBtn.addEventListener("click", function () { 
  send({ 
     type: "leave",
     source: username,
     dest: opponent 
  }); 
  handleLeave();
}); 

function handleLeave() { 
  opponent = null; 
  rtcConnection.close(); 
  rtcConnection = null; 
};