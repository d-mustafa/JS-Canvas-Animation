// HTML Canvas

// Canvas Setup
var cnv = document.getElementById("myCanvas");
var ctx = cnv.getContext("2d");
cnv.width = 400;
cnv.height = 550;

requestAnimationFrame(draw);

// Boat variables
let boat1X = 250;
let boat1XSpeed = -1;
let boat1YSpeed = 1;
let boat1Y = 300;
let boat2X = 100;
let boat2XSpeed = 1;

// cloud, bird, and sun variables
let cloud1X = 250;
let cloud2X = 0;
let cloud1Y = 15;
let cloud2Y = 52;
let bird1X = 50;
let bird2X = 104;

// sky variables -- morning(255, 77, 0) -- day(0, 0, 255) -- night(19,24,98)
let rVal = 255;
let gVal = 77;
let bVal = 0;
let rChange = 0;
let gChange = 0;
let bChange = 0;

// sun & sun reflection variables
let sunY = -40;
let sunX = 200;
let refSunY = 340;
let refSunX = 200;
let sunRG = 255;
let sunB = 0;

function draw() {
  // Land
  ctx.fillStyle = "green";
  ctx.fillRect(0, 150, 400, 550);

  // Sky
  ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
  ctx.fillRect(0, 0, 400, 150);

  // Sun
  const gradSun = ctx.createLinearGradient(0, 0, 0, 150);
  gradSun.addColorStop(0, `rgb(${sunRG}, ${sunRG}, ${sunB}`);
  gradSun.addColorStop(1, `rgb(${sunRG}, 0, ${sunB}`);

  ctx.fillStyle = gradSun;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 30, 0, 2 * Math.PI);
  ctx.fill();

  // River
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(250, 150);
  ctx.lineTo(370, 550);
  ctx.lineTo(30, 550);
  ctx.lineTo(150, 150);
  ctx.lineTo(250, 150);
  ctx.fill();

  // Sun Reflection
  ctx.fillStyle = `rgba(${sunRG}, 0, ${sunB}, 0.5)`;
  ctx.beginPath();
  ctx.arc(refSunX, refSunY, 30, 0, 2 * Math.PI);
  ctx.fill();

  // Clouds
  let cloud = document.getElementById("cloud-img");
  let cloudTwo = document.getElementById("cloud2-img");
  ctx.drawImage(cloud, cloud1X, cloud1Y, 85, 55);
  ctx.drawImage(cloudTwo, cloud2X, cloud2Y, 125, 80);

  // Bird
  let bird = document.getElementById("bird-img");
  ctx.drawImage(bird, bird1X, 0, 65, 50);
  ctx.drawImage(bird, bird2X, 15, 52, 40);

  // PALM TREES
  drawTree(290, 120);
  drawTree(45, 260);

  // Sail boat
  drawBoat(boat1X, boat1Y);
  drawBoat(boat2X, 470);

  // Title
  ctx.fillStyle = "rgb(255,77,0)";
  ctx.font = "18px Trebuchet MS";
  ctx.fillText("River Sunset", 295, 15);

  // Animations
  // boat animation
  boat1X += boat1XSpeed;
  boat1Y += boat1YSpeed;
  boat2X += boat2XSpeed;

  if (boat1X <= 100) {
    boat1XSpeed = 1;
    boat1YSpeed = -1;
  }
  if (boat1X >= 250) {
    boat1XSpeed = -1;
    boat1YSpeed = 1;
  }
  if (boat2X >= 300) {
    boat2XSpeed = -1;
  }
  if (boat2X <= 110) {
    boat2XSpeed = 1;
  }

  // cloud and bird animation
  cloud1X -= 1.5;
  cloud2X--;
  bird1X -= 2;
  bird2X -= 2;

  if (cloud1X <= -80) {
    cloud1X = 450;
    cloud1Y = Math.random() * 80;
  }
  if (cloud2X <= -130) {
    cloud2X = 450;
    cloud2Y = Math.random() * 80;
  }
  if (bird1X <= -70) {
    bird1X = 450;
  }
  if (bird2X <= -70) {
    bird2X = 450;
  }

  // sky animation
  rVal += rChange;
  gVal += gChange;
  bVal += bChange;

  if (rVal >= 255 && gVal >= 77 && bVal <= 0) {
    rChange = -0.25;
    gChange = -0.125;
    bChange = 0.125;
  } else if (rVal <= 19 && gVal <= 24 && bVal >= 98) {
    rChange = 0;
    gChange = 0;
    bChange = 0;
  }

  if (rVal <= 19) {
    rVal = 19;
  }
  if (bVal >= 98) {
    bVal = 98;
  }
  if (gVal <= 24) {
    gVal = 24;
  }

  // sun animation
  sunY += 0.25;
  refSunY -= 0.25;
  sunRG -= 0.25;
  sunB += 0.125;

  if (sunY >= 150) {
    sunY = 150;
  }
  if (refSunY <= 150) {
    refSunY = 150;
  }

  if (sunB >= 50) {
    sunB = 50;
  }
  requestAnimationFrame(draw);
}

// x: 290, y: 120
function drawTree(x, y) {
  // Wood part
  ctx.fillStyle = "brown";
  ctx.fillRect(x, y, 10, 100);

  // Tree Leaves Elements
  let palmTreeLeaf = document.getElementById("palm-tree-leaf");
  let palmTreeLeaf90 = document.getElementById("palm-tree-leaf_90");
  let palmTreeLeaf180 = document.getElementById("palm-tree-leaf_180");
  let palmTreeLeaf270 = document.getElementById("palm-tree-leaf_270");

  // Tree 1 Leaves
  ctx.drawImage(palmTreeLeaf, x + 2, y - 5, 60, 60);
  ctx.drawImage(palmTreeLeaf90, x + 2, y - 50, 60, 60);
  ctx.drawImage(palmTreeLeaf180, x - 50, y - 50, 60, 60);
  ctx.drawImage(palmTreeLeaf270, x - 48, y, 60, 60);
}

// x: 250, y: 300
function drawBoat(x, y) {
  // Sailboat
  ctx.fillStyle = "brown";
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, 1 * Math.PI);
  ctx.fill();

  // Mast
  ctx.lineWidth = 2;
  ctx.strokeStyle = "grey";
  ctx.beginPath();
  ctx.moveTo(x, y); // bottom
  ctx.lineTo(x, y - 40); // top
  ctx.stroke();

  // Flag 1
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(x, y - 50);
  ctx.lineTo(x + 25, y - 10);
  ctx.lineTo(x, y - 10);
  ctx.fill();

  // Flag 2
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(x, y - 50);
  ctx.lineTo(x - 15, y - 20);
  ctx.lineTo(x, y - 20);
  ctx.fill();
}
