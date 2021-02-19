<template>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>
  <hr />
  <ListaTareas />
</template>

<script>
// @ is an alias to /src
import Input from "../components/Input";
import ListaTareas from "../components/ListaTareas";
import { mapActions } from "vuex";
const shortid = require("shortid");

export default {
  name: "Home",
  components: { Input, ListaTareas },
  data() {
    return {
      tarea: {
        id: "",
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0,
      },
    };
  },
  methods: {
    ...mapActions(["setTareas"]),
    procesarFormulario() {
      //e.preventDefault();
      console.log(this.tarea);
      if (this.tarea.nombre.trim() === "") {
        console.log("Campo vacio");
        return;
      }
      console.log("no esta vacio");

      // Generar Id
      this.tarea.id = shortid.generate();
      console.log(this.tarea.id);

      // Enviar los datos
      this.setTareas(this.tarea);

      // Limpiar Formulario
      this.tarea = {
        id: "",
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0,
      };
    },
  },
};
</script>
