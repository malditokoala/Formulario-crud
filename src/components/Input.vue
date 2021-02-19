<template>
  <input
    type="text"
    class="form-control my-2"
    placeholder="Ingrese nombre"
    v-model.trim="tarea.nombre"
  />
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="check1"
      v-model="tarea.categorias"
      value="Javascript"
    />
    <label class="form-check-label" for="check1">Javascript</label>
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="check2"
      v-model="tarea.categorias"
      value="Node.js"
    />
    <label class="form-check-label" for="check2">Node.js</label>
  </div>
  <div class="mt-2">
    <div class="form-check form-check-inline">
      <input
        type="radio"
        id="radio-1"
        class="form-check-input"
        value="urgente"
        v-model="tarea.estado"
      />
      <label for="radio-1" class="form-check-label">Urgente</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        type="radio"
        id="radio-2"
        class="form-check-input"
        value="relax"
        v-model="tarea.estado"
      />
      <label for="radio-2" class="form-check-label">Relax</label>
    </div>
  </div>
  <div class="mt-2">
    <input type="number" v-model.number="tarea.numero" class="form-control" />
  </div>
  <div class="mt-2">
    <button class="btn btn-dark btn-block" type="submit" :disabled="bloquear">
      Procesar
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tarea: Object,
  },
  computed: {
    bloquear() {
      return this.tarea.nombre.trim() === "" ? true : false;
    },
  },
};
</script>
\