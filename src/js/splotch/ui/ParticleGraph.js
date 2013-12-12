define(
       
       ['splotch/anim/clock'],

        function(clock){
    
            function ParticleGraph(scene){
                this.scene = scene;
                this.particles = new THREE.Geometry(),
                this.pMaterial = new THREE.ParticleBasicMaterial({
                      color: 0xFF0000,
                      size: 10
                    });
            }
            
            ParticleGraph.prototype = {
                
                init:function(){
                    console.log('initializing');
                    
                    
                    var self = this;
                    clock.add(function(){
                        self.update();
                    });
                },
                
                add_nodes:function(nodes){
                    this.particleSystem = new THREE.ParticleSystem(this.particles, this.pMaterial);
                    this.scene.add(this.particleSystem);
                    var particle = null;
                    for(var i=0; i < nodes.length; i++){
                       var n = nodes[i];
                       particle = new THREE.Vertex(new THREE.Vector3(n.pos.x, n.pos.y, n.pos.z));
                       this.particles.vertices.push(particle);
                   }
                },
                
                update:function(){},
                
            }
            
            return ParticleGraph;
            }
);