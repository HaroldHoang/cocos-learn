import { _decorator, Component, Node, Prefab, instantiate, Label, randomRange, EventTouch, Canvas, Sprite, UITransform, Vec3, macro, random, director, view  } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    @property(Prefab)
    pngwing: Prefab = null;
    createAnt()
    {
        var newAnt = instantiate(this.pngwing);
        const screenSize = view.getVisibleSize();
        const halfWidth = screenSize.width / 2;
        const halfHeight = screenSize.height / 2;
        const randomX = -halfWidth;
        const randomY = Math.random() * (halfHeight * 2) - halfHeight;
        newAnt.setPosition(randomX, randomY, 0);
        this.node.addChild(newAnt);
        newAnt.on(Node.EventType.MOUSE_UP, this.onAntHit, this);
    }
    onLoad(){
        this.schedule(this.createAnt, 1);
    }
    onAntHit(event: EventTouch) {
        const antNode = event.target;
        antNode.destroy();
    }
    start() {
    }

    update(deltaTime: number) {
        
    }
}