define(
       
       ['splotch/anim/clock'],

        function(clock){
    
            function ParticleGraph(scene){
                this.scene = scene;
                this.particles = new THREE.Geometry(),
                //this.particles.dynamic = true;
                this.pMaterial = new THREE.ParticleBasicMaterial({
                      color: 0xFF0000,
                      size: 10
                    });
            }
            
            ParticleGraph.prototype = {
                
                init:function(){
                    console.log('initializing');
                    
                    this.particleSystem = new THREE.ParticleSystem(this.particles, this.pMaterial);
                    this.particleSystem.sortParticles = true;
                    this.particleSystem.geometry.dynamic = true;
                    this.scene.add(this.particleSystem);                    
                    this._fill_system(100000);
                    var self = this;
                    clock.add(function(){
                        self.update();
                    });
                },
                
                add_nodes:function(nodes){
                    var particle = null;
                    var start = this.last_node_count || 0;
                    var end = nodes.length+start;
                    console.log(start + ' to ' + end);
                    for(var i=start; i < end; i++){
                        var n = nodes[i-start];
                        var p = this.particles.vertices[i];
                        p.set(n.pos.x, n.pos.y, n.pos.z);
                    }
                    
                    this.last_node_count = end;
                },
                
                update:function(){},
                
                _fill_system:function(size){
                    for(var i=0; i < size; i++){
                       particle = new THREE.Vector3(0, 0, 0);
                       this.particles.vertices.push(particle);
                    }
                }
                
            }
            
            return ParticleGraph;
            }
);