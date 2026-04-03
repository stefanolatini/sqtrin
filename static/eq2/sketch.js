// hydra » p5 » hydra
H.hide()
H.audio(false)   // disabilita richiesta microfono
noize().out()

let lay1

// testo fisso: [riga sopra, riga sotto]
const textFixed = ['12 HOURS TECHNO & MICROMUSIC PARTY WITH', '11.04.2K26 - 18:00 - CLICK/TAP FOR INFO\nSECRET LOCATION - FREE CAMPING']
const title = 'ERRORE QUADRATO 2.0'

// // substring cliccabile all'interno di textFixed[1]
// const targetSubString = 'DM FOR INFO'

let dmHitBox = null

const startTime = Date.now()
const fadeIn  = () => Math.min(1, Math.max(0, (Date.now() - startTime - 500) / 1000))
let lastElementTime = null
const fadeOut = () => lastElementTime
  ? Math.max(0, 1 - Math.min(1, (Date.now() - lastElementTime - fadeOutInterval) / 1000))
  : 1
const fadeAlpha = () => fadeIn() * fadeOut()
// testo sequenziabile: una riga al centro
const textSequence = [
  ['XCOPY PRO','AMIGA COMMODORE DJ SET (POLAND)'],
  ['GIGI GALLI','TECHNO/ELECTRO VINYL SET'],
  ['B00LEANT','TECHNO LIVE SET'],
  ['MRK','TECHNO VINYL SET'],
  ['ICK_','8BIT BASS TERROR'],
  ['VALENTINA MICELI','TECHNO VINYL SET'],
  ['P.03','ACID LIVE SET'],
  ['GLOTTAL STOP','TECHNO VINYL SET'],
  ['KRISH','ELECTRO LIVE SET'],
  ['ART_EMISIA_666','GLITCH/ANALOG VJ']
]
let textIndex = 0
const textInterval = 4000 // ms tra un cambio e l'altro
const fadeOutInterval = 2000
//const fontUrl = 'http://127.0.0.1:80/wdx.ttf'
const fontUrl = 'fonts/wdx.ttf'

function preload() {
  myFont = loadFont(fontUrl) // metti bsp.ttf nella stessa cartella di index.html
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  angleMode(DEGREES)
  lay1 = createGraphics(windowWidth, windowHeight)
  lay2 = createGraphics(windowWidth, windowHeight)
  synth.s0.initP5()
  synth.s1.initP5(lay1)
  synth.s2.initP5(lay2)

  
  setInterval(() => {
    textIndex = (textIndex + 1) % textSequence.length
    // timeout per il fadeout, disattivato
    /*
    if (textIndex === textSequence.length - 1 && !lastElementTime) {
      lastElementTime = Date.now()
    }*/
  }, textInterval)
}

function draw() {
  // --- sfera con texture hydra ---
  clear()
  orbitControl(10)
  rotateY(frameCount/2)
  rotateX(frameCount/4)
  noStroke()
  texture(H.get())
  sphere(height/7)

  // --- testo su buffer 2D separato ---
  lay1.clear()
  lay2.clear()
  lay1.fill(255)
  lay2.fill(255)
  lay1.textAlign(CENTER, CENTER)
  lay2.textAlign(CENTER, CENTER)
  lay1.textFont(myFont)
  lay2.textFont(myFont)

  // testo fisso: riga sopra e riga sotto
  lay2.textSize(20)
  lay2.text("[[ SQUARE TERROR COLLECTIVE PRESENTA ]]", lay1.width / 2, lay1.height / 2 - 290)
  lay2.textSize(20)
  lay2.text(textFixed[0], lay1.width / 2, lay1.height / 2 - 225)
  lay2.textSize(40)
  lay2.text(title, lay1.width / 2, lay1.height / 2  -260)
  lay2.textSize(20)
  lay2.text(textFixed[1], lay1.width / 2, lay1.height / 2 + 260)

  // // calcola hitbox di targetSubString dentro la prima riga di textFixed[1]
  // const line0 = textFixed[1].split('\n')[0]
  // const idx = line0.indexOf(targetSubString)
  // if (idx !== -1) {
  //   const lineSpacing = 30 * 1.35
  //   const blockCenterY = lay1.height / 2 + 200
  //   const line0CenterY = blockCenterY - lineSpacing / 2
  //   const fullLineW = lay2.textWidth(line0)
  //   const beforeW   = lay2.textWidth(line0.substring(0, idx))
  //   const targetW   = lay2.textWidth(targetSubString)
  //   dmHitBox = {
  //     x: lay1.width / 2 - fullLineW / 2 + beforeW,
  //     y: line0CenterY - 15,
  //     w: targetW,
  //     h: 30
  //   }
  // }

  // testo sequenziabile: al centro (titolo + descrizione)
  lay1.textSize(50)
  lay1.text(textSequence[textIndex][0], lay1.width / 2, lay1.height / 2 - 30)
  lay1.textSize(22)
  lay1.text(textSequence[textIndex][1], lay1.width / 2, lay1.height / 2 + 10)
}

