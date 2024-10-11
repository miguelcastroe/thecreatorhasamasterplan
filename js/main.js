// Initialize Three.js scene for 3D cityscape
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('city-container').appendChild(renderer.domElement);

// Create the 3D city
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true }); // Neon wireframe

const citySize = 40; // Increase the city grid size for a larger effect
for (let x = -citySize; x < citySize; x += 2) {
    for (let y = -citySize; y < citySize; y += 2) {
        // Create buildings with random heights
        const buildingHeight = Math.random() * 10 + 2; // Random height between 2 and 12
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.scale.y = buildingHeight;
        building.position.set(x, buildingHeight / 2, y); // Adjust building height positioning
        scene.add(building);
    }
}

// Adjust the camera position and angle
camera.position.z = 80; // Pull the camera back for a better view
camera.position.y = 30; // Raise the camera to give a bird's eye view
camera.rotation.x = -0.6; // Tilt the camera downwards for perspective

// Animation loop to rotate the scene
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.002; // Slowly rotate the city around Y-axis
    renderer.render(scene, camera);
}
animate();

// Handle window resizing for responsiveness
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
