'use client'

import { useState, useEffect } from 'react'

interface ContactInquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  privacy_agreed: boolean
  status: string
  locale: string | null
  created_at: string
  updated_at: string | null
}

export default function ContactInquiries() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null)
  const [viewingInquiry, setViewingInquiry] = useState<ContactInquiry | null>(null)
  const [replyEmail, setReplyEmail] = useState('')
  const [replySubject, setReplySubject] = useState('')
  const [replyMessage, setReplyMessage] = useState('')
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        setLoading(false)
        return
      }

      const response = await fetch('/api/admin/inquiries', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('获取数据失败')
      }

      const result = await response.json()
      setInquiries(result.data || [])
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingStatus(true)
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        alert('未授权')
        return
      }

      const response = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '更新失败')
      }

      await fetchInquiries()
    } catch (error: any) {
      console.error('Error updating status:', error)
      alert(error.message || '更新状态失败')
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleReply = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry)
    setReplyEmail(inquiry.email)
    setReplySubject(`お問い合わせへのご返信 - ${inquiry.name}様`)
    setReplyMessage(`お問い合わせありがとうございます。\n\n${inquiry.name}様からのお問い合わせ内容を確認いたしました。\n\nご質問内容：\n${inquiry.message}\n\n詳細については、改めてご連絡いたします。`)
  }

  const sendReply = () => {
    // 打开邮件客户端
    const mailtoLink = `mailto:${replyEmail}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyMessage)}`
    window.location.href = mailtoLink
    
    // 标记为已联系
    if (selectedInquiry) {
      updateStatus(selectedInquiry.id, 'contacted')
    }
    setSelectedInquiry(null)
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      pending: { label: '待处理', color: 'bg-yellow-100 text-yellow-800' },
      contacted: { label: '已联系', color: 'bg-blue-100 text-blue-800' },
      resolved: { label: '已解决', color: 'bg-green-100 text-green-800' },
      cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-800' },
    }
    const statusInfo = statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    )
  }

  if (loading) {
    return <div className="text-center py-12 text-ink/60">加载中...</div>
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ink">咨询表单 ({inquiries.length})</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-ink/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-ink/5">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-ink">姓名</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-ink">邮箱</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-ink">电话</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-ink">咨询内容</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-ink">状态</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-ink">提交时间</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-ink">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-ink/2">
                  <td className="px-4 py-3 text-sm text-ink">{inquiry.name}</td>
                  <td className="px-4 py-3 text-sm text-ink/70">{inquiry.email}</td>
                  <td className="px-4 py-3 text-sm text-ink/70">{inquiry.phone}</td>
                  <td className="px-4 py-3 text-sm text-ink/70 max-w-xs truncate">
                    {inquiry.message}
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(inquiry.status)}</td>
                  <td className="px-4 py-3 text-sm text-ink/60">
                    {new Date(inquiry.created_at).toLocaleString('zh-CN')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewingInquiry(inquiry)}
                        className="px-3 py-1 text-xs bg-ink/10 text-ink rounded hover:bg-ink/20 transition-colors"
                      >
                        详情
                      </button>
                      <button
                        onClick={() => handleReply(inquiry)}
                        className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                      >
                        回复
                      </button>
                      <select
                        value={inquiry.status}
                        onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                        disabled={updatingStatus}
                        className="px-2 py-1 text-xs border border-ink/20 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="pending">待处理</option>
                        <option value="contacted">已联系</option>
                        <option value="resolved">已解决</option>
                        <option value="cancelled">已取消</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {viewingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-ink/10 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-ink">咨询详情</h3>
              <button
                onClick={() => setViewingInquiry(null)}
                className="text-ink/60 hover:text-ink transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink/60 mb-1">姓名</label>
                  <p className="text-ink">{viewingInquiry.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink/60 mb-1">邮箱</label>
                  <p className="text-ink">{viewingInquiry.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink/60 mb-1">电话</label>
                  <p className="text-ink">{viewingInquiry.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink/60 mb-1">状态</label>
                  <div>{getStatusBadge(viewingInquiry.status)}</div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-ink/60 mb-1">咨询内容</label>
                  <p className="text-ink whitespace-pre-wrap">{viewingInquiry.message}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink/60 mb-1">提交时间</label>
                  <p className="text-ink">{new Date(viewingInquiry.created_at).toLocaleString('zh-CN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-ink/10 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-ink">回复邮件</h3>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-ink/60 hover:text-ink transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">收件人</label>
                <input
                  type="email"
                  value={replyEmail}
                  onChange={(e) => setReplyEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">主题</label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-4 py-2 border border-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">内容</label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-2 border border-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="flex-1 px-4 py-2 border-2 border-ink/20 text-ink rounded-lg font-semibold hover:bg-ink/5 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={sendReply}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  发送邮件
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

