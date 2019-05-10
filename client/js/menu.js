console.log("Menu loaded");

var Menu = {};

Menu.init = function(){

};

Menu.preload = function() {
    game.load.image('button', 'assets/button.png');
};

Menu.create = function(){
    startButton = game.add.button(game.world.centerX- 100, game.world.centerY - 100, 'button', Menu.startGame, this);
    //loginButton = game.add.button(game.world.centerX - 100, game.world.centerY, 'button', Menu.startLogin, this);
    Menu.createText();
};

Menu.createText = function(){
    var buttonStyle = {font: "bold 28px Arial", fill: "white"};
    var titleStyle = {font: "48px Arial", fill: "white"};
    game.add.text(game.world.centerX- 150, game.world.centerY - 275, "Coin Collector", titleStyle);
    game.add.text(game.world.centerX - 85, game.world.centerY - 80, "Start game", buttonStyle);
    //game.add.text(game.world.centerX - 50, game.world.centerY + 20, "Login", buttonStyle);
};

Menu.startGame = function(){
    game.state.start('Game');
};

//Menu.startLogin = function(){
    //game.state.start('Login');
//};