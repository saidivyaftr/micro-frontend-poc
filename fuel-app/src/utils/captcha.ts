export const validateCaptcha = async (
  recaptchaRef: any,
  skipCaptcha = false,
) => {
  try {
    if (skipCaptcha) return true
    const grecaptcha: any = recaptchaRef?.current?.props?.grecaptcha
    await recaptchaRef?.current?.executeAsync()
    const recatpchaResponse = grecaptcha?.getResponse?.()
    await recaptchaRef?.current?.reset()
    return Boolean(recatpchaResponse)
  } catch (error) {
    return false
  }
}
