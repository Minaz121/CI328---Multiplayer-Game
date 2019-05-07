var Game = {};
var points;
var point;
var alreadyspawned = false;
Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('sprite', 'assets/coin.png');
    game.load.image('ball', 'assets/ball.png');
};

Game.create = function(){
    //Enable Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Empty object to keep a list of players on the server
    Game.playerMap = {};

    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    
    game.input.onTap.add(Game.getCoordinates, this);

    Client.askNewPlayer();

    cursors = game.input.keyboard.createCursorKeys();


    //points = game.add.group();
    // points.Game.create(100, 100, 'ball');
    //     // points.enableBody = true;
    //     // game.physics.arcade.enable(points);

    //Game.pointSpawner();


    if(alreadyspawned == false){
        Client.socket.emit('position');
        alreadyspawned=true;
    }
    else{
        console.log("Spawned");
    }

};

Game.pointSpawner = function(x,y){

    // var x = Client.socket.emit('position');
    // var y = Client.socket.emit('position');

    point = game.add.sprite(x+100,y+100,'ball');
    point.enableBody = true;
    game.physics.arcade.enable(point);
    point.body.collideWorldBounds = true;


};


Game.update = function () {


    Client.socket.emit("collision");
    // var hitBall = game.physics.arcade.collide(Game.playerMap, point);
    // if (hitBall) {
    //     //point.destroy();
    //     console.log(Game.pointSpawner());
    //
    //
    // }


    if(cursors.up.isDown){

        console.log("This");
        Client.socket.emit("move_up");
    }
    else if(cursors.down.isDown) {

        console.log("This");
        Client.socket.emit("move_down");
    }
    else if(cursors.left.isDown) {

        console.log("This");
        Client.socket.emit("move_left");
    }
    else if(cursors.right.isDown) {

        console.log("This");
        Client.socket.emit("move_right");
    }

    else{
        console.log("Movement stopped");
        Client.socket.emit("stop_movement");
    }
    

};

Game.collision = function(id){
    game.debug.body(Game.playerMap[id]);
    game.debug.body(point);
    var hitBall = game.physics.arcade.collide(Game.playerMap[id], point);
    if (hitBall) {
        console.log("You hit a ball");

        point.kill();
        Client.socket.emit('position');
    }
};

Game.getCoordinates = function(pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
    game.physics.arcade.enable(Game.playerMap[id]);
    Game.playerMap[id].body.enable = true;
    Game.playerMap[id].body.collideWorldBounds = true;

};

Game.movePlayer = function(id,x,y){

    var player = Game.playerMap[id];

    var distance = Phaser.Math.distance(player.x,player.y,x,y);


    var tween = game.add.tween(player);

    var duration = distance*10;

    player.body.velocity.x = x;
    player.body.velocity.y = y;
    tween.to({x:x,y:y}, duration);
    
    tween.start();
};

Game.respawnPlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y},duration);
    tween.start();

};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.render = function(){
    game.debug.body(Game.playerMap);
    //game.debug.body(point);
    game.world.remove(point);

};

