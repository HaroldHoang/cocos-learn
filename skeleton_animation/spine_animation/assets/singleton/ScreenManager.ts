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
        }
        return this._instance;
    }

    public onHorizontal() {
        if (!document.fullscreenElement) {
            const gameDiv = document.getElementById("GameDiv");
            const game = document.getElementById("GameCanvas");
            gameDiv.setAttribute(
                "style",
                "display: flex;justify-content: center;align-items: center;width: 1280px;height: 720px;"
            );
            game.setAttribute("height", "720");
            game.setAttribute("width", "1280");
        }
    }
    public onVertical() {
        if (!document.fullscreenElement) {
            const gameDiv = document.getElementById("GameDiv");
            const game = document.getElementById("GameCanvas");
            const width = window.innerWidth;
                gameDiv.setAttribute(
                    "style",
                    "display: flex;justify-content: center;align-items: center;width: 600px;height: 900px;"
                );
                game.setAttribute("width", "600px");
                game.setAttribute("height", "900px");
        }
    }
}
