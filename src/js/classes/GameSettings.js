export default class GameSettings {

    constructor (size, dimensions) {
        this.size = size;
        this.dimensions = dimensions;
    }

    initDemensions(canvas) {
        const data = {
          maxWidth: this.dimensions.max.width,
          maxHeight: this.dimensions.max.height,
          minWidth: this.dimensions.min.width,
          minHeight: this.dimensions.min.height,
          realWidth: window.innerWidth,
          realHeight: window.innerHeight
        };
    
        if (data.realWidth / data.realHeight > data.maxWidth / data.maxHeight) {
          this.fitWidth(data, canvas);
        } else {
          this.fitHeight(data, canvas)
        }
    
        canvas.canvas.width = this.size.width;
        canvas.canvas.height = this.size.height;
      }
    
      fitHeight(data, canvas) {
        this.size.width = Math.floor(data.realWidth * data.maxHeight / data.realHeight);
        this.size.width = Math.min(this.size.width, data.maxWidth);
        this.size.width = Math.max(this.size.width, data.minWidth);
        this.size.height = Math.floor(this.size.width * data.realHeight / data.realWidth)
        canvas.canvas.style.height = "100%";
      }
    
      fitWidth(data, canvas) {
        this.size.height = Math.round(this.size.width * data.realHeight / data.realWidth);
        this.size.height = Math.min(this.size.height, data.maxHeight);
        this.size.height = Math.max(this.size.height, data.minHeight);
        this.size.width = Math.round(data.realWidth * this.size.height / data.realHeight);
        canvas.canvas.style.width = "100%";
      }
}