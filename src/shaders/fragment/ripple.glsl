export default
`
uniform float uTime;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(vec3(0.90), 1.0);
    // gl_FragColor = vec4(vec3(step(0.5, vUv.x)), 1.0);
}`;