function keyPressed() {
  if(key == 'S') H2.save()
}

function mouseClicked() {
  // non aprire se un modale è aperto, o se ne è stato chiuso uno da meno di 350ms
  if (window.isModalOpen && window.isModalOpen()) return
  if (window._modalClosedAt && Date.now() - window._modalClosedAt < 350) return
  window.showPasswordPrompt()
}

// touchEnded copre gli in-app browser (Instagram, TikTok, ecc.) che su iOS
// non generano eventi 'click' sul canvas — solo eventi touch nativi
function touchEnded() {
  if (window.isModalOpen && window.isModalOpen()) return
  if (window._modalClosedAt && Date.now() - window._modalClosedAt < 350) return
  window.showPasswordPrompt()
  return false  // previene il click sintetico successivo (eviterebbe doppio trigger)
}
  // if (!dmHitBox) return
  // if (
  //   mouseX >= dmHitBox.x && mouseX <= dmHitBox.x + dmHitBox.w &&
  //   mouseY >= dmHitBox.y && mouseY <= dmHitBox.y + dmHitBox.h
  // ) {
  //   window.showContactModal(contactHTML)
  // }
//}

var H2 = HY5.hydra('h2', 'synth')
H2.pixelDensity(2)
H2.zIndex(2)

synth.shape([4,5,6].fast(0.1).smooth(1),0.0001,[0.2,0.7].smooth(1))
.color(0.2,0.4,0.3)
.scrollX(()=>Math.sin(time*0.27))
.add(
  shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.5,0.3].smooth(1))
  .color(0.6,0.2,0.5)
  .scrollY(0.35)
  .scrollX(()=>Math.sin(time*0.33)))
.add(
  shape([4,5,6].fast(0.1).smooth(1),0.00001,[0.2,0.7,1.3].smooth(1))
  .color(0.2,0.4,0.6)
  .scrollY(-0.35)
  .scrollX(()=>Math.sin(time*0.41)*-1))
.add(
  src(o0).shift(0.0001,0.01,0.001)
  .scrollX([0.05,-0.05].fast(0.1).smooth(1))
  .scale([1.05,0.9].fast(0.3).smooth(1),[1.01,0.8,1].fast(0.09).smooth(1))
  ,0.85)
.modulate(voronoi(20,2,1))
.luma(0)
.brightness([-.14,-.1].smooth().fast(.15))
.out(o0)

synth.src(synth.s1)
//.modulateScale(noize(5), .5)
//.modulateVoronoi(3,0.15)
//.modulateScale(synth.src(synth.o1),.01).modulateScale(noize(6).scale(1.1), .06)
.out(synth.o1)

synth.src(synth.s2)
//.modulateScale(noize(5), .5)
//.modulateVoronoi(350,0.15)
//.modulateScale(synth.src(synth.o3).scale(1.01), .01).modulateScale(noize(4.4), .1)
//.modulate(voronoi(10,2,1))
//.modulate(voronoi(5,2,1))
.out(synth.o3)

/*
synth.voronoi(350,0.15)
  	.modulateScale(osc(8).rotate(Math.sin(time)),.5)
  	.thresh(.8)
	.modulateRotate(osc(7),.4)
	.thresh(.7)
  	.diff(src(o0).scale(1.8))
	.modulateScale(osc(2).modulateRotate(synth.o2,.74))
	.diff(src(o0).rotate([-.012,.01,-.002,0]).scrollY(0,[-1/199800,0].fast(0.7)))
	.brightness([-.12,-.17].smooth().fast(.5))
	.out(synth.o2)
*/

