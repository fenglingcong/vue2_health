import { request } from '@/utils/request'

// 登录
export getLogin ({ enews, username, password, equestion }) {
  let res request('/ecmsadmin.php', 'POST', { enews, username, password, equestion })
  return res
}
