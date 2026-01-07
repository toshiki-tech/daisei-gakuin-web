'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import FreeTrialApplications from './FreeTrialApplications'
import ContactInquiries from './ContactInquiries'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'trials' | 'inquiries'>('trials')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        // 清除可能存在的过期数据
        localStorage.removeItem('admin_user')
        router.push('/admin/login')
        return
      }

      // 验证 token 是否有效
      const response = await fetch('/api/admin/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (!response.ok || !data.valid) {
        // Token 无效或过期，清除本地存储并跳转到登录页
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
        router.push('/admin/login')
        return
      }

      // Token 有效，更新用户信息
      if (data.user) {
        setUser(data.user)
        // 更新 localStorage 中的用户信息
        localStorage.setItem('admin_user', JSON.stringify(data.user))
      } else {
        // 如果 API 没有返回用户信息，尝试从 localStorage 读取
        const userInfo = localStorage.getItem('admin_user')
        if (userInfo) {
          setUser(JSON.parse(userInfo))
        }
      }
    } catch (error) {
      console.error('Error checking user:', error)
      // 发生错误时，清除本地存储并跳转到登录页
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (token) {
        await fetch('/api/admin/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      router.push('/admin/login')
      router.refresh()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-ink/60">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-ink/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-ink">管理后台</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden sm:inline text-xs sm:text-sm text-ink/60 truncate max-w-[120px] md:max-w-none">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-ink/70 hover:text-ink border border-ink/20 rounded-lg hover:bg-ink/5 transition-colors whitespace-nowrap"
              >
                退出
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-ink/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <button
              onClick={() => setActiveTab('trials')}
              className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'trials'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-ink/60 hover:text-ink'
              }`}
            >
              免费体验申请
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'inquiries'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-ink/60 hover:text-ink'
              }`}
            >
              咨询表单
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {activeTab === 'trials' ? (
          <FreeTrialApplications />
        ) : (
          <ContactInquiries />
        )}
      </main>
    </div>
  )
}

