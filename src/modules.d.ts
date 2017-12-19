interface AvatarPosition {
  x: number;
  y: number;
}
interface PAvatarEditor {
  image: string;
  height: number;
  width: number;
  border?: number;
  position?: AvatarPosition;
  scale?: number;
  onPositionChange?: (position: AvatarPosition) => void;
  crossOrigin?: "anonymous" | "use-credentials";
}
declare class AvatarEditor extends React.Component<PAvatarEditor>{
  getImage(): HTMLCanvasElement;
  getImageScaledToCanvas(): HTMLCanvasElement;
}
declare module "react-avatar-editor" {
  export default AvatarEditor;
}
