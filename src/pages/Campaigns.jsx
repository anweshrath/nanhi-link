import React, { useState } from 'react'
import { Plus, Megaphone, Edit, Trash2, Play, Pause, BarChart3 } from 'lucide-react'

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale 2024',
      description: 'Promotional campaign for summer products',
      status: 'active',
      links: 12,
      clicks: 1847,
      budget: 5000,
      spent: 2340,
      startDate: '2024-01-01',
      endDate: '2024-03-31'
    },
    {
      id: 2,
      name: 'Product Launch',
      description: 'New product announcement campaign',
      status: 'paused',
      links: 8,
      clicks: 923,
      budget: 3000,
      spent: 1200,
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    },
    {
      id: 3,
      name: 'Newsletter Signup',
      description: 'Drive newsletter subscriptions',
      status: 'completed',
      links: 5,
      clicks: 456,
      budget: 1500,
      spent: 1500,
      startDate: '2023-12-01',
      endDate: '2023-12-31'
    }
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const toggleCampaignStatus = (id) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        return {
          ...campaign,
          status: campaign.status === 'active' ? 'paused' : 'active'
        }
      }
      return campaign
    }))
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Organize and track your marketing campaigns
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Campaigns</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {campaigns.length}
              </p>
            </div>
            <Megaphone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Campaigns</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Clicks</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {campaigns.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Budget</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                ${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
              </p>
            </div>
            <div className="text-orange-600 text-2xl font-bold">$</div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          All Campaigns
        </h2>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Megaphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {campaign.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {campaign.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  <button
                    onClick={() => toggleCampaignStatus(campaign.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Links</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{campaign.links}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Clicks</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{campaign.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Budget</p>
                  <p className="font-semibold text-gray-900 dark:text-white">${campaign.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Spent</p>
                  <p className="font-semibold text-gray-900 dark:text-white">${campaign.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Budget Usage</span>
                  <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Create New Campaign
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="3"
                  placeholder="Describe your campaign"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget ($)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Campaigns
