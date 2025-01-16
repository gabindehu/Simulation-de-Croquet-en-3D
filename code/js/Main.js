const borneVue=30;

function init(){
 let stats = initStats();
 let rendu = new THREE.WebGLRenderer({ antialias: true });
 rendu.shadowMap.enabled = true;
 let scene = new THREE.Scene();   
 let result;
 let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 500);
 rendu.shadowMap.enabled = true;
 rendu.setClearColor(new THREE.Color("#91eff1"));
 rendu.setSize(window.innerWidth, window.innerHeight);
 cameraLumiere(scene,camera);
 lumiere(scene);
 
 let demandeAleaArceau = prompt("Entrez 1 pour pour la position normale des arceaux ou 2 pour que la position des arceaux soit tirée aléatoirement (peut afficher des trajectoires non réalistes) :");
 let bolAleaArceau;

 if (demandeAleaArceau == '2') {
     bolAleaArceau = true; // Position arceaux aléatoire
 } else if (demandeAleaArceau == '1') {
     bolAleaArceau = false;
 }

 while(demandeAleaArceau != "1" && demandeAleaArceau != "2" ){
     demandeAleaArceau = prompt("Entrée invalide. Entrez 1 pour pour la position normale des arceaux ou 2 pour que la position des arceaux soit tirée aléatoirement (peut afficher des trajectoires non réalistes) :");
     if (demandeAleaArceau == '2') {
         bolAleaArceau = true;
     } else if (demandeAleaArceau == '1') {
         bolAleaArceau = false;
     }
 }

 let demandeDifficulte = prompt("Entrez 1 pour le mode débutant ou 2 pour le mode expert :");
 let bolDebutant;

 if (demandeDifficulte == '1') {
     bolDebutant = true;
 } else if (demandeDifficulte == '2') {
     bolDebutant = false;
 }

 while(demandeDifficulte != "1" && demandeDifficulte != "2" ){
     demandeDifficulte = prompt("Entrée invalide. Entrez 1 pour le mode débutant ou 2 pour le mode expert :");
     if (demandeDifficulte === '1') {
         bolDebutant = true;
     } else if (demandeDifficulte === '2') {
         bolDebutant = false;
     }
 }

 // Plan du sol
 const largPlan = 140;
 const hautPlan = 100;
 const nbSegmentLarg = 50;
 const nbSegmentHaut = 50;
 const PlanSolGeometry = new THREE.PlaneGeometry(largPlan, hautPlan, nbSegmentLarg, nbSegmentHaut);

  const materialHerbe = new THREE.MeshStandardMaterial({color:"#165e16",
      roughness: 0.8, // Moins réfléchissant
      metalness: 0, // Pas métallique
  })

 // Crée le plan
 const PlanSol = new THREE.Mesh(PlanSolGeometry, materialHerbe);
 PlanSol.receiveShadow = true;
 PlanSol.position.set(30, 0, 0);
 scene.add(PlanSol);

 camera.position.x=-80;
 camera.position.y=0;
 camera.position.z=20;

 let coulArceau="#ff0000";
 let opaciteArceauPhong = 1;
 let brillanceArceauPhong = 0;
 let coulEmissiveArceauPhong = "#000000";
 let coulSpecArceauPhong = "#808080";

 let rayonCyl = 0.5;
 let hauteurCyl = 0.8;
 let hauteurCylSol = 0.2;
 let hauteurCylHorizontal = 0.4;
 let largeurCylSol = 0.1;
 let hauteurLathe2 = 0.1;
 let largeurLathe2 = 0.1;
 let nbePtsCbe = 200;
 let nbPtsRot = 100;

 //Initialise les positions des cylindres de gauche des arceaux et les arceaux qui sont la liste de leur objets
 let positionArceau1;
 let positionArceau2;
 let positionArceau3;
 let arceau1;
 let arceau2;
 let arceau3;

 //Choisit aléatoirement la position des arceaux si cela a été choisi par l'utilisateur
 if(bolAleaArceau) {
     let variationY = 8; // Variation aléatoire sur Y pour placer les arceaux
     let toleranceAlignement = 2; // Tolérance pour déterminer l'alignement

     // Place les arceaux aléatoirement et renvoie la liste de leur objets dans arceauN et la position de leur cylindre de droite dans positionArceauN
     [arceau1, positionArceau1, arceau2, positionArceau2, arceau3, positionArceau3] = placerArceauxAvecVerification(scene, variationY, toleranceAlignement,coulArceau, rayonCyl,
         hauteurCyl, hauteurCylSol, largeurCylSol,hauteurCylHorizontal,hauteurLathe2,largeurLathe2, nbePtsCbe,
         nbPtsRot, opaciteArceauPhong, brillanceArceauPhong, coulEmissiveArceauPhong , coulSpecArceauPhong);
 }
 else{
     positionArceau1 = new THREE.Vector3(20, 6.6, 0);
     positionArceau2 = new THREE.Vector3(40, -1.7, 0);
     positionArceau3 = new THREE.Vector3(60, 6, 0);

     arceau1 = placerArceau(scene, positionArceau1, coulArceau, rayonCyl, hauteurCyl, hauteurCylSol,largeurCylSol,
         hauteurCylHorizontal,hauteurLathe2,largeurLathe2, nbePtsCbe, nbPtsRot, opaciteArceauPhong, brillanceArceauPhong, coulEmissiveArceauPhong , coulSpecArceauPhong)

     arceau2 = placerArceau(scene, positionArceau2, coulArceau, rayonCyl, hauteurCyl, hauteurCylSol,largeurCylSol,
         hauteurCylHorizontal,hauteurLathe2,largeurLathe2, nbePtsCbe, nbPtsRot, opaciteArceauPhong, brillanceArceauPhong, coulEmissiveArceauPhong , coulSpecArceauPhong)

     arceau3 = placerArceau(scene, positionArceau3, coulArceau, rayonCyl, hauteurCyl, hauteurCylSol,largeurCylSol,
         hauteurCylHorizontal,hauteurLathe2,largeurLathe2, nbePtsCbe, nbPtsRot, opaciteArceauPhong, brillanceArceauPhong, coulEmissiveArceauPhong , coulSpecArceauPhong)
 }

 let centreArceau1 = calculerCentreArceau(positionArceau1, rayonCyl, hauteurCyl, hauteurCylHorizontal);
 let centreArceau2 = calculerCentreArceau(positionArceau2, rayonCyl, hauteurCyl, hauteurCylHorizontal);
 let centreArceau3 = calculerCentreArceau(positionArceau3, rayonCyl, hauteurCyl, hauteurCylHorizontal);

 //Décale le marteau pour qu'il soit aligné avec les deux premiers arceaux pour une trajectoire plus réaliste
 let decalageMarteau = Math.abs(centreArceau1.y) + Math.abs(centreArceau2.y);

 //Le décalage est sur + ou - y en fonction de si l'arceau 1 est à droite ou à gauche de l'arceau 2
 decalageMarteau = 1.55 * decalageMarteau * testArceau1GaucheDroiteDeArceau2(centreArceau1,centreArceau2);

 let rayonBalle = 0.5;
 let largeurTete = 2;

 let origineBalle = new THREE.Vector3(rayonBalle+largeurTete/2,decalageMarteau,rayonBalle);

 let rayonBaseCone = rayonBalle * 2.5;
 let positionCone = new THREE.Vector3(centreArceau3.x + 10, centreArceau3.y + 2  , 0);
 creerDemiCone(scene, positionCone, "#ff7300", rayonBaseCone, 2,0.5); // Demi-cône aligné

 let origineCentreArceau1 = new THREE.Vector3(0,0,0);
 origineCentreArceau1.subVectors(centreArceau1,origineBalle);

 let angleMarteau = origineCentreArceau1.angleTo(new THREE.Vector3(1,0,0));

 let balle;
 let marteau;
 let pointsCbeBez;
 let courbeTrajectoireBalle;
 let cbeGeometry;
 let afficherPtCourbe = false;

 //***********************************************
 //
 //  DEBUT MENU GUI
 //
 //***********************************************
 let gui = new dat.GUI();
 let menuGUI = new function () {
   this.cameraxPos = camera.position.x;
   this.camerayPos = camera.position.y;
   this.camerazPos = camera.position.z;
   this.cameraZoom = 1;
   this.cameraxDir = 30;
   this.camerayDir = 0;
   this.camerazDir = 0;
   this.choixCouleurArceau = 1;
   this.nbPtsCourbe = nbePtsCbe;
   this.nbPtsRotation = nbPtsRot;
   this.rayonCylindreBase = rayonCyl;
   this.hauteurCylindreBase = hauteurCyl;
   this.hauteurLathe1 = hauteurCylSol;
   this.largeurLathe1 = largeurCylSol;
   this.hauteurLathe2 = hauteurLathe2;
   this.largeurLathe2 = largeurLathe2;
   this.opaciteArceau = opaciteArceauPhong;
   this.brillanceArceau = brillanceArceauPhong;
   this.coulEmissiveArceau = coulEmissiveArceauPhong;
   this.coulSpecArceau = coulSpecArceauPhong;
   this.lancerBalle = function () {
       pointsCbeBez = ptsTrajectoire(scene,origineBalle,centreArceau1,centreArceau2,centreArceau3,positionCone, 200,rayonCyl,hauteurCyl,hauteurCylHorizontal,bolDebutant,afficherPtCourbe);
       if(courbeTrajectoireBalle) {
           scene.remove(courbeTrajectoireBalle);
           cbeGeometry = new THREE.BufferGeometry().setFromPoints(pointsCbeBez);
           courbeTrajectoireBalle = new THREE.Line( cbeGeometry, new THREE.LineBasicMaterial({ color : "#ff0000"} ) );
           scene.add(courbeTrajectoireBalle);
       }
       if(courbeTrajectoireBalle && this.afficherCourbe==false) scene.remove(courbeTrajectoireBalle);
       if(balle) scene.remove(balle);
       if(marteau) scene.remove(marteau);
       [balle,marteau] = creerMarteau(scene, decalageMarteau, rayonBalle, largeurTete, angleMarteau, pointsCbeBez,this.rayonCylindreBase,this.hauteurCylindreBase,hauteurCylHorizontal,positionArceau1,positionArceau2,positionArceau3);
   };
   this.afficherCourbe = false;
    
   //pour actualiser dans la scene   
   this.actualisation = function () {
    posCamera();
    reAffichage();
   };
 };
 ajoutCameraGui(gui,menuGUI,camera);

 ajoutArceauGui(gui,menuGUI,scene,arceau1,arceau2,arceau3,positionArceau1,positionArceau2,positionArceau3,coulArceau,hauteurCylHorizontal);

 gui.add(menuGUI, "lancerBalle");
 menuGUI.lancerBalle();

 gui.add(menuGUI, "afficherCourbe").onChange(function (afficherCourbe) {
     if(afficherCourbe){
         cbeGeometry = new THREE.BufferGeometry().setFromPoints(pointsCbeBez);
         courbeTrajectoireBalle = new THREE.Line( cbeGeometry, new THREE.LineBasicMaterial({ color : "#ff0000"} ) );
         scene.add(courbeTrajectoireBalle);
     }
     else{
         if(courbeTrajectoireBalle) scene.remove(courbeTrajectoireBalle);
     }
 });


 gui.add(menuGUI, "actualisation");
 menuGUI.actualisation();


 //***********************************************
 //
 //  F I N     M E N U     G U I
 //
 //***********************************************

 renduAnim();



 function posCamera(){
  camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom),menuGUI.camerayPos*testZero(menuGUI.cameraZoom),menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
  camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
 }

 document.getElementById("webgl").appendChild(rendu.domElement);
   
 rendu.render(scene, camera);

 function reAffichage() {
  setTimeout(function () {
   posCamera();
  }, 200);
  rendu.render(scene, camera);
 }
  function renduAnim() {
    stats.update();
    requestAnimationFrame(renduAnim);
    rendu.render(scene, camera);
  }
  let controls = new THREE.OrbitControls(camera, rendu.domElement);
  controls.rotateSpeed = 0.5;
 
}