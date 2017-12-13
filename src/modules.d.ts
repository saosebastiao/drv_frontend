interface PAvatarEditor {
  image: string;

}
declare class AvatarEditor extends React.Component<PAvatarEditor>{ }
declare module "react-avatar-editor" {
  export default AvatarEditor;
}