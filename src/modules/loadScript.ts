const LoadCache = new Map<string, boolean>();

export default function loadScript(src: string) {
  if (LoadCache.get(src)) {
    return Promise.resolve<boolean>(true);
  } else {
    return new Promise<boolean>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.addEventListener("load", () => {
        LoadCache.set(src, true);
        resolve(true);
      });
      script.addEventListener("error", (e) => {
        LoadCache.set(src, false);
        reject(e);
      });
      document.body.appendChild(script);
    });
  }
}
