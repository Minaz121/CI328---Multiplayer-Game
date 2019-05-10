console.log("Login screen loaded");

var Login = {};

Login.init = function() {

};

Login.preload = function() {
    game.load.image('button', 'assets/thonk.png');
};

Login.create = function(){
    loginButton = game.add.button(game.world.centerX, game.world.centerY - 100, 'button', Login.login, this);
    backButton = game.add.button(game.world.centerX, game.world.centerY + 100, 'button', Login.back, this);
    Login.createText();
};

Login.createText = function(){
    var style = {font: "bold 32px Arial", fill: "#fff"};
    game.add.text(game.world.centerX, game.world.centerY + 100, "Back", style);
    game.add.text(game.world.centerX, game.world.centerY - 100, "Login", style);
};

Login.login = function(){
    var username = prompt("Please enter your username.", "");
    var passowrd = prompt("Please enter your password.", "");
};

Login.back = function(){
    game.state.start('Menu');
};