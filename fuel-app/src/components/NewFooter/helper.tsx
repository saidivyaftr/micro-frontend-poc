import {
  Facebook,
  LinkedIn,
  Twitter,
  Youtube,
  LinkIcon,
  SocialMailIcon,
} from '@/shared-ui/react-icons'
import { parseCookies } from 'nookies'

export const formatData = (
  {
    field,
    footer_copy_rights,
    footer_rights_reserved,
    social_media_links,
    sub_footer_links,
    legal_notice,
  }: any,
  legalDescription: any,
  nonProspectLegalDescription: any,
) => {
  const bottomLinks = sub_footer_links?.links?.map((link: any) => {
    return {
      title: link?.name,
      href: link.path?.url,
      onClick: link?.onclick?.value ?? null,
    }
  })
  const { frontieramp = false } = parseCookies()
  const isReturningUser = !(!frontieramp || frontieramp != 'true')

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
  const finalData: any = {}
  let legal = legalDescription?.value || legal_notice?.value || ''
  if (!isReturningUser && nonProspectLegalDescription?.value) {
    legal = nonProspectLegalDescription?.value
  }
  finalData['legalText'] = legal
  if (footer_copy_rights) {
    finalData['copyRights'] = `${footer_copy_rights?.value || ''}${
      footer_rights_reserved?.value || ''
    }`
  }
  finalData['socialMediaLinks'] = socialMediaLinks
  finalData['bottomLinks'] = bottomLinks
  finalData['links'] = links
  return finalData
}

export const getIcon = (name: string) => {
  switch (name) {
    case 'Twitter':
      return <Twitter />
    case 'Facebook':
      return <Facebook />
    case 'LinkedIn':
      return <LinkedIn />
    case 'YouTube':
      return <Youtube />
    case 'ExternalLink':
      return <LinkIcon />
    case 'Mail':
      return <SocialMailIcon />
  }
}
