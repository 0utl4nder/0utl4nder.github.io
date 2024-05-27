// Bounding Box and Camera Limiting
AFRAME.registerComponent("fit-box", {
  init: function () {
    const el = this.el;
    el.addEventListener("model-loaded", () => {
      const object3D = el.getObject3D("mesh");
      const box = new THREE.Box3().setFromObject(object3D);
      const size = box.getSize(new THREE.Vector3());

      const center = box.getCenter(new THREE.Vector3());

      this.createBoundingBox(center, size);

      const min = box.min;
      const max = box.max;
      document
        .querySelector("#camera")
        .setAttribute(
          "limit-camera",
          `min: ${min.x} ${min.y} ${min.z}; max: ${max.x} ${max.y} ${max.z}`
        );
    });
  },
  createBoundingBox: function (center, size) {
    const scene = document.querySelector("a-scene");
    const halfSize = size.clone().multiplyScalar(0.5);

    const wallMaterial = "color: #FF0000; opacity: 0; transparent: true";

    const walls = [
      {
        position: `${center.x} ${center.y} ${center.z - halfSize.z}`,
        rotation: "0 0 0",
        width: size.x,
        height: size.y,
      },
      {
        position: `${center.x} ${center.y} ${center.z + halfSize.z}`,
        rotation: "0 0 0",
        width: size.x,
        height: size.y,
      },
      {
        position: `${center.x - halfSize.x} ${center.y} ${center.z}`,
        rotation: "0 90 0",
        width: size.z,
        height: size.y,
      },
      {
        position: `${center.x + halfSize.x} ${center.y} ${center.z}`,
        rotation: "0 90 0",
        width: size.z,
        height: size.y,
      },
      {
        position: `${center.x} ${center.y + halfSize.y} ${center.z}`,
        rotation: "-90 0 0",
        width: size.x,
        height: size.z,
      },
      {
        position: `${center.x} ${center.y - halfSize.y} ${center.z}`,
        rotation: "-90 0 0",
        width: size.x,
        height: size.z,
      },
    ];

    walls.forEach((wall) => {
      const wallEl = document.createElement("a-plane");
      wallEl.setAttribute("position", wall.position);
      wallEl.setAttribute("rotation", wall.rotation);
      wallEl.setAttribute("width", wall.width);
      wallEl.setAttribute("height", wall.height);
      wallEl.setAttribute("material", wallMaterial);
      wallEl.setAttribute("static-body", "");
      scene.appendChild(wallEl);
    });
  },
});

AFRAME.registerComponent("limit-camera", {
  schema: {
    min: { type: "vec3", default: { x: -5, y: 0.5, z: -5 } },
    max: { type: "vec3", default: { x: 5, y: 9.5, z: 5 } },
    padding: { type: "number", default: 0.5 },
  },
  tick: function () {
    const camera = this.el.object3D;
    const position = camera.position;
    const min = this.data.min;
    const max = this.data.max;
    const padding = this.data.padding;

    position.x = Math.max(
      min.x + padding,
      Math.min(max.x - padding, position.x)
    );
    position.y = Math.max(
      min.y + padding,
      Math.min(max.y - padding, position.y)
    );
    position.z = Math.max(
      min.z + padding,
      Math.min(max.z - padding, position.z)
    );
  },
});
