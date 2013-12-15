define(
    [
        'splotch/anim/clock',
        'splotch/ui/Baller',
        'splotch/ui/ParticleGraph',
        'splotch/ui/Avatar',
        'splotch/ui/AvatarController',
        'signals/Signals'
    ],

    function (clock, Baller, ParticleGraph, Avatar, AvatarController, Signal) {

        var container, stats;
        var camera, controls, scene, renderer, plane, avatar, baller, particle_graph;


        function animate() {            
            render();
            stats.update();
        }

        function render() {
            controls.update();
            renderer.render(scene, camera);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function Viewport() {
            this.$ready = new Signal();
            this.$error = new Signal();
        }

        Viewport.prototype = {
            init:function () {
                container = document.getElementById("content");
    
                scene = new THREE.Scene();
    
                this._init_camera();
                
                this._init_lights();
                
                this._init_ground_plane();
                
                this._init_renderer();
    
                this._init_avatar();
                
                this._init_baller();
                
                this._init_particle_graph();
                
                this._init_controls();
                
                this._init_stats();
                
                window.addEventListener('resize', onWindowResize, false);
                
                clock.add(animate);
                clock.start();
            },
            
            _init_camera:function(){
                camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
                camera.position.z = 1500;
                camera.position.y = 800;        
            },
            
            _init_lights:function(){
                
                var spot = new THREE.SpotLight(0xffffff, 1.5);
                spot.position.set(0, 500, 2000);
                spot.castShadow = true;
    
                spot.shadowCameraNear = 200;
                spot.shadowCameraFar = camera.far;
                spot.shadowCameraFov = 50;
    
                spot.shadowBias = -0.00022;
                spot.shadowDarkness = 0.5;
    
                spot.shadowMapWidth = 2048;
                spot.shadowMapHeight = 2048;
    
                scene.add(spot);
                
                scene.add(new THREE.AmbientLight(0x505050));
            },
            
            _init_ground_plane:function(){
                plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 8, 8), new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.25, transparent: true, wireframe: true }));
                plane.rotation.x = -Math.PI / 2;
                scene.add(plane);
            },
            
            _init_renderer:function(){
                renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.sortObjects = false;
                renderer.setSize(window.innerWidth, window.innerHeight);
    
                renderer.shadowMapEnabled = true;
                renderer.shadowMapType = THREE.PCFShadowMap;
    
                container.appendChild(renderer.domElement);    
            },
            
            _init_avatar:function(){
                var mat = {color: 0xff66ff, linewidth: 1, transparent: true};
                avatar = new Avatar({width: 300, length: 300}, new THREE.Vector3(0, 0, 0), mat, scene, true);
                avatar.init();
    
                //avatar, ground, camera, scene, domElement, activatorKey
                avatarController = new AvatarController(avatar, plane, camera, scene, renderer.domElement, 'shiftKey');
                avatarController.init();   
            },
            
            _init_baller:function(){
                baller = new Baller(new THREE.Vector3(0, 200, 0), scene);
                baller.init();
            },
            
            _init_particle_graph:function(){
                particle_graph = new ParticleGraph(scene);
                particle_graph.init();    
            },
            
            _init_controls:function(){
                controls = new THREE.TrackballControls(camera, document, 'shiftKey');
                controls.rotateSpeed = 1.0;
                controls.zoomSpeed = 1.2;
                controls.panSpeed = 0.8;
                controls.noZoom = false;
                controls.noPan = false;
                controls.staticMoving = true;
                controls.dynamicDampingFactor = 0.3;    
            },
            
            _init_stats:function(){
                stats = new Stats();
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.top = '0px';
                container.appendChild(stats.domElement);  
            },
            
            feed_particles:function(nodes){
                if(particle_graph){
                    particle_graph.add_nodes(nodes);
                }
            }
        }
        
        return Viewport;
    }
)
;
