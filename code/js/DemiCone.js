function creerDemiCone(MaScene, position, couleur, rayonBase, hauteur) {
  // Géométrie du cône entier
  const coneGeometry = new THREE.CylinderGeometry(
      rayonBase, 
      0, // Rayon du haut
      hauteur, // Hauteur du cône
      32,
      1, // Segments en hauteur
      true, // Ouvrir le cône
      0, // Angle de départ
      Math.PI // On prend seulement la moitié de la circonférence pour faire un demi-cône
  );

  const coneMaterial = new THREE.MeshPhongMaterial({
    color: couleur,
    side: THREE.DoubleSide, // Visible des deux côtés
  });

  // Mesh du cône
  const cone = new THREE.Mesh(coneGeometry, coneMaterial);

  // Rotation pour coucher le cône horizontalement
  cone.rotation.x = Math.PI / 2;
  cone.rotation.z = Math.PI / 2;

  // Positionnement du cône
  cone.position.set(position.x, position.y, position.z);
  cone.castShadow = true; 
  cone.receiveShadow = true;

  MaScene.add(cone);
}
