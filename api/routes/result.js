var express = require("express");
var router = express.Router();

function playMontyHallGame(shouldSwitch) {
  const doorWithCar = Math.floor(Math.random() * 3);
  const selectedDoor = Math.floor(Math.random() * 3);

  const firstOpenedDoor = [0, 1, 2].find(
    (door) => door !== selectedDoor && door !== doorWithCar
  );

  if (shouldSwitch) {
    const anotherSelectedDoor = [0, 1, 2].find(
      (door) => door !== selectedDoor && door !== firstOpenedDoor
    );
    return doorWithCar === anotherSelectedDoor;
  }
  return doorWithCar === selectedDoor;
}

function simulateMontyHallGame(num, shouldSwitch) {
  let gamesWon = 0;
  for (let i = 0; i < num; i++) {
    gamesWon += playMontyHallGame(shouldSwitch);
  }
  return ((gamesWon / num) * 100).toFixed(2);
}

router.get("/", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const { experiments, changed = "" } = req.query;

  if (experiments) {
    const chances = simulateMontyHallGame(experiments, Boolean(changed));
    res.send(JSON.stringify({ chances }));
    return;
  }
  res.status(500).send({ error: "Missed number of experiments!" });
});

module.exports = router;
