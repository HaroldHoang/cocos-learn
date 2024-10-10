import { _decorator, Component, screen, Label, Button, sp, Canvas, Camera, renderer, view, ResolutionPolicy } from "cc";
const { ccclass, property } = _decorator;

import { FullScreenManager } from "../singleton/ScreenManager";
import { RotateManager } from "../singleton/ScreenManager";

@ccclass("HomeController")
export class HomeController extends Component {
    @property(sp.Skeleton)
    monter: sp.Skeleton = null;

    @property(Label)
    lblInstruction: Label = null;

    @property(Button)
    btnFullScreen: Button = null;

    @property(Label)
    lblBtnFullScreen: Label = null;

    @property(Button)
    btnRotate: Button = null;

    @property(Label)
    lblBtnRotate: Label = null;

    @property(Canvas)
    canvas: Canvas = null;

    @property(Camera)
    camera: Camera = null;

    private isFullScreen = false;
    private fullScreenManager = FullScreenManager.getInstance();
    private rotateManager = RotateManager.getInstance();
    private isHorizontal = true;
    private designResolution = view.getDesignResolutionSize();

    fovDefault: number

    onLoad() {
        this.btnFullScreen.node.on(Button.EventType.CLICK, this.changeStateScreen, this);
        this.btnRotate.node.on(Button.EventType.CLICK, this.changeRotation, this);
        screen.on("fullscreen-change", this.handleFullScreen, this);
    }

    changeStateScreen = () => this.fullScreenManager.toggleFullScreen();

    handleFullScreen() {
        this.isFullScreen = !this.isFullScreen;
        this.lblBtnFullScreen.string = this.isFullScreen ? "Exit" : "Full Screen";
    }

    changeRotation() {
        if(this.isHorizontal){
            view.setDesignResolutionSize(600, 900, ResolutionPolicy.SHOW_ALL)
            this.rotateManager.onVertical();
            this.monter.node.setPosition(-500, -50);
            this.btnFullScreen.node.setPosition(-150, 400, 0);
            this.btnRotate.node.setPosition(-270, 400, 0);
            this.lblInstruction.string =
                "U: attack1       I: attack2\nO: attack3       P: get-hit        Space: die\ndefault: idle";
            this.lblInstruction.lineHeight = 50;
            this.lblInstruction.node.setPosition(-420, -300, 0);
            this.isHorizontal = false;
        }
        else{
            view.setDesignResolutionSize(this.designResolution.width, this.designResolution.height, ResolutionPolicy.SHOW_ALL)
            this.rotateManager.onHorizontal();
            this.monter.node.setPosition(-36, -110);
            this.btnFullScreen.node.setPosition(566, 310, 0);
            this.btnRotate.node.setPosition(442, 310, 0);
            this.lblInstruction.string =
                "U: attack1      I: attack2      O: attack3      P: get-hit      Space: die\ndefault: idle";
            this.lblInstruction.lineHeight = 50;
            this.lblInstruction.node.setPosition(-16, -260, 0);
            this.isHorizontal = true;
        }
    }

    onDestroy(): void {
        this.btnFullScreen.node.off(Button.EventType.CLICK, this.changeStateScreen, this);
        this.btnRotate.node.off(Button.EventType.CLICK, this.changeRotation, this);
        screen.off("fullscreen-change", this.handleFullScreen, this);
    }

    update(){

    }

    
    
    
}