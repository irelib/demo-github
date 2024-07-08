import { createApp } from "vue";
import "@/style.css";
import { registerDirectives } from "@/directive";
import App from "./App.vue";

const app = createApp(App);
registerDirectives(app);

app.mount("#app");
