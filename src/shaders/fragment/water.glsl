export default
`
varying vec2 vRipple;

void main() {

    gl_FragColor = vec4(vec3(0.11, .678, .878), vRipple.x);
}`;