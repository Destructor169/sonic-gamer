import k from "../kaplayCtx";

export function makesonic(pos){
    const sonic = k.add([
        k.sprite("sonic"),
        k.scale(4),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
        k.body({jumpForce: 1700}),
        {
            ringCollectUI: null,
            setControls() {
                const self = this;
                k.onButtonPress("jump", () => {
                    if(self.isGrounded()){
                        self.play("jump");
                        self.jump();
                        k.play("Jump", { volume: 0.5 });
                    }
                });
            },

            setEvents() {
                const self = this;
                this.onGround(() => {
                    self.play("run");
                });
            }
        }
    ]);

    sonic.ringCollectUI = sonic.add([
        k.text("", {font: "mania", size: 24}),
        k.color(255, 255, 0),
        k.anchor("center"),
        k.pos(30, -10),
    ]);
    
    return sonic;
}