const net = require('net')

const server = net.createServer(socket => {
  socket.once('readable', () => {
    const requestBody = readRequest(socket)
    console.log(`Client's request: ${requestBody}`)
    const message = 'HTTP/1.1 200 OK\r\n'
      + 'Content-Type: text/html\r\n'
      + 'Content-Length: 30\r\n\r\n'
      + '<html><h1>Hi there</h1></html>\r\n'
    socket.write(message)
    socket.end()
  })
})

server.listen(8080, () => {
  console.log('Server has been started on port 8080')
})

const readRequest = socket => {
  let buffer = Buffer.from('')
  while (true) {
    const tempBuffer = socket.read()
    if (tempBuffer === null) {
      break
    }
    buffer = Buffer.concat([buffer, tempBuffer])
  }
  return buffer.toString()
}
