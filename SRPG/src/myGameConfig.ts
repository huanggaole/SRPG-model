import StartScene from "./scene/StartScene";
import GameScene from "./scene/GameScene";

/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=1080;
    static height:number=640;
    static scaleMode:string="showall";
    static screenMode:string="none";
    static alignV:string="top";
    static alignH:string="left";
    static startScene:any="test/TestScene.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("scene/StartScene.ts",StartScene);
        reg("scene/GameScene.ts",GameScene);
    }
}
GameConfig.init();