/*
voronoi(200,0.15)
  	.modulateScale(osc(.02).rotate(Math.sin(time)),.5)
  	.thresh(.7)
	.modulateRotate(osc(10,10),.1)
	.thresh(.5)
  	.diff(src(o0).scale(2.8))
	.modulateScale(osc(2).modulateRotate(synth.o2,.074))
	.diff(src(o0).rotate([-.0012,.001,-0.03,0]).scrollY(0,[-1/112180,0].fast(.70)))
	.brightness([-.92,-.87].smooth().fast(.5))
    .brightness(0.2)
	.out(synth.o2)
*/

// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
//corrupted screensaver
//by Ritchse
//instagram.com/ritchse
 
voronoi(350,0.15)
  	.modulateScale(osc(8).rotate(Math.sin(time)),5)
  	.thresh(.7)
	.modulateRotate(osc(10),.06)
	.thresh(.2)
  	.diff(src(synth.o2).scale(20.8))
	.modulateScale(osc(1).modulateRotate(synth.o2,.74))
	.diff(src(synth.o2).rotate([-.012,.01,-.0002,0]).scrollY(0,[-1/199800,0].fast(0.7)))
	.brightness([-.42,-0.1].smooth().fast(10))
	.out(synth.o2)


voronoi(350,0.15)
  	.modulateScale(osc(8).rotate(Math.sin(time)),.5)
  	.thresh(.8)
	.modulateRotate(osc(1),.04)
	.thresh(.1)
  	.diff(src(synth.o2).scale(1.8))
	.modulateScale(osc(2).modulateRotate(synth.o2,.74))
	.diff(src(synth.o2).rotate([-.012,.01,-.00002,0]).scrollY(0,[-1/199800,0].fast(0.7)))
	.brightness([-.15,-.97].smooth().fast(.5))
	.out(synth.o2)


shape([4,5,6].fast(0.9).smooth(.2),0.000001,[0.2,0.7].smooth(1))
.color(0.2,0.4,0.3)
.scrollX(()=>Math.sin(time*0.27))
.add(
  shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.5,0.3].smooth(1))
  .color(0.6,0.2,0.5)
  .scrollY(0.35)
  .scrollX(()=>Math.sin(time*0.33)))
.add(
  shape([4,5,6].fast(0.1).smooth(1),0.0001,[0.2,0.7,0.3].smooth(1))
  .color(0.2,0.4,0.6)
  .scrollY(-0.35)
  .scrollX(()=>Math.sin(time*0.41)*-1))
.add(
      src(o0).shift(0.001,0.01,0.001)
      .scrollX([0.05,-0.05].fast(0.1).smooth(1))
      .scale([1.05,0.9].fast(0.3).smooth(1),[1.05,0.9,1].fast(0.29).smooth(1))
      ,0.85)
.modulate(voronoi(10,2,2))
.luma(.19)
.out(synth.o2)

/*osc(5,.1).modulate(noise(6),.22).diff(o0)
  	.modulateScrollY(osc(.1).modulate(osc().rotate(2.2),.11))
	.scale(.72).color(0.99,1.014,1)
.modulateRotate(noise(10),1)
.saturate(0)
.brightness(-.1)
.luma(.2)*/
osc(5,.1).modulate(noise(6),.22).diff(o0)
  	.modulateScrollY(osc(.1).modulate(osc().rotate(2.2),.11))
	.scale(.72).color(0.99,1.014,1)
.modulateRotate(noise(11),1)
.brightness(-.7)
.contrast(.6)
.luma(.1)
.saturate(0)
.scale(0.6)
	.brightness([-.02,-.13].smooth().fast(.5))
.out(synth.o2)


// sfera (s0) + testo sovrapposto (s1) + modulazione con forme (o0)
synth.src(synth.o2).blend(src(synth.s0),.1)
//.diff(src(synth.o2),1)
//
.layer(synth.src(synth.s0).color(1,1,1,() => fadeAlpha())).modulateScale(synth.src(synth.s0).scale(1.31), 2)
//
.layer(synth.src(synth.o3).color(1,1,1,() => fadeAlpha()))
.layer(synth.src(synth.o1).color(1,1,1,() => fadeAlpha())).modulateScale(synth.src(synth.s0).scale(1.01), 1)
//.diff(src(synth.o1),1)
  .out()

