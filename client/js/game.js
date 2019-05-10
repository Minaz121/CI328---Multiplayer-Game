var Game = {};
var points;
var point;
var alreadyspawned = false;
Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

var score = 0;
var pointsText;

Game.preload = function() {
    game.load.image('sprite', 'assets/player.png');
    game.load.image('ball', 'assets/coin.png');
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

    Client.socket.emit('position');

};

Game.pointSpawner = function(x, y){

    // var x = Client.socket.emit('position');
    // var y = Client.socket.emit('position');
    console.log(x + y);
    var points;
    point = game.add.sprite(x+100,y+100,'ball');
    point.enableBody = true;
    game.physics.arcade.enable(point);
    point.body.collideWorldBounds = true;

    var style = {font: "bold 32px Arial", fill: "#fff"};

    pointsText = game.add.text(0, 0, "Score: " + score, style);
};


Game.update = function () {


    Client.socket.emit("collision");


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

//Function for when the player hits a coin
Game.collision = function(id){
    // game.debug.body(Game.playerMap[id]);
    // game.debug.body(point);
    var hitBall = game.physics.arcade.collide(Game.playerMap[id], point);
    if (hitBall) {
        console.log("You hit a ball");
        score++;
        pointsText.kill();
        Client.socket.emit('addPoint');
        pointsText.text = "Score: " + score;
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
    // game.debug.body(Game.playerMap);
    // //game.debug.body(point);
    // game.world.remove(point);

};

