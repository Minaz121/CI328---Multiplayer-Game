var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('Menu', Menu);
game.state.add('Login', Login);
game.state.add('Game', Game);
game.state.start('Menu');