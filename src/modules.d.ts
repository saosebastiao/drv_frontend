interface PAvatarEditor {
  image: string;
  height: number;
  width: number;
  scale?: number;

}
declare class AvatarEditor extends React.Component<PAvatarEditor>{ }
declare module "react-avatar-editor" {
  export default AvatarEditor;
}