define('splotch/ui/Viewport2',
    [
        'splotch/ui/Avatar',
        'splotch/ui/AvatarController',
        'signals/Signals'
    ],

    function (Avatar, AvatarController, Signal) {

        var container, stats;
        var camera, controls, scene, renderer, clock, plane, avatar;


        function animate() {
            requestAnimationFrame(animate);
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

        function Viewport2() {
            this.$ready = new Signal();
            this.$error = new Signal();
        }

        Viewport2.prototype.init = function () {
            container = document.createElement('div');
            document.body.appendChild(container);

            camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 1500;
            camera.position.y = 800;

            scene = new THREE.Scene();

            scene.add(new THREE.AmbientLight(0x505050));

            var light = new THREE.SpotLight(0xffffff, 1.5);
            light.position.set(0, 500, 2000);
            light.castShadow = true;

            light.shadowCameraNear = 200;
            light.shadowCameraFar = camera.far;
            light.shadowCameraFov = 50;

            light.shadowBias = -0.00022;
            light.shadowDarkness = 0.5;

            light.shadowMapWidth = 2048;
            light.shadowMapHeight = 2048;

            scene.add(light);

            plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 8, 8), new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.25, transparent: true, wireframe: true }));
            plane.rotation.x = -Math.PI / 2;
            scene.add(plane);

            //projector = new THREE.Projector();

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.sortObjects = false;
            renderer.setSize(window.innerWidth, window.innerHeight);

            renderer.shadowMapEnabled = true;
            renderer.shadowMapType = THREE.PCFShadowMap;

            container.appendChild(renderer.domElement);

            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            container.appendChild(stats.domElement);

            window.addEventListener('resize', onWindowResize, false);

            var mat = {color: 0xff66ff, linewidth: 1, transparent: true};
            avatar = new Avatar({width: 300, length: 300}, new THREE.Vector3(0, 0, 0), mat, scene, true);
            avatar.init();

            //avatar, ground, camera, scene, domElement, activatorKey
            avatarController = new AvatarController(avatar, plane, camera, scene, renderer.domElement, 'shiftKey');
            avatarController.init();

            // adding nav controls last to give AvatarController first dibs
            controls = new THREE.TrackballControls(camera, document, 'shiftKey');
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;

            animate();
        };


        return Viewport2;
    }
)
;
