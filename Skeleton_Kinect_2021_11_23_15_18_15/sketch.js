// global variable for joints 
let joints = [];

function setup() {
  // canvas is same resolution as rgb kinect image
  createCanvas(640,576);
  pixelDensity(1);
  
  // create an instance of kinectron 
  // see https://kinectron.github.io/#/api/gesstarted
  let kinectron = new Kinectron("d70d-173-56-10-205.ngrok.io");
  kinectron.setKinectType("azure");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(drawBodies);
}

// this function is called when program receives data from the kinect 
function drawBodies(bodies) { 
  // put the joints in a global function 
  joints = bodies.skeleton.joints;
}


 let leftHand0 = {
      //5 SHOULDER_LEFT
      shoulder: joints[4],
      //6 ELBOW_LEFT
      elbow: joints[5],
      //7 WRIST_LEFT
      wrist: joints[6],
      //8 HAND_LEFT
      hand: joints[7],
      // 9 HANDTIP_LEFT
      handTip: joints[8],
      //10 THUMB_LEFT
      thumb: joints[9],
    };
    
    let rightHand0 = {
      //12 SHOULDER_RIGHT	
      shoulder: joints[11],
      //13 ELBOW_RIGHT
      elbow: joints[12],
      //7 WRIST_RIGHT
      wrist: joints[13],
      //8 HAND_RIGHT
      hand: joints[14],
      // 9 HANDTIP_RIGHT
      handTip: joints[15],
      //10 THUMB_RIGHT
      thumb: joints[16],
    };

function canCreateFireball(leftHand, rightHand, leftEye, rightEye, armDistanceThreshold){
  
  //OLD: 
  //console.log(leftHand.thumb.colorY < leftHand.wrist.colorY);
  //console.log('wrist: ',leftHand.wrist);
  //let v0 = createVector(leftHand.handTip.colorX, leftHand.handTip.colorY);
  //let v1 = createVector(leftHand.wrist.colorX, leftHand.wrist.colorY);
  //angleMode(DEGREES);
  //let testAngle1 = v0.angleBetween(v1);
  //console.log('test angle: ', testAngle1);
  //console.log('x wrist: ',leftHand.wrist.colorX);
  
//   if(
//       leftHand.handTip.cameraX < leftHand.thumb.cameraX 
//     ){
//      }
  
  
  let leftUpright = (
    leftHand.handTip.colorY < leftEye.colorY &&
    (leftHand.shoulder.colorX - leftHand.handTip.colorX) <= armDistanceThreshold);
  
  let rightUpright = (
    rightHand.handTip.colorY < rightEye.colorY &&
    (rightHand.shoulder.colorX - rightHand.handTip.colorX) <= armDistanceThreshold);
  
  return leftUpright && rightUpright ? true : false; 
  
}


function drawArms(leftHand, rightHand){
  
  stroke('black');
  strokeWeight(5);
  
  // Left Side
  {
    line(
    leftHand.handTip.colorX*width,
    leftHand.handTip.colorY*height,
    leftHand.hand.colorX*width,
    leftHand.hand.colorY*height);
  
  
    line(
    leftHand.hand.colorX*width,
    leftHand.hand.colorY*height,
    leftHand.wrist.colorX*width,
    leftHand.wrist.colorY*height);
  
  
  line(
    leftHand.wrist.colorX*width,
    leftHand.wrist.colorY*height,
    leftHand.elbow.colorX*width,
    leftHand.elbow.colorY*height);
  
   line(
    leftHand.elbow.colorX*width,
    leftHand.elbow.colorY*height,
    leftHand.shoulder.colorX*width,
    leftHand.shoulder.colorY*height);
  
    
   line(
    leftHand.shoulder.colorX*width,
    leftHand.shoulder.colorY*height,
    leftHand.clavicle.colorX*width,
    leftHand.clavicle.colorY*height);
    
  }
  
  // Right Side
  {
    
     
    line(
    rightHand.handTip.colorX*width,
    rightHand.handTip.colorY*height,
    rightHand.hand.colorX*width,
    rightHand.hand.colorY*height
  );

  
    line(
    rightHand.hand.colorX*width,
    rightHand.hand.colorY*height,
    rightHand.wrist.colorX*width,
    rightHand.wrist.colorY*height
  );
  
  
  line(
    rightHand.wrist.colorX*width,
    rightHand.wrist.colorY*height,
    rightHand.elbow.colorX*width,
    rightHand.elbow.colorY*height
  );
  
   line(
    rightHand.elbow.colorX*width,
    rightHand.elbow.colorY*height,
    rightHand.shoulder.colorX*width,
    rightHand.shoulder.colorY*height
  );
  
    
   line(
    rightHand.shoulder.colorX*width,
    rightHand.shoulder.colorY*height,
    rightHand.clavicle.colorX*width,
    rightHand.clavicle.colorY*height
  );
  }  
}



