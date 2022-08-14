import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

declare const __dirname:string;

export default defineConfig({
    plugins:[
        react(),
        checker({
            typescript:true
        })
    ],

    resolve:{
        alias:{
            components:`${__dirname}/web/components`,
            lib:`${__dirname}/web/lib`,
            css:`${__dirname}/web/css`,
            apis:`${__dirname}/web/apis`,
            hooks:`${__dirname}/web/hooks`
        }
    },

    server:{
        port:4000,
        hmr:false
    },

    build:{
        outDir:"build"
    }
});