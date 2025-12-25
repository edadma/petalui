import { useEffect, useRef, useState, type ChangeEvent, type SyntheticEvent } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button, Card, Col, FileInput, Row, Select, Space, Typography } from '@aster-ui/prefixed'
import { Demo } from '../components/Demo'

// @example-imports: { type ChangeEvent, type SyntheticEvent, useEffect, useRef, useState } from 'react'
// @example-imports: ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
// @example-imports: 'react-image-crop/dist/ReactCrop.css'
// @example-imports: { Button, Card, Col, FileInput, Row, Select, Space, Typography } from 'asterui'
export function ImageCropperDemo() {
  // @example-include
  const defaultImage = '/valley.png'
  const aspectOptions = [
    { label: 'Free', value: 'free' },
    { label: '1:1', value: '1' },
    { label: '4:3', value: String(4 / 3) },
    { label: '16:9', value: String(16 / 9) },
  ]

  const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) =>
    centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 80,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    )

  const [imageSrc, setImageSrc] = useState(defaultImage)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const [aspectValue, setAspectValue] = useState('1')
  const imageRef = useRef<HTMLImageElement | null>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const aspect = aspectValue === 'free' ? undefined : Number(aspectValue)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const nextSource = typeof reader.result === 'string' ? reader.result : defaultImage
      setImageSrc(nextSource)
    }
    reader.readAsDataURL(file)
  }

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    if (!aspect) return
    const { naturalWidth, naturalHeight } = event.currentTarget
    setCrop(centerAspectCrop(naturalWidth, naturalHeight, aspect))
  }

  const handleAspectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setAspectValue(value)
    if (value === 'free' || !imageRef.current) return
    const { naturalWidth, naturalHeight } = imageRef.current
    setCrop(centerAspectCrop(naturalWidth, naturalHeight, Number(value)))
  }

  const handleReset = () => {
    setImageSrc(defaultImage)
    setAspectValue('1')
    setCrop(undefined)
    setCompletedCrop(null)
  }

  const handleDownload = () => {
    if (!previewCanvasRef.current) return
    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'crop.png'
      link.click()
      URL.revokeObjectURL(url)
    })
  }

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imageRef.current) return
    const canvas = previewCanvasRef.current
    const image = imageRef.current
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pixelRatio = window.devicePixelRatio || 1
    canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio)
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    )
  }, [completedCrop])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="w-full">
        <Space direction="vertical" size="lg" className="w-full">
          <Space justify="between" align="center" className="w-full">
            <Typography.Title level={4}>Image Cropper</Typography.Title>
            <Space size="sm">
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button color="primary" onClick={handleDownload} disabled={!completedCrop?.width}>
                Download Crop
              </Button>
            </Space>
          </Space>
          <Row gutter={16}>
            <Col xs={24} lg={14}>
              <Card title="Crop" className="h-full">
                <Space direction="vertical" size="md" className="w-full">
                  <Space direction="vertical" size="xs" className="w-full">
                    <Typography.Text className="text-sm font-medium">Image Source</Typography.Text>
                    <FileInput accept="image/*" onChange={handleFileChange} />
                  </Space>
                  <Space direction="vertical" size="xs" className="w-full">
                    <Typography.Text className="text-sm font-medium">Aspect Ratio</Typography.Text>
                    <Select value={aspectValue} onChange={handleAspectChange}>
                      {aspectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Space>
                  <div className="rounded-box border border-base-300 bg-base-100 p-3">
                    <ReactCrop
                      crop={crop}
                      onChange={(nextCrop) => setCrop(nextCrop)}
                      onComplete={(nextCrop) => setCompletedCrop(nextCrop)}
                      aspect={aspect}
                      ruleOfThirds
                    >
                      <img
                        ref={imageRef}
                        src={imageSrc}
                        alt="Crop source"
                        onLoad={handleImageLoad}
                      />
                    </ReactCrop>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card title="Preview" className="h-full">
                <Space direction="vertical" size="md">
                  <div className="aspect-square w-full rounded-box border border-base-300 bg-base-200 p-3 flex items-center justify-center">
                    {completedCrop?.width ? (
                      <canvas ref={previewCanvasRef} className="max-h-full max-w-full" />
                    ) : (
                      <Typography.Text className="text-sm" type="secondary">
                        Drag to draw a crop.
                      </Typography.Text>
                    )}
                  </div>
                  <Typography.Text className="text-sm" type="secondary">
                    The preview updates as you adjust the crop.
                  </Typography.Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </Space>
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}
