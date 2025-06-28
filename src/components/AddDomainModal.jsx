import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { X, Globe, AlertTriangle, CheckCircle } from 'lucide-react'
import { useData } from '../contexts/DataContext'

const AddDomainModal = ({ isOpen, onClose }) => {
  const { addDomain } = useData()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    const domainData = {
      ...data,
      status: 'pending',
      ssl: true,
      linksCount: 0,
      clicksCount: 0
    }

    addDomain(domainData)
    toast.success('Domain added successfully! Please configure DNS.')
    reset()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-dark-800 shadow-xl rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Add Custom Domain</h3>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Domain Name *
                  </label>
                  <input
                    {...register('domain', { 
                      required: 'Domain name is required',
                      pattern: {
                        value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid domain name'
                      }
                    })}
                    type="text"
                    placeholder="links.yourdomain.com"
                    className="input-field"
                  />
                  {errors.domain && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.domain.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Enter your custom domain (e.g., links.yourdomain.com)
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">Domain Requirements</h4>
                      <ul className="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• You must own the domain or have DNS access</li>
                        <li>• Subdomains are recommended (e.g., links.yourdomain.com)</li>
                        <li>• SSL certificate will be automatically provisioned</li>
                        <li>• DNS propagation can take up to 24 hours</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-900 dark:text-yellow-100">Next Steps</h4>
                      <p className="mt-1 text-sm text-yellow-800 dark:text-yellow-200">
                        After adding your domain, you'll need to configure DNS by adding a CNAME record 
                        pointing to <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">cname.sureto.click</code>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-green-900 dark:text-green-100">What You Get</h4>
                      <ul className="mt-2 text-sm text-green-800 dark:text-green-200 space-y-1">
                        <li>• Branded short links with your domain</li>
                        <li>• Increased trust and click-through rates</li>
                        <li>• Full control over your link branding</li>
                        <li>• Professional appearance for your links</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-dark-700">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Add Domain
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AddDomainModal
