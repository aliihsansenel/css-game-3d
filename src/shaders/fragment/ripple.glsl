export default
`
precision mediump float;

uniform float uTime;
varying vec2 vUv;

// TODO implement [0,1] ranged variable, remove uv
void main() {
    vec2 uv = vUv;

    // Rotation start
    uv -= vec2(0.5);
    float angle = radians(45.0);
    // Apply rotation matrix
    float cosA = cos(angle);
    float sinA = sin(angle);
    mat2 rotationMatrix = mat2(cosA, -sinA, sinA, cosA);
    uv = rotationMatrix * uv;
    uv += vec2(0.5);
    // Rotation end

    vec2 center = vec2(0.5);
    float dist = abs(uv.x - center.x) + abs(uv.y - center.x);
    float timeFactor = mod(uTime * 0.008, 1.0);
    float ripple = (sin((dist - timeFactor) * 600.0) + 1.0) / 2.0;
    float border = 1.0 - smoothstep(0.9, 1.0, dist * 20.0);
    vec4 color = vec4(vec3(0.9), min(border, ripple));

    gl_FragColor = color;
}
`;