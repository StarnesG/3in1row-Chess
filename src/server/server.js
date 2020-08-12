//require our websocket library 
var WebSocketServer = require('ws').Server;
 
//creating a websocket server at port 9090 
var wss = new WebSocketServer({port: 9090}); 

//all connected to the server users 
var users = {};

//when a user connects to our sever 
wss.on('connection', function(connection) {
  
   console.log("User connected");
	 
   //when server gets a message from a connected user 
   connection.on('message', function(message) {
	 
      var data; 
      //accepting only JSON messages 
      try { 
         data = JSON.parse(message);
         console.log('get msg: ' + message) 
      } catch (e) { 
         console.log("Invalid JSON"); 
         data = {}; 
      }
      //switching type of the user message 
      switch (data.type) { 
         case "match":
            (async function() {
               let waitQue = await Object.keys(users).filter(it => users[it].state === 'wait')
               if(waitQue.length === 0) {
                  connection.self = data.source;
                  users[data.source] = {
                     conn: connection,
                     state: 'wait'
                  }
               }
               else {
                  users[waitQue[0]].state = 'matched'
                  users[waitQue[0]].conn.op = data.source;
                  connection.op = waitQue[0];
                  connection.self = data.source;
                  users[data.source] = {
                     conn: connection,
                     state: 'matched',
                  }
                  sendTo(users[waitQue[0]].conn, {
                     type: 'makeOffer',
                     dest: data.source
                  }) 
               }
            })()
            break;

         case "offer":
            if(users[data.dest] != null) { 
               sendTo(users[data.dest].conn, { 
                  type: "offer", 
                  offer: data.offer, 
                  source: data.source
               });
               users[data.dest].state = 'offered' 
            }
            users[data.source].state = 'offering'
            break;
				
         case "answer": 
            users[data.source].state == 'answering'; 
            if(users[data.dest] != null) { 
               sendTo(users[data.dest].conn, { 
                  type: "answer", 
                  answer: data.answer 
               });
               users[data.dest].state == 'answered';
            } 
            break;
				
         case "candidate": 
            if(connection.op != null) { 
               sendTo(users[connection.op].conn, { 
                  type: "candidate", 
                  candidate: data.candidate 
               }); 
            } 
            break;
				
         case "leave":  	
            //notify the other user so he can disconnect his peer connection 
            if(users[data.dest] != null) { 
               sendTo(users[data.dest].conn, { 
                  type: "leave"
               });
               delete users[data.dest];
            }
            delete users[data.source]; 
            break;
				
         default: 
            sendTo(connection, { 
               type: "error", 
               message: "Command not found: " + data.type 
            }); 
            break;
				
      }  
   });
	
   //when user exits, for example closes a browser window 
   //this may help if we are still in "offer","answer" or "candidate" state 
   connection.on("close", function() { 
      if(connection.self) { 
         delete users[connection.self];     
      }
      if(connection.cp) {  
         if(users[connection.cp] != null) { 
            sendTo(users[connection.cp].conn, { 
               type: "leave" 
            }); 
            delete users[connection.cp];
         }  
      } 
   });
   
   sendTo(connection, { 
      type: 'greeting',
      msg: 'hello!' 
   }); 
});
  
function sendTo(connection, message) { 
   connection.send(JSON.stringify(message)); 
}