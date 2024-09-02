export default
`
varying vec2 vRipple;

void main() {
    // Set alpha to a fixed translucent value (e.g., 0.5)
    float alpha = 0.9; 

    gl_FragColor = vec4(vec3(0.11, .678, .878), alpha);
}`;