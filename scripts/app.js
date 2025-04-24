const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = async () => {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    // 🔄 Cambia qui il nome del file
    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/", "Curvy_01_Edit.ply", scene);
    const mesh = result.meshes[0];

    if (mesh instanceof BABYLON.GaussianSplattingMesh) {
        console.log("Gaussian Splatting Mesh (.ply) caricato con successo!");
    } else {
        console.warn("Mesh caricata ma non è una GaussianSplattingMesh.");
    }

    return scene;
};

createScene().then(scene => {
    engine.runRenderLoop(() => {
        scene.render();
    });
});

window.addEventListener("resize", () => {
    engine.resize();
});
