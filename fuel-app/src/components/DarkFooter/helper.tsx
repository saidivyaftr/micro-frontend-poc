import {
  FacebookWhite,
  LinkedInWhite,
  TwitterWhite,
  YoutubeWhite,
  LinkIcon,
  SocialMailIcon,
} from '@/shared-ui/react-icons'

export const formatData = ({
  field,
  footer_copy_rights,
  footer_rights_reserved,
  social_media_links,
  sub_footer_links,
  serviceable = {},
}: any) => {
  const bottomLinks = sub_footer_links?.links?.map(({ name, path }: any) => ({
    title: name,
    href: path?.url,
  }))
  const socialMediaLinks = social_media_links?.social_media_links?.map(
    ({ name, path }: any) => {
      return {
        icon: getIcon(name),
        title: name,
        href: path?.url,
      }
    },
  )
  const links = field?.main_links?.map(({ title, items }: any) => {
    return {
      title,
      children: items?.map(({ name, path }: any) => ({
        title: name?.value,
        href: path?.url,
      })),
    }
  })
  const serviceableData = {
    label: serviceable?.label?.value || '',
    placeholder: serviceable?.placeholder?.value || '',
  }
  const finalData: any = {}
  if (footer_copy_rights) {
    finalData['copyRights'] = `${footer_copy_rights?.value || ''}${
      footer_rights_reserved?.value || ''
    }`
  }
  finalData['socialMediaLinks'] = socialMediaLinks
  finalData['bottomLinks'] = bottomLinks
  finalData['links'] = links
  finalData['serviceable'] = serviceableData
  return finalData
}

export const getIcon = (name: string) => {
  switch (name) {
    case 'Twitter':
      return <TwitterWhite />
    case 'Facebook':
      return <FacebookWhite />
    case 'LinkedIn':
      return <LinkedInWhite />
    case 'YouTube':
      return <YoutubeWhite />
    case 'ExternalLink':
      return <LinkIcon />
    case 'Mail':
      return <SocialMailIcon />
  }
}
