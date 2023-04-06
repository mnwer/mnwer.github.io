clock = new THREE.Clock();		
mixers=[]

scene=new THREE.Scene()
scene.background=new THREE.Color( 0x0D1117 );

var camera = new THREE.PerspectiveCamera(40,1, 0.5, 130);
camera.position.set(0,4,0)

renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000, 1.0);
renderer.setSize(350,350);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0,0,-10);
scene.add(light);

gltf=new THREE.GLTFLoader()
gltf.load("models/robot_playground.glb",function(obj){
	obj.scene.position.set(0,0,-5)
	camera.lookAt(0,0.5,-5)
	scene.add(obj.scene)
	document.getElementById("center").remove()
	document.body.style.overflow="scroll"
	setTimeout(function(){addText(document.getElementById("title"),"Hi, I am Mnwer")},200)
	obj.animations.forEach((animation) => {
		mixer = new THREE.AnimationMixer(obj.scene);
		action = mixer.clipAction(animation);
		action.play();
		mixers[mixers.length]=mixer
	});			
	update()
})

function update(){
	delta = clock.getDelta();
	mixers.forEach((mixer)=>{
		mixer.update(delta)	
	})
	renderer.render(scene,camera)
	window.requestAnimationFrame(update)
}
