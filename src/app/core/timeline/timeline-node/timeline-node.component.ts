import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnChanges, Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {animate, AnimationBuilder, AnimationPlayer, sequence, state, style, transition, trigger} from '@angular/animations';

export type Shape = 'circle' | 'square';

@Component({
  selector: 'app-timeline-node',
  templateUrl: './timeline-node.component.html',
  styleUrls: ['./timeline-node.component.scss'],
  /*animations: [
    trigger('select', [
      state('unselected', style({
        top: '50%',
        left: 'calc(100% + 4px)',
        width: '50px',
        height: '50px',
        opacity: 1,
        transform: 'translateX(-50%) translateY(-50%)',
        borderRadius: '100px'
      })),
      state('unselected-alt', style({
        top: '50%',
        left: '-4px',
        width: '50px',
        height: '50px',
        opacity: 1,
        transform: 'translateX(-50%) translateY(-50%)',
        borderRadius: '100px'
      })),
      state('selected', style({
        left: 0,
        width: '100%',
        height: '100%',
        opacity: .5,
        transform: 'translateX(0) translateY(-100%)',
        borderRadius: 0
      })),
      transition('* => *', [
        animate('500ms')
      ])
    ])
  ]*/
})
export class TimelineNodeComponent implements OnChanges, AfterViewInit{

  private initialStyle: CSSStyleDeclaration;
  private _selected = false;
  private _alternate = false;
  private _color = 'accent';

  @Input() enabled = false;
  @Input() shape: Shape = 'circle';
  @Output() clicked = new EventEmitter<MouseEvent>();

  /*@HostBinding('@select') get getSelected(): string {
    return this.selected ? 'selected' : (this.alternate ? 'unselected-alt' : 'unselected');
  }*/

  @HostListener('click') onClick(event: MouseEvent): void {
    if (this.enabled) {
      this.clicked.emit(event);
    }
  }

  constructor(public elementRef: ElementRef, private renderer: Renderer2,
              @Inject(DOCUMENT) private document) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateStyle();
  }

  ngAfterViewInit(): void {
    this.initialStyle = this.document.defaultView.getComputedStyle(this.elementRef.nativeElement);
    this.updateColor('', this.color);
    this.elementRef.nativeElement.classList.add(this.shape);
  }

  captureDoneEvent(event: AnimationEvent): void {
    if (!this.selected) {
      this.updateStyle();
    }
  }

  set selected(selected: boolean) {
    this._selected = selected;
    console.log('Updated selected to ' + selected);
    this.elementRef.nativeElement.classList.toggle('selected', this.selected);
  }

  get selected(): boolean {
    return this._selected;
  }

  set alternate(alternate: boolean) {
    this._alternate = alternate;
    this.updateStyle();
  }

  get alternate(): boolean {
    return this._alternate;
  }

  @Input() set color(color: string) {
    this.updateColor(this._color, color);
    this._color = color;
    this.updateStyle();
  }

  get color(): string {
    return this._color;
  }

  private getUnselectedStyle(): any {
    return {
      left: this.alternate ? '-4px' : 'calc(100% + 4px)',
      cursor: this.enabled ? 'pointer' : 'default'
    };
  }

  /*private getSelectedStyle(): any {
    return {
      left: 0,
      transform: 'translateX(0) translateY'
    }
  }*/

  private updateColor(oldColor, newColor: string): void {
    this.elementRef.nativeElement.classList.toggle(`${oldColor}-color`, false);
    this.elementRef.nativeElement.classList.toggle(`${newColor}-color`, true);
  }

  private updateStyle(): void {
    const style = this.getUnselectedStyle();
    Object.keys(style).forEach(property => {
      this.renderer.setStyle(this.elementRef.nativeElement, property, style[property]);
    });
  }
}
