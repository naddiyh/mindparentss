self.fallback=async a=>{let{destination:e,url:c}=a,l={document:"/~offline",image:"/fallback.webp",audio:"/fallback.mp3",video:"/fallback.mp4",font:"/fallback-font.woff2"}[e];return l?caches.match(l,{ignoreSearch:!0}):""===e&&c.match(/\/_next\/data\/.+\/.+\.json$/i)?caches.match("/_next/data/g-N3zCapm_OPm-fAow-jR/fallback.json",{ignoreSearch:!0}):Response.error()};