import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig({
    plugins:[
        react(),
        checker({
            typescript:true
        })
    ],
    server:{
        port:4000,
        hmr:false
    },
    build:{
        outDir:"build"
    }
});