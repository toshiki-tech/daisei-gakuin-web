const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

// 使用 uifaces.co 获取真实人像照片（专业头像）
// 备选方案：randomuser.me 或 i.pravatar.cc
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'teachers')

// 确保目录存在
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

// 需要下载的图片列表
// 使用 uifaces.co 的 API，每个用户ID对应不同的人像
// 格式：https://uifaces.co/api?limit=1&random&gender[]=male 或 gender[]=female
// 或者使用固定的用户ID确保每次下载相同的人像
const images = [
  { 
    filename: 'teacher-chinese-1.jpg', 
    // 使用 randomuser.me API，指定性别和种子确保一致性
    url: 'https://randomuser.me/api/portraits/women/44.jpg' // 女性，适合中文老师
  },
  { 
    filename: 'teacher-chinese-2.jpg', 
    url: 'https://randomuser.me/api/portraits/women/68.jpg' // 女性
  },
  { 
    filename: 'teacher-chinese-3.jpg', 
    url: 'https://randomuser.me/api/portraits/women/32.jpg' // 女性
  },
  { 
    filename: 'teacher-japanese-1.jpg', 
    url: 'https://randomuser.me/api/portraits/women/28.jpg' // 女性，适合日语老师
  },
  { 
    filename: 'teacher-japanese-2.jpg', 
    url: 'https://randomuser.me/api/portraits/men/75.jpg' // 男性
  },
  { 
    filename: 'teacher-english-1.jpg', 
    url: 'https://randomuser.me/api/portraits/men/32.jpg' // 男性，适合英语老师
  },
  { 
    filename: 'teacher-english-2.jpg', 
    url: 'https://randomuser.me/api/portraits/women/47.jpg' // 女性
  },
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
  console.log('开始下载讲师人像占位图...\n')

  for (const img of images) {
    const filepath = path.join(imagesDir, img.filename)

    try {
      await downloadImage(img.url, filepath)
    } catch (error) {
      console.error(`✗ 下载失败 ${img.filename}:`, error.message)
      // 如果 randomuser.me 失败，尝试使用 uifaces.co 作为备用
      console.log(`  尝试备用方案...`)
      try {
        // 使用 uifaces.co 的备用方案
        const fallbackUrl = `https://i.pravatar.cc/400?img=${Math.floor(Math.random() * 70)}`
        await downloadImage(fallbackUrl, filepath)
        console.log(`  ✓ 使用备用方案下载成功: ${img.filename}`)
      } catch (fallbackError) {
        console.error(`  ✗ 备用方案也失败 ${img.filename}:`, fallbackError.message)
      }
    }
  }

  console.log('\n完成！所有图片已保存到:', imagesDir)
}

downloadAll().catch(console.error)

