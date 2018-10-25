import Vue from 'vue'
import Vuex from 'vuex'
import { getLogin, getUser } from '@/api'
import cache from '@/utils/cache'

Vue.use(Vuex)

const state = {
  user: ''
}
const getters = {}
const mutations = {
  set_user (state, val) {
    state.user = val
  },
  remove_token (state) {
    state.user = ''
    cache.removeToken()
  }
}
const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})