import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

declare const __dirname:string;

export default defineConfig({
    base:"/build/",
    mode:"development",
    publicDir:"web/assets",

    plugins:[
        react(),
        checker({
            typescript:true
        })
    ],

    build:{
        outDir:"build",
        target:"esnext",
        sourcemap:true,
        minify:false,

        watch:{
            buildDelay:1000
        },

        rollupOptions:{
            input:{
                "folder-select":`${__dirname}/pages/folder-select/index.html`,
                "popup":`${__dirname}/pages/popup/index.html`,
                "component-test":`${__dirname}/pages/component-test/index.html`,
                "bookmark-generate":`${__dirname}/pages/bookmark-generate/index.html`,
            }
        }
    },

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
    }
});