import { DocumentEditor } from '../../src/document-editor/document-editor';
import { createElement } from '@syncfusion/ej2-base';
import { BodyWidget, ParagraphWidget, ElementBox, LineWidget, TextElementBox, TabElementBox, HeaderFooters, Page, TableWidget, TableRowWidget, TableCellWidget, ListTextElementBox, ShapeElementBox, FieldElementBox, BlockWidget } from '../../src/document-editor/implementation/viewer/page';
import { WSectionFormat, WParagraphFormat, WCharacterFormat, WParagraphStyle, WStyle, WTabStop } from '../../src/document-editor/implementation/format/index';
import { Selection, Editor, EditorHistory, HelperMethods, WebLayoutViewer, DocumentHelper } from '../../src/document-editor/index';
import { TestHelper } from '../test-helper.spec';
let tabSfdt:any={"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":36,"rightMargin":36,"topMargin":64.80000305175781,"bottomMargin":43.20000076293945,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false},"blocks":[{"rows":[{"cells":[{"blocks":[{"rows":[{"cells":[{"blocks":[{"paragraphFormat":{"rightIndent":31.299999237060547,"styleName":"Default","listFormat":{},"tabs":[{"position":62.79999923706055,"deletePosition":0,"tabJustification":"Left","tabLeader":"None"}]},"characterFormat":{"bold":true,"fontSize":10,"boldBidi":true,"fontSizeBidi":10},"inlines":[{"characterFormat":{},"imageString":"data:image/jpeg;base64,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","isMetaFile":false,"width":72.00001,"height":69.00001,"iscrop":false,"name":"Picture 1","title":"DWC","visible":true,"widthScale":85.7142944,"heightScale":85.9813156,"verticalPosition":0,"verticalOrigin":"Margin","verticalAlignment":"None","horizontalPosition":0,"horizontalOrigin":"Margin","horizontalAlignment":"None","allowOverlap":true,"textWrappingStyle":"Inline","textWrappingType":"Both","layoutInCell":true,"zOrderPosition":2147483647},{"characterFormat":{"bold":true,"fontSize":10,"boldBidi":true,"fontSizeBidi":10},"text":"\t"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{"backgroundColor":"empty","foregroundColor":"empty","textureStyle":"TextureNone"},"preferredWidth":94.25,"preferredWidthType":"Point","cellWidth":94.25,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":0},{"blocks":[{"paragraphFormat":{"rightIndent":31.299999237060547,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Arial","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Arial"},"inlines":[]},{"rows":[{"cells":[{"blocks":[{"paragraphFormat":{"rightIndent":31.299999237060547,"textAlignment":"Center","afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Arial","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Arial","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Arial"},"text":"State of California"}]},{"paragraphFormat":{"rightIndent":31.299999237060547,"textAlignment":"Center","afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Arial","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Arial","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Arial"},"text":"Division of Workers' Compensation"}]},{"paragraphFormat":{"rightIndent":31.299999237060547,"textAlignment":"Center","afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Arial","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Arial","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Arial"},"text":"APPLICATION FOR INDEPENDENT MEDICAL REVIEW"}]},{"paragraphFormat":{"rightIndent":31.299999237060547,"textAlignment":"Center","afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Arial","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Arial","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Arial"},"text":"DWC Form IMR - California Code of Regulations, title 8, section 9792.10.2"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":435.6000061035156,"preferredWidthType":"Point","cellWidth":435.6000061035156,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":0}],"rowFormat":{"height":26,"allowBreakAcrossPages":true,"heightType":"AtLeast","isHeader":false,"borders":{"top":{"hasNoneStyle":false,"lineStyle":"Cleared","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"Cleared","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"Cleared","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"Cleared","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0}},"gridBefore":0,"gridAfter":0}}],"grid":[435.6000061035156],"tableFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"Cleared","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"Cleared","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"Cleared","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"Cleared","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"leftIndent":0,"tableAlignment":"Left","topMargin":0,"rightMargin":5.4,"leftMargin":5.4,"bottomMargin":0,"preferredWidth":435.6000061035156,"preferredWidthType":"Point","bidi":false,"allowAutoFit":false},"description":null,"title":null,"columnCount":1},{"paragraphFormat":{"rightIndent":31.299999237060547,"styleName":"Default","listFormat":{}},"characterFormat":{"bold":true,"fontSize":10,"boldBidi":true,"fontSizeBidi":10},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{"backgroundColor":"empty","foregroundColor":"empty","textureStyle":"TextureNone"},"preferredWidth":450,"preferredWidthType":"Point","cellWidth":450,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":1}],"rowFormat":{"height":80.5,"allowBreakAcrossPages":true,"heightType":"AtLeast","isHeader":false,"borders":{"top":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0}},"gridBefore":0,"gridAfter":0}}],"grid":[94.25,450],"tableFormat":{"borders":{"top":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0}},"shading":{},"leftIndent":0,"tableAlignment":"Left","topMargin":0,"rightMargin":5.4,"leftMargin":5.4,"bottomMargin":0,"preferredWidth":544.25,"preferredWidthType":"Point","bidi":false,"allowAutoFit":false},"description":null,"title":null,"columnCount":2},{"paragraphFormat":{"rightIndent":31.299999237060547,"styleName":"Default","listFormat":{}},"characterFormat":{"bold":true,"fontSize":10,"boldBidi":true,"fontSizeBidi":10},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":487.6000061035156,"preferredWidthType":"Point","cellWidth":487.6000061035156,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":0}],"rowFormat":{"height":51.75,"allowBreakAcrossPages":true,"heightType":"AtLeast","isHeader":false,"borders":{"top":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0}},"gridBefore":0,"gridAfter":0}}],"grid":[487.6000061035156],"tableFormat":{"borders":{"top":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0}},"shading":{},"leftIndent":0,"tableAlignment":"Left","topMargin":0,"rightMargin":5.4,"leftMargin":5.4,"bottomMargin":0,"preferredWidth":487.6000061035156,"preferredWidthType":"Point","bidi":false,"allowAutoFit":false},"description":null,"title":null,"columnCount":1},{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":9.5,"fontFamily":"Arial","fontSizeBidi":9.5,"fontFamilyBidi":"Arial"},"inlines":[]}],"headersFooters":{}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"#00000000","boldBidi":false,"italicBidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{},"bidi":false,"keepLinesTogether":false,"keepWithNext":false,"widowControl":true},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"compatibilityMode":"Word2003","styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"afterSpacing":10,"lineSpacing":1.149999976158142,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontSize":11,"fontSizeBidi":11},"next":"Normal"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{}},{"name":"Default","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Arial","fontColor":"#000000FF","fontSizeBidi":12,"fontFamilyBidi":"Arial"},"next":"Default"},{"name":"Header","type":"Paragraph","paragraphFormat":{"listFormat":{},"tabs":[{"position":234,"deletePosition":0,"tabJustification":"Center","tabLeader":"None"},{"position":468,"deletePosition":0,"tabJustification":"Right","tabLeader":"None"}]},"characterFormat":{},"basedOn":"Normal","link":"Header Char","next":"Header"},{"name":"Header Char","type":"Character","characterFormat":{"fontSize":11,"fontSizeBidi":11},"basedOn":"Default Paragraph Font"},{"name":"Footer","type":"Paragraph","paragraphFormat":{"listFormat":{},"tabs":[{"position":234,"deletePosition":0,"tabJustification":"Center","tabLeader":"None"},{"position":468,"deletePosition":0,"tabJustification":"Right","tabLeader":"None"}]},"characterFormat":{},"basedOn":"Normal","link":"Footer Char","next":"Footer"},{"name":"Footer Char","type":"Character","characterFormat":{"fontSize":11,"fontSizeBidi":11},"basedOn":"Default Paragraph Font"},{"name":"Balloon Text","type":"Paragraph","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Tahoma","fontSizeBidi":8,"fontFamilyBidi":"Tahoma"},"basedOn":"Normal","link":"Balloon Text Char","next":"Balloon Text"},{"name":"Balloon Text Char","type":"Character","characterFormat":{"fontSize":8,"fontFamily":"Tahoma","fontSizeBidi":8,"fontFamilyBidi":"Tahoma"},"basedOn":"Default Paragraph Font"},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":12,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[],"customXml":[],"footnotes":{"separator":[{"paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"\u0003"}]}],"continuationSeparator":[{"paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"\u0004"}]}],"continuationNotice":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[]}]},"endnotes":{"separator":[{"paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"\u0003"}]}],"continuationSeparator":[{"paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"\u0004"}]}]}};
describe('Resolve the content hanging issue while opening the attached document', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        DocumentEditor.Inject(Selection, Editor)
        editor = new DocumentEditor({ isReadOnly: false, enableEditor: true});
        editor.enableAllModules();
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });
    it('Width validation', () => {
        expect(editor.open(JSON.stringify(tabSfdt))).not.toThrowError();
    });
});