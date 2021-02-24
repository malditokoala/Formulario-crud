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
        console.log(userDB);
        if(userDB.error){
          console.log(userDB.error);
          return;
        }

        commit('setUser', userDB);

      } catch (error) {
        console.log(error);
      }
    },
    async cargarLocalStorage({ commit }){
      try {
        const res = await fetch('https://udemy-api-3e9ff-default-rtdb.firebaseio.com/tareas.json');
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
    async setTareas({ commit }, tarea) {
      try {
        const res = await fetch(`https://udemy-api-3e9ff-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
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
    async deleteTareas({ commit }, id) {
      commit('eliminar', id);
      try {
        await fetch(`https://udemy-api-3e9ff-default-rtdb.firebaseio.com/tareas/${id}.json`, {
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
    async updateTarea({commit}, tarea){
      try {

        const res = await fetch(`https://udemy-api-3e9ff-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
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
});
