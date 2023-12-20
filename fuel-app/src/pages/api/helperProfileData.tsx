let profileDetails = {
  email: undefined,
}
const profile = {
  info: () => {
    return profileDetails
  },
  setInfo: (value: any) => {
    profileDetails = value
  },
}

export default profile
