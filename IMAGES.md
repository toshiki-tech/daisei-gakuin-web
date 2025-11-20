# 图片素材说明

## 当前使用的图片

所有图片目前使用 Unsplash 的免费图片服务。这些图片可以用于商业用途。

### 已添加图片的模块

1. **Hero 区域** - 老师和学生一起学习的温馨照片
2. **Features 模块** - 每个特色卡片都有相关背景图片
3. **Courses 模块** - 每个课程卡片都有对应的学习场景图片
4. **Method 模块** - 教学理念展示图片
5. **Testimonials 模块** - 学员头像照片

## 替换为本地图片

如果您想使用自己的图片，请按以下步骤操作：

### 1. 准备图片文件

将图片保存到 `public/images/` 目录下，建议结构：

```
public/
  images/
    hero/
      hero-main.jpg
    features/
      feature-1.jpg
      feature-2.jpg
      feature-3.jpg
    courses/
      beginner.jpg
      intermediate.jpg
      advanced.jpg
      hsk.jpg
      business.jpg
      private.jpg
    method/
      method-teaching.jpg
    testimonials/
      student-1.jpg
      student-2.jpg
      student-3.jpg
      student-4.jpg
```

### 2. 更新组件中的图片路径

#### Hero.tsx
```tsx
<Image
  src="/images/hero/hero-main.jpg"  // 替换这里
  alt="大成学院での中国語レッスン"
  ...
/>
```

#### Features.tsx
```tsx
{
  image: '/images/features/feature-1.jpg',  // 替换这里
  ...
}
```

#### Courses.tsx
```tsx
{
  photo: '/images/courses/beginner.jpg',  // 替换这里
  ...
}
```

#### Method.tsx
```tsx
<Image
  src="/images/method/method-teaching.jpg"  // 替换这里
  ...
/>
```

#### Testimonials.tsx
```tsx
{
  avatar: '/images/testimonials/student-1.jpg',  // 替换这里
  ...
}
```

## 图片规格建议

- **Hero 图片**: 1200x800px 或更大，横向
- **Features 卡片**: 600x400px，横向
- **Courses 卡片**: 600x400px，横向
- **Method 图片**: 800x600px，横向
- **Testimonials 头像**: 150x150px，正方形

## 图片优化

Next.js 会自动优化图片，但建议：
- 使用 JPG 格式（文件更小）
- 压缩图片以减少加载时间
- 确保图片清晰度足够

## 注意事项

- 确保所有图片都有适当的 alt 文本（已设置）
- 图片应反映实际的教学场景和氛围
- 如果使用真实学员照片，请确保获得使用许可

