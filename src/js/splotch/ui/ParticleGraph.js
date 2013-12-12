define(
       
       ['splotch/anim/clock'],

        function(clock){
    
            function ParticleGraph(scene){
                this.scene = scene;
                this.particles = new THREE.Geometry(),
                this.pMaterial = new THREE.ParticleBasicMaterial({
                      color: 0xFFFFFF,
                      size: 20
                    });
            }
            
            ParticleGraph.prototype = {
                
                init:function(){
                    // 1. generate particles?
                    // 2. add to scene
                },
                
                update:function(){},
                
            }
            
            return ParticleGraph;
            }
);