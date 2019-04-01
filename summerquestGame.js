// config
var config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 1200,
  scene: [TownScene, UIScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      scrollFactorX: 0,
      gravity: {
        y: 0
      } // Top down game, so no gravity
    }
  },
  /*scene:{
    preload: preload,
    create: create,
    update: update,
  }, */

  plugins: {
    scene: [
      { key: 'VirtualJoystickPlugin', plugin: VirtualJoystickPlugin, mapping: 'pad' }
    ]
  },


};
var game = new Phaser.Game(config);



var PhaserGame = function () {

  //  this.pad;

  //  this.stick1;
  //  this.stick2;
};

/*var player, archer, enemyArchers = [], maxEnemies = 4, bullets, enemyBullets, explosions, pad, stick, box;
function preload() {
  this.load.scenePlugin('VirtualJoystickPlugin', 'js/VirtualJoystickPlugin.js', 'VirtualJoystickPlugin', 'pad');
  //this.load.atlas('joystickcontroller', 'assets/sprites/arcade-joystick.png', 'assets/sprites/arcade-joystick.json');
  //this.load.image('archer', 'assets/sprites/playerarcher.png');
  this.load.image('enemyarcher', 'assets/sprites/enemyarcher.png');
  this.load.image('earth', 'assets/tilemap/scorched_earth.png');
  this.load.image('bullet', 'assets/sprites/bullet.png');
  //this.load.image('landscape', 'assets/tilemap/kenneyrpgpack/Spritesheet/RPGpack_sheet.png')
  //this.load.image('destruct', 'assets/tilemap/kenney-tileset-64px-extruded.png')
  //this.load.tilemapTiledJSON('SummerQuestVillage', 'assets/tilemap/SummerQuestJ.json')
};

function create() {

  this.physics.world.on('worldbounds',function(body){
    killBullet(body.gameObject)
  }, this); */

/*  //Load in the tilemap and enable collision for the destructable layer
  this.map = this.make.tilemap({key: "SummerQuestVillage"});
  var landscape = this.map.addTilesetImage("RPGpack_sheet", "landscape");
  var solid = this.map.addTilesetImage("kenney-tileset-64px-extruded", "destruct");
  //var layer = this.map.createStaticLayer(solid, landscape);
  this.map.createStaticLayer('Water', landscape, 0, 0);
  this.map.createStaticLayer('floor', landscape, 0, 0);
  var destructLayer = this.map.createDynamicLayer('destructable', landscape, 0, 0);
  destructLayer.setCollisionByProperty({ collide: true });
  this.map.createStaticLayer('Overlap', landscape, 0, 0);
  //this.physics.arcade.collide(this.player, this.destructLayer);
  this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels); */


