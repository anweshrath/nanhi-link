import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet,
  Calendar,
  MousePointer,
  ExternalLink
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useAuth } from '../contexts/AuthContext'
import { dataService } from '../services/dataService'
import toast from 'react-hot-toast'

const Analytics = () => {
  const { user } = useAuth()
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    const loadAnalytics = async () => {
      if (!user) return
      
      try {
        setLoading(true)
        const data = await dataService.getUserAnalytics(user.id, timeRange)
        setAnalyticsData(data)
      } catch (error) {
        console.error('Failed to load analytics:', error)
        toast.error('Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [user, timeRange])

  const deviceIcons = {
    Desktop: Monitor,
    Mobile: Smartphone,
    Tablet: Tablet
  }

  const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Failed to load analytics data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Detailed insights into your link performance
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {analyticsData.totalClicks.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <MousePointer className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">
              {timeRange === '24h' ? 'Today' : `Last ${timeRange}`}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Unique Visitors</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {Math.floor(analyticsData.totalClicks * 0.8).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              ~80% of total clicks
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Avg. Daily Clicks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {timeRange === '24h' 
                  ? analyticsData.totalClicks 
                  : Math.floor(analyticsData.totalClicks / parseInt(timeRange)).toLocaleString()
                }
              </p>
            </div>
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <Calendar className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-gray-600 dark:text-gray-400">per day average</span>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Click Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Click Trends</h3>
          
          {analyticsData.chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    color: '#0f172a'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-600 dark:text-gray-400">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No click data available</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Device Breakdown</h3>
          
          {analyticsData.deviceData.length > 0 ? (
            <div className="space-y-4">
              {analyticsData.deviceData.map((device, index) => {
                const Icon = deviceIcons[device.device] || Monitor
                return (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{device.device}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">{device.count}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{device.percentage}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-600 dark:text-gray-400">
              <div className="text-center">
                <Monitor className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No device data available</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Top Referrers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Referrers</h3>
        
        {analyticsData.referrerData.length > 0 ? (
          <div className="space-y-3">
            {analyticsData.referrerData.map((referrer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                    #{index + 1}
                  </span>
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {referrer.referrer === 'Direct' ? 'Direct Traffic' : referrer.referrer}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-white">{referrer.count}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{referrer.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            <ExternalLink className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No referrer data available</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Analytics
