import { App } from 'vue';
import { slideIn } from './slideIn.ts';

export const registerDirectives = (app: App) => {
	slideIn(app);
};
