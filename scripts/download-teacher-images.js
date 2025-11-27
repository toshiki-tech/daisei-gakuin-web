const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

// 使用 picsum.photos 生成占位图（随机图片）
// 或者使用 placeholder.com 作为备选
const usePicsum = true
const picsumBaseUrl = 'https://picsum.photos'
const placeholderBaseUrl = 'https://via.placeholder.com'
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'teachers')

// 确保目录存在
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

// 需要下载的图片列表
// 使用固定的seed确保每次下载相同的图片
const images = [
  { filename: 'teacher-chinese-1.jpg', seed: 101 },
  { filename: 'teacher-chinese-2.jpg', seed: 102 },
  { filename: 'teacher-chinese-3.jpg', seed: 103 },
  { filename: 'teacher-japanese-1.jpg', seed: 201 },
  { filename: 'teacher-japanese-2.jpg', seed: 202 },
  { filename: 'teacher-english-1.jpg', seed: 301 },
  { filename: 'teacher-english-2.jpg', seed: 302 },
]

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    const protocol = url.startsWith('https') ? https : http

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // 处理重定向
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject)
      }

      if (response.statusCode !== 200) {
        file.close()
        fs.unlinkSync(filepath)
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }

      response.pipe(file)

      file.on('finish', () => {
        file.close()
        console.log(`✓ Downloaded: ${path.basename(filepath)}`)
        resolve()
      })

      file.on('error', (err) => {
        file.close()
        fs.unlinkSync(filepath)
        reject(err)
      })
    }).on('error', (err) => {
      file.close()
      fs.unlinkSync(filepath)
      reject(err)
    })
  })
}

async function downloadAll() {
  console.log('开始下载讲师占位图...\n')

  for (const img of images) {
    // 优先使用picsum.photos，如果失败则使用placeholder.com
    let url
    if (usePicsum) {
      url = `${picsumBaseUrl}/seed/${img.seed}/400/400`
    } else {
      url = `${placeholderBaseUrl}/400x400/BB3A2E/FFFFFF?text=Teacher`
    }
    const filepath = path.join(imagesDir, img.filename)

    try {
      await downloadImage(url, filepath)
    } catch (error) {
      // 如果picsum失败，尝试placeholder
      if (usePicsum) {
        console.log(`  ${img.filename} 尝试备用方案...`)
        const fallbackUrl = `${placeholderBaseUrl}/400x400/BB3A2E/FFFFFF?text=Teacher`
        try {
          await downloadImage(fallbackUrl, filepath)
        } catch (fallbackError) {
          console.error(`✗ 下载失败 ${img.filename}:`, fallbackError.message)
        }
      } else {
        console.error(`✗ 下载失败 ${img.filename}:`, error.message)
      }
    }
  }

  console.log('\n完成！所有图片已保存到:', imagesDir)
}

downloadAll().catch(console.error)