function drawTorso(neck, leftClavicle, rightClavicle, chest, naval, pelvis){
  stroke('black');
  strokeWeight(5);
  
  line(
    leftClavicle.colorX*width,
    leftClavicle.colorY*height, 
    neck.colorX*width, 
    neck.colorY*height
  );
  
  line(
    rightClavicle.colorX*width,
    rightClavicle.colorY*width, 
    neck.colorX*width, 
    neck.colorY*height
  );
  
//  line(
//   neck.colorX*width,
//   neck.colorY*width, 
//   chest.colorX*width, 
//   chest.colorY*height
//  );
  
//   line(
//     chest.colorX*width,
//     chest.colorY*width, 
//     naval.colorX*width, 
//     naval.colorY*height
//    );
  
  
}


function draw() {
   background('gray');

  // loop through the joints 
  for (let i = 0; i < joints.length; i++ ) {
    
    let leftEye = joints[27];
    let rightEye = joints[29];
    
    let leftHand = {
      //4 CLAVICLE
      clavicle: joints[4],
      //5 SHOULDER_LEFT
      shoulder: joints[5],
      //6 ELBOW_LEFT
      elbow: joints[6],
      //7 WRIST_LEFT
      wrist: joints[7],
      //8 HAND_LEFT
      hand: joints[8],
      // 9 HANDTIP_LEFT
      handTip: joints[9],
      //10 THUMB_LEFT
      thumb: joints[10],
    };
    
    let rightHand = {
      // 11 Clavicle
      clavicle: joints[11],
      //12 SHOULDER_RIGHT	
      shoulder: joints[12],
      //13 ELBOW_RIGHT
      elbow: joints[13],
      //7 WRIST_RIGHT
      wrist: joints[14],
      //8 HAND_RIGHT
      hand: joints[15],
      // 9 HANDTIP_RIGHT
      handTip: joints[16],
      //10 THUMB_RIGHT
      thumb: joints[17],
    };
    
    let armSpaceThreshold = 0.35;
    if(canCreateFireball(leftHand, rightHand, leftEye, rightEye, armSpaceThreshold)){
      
      let rightX = rightHand.handTip.colorX * width;
      let rightY = rightHand.handTip.colorY * height;
      
      let leftX = leftHand.handTip.colorX * width;
      let leftY = leftHand.handTip.colorY * height;
      
      let midPtX = ( rightX - leftX )/2;
      let midPtY = (rightY - leftY )/2;
      let rad = midPtX*0.75;
      noStroke();
      fill('red');
      ellipse(leftX+midPtX, leftY+midPtY, rad, rad);
    }
  
    
    //Draw General Skeleton
    
    //drawArms(leftHand, rightHand);

    let neck = joints[3];
    let chest = joints[2];
    let naval = joints[1];
    let pelvis = joints[0];
    
    //drawTorso(neck, leftHand.clavicle, rightHand.clavicle, chest, naval, pelvis);
    
    const x = joints[i].colorX * width;
    const y = joints[i].colorY * height;
    
    // draw circles for each joint
    fill('black');
    
    if(i === 9 || i === 16){
      fill('yellow');
      ellipse(x,y,12)
    }
    else{
          ellipse(x,y,10);
    }
    
    
  }
}