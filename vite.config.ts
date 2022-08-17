import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

declare const __dirname:string;

export default defineConfig({
    base:"/build/",

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
        outDir:"build",
        watch:{
            buildDelay:1500
        },
        rollupOptions:{
            input:{
                "folder-select":`${__dirname}/pages/folder-select/index.html`,
                "popup":`${__dirname}/pages/popup/index.html`,
            }
        }
    }
});