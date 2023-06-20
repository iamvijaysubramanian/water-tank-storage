// Function to calculate the units of water stored
function calculateWaterUnits(heights) {
  const n = heights.length;
  let leftMax = 0;
  let rightMax = 0;
  let left = 0;
  let right = n - 1;
  let units = 0;

  while (left <= right) {
    if (heights[left] <= heights[right]) {
      if (heights[left] >= leftMax) {
        leftMax = heights[left];
      } else {
        units += leftMax - heights[left];
      }
      left++;
    } else {
      if (heights[right] >= rightMax) {
        rightMax = heights[right];
      } else {
        units += rightMax - heights[right];
      }
      right--;
    }
  }

  return units;
}

// Function to generate SVG shape representing the blocks and water
function generateSVGShape(heights, waterUnits) {
  const maxBlockHeight = Math.max(...heights);
  const svgWidth = 400;
  const svgHeight = 200;
  const blockWidth = svgWidth / heights.length;
  const blockHeightRatio = svgHeight / maxBlockHeight;
  const waterHeight = waterUnits / svgWidth;

  let svgShape = `<rect width="${svgWidth}" height="${svgHeight}" fill="#eee" />`;

  heights.forEach((height, index) => {
    const blockX = index * blockWidth;
    const blockY = svgHeight - height * blockHeightRatio;

    svgShape += `<rect x="${blockX}" y="${blockY}" width="${blockWidth}" height="${
      height * blockHeightRatio
    }" fill="#999" />`;
  });

  svgShape += `<rect width="${svgWidth}" height="${waterHeight}" fill="#0000FF" opacity="0.5" />`;

  return svgShape;
}

// Event listener for the calculate button
document.getElementById("calculate-btn").addEventListener("click", function () {
  const heightsInput = document.getElementById("heights-input");
  const waterSvg = document.getElementById("water-svg");
  const waterUnitsOutput = document.getElementById("water-units");

  const heights = heightsInput.value.split(",").map(Number);
  const waterUnits = calculateWaterUnits(heights);

  const svgShape = generateSVGShape(heights, waterUnits);

  waterSvg.innerHTML = svgShape;
  waterUnitsOutput.innerText = `Water Units: ${waterUnits} Units`;
});
