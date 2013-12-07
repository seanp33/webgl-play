define(
       [
        'splotch/anim/clock'
       ],
       
       function(clock){
    
        function Baller(position, material, scene){
            this.position = position;
            this.material = material;
            this.scene = scene;
            this.sphere = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material );
        }
        
        Baller.prototype = {
        
            init:function(){
                this.sphere.position = this.position;
                this.scene.add(this.sphere);
                
                var position = { x : this.position.x, y: this.position.y };
                var target = { x : this.position.x+100, y: this.position.y+300 };
                var tween = new TWEEN.Tween(position)
                    .to(target, 500)
                    .repeat(Infinity)
                    .yoyo(true)
                    .easing(TWEEN.Easing.Circular.InOut);
                
                var self = this;
                tween.onUpdate(function(){
                    self.sphere.position.x = position.x;
                    self.sphere.position.y = position.y;
                });
                
                tween.onComplete(function(){
                    //
                });
                
                tween.start();
                
                clock.add(function(){
                    self.update();
                });
            },
            
            update:function (){
                //console.log("TWEEN.update");
                TWEEN.update();
            }
            
        };
        
        return Baller;
});