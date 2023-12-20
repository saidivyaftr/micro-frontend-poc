import * as nextImage from 'next/image';
import * as nextFutureImage from "next/future/image";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
}
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => <img {...props} />
});
const OriginalImage = Image.default;
Object.defineProperty(Image, 'default', {
  configurable: true,
  value: props => <OriginalImage {...props} unoptimized />,
});

