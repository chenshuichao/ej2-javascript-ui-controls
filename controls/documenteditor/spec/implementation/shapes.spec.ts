import { DocumentEditor } from '../../src/document-editor/document-editor';
import { createElement } from '@syncfusion/ej2-base';
import { TestHelper } from '../test-helper.spec';
import { Selection } from '../../src/index';
import { Editor } from '../../src/index';
import { EditorHistory } from '../../src/document-editor/implementation/editor-history/editor-history';

describe('validation for shape preservation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll((): void => {
        let ele: HTMLElement = createElement('div', {
            id: 'container',
            styles: 'width:1000px;height:500px'
        });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
        DocumentEditor.Inject(Editor, Selection, EditorHistory); editor.enableEditorHistory = true;
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done): void => {
        editor.destroy();
        editor = undefined;
        document.body.removeChild(document.getElementById('container'));
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });
    it('Basics Shapes Validation', () => {
        let baiscShapes = '{"sfdt":"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"}';
        editor.open(baiscShapes);
    });
    it('Block Arrow Shapes Validation', () => {
        let blockArrowShapes = '{"sfdt":"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"}';
        editor.open(blockArrowShapes);
    });
    it('Equation Shapes Validation', () => {
        let equationShapes = '{"sfdt":"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"}';
        editor.open(equationShapes);
    });
    it('Line Shapes Validation', () => {
        let lineShapes = '{"sfdt":"UEsDBBQAAAAIAOJYBlncQlRqzQgAACowAAAEAAAAc2ZkdOxaX2/byBH/KsT2sYpALv/rzX/jJHbixr4Ah2seVtJSZEyRArmKTzEMFLmneznggLuiLwX61odD0QN6QA996YcJkKC9fojO7JKSaFE1ZSm1Djgb8C5nh7vzm9/uDDn0FUlHIhpGb/hZ0BekI7Ixb5Gc90jnsyvSlX8j+TeP+qRj6NQ3qWdSt0US0iF7aZLwnkizjrY3zl7zvmbopEVeg2aLXKK+3qYtEkLP9No6yHIlhG4468YB6VyRWN4VB2AGyMAC8ivDdnSPHh4SOZvetmEcbtOvWySQ90itw+IHtEBowKCQ62CrJns9gkvLaVvQTZWEqSaDkQdm29KpR0374NemB5aBzHR9abnSDpV2WKudoWWIDUdl7w3pUNtwHNeynRZhqQIGtmKjpup3C90+wPZlB+ZRHbQZO6jSIpFcAKbJQW6Y4AIhoYsCQjwkHbete0BJNusK6JptxwP17lwXqHx5fd0q6PQNj7q+QekyNv15Ml2n5JJS9OTPhkvqgHBdLh3LpNvMpeF7lucbxjIqvXkqHbeg0vfum0nbaHuNmTQsG7XXY9K2dG+rmTR137CpYZsLXB7E3fRSc6shlrYdyaVHkdT75NKRpjTk8oFhrH8qLdOzNs2ltUkuQejqpm7pS7h0KlxSoziXjoX7/B65tNxVAqwtk/t6VJqmo281lT51bOoAmiVU2hUqDRWpSMe28FDcI5UPKMBsziWkVmddLimQuc1ceo7vO55fHMozkbFoEAptJ8uAxymxmlVh1LdkvCpB32Oc1U0ME//POGuYxoaffsyNHk3DpD5QcBuhZpVQr8ic5j0TCs9AzQ/oA4gsax9QUPO2l08TH2YtD7dchc4ZkbRCpGcVafO+T2Zx1hoz6a3NpA1Zydo+Jl9evwSrcZZrWU4YwfxXJERuHVw2mPZG+DpiUNkFBl1fduWSsidXlD1cUPVwPdXrB+gPaFOuOl2oVuBdI9g4OGWuWp6ALbBHAmxxPCpbrvQGCbBJdjLWjXrAcRdJf8ovT9mAE4ADe0W6JMjB70AyQgAB2RmJNMc9kb/BlcsR7JNhlKTZbtSPcDxgpeRoJ8mVKOCLsmRRqAovJtAS9XG07MsFdWqDh0fSOAYQ5IMY7l+wBF7t4b3V1l2X6r4FlMVIL27s7mBxYyNRYiJrPWpD49F7mmZDFoMRyeezKzynM5UjzvpRMtAMdNuyW2DteVVtL2QZqTiV6lWnavtRPorZBL0iDdUPLdcx1AlU3i5vUd5mr256GyU3vY2yA9jmO3nE5h0+0526s4telP5Ex1rYSVX8uLhMVBvjk8l1vT9oc3/QGn8Yzsr+KG/5iP5YdAdt6A6zuTvMOnfIBZcit5Yir4F5CyKzISKrOSKriggtrgETSSh3xGGVOGiJw2qIw26Ow77BzAIdm7Hcbmi509xyZzkDto+/6zNASxx6icNpiMNtjsOtY2AOwYYsdxta7jW33FvOAHXxdz0GKuZ7Dc33m5vv1zl+zvD1DPaXGVzUc/d5wMax0E5ZxgYZG4XaYZqIMhMXz8nKbu2cdWNexVLIqnMuZOPu8oW2NFXXA6KrAtqeXFsPyFwZ0CazZb1N1go2bSrf1Vtir+KdO2es+rWdO3phnZxTb4m7shfukjXq1/bu6IV14n69Jf7KXrhLCK8mk/NIyHh7SyKRanUvPt7y4FMET+9jxBowIsdSA1Q8KjnJmnuDLF8ZUXcxKVUQNU4eWwC3yt/ZuCuaUVhq3vJ+Mn+w7hJxC1P1tjtjJsaCBTZxgqWe6xtU3LTsLolik2ZXPfybcSoauFeqLX9KtOArmqXPRYvF9zjBFndpZdYVA9TiklVgx1E+N08twgWVks+krIDVHa1HieBJzrWD4ShkeZRvIM/eML1coSE3FfUV3mbnNjCsasGHC6jS67rrwD8S+Ra86GVL5NXqizGjF4b6GYgAzEhOjM/RYGRZvM2xDgyN/FAii8BY2iurvVMDsQom1rn/5hGs9dCmSLuxxnMe8IwnPd5siW79Et0i5xbHFiqJWOjsi8tplXao9ovoqSKpmNVSseYaiiFsDWRIZKp+HASqJh6AsVDLn/v3MRHDGuS3Y+DYJKo83FsybpXjyXQcroEv/lFm7aVDVTqG6qfoKkAigPZqWnnFan84VEETXCEbpONZEESSAwiEiBwHYjk9jsZMwN6GW2tSHZqlUwM/WUGhf/oLRrbUzZw10QKw/0sL4OKXjivyeMRQ/f2PP757+8O7t39/98UX797+VTvGryowwxFLoCBMfvrz1//54++0f//tTz99860SY1H8w1++/PCPf84rI6L3v//+ww/fv//DV//67huQYuVcPhIMea5B4Vx7ng5hTVDn3ax24DxkmFZ2kkHOEoZDIDwQIQqfThh8w2iRXS4NewFBoo/XD8evcLKzMBsLzENPwiFen6RpvJtmctonqAnrjZOBuiMbw+Vzxl7jDXsK0sF4FPKhzFl7IccpTmOABcX+hMNnJhClFxyJ/TSK0J6TqJeleRoI7dNI22WRXPw8wgAyN3YUQbxkE6bAoRUnL7TdNEblfY4fU8gJeFrG1HMeo10P2ViwoZyN4WEix0zAh6AWOZtkeFwPcvj2lQx4nGoHfZ7nOPQsgyU65AmDkCoxnsSToRRkIrpAwTFL4SGB7KcXEIaGIzlflEBcI4/yC/AV005TIe9MpX+xATNZMsX2IuKilrVPYBdUQKNgjKHuIU8lN5M4YHBScUsMcdPtZJFEvDseoCuPOY/ZJetzrn3yCMXpKK1M+DgE0o84WvGYSadhk3AIe+f8c9yBkFLRd2d8kBaTnEzUPpiwZMiyUu8pYEUfdjMgBh0X9y5wc0WY15i681kOQ3M6pyFDj2CTK8dNsmQJETD0avkQXzYEG/WmFecMHj/nnXDOIu2Yq5FxZQTJkKNjORxIAgvzIVvgp6MGoWhbQlDD4HNb2Cn3WBFsyssixOylWT9aL8Lss3FyyuEI/RJgNhpgSqZ+CStbHVbgWfe/AAAA//8DAFBLAQItABQAAAAIAOJYBlncQlRqzQgAACowAAAEAAAAAAAAAAAAIAAAAAAAAABzZmR0UEsFBgAAAAABAAEAMgAAAO8IAAAAAA=="}';
        editor.open(lineShapes);
    });
    it('StarAndBanner Shapes Validation', () => {
        let starAndBanner = '{"sfdt":"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"}';
        editor.open(starAndBanner);
    });
    it('Rectangle Shapes Validation', () => {
        let recntangleShapes = '{"sfdt":"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"}';
        editor.open(recntangleShapes);
    });
    it('Flowchart Shapes Validation', () => {
        let flowchartShapes = '{"sfdt":"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"}';
        editor.open(flowchartShapes);
    });
    it('Edited Shapes Validation', () => {
        let editedShapes = '{"sfdt":"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"}';
        editor.open(editedShapes);
    });
});
