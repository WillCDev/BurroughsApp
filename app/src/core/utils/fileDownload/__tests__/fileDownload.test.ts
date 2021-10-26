import * as fdModule from '../fileDownload'

const fileDownload = fdModule.default

let blobSpy: jest.SpyInstance
jest.useFakeTimers()

window.URL = {
  createObjectURL: jest.fn(),
  revokeObjectURL: jest.fn(),
} as any
window.webkitURL = {
  createObjectURL: jest.fn(),
  revokeObjectURL: jest.fn(),
} as any

const createObjectURLMock = window.URL.createObjectURL as jest.Mock
const revokeObjectURLMock = window.URL.revokeObjectURL as jest.Mock
const webkitCreateObjectURLMock = window.webkitURL.createObjectURL as jest.Mock
const webkitRevokeObjectURLMock = window.webkitURL.revokeObjectURL as jest.Mock

describe('fileDownload', () => {
  beforeEach(() => {
    blobSpy = jest
      // eslint-disable-next-line
      // @ts-ignore
      .spyOn(global, 'Blob')
      .mockImplementationOnce(
        () => ({ size: 1024, type: 'application/pdf' } as any)
      )
    blobSpy.mockClear()
  })
  afterEach(() => {
    jest.runAllTimers()
    createObjectURLMock.mockClear()
    revokeObjectURLMock.mockClear()
    webkitCreateObjectURLMock.mockClear()
    webkitRevokeObjectURLMock.mockClear()
  })

  describe('Blob', () => {
    it('should create a blob from just the data if no "bom" is passed', () => {
      fileDownload('fileData', 'mockName.png', 'fakeMime')
      expect(blobSpy).toHaveBeenNthCalledWith(1, ['fileData'], {
        type: 'fakeMime',
      })
    })

    it('should create a blob from bom and the data if "bom" is passed', () => {
      fileDownload('fileData', 'mockName.png', 'fakeMime', 'fakeBOM')
      expect(blobSpy).toHaveBeenNthCalledWith(1, ['fakeBOM', 'fileData'], {
        type: 'fakeMime',
      })
    })

    it('should set the mimeType to application/octet-stream by default', () => {
      fileDownload('fileData', 'mockName.png')
      expect(blobSpy).toHaveBeenNthCalledWith(1, ['fileData'], {
        type: 'application/octet-stream',
      })
    })
  })

  describe('IE Workaround', () => {
    it('should use the msSaveBlob method if it is defined', () => {
      window.navigator.msSaveBlob = jest.fn()
      fileDownload('fileData', 'mockName.png')
      const blob = blobSpy.mock.results[0]!.value
      expect(window.navigator.msSaveBlob).toHaveBeenLastCalledWith(
        blob,
        'mockName.png'
      )
      expect(createObjectURLMock).not.toHaveBeenCalled()
      expect(webkitCreateObjectURLMock).not.toHaveBeenCalled()
    })
  })

  describe('All other Browsers', () => {
    const w = window as any

    beforeEach(() => {
      delete w.navigator.msSaveBlob
    })

    describe('Legacy Browsers', () => {
      let windowURLStash: any
      beforeAll(() => {
        windowURLStash = w.URL
        delete w.URL
      })
      afterAll(() => {
        w.URL = windowURLStash
      })

      it('should use the webkitURL API if the URL APi is not available', () => {
        fileDownload('fileData', 'mockName.png')
        const blob = blobSpy.mock.results[0]!.value
        expect(createObjectURLMock).not.toHaveBeenCalled()
        expect(webkitCreateObjectURLMock).toHaveBeenLastCalledWith(blob)
      })

      it('should revoke the download url once the download has been initiated', () => {
        fileDownload('fileData', 'mockName.png')
        jest.advanceTimersByTime(0)
        expect(webkitRevokeObjectURLMock).not.toHaveBeenCalled()
        jest.advanceTimersByTime(200)
        expect(webkitRevokeObjectURLMock).toHaveBeenCalled()
      })
    })

    describe('Modern Browsers', () => {
      it('should use the URL API to create the download URL', () => {
        fileDownload('fileData', 'mockName.png')
        const blob = blobSpy.mock.results[0]!.value
        expect(createObjectURLMock).toHaveBeenLastCalledWith(blob)
        expect(webkitCreateObjectURLMock).not.toHaveBeenCalled()
      })

      it('should revoke the download url once the download has been initiated', () => {
        fileDownload('fileData', 'mockName.png')
        jest.advanceTimersByTime(199)
        expect(revokeObjectURLMock).not.toHaveBeenCalled()
        jest.advanceTimersByTime(200)
        expect(revokeObjectURLMock).toHaveBeenCalled()
      })
    })

    describe('Download Link', () => {
      it('should be a hidden anchor tag with the href set to the blobURL', () => {
        createObjectURLMock.mockReturnValueOnce('mockBlobURL')
        fileDownload('fileData', 'mockName.png')
        const [link] = window.document.body.querySelectorAll('a')
        expect(link!.style.display).toBe('none')
        expect(link!.href).toBe('http://localhost/mockBlobURL')
        expect(link!.download).toBe('mockName.png')
        expect(link!.target).toBe('')
      })

      it('should have _blank target if the download attribute is unsupported', () => {
        createObjectURLMock.mockReturnValueOnce('mockBlobURL')
        const mock = jest
          .spyOn(fdModule, 'hasDownloadAttribute')
          .mockReturnValueOnce(true)
        fileDownload('fileData', 'mockName.png')
        const [link] = window.document.body.querySelectorAll('a')
        expect(link!.download).toBe('mockName.png')
        expect(link!.target).toBe('_blank')
        mock.mockRestore()
      })

      it('should be removed after the download has initiated', () => {
        fileDownload('fileData', 'mockName.png')
        jest.advanceTimersByTime(199)
        let links = window.document.body.querySelectorAll('a')
        expect(links).toHaveLength(1)
        jest.advanceTimersByTime(200)
        links = window.document.body.querySelectorAll('a')
        expect(links).toHaveLength(0)
      })
    })
  })
})
