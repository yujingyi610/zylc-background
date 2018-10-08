import Cookies from 'js-cookie'

const app = {
  state: {
    isNationwide: '1'
  },
  mutations: {
    SET_NATIONWIDE: (state, wide) => {
      state.isNationwide = wide
      Cookies.set('isNationwide', wide)
    }
  }
}

export default app
