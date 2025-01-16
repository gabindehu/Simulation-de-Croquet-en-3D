function fact(n){
	if (n>1)
		return n*fact(n-1);
		else return 1;
}

function Ber(t1,i,n) {
  var val=0;
  switch(i){
    case 0 :  val=Math.pow(1.-t1,n);
              break;
    case n :  val=Math.pow(t1,n);
              break;
    default : val=(fact(n)/fact(i)/fact(n-i)*Math.pow(1.-t1,n-i)*Math.pow(t1,i));
  }
  val=testZero(val);
 	return val.toPrecision(PrecisionArrondi);
}

function ptsBezierTab(tabPt,nb){
    let points = new Array(nb+1);
    for(var k=0;k<=nb;k++){
        let t2=k/nb;
        t2=t2.toPrecision(PrecisionArrondi);
        let v0= new THREE.Vector3(0,0,0);
        v0.addScaledVector(tabPt[0],Ber(t2,0,tabPt.length-1));
        for(var j=1;j<tabPt.length;j++){
            let v1= new THREE.Vector3(0,0,0);
            v1.addScaledVector(tabPt[j],Ber(t2,j,tabPt.length-1));
            v0.add(v1);
        }
        points[k] = new THREE.Vector3(v0.x,v0.y,v0.z);
    }
    return points;
}

