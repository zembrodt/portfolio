import {AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-timeline-node',
  templateUrl: './timeline-node.component.html',
  styleUrls: ['./timeline-node.component.css']
})
export class TimelineNodeComponent implements OnChanges, AfterViewInit{

  private initialStyle: CSSStyleDeclaration;
  private _alternate = false;
  private _color = 'primary';

  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateStyle();
  }

  ngAfterViewInit(): void {
    this.initialStyle = this.document.defaultView.getComputedStyle(this.elementRef.nativeElement);
    this.updateColor('', this.color);
  }

  set alternate(alternate: boolean) {
    this._alternate = alternate;
    console.log('Node alternate updated to: ' + alternate);
    this.updateStyle();
  }

  get alternate(): boolean {
    return this._alternate;
  }

  set color(color: string) {
    this.updateColor(this._color, color);
    this._color = color;
    this.updateStyle();
  }

  get color(): string {
    return this._color;
  }

  private getStyle(): any {
    return {
      left: this.alternate ? '-4px' : 'calc(100% + 4px)'
    };
  }

  private updateColor(oldColor, newColor: string): void {
    this.elementRef.nativeElement.classList.toggle(`${oldColor}-color`, false);
    this.elementRef.nativeElement.classList.toggle(`${newColor}-color`, true);
  }

  private updateStyle(): void {
    const style = this.getStyle();
    console.log('node style: ' + style);
    Object.keys(style).forEach(property => {
      this.renderer.setStyle(this.elementRef.nativeElement, property, style[property]);
    });
  }
}
