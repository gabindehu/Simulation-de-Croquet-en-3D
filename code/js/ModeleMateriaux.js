// primitive avec Phong
function surfPhong(geom,coulD,opacite,bolTrans,coulSpe,brillance, coulEmissif){
 let Material = new THREE.MeshPhongMaterial({
   color: coulD,
   opacity: opacite,
   transparent: bolTrans,
   shininess : brillance,
   specular:coulSpe,
   emissive : coulEmissif,
   flatShading: true,
   side: THREE.DoubleSide,
 });
 let maillage = new THREE.Mesh(geom,Material);
 return maillage;
}
