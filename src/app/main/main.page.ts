import { Component, ElementRef, ViewChild } from '@angular/core';
import canvasTxt from 'canvas-txt';

declare var navigator: any;

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})
export class MainPage {
  @ViewChild("canvas")
  canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild("text")
  text: any;


  fontSize: number = 16;
  fontAlign: "left" | "right" | "center" = "center";
  fontColor: string = "#2c2c2c";
  constructor() { }

  getValue(target: any) {
    return target.value;
  }

  updateText() {
    this.writeToCanvas(this.text.el.value);
  }

  updateFontSize(target: any) {
    this.fontSize = parseFloat(target.value) || 16;
    this.updateText();
  }

  writeToCanvas(text: string) {
    let context = this.canvas.nativeElement.getContext("2d");
    context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    context.fillStyle = this.fontColor;
    canvasTxt.fontSize = this.fontSize;
    canvasTxt.align = this.fontAlign;
    canvasTxt.drawText(context, text, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }
  
  getCanvasBlob(canvas): Promise<Blob> {
    return new Promise(function(resolve, reject) {
      canvas.toBlob(function(blob) {
        resolve(blob)
      })
    })
  }

  async download() {
    let downloadATag = document.createElement('a');
    downloadATag.download = 'image.png';
    downloadATag.href = this.canvas.nativeElement.toDataURL("image/png")
    downloadATag.click();
  }
}
