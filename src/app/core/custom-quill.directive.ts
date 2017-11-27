import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[msCustomQuill]'
})
export class CustomQuillDirective implements AfterViewInit {
  @Input('msCustomQuill') msCustomQuill: any;
  private txtArea = document.createElement('textarea');

  constructor(el: ElementRef) {
    const cssText = `
    width: 100%;
    margin: 0px;
    background: rgb(29, 29, 29);
    box-sizing: border-box;
    color: rgb(204, 204, 204);
    font-size: 15px;
    outline: none;padding: 20px;
    line-height: 24px;
    font-family: Consolas, Menlo, Monaco, &quot;
    Courier New&quot;, monospace;
    position: absolute;
    top: 0;bottom: 0;
    border: none;
    display:none`;
    this.txtArea.style.cssText = cssText;
    /* 
    let htmlEditor = this.msCustomQuill.quillEditor.addContainer('ql-custom');
    htmlEditor.appendChild(this.txtArea); */

    console.log(el);
    console.log(this.msCustomQuill);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.txtArea.value = this.msCustomQuill.quillEditor.container.children[0].innerHTML;
      const htmlEditor = this.msCustomQuill.quillEditor.addContainer(
        'ql-custom'
      );
      htmlEditor.appendChild(this.txtArea);
    }, 1000);
  }
  @HostListener('click', ['$event'])
  onclick($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (
      $event.target.attributes.class &&
      $event.target.attributes.class.value == 'ql-sorce'
    ) {
      if (this.txtArea.style.display === '') {
        const html = this.txtArea.value;
        this.msCustomQuill.quillEditor.pasteHTML(html);
      }
      this.txtArea.style.display =
        this.txtArea.style.display === 'none' ? '' : 'none';
      if (this.txtArea.style.display === '') {
        setTimeout(() => {
          this.txtArea.focus();
        }, 600);
      }
    } else if (
      this.txtArea.style.display === '' &&
      $event.target.type != 'textarea'
    ) {
      const html = this.txtArea.value;
      this.msCustomQuill.quillEditor.pasteHTML(html);
      this.txtArea.style.display = 'none';
    }
  }
  @HostListener('document:click', ['$event'])
  clickedOutside($event) {
    if (this.txtArea.style.display === '') {
      const html = this.txtArea.value;
      this.msCustomQuill.quillEditor.pasteHTML(html);
      this.txtArea.style.display = 'none';
    }
  }
}
