<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Categorias</th>
        <th scope="col">Estado</th>
        <th scope="col">Numero</th>
        <th scope="col">Acción</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tarea in tareas" :key="tarea.id">
        <th scope="row">{{ tarea.id }}</th>
        <td>{{ tarea.nombre }}</td>
        <td>
          <select name="Categorias" size="3 " multiple="multiple">
            // Pone una coma si mas de un elemento // tarea.cotegorias === index
            + 1 ? '' : ', ';
            <option v-for="(categoria, index) in tarea.categorias" :key="index">
              <!--     {{
                tarea.categorias.length === index + 1
                  ? categoria
                  : categoria + ", "
              }} -->
              {{ tarea.categorias.join(", ") }}
            </option>
            n>
          </select>
        </td>
        <td>{{ tarea.estado }}</td>
        <td>{{ tarea.numero }}</td>
        <td>
          <button class="btn btn-danger btn-sm" @click="deleteTareas(tarea.id)">
            Eliminar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["tareas"]),
  },
  methods: {
    ...mapActions(["deleteTareas"]),
  },
};
</script>

<style>
</style>