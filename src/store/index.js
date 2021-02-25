import { createStore } from 'vuex';
import router from '../router';
export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0,
    },
    user: null
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
      
    },
    cargar(state, payload) {
      state.tareas = payload;
    },
    set(state, payload) {
      state.tareas.push(payload);
      /* localStorage.setItem('tareas', JSON.stringify(state.tareas)); */
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter((item) => item.id !== payload);
      /* localStorage.setItem('tareas', JSON.stringify(state.tareas)); */
    },
    tarea(state, payload) {
      if(!state.tareas.find((item) => item.id === payload))
      {
        
        return router.push('/');
       
      }
      state.tarea = state.tareas.find((item) => item.id === payload);
    },
    update(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/');
  /*     localStorage.setItem('tareas', JSON.stringify(state.tareas)); */
    }
  },
  actions: {

    cerrarSesion({commit}){
      commit('setUser', null);
      router.push('/ingreso');
    },
    
    async ingresoUsuario({commit}, usuario){
      try {
        const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9BpvAvI8s2uwj0IWOQ5Fe0G5431hJpBA",{
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json();
        console.log(userDB);

        if(userDB.error){
          return console.error(userDB.error.message);
        }
        commit('setUser', userDB);
        router.push('/');

      } catch (error) {
        console.log(error);
      }    
    },

    async registrarUsuario({commit}, usuario){
      try {
        const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9BpvAvI8s2uwj0IWOQ5Fe0G5431hJpBA",{
          method:'POST',
          body:  JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true,
          })
        });
        const userDB = await res.json();
        
        if(userDB.error){
          console.log(userDB.error);
          return;
        }

        commit('setUser', userDB);
        router.push('/');

      } catch (error) {
        console.log(error);
      }
    },

    async cargarLocalStorage({ commit, state }){
      try {
        const res = await fetch(`https://udemy-api-3e9ff-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`);
        const dataDB = await res.json();
        const arrayTareas =  [];//Object.entries(dataDB);
         for (var id in dataDB){
           arrayTareas.push(dataDB[id]);
         }
        commit('cargar', arrayTareas);
        
      } catch (error) {
        console.log(error);
      }

    },

    async setTareas({ commit, state  }, tarea) {
      try {
        const res = await fetch(`https://udemy-api-3e9ff-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        });
        const dataDB = await res.json();
        commit('set', dataDB);
       
      } catch (error) {
        console.log(error);
      }
     
    },

    async deleteTareas({ commit, state  }, id) {
      commit('eliminar', id);
      try {
        await fetch(`https://udemy-api-3e9ff-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
          method: 'DELETE',
         
        });
      commit('tarea', id);
      } catch (error) {
        console.log(error);
      }
    },
    setTarea({ commit }, id) {
      
      commit('tarea', id);
    },

    async updateTarea({commit, state }, tarea){
      try {
        const res = await fetch(`https://udemy-api-3e9ff-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        });
        const datDB = res.json();
        commit('update', dataDB);
      } catch (error) {
        
      }
      commit('update', tarea);
    }
  },
  modules: {},
  getters:{
    usuarioAutenticado(state){
      return !!state.user;
    }
  }
});
