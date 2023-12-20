import { ComponentStory, ComponentMeta } from '@storybook/react'
import ImagePerk from './ImagePerk'
import { Typography, Button } from '@/shared-ui/components'
import Icon from '@/shared-ui/react-icons/check-mark-red'

export default {
  title: 'Components/ImagePerk',
  component: ImagePerk,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ImagePerk>

const Template: ComponentStory<typeof ImagePerk> = (args) => (
  <ImagePerk {...args} />
)

export const ImagePerkStories = Template.bind({})
ImagePerkStories.args = {
  content:
    ((
      <>
        <img src="https://dummyimage.com/104x48.jpg" alt="Logo text" />
        <Typography tagType="h3" styleType="h3">
          Lorem ipsum dolor sit amet
        </Typography>
        <Typography tagType="p" styleType="p1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </Typography>
        <ul>
          <li>
            <Icon />
            <Typography tagType="p" styleType="p1">
              Lorem ipsum dolor sit amet
            </Typography>
          </li>
          <li>
            <Icon />
            <Typography tagType="p" styleType="p1">
              Lorem ipsum dolor sit amet
            </Typography>
          </li>
          <li>
            <Icon />
            <Typography tagType="p" styleType="p1">
              Lorem ipsum dolor sit amet
            </Typography>
          </li>
        </ul>
        <Button text="Learn more" type="link" />
      </>
    ),
    (<></>)),

  tabletBackgroundImage: {
    src: 'https://dummyimage.com/1023x300.jpg',
    alt: 'img alt text mobile',
  },
  backgroundColor: 'primary',
}

export const ImagePerkRight = Template.bind({})
ImagePerkRight.args = {
  content: (
    <>
      <img src="https://dummyimage.com/104x48.jpg" alt="Logo text" />
      <Typography tagType="h3" styleType="h3">
        Lorem ipsum dolor sit amet
      </Typography>
      <Typography tagType="p" styleType="p1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.
      </Typography>
      <ul>
        <li>
          <Icon />
          <Typography tagType="p" styleType="p1">
            Lorem ipsum dolor sit amet
          </Typography>
        </li>
        <li>
          <Icon />
          <Typography tagType="p" styleType="p1">
            Lorem ipsum dolor sit amet
          </Typography>
        </li>
        <li>
          <Icon />
          <Typography tagType="p" styleType="p1">
            Lorem ipsum dolor sit amet
          </Typography>
        </li>
      </ul>
      <Button text="Learn more" type="link" />
    </>
  ),
  tabletBackgroundImage: {
    src: 'https://dummyimage.com/1023x300.jpg',
    alt: 'img alt text mobile',
  },
  backgroundColor: 'primary',
  contentAlign: 'right',
}
