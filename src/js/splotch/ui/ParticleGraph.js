define(
       
       ['splotch/anim/clock'],

        function(clock){
    
            function ParticleGraph(scene){
                this.scene = scene;
                this.particles = new THREE.Geometry(),
                
                this.pMaterial = new THREE.ParticleBasicMaterial({
                      color: 0x155CA9,
                      size: 10
                    });
                
                this.lineMaterial = new THREE.LineBasicMaterial({
                    color: 0xEA560
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
                        //this._connect(n);
                    }
                    
                    this.last_node_count = end;
                },
                
                update:function(){},
                
                _connect:function(node){
                    for(var i=0;i<node.edges.length;i++){
                        var dst_vtx = this.particles.vertices[node.edges[i]];
                        var geometry = new THREE.Geometry();
                        geometry.vertices.push(new THREE.Vector3(node.pos.x, node.pos.y, node.pos.z));
                        geometry.vertices.push(new THREE.Vector3(dst_vtx.x, dst_vtx.y, dst_vtx.z));
                        this.scene.add(new THREE.Line(geometry, this.lineMaterial));
                    }
                },
                
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