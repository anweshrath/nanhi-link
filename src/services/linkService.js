import { supabase } from '../lib/supabase'
import { passwordUtils } from '../utils/passwordUtils'

export const linkService = {
  // Create a new link with password hashing and script injection
  async createLink(linkData) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Hash password if provided
      let hashedPassword = null
      if (linkData.password_protection && linkData.password) {
        hashedPassword = await passwordUtils.hashPassword(linkData.password)
      }

      const { data, error } = await supabase
        .from('links')
        .insert({
          user_id: user.id,
          project_id: linkData.project_id,
          title: linkData.title,
          destination_url: linkData.destination_url,
          short_code: linkData.short_code,
          link_type: linkData.link_type || 'short',
          is_active: linkData.is_active !== undefined ? linkData.is_active : true,
          
          // Cloaking settings
          cloaking_enabled: linkData.cloaking_enabled || false,
          cloaking_page_title: linkData.cloaking_page_title || '',
          cloaking_page_description: linkData.cloaking_page_description || '',
          cloaking_delay: linkData.cloaking_delay || 3,
          
          // Script injection settings
          script_injection_enabled: linkData.script_injection_enabled || false,
          tracking_scripts: linkData.tracking_scripts || [],
          script_delay: linkData.script_delay || 0,
          script_position: linkData.script_position || 'head',
          
          // Geo targeting
          geo_targeting_enabled: linkData.geo_targeting_enabled || false,
          geo_rules: linkData.geo_rules || [],
          geo_fallback_url: linkData.geo_fallback_url || '',
          
          // Time targeting
          time_targeting_enabled: linkData.time_targeting_enabled || false,
          time_rules: linkData.time_rules || [],
          time_fallback_url: linkData.time_fallback_url || '',
          
          // UTM tracking
          utm_enabled: linkData.utm_enabled || false,
          utm_source: linkData.utm_source || '',
          utm_medium: linkData.utm_medium || '',
          utm_campaign: linkData.utm_campaign || '',
          utm_term: linkData.utm_term || '',
          utm_content: linkData.utm_content || '',
          
          // A/B testing
          ab_testing_enabled: linkData.ab_testing_enabled || false,
          ab_test_urls: linkData.ab_test_urls || [],
          
          // Advanced settings with secure password storage
          password_protection: linkData.password_protection || false,
          password: hashedPassword, // Store hashed password
          expiration_enabled: linkData.expiration_enabled || false,
          expiration_date: linkData.expiration_date || null,
          click_limit_enabled: linkData.click_limit_enabled || false,
          click_limit: linkData.click_limit || null,
          device_targeting_enabled: linkData.device_targeting_enabled || false,
          device_rules: linkData.device_rules || { desktop: true, mobile: true, tablet: true },
          
          total_clicks: 0
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating link:', error)
      throw error
    }
  },

  // Get user's links
  async getUserLinks() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching links:', error)
      throw error
    }
  },

  // Get links by project
  async getLinksByProject(projectId) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user.id)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching project links:', error)
      throw error
    }
  },

  // Update link with password hashing
  async updateLink(linkId, updates) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Hash password if being updated
      if (updates.password_protection && updates.password) {
        updates.password = await passwordUtils.hashPassword(updates.password)
      }

      const { data, error } = await supabase
        .from('links')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', linkId)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating link:', error)
      throw error
    }
  },

  // Delete link
  async deleteLink(linkId) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', linkId)
        .eq('user_id', user.id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting link:', error)
      throw error
    }
  },

  // Get link by short code for redirect processing
  async getLinkByShortCode(shortCode) {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('short_code', shortCode)
        .eq('is_active', true)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching link by short code:', error)
      throw error
    }
  },

  // Verify link password
  async verifyLinkPassword(linkId, password) {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('password')
        .eq('id', linkId)
        .single()

      if (error) throw error
      
      if (!data.password) {
        return true // No password protection
      }

      const isValid = await passwordUtils.verifyPassword(password, data.password)
      return isValid
    } catch (error) {
      console.error('Error verifying link password:', error)
      return false
    }
  },

  // Increment click count
  async incrementClickCount(linkId) {
    try {
      const { data, error } = await supabase
        .from('links')
        .update({
          total_clicks: supabase.raw('total_clicks + 1'),
          last_clicked_at: new Date().toISOString()
        })
        .eq('id', linkId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error incrementing click count:', error)
      throw error
    }
  },

  // Check if short code is available
  async isShortCodeAvailable(shortCode) {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('id')
        .eq('short_code', shortCode)
        .limit(1)

      if (error) throw error
      return data.length === 0
    } catch (error) {
      console.error('Error checking short code availability:', error)
      throw error
    }
  },

  // Generate script injection page
  generateScriptInjectionPage(link, destinationUrl) {
    const scripts = link.tracking_scripts
      .filter(script => script.enabled)
      .map(script => script.script)
      .join('\n')

    const delay = (link.script_delay || 0) * 1000

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${link.cloaking_page_title || 'Redirecting...'}</title>
    <meta name="description" content="${link.cloaking_page_description || 'Please wait while we redirect you...'}">
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: white;
        }
        .container {
            max-width: 400px;
        }
        .spinner {
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        h1 { margin-bottom: 10px; }
        p { opacity: 0.9; }
    </style>
    ${link.script_position === 'head' ? scripts : ''}
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h1>${link.cloaking_page_title || 'Redirecting...'}</h1>
        <p>${link.cloaking_page_description || 'Please wait while we redirect you...'}</p>
    </div>
    
    ${link.script_position === 'body' ? `<script>${scripts}</script>` : ''}
    
    <script>
        // Redirect after delay
        setTimeout(() => {
            window.location.href = '${destinationUrl}';
        }, ${delay});
        
        // Fallback redirect on click
        document.addEventListener('click', () => {
            window.location.href = '${destinationUrl}';
        });
    </script>
    
    ${link.script_position === 'footer' ? `<script>${scripts}</script>` : ''}
</body>
</html>`
  }
}
