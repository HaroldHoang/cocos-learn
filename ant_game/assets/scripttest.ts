import { _decorator, Component, Node, Prefab, instantiate, Label, randomRange, EventTouch, Canvas, Sprite, UITransform, Vec3, view} from 'cc';
const { ccclass, property } = _decorator;
@ccclass('scripttest')
export class scripttest extends Component {
    @property
    speed: number = 15;
    direction: Vec3 = new Vec3();
    changeDirectionTime: number = 2;
    elapsedTime: number = 0;
    directionX: number = 1;
    directionY: number = 0;
    rotate:number = 0;
    randomAngle: number = 0;
    currentAngle: number = null;
    up: number = null;
    start() {
        this.direction = this.getRandomDirection();
    }

    getRandomDirection(): Vec3 {
        this.randomAngle = Math.random() * Math.PI / 2 - Math.PI / 4;
        return new Vec3(Math.cos(this.randomAngle), Math.sin(this.randomAngle), 0); 
    }

    update(deltaTime: number) {

        this.node.on(Node.EventType.MOUSE_UP, this.onAntHit, this);
        this.elapsedTime += deltaTime;

        if (this.elapsedTime >= this.changeDirectionTime) {
            this.direction = this.getRandomDirection();

            //rotation
            this.currentAngle = this.randomAngle;
            this.up = this.currentAngle < this.randomAngle ? 0.00001 : -0.00001;

            this.elapsedTime = 0;
        }

        //boundary
        let pos = this.node.getPosition();
        const screenSize = view.getVisibleSize();
        const halfWidth = screenSize.width / 2;
        const halfHeight = screenSize.height / 2;
       pos.add(this.direction);
        if(pos.y + 40 > halfHeight){
            pos.y = halfHeight - 40;
        }

        else if(pos.y - 40 < -halfHeight){
            pos.y = 40 - halfHeight;
        }

        this.node.setPosition(pos);

        
        if(this.currentAngle != null && Math.abs(this.currentAngle - this.randomAngle) > 0.0001){
            this.currentAngle += this.up; 
            this.node.setRotationFromEuler(0, 0, (this.currentAngle) * 180 / Math.PI);
        }
        this.node.setRotationFromEuler(0, 0, (this.randomAngle) * 180 / Math.PI);
    }
    onAntHit(event: EventTouch) {
        const antNode = event.target;
        antNode.destroy();
    }
}


