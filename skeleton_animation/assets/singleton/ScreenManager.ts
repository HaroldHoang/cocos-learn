export class FullScreenManager {
    private static _instance: FullScreenManager | null = null;

    public static getInstance(): FullScreenManager {
        return this._instance === null
            ? new FullScreenManager()
            : this._instance;
    }

    public toggleFullScreen(): void {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(
                    "Error attempting to enable fullscreen mode:",
                    err
                );
            });
        } else {
            document.exitFullscreen().catch((err) => {
                console.error("Error attempting to exit fullscreen mode:", err);
            });
        }
    }
}

export class RotateManager {
    private static _instance: RotateManager | null = null;

    public static getInstance(): RotateManager {
        if (this._instance === null) {
            this._instance = new RotateManager();
            this._instance.registerResizeEvent();
        }
        return this._instance;
    }

    private registerResizeEvent = () => window.addEventListener("resize", this.handleRotateScreen);

    private handleRotateScreen = () => this.rotateScreen(true);

    public rotateScreen(auto: boolean) {
        if (!document.fullscreenElement) {
        const gameDiv = document.getElementById("GameDiv");
        const width = window.innerWidth;
        if (!auto || (gameDiv && width < 1280)) {
            gameDiv.setAttribute("style", "display: flex;justify-content: center;align-items: center;width: 900px;height: 506.25px;transform: rotate(90deg);");
        } else gameDiv.setAttribute("style", "display: flex;justify-content: center;align-items: center;width: 1280px;height: 720px;");
    }
}
}
