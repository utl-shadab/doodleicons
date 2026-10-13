import { RocketIcon } from "doodle-icon-react/icons/rocket";
const valid = (
  <RocketIcon partColors={{ flame: "#ff0000", window: "#0000ff" }} />
);
// @ts-expect-error The rocket has no "camera" part.
const invalidPart = <RocketIcon partColors={{ camera: "#fff" }} />;
// @ts-expect-error Animation is not supported by the static package.
const invalidAnimation = <RocketIcon animation="bounce" />;
// @ts-expect-error Arbitrary style strings are not supported.
const invalidStyle = <RocketIcon iconStyle="glossy-3d" />;
void [valid, invalidPart, invalidAnimation, invalidStyle];
