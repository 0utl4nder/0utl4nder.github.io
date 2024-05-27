let = onSimulation = false;

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function Fire(fireCount, x, y, z) {
  for (let i = 0; i < fireCount; i++) {
    let fireContainer = document.createElement("a-entity");
    fireContainer.setAttribute("class", "fire-container");
    fireContainer.setAttribute("position", `${x} ${y} ${z}`);
    fireContainer.setAttribute("fire", "");
    document.querySelector("a-scene").appendChild(fireContainer);
    Sound("Fire");
    Smoke(1, x, y - 1, z);
  }
}

function Smoke(smokeCount, x, y, z) {
  for (let i = 0; i < smokeCount; i++) {
    let smokeContainer = document.createElement("a-entity");
    smokeContainer.setAttribute("class", "smoke-container");
    smokeContainer.setAttribute("position", `${x} ${y} ${z}`);
    smokeContainer.setAttribute("smoke", "");
    document.querySelector("a-scene").appendChild(smokeContainer);
  }
}

function Sound(id) {
  document.getElementById(id).components.sound.playSound();
}

function FlashingLight() {
  let light = document.createElement("a-light");
  light.setAttribute("type", "spot");
  light.setAttribute("position", "3.2 2.4 -3");
  light.setAttribute("angle", "30");
  light.setAttribute("intensity", "2");
  document.querySelector("a-scene").appendChild(light);

  const colors = ["#ce7e00", "#bf9000", "#e69138"];
  let currentColorIndex = 0;

  function changeColor() {
    light.setAttribute("color", colors[currentColorIndex]);
    currentColorIndex = (currentColorIndex + 1) % colors.length;
  }

  setInterval(changeColor, 500);
  Sound("FireAlarm");
}

function Simulation() {
  onSimulation = true;
  Fire(1, 3.3, 1, -1.7);
  sleep(1000).then(() => {
    Fire(1, 3.5, 0.5, -1.8);
    sleep(1000).then(() => {
      Fire(1, 3.3, 0.7, -2);
      sleep(10000).then(() => {
        Fire(1, 3.5, 0.5, -2.2);
        Fire(1, 3.5, 0.5, -1.6);
        sleep(10000).then(() => {
          Fire(1, 3.3, 0.5, -1.3);
          Fire(1, 3.3, 0.5, -1.1);
          sleep(6000).then(() => {
            Fire(1, 3.2, 0, -1.3);
            Fire(1, 3.2, 0, -1.1);
            sleep(3000).then(() => {
              Smoke(1, 3.2, 0, -1.3);
              Smoke(1, 3.2, 0, -1.3);
              FlashingLight();
              sleep(10000).then(() => {
                Fire(1, 3.2, 0, -1.3);
                Fire(1, 3.2, 0, -1.1);
                Fire(1, 3.2, 0, -1.5);
                Fire(1, 3.2, 0, -1.7);
                sleep(1000).then(() => {
                  Fire(1, 3.2, 0, -1);
                  sleep(1000).then(() => {
                    Fire(1, 3.2, 0, -0.8);
                    sleep(1000).then(() => {
                      Fire(1, 3.2, 0, -2.2);
                      sleep(1000).then(() => {
                        Fire(1, 3.2, 0, -2.3);
                        sleep(1000).then(() => {
                          Fire(1, 3.2, 0, -0.6);
                          sleep(1000).then(() => {
                            Fire(2, 3.2, 0, -0.5);
                            sleep(1000).then(() => {
                              Fire(1, 3.2, 0, -2.5);
                              sleep(1000).then(() => {
                                Fire(1, 3.2, 0, -2.7);
                                sleep(1000).then(() => {
                                  Fire(1, 3.2, 0, -2.9);
                                  sleep(2000).then(() => {
                                    Fire(2, 3.2, 0, -3.1);
                                    sleep(1000).then(() => {
                                      Fire(1, 3.2, 0, -3.3);
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key == "i") {
    if (onSimulation == false) {
      console.log("Simulation started");
      Simulation();
    } else {
      console.log("Simulation already started");
    }
  }
});
