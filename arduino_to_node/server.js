const http = require('http')
const express = require('express')

const app = express()
const serialport = require('serialport')
const sp_readline = serialport.parsers.Readline
const options = {
  hostname: '192.168.78.113',
  port: 80,
  path: '/person/check/',
  method: 'GET'
}
const port = 3000
const server = require('http').Server(app)
const io = require('socket.io')(server)



app.use(express.static(__dirname + '/public'))

 sPort = new serialport('COM5', {autoOpen:false, baudRate: 57600})
 parser = new sp_readline()
 sPort.pipe(parser)

 sPort.open( function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }
})

sPort.on('open', () => 
  {
      console.log('Serial Port Opened')
      io.on('connection', socket => 
      {
        socket.emit('connected')
        parser.on('data', badge => 
        {
          console.log('badge :', badge);
          if(JSON.stringify(badge).length > 4)
          {
            default_path=options.path
            options.path=options.path + badge;
            options.path=options.path.substring(0,options.path.length - 1)
            // console.log('path :', options.path);
            req = http.request(options, res => {
              // console.log(`statusCode: ${res.statusCode}`)
              res.on('data', data => {
                server_respond = JSON.parse(data);
                if (server_respond.hasAccess) { sPort.write("true", function() {
                  sPort.drain(function() {
                    sPort.flush();
                  });
                }) }
                else  { sPort.write("false", function() {
                  sPort.drain(function() {
                    sPort.flush();
                  });
                }) }
                socket.emit('server respond',server_respond);
              })
            })
            
            req.on('error', error => {
              console.error(error)
            })
            
            req.end()
            options.path=default_path
          }
          socket.emit('port data',badge);
        })
      })
  })


io.on('connection', (socket) => {
  console.log('a user connected');
  
  
});

server.listen(port, () => {
  console.log(`Express server started on ${port}`)
})
