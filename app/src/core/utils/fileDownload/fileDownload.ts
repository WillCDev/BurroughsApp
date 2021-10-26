export const hasDownloadAttribute = (a: HTMLAnchorElement): boolean =>
  typeof a.download === 'undefined'

declare global {
  interface Navigator {
    msSaveBlob?: (blob: Blob, filename: string) => void
  }
}

/**
 * Starts a browser download with the provided data
 *
 * @author https://github.com/kennethjiang/js-file-download
 * @since 1.2.1
 */
export default function fileDownload(
  data: string | ArrayBuffer | ArrayBufferView | Blob,
  filename: string,
  mime?: string,
  bom?: string
): void {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename)
  } else {
    const blobURL =
      window.URL && window.URL.createObjectURL
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob)
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', filename)

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (hasDownloadAttribute(tempLink)) {
      tempLink.setAttribute('target', '_blank')
    }

    document.body.appendChild(tempLink)
    tempLink.click()

    // Fixes "webkit blob resource error 1"
    setTimeout(() => {
      document.body.removeChild(tempLink)
      if (window.URL && window.URL.revokeObjectURL) {
        window.URL.revokeObjectURL(blobURL)
      } else {
        window.webkitURL.revokeObjectURL(blobURL)
      }
    }, 200)
  }
}
