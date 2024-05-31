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
  /**
   * 必选参数, 上传的地址
   */
  action: string
  /**
   * 上传的文件列表
   * */
  defaultFileList?: UploadFile[]
  /**
   * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。
   * */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**
   * 文件上传时的钩子
   * */
  onProgress?: (percentage: number, file: UploadFile) => void
  /**
   * 文件上传成功时的钩子
   * */
  onSuccess?: (data: any, file: UploadFile) => void
  /**
   * 文件上传失败时的钩子
   * */
  onError?: (err: any, file: UploadFile) => void
  /**
   * 文件状态改变时的钩子，上传成功或者失败时都会被调用
   * */
  onChange?: (file: UploadFile) => void
  /**
   * 文件列表移除文件时的钩子
   * */
  onRemove?: (file: UploadFile) => void
  /**
   * 设置上传的请求头部
   * */
  headers?: { [key: string]: any }
  /**
   * 上传的文件字段名
   * */
  name?: string
  /**
   * 上传时附带的额外参数
   * */
  data?: { [key: string]: any }
  /**
   * 支持发送 cookie 凭证信息
   * */
  withCredentials?: boolean
  /**
   * 可选参数, 接受上传的文件类型
   * */
  accept?: string
  /**
   * 是否支持多选文件
   * */
  multiple?: boolean
  /**
   * 是否支持拖拽上传
   * */
  drag?: boolean
  children?: React.ReactNode
}

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'rosebush-react'
 * ~~~
 */
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

  const uploadFiles = (files: FileList, test?: boolean) => {
    let postFiles = Array.from(files)
    if (test) {
      console.log('drag', postFiles[0])
    }
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
              onProgress(percentage, _file)
            }
          }
        },
      })
      .then((resp) => {
        console.log(resp)
        updateFileList(_file, { status: 'success', response: resp.data })
        if (onSuccess) {
          onSuccess(resp.data, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
      .catch((err) => {
        console.log(err)
        updateFileList(_file, { status: 'error', error: err })

        if (onError) {
          onError(err, _file)
        }
        if (onChange) {
          onChange(_file)
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
