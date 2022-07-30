let areas = {};
const GRID_SIZE = 0.0005;

function isCoordsInArea(coords, area) {
  let { x, y } = coords;
  let { x1, y1, x2, y2 } = area;
  x = Math.abs(x);
  y = Math.abs(y);
  x1 = Math.abs(x1);
  y1 = Math.abs(y1);
  x2 = Math.abs(x2);
  y2 = Math.abs(y2);
  return x1 <= x && x <= x2 && y1 <= y && y <= y2;
}

export function getLocalAreas(coords) {
  let cachedAreas = 0;
  let newAreas = 0;
  let res = {};
  let playerAreaIndex = -1;
  const LOCAL_AREA_SIZE = 25;
  let startingLat = +(
    coords.latitude -
    (LOCAL_AREA_SIZE / 2) * GRID_SIZE
  ).toFixed(3);
  let startingLng = +(
    coords.longitude -
    (LOCAL_AREA_SIZE / 2) * GRID_SIZE
  ).toFixed(3);
  for (let i = -LOCAL_AREA_SIZE; i < LOCAL_AREA_SIZE; i++) {
    for (let j = -LOCAL_AREA_SIZE; j < LOCAL_AREA_SIZE; j++) {
      let latOffset = +(GRID_SIZE * 2 * i).toFixed(3);
      let lngOffset = +(GRID_SIZE * 2 * j).toFixed(3);
      const lat = +(startingLat - latOffset).toFixed(3);
      const lng = +(startingLng - lngOffset).toFixed(3);

      let areaId = `${lat},${lng}`;
      if (areas[areaId]) {
        res[areaId] = areas[areaId];
        cachedAreas++;
      }

      let ne = [+(lat - GRID_SIZE).toFixed(4), +(lng + GRID_SIZE).toFixed(4)];
      let sw = [+(lat + GRID_SIZE).toFixed(4), +(lng - GRID_SIZE).toFixed(4)];
      let bounds = { sw, ne };
      let area = {
        bounds,
        id: areaId,
        actors: [],
        visibility: "HIDDEN",
        visibilityFactors: ["DISTANT"],
      };

      if (
        isCoordsInArea(
          { x: coords.latitude, y: coords.longitude },
          { x1: ne[0], y1: ne[1], x2: sw[0], y2: sw[1] }
        )
      ) {
        playerAreaIndex = areaId;
        console.log("player is in area: ", areaId, j, i);
        area.actors.push({
          name: "TEST_PLAYER",
          id: "TEST_ACTOR_ID",
          visibility: "PLAYER_AREA",
          visibilityFactors: ["NEAR"],
        });
      }

      areas[areaId] = area;
      res[areaId] = area;
      newAreas++;
    }
  }
  console.log(`cached areas: ${cachedAreas} , new areas: ${newAreas}`);
  console.log("player area: ", areas[playerAreaIndex]);
  return res;
}
