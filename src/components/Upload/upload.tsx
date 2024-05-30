import { ChangeEvent, useRef, useState } from 'react'
import Button from '../Button/button'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
// 文件的类型
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent: number
  raw?: File // 源文件
  response?: any
  error?: any
}

export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  children?: React.ReactNode
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
  headers?: { [key: string]: any }
  name?: string
  data?: { [key: string]: any }
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
  drag?: boolean
}

export const Upload = ({
  action,
  defaultFileList,
  children,
  beforeUpload,
  onProgress,
  onSuccess,
  onError,
  onChange,
  onRemove,
  headers,
  name = 'file',
  data,
  withCredentials,
  accept,
  multiple,
  drag,
}: UploadProps) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const updateFileList = (
    updataFile: UploadFile,
    updateObj: Partial<UploadFile> // 更新的内容
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updataFile.uid) {
          return {
            ...file,
            ...updateObj,
          }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      // 情况fileInput的内容
      fileInput.current.value = ''
    }
  }

  // 文件删除逻辑
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      // 上传文件前的逻辑
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result === false) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    // setFileList([_file, ...fileList])
    setFileList((prevList) => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'mutipart/form-data',
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total!) || 0
          if (percentage < 100) {
            //  更新文件列表
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        },
      })
      .then((resp) => {
        console.log(resp)
        updateFileList(_file, { status: 'success', response: resp.data })
        if (onSuccess) {
          onSuccess(resp.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        console.log(err)
        updateFileList(_file, { status: 'error', error: err })

        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }

  console.log(fileList)
  return (
    <div className="rose-upload-component">
      <div
        className="rose-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger onFile={(files) => uploadFiles(files)}>{children}</Dragger>
        ) : (
          children
        )}
        <input
          className="rose-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  )
}

export default Upload
