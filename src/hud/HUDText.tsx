import { Html } from '@react-three/drei';
import React from 'react';

interface HUDTextProps {
  text: string;
}

function HUDText({ text }: HUDTextProps) {
  return (
    <div>{text}</div>
  );
}

export default HUDText;