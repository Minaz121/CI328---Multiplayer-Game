var Client = {};
Client.socket = io('http://localhost:55000');

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendClick = function(x,y){
  Client.socket.emit('click',{x:x,y:y});
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move',function(data){
       Game.movePlayer(data.id,data.x,data.y);

    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });

    Client.socket.on('respawn',function(data){
        Game.respawnPlayer(data.id,data.x,data.y);
    });

    Client.socket.on('move_up_from_server', function move_up_from_server_function(id) {

        Game.playerMap[id].body.velocity.y = -100;
        //Game.playerMap[id].body.setVelocityY = -100;

    });

    Client.socket.on('move_down_from_server', function move_down_from_server_function(id) {

        Game.playerMap[id].body.velocity.y = 100;
        //Game.playerMap[id].body.setVelocityY = -100;

    });

    Client.socket.on('move_left_from_server', function move_left_from_server_function(id) {

        Game.playerMap[id].body.velocity.x = -100;
        //Game.playerMap[id].body.setVelocityY = -100;

    });

    Client.socket.on('move_right_from_server', function move_right_from_server_function(id) {

        Game.playerMap[id].body.velocity.x = 100;
        //Game.playerMap[id].body.setVelocityY = -100;

    });

    Client.socket.on('stop_from_server', function stop_from_server_function(id) {

        Game.playerMap[id].body.velocity.x = 0;
        Game.playerMap[id].body.velocity.y = 0;

    });

 
});