/*  //VirtualJoystick
  this.stick = this.pad.addStick(120, 1075, 200, 'joystickcontroller');
  this.stick.on('update', stickUpdate, this);
  this.stick.scale = 0.5;



//this.Joystickk = new Joystick(this,w*1.3, h*2.0, 'joystickcontroller');

//ArcherCreate
var w = game.config.width;
var h = game.config.height;
this.archer = new PlayerCharacter(this,w*1.3, h*2.0, 'archer');
console.log(this.archer)
this.archer.enableCollision(destructLayer);
var outerFrame = new Phaser.Geom.Rectangle(0,0,w, h);
var innerFrame = new Phaser.Geom.Rectangle(w*0.025,h*0.025,w*0.05, h*0.05);
this.archer.character.setScale(1.0, );
enemyBullets = this.physics.add.group({
  defaultKey: 'bullet',
  maxSize: 10
})
// set bounds so the camera won't go outside the game world
//this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
// make the camera follow the player
//this.cameras.main.startFollow(PlayerCharacter);
/*player = new PlayerCharacter(this, w*0.5, h*0.5, 'tank', 'tank1');
player.enableCollision(destructLayer);


var enemyArcher, loc;
for(var i = 0; i < maxEnemies; i++){
  loc = Phaser.Geom.Rectangle.RandomOutside(outerFrame,innerFrame)
  enemyArcher = new EnemyCharacter(this, loc.x, loc.y, 'enemyarcher', player);
  //enemyArcher.enableCollision(destructLayer);
  enemyArcher.setBullets(enemyBullets);
  //enemyArcher.push(enemyArcher);
  this.physics.add.collider(enemyArcher, player);
  if(i > 0){
    for(var j = 0; j < enemyArchers.length - 1; j++){
      this.physics.add.collider(enemyArcher.hull, enemyArchers[j].hull);
    }
  }
}
bullets = this.physics.add.group({
  defaultKey: 'bullet',
  maxSize: 10
});
explosions = this.physics.add.group({
  defaultKey: 'kaboom',
  maxSize: maxEnemies+1
});
this.anims.create({
  key: 'explode',
  frames: this.anims.generateFrameNumbers('kaboom', {start:0, end:23, first:23}),

});
this.input.on('pointerdown', tryShoot, this);
//this.cameras.main.startFollow(player.hull, true, 0.5, 0.5);

//this.cameras.main.setBounds(0, 0, 800, 600);
};

/*function stickUpdate (stick, force)
    {
        const maxSpeed = 400;
        //this.stick.setScrollFactor(0);

        if (stick.isDown)
        {
            this.physics.velocityFromRotation(stick.rotation, force * maxSpeed, this.archer.character.body.velocity);
        }
};

function update(time, delta) {
  //player.update();
  /*for(var i=0;i<enemyArchers.length; i++ ){
  enemyArchers[i].update(time, delta);
}
this.archer.update();
}
function tryShoot(pointer){
  var bullet = bullets.get(this.archer.character.x, this.archer.character.y);
  if(bullet){
    fireBullet.call(this, bullet, this.archer.character.rotation);
  }
}
function fireBullet(bullet, rotation, target){
	bullet.rotation = rotation;
	this.physics.velocityFromRotation(rotation, 500, bullet.body.velocity);
  /*bullet.body.collideWorldBounds = true;
  bullet.body.onWorldBounds = true;
  bullet.enableBody(false).setDepth(3).setVisible(true).setActive(true);
  bullet.rotation = rotation;
  athis.physics.velocityFromRotation(bullet.rotation, 500, bullet.body.velocity);
  /*var destructLayer = this.map.getLayer("destructable").tilemapLayer;
  this.physics.add.collider(bullet, destructLayer, damageWall, null, this);
  console.log(this.bullet.maxSize);
  /* if(target === player){
  this.physics.add.overlap(player, bullet, bulletHitPlayer, null, this)
}else{
for(var i = 0 ; i < enemyArchers.length; i++){
this.physics.add.overlap(enemyArchers[i].hull, bullet, bulletHitEnemy, null, this);
}
}
}
function bulletHitPlayer(hull, bullet){
  killBullet(bullet);
  player.damage();
  var explosion = explosions.get(hull.x, hull.y);
  explosion.play('explode');
}
/*if(player.isDestroyed()){
this.input.enabled = false;
enemyArchers = [];
this.physics.pause();
}*/
/* function killBullet(bullet){
  bullet.disableBody(true, true);
  bullet.setActive(false);
  bullet.setVisible(false);

}
function activateExplosion(explosion){
  explosion.setActive(true);
  explosion.setVisible(true);
}
function bulletHitEnemy(hull, bullet){
  var enemy;
  var index;
  for(var i = 0; i<enemyArchers.length; i++){
    if(enemyArchers[i].hull === hull){
      enemy = enemyArchers[i];
      index = i;
      break;
    }
  }
  killBullet(bullet);
  enemy.damage();
  var explosion = explosions.get(hull.x, hull.y);
  if(explosion){
    activateExplosion(explosion);
    explosion.on('animationcomplete', animComplete, this);
    explosion.play
  }
  if(enemy.isDestroyed()){
    // remove from enemyArchers list
    enemyArchers.splice(index, 1);
  }
}

function damageWall(bullet, tile){

  killBullet(bullet);
  var destructLayer = this.map.getLayer("destructable").tilemapLayer;
  var index = tile.index + 1;
  var tileProperties = destructLayer.tileset[0].tileProperties[index-1];
  var checkColl = false;

  if(tileProperties){
    if(tileProperties.collides){
      checkColl = true;
    }
  }
  const newTile = destructLayer.putTileAt(index, tile.x, tile.y);
  if(checkColl){
    newTile.setCollision(true);
  }
}
*/
