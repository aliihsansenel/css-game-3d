interface HUDTextProps {
  text: string;
}

function HUDText({ text }: HUDTextProps) {
  return (
    <div>{text}</div>
  );
}

export default HUDText;