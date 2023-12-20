import PrepareForInstallationCard from 'src/libs/account/welcome/components/PrepareForInstallationCard'
import { useAppData } from 'src/hooks'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import { prepareForInstallationCard, welcomePageData } from '../../mock-data'
jest.mock('src/hooks')
import { shallowWithMock } from 'src/__utils__'

describe('PrepareForInstallationCard', () => {
  it('should render correctly with context value', () => {
    ;(useAppData as any).mockImplementation(() => prepareForInstallationCard)
    const InformationComponent = () => (
      <WelcomePageContextProvider value={welcomePageData}>
        <PrepareForInstallationCard />
      </WelcomePageContextProvider>
    )
    const wrapper = shallowWithMock(InformationComponent, {})
    expect(wrapper.html()).toBeTruthy()

    expect(
      wrapper.find({
        children: prepareForInstallationCard.installationTitle.value,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: prepareForInstallationCard.servicesTitle.value,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: prepareForInstallationCard.techInstall.list[0].title.value,
      }),
    ).toMatchSnapshot()
  })
})
