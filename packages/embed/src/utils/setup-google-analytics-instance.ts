const GA_TYPE_MESSAGE = 'ga-client-id'

const sendGaIdMessage = (embedId: string, gaClientId: string, iframe: HTMLIFrameElement) => {
  const data = { embedId, gaClientId }
  setTimeout(() => {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: GA_TYPE_MESSAGE, data }, '*')
    }
  }, 0)
}

export const setupGoogleAnalyticsInstance = (iframe: HTMLIFrameElement, embedId: string) => {
  let gaObject: any

  // Throw an error if the feature is enabled but ga is not found
  try {
    gaObject = window[(window as any).GoogleAnalyticsObject]

    gaObject((tracker: { get: (clientId: string) => string }) => {
      const gaClientId = tracker.get('clientId')
      sendGaIdMessage(embedId, gaClientId, iframe)
    })
  } catch (e) {
    // eslint-disable-next-line
    console.error(`Whoops! You enabled the shareGoogleAnalyticsInstance feature but the google analytics object has not been found.
      Make sure to include Google Analytics Javascript code before the Typeform Embed Javascript code in your page. Error: ${e}`)
  }
}
