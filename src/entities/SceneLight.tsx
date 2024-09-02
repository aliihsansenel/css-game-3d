function SceneLight() {
  return (
    <>
      <hemisphereLight args={[0xffffbb, 0x080820, 1.0]} />
      <directionalLight
        intensity={1.0} 
        position={[20, 20, 30]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={70}
        shadow-camera-left={-100}
        shadow-camera-right={50}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* <fog attach="fog" args={['#aea6a6', 1.0, 20]} /> */}
    </>
  )
}

export default SceneLight