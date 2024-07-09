/**
 * Enter Key spec
 */
import { RichTextEditor} from './../../../../src/index';
import { renderRTE, destroy } from './../../render.spec';
import { NodeSelection } from './../../../../src/selection/index';

let keyboardEventArgs = {
    preventDefault: function () { },
    altKey: false,
    ctrlKey: false,
    shiftKey: true,
    char: '',
    key: '',
    charCode: 13,
    keyCode: 13,
    which: 13,
    code: 'Enter',
    action: 'enter',
    type: 'keydown'
};

describe('Shift Enter key support - When `BR` is configured', () => {
    let rteObj: RichTextEditor;
    keyboardEventArgs.shiftKey = true;
    beforeAll((done: Function) => {
        rteObj = renderRTE({
            height: '200px'
        });
        done();
    });

    it('Press shift enter when RTE content is empty', function (): void {
        const nodetext: any = rteObj.inputElement.childNodes[0];
        const sel: void = new NodeSelection().setSelectionText(
            document, nodetext, nodetext, 0, 0);
        (<any>rteObj).keyDown(keyboardEventArgs);
        expect(rteObj.inputElement.innerHTML).toBe('<p><br><br></p>');
    });

    afterAll(() => {
        destroy(rteObj);
    });
});

describe('Shift Enter key support - When `P` is configured', () => {
    let rteObj: RichTextEditor;
    keyboardEventArgs.shiftKey = true;
    beforeAll((done: Function) => {
        rteObj = renderRTE({
            height: '200px',
            value: '<div>RTE Content</div>',
            shiftEnterKey: 'P'
        });
        done();
    });

    it('Press shift enter at the end of the div tag', function (): void {
        const nodetext: any = rteObj.inputElement.childNodes[0].childNodes[0];
        const sel: void = new NodeSelection().setCursorPoint(
            document, nodetext, nodetext.textContent.length);
        (<any>rteObj).keyDown(keyboardEventArgs);
        expect(rteObj.inputElement.innerHTML).toBe('<div>RTE Content</div><p><br></p>');
    });

    afterAll(() => {
        destroy(rteObj);
    });
});

describe('Shift Enter key support - When `DIV` is configured', () => {
    let rteObj: RichTextEditor;
    keyboardEventArgs.shiftKey = true;
    beforeAll((done: Function) => {
        rteObj = renderRTE({
            height: '200px',
            value: '<div>RTE Content</div>',
            shiftEnterKey: 'DIV'
        });
        done();
    });

    it('Press shift enter at the end of the div tag', function (): void {
        const nodetext: any = rteObj.inputElement.childNodes[0].childNodes[0];
        const sel: void = new NodeSelection().setCursorPoint(
            document, nodetext, nodetext.textContent.length);
        (<any>rteObj).keyDown(keyboardEventArgs);
        expect(rteObj.inputElement.innerHTML).toBe('<div>RTE Content</div><div><br></div>');
    });

    afterAll(() => {
        destroy(rteObj);
    });
});

describe('Shift Enter key support - When image is rendered', () => {
    let rteObj: RichTextEditor;
    keyboardEventArgs.shiftKey = true;
    beforeAll((done: Function) => {
        rteObj = renderRTE({
            height: '200px',
            value:  `<p><img alt="Logo" src="https://ej2.syncfusion.com/angular/demos/assets/rich-text-editor/images/RTEImage-Feather.png" style="width: 300px;"></p>`
        });
        done();
    });

    it('Press shift enter when image is focused initially', function (): void {
        const nodetext: any = rteObj.inputElement.childNodes[0];
        const sel: void = new NodeSelection().setSelectionText(
            document, nodetext, nodetext, 0, 0);
        (<any>rteObj).keyDown(keyboardEventArgs);
        expect(rteObj.inputElement.innerHTML).toBe('<p><br><img alt="Logo" src="https://ej2.syncfusion.com/angular/demos/assets/rich-text-editor/images/RTEImage-Feather.png" style="width: 300px;" class="e-rte-image e-imginline"></p>');
    });

    afterAll(() => {
        destroy(rteObj);
    });
});

