import userService from "../services/user-service";

export const userStore = {
    state: {
      //strict: true,
      user: null,
    },
    getters: {
      loggedInUser(state) {
          return state.user;
      },
    },
    mutations: {
      setUser(state, { user }) {
        //console.log('user set', user)
        state.user = user;
      },
      setLogout(state){
        state.users = null;
      },
      setOnFollow(state, {followedUser, loggedInUser }){
        //let followedUserId = followedUser._id;

        // const miniUser = {_id: loggedInUser._id, userName: loggedInUser.userName, imgUrl: loggedInUser.imgUrl}
        // const userIsExist = state.users[followedUserId].followers.findIndex(followedUserId => followedUserId === loggedInUser._id)
        
        // if(userIsExist === -1){
        //     state.users[followedUserId].followers.unshift(miniUser)
        // } else {
        //     state.users[followedUserId].followers.shift(miniUser)
        // }
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
        const user = await userService.getById('5fc5fd32768787be41a9a627')
        commit({type: 'setUser', user})
      },
      // async onFollow({commit} , {followedUser, loggedInUser}){
      //   //console.log(followedUser, loggedInUser)
      //   const updatedUser = await userService.update(followedUser)
      //   console.log('after update', updatedUser) 
      //   commit({type: 'setOnFollow', updatedUser, loggedInUser})
      // }
    },
};
