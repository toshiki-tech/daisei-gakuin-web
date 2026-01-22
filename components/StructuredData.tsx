import { ReactNode } from 'react'

interface StructuredDataProps {
  data: object | object[]
}

/**
 * 结构化数据组件，用于在页面中插入 JSON-LD 数据
 */
export default function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data]
  
  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
