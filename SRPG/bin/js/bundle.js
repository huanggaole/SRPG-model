(function () {
    'use strict';

    var TerrianType;
    (function (TerrianType) {
        TerrianType[TerrianType["DeepWater"] = 0] = "DeepWater";
        TerrianType[TerrianType["ShallowWater"] = 1] = "ShallowWater";
        TerrianType[TerrianType["Plain"] = 2] = "Plain";
        TerrianType[TerrianType["Grass"] = 3] = "Grass";
        TerrianType[TerrianType["Road"] = 4] = "Road";
    })(TerrianType || (TerrianType = {}));
    var SurfaceType;
    (function (SurfaceType) {
        SurfaceType[SurfaceType["None"] = 0] = "None";
        SurfaceType[SurfaceType["Tree"] = 1] = "Tree";
        SurfaceType[SurfaceType["Rock"] = 2] = "Rock";
    })(SurfaceType || (SurfaceType = {}));
    class Map {
        static init(_height, _width, _tarray, _sarray) {
            this.height = _height;
            this.width = _width;
            this.terrianarray = _tarray;
            this.surfacearray = _sarray;
        }
        static initlevel1() {
            this.height = 50;
            this.width = 100;
            this.terrianarray = [];
            this.surfacearray = [];
            for (let i = 0; i < this.height; i++) {
                let ttemprow = [];
                let stemprow = [];
                for (let j = 0; j < this.width; j++) {
                    ttemprow.push(TerrianType.Grass);
                    stemprow.push(SurfaceType.None);
                }
                this.terrianarray.push(ttemprow);
                this.surfacearray.push(stemprow);
            }
        }
    }
    Map.tilewidth = 16;
    Map.tileheight = 16;
    Map.terrianarray = [];
    Map.surfacearray = [];

    class MapScript extends Laya.Script {
        constructor() {
            super();
            this.terrainImages = [];
            let terrainpaths = [
                "comp/terrain_deepwater.png",
                "comp/terrain_shallowwater.png",
                "comp/terrain_plain.png",
                "comp/terrain_grass.png",
                "comp/terrain_road.png"
            ];
            for (let i = 0; i < terrainpaths.length; i++) {
                this.terrainImages.push(new Laya.Image(terrainpaths[i]));
            }
        }
        onStart() {
        }
        onRefresh() {
            let image = this.owner;
            image.graphics.clear();
            image.size(Map.width * Map.tilewidth, Map.height * Map.tileheight);
            for (let i = 0; i < Map.height; i++) {
                for (let j = 0; j < Map.width; j++) {
                    image.graphics.drawImage(this.terrainImages[Map.terrianarray[i][j]].source, j * Map.tilewidth, i * Map.tileheight, Map.tilewidth, Map.tileheight);
                }
            }
        }
        onMouseDown() {
            this.lastX = Laya.stage.mouseX;
            this.lastY = Laya.stage.mouseY;
            this.ifMove = true;
        }
        onMouseUp() {
            this.ifMove = false;
        }
        onMouseOut() {
            this.ifMove = false;
        }
        onMouseMove() {
            if (this.ifMove) {
                let currentX = Laya.stage.mouseX;
                let currentY = Laya.stage.mouseY;
                let image = this.owner;
                image.pivotX -= (currentX - this.lastX) / image.scaleX;
                image.pivotY -= (currentY - this.lastY) / image.scaleY;
                this.lastX = currentX;
                this.lastY = currentY;
            }
        }
    }

    class GameScene extends Laya.Scene {
        createChildren() {
            super.createChildren();
            this.loadScene("GameScene");
        }
        onScaleChange() {
            if (this.scaleRadio.selectedIndex == 0) {
                this.mapImage.scale(1, 1);
            }
            if (this.scaleRadio.selectedIndex == 1) {
                this.mapImage.scale(2, 2);
            }
            if (this.scaleRadio.selectedIndex == 2) {
                this.mapImage.scale(4, 4);
            }
        }
        onAwake() {
            this.mapScript = this.mapImage.getComponent(MapScript);
            this.scaleRadio.on(Laya.Event.CHANGE, this, this.onScaleChange);
            Map.initlevel1();
            this.mapScript.onRefresh();
        }
    }

    class StartScene extends Laya.Scene {
        createChildren() {
            super.createChildren();
            this.loadScene("StartScene");
        }
        onAwake() {
            const gamescene = new GameScene();
            this.startBtn.on(Laya.Event.CLICK, this, () => {
                Laya.stage.addChild(gamescene);
            });
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("scene/StartScene.ts", StartScene);
            reg("scene/GameScene.ts", GameScene);
            reg("script/MapScript.ts", MapScript);
        }
    }
    GameConfig.width = 1080;
    GameConfig.height = 640;
    GameConfig.scaleMode = "showall";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            const startscene = new StartScene();
            Laya.stage.addChild(startscene);
        }
    }
    new Main();

}());
