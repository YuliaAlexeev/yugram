import userService from "../services/user-service";

export const userStore = {
    state: {
      strict: true,
      user: [],

    },
    getters: {
      getUser(state) {
          return state.user;
      },
    //   getLoggedInUser(state) {
    //       return state.user;
    //   },

   
      
    },
    mutations: {
      setUser(state, { user }) {
        //console.log('user set', user)
        state.user = user;
      },
      setLogout(state){
        console.log('state.user', state.users)
        state.users = null;
      }
    },
    actions: {
    //   async login(context, payload) {
    //     console.log('context', context)
    //     console.log('payload', payload)
    //     const user = await userService.login(payload.userLogin)
        
    //       context.commit({type:'setUser', user})
    //   },
    //   async userLogout(context){
    //     const user = await userService.logout()
    //     context.commit({type:'setLogout', user})
    //   },
      async loadUser({commit} ,{userId}){
        const user = await userService.getById('u101')
        console.log('user from db on loadUser', user)
        commit({type: 'setUser', user})
      }
    },
};
