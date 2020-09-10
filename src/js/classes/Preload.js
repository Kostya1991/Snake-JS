export default class Preload {

    static preload(callBack, sprites, sounds) {
        const requiredSprites = Object.keys(sprites).length + Object.keys(sounds).length;
        let loaded = 0;
    
        const onAssetLoad = () => {
          ++loaded;
          if (loaded >= requiredSprites) {
            callBack();
          }
        };
        this.preloadSprites(onAssetLoad, sprites);
        this.preloadSounds(onAssetLoad, sounds);
      }
    
      static preloadSprites(onAssetLoad, sprites) {
        const spritesImg = Object.assign({}, sprites);
        for (let key in sprites) {
          sprites[key] = new Image();
          sprites[key].src = spritesImg[key];
          sprites[key].addEventListener("load", onAssetLoad);
        }
      }
    
      static preloadSounds(onAssetLoad, sounds) {
        for (let key in sounds) {
          sounds[key] = new Audio(sounds[key]);
          sounds[key].addEventListener("canplaythrough", onAssetLoad, {once: true});
        }
      }
}