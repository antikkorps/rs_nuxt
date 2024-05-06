import { defineStore } from 'pinia';



const baseUrl = ``;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') ?? '{}'),
        returnUrl: null
    }),
    actions: {
        async login(username: string, password: string) {
            // const user = await fetch(`${baseUrl}/authenticate`, { username, password });
            // this.user = user;

            // localStorage.setItem('user', JSON.stringify(user));
            console.log('login sent')
            // router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            // router.push('/login');
        }
    }
});