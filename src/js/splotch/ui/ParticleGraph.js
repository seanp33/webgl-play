define(
       
       ['splotch/anim/clock'],

        function(clock){
    
            var EDGE_COUNT = 75000;
            
            function ParticleGraph(scene){
                this.scene = scene;
                this.nodes_geom = new THREE.Geometry();                
                this.nodes_mat = new THREE.ParticleBasicMaterial({
                      color: 0x155CA9,
                      size: 30
                    });
                
                this.edges_geom = new THREE.BufferGeometry();
                this.edges_geom.dynamic = true;
                this.edges_geom.addAttribute( 'position', Float32Array, EDGE_COUNT, 3 );
                
                this.edges_mat = new THREE.LineBasicMaterial({ color:0xF58CA6, linewidth:1});
                this.edges_mesh = null;
            }
            
            ParticleGraph.prototype = {
                
                init:function(){
                    console.log('initializing');
                    
                    this.particleSystem = new THREE.ParticleSystem(this.nodes_geom, this.nodes_mat);
                    this.particleSystem.sortParticles = true;
                    this.particleSystem.geometry.dynamic = true;
                    this.scene.add(this.particleSystem);                    
                    
                    this.edges_mesh = new THREE.Line(this.edges_geom, this.edges_mat, THREE.LinePieces);
                    this.scene.add( this.edges_mesh );
                    
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
                        var idx = i-start;
                        var n = nodes[idx];
                        var p = this.nodes_geom.vertices[i];
                        p.set(n.pos.x, n.pos.y, n.pos.z);
                    }
                    
                    // now that we are positioned, connect all nodes                    
                    for(var i=start; i < end; i++){
                        var idx = i-start;
                        var n = nodes[idx];
                        this._connect(n, i);
                    }
                    
                    this.edges_geom.attributes.position.needsUpdate = true;
                    this.edges_geom.computeBoundingSphere();
                    
                    this.last_node_count = end;
                },
                
                update:function(){},
                
                _connect:function(node, idx){
                    var positions = this.edges_geom.attributes.position.array;
                    for(var i=0;i<node.edges.length;i++){
                        var dst_vtx = this.nodes_geom.vertices[node.edges[i]];
                        var offset = i * idx;
                        //console.log('set ' + offset);
                        positions[ offset * 6 + 0 ] = node.pos.x;
                        positions[ offset * 6 + 1 ] = node.pos.y;
                        positions[ offset * 6 + 2 ] = node.pos.z;
                        positions[ offset * 6 + 3 ] = dst_vtx.x;
                        positions[ offset * 6 + 4 ] = dst_vtx.y;
                        positions[ offset * 6 + 5 ] = dst_vtx.z;
                    }
                },
                
                _fill_system:function(size){
                    for(var i=0; i < size; i++){
                       particle = new THREE.Vector3(0, 0, 0);
                       this.nodes_geom.vertices.push(particle);
                    }
                }
                
            }
            
            return ParticleGraph;
            }
);