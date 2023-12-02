const net = require('net')

const client = net.connect(8080, '127.0.0.1', () => {
  console.log('Client has been connected to server')
})

const message = 'POST /path HTTP/1.1\r\n'
  + 'Host: localhost:8080\r\n'
  + 'Content-Type: text/plain\r\n'
  + 'Content-Length: 8\r\n\r\n'
  + 'Hi there\r\n'

client.write(message)

client.on('data', data => {
  console.log(`Server's response: ${data}`)
})

client.on('close', () => {
  console.log('Connection has been closed')
})
