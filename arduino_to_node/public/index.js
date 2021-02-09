const socket = io.connect('http://localhost:3000')

socket.on('connection', () => {
  console.log('Socket Connected')
})
socket.on('disconnect', () => {
  console.log('Socket Disconnected')
})

socket.on('server respond', data => {
  if (data.hasAccess){document.body.setAttribute('style', `background-color: green`) }
  else {document.body.setAttribute('style', `background-color: red`) }

  var p =  document.getElementById("user_name");
  var text ="FullName : unknown";
  if (data.fullName)  { text = "fullName : " + data.fullName}

  p.innerHTML=text;

})
socket.on('port data', data => {
  var p =  document.getElementById("user_badge");
  p.innerHTML="badge : " + data;

})
