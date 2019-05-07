const PORT = 55000;

var server = require('http').createServer();
var io = require('socket.io')(server);
var alreadyspawned = false;

io.on('connection', function(client) {
    
        
    client.on('newplayer',function() {
        client.player = {
            id: server.lastPlayerID++,
            x: randomInt(100,400),
            y: randomInt(100,400)
        };
        client.emit('allplayers',getAllPlayers());
        client.broadcast.emit('newplayer',client.player);

        client.on('click',function(data) {
            console.log('click to '+data.x+', '+data.y);
            client.player.x = data.x;
            client.player.y = data.y;
            io.emit('move',client.player);
        });

        client.on('disconnect',function() {
            io.emit('remove', client.player.id);
            console.log('disconnecting Player: ' + client.player.id);
        });

        client.on('test', function() {
        console.log('test received');
        client.player.x = randomInt(50,400);
        client.player.y = randomInt(50,400);
        io.emit('respawn',client.player);
        console.log('Player '+ client.player.id + 'Location x:' + client.player.x + 'Location y:' + client.player.y);
        });

        client.on('move_up', function(){
            io.emit('move_up_from_server', client.player.id);
        });
        client.on('move_down', function(){
            io.emit('move_down_from_server', client.player.id);
        });

        client.on('move_left', function(){
            io.emit('move_left_from_server', client.player.id);
        });

        client.on('move_right', function(){
            io.emit('move_right_from_server', client.player.id);
        });

        client.on('stop_movement', function(){
            io.emit('stop_from_server', client.player.id);
        });

        client.on('collision', function(){
            io.emit('collision', client.player.id);
        });
        client.on('position',function(){
            var posX = Math.floor(Math.random() * (800 - 200) + 100);
            var posY = Math.floor(Math.random() * (600 - 100) + 100);

            io.emit('position',posX,posY);
            console.log("position x"+posX+" position y"+posY);

        });
                
    });
    
});

server.listen(PORT, function(){
    console.log('Listening on ' + server.address().port);
});

server.lastPlayerID = 0;


function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}



