// Import the required modules
const express = require('express');
const {Sonos} = require('sonos');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Set up the sonos device
const ip = '192.168.1.50';
const sonosDevice = new Sonos(ip);

// Set up the static file directory and the view engine
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Set up the websocket connection
io.on('connection', (socket) => {
  // console.log("new socket connection")
  // Set up the event listener for the system volume
  sonosDevice.on('Volume', (volume) => {
    // Send the updated volume to the client
    socket.emit('volumeChanged', { volume: volume });
    // console.log(`Volume is now: ${volume}`)
  });
  sonosDevice.on('Muted', (muted) => {
    // Send the updated volume to the client
    socket.emit('muted', { muted: muted });
    // console.log(`Mute status is now ${muted}`)
  });
});

// Set up the route for the homepage
app.get('/', (req, res) => {
    // console.log("someone loaded the page")
    sonosDevice.getVolume().then(volume => {
        res.render('index' , {volume: volume, muted: false});
      });
    
//   res.render('index', { volume: 0 });
});

// Set up a new route to return the current volume of the Sonos system
app.get('/volume', (req, res) => {
    // Get the current volume of the Sonos system
    sonosDevice.getVolume().then(volume => {
      // Send the volume back to the client
      res.json({ volume: volume });
    });
  });


PORT = 3000
HOST = '0.0.0.0'
// Start the server
server.listen(PORT, HOST, () => {
  console.log('Server listening on port 3000...');
});
