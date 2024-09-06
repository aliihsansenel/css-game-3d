// import { useFrame, useThree } from '@react-three/fiber';
// import React, { useMemo } from 'react'
// import PostProcessing from 'three/examples/jsm/renderers/common/PostProcessing.js';
// import {
//   gaussianBlur,
//   pass,
//   objectPosition,
// } from 'three/nodes';

// TODO
function UnderWater() {

  // const scene = useThree((state) => state.scene);
  // const camera = useThree((state) => state.camera);
  // const renderer = useThree((state) => state.gl);

  // const postProcessing = useMemo(() => {

  //   const scenePass = pass( scene, camera );
  //   const scenePassColor = scenePass.getTextureNode();
  //   const scenePassDepth = scenePass.getLinearDepthNode().remapClamp( .3, .5 );

  //   const waterMask = objectPosition( camera ).y.greaterThan( 0 );

  //   const scenePassColorBlurred = gaussianBlur( scenePassColor );
  //   scenePassColorBlurred.directionNode = waterMask.select( scenePassDepth, scenePass.getLinearDepthNode().mul( 5 ) );

  //   postProcessing = new PostProcessing( renderer );
  //   postProcessing.outputNode = waterMask.select( scenePassColorBlurred, scenePassColorBlurred.mul( color( 0x74ccf4 ) ));

  //   return postProcessing;
  // }, [scene, camera]);

  // useFrame(() =>{
  //   renderer.render(postProcessing, camera);
  // })

  return (
    <></>
  )
}

export default UnderWater