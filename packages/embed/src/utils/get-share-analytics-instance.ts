const GA_TYPE_MESSAGE = 'ga-client-id'

export const setupGoogleAnalyticsInstanceSharingFeature = (iframe: HTMLIFrameElement, embedId: string) => {
  const sendGaIdMessage = (gaClientId: string) => {
    const data = { embedId, gaClientId }
    setTimeout(() => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: GA_TYPE_MESSAGE, data }, '*')
      }
    }, 0)
  }

  let gaObject: any

  // Throw an error if the feature is enabled but ga is not found
  try {
    gaObject = window[(window as any).GoogleAnalyticsObject]

    gaObject((tracker: { get: (clientId: string) => string }) => {
      const gaClientId = tracker.get('clientId')
      sendGaIdMessage(gaClientId)
    })
  } catch (e) {
    // eslint-disable-next-line
    console.error(`Whoops! You enabled the shareGoogleAnalyticsInstance feature but the google analytics object has not been found.
      Make sure to include Google Analytics Javascript code before the Typeform Embed Javascript code in your page. Error: ${e}`)
  }
}
