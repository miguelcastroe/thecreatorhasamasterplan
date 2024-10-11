// Initialize Three.js scene for 3D grid
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('grid-container').appendChild(renderer.domElement);

// Create a grid of boxes
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const gridSize = 10;

for (let x = -gridSize; x < gridSize; x++) {
    for (let y = -gridSize; y < gridSize; y++) {
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.set(x, y, 0);
        scene.add(box);
    }
}

camera.position.z = 20;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.x += 0.005;
    scene.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// Handle keyboard navigation
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '1' && key <= '7') {
        // Handle section switch based on number key (01 to 07)
        const sectionId = `#section-${key}`;
        document.querySelector(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
        // Handle arrow key scrolling (up or down)
        window.scrollBy({
            top: key === 'ArrowUp' ? -window.innerHeight : window.innerHeight,
            behavior: 'smooth'
        });
    }
});

// Responsive handling for Three.js when window resizes
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
