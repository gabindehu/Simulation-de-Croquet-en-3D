 function cameraLumiere(scene,camera){
  camera.up = new THREE.Vector3( 0, 0, 1 );
  var xPos=12;
  
  var yPos=-12;
  var zPos=5;
  var xDir=0;
  var yDir=0;
  var zDir=0;
  camera.position.set(xPos, yPos, zPos);
  camera.lookAt(xDir, yDir, zDir);
}

 function ajoutCameraGui(gui,menuGUI,camera){

 let guiCamera = gui.addFolder("Camera");

 guiCamera.add(menuGUI,"cameraxPos",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));

    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });

 guiCamera.add(menuGUI,"camerayPos",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });

 guiCamera.add(menuGUI,"camerazPos",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });

 guiCamera.add(menuGUI,"cameraZoom",-10,10).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
  });
 
 guiCamera.add(menuGUI,"cameraxDir",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
  });
 // ordonnee de la direction de la camera dans le menu
 guiCamera.add(menuGUI,"camerayDir",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
  });
 // cote de la direction de la camera dans le menu
 guiCamera.add(menuGUI,"camerazDir",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
  });
 }
//*************************************************************
//* 
//        F I N     C A M E R A
//
//*************************************************************

 function lumiere(scene) {
     // Lumière directionnelle pour simuler le soleil
     const lumiereSoleil = new THREE.DirectionalLight(0xffffff, 1); // Couleur blanche, intensité normale
     lumiereSoleil.position.set(60, 30, 30); // Position élevée pour imiter le soleil
     lumiereSoleil.castShadow = true; // Activer les ombres
     lumiereSoleil.shadow.camera.near = 0.1;
     lumiereSoleil.shadow.camera.far = 300;
     lumiereSoleil.shadow.camera.left = -100; // Étendue de la caméra d'ombre
     lumiereSoleil.shadow.camera.right = 100;
     lumiereSoleil.shadow.camera.top = 100;
     lumiereSoleil.shadow.camera.bottom = -100;
     lumiereSoleil.shadow.mapSize.set(2048, 2048); // Résolution des ombres

     let target = new THREE.Object3D(); // Créer un objet pour la cible
     target.position.set(5,40 ,0 ); // Définir la position de la cible

     lumiereSoleil.target = target; // Associer la lumière à la cible

     scene.add(lumiereSoleil);

     // Lumière ambiante pour ajouter un éclairage global doux
     const lumiereAmbiante = new THREE.AmbientLight(0xffffff, 0.5); // Lumière blanche douce
     scene.add(lumiereAmbiante);
 }

