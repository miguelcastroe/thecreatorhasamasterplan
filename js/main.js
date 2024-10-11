// Initialize Three.js scene for 3D cityscape
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('city-container').appendChild(renderer.domElement);

// Create the 3D city
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true }); // Neon wireframe

const citySize = 20; // Controls the size of the city (number of buildings)
for (let x = -citySize; x < citySize; x += 2) {
    for (let y = -citySize; y < citySize; y += 2) {
        // Create buildings with random heights
        const buildingHeight = Math.random() * 5 + 1; // Random height between 1 and 6
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.scale.y = buildingHeight;
        building.position.set(x, buildingHeight / 2, y);
        scene.add(building);
    }
}

camera.position.z = 50; // Move camera back to see the city
camera.position.y = 20; // Elevate the camera for a better view
camera.rotation.x = -0.4; // Tilt the camera slightly

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.002; // Slowly rotate the city for effect
    renderer.render(scene, camera);
}
animate();

// Handle window resizing for responsiveness
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
