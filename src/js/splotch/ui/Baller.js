define([], function(){
    

    function Baller(center, material, scene){
        this.center = center;
        this.material = material;
        this.scene = scene;
        this.sphere = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material );
    }
    
    Baller.prototype = {
    
        init:function(){
            THREE.GeometryUtils.center(this.sphere.geometry);
            this.scene.add(this.sphere);
        }    
    };
    
    return Baller;
});