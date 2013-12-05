define('splotch/ui/AvatarController', ['splotch/ui/Avatar', 'signals/Signals'],
    function (Avatar, Signal) {

        function AvatarController(avatar, ground, camera, scene, domElement, activatorKey) {

            this.$selectionMade = new Signal();
            this.domElement = domElement;
            var self = this;
            var mouse = new THREE.Vector2();
            var projector = new THREE.Projector();

            var dragging, selectionAvatar, minSelectionPoint, maxSelectionPoint;

            this.controller = {
                onMouseMove: function (event) {
                    if (!event[activatorKey]) return;

                    event.preventDefault();

                    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

                    if (dragging && selectionAvatar) {
                        var vert = selectionAvatar.line.geometry.vertices[2].clone();
                        var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
                        projector.unprojectVector(vector, camera);
                        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
                        var intersects = raycaster.intersectObject(ground);
                        if (intersects.length > 0) {
                            var currentSelectionPoint = intersects[0].point;
                            selectionAvatar.line.worldToLocal(currentSelectionPoint);
                            selectionAvatar.line.geometry.vertices[1].x = currentSelectionPoint.x;
                            selectionAvatar.line.geometry.vertices[2] = currentSelectionPoint;
                            selectionAvatar.line.geometry.vertices[3].y = currentSelectionPoint.y;
                            selectionAvatar.line .geometry.verticesNeedUpdate = true;
                        }
                    }

                },

                onMouseDown: function (event) {
                    if (!event[activatorKey]) return;

                    event.preventDefault();

                    if (!dragging && !selectionAvatar) {
                        dragging = true;
                        console.log('handling mouse down');

                        var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
                        projector.unprojectVector(vector, camera);
                        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
                        var intersects = raycaster.intersectObject(ground);
                        if (intersects.length > 0) {
                            minSelectionPoint = intersects[0].point;
                            var mat = {color: 0xff3300, linewidth: 1, transparent: true};
                            selectionAvatar = new Avatar({width: 20, length: 20}, minSelectionPoint, mat, scene);
                            selectionAvatar.init();
                        }
                    }
                },

                onMouseUp: function (event) {
                    if (!event[activatorKey]) return;

                    event.preventDefault();
                    console.log('handling mouse up');

                    if (dragging && selectionAvatar) {
                        dragging = false;
                        self.$selectionMade.dispatch({min: minSelectionPoint, max: maxSelectionPoint});
                        selectionAvatar.destroy();
                        selectionAvatar = null;
                    }
                },

                onDoubleClick: function (event) {
                    if (!event[activatorKey]) return;
		    event.preventDefault();

		    dragging = false;
		    selectionAvatar.destroy();
		    selectionAvatar = null;
                }
            }
        }

        AvatarController.prototype.init = function () {
            this.domElement.addEventListener('mousemove', this.controller.onMouseMove, false);
            this.domElement.addEventListener('mousedown', this.controller.onMouseDown, false);
            this.domElement.addEventListener('mouseup', this.controller.onMouseUp, false);
            this.domElement.addEventListener('dblclick', this.controller.onDoubleClick, false);
        }

        AvatarController.prototype.destroy = function () {
            this.domElement.removeEventListener('mousemove', this.controller.onMouseMove, false);
            this.domElement.removeEventListener('mousedown', this.controller.onMouseDown, false);
            this.domElement.removeEventListener('mouseup', this.controller.onMouseUp, false);
            this.domElement.removeEventListener('dblclick', this.controller.onDoubleClick, false);
        }

        return AvatarController;
    }
);
