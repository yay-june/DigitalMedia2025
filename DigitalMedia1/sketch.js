function setup() {
  createCanvas(600,1000);
  background(220); 

  //Example 1:
  ellipse(180, 200, 100, 100); 
  rect(250, 150, 100, 100); 

  //Example 2:
  fill(255, 0, 0, 150); 
  noStroke();
  ellipse(180, 400, 150); 

  fill(0, 255, 0, 150);
  noStroke();
  ellipse(220, 480, 150); 

  fill(0, 0, 255, 150); 
  noStroke();
  ellipse(120, 480, 150);
  
  //example 3:
  fill(255, 255, 0); 
  arc(150, 700, 100, 100, radians(30), radians(330), PIE); 
  fill(255, 0, 0); 

  arc(250, 700, 100, 100, PI, 0, CHORD); 
  rect(200, 700, 100, 50); 
  
  fill(255); 
  ellipse(230, 700, 20, 20); 
  ellipse(270, 700, 20, 20); 
  
  fill(0, 0, 255); 
  ellipse(230, 700, 10, 10); 
  ellipse(270, 700, 10, 10); 

  //example 4:
  fill(0, 128, 0); 
  noStroke();
  ellipse(200, 900, 200); 

  noFill();
  stroke(255); 
  strokeWeight(10);
  ellipse(200, 900, 200); 

  fill(255, 0, 0); 
  noStroke();
  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = radians(-90 + i * 144); 
    let x = 200 + cos(angle) * 80; 
    let y = 900 + sin(angle) * 80;
    vertex(x, y);
    angle = radians(-90 + (i + 0.5) * 144); 
    x = 200 + cos(angle) * 40; 
    y = 900 + sin(angle) * 40;
    vertex(x, y);
  }
  endShape(CLOSE);

}
