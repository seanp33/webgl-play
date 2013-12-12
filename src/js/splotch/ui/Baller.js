define(
       [
        'splotch/anim/clock',
        'text!shaders/SimpleVertex.glsl',
	'text!shaders/SimpleFragment.glsl',
       ],
       
       function(clock, simple_vertex, simple_fragment){
    
        function Baller(position, scene){
            this.position = position;
            this.scene = scene;
            
            var attributes = {
              displacement: {
                  type: 'f', // a float
                  value: [] // an empty array
              }
            };
            
            var baller_mat = new THREE.ShaderMaterial({
                    attributes: attributes,
		    vertexShader:   simple_vertex,
		    fragmentShader: simple_fragment
            });

            this.sphere = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), baller_mat );

            // now populate the array of attributes
            var vertices = this.sphere.geometry.vertices;
            var values = attributes.displacement.value
            for(var v = 0; v < vertices.length; v++) {
                values.push(Math.random() * 30);
            }

        }
        
        Baller.prototype = {
        
            init:function(){
                this.sphere.position = this.position;
                this.scene.add(this.sphere);
                
                var position = { x : this.position.x, y: this.position.y };
                var target = { x : this.position.x, y: this.position.y+300 };
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