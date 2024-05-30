import { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload, { UploadFile } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

const meta: Meta<typeof Upload> = {
  title: 'Components/Upload',
  id: 'Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
    source: {
      type: 'code',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultFiles: UploadFile[] = [
  {
    uid: '1717048776447upload-file',
    status: 'success',
    name: 'pima-indians-diabetes.data',
    size: 23104,
    percent: 0,
  },
  {
    uid: '1717048791271upload-file',
    status: 'uploading',
    name: '逻辑回归-糖尿病预测.html',
    size: 726482,
    percent: 18,
  },
  {
    uid: '1717048832356upload-file',
    status: 'error',
    name: '逻辑回归-糖尿病预测.ipynb',
    size: 416475,
    percent: 0,
  },
]

export const ASimpleUpload: Story = () => (
  <Upload
    defaultFileList={defaultFiles}
    action="https://run.mocky.io/v3/e6c886a0-fe7e-4336-9faa-3da7b7242911"
  >
    <Button size="lg" btnType="primary">
      <Icon icon="upload" /> 点击上传{' '}
    </Button>
  </Upload>
)
ASimpleUpload.storyName = '普通的 Upload 组件'

export const BCheckUpload: Story = () => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big')
      return false
    }
    return true
  }
  return (
    <Upload
      action="https://run.mocky.io/v3/e6c886a0-fe7e-4336-9faa-3da7b7242911"
      beforeUpload={checkFileSize}
    >
      <Button size="lg" btnType="primary">
        <Icon icon="upload" /> 不能传大于50Kb！{' '}
      </Button>
    </Upload>
  )
}
BCheckUpload.storyName = '上传前检查文件大小'
export const CDragUpload: Story = () => (
  <Upload
    action="https://run.mocky.io/v3/e6c886a0-fe7e-4336-9faa-3da7b7242911"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br />
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
)
CDragUpload.storyName = '拖动上传'
