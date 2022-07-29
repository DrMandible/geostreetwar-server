let areas = {};
const GRID_SIZE = 0.0005;

export function getLocalAreas(coords) {
  let cachedAreas = 0;
  let newAreas = 0;
  let res = {};
  const LOCAL_AREA_SIZE = 10;
  let startingLat = +(
    coords.latitude -
    LOCAL_AREA_SIZE * GRID_SIZE * 2
  ).toFixed(3);
  let startingLng = +(
    coords.longitude -
    LOCAL_AREA_SIZE * GRID_SIZE * 2
  ).toFixed(3);
  for (let i = -LOCAL_AREA_SIZE; i < LOCAL_AREA_SIZE; i++) {
    for (let j = -LOCAL_AREA_SIZE; j < LOCAL_AREA_SIZE; j++) {
      const lat = startingLat + i * GRID_SIZE;
      const lng = startingLng + j * GRID_SIZE;

      //   let latOffset = GRID_SIZE * 2 * i;
      //   let lngOffset = GRID_SIZE * 2 * j;
      //   let lat = +(coords.latitude + latOffset).toFixed(3);
      //   let lng = +(coords.longitude + lngOffset).toFixed(3);

      let areaId = `${lat},${lng}`;
      if (areas[areaId]) {
        res[areaId] = areas[areaId];
        cachedAreas++;
        continue;
      }

      let ne = [+(lat - GRID_SIZE).toFixed(3), lng + GRID_SIZE];
      let sw = [lat + GRID_SIZE, +(lng - GRID_SIZE).toFixed(3)];
      let bounds = { sw, ne };
      let area = {
        bounds,
      };
      areas[areaId] = area;
      res[areaId] = area;
      newAreas++;
    }
  }
  console.log(`cached areas: ${cachedAreas} , new areas: ${newAreas}`);
  return res;
}
