export default
`
attribute vec2 ripple;
varying vec2 vRipple;

void main() {
    vRipple = ripple;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;