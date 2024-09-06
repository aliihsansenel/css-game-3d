import { useRef } from "react"

// import vertexWater from "../shaders/vertex/water.glsl";
// import fragmentWater from "../shaders/fragment/water.glsl";
import { Group, PlaneGeometry } from "three";
import { WaterProps } from "../entities/entities";
import { MeshReflectorMaterial } from "@react-three/drei";

function Water(props: WaterProps) {
  const groupRef = useRef<Group>(null!);
  const waterGeomRef = useRef<PlaneGeometry>(null!);

  const width = 20;
  const height = 20;
  // const sf = 3;

  // useEffect(() => {
  //   if (waterGeomRef.current) {
  //     const bufferGeom = waterGeomRef.current;
  //     const ripplettribute = bufferGeom.getAttribute('ripple');
  //     for ( let i = 0; i < ripplettribute.count; i+= 1 ) {
  //       ripplettribute.setXY( i, 1.0, 1.0);
  //     }
  //     ripplettribute.needsUpdate = true;
  //   }
  // }, [waterGeomRef])
  
  return (
    <group {...props}
      rotation={[-Math.PI / 2.0, 0, 0]}
      ref={groupRef}
    >
      <mesh>
        <planeGeometry ref={waterGeomRef} args={[width, height, 1, 1]} >
          {/* <float32BufferAttribute attach='attributes-ripple' 
            args={[ 
              new Float32Array((width * sf + 1) * (height * sf + 1) * 2), 2]}>
          </float32BufferAttribute> */}
        </planeGeometry>
        {/* <shaderMaterial 
          vertexShader={vertexWater} 
          fragmentShader={fragmentWater}
          transparent={true}
          opacity={0.5} // Set opacity to 50% for blending
        /> */}
        <MeshReflectorMaterial
          color={[0.11, .678, .878]}
          blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
          mixBlur={0} // How much blur mixes with surface roughness (default = 1)
          mixStrength={1} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={512} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1.4} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          distortion={1} // Amount of distortion based on the distortionMap texture
          transparent
          opacity={0.9} // Set opacity to 50% for blending
          reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
    </group>
  )
}

export default Water;