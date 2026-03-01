export const FULL_FRAME_WIDTH = 36;
export const FULL_FRAME_HEIGHT = 24;
export const FULL_FRAME_DIAGONAL = Math.sqrt(
  FULL_FRAME_WIDTH ** 2 + FULL_FRAME_HEIGHT ** 2,
);

export type SensorDimensions = {
  width: number;
  height: number;
};

export function getSensorDiagonal({ width, height }: SensorDimensions) {
  return Math.sqrt(width ** 2 + height ** 2);
}

export function getCropFactor(sensor: SensorDimensions) {
  const diagonal = getSensorDiagonal(sensor);
  return FULL_FRAME_DIAGONAL / diagonal;
}

export function getEquivalentFocalLength(
  fullFrameFocal: number,
  sensor: SensorDimensions,
) {
  const crop = getCropFactor(sensor);
  return fullFrameFocal / crop;
}

export function getFieldOfView(focalLength: number, sensorDimension: number) {
  return 2 * Math.atan(sensorDimension / (2 * focalLength)) * (180 / Math.PI);
}

export function getEquivalentAperture(
  fullFrameAperture: number,
  sensor: SensorDimensions,
) {
  const crop = getCropFactor(sensor);
  return fullFrameAperture * crop;
}
