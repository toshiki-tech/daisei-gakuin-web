import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'newsPost',
  title: '新闻/News',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.ja',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: '标题',
      type: 'object',
      fields: [
        {
          name: 'ja',
          title: '日本語',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'zh',
          title: '中文',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: '摘要',
      type: 'object',
      fields: [
        {
          name: 'ja',
          title: '日本語',
          type: 'text',
        },
        {
          name: 'zh',
          title: '中文',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: '内容',
      type: 'object',
      fields: [
        {
          name: 'ja',
          title: '日本語',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'zh',
          title: '中文',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: '发布日期',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: '作者',
      type: 'string',
      initialValue: '大成学院',
    }),
    defineField({
      name: 'featuredImage',
      title: '特色图片',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title.ja',
      subtitle: 'publishedAt',
      media: 'featuredImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || '无标题',
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : '未设置日期',
        media,
      }
    },
  },
})

