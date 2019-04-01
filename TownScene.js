class TownScene extends BaseScene{
  constructor(){
    super('TownScene');
    this.tileDataKey = 'SummerQuestVillage';
    this.tileDataSource = 'assets/tilemap/SummerQuestJ.json';
  }
  preload() {
    super.preload();
    this.load.image('landscape', 'assets/tilemap/kenneyrpgpack/Spritesheet/RPGpack_sheet.png');
    this.load.image('destruct', 'assets/tilemap/kenney-tileset-64px-extruded.png');
  }
  create() {
    super.create();
  }

  update(time, delta) {
    super.update(time, delta);
  }
}