describe('Shift Enter key support - When image is rendered', () => {
    let rteObj: RichTextEditor;
    keyboardEventArgs.shiftKey = true;
    beforeAll((done: Function) => {
        rteObj = renderRTE({
            height: '200px',
            value:  `<p><img alt="Logo" src="https://ej2.syncfusion.com/angular/demos/assets/rich-text-editor/images/RTEImage-Feather.png" style="width: 300px;"></p>`
        });
        done();
    });
    let keyBoardEvent: any = {
        preventDefault: () => { },
        type: "keydown",
        stopPropagation: () => { },
        ctrlKey: false,
        shiftKey: false,
        action: null,
        which: 64,
        key: ""
    };
    it("Image is pasted in the editor and press shift enter when image is focused initially", (done) => {
        keyBoardEvent.clipboardData = {
            getData: () => { return ``; },
            types: ['text/html', 'Files'],
            files: { 0: { lastModified: 1594563447084, name: "image.png", size: 66216, type: "image/png", webkitRelativePath: "", lastModifiedDate: new Date() } },
            items: []
        };
        (<any>rteObj).onPaste(keyBoardEvent);
        setTimeout(() => {
            const nodetext: any = rteObj.inputElement.childNodes[0].childNodes[0];
            const sel: void = new NodeSelection().setCursorPoint(
            document, nodetext, nodetext.textContent.length);
            (<any>rteObj).keyDown(keyboardEventArgs);
            expect(rteObj.inputElement.innerHTML).toBe(`<p><br><img alt="Logo" src="https://ej2.syncfusion.com/angular/demos/assets/rich-text-editor/images/RTEImage-Feather.png" style="width: 300px;" class="e-rte-image e-imginline"></p>`);
            done();
        }, 100);
    });
    afterAll(() => {
        destroy(rteObj);
    });
});

describe('890906 - Clicking shift and Enter after inserting link causes the page to collapse in RichTextEditor', () => {
    let rteObj: RichTextEditor;
    keyboardEventArgs.shiftKey = true;
    beforeAll((done: Function) => {
        rteObj = renderRTE({
            height: '200px',
            value: `<p><span><a class="e-rte-anchor" href="https://www.syncfusion.com/" title="https://www.syncfusion.com/" target="_blank" aria-label="Open in new window">https://www.syncfusion.com/ </a></span><br></p>`
        });
        done();
    });
    let keyBoardEvent: any = {
        preventDefault: () => { },
        type: "keydown",
        stopPropagation: () => { },
        ctrlKey: false,
        shiftKey: false,
        action: null,
        which: 64,
        key: ""
    };
    it("Press the Shift+Enter after the link", (done) => {
        const nodetext: any = rteObj.inputElement.querySelector("A");
        const sel: void = new NodeSelection().setCursorPoint(
            document, nodetext.childNodes[0], nodetext.textContent.length);
        (<any>rteObj).keyDown(keyboardEventArgs);
        keyBoardEvent.clipboardData = {
            getData: () => { return `<span><a class="e-rte-anchor" id="anchorEle2" href="https://www.syncfusion.com/" title="https://www.syncfusion.com/" target="_blank" aria-label="Open in new window">https://www.syncfusion.com/ </a></span>`; },
            items: []
        };
        expect(nodetext.querySelector("BR")).toBe(null);
        (<any>rteObj).onPaste(keyBoardEvent);
        setTimeout(() => {
            const anchorText: any = rteObj.inputElement.querySelector("#anchorEle2");
            const sel2: void = new NodeSelection().setCursorPoint(
                document, anchorText.childNodes[0], anchorText.textContent.length);
            (<any>rteObj).keyDown(keyboardEventArgs);
            expect(anchorText.querySelector("BR")).toBe(null);
            done();
        }, 100);
    });
    afterAll((done) => {
        destroy(rteObj);
        done();
    });
});
