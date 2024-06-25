/**
 * Gantt toolbar spec
 */
import { Gantt, Edit, Toolbar, Selection, ZoomTimelineSettings, Filter, PdfQueryCellInfoEventArgs, PdfExport, CriticalPath, DayMarkers, Reorder, Resize, ColumnMenu, VirtualScroll, Sort, ContextMenu, ExcelExport, PdfQueryTimelineCellInfoEventArgs } from '../../src/index';
import { exportData, image, adventProFont, GanttData1, pdfData1, customZoomingdata, templateData, projectResourcestemplate, virtual1, criticalData1, resourcesData1, resourceCollection1, coulmntemplate, resourceCollectiontemplate1, splitTasks, headerFooter, weekEndData,pdfData, images, milestoneTemplate } from '../base/data-source.spec';
import { PdfExportProperties } from '../../src/gantt/base/interface';
import { createGantt, destroyGantt } from '../base/gantt-util.spec';
import { PdfDocument, PdfColor, PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { PdfTrueTypeFont } from '@syncfusion/ej2-pdf-export';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import {  triggerMouseEvent, getKeyUpObj } from '../base/gantt-util.spec';
Gantt.Inject(Edit, Toolbar, Selection, Filter, PdfExport, CriticalPath, DayMarkers, Reorder, Resize, ColumnMenu, VirtualScroll, Sort, ContextMenu, ExcelExport);

describe('Gantt pdfexport support', () => {
    let exportComplete: () => void = () => true;
    describe('Gantt toolbar action', () => {
        let ganttObj: Gantt;
        beforeAll((done: Function) => {
            ganttObj = createGantt(
                {
                    dataSource: exportData,
                    allowPdfExport: true,
                    taskFields: {
                        id: 'TaskID',
                        name: 'TaskName',
                        startDate: 'StartDate',
                        endDate: 'EndDate',
                        duration: 'Duration',
                        progress: 'Progress',
                        child: 'subtasks',
                        dependency: 'Predecessor'
                    },
                    toolbar: ['PdfExport'],
                    projectStartDate: new Date('03/25/2019'),
                    projectEndDate: new Date('05/30/2019'),
                    rowHeight: 40,
                    taskbarHeight: 30,
                    timelineSettings: {
                        topTier: {
                            unit: 'Year',
                            format: 'dd/MM/yyyy'
                        },
                        bottomTier: {
                            unit: 'Month',
                            count: 1
                        }
                    },
                    pdfExportComplete: exportComplete,
                    labelSettings: {
                        leftLabel: 'TaskName',
                        taskLabel: 'Progress',
                        rightLabel: 'TaskName'
                    },
                    beforePdfExport: (args: any) => {
                        ganttObj.beforePdfExport = undefined;
                        args.cancel = true;
                    },
                    pdfQueryCellInfo: (args: any) => {
                        ganttObj.pdfQueryCellInfo = undefined;
                        args.style = { backgroundColor: '#99ffcc' };
                    },
                }, done);
        });
        it("Export cancel Check", (done: Function) => {
            ganttObj.pdfExport().then((doc) => {
                expect(doc).toBeUndefined();
                done();
            });
        });
        it('gantt exporting(Check with multiple exporting)', (done) => {
            spyOn(ganttObj, 'pdfExportComplete');
            let props: PdfExportProperties = {};
            props.theme = 'Bootstrap 4';
            ganttObj.pdfExport(props, true).then((pdfDoc: PdfDocument) => {
                expect(ganttObj.pdfExportComplete).toHaveBeenCalled();
                expect(pdfDoc instanceof PdfDocument).toBeTruthy();
                done();
            });     
        });

        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });

        describe('Gantt toolbar action', () => {

            let ganttObj1: Gantt;
            beforeAll((done: Function) => {
                ganttObj1 = createGantt(
                    {
                        dataSource: exportData,
                        allowPdfExport: true,
                        taskFields: {
                            id: 'TaskID',
                            name: 'TaskName',
                            startDate: 'StartDate',
                            endDate: 'EndDate',
                            duration: 'Duration',
                            progress: 'Progress',
                            child: 'subtasks',
                            dependency: 'Predecessor'
                        },
                        toolbar: ['PdfExport'],
                        timelineSettings: {
                            topTier: {
                                unit: 'Month',
                                format: 'dd/MM/yyyy'
                            },
                            bottomTier: {
                                unit: 'Week',
                                count: 1
                            }
                        },
                        projectStartDate: new Date('03/25/2019'),
                        projectEndDate: new Date('05/30/2019'),
                        rowHeight: 40,
                        taskbarHeight: 30,
                        pdfExportComplete: exportComplete,
                        labelSettings: {
                            leftLabel: 'TaskName',
                            taskLabel: 'Progress',
                            rightLabel: 'TaskName'
                        },
                        // beforePdfExport: (args: any) => {
                        //     ganttObj.beforePdfExport = undefined;
                        //     args.cancel = true;
                        // }
                    }, done);
            });

            // it("Check export theme support", (done: Function) => {
            //     let props: PdfExportProperties = {};
            //     props.theme = 'Fabric';
            //     let customtheme: CustomGanttTheme = {};
            //     customtheme.milestoneColor = new PdfColor(128, 0, 128);
            //     ganttObj1.pdfExport(props, true).then((pdfDoc: PdfDocument) => {
            //         done();
            //     });
            //     ganttObj1.pdfQueryTaskbarInfo = (args: any) => {
            //         expect(args.taskbar.taskColor).toBe(new PdfColor(0, 91, 163));
            //         if (args.row.TaskID === 2) {
            //           expect(args.taskbar.milestoneColor).toBe(new PdfColor(128, 0, 128));
            //         }
            //     } 
            // });
            afterAll(() => {
                if (ganttObj1) {
                    destroyGantt(ganttObj1);
                }
            });
        });
        describe('Gantt PDF Export', () => {

            let ganttObj: Gantt;
            beforeAll((done: Function) => {
                ganttObj = createGantt(
                    {
                        dataSource: exportData,
                        allowPdfExport: true,
                        taskFields: {
                            id: 'TaskID',
                            name: 'TaskName',
                            startDate: 'StartDate',
                            endDate: 'EndDate',
                            duration: 'Duration',
                            progress: 'Progress',
                            child: 'subtasks',
                            dependency: 'Predecessor'
                        },
                        toolbar: ['PdfExport'],
                        projectStartDate: new Date('03/25/2019'),
                        projectEndDate: new Date('05/30/2019'),
                        rowHeight: 40,
                        taskbarHeight: 30,
                        loadingIndicator: { indicatorType: 'Shimmer' },
                        pdfExportComplete: (args: any) => {
                            expect(args.name).toBe("pdfExportComplete");
                        },
                        columns: [
                            { field: 'TaskID', visible: false },
                            {
                                field: 'TaskName',
                                headerText: 'Task Name',
                                width: '250',
                                clipMode: 'EllipsisWithTooltip',
                            },
                            { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                            { field: 'Duration', headerText: 'Duration' },
                            { field: 'EndDate', headerText: 'End Date' },
                            { field: 'Predecessor', headerText: 'Predecessor' },
                        ],
                        treeColumnIndex: 0,
                        height: '450px',
                    }, done);
            });
            afterAll(() => {
                if (ganttObj) {
                    destroyGantt(ganttObj);
                }
            });
            it('Export with custom date format', () => {
                ganttObj.pdfExport();
            });
        });
    });
});
describe('Gantt PDF Export with blobdata', () => {

    let ganttObj: Gantt;
    let blobDatas: any;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: exportData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(!isNullOrUndefined(args)).toBe(true);
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                treeColumnIndex: 0,
                height: '450px',

            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export blob object', () => {
        ganttObj.pdfExport(null, null, null, true)

    });
});
describe('Gantt PDF Export with baseline', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: 'Product Concept',
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 2, TaskName: 'Defining the product and its usage', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
                            {
                                TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3,
                                Indicators: [
                                    {
                                        'date': '04/10/2019',
                                        'iconClass': 'e-btn-icon e-notes-info e-icons e-icon-left e-gantt e-notes-info::before',
                                        'name': 'Indicator title',
                                        'tooltip': 'tooltip'
                                    }
                                ]
                            },
                            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: "2", Progress: 30 },
                        ]
                    }],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data with baseline', () => {
        ganttObj.pdfExport();
    });
});
describe('Gantt PDF Export with eventmarker', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: 'Product Concept',
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 2, TaskName: 'Defining the product and its usage', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
                            {
                                TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3,
                                Indicators: [
                                    {
                                        'date': '04/10/2019',
                                        'iconClass': 'e-btn-icon e-notes-info e-icons e-icon-left e-gantt e-notes-info::before',
                                        'name': 'Indicator title',
                                        'tooltip': 'tooltip'
                                    }
                                ]
                            },
                            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: "2", Progress: 30 },
                        ]
                    }],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                eventMarkers: [
                    {
                        day: '04/02/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data with eventMarker', () => {
        let pdfExportProperties = {
            ganttStyle: {
                font: new PdfTrueTypeFont(adventProFont, 12)
            }
        }
        ganttObj.pdfExport(pdfExportProperties);
    });
});
describe('Gantt PDF Export with eventmarker without label', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: 'Product Concept',
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 2, TaskName: 'Defining the product and its usage', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
                            {
                                TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3,
                                Indicators: [
                                    {
                                        'date': '04/10/2019',
                                        'iconClass': 'e-btn-icon e-notes-info e-icons e-icon-left e-gantt e-notes-info::before',
                                        'name': 'Indicator title',
                                        'tooltip': 'tooltip'
                                    }
                                ]
                            },
                            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: "2", Progress: 30 },
                        ]
                    }],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                eventMarkers: [
                    {
                        day: '04/02/2019',
                        cssClass: 'e-custom-event-marker',

                    }
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data with eventMarker without lable', () => {
        ganttObj.pdfExport();
    });
});
describe('Gantt PDF Export indicator', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: GanttData1,
                height: '450px',
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    indicators: 'Indicators'
                },
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                allowPdfExport: true,
                toolbar: ['PdfExport'],
                toolbarClick: (args?: any) => {
                    if (args.item.id === 'ganttContainer_pdfexport') {
                        ganttObj.pdfExport();
                    }
                }
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data with indicator', () => {
        ganttObj.pdfExport();
    });
});
describe('Gantt PDF Export with eventmarker without empty  label', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: 'Product Concept',
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 2, TaskName: 'Defining the product and its usage', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
                            {
                                TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3,
                                Indicators: [
                                    {
                                        'date': '04/10/2019',
                                        'iconClass': 'e-btn-icon e-notes-info e-icons e-icon-left e-gantt e-notes-info::before',
                                        'name': 'Indicator title',
                                        'tooltip': 'tooltip'
                                    }
                                ]
                            },
                            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: "2", Progress: 30 },
                        ]
                    }],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                eventMarkers: [
                    {
                        label: '',
                        day: '04/02/2019',
                        cssClass: 'e-custom-event-marker',

                    }
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data with eventMarker without empty lable', () => {
        ganttObj.pdfExport();
    });
});
describe('Gantt PDF Export with customization of header and footer', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: 'Product Concept',
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 2, TaskName: 'Defining the product and its usage', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
                            {
                                TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3,
                                Indicators: [
                                    {
                                        'date': '04/10/2019',
                                        'iconClass': 'e-btn-icon e-notes-info e-icons e-icon-left e-gantt e-notes-info::before',
                                        'name': 'Indicator title',
                                        'tooltip': 'tooltip'
                                    }
                                ]
                            },
                            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: "2", Progress: 30 },
                        ]
                    }],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it("Export data with header and footer", () => {
        let exportProperties: PdfExportProperties = {
            header: {
                fromTop: 0,
                height: 150,
                contents: [
                    {
                        type: 'Text',
                        value: 'INVOICE',
                        position: { x: 380, y: 0 },
                        style: { textBrushColor: '#C25050', fontSize: 25 },
                    },
                    {
                        type: 'Text',
                        value: 'INVOICE NUMBER',
                        position: { x: 700, y: 30 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'Date',
                        position: { x: 800, y: 30 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: '223344',
                        position: { x: 700, y: 50 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'CUSTOMER ID',
                        position: { x: 700, y: 70 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'TERMS',
                        position: { x: 800, y: 70 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    }, {
                        type: 'Text',
                        value: '223',
                        position: { x: 700, y: 90 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'Net 30 days',
                        position: { x: 800, y: 90 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'Adventure Traders',
                        position: { x: 20, y: 30 },
                        style: { textBrushColor: '#C67878', fontSize: 20 }
                    },
                    {
                        type: 'Text',
                        value: '2501 Aerial Center Parkway',
                        position: { x: 20, y: 65 },
                        style: { textBrushColor: '#000000', fontSize: 11 }
                    },
                    {
                        type: 'Text',
                        value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
                        position: { x: 20, y: 80 },
                        style: { textBrushColor: '#000000', fontSize: 11 }
                    },
                    {
                        type: 'Image',
                        src: image,
                        position: { x: 400, y: 70 },
                        size: { height: 50, width: 50 },
                    },

                ]
            },
            footer: {
                fromBottom: 160,
                height: 100,
                contents: [
                    {
                        type: 'Text',
                        value: 'Thank you for your business !',
                        position: { x: 350, y: 40 },
                        style: { textBrushColor: '#C67878', fontSize: 14 }
                    },
                    {
                        type: 'PageNumber',
                        pageNumberType: 'LowerRoman',
                        format: 'Page {$current} of {$total}',
                        position: { x: 0, y: 25 },
                        size: { height: 50, width: 100 },
                        style: { textBrushColor: '#000000', hAlign: 'Center', vAlign: 'Bottom' }
                    },
                    {
                        type: 'PageNumber',
                        position: { x: 250, y: 10 },
                        pageNumberType:'UpperLatin',
                        style: { textBrushColor: '#C67878', fontSize: 14 }
                    },
                    {
                        type: 'Line',
                        points: { x1: 400, y1: 90, x2: 450, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'Dash'
                        }
                    },
                ]
            },
        };
        ganttObj.pdfExport(exportProperties, true);
    });
});
describe('Gantt PDF Export with holiday label', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: 'Product Concept',
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 2, TaskName: 'Defining the product and its usage', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
                            {
                                TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3,
                                Indicators: [
                                    {
                                        'date': '04/10/2019',
                                        'iconClass': 'e-btn-icon e-notes-info e-icons e-icon-left e-gantt e-notes-info::before',
                                        'name': 'Indicator title',
                                        'tooltip': 'tooltip'
                                    }
                                ]
                            },
                            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: "2", Progress: 30 },
                        ]
                    }],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                eventMarkers: [
                    {
                        day: '04/02/2019',
                        cssClass: 'e-custom-event-marker',

                    }
                ],
                holidays: [{
                    from: "04/04/2019",
                    to: "04/05/2019",
                    label: " Public holidays",
                    cssClass: "e-custom-holiday"

                },
                {
                    from: "04/12/2019",
                    to: "04/12/2019",
                    label: " Public holiday",
                    cssClass: "e-custom-holiday"

                }],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data with holiday lable', () => {
        var exportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
            }
        };
        ganttObj.pdfExport(exportProperties);
    });
});
describe('Gantt PDF Export  with number taskname', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: "1project",
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 2, TaskName: 'Defining the product and its usage', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
                            {
                                TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3,
                                Indicators: [
                                    {
                                        'date': '04/10/2019',
                                        'iconClass': 'e-btn-icon e-notes-info e-icons e-icon-left e-gantt e-notes-info::before',
                                        'name': 'Indicator title',
                                        'tooltip': 'tooltip'
                                    }
                                ]
                            },
                            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: "2", Progress: 30 },
                        ]
                    }],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                eventMarkers: [
                    {
                        day: '04/02/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                labelSettings: {
                    taskLabel: 'TaskName',
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data with long text', () => {
        ganttObj.pdfExport();
    });
});
describe('Gantt PDF Export  with number taskname', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: "1project",
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 2, TaskName: 'Defining the product and its usage', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
                            {
                                TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3,
                                Indicators: [
                                    {
                                        'date': '04/10/2019',
                                        'iconClass': 'e-btn-icon e-notes-info e-icons e-icon-left e-gantt e-notes-info::before',
                                        'name': 'Indicator title',
                                        'tooltip': 'tooltip'
                                    }
                                ]
                            },
                            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: "2", Progress: 30 },
                        ]
                    }],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                eventMarkers: [
                    {
                        day: '04/02/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                labelSettings: {
                    taskLabel: 'TaskName',
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data with long text', () => {
        ganttObj.pdfExport();
    });
});
describe('Gantt PDF Export for resource', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [{
                    TaskID: 1,
                    TaskName: 'Project initiation',
                    StartDate: new Date('03/29/2019'),
                    EndDate: new Date('04/21/2019'),
                    subtasks: [
                        {
                            TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('03/29/2019'), Duration: 3,
                            Progress: 30, work: 10, resourceInfo: [{ resourceId: 1, resourceUnit: 50 }]
                        },
                        {
                            TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('03/29/2019'), Duration: 4,
                            resourceInfo: [{ resourceId: 2, resourceUnit: 70 }], Progress: 30, work: 20
                        },
                        {
                            TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('03/29/2019'), Duration: 4,
                            resourceInfo: [{ resourceId: 1, resourceUnit: 75 }], Predecessor: 2, Progress: 30, work: 10,
                        },
                    ]
                }],
                resources: [
                    { resourceId: 1, resourceName: 'Martin Tamer', resourceGroup: 'Planning Team' },
                    { resourceId: 2, resourceName: 'Rose Fuller', resourceGroup: 'Testing Team' }],
                viewType: 'ResourceView',
                showOverAllocation: true,
                enableContextMenu: true,
                allowSorting: true,
                allowReordering: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency: 'Predecessor',
                    resourceInfo: 'resourceInfo',
                    work: 'work',
                    child: 'subtasks',
                },
                resourceFields: {
                    id: 'resourceId',
                    name: 'resourceName',
                    unit: 'resourceUnit',
                    group: 'resourceGroup'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID' },
                    { field: 'TaskName', headerText: 'Name', width: 250 },
                    { field: 'work', headerText: 'Work' },
                    { field: 'resourceInfo', headerText: 'ResourceInfo' }
                ],
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll',
                    { text: 'Show/Hide Overallocation', tooltipText: 'Show/Hide Overallocation', id: 'showhidebar' }, 'Search', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'PrevTimeSpan', 'NextTimeSpan', 'ExcelExport', 'CsvExport', 'PdfExport'],
                projectStartDate: new Date('03/28/2019'),
                projectEndDate: new Date('05/18/2019')
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export with resource data', () => {
        ganttObj.pdfExport();
    });
});
describe('Gantt PDF Export', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: exportData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export with custom date format', () => {
        ganttObj.pdfExport();
    });
});
describe('Gantt PDF Export with critical task', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: 'Project Initiation',
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 2, TaskName: 'Identify Site location', Duration: 3, Progress: 50 },
                            { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Progress: 50 },
                            { TaskID: 4, TaskName: 'Soil test approval', EndDate: new Date('04/08/2019'), Progress: 50 },
                        ]
                    }],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                pdfQueryTaskbarInfo: (args: any) => {
                    args.taskbar.progressColor = new PdfColor(205, 92, 92);
                    args.taskbar.taskColor = args.taskbar.taskBorderColor = new PdfColor(240, 128, 128);
                    args.taskbar.progressFontColor = new PdfColor(105, 92, 92);
                    args.taskbar.milestoneColor = new PdfColor(240, 128, 128);

                },
                enableCriticalPath: true,
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy', },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                allowUnscheduledTasks: true,
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export with custom date format', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'Ledger'
        };
        ganttObj.pdfExport(exportProperties);
    });
});
describe('Gantt PDF Export with empty gantt', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data with empty gantt', () => {
        ganttObj.pdfExport();
    });
});
describe('Gantt PDF Export for connector lines', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: 'Product Concept',
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 2, TaskName: 'Defining the product and its usage', Predecessor: '3FS', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
                            {
                                TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: '4FF',
                                Indicators: [
                                    {
                                        'date': '04/10/2019',
                                        'iconClass': 'e-btn-icon e-notes-info e-icons e-icon-left e-gantt e-notes-info::before',
                                        'name': 'Indicator title',
                                        'tooltip': 'tooltip'
                                    }
                                ]
                            },
                            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: "10FF", Progress: 30 },
                        ]
                    },
                    { TaskID: 5, TaskName: 'Concept Approval', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: "3,4" },
                    {
                        TaskID: 6,
                        TaskName: 'Market Research',
                        StartDate: new Date('04/02/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            {
                                TaskID: 7,
                                TaskName: 'Demand Analysis',
                                StartDate: new Date('04/04/2019'),
                                EndDate: new Date('04/21/2019'),
                                subtasks: [
                                    { TaskID: 8, TaskName: 'Customer strength', BaselineStartDate: new Date('04/08/2019'), BaselineEndDate: new Date('04/12/2019'), StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: "5", Progress: 30 },
                                    { TaskID: 9, TaskName: 'Market opportunity analysis', StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: "20FF" }
                                ]
                            },
                            { TaskID: 10, TaskName: 'Competitor Analysis', StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: "7,8", Progress: 30 },
                            { TaskID: 11, TaskName: 'Product strength analysis', StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: "9SS" },
                            { TaskID: 12, TaskName: 'Research complete', StartDate: new Date('04/04/2019'), Duration: 0, Predecessor: "10FF" }
                        ]
                    },
                    {
                        TaskID: 13,
                        TaskName: 'Product Design and Development',
                        StartDate: new Date('04/04/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 14, TaskName: 'Functionality design', StartDate: new Date('04/04/2019'), Duration: 7, Progress: 30, Predecessor: '19SF', },
                            { TaskID: 15, TaskName: 'Quality design', StartDate: new Date('04/04/2019'), Duration: 5, Predecessor: '14SS', },
                            { TaskID: 16, TaskName: 'Define Reliability', StartDate: new Date('04/04/2019'), Duration: 5, Progress: 30 },
                            { TaskID: 17, TaskName: 'Identifying raw materials ', StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: '5FS', },
                            {
                                TaskID: 18,
                                TaskName: 'Define cost plan',
                                StartDate: new Date('04/04/2019'),
                                EndDate: new Date('04/21/2019'),
                                subtasks: [
                                    { TaskID: 19, TaskName: 'Manufacturing cost', StartDate: new Date('04/04/2019'), Duration: 1, Progress: 30, Predecessor: '12SS' },
                                    { TaskID: 20, TaskName: 'Selling cost', StartDate: new Date('04/04/2019'), Duration: 1, Predecessor: '12SF', }
                                ]
                            },
                            {
                                TaskID: 21,
                                TaskName: 'Development of the final design',
                                StartDate: new Date('04/04/2019'),
                                EndDate: new Date('04/21/2019'),
                                subtasks: [
                                    { TaskID: 22, TaskName: 'Defining dimensions and package volume', StartDate: new Date('04/04/2019'), Duration: 2, Progress: 30, Predecessor: '33SF' },
                                    { TaskID: 23, TaskName: 'Develop design to meet industry standards', StartDate: new Date('04/04/2019'), Duration: 3 },
                                    { TaskID: 24, TaskName: 'Include all the details', StartDate: new Date('04/04/2019'), Duration: 5, Predecessor: '22FS', }
                                ]
                            },
                            { TaskID: 25, TaskName: 'CAD Computer-aided design', StartDate: new Date('04/04/2019'), Duration: 10, Progress: 30, Predecessor: '34SF' },
                            { TaskID: 26, TaskName: 'CAM Computer-aided manufacturing', StartDate: new Date('04/04/2019'), Duration: 10 }
                        ]
                    },
                    { TaskID: 27, TaskName: 'Prototype Testing', StartDate: new Date('04/04/2019'), Duration: 12, Progress: 30, Predecessor: '10SF', },
                    { TaskID: 28, TaskName: 'Include feedback', StartDate: new Date('04/04/2019'), Duration: 5, Predecessor: '9FF', },
                    { TaskID: 29, TaskName: 'Manufacturing', StartDate: new Date('04/04/2019'), Duration: 9, Progress: 30, Predecessor: '8FS', },
                    { TaskID: 30, TaskName: 'Assembling materials to finished goods', StartDate: new Date('04/04/2019'), Duration: 12, Predecessor: '7SS', },
                    {
                        TaskID: 31,
                        TaskName: 'Feedback and Testing',
                        StartDate: new Date('04/04/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 32, TaskName: 'Internal testing and feedback', StartDate: new Date('04/04/2019'), Duration: 5, Progress: 30 },
                            { TaskID: 33, TaskName: 'Customer testing and feedback', StartDate: new Date('04/04/2019'), Duration: 7, Progress: 30 }
                        ]
                    },
                    {
                        TaskID: 34,
                        TaskName: 'Product Development',
                        StartDate: new Date('04/04/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 35, TaskName: 'Important improvements', StartDate: new Date('04/04/2019'), Duration: 2, Progress: 30, Predecessor: '4SS', },
                            { TaskID: 36, TaskName: 'Address any unforeseen issues', StartDate: new Date('04/04/2019'), Duration: 2, Progress: 30 }
                        ]
                    },
                    {
                        TaskID: 37,
                        TaskName: 'Final Product',
                        StartDate: new Date('04/04/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            { TaskID: 38, TaskName: 'Branding product', StartDate: new Date('04/04/2019'), Duration: 5 },
                            { TaskID: 39, TaskName: 'Marketing and pre-sales', StartDate: new Date('04/04/2019'), Duration: 10, Progress: 30, Predecessor: '5FS', }
                        ]
                    }
                ],
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                pdfQueryTimelineCellInfo: (args: any) => {
                    args.timelineCell.backgroundColor = new PdfColor(240, 248, 255);

                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                treeColumnIndex: 0,
                height: '450px'
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data for connector lines', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'Letter11x17'
        };
        ganttObj.pdfExport(exportProperties);
    });
});
describe('Gantt PDF Export with grid width', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: pdfData1,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with holiday lable', () => {
        var exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
                gridWidth: '50%'
            },
            pageSize : 'HalfLetter'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with chart width', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: pdfData1,
                allowPdfExport: true,
                timelineSettings: {
                    showTooltip: true,
                    topTier: {
                        unit: 'Week',
                        format: 'dd/MM/yyyy'
                    }
                },
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                columns: [
                    { field: 'TaskID', headerTextAlign: 'Right' },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    }
                ],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with holiday lable', () => {
        var exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
                chartWidth: '50%'
            },
            pageSize : 'Flsa'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customZoomingLevels with fittowidth ', () => {
    let ganttObj: Gantt;
    let customZoomingLevels: ZoomTimelineSettings[] = [{
        topTier: { unit: 'Month', format: 'MMM, yy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd', count: 1 }, timelineUnitSize: 33, level: 0,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true,
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 66, level: 1,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 30, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 99, level: 2,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 33, level: 3,
        timelineViewMode: 'Week', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 66, level: 4,
        timelineViewMode: 'Week', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 12 }, timelineUnitSize: 66, level: 5,
        timelineViewMode: 'Day', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 6 }, timelineUnitSize: 99, level: 6,
        timelineViewMode: 'Day', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    ];
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: customZoomingdata,
                allowPdfExport: true,
                dataBound: function () {
                    ganttObj.zoomingLevels = customZoomingLevels;
                },
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with customZoomingLevels', () => {
        var exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true
            },
            pageSize:'Arche'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customZoomingLevels ', () => {
    let ganttObj: Gantt;
    let customZoomingLevels: ZoomTimelineSettings[] = [{
        topTier: { unit: 'Month', format: 'MMM, yy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd', count: 1 }, timelineUnitSize: 33, level: 0,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true,
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 66, level: 1,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 30, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 99, level: 2,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 33, level: 3,
        timelineViewMode: 'Week', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 66, level: 4,
        timelineViewMode: 'Week', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 12 }, timelineUnitSize: 66, level: 5,
        timelineViewMode: 'Day', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 6 }, timelineUnitSize: 99, level: 6,
        timelineViewMode: 'Day', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    ];
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: customZoomingdata,
                allowPdfExport: true,
                dataBound: function () {
                    ganttObj.zoomingLevels = customZoomingLevels;
                },
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with customZoomingLevels', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'Archd'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with column header template with fittowidth', () => {
    let ganttObj: Gantt;
    let i: number = 0;
    let pdfColumnHeaderQueryCellInfo = (args: any) => {
        let base64Array: Object[] = [
            { 'TaskName': '/9j/4AAQSkZJRgABAQIAHAAcAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAMAAAITAAMAAAABAAEAAAAAAAAAAAAcAAAAAQAAABwAAAAB/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAIAAgAwERAAIRAQMRAf/EABgAAQEBAQEAAAAAAAAAAAAAAAYIAAcF/8QALBAAAQQCAgEDAwIHAAAAAAAAAQIDBAUGBxESAAgTIRQVQRYxFzhXdpa01f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwB7gessOlaiw2zpdS4Ld2cqngOyl2rLbHcqjpLiy6IzylL7/gp/J+RxwQQt68w6mewu7XrfEKC+azXGuiqiO2r2ybqKnhD3stLVy2TyOg/cj5A5IXr4G8Cf9+aD0XT6K2Nb1GlsEgz4OJW8mLKjY5DaeYdRDdUhxC0thSVJUAQoEEEAjwNW2XoFprGLb1E/QEGdBeRJiyoztK08w6hQUhxC0kFKkqAIUCCCAR4CDD9sbV2RWSso19r3BrDGza2NfWWEnOH21T2Yst2MJKUs1ryAhwslSeHFfBHyRwSHnW26tv12qpO5Ier8GtMdYoVZI2qJm01L0iCGPfC0IeqEcKLfyErKT+DwfjwFvqO/l62h/Zl3/oveB0TwJTe2FRYxX5RqrLrj065HUuZRdzXIOQ7GRHc6yLV+YlmVDcgPJS6044AQVHhTY/I58Ao3lmJUeibfRWBZH6bKCFbUL1K7PTtRpTrzjsQRlzJCWqxoPyFISkqWepUQOfj48Ctdj4j/ABA15lGB/cPoP1JSzaj6v2vd+n+oYW17nTsnv1789ew5445H7+Ad+x+oX+qGu/8AA53/AGPA5drHb+D4rru/xSy3nrPG86i5hkwnOXDjbTIkG9lrU4qCqY271W0R0BfJSFI5UvqQQKWW5cOT6NMhxTZO+9d5Fl72ByIYjQrmM9LMo1oQll0iXIMuSH+3Z9BSlaiFBCeOSH//2Q==' },
            { 'StartDate': '/9j/4AAQSkZJRgABAQIAHAAcAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAMAAAITAAMAAAABAAEAAAAAAAAAAAAcAAAAAQAAABwAAAAB/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAIAAgAwERAAIRAQMRAf/EABcAAQEBAQAAAAAAAAAAAAAAAAcABgX/xAAzEAAABAQDBwEGBwAAAAAAAAABAgMEBQYHEQgSEwAUFRYYITI0IiQxMzVCN0NRVWaCg//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAGBEBAQEBAQAAAAAAAAAAAAAAABEBIUH/2gAMAwEAAhEDEQA/AG2t2PafKP4qHFI3sLlRGR4bE4QlEIi4Yu1XqLJdBsq5UAU1spjEKqoJQBIfEoZTD8QCJcxxTdhwp3JlI6RxCQ5yYQmGOVYjEVYbE8oPVoi8VFNMVRanEoInbjcUvIxwAw27BTHjim7EfTuc6R1ciEhyawi0MbKw6IpQ2J5ReoxFmqCagpC6OBRRI4G4JeRSAJgv3B3ojj2nysGKhvSNlC5UWkeJROLpQ+It2LtJ6syQQcqtlBFRbKUxypJiYBSDyMGUo/AOtP7GoFVcRtTZRkWjGHiLcm8F3qKTvLi68Qd72wIoTMslm1MmmcgXAtigmAXsO1lSwYwJKqEwV0mLD8yw54TiTFLMNJFXblWUHAMjpHK2MAJnC5xNZ2n2EgB2N37BdCqOpVQl+uku4fnuHPCceYpmhp4q0cpSg4FkRIhXJhBQ42OBrNFOwEEO5e/cbIUnSAxqBSrEbTKUZ6oxh4hPOXGt1ikkS4uhEGm6MDqHyrK5dPPqEINgNcoqANrhskLWameB0/jWL2uPPWIuYaV6PLO68Jm5CB8SvCy58+qA62nYlreOqN/INmGiCT5cpetjBnmEvcV00w2XUIAio0ndKem6L2Jq5GN2ykQEMixQEygaYBcN3KH5Y7PTxThLlL0cYMjQlliummJS6vAFlHc7qz03WewxXI+s2TiABkRKIlTDTELjvBg/MDZ6eF+WIHT+C4vaHci4i5hqprczb1xabkI5w20LNkyaQBo6lz3v5aQW8R2aYz1VOkrq9rP1Sfx3gX1P9rJvPof8PP8Ar92zDQxLHQ71NzbzJ+EHBkuAfV/X5Gefw968t8+Z7P6fZs4dUz9DvU3KXLf4QcGV4/8AV/X5HmTz968tz+X7P6/fs4dM9K+krq9ox0t/yLjv1P8Aaz7t67/fw/t9uzTH/9k=' },
            { 'Progress': '/9j/4AAQSkZJRgABAQIAHAAcAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAMAAAITAAMAAAABAAEAAAAAAAAAAAAcAAAAAQAAABwAAAAB/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAIAAgAwERAAIRAQMRAf/EABoAAAICAwAAAAAAAAAAAAAAAAAIAwUGBwn/xAArEAAABQIEBQQDAQAAAAAAAAABAgQFBgMHABESFAgTFSEiFhcxMiQzYWL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A6p4AwBgDAK3BuMx4n0rYrftUSgyaWSFuTuiVlVyt1LWLRroSria6pGUycDbYwHEAqjl9ft2wELJxwJ5HEJLPGZJbtQxRDZ9aV+pXwm13dUaSfwMwgc+o5RDwKbL5HIO+Ay6N8Q85l8QaZ5HYpbtWxPnP2Cv1g7U+dyao0qvgdkA5cjlEPIoZ5ZhmHfATzm+d2YC0vrm62ygympHm5Q6KkaSarjVjUaFA1c+gTtBaYm5ZREAE4Z/Hz2wC92j4bLmQW9EOvm+W2nNRwjrCgaVLIkpsFSieonZCNgmIrM8FMJREnNDOiA99P+sBUQng6m8OtDcq1XpO4iv3D6N+f02PU9jsFRq/6+ujzderT9iacs/L4wG3bbW5m9vbQxO1XtNcRf6X3/5/Lj1LcblUev8Ar6ybRp16fsOeWfb4wFvdxruZOmWYlY7FTmm4SJhXtKairVsFOiSooQnTAY9QroYwFAT6hyII9sv7gGcwBgDAGA//2Q==' }
        ]
        while (i < base64Array.length) {
            const key = Object.keys(base64Array[i])[0];
            const value = base64Array[i][key];
            if (key === args.column.field) {
                args.headerTemplate.image = [{
                    base64: value, width: 20, height: 20
                }];
                args.headerTemplate.value = args.column.field;
                args.headerTemplate.fontStyle.fontSize = 6;
                args.headerTemplate.fontStyle.fontColor = new PdfColor(255, 0, 0);
                break;
            }
            i++;
        }
    }
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: templateData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                columns: [
                    { field: 'TaskName', width: 250 },
                    { field: 'StartDate' },
                    { field: 'Progress' }
                ],
                toolbar: ['PdfExport'],
                resources: projectResourcestemplate,
                pdfColumnHeaderQueryCellInfo: pdfColumnHeaderQueryCellInfo,
                projectStartDate: new Date('03/24/2019'),
                projectEndDate: new Date('07/06/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with column template', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
                gridWidth: '50%'
            },
            pageSize :'Archc'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with column header template without image height and width', () => {
    let ganttObj: Gantt;
    let i: number = 0;
    let pdfColumnHeaderQueryCellInfo = (args: any) => {
        let base64Array: Object[] = [
            { 'TaskName': '/9j/4AAQSkZJRgABAQIAHAAcAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAMAAAITAAMAAAABAAEAAAAAAAAAAAAcAAAAAQAAABwAAAAB/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAIAAgAwERAAIRAQMRAf/EABgAAQEBAQEAAAAAAAAAAAAAAAYIAAcF/8QALBAAAQQCAgEDAwIHAAAAAAAAAQIDBAUGBxESAAgTIRQVQRYxFzhXdpa01f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwB7gessOlaiw2zpdS4Ld2cqngOyl2rLbHcqjpLiy6IzylL7/gp/J+RxwQQt68w6mewu7XrfEKC+azXGuiqiO2r2ybqKnhD3stLVy2TyOg/cj5A5IXr4G8Cf9+aD0XT6K2Nb1GlsEgz4OJW8mLKjY5DaeYdRDdUhxC0thSVJUAQoEEEAjwNW2XoFprGLb1E/QEGdBeRJiyoztK08w6hQUhxC0kFKkqAIUCCCAR4CDD9sbV2RWSso19r3BrDGza2NfWWEnOH21T2Yst2MJKUs1ryAhwslSeHFfBHyRwSHnW26tv12qpO5Ier8GtMdYoVZI2qJm01L0iCGPfC0IeqEcKLfyErKT+DwfjwFvqO/l62h/Zl3/oveB0TwJTe2FRYxX5RqrLrj065HUuZRdzXIOQ7GRHc6yLV+YlmVDcgPJS6044AQVHhTY/I58Ao3lmJUeibfRWBZH6bKCFbUL1K7PTtRpTrzjsQRlzJCWqxoPyFISkqWepUQOfj48Ctdj4j/ABA15lGB/cPoP1JSzaj6v2vd+n+oYW17nTsnv1789ew5445H7+Ad+x+oX+qGu/8AA53/AGPA5drHb+D4rru/xSy3nrPG86i5hkwnOXDjbTIkG9lrU4qCqY271W0R0BfJSFI5UvqQQKWW5cOT6NMhxTZO+9d5Fl72ByIYjQrmM9LMo1oQll0iXIMuSH+3Z9BSlaiFBCeOSH//2Q==' },
            { 'StartDate': '/9j/4AAQSkZJRgABAQIAHAAcAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAMAAAITAAMAAAABAAEAAAAAAAAAAAAcAAAAAQAAABwAAAAB/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAIAAgAwERAAIRAQMRAf/EABcAAQEBAQAAAAAAAAAAAAAAAAcABgX/xAAzEAAABAQDBwEGBwAAAAAAAAABAgMEBQYHEQgSEwAUFRYYITI0IiQxMzVCN0NRVWaCg//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAGBEBAQEBAQAAAAAAAAAAAAAAABEBIUH/2gAMAwEAAhEDEQA/AG2t2PafKP4qHFI3sLlRGR4bE4QlEIi4Yu1XqLJdBsq5UAU1spjEKqoJQBIfEoZTD8QCJcxxTdhwp3JlI6RxCQ5yYQmGOVYjEVYbE8oPVoi8VFNMVRanEoInbjcUvIxwAw27BTHjim7EfTuc6R1ciEhyawi0MbKw6IpQ2J5ReoxFmqCagpC6OBRRI4G4JeRSAJgv3B3ojj2nysGKhvSNlC5UWkeJROLpQ+It2LtJ6syQQcqtlBFRbKUxypJiYBSDyMGUo/AOtP7GoFVcRtTZRkWjGHiLcm8F3qKTvLi68Qd72wIoTMslm1MmmcgXAtigmAXsO1lSwYwJKqEwV0mLD8yw54TiTFLMNJFXblWUHAMjpHK2MAJnC5xNZ2n2EgB2N37BdCqOpVQl+uku4fnuHPCceYpmhp4q0cpSg4FkRIhXJhBQ42OBrNFOwEEO5e/cbIUnSAxqBSrEbTKUZ6oxh4hPOXGt1ikkS4uhEGm6MDqHyrK5dPPqEINgNcoqANrhskLWameB0/jWL2uPPWIuYaV6PLO68Jm5CB8SvCy58+qA62nYlreOqN/INmGiCT5cpetjBnmEvcV00w2XUIAio0ndKem6L2Jq5GN2ykQEMixQEygaYBcN3KH5Y7PTxThLlL0cYMjQlliummJS6vAFlHc7qz03WewxXI+s2TiABkRKIlTDTELjvBg/MDZ6eF+WIHT+C4vaHci4i5hqprczb1xabkI5w20LNkyaQBo6lz3v5aQW8R2aYz1VOkrq9rP1Sfx3gX1P9rJvPof8PP8Ar92zDQxLHQ71NzbzJ+EHBkuAfV/X5Gefw968t8+Z7P6fZs4dUz9DvU3KXLf4QcGV4/8AV/X5HmTz968tz+X7P6/fs4dM9K+krq9ox0t/yLjv1P8Aaz7t67/fw/t9uzTH/9k=' },
            { 'Progress': '/9j/4AAQSkZJRgABAQIAHAAcAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAMAAAITAAMAAAABAAEAAAAAAAAAAAAcAAAAAQAAABwAAAAB/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAIAAgAwERAAIRAQMRAf/EABoAAAICAwAAAAAAAAAAAAAAAAAIAwUGBwn/xAArEAAABQIEBQQDAQAAAAAAAAABAgQFBgMHABESFAgTFSEiFhcxMiQzYWL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A6p4AwBgDAK3BuMx4n0rYrftUSgyaWSFuTuiVlVyt1LWLRroSria6pGUycDbYwHEAqjl9ft2wELJxwJ5HEJLPGZJbtQxRDZ9aV+pXwm13dUaSfwMwgc+o5RDwKbL5HIO+Ay6N8Q85l8QaZ5HYpbtWxPnP2Cv1g7U+dyao0qvgdkA5cjlEPIoZ5ZhmHfATzm+d2YC0vrm62ygympHm5Q6KkaSarjVjUaFA1c+gTtBaYm5ZREAE4Z/Hz2wC92j4bLmQW9EOvm+W2nNRwjrCgaVLIkpsFSieonZCNgmIrM8FMJREnNDOiA99P+sBUQng6m8OtDcq1XpO4iv3D6N+f02PU9jsFRq/6+ujzderT9iacs/L4wG3bbW5m9vbQxO1XtNcRf6X3/5/Lj1LcblUev8Ar6ybRp16fsOeWfb4wFvdxruZOmWYlY7FTmm4SJhXtKairVsFOiSooQnTAY9QroYwFAT6hyII9sv7gGcwBgDAGA//2Q==' }
        ]
        while (i < base64Array.length) {
            const key = Object.keys(base64Array[i])[0];
            const value = base64Array[i][key];
            if (key === args.column.field) {
                args.headerTemplate.image = [{
                    base64: value
                }];
                args.headerTemplate.value = args.column.field;
                args.headerTemplate.fontStyle.fontSize = 6;
                args.headerTemplate.fontStyle.fontColor = new PdfColor(255, 0, 0);
                break;
            }
            i++;
        }
    }
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: templateData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                columns: [
                    { field: 'TaskName', width: 250 },
                    { field: 'StartDate' },
                    { field: 'Progress' }
                ],
                toolbar: ['PdfExport'],
                resources: projectResourcestemplate,
                pdfColumnHeaderQueryCellInfo: pdfColumnHeaderQueryCellInfo,
                projectStartDate: new Date('03/24/2019'),
                projectEndDate: new Date('07/06/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with column template', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
                gridWidth: '50%'
            },
            pageSize : 'Archb'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with column header template', () => {
    let ganttObj: Gantt;
    let i: number = 0;
    let pdfColumnHeaderQueryCellInfo = (args: any) => {
        let base64Array: Object[] = [
            { 'TaskName': '/9j/4AAQSkZJRgABAQIAHAAcAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAMAAAITAAMAAAABAAEAAAAAAAAAAAAcAAAAAQAAABwAAAAB/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAIAAgAwERAAIRAQMRAf/EABgAAQEBAQEAAAAAAAAAAAAAAAYIAAcF/8QALBAAAQQCAgEDAwIHAAAAAAAAAQIDBAUGBxESAAgTIRQVQRYxFzhXdpa01f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwB7gessOlaiw2zpdS4Ld2cqngOyl2rLbHcqjpLiy6IzylL7/gp/J+RxwQQt68w6mewu7XrfEKC+azXGuiqiO2r2ybqKnhD3stLVy2TyOg/cj5A5IXr4G8Cf9+aD0XT6K2Nb1GlsEgz4OJW8mLKjY5DaeYdRDdUhxC0thSVJUAQoEEEAjwNW2XoFprGLb1E/QEGdBeRJiyoztK08w6hQUhxC0kFKkqAIUCCCAR4CDD9sbV2RWSso19r3BrDGza2NfWWEnOH21T2Yst2MJKUs1ryAhwslSeHFfBHyRwSHnW26tv12qpO5Ier8GtMdYoVZI2qJm01L0iCGPfC0IeqEcKLfyErKT+DwfjwFvqO/l62h/Zl3/oveB0TwJTe2FRYxX5RqrLrj065HUuZRdzXIOQ7GRHc6yLV+YlmVDcgPJS6044AQVHhTY/I58Ao3lmJUeibfRWBZH6bKCFbUL1K7PTtRpTrzjsQRlzJCWqxoPyFISkqWepUQOfj48Ctdj4j/ABA15lGB/cPoP1JSzaj6v2vd+n+oYW17nTsnv1789ew5445H7+Ad+x+oX+qGu/8AA53/AGPA5drHb+D4rru/xSy3nrPG86i5hkwnOXDjbTIkG9lrU4qCqY271W0R0BfJSFI5UvqQQKWW5cOT6NMhxTZO+9d5Fl72ByIYjQrmM9LMo1oQll0iXIMuSH+3Z9BSlaiFBCeOSH//2Q==' },
            { 'StartDate': '/9j/4AAQSkZJRgABAQIAHAAcAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAMAAAITAAMAAAABAAEAAAAAAAAAAAAcAAAAAQAAABwAAAAB/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAIAAgAwERAAIRAQMRAf/EABcAAQEBAQAAAAAAAAAAAAAAAAcABgX/xAAzEAAABAQDBwEGBwAAAAAAAAABAgMEBQYHEQgSEwAUFRYYITI0IiQxMzVCN0NRVWaCg//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAGBEBAQEBAQAAAAAAAAAAAAAAABEBIUH/2gAMAwEAAhEDEQA/AG2t2PafKP4qHFI3sLlRGR4bE4QlEIi4Yu1XqLJdBsq5UAU1spjEKqoJQBIfEoZTD8QCJcxxTdhwp3JlI6RxCQ5yYQmGOVYjEVYbE8oPVoi8VFNMVRanEoInbjcUvIxwAw27BTHjim7EfTuc6R1ciEhyawi0MbKw6IpQ2J5ReoxFmqCagpC6OBRRI4G4JeRSAJgv3B3ojj2nysGKhvSNlC5UWkeJROLpQ+It2LtJ6syQQcqtlBFRbKUxypJiYBSDyMGUo/AOtP7GoFVcRtTZRkWjGHiLcm8F3qKTvLi68Qd72wIoTMslm1MmmcgXAtigmAXsO1lSwYwJKqEwV0mLD8yw54TiTFLMNJFXblWUHAMjpHK2MAJnC5xNZ2n2EgB2N37BdCqOpVQl+uku4fnuHPCceYpmhp4q0cpSg4FkRIhXJhBQ42OBrNFOwEEO5e/cbIUnSAxqBSrEbTKUZ6oxh4hPOXGt1ikkS4uhEGm6MDqHyrK5dPPqEINgNcoqANrhskLWameB0/jWL2uPPWIuYaV6PLO68Jm5CB8SvCy58+qA62nYlreOqN/INmGiCT5cpetjBnmEvcV00w2XUIAio0ndKem6L2Jq5GN2ykQEMixQEygaYBcN3KH5Y7PTxThLlL0cYMjQlliummJS6vAFlHc7qz03WewxXI+s2TiABkRKIlTDTELjvBg/MDZ6eF+WIHT+C4vaHci4i5hqprczb1xabkI5w20LNkyaQBo6lz3v5aQW8R2aYz1VOkrq9rP1Sfx3gX1P9rJvPof8PP8Ar92zDQxLHQ71NzbzJ+EHBkuAfV/X5Gefw968t8+Z7P6fZs4dUz9DvU3KXLf4QcGV4/8AV/X5HmTz968tz+X7P6/fs4dM9K+krq9ox0t/yLjv1P8Aaz7t67/fw/t9uzTH/9k=' },
            { 'Progress': '/9j/4AAQSkZJRgABAQIAHAAcAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAMAAAITAAMAAAABAAEAAAAAAAAAAAAcAAAAAQAAABwAAAAB/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAIAAgAwERAAIRAQMRAf/EABoAAAICAwAAAAAAAAAAAAAAAAAIAwUGBwn/xAArEAAABQIEBQQDAQAAAAAAAAABAgQFBgMHABESFAgTFSEiFhcxMiQzYWL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A6p4AwBgDAK3BuMx4n0rYrftUSgyaWSFuTuiVlVyt1LWLRroSria6pGUycDbYwHEAqjl9ft2wELJxwJ5HEJLPGZJbtQxRDZ9aV+pXwm13dUaSfwMwgc+o5RDwKbL5HIO+Ay6N8Q85l8QaZ5HYpbtWxPnP2Cv1g7U+dyao0qvgdkA5cjlEPIoZ5ZhmHfATzm+d2YC0vrm62ygympHm5Q6KkaSarjVjUaFA1c+gTtBaYm5ZREAE4Z/Hz2wC92j4bLmQW9EOvm+W2nNRwjrCgaVLIkpsFSieonZCNgmIrM8FMJREnNDOiA99P+sBUQng6m8OtDcq1XpO4iv3D6N+f02PU9jsFRq/6+ujzderT9iacs/L4wG3bbW5m9vbQxO1XtNcRf6X3/5/Lj1LcblUev8Ar6ybRp16fsOeWfb4wFvdxruZOmWYlY7FTmm4SJhXtKairVsFOiSooQnTAY9QroYwFAT6hyII9sv7gGcwBgDAGA//2Q==' }
        ]
        while (i < base64Array.length) {
            const key = Object.keys(base64Array[i])[0];
            const value = base64Array[i][key];
            if (key === args.column.field) {
                args.headerTemplate.image = [{
                    base64: value
                }];
                args.headerTemplate.value = args.column.field;
                args.headerTemplate.fontStyle.fontSize = 6;
                args.headerTemplate.fontStyle.fontColor = new PdfColor(255, 0, 0);
                break;
            }
            i++;
        }
    }
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: templateData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                columns: [
                    { field: 'TaskName', width: 250 },
                    { field: 'StartDate' },
                    { field: 'Progress' }
                ],
                toolbar: ['PdfExport'],
                resources: projectResourcestemplate,
                pdfColumnHeaderQueryCellInfo: pdfColumnHeaderQueryCellInfo,
                projectStartDate: new Date('03/24/2019'),
                projectEndDate: new Date('07/06/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with column template', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'Archa'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with virtualization', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: virtual1,
                allowPdfExport: true,
                enableTimelineVirtualization: true,
                enableVirtualization: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with virtualization', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
                gridWidth: '50%'
            },
            pageSize : 'B5'
        };
        ganttObj.pdfExport(exportProperties);
    });
    it('Export data with virtualization', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with virtualization', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: virtual1,
                allowPdfExport: true,
                enableTimelineVirtualization: true,
                enableVirtualization: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                timelineSettings: {
                    bottomTier: {
                        unit: 'Month',
                        count: 1
                    }
                },
                height: '450px',
            }, done);
    });
    it('Export data with virtualization', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
                gridWidth: '50%'
            },
            showPredecessorLines: false,
            pageSize : 'B4'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
})
describe('Gantt PDF Export with critical task', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: criticalData1,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                pdfQueryTaskbarInfo: (args: any) => {
                    args.taskbar.progressColor = new PdfColor(205, 92, 92);
                    args.taskbar.taskColor = args.taskbar.taskBorderColor = new PdfColor(240, 128, 128);
                    args.taskbar.progressFontColor = new PdfColor(105, 92, 92);
                    args.taskbar.milestoneColor = new PdfColor(240, 128, 128);

                },
                enableCriticalPath: true,
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy', },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'TaskName',
                    taskLabel: '${Progress}%'
                },
                connectorLineWidth: 7,
                allowUnscheduledTasks: true,
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    it('Export with custom date format', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true
            },
            showPredecessorLines: true,
            pageSize : 'B3'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with resource', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: resourcesData1,
                resources: resourceCollection1,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                resourceFields: {
                    id: 'resourceId',
                    name: 'resourceName',
                    unit: 'resourceUnit',
                    group: 'resourceGroup'
                },
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency: 'Predecessor',
                    resourceInfo: 'resources',
                    work: 'work',
                    child: 'subtasks'
                },
                renderBaseline: true,
                allowPdfExport: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    { field: 'TaskName', headerText: 'Name', width: 250 },
                    { field: 'work', headerText: 'Work' },
                    { field: 'resources', headerText: 'resources' },
                    { field: 'Progress' },
                    { field: 'resourceGroup', headerText: 'Group' },
                    { field: 'StartDate' },
                    { field: 'Duration' },
                ],
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/28/2019'),
                projectEndDate: new Date('05/18/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Gantt PDF Export with resource', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'B2'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with column template', () => {
    let ganttObj: Gantt;
    function pdfQueryCellInfo(args: PdfQueryCellInfoEventArgs): any {
        if (args.column.headerText === 'Resources') {
            {
                args.image = { height: 40, width: 40, base64: (args as any).data.taskData.resourcesImage };
            }
        }
        if (args.column.headerText === 'Email ID') {
            args.hyperLink = {
                target: 'mailto:' + (args as any).data.taskData.EmailId,
                displayText: (args as any).data.taskData.EmailId
            };
        }
    }
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: coulmntemplate,
                resources: resourceCollectiontemplate1,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                renderBaseline: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                toolbar: ['PdfExport'],
                columns: [
                    { field: 'TaskID', headerText: 'Task ID', textAlign: 'Left' },
                    { field: 'TaskName', headerText: 'Task Name', width: '250' },
                    { field: 'resources', headerText: 'Resources', width: '250', template: '#columnTemplate' },
                    { field: 'EmailId', headerText: 'Email ID', template: '#template2', width: 180 }
                ],
                allowExcelExport: true,
                pdfQueryCellInfo: pdfQueryCellInfo,
                allowPdfExport: true,
                allowSelection: true,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Gantt PDF Export with column template', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'B1'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with column template with fittowidth', () => {
    let ganttObj: Gantt;
    function pdfQueryCellInfo(args: PdfQueryCellInfoEventArgs): any {
        if (args.column.headerText === 'Resources') {
            {
                args.image = { height: 40, width: 40, base64: (args as any).data.taskData.resourcesImage };
            }
        }
        if (args.column.headerText === 'Email ID') {
            args.hyperLink = {
                target: 'mailto:' + (args as any).data.taskData.EmailId,
                displayText: (args as any).data.taskData.EmailId
            };
        }
    }
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: coulmntemplate,
                resources: resourceCollectiontemplate1,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                renderBaseline: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                toolbar: ['PdfExport'],
                columns: [
                    { field: 'TaskID', headerText: 'Task ID', textAlign: 'Left' },
                    { field: 'TaskName', headerText: 'Task Name', width: '250' },
                    { field: 'resources', headerText: 'Resources', width: '250', template: '#columnTemplate' },
                    { field: 'EmailId', headerText: 'Email ID', template: '#template2', width: 180 }
                ],
                allowExcelExport: true,
                pdfQueryCellInfo: pdfQueryCellInfo,
                allowPdfExport: true,
                allowSelection: true,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Gantt PDF Export with column template', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true
            },
            showPredecessorLines: true,
            pageSize : 'B0'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with column template without height and width to image', () => {
    let ganttObj: Gantt;
    function pdfQueryCellInfo(args: PdfQueryCellInfoEventArgs): any {
        if (args.column.headerText === 'Resources') {
            {
                args.image = { base64: (args as any).data.taskData.resourcesImage };
            }
        }
        if (args.column.headerText === 'Email ID') {
            args.hyperLink = {
                target: 'mailto:' + (args as any).data.taskData.EmailId,
            };
        }
    }
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: coulmntemplate,
                resources: resourceCollectiontemplate1,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                renderBaseline: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                toolbar: ['PdfExport'],
                columns: [
                    { field: 'TaskID', headerText: 'Task ID', textAlign: 'Left' },
                    { field: 'TaskName', headerText: 'Task Name', width: '250' },
                    { field: 'resources', headerText: 'Resources', width: '250', template: '#columnTemplate' },
                    { field: 'EmailId', headerText: 'Email ID', template: '#template2', width: 180 }
                ],
                allowExcelExport: true,
                pdfQueryCellInfo: pdfQueryCellInfo,
                allowPdfExport: true,
                allowSelection: true,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Gantt PDF Export with column template', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'A9'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with splitask', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: splitTasks,
                allowPdfExport: true,
                enableVirtualization: false,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency: 'Predecessor',
                    child: 'subtasks',
                    segments: 'Segments'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', width: 60 },
                    { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
                    { field: 'StartDate' },
                    { field: 'EndDate' },
                    { field: 'Duration' },
                    { field: 'Progress' },
                    { field: 'Predecessor' }
                ],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with splittask', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'A8'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with splitask with fittowidth', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: splitTasks,
                allowPdfExport: true,
                enableVirtualization: false,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency: 'Predecessor',
                    child: 'subtasks',
                    segments: 'Segments'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', width: 60 },
                    { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
                    { field: 'StartDate' },
                    { field: 'EndDate' },
                    { field: 'Duration' },
                    { field: 'Progress' },
                    { field: 'Predecessor' }
                ],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with splittaskb with fittowidth', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true
            },
            pageSize: 'A7',
            showPredecessorLines: true
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with tasklabel template', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: coulmntemplate,
                resources: resourceCollectiontemplate1,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                resourceFields: {
                    id: 'resourceId',
                    name: 'resourceName'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                pdfQueryTaskbarInfo: (args: any) => {
                    args.labelSettings.leftLabel.value = args.data.ganttProperties.taskName + '[' + args.data.ganttProperties.progress + ']';
                    args.labelSettings.leftLabel.fontStyle.fontSize = 6;
                    if (args.data.ganttProperties.resourceNames) {
                        args.labelSettings.rightLabel.value = args.data.ganttProperties.resourceNames;
                        args.labelSettings.rightLabel.fontStyle.fontSize = 6;
                        args.labelSettings.rightLabel.image = [{
                            base64: (args as any).data.taskData.resourcesImage, width: 20, height: 20
                        }]

                    }
                    args.labelSettings.taskLabel.value = args.data.ganttProperties.progress + '%';
                },
                columns: [
                    { field: 'TaskID' },
                    { field: 'TaskName', headerTemplate: '#projectName', width: 250 },
                    { field: 'StartDate', headerTemplate: '#dateTemplate' }
                ],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with tasklabel template', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with tasklabel template', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: coulmntemplate,
                resources: resourceCollectiontemplate1,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                resourceFields: {
                    id: 'resourceId',
                    name: 'resourceName'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                pdfQueryTaskbarInfo: (args: any) => {
                    args.labelSettings.rightLabel.value = args.data.ganttProperties.taskName + '[' + args.data.ganttProperties.progress + ']';
                    args.labelSettings.rightLabel.fontStyle.fontSize = 6;
                    if (args.data.ganttProperties.resourceNames) {
                        args.labelSettings.leftLabel.value = args.data.ganttProperties.resourceNames;
                        args.labelSettings.leftLabel.fontStyle.fontSize = 6;
                        args.labelSettings.leftLabel.image = [{
                            base64: (args as any).data.taskData.resourcesImage
                        }]

                    }
                    args.labelSettings.taskLabel.value = args.data.ganttProperties.progress + '%';
                },
                columns: [
                    { field: 'TaskID' },
                    { field: 'TaskName', headerTemplate: '#projectName', width: 250 },
                    { field: 'StartDate', headerTemplate: '#dateTemplate' }
                ],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with tasklabel template', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with tasklabel template fittowidth', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: coulmntemplate,
                resources: resourceCollectiontemplate1,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                resourceFields: {
                    id: 'resourceId',
                    name: 'resourceName'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                pdfQueryTaskbarInfo: (args: any) => {
                    args.labelSettings.leftLabel.value = args.data.ganttProperties.taskName + '[' + args.data.ganttProperties.progress + ']';
                    args.labelSettings.leftLabel.fontStyle.fontSize = 6;
                    if (args.data.ganttProperties.resourceNames) {
                        args.labelSettings.rightLabel.value = args.data.ganttProperties.resourceNames;
                        args.labelSettings.rightLabel.fontStyle.fontSize = 6;
                        args.labelSettings.rightLabel.image = [{
                            base64: (args as any).data.taskData.resourcesImage, width: 20, height: 20
                        }]

                    }
                    args.labelSettings.taskLabel.value = args.data.ganttProperties.progress + '%';
                },
                columns: [
                    { field: 'TaskID' },
                    { field: 'TaskName', headerTemplate: '#projectName', width: 250 },
                    { field: 'StartDate', headerTemplate: '#dateTemplate' }
                ],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with tasklabel template', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true
            },
            showPredecessorLines: true
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with taskbar template', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: coulmntemplate,
                resources: resourceCollectiontemplate1,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                resourceFields: {
                    id: 'resourceId',
                    name: 'resourceName'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                pdfQueryTaskbarInfo: (args: any) => {
                    if (!args.data.hasChildRecords) {
                        args.taskbar.taskColor = new PdfColor(109, 97, 155);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                width: 20, base64: (args as any).data.taskData.resourcesImage, height: 20
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName;
                        args.taskbarTemplate.fontStyle = {
                            fontColor: new PdfColor(255, 255, 255),
                            fontFamily: 'TimesRoman',

                        }
                    }
                    if (args.data.hasChildRecords) {
                        args.taskbar.milestoneColor = new PdfColor(0, 2, 0);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                width: 20, base64: (args as any).data.taskData.resourcesImage, height: 20
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName;
                        args.taskbarTemplate.fontStyle = {
                            fontColor: new PdfColor(255, 255, 255),
                            fontFamily: 'TimesRoman',
                            fontSize : 12
                        }
                    }
                    if (args.data.ganttProperties.duration === 0) {
                        args.taskbar.taskColor = new PdfColor(0, 2, 92);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                width: 20, base64: (args as any).data.taskData.resourcesImage, height: 20,
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName,
                            args.taskbarTemplate.fontStyle = {
                                fontColor: new PdfColor(255, 255, 255),
                                fontFamily: 'TimesRoman'
                            }
                    }
                },
                columns: [
                    { field: 'TaskID' },
                    { field: 'TaskName', headerTemplate: '#projectName', width: 250 },
                    { field: 'StartDate', headerTemplate: '#dateTemplate' }
                ],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with tasklabel template', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'A6'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with taskbar template', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: coulmntemplate,
                resources: resourceCollectiontemplate1,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                resourceFields: {
                    id: 'resourceId',
                    name: 'resourceName'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                pdfQueryTaskbarInfo: (args: any) => {
                    if (!args.data.hasChildRecords) {
                        args.taskbar.taskColor = new PdfColor(109, 97, 155);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                width: 20, base64: (args as any).data.taskData.resourcesImage, height: 20
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName;
                        args.taskbarTemplate.fontStyle = {
                            fontColor: new PdfColor(255, 255, 255),
                            fontFamily: 'TimesRoman',

                        }
                    }
                    if (args.data.hasChildRecords) {
                        args.taskbar.milestoneColor = new PdfColor(0, 2, 0);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                width: 20, base64: (args as any).data.taskData.resourcesImage, height: 20
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName;
                        args.taskbarTemplate.fontStyle = {
                            fontColor: new PdfColor(255, 255, 255),
                            fontFamily: 'TimesRoman',

                        }
                    }
                    if (args.data.ganttProperties.duration === 0) {
                        args.taskbar.taskColor = new PdfColor(0, 2, 92);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                width: 20, base64: (args as any).data.taskData.resourcesImage, height: 20,
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName,
                            args.taskbarTemplate.fontStyle = {
                                fontColor: new PdfColor(255, 255, 255),
                                fontFamily: 'TimesRoman'
                            }
                    }
                },
                columns: [
                    { field: 'TaskID' },
                    { field: 'TaskName', headerTemplate: '#projectName', width: 250 },
                    { field: 'StartDate', headerTemplate: '#dateTemplate' }
                ],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with tasklabel template', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true
            },
            showPredecessorLines: true,
            pageSize : 'A5'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customization of header and footer', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: headerFooter,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    beforeEach((done: Function) => {
        setTimeout(done, 100);
    });
    it("Export data with header and footer", () => {
        let exportProperties: PdfExportProperties = {
            header: {
                fromTop: 0,
                height: 150,
                contents: [
                    {
                        type: 'Text',
                        value: null,
                        position: { x: 380, y: 0 },
                        style: { penColor: '#C25050', penSize: 25, },
                    },
                    {
                        type: 'Image',
                        src: '',
                        position: { x: 400, y: 70 },
                        size: { height: 50, width: 50 },
                    },
                ]
            },
            footer: {
                fromBottom: 160,
                height: 100,
                contents: [
                    {
                        type: 'Text',
                        value: 'Thank you for your business !',
                        position: { x: 350, y: 40 },
                        style: { textBrushColor: '#C67878', fontSize: 14, hAlign: 'Right', vAlign: 'Top' }
                    },
                    {
                        type: 'PageNumber',
                        format: 'Page {$current} of {$total}',
                        position: { x: 0, y: 25 },
                        size: { height: 50, width: 100 },
                        style: { textBrushColor: '#000000', hAlign: 'Center', vAlign: 'Bottom' }
                    },
                    {
                        type: 'PageNumber',
                        position: { x: 250, y: 10 },
                        style: { textBrushColor: '#C67878', fontSize: 14, hAlign: 'Right', vAlign: 'Middle' }
                    },
                    {
                        type: 'Line',
                        points: { x1: 400, y1: 90, x2: 450, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'Dash'
                        }
                    },
                    {
                        type: 'Line',
                        points: { x1: 200, y1: 40, x2: 150, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'Dot'
                        }
                    },

                ]
            },
            pageSize: 'A4'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customization of header and footer with fittowidth', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: headerFooter,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    beforeEach((done: Function) => {
        setTimeout(done, 100);
    });
    it("Export data with header and footer", () => {
        let exportProperties: PdfExportProperties = {
            header: {
                fromTop: 0,
                height: 150,
                contents: [
                    {
                        type: 'Text',
                        value: 'invoice',
                        position: { x: 380, y: 0 },
                        style: { penColor: '#C25050', penSize: 25, },
                    },
                    {
                        type: 'Image',
                        src: images,
                        position: { x: 400, y: 70 },
                        size: { height: 50, width: 50 },
                    },
                ]
            },
            footer: {
                fromBottom: 160,
                height: 100,
                contents: [
                    {
                        type: 'Text',
                        value: 'Thank you for your business !',
                        position: { x: 350, y: 40 },
                        style: { textBrushColor: '#C67878', fontSize: 14, hAlign: 'Right', vAlign: 'Top' }
                    },
                    {
                        type: 'PageNumber',
                        pageNumberType: 'UpperRoman',
                        format: 'Page {$current} of {$total}',
                        position: { x: 0, y: 25 },
                        size: { height: 50, width: 100 },
                        style: { textBrushColor: '#000000', hAlign: 'Center', vAlign: 'Bottom' }
                    },
                    {
                        type: 'PageNumber',
                        position: { x: 250, y: 10 },
                        style: { textBrushColor: '#C67878', fontSize: 14, hAlign: 'Right', vAlign: 'Middle' }
                    },
                    {
                        type: 'Line',
                        points: { x1: 400, y1: 90, x2: 450, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'Dash'
                        }
                    },
                    {
                        type: 'Line',
                        points: { x1: 200, y1: 40, x2: 150, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'Dot'
                        }
                    },

                ]
            },
            fitToWidthSettings:{
                isFitToWidth : true
            },
            pageSize:'A3'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with eventmarker with fittowidth', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: headerFooter,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                eventMarkers: [
                    {
                        day: '04/02/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    it('Export data with eventMarker', () => {
        let exportProperties :PdfExportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
            },
            pageSize: 'A2'
        
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
}); 
describe('Gantt PDF Export with orientation', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: exportData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    it('Export with Orientation', () => {
        let exportProperties: PdfExportProperties = {
            pageOrientation: 'Portrait',
            pageSize:'A1'
         };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with CurrentViewData fittowidth', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: exportData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    it('Export with CurrentViewData', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings:{
                isFitToWidth: true
            },
            exportType: 'CurrentViewData',
            pageSize:'A0'
         };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with AllData fittowidth', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: exportData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    it('Export with AllData', () => {
        let exportProperties: PdfExportProperties = {
            fitToWidthSettings:{
                isFitToWidth: true
            },
            exportType: 'AllData',
            pageSize : 'Legal'
         };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with CurrentViewData', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: exportData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    it('Export with CurrentViewData', () => {
        let exportProperties: PdfExportProperties = {
            exportType: 'CurrentViewData',
            fileName:'abv',
            pageSize :'Note'
         };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with AllData', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: exportData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    it('Export with AllData', () => {
        let exportProperties: PdfExportProperties = {
            exportType: 'AllData',
            pageSize: 'Letter',
            theme:"Fabric"
         };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with highlightWeekends', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: weekEndData,
                allowPdfExport: true,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency:'Predecessor',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    child: 'subtasks',
                    indicators: 'Indicators'
                },
                renderBaseline: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', headerText: 'Task ID' },
                    { field: 'TaskName', headerText: 'Task Name', allowReordering: false  },
                    { field: 'StartDate', headerText: 'Start Date', allowSorting: false },
                    { field: 'Duration', headerText: 'Duration', allowEditing: false },
                    { field: 'Progress', headerText: 'Progress', allowFiltering: false }, 
                    { field: 'CustomColumn', headerText: 'CustomColumn' }
                ],
                sortSettings: {
                    columns: [{ field: 'TaskID', direction: 'Ascending' }, 
                    { field: 'TaskName', direction: 'Ascending' }]
                },
                allowExcelExport: true,
                allowSelection: true,
                allowRowDragAndDrop: true,
                selectedRowIndex: 1,
                splitterSettings: {
                    position: "50%",
                   // columnIndex: 4
                },
                selectionSettings: {
                    mode: 'Row',
                    type: 'Single',
                    enableToggle: false
                },
                tooltipSettings: {
                    showTooltip: true
                },
                filterSettings: {
                    type: 'Menu'
                },
                allowFiltering: true,
                gridLines: "Both",
                showColumnMenu: true,
                highlightWeekends: true,
                timelineSettings: {
                    showTooltip: true,
                    topTier: {
                        unit: 'Week',
                        format: 'dd/MM/yyyy'
                    },
                    bottomTier: {
                        unit: 'Day',
                        count: 1
                    }
                },
                eventMarkers: [
                    {
                        day: '04/10/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                holidays: [{
                    from: "04/04/2019",
                    to: "04/05/2019",
                    label: " Public holidays",
                    cssClass: "e-custom-holiday"
                
                },
                {
                    from: "04/12/2019",
                    to: "04/12/2019",
                    label: " Public holiday",
                    cssClass: "e-custom-holiday"
                
                }],
                searchSettings:
                 { fields: ['TaskName', 'Duration'] 
                },
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                allowResizing: true,
                readOnly: false,
                taskbarHeight: 20,
                rowHeight: 40,
                height: '550px',
                allowUnscheduledTasks: true,
              //  connectorLineBackground: "red",
              //  connectorLineWidth: 3,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                toolbar: ['PdfExport'],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                treeColumnIndex: 0
            }, done);
    });
    it('Export with AllData', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with highlightWeekends with botom tier as none', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: weekEndData,
                allowPdfExport: true,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency:'Predecessor',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    child: 'subtasks',
                    indicators: 'Indicators'
                },
                renderBaseline: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', headerText: 'Task ID' },
                    { field: 'TaskName', headerText: 'Task Name', allowReordering: false  },
                    { field: 'StartDate', headerText: 'Start Date', allowSorting: false },
                    { field: 'Duration', headerText: 'Duration', allowEditing: false },
                    { field: 'Progress', headerText: 'Progress', allowFiltering: false }, 
                    { field: 'CustomColumn', headerText: 'CustomColumn' }
                ],
                sortSettings: {
                    columns: [{ field: 'TaskID', direction: 'Ascending' }, 
                    { field: 'TaskName', direction: 'Ascending' }]
                },
                allowExcelExport: true,
                allowSelection: true,
                allowRowDragAndDrop: true,
                selectedRowIndex: 1,
                splitterSettings: {
                    position: "50%",
                   // columnIndex: 4
                },
                selectionSettings: {
                    mode: 'Row',
                    type: 'Single',
                    enableToggle: false
                },
                tooltipSettings: {
                    showTooltip: true
                },
                filterSettings: {
                    type: 'Menu'
                },
                allowFiltering: true,
                gridLines: "Both",
                showColumnMenu: true,
                highlightWeekends: true,
                timelineSettings: {
                    showTooltip: true,
                    topTier: {
                        unit: 'Week',
                        format: 'dd/MM/yyyy'
                    },
                    bottomTier: {
                        unit: 'None',
                        count: 1
                    }
                },
                eventMarkers: [
                    {
                        day: '04/10/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                holidays: [{
                    from: "04/04/2019",
                    to: "04/05/2019",
                    label: " Public holidays",
                    cssClass: "e-custom-holiday"
                
                },
                {
                    from: "04/12/2019",
                    to: "04/12/2019",
                    label: " Public holiday",
                    cssClass: "e-custom-holiday"
                
                }],
                searchSettings:
                 { fields: ['TaskName', 'Duration'] 
                },
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                allowResizing: true,
                readOnly: false,
                taskbarHeight: 20,
                rowHeight: 40,
                height: '550px',
                allowUnscheduledTasks: true,
              //  connectorLineBackground: "red",
              //  connectorLineWidth: 3,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                toolbar: ['PdfExport'],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                treeColumnIndex: 0
            }, done);
    });
    it('Export with AllData', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with highlightWeekends with top tier as Day', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: weekEndData,
                allowPdfExport: true,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency:'Predecessor',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    child: 'subtasks',
                    indicators: 'Indicators'
                },
                renderBaseline: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', headerText: 'Task ID' },
                    { field: 'TaskName', headerText: 'Task Name', allowReordering: false  },
                    { field: 'StartDate', headerText: 'Start Date', allowSorting: false },
                    { field: 'Duration', headerText: 'Duration', allowEditing: false },
                    { field: 'Progress', headerText: 'Progress', allowFiltering: false }, 
                    { field: 'CustomColumn', headerText: 'CustomColumn' }
                ],
                sortSettings: {
                    columns: [{ field: 'TaskID', direction: 'Ascending' }, 
                    { field: 'TaskName', direction: 'Ascending' }]
                },
                allowExcelExport: true,
                allowSelection: true,
                allowRowDragAndDrop: true,
                selectedRowIndex: 1,
                splitterSettings: {
                    position: "50%",
                   // columnIndex: 4
                },
                selectionSettings: {
                    mode: 'Row',
                    type: 'Single',
                    enableToggle: false
                },
                tooltipSettings: {
                    showTooltip: true
                },
                filterSettings: {
                    type: 'Menu'
                },
                allowFiltering: true,
                gridLines: "Both",
                showColumnMenu: true,
                highlightWeekends: true,
                timelineSettings: {
                    showTooltip: true,
                    topTier: {
                        unit: 'Day',
                        format: 'dd/MM/yyyy'
                    }
                },
                eventMarkers: [
                    {
                        day: '04/10/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                holidays: [{
                    from: "04/04/2019",
                    to: "04/05/2019",
                    label: " Public holidays",
                    cssClass: "e-custom-holiday"
                
                },
                {
                    from: "04/12/2019",
                    to: "04/12/2019",
                    label: " Public holiday",
                    cssClass: "e-custom-holiday"
                
                }],
                searchSettings:
                 { fields: ['TaskName', 'Duration'] 
                },
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                allowResizing: true,
                readOnly: false,
                taskbarHeight: 20,
                rowHeight: 40,
                height: '550px',
                allowUnscheduledTasks: true,
              //  connectorLineBackground: "red",
              //  connectorLineWidth: 3,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                toolbar: ['PdfExport'],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                treeColumnIndex: 0
            }, done);
    });
    it('Export with AllData', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with timeline cell formating', () => {
    let ganttObj: Gantt;
    let pdfQueryTimelineCellInfo: any = (args: PdfQueryTimelineCellInfoEventArgs) => {
        args.timelineCell.backgroundColor= new PdfColor(240, 248, 255);
        args.timelineCell.padding.left =2
        args.timelineCell.padding.top =2
    };
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: weekEndData,
                allowPdfExport: true,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                pdfQueryTimelineCellInfo: pdfQueryTimelineCellInfo,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency:'Predecessor',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    child: 'subtasks',
                    indicators: 'Indicators'
                },
                renderBaseline: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', headerText: 'Task ID' },
                    { field: 'TaskName', headerText: 'Task Name', allowReordering: false  },
                    { field: 'StartDate', headerText: 'Start Date', allowSorting: false },
                    { field: 'Duration', headerText: 'Duration', allowEditing: false },
                    { field: 'Progress', headerText: 'Progress', allowFiltering: false }, 
                    { field: 'CustomColumn', headerText: 'CustomColumn' }
                ],
                sortSettings: {
                    columns: [{ field: 'TaskID', direction: 'Ascending' }, 
                    { field: 'TaskName', direction: 'Ascending' }]
                },
                allowExcelExport: true,
                allowSelection: true,
                allowRowDragAndDrop: true,
                selectedRowIndex: 1,
                splitterSettings: {
                    position: "50%",
                   // columnIndex: 4
                },
                selectionSettings: {
                    mode: 'Row',
                    type: 'Single',
                    enableToggle: false
                },
                tooltipSettings: {
                    showTooltip: true
                },
                filterSettings: {
                    type: 'Menu'
                },
                allowFiltering: true,
                gridLines: "Both",
                showColumnMenu: true,
                highlightWeekends: true,
                timelineSettings: {
                    showTooltip: true,
                    topTier: {
                        unit: 'Day',
                        format: 'dd/MM/yyyy'
                    }
                },
                eventMarkers: [
                    {
                        day: '04/10/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                holidays: [{
                    from: "04/04/2019",
                    to: "04/05/2019",
                    label: " Public holidays",
                    cssClass: "e-custom-holiday"
                
                },
                {
                    from: "04/12/2019",
                    to: "04/12/2019",
                    label: " Public holiday",
                    cssClass: "e-custom-holiday"
                
                }],
                searchSettings:
                 { fields: ['TaskName', 'Duration'] 
                },
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                allowResizing: true,
                readOnly: false,
                taskbarHeight: 20,
                rowHeight: 40,
                height: '550px',
                allowUnscheduledTasks: true,
               connectorLineBackground: "red",
               connectorLineWidth: 2,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                toolbar: ['PdfExport'],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                treeColumnIndex: 0
            }, done);
    });
    it('Export with AllData', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with custom timeline settings', () => {
    let ganttObj: Gantt;
    let customZoomingLevels: ZoomTimelineSettings[] = [{
        topTier: { unit: 'Month', format: 'MMM, yy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd', count: 1 }, timelineUnitSize: 33, level: 0,
        timelineViewMode: 'Month', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 66, level: 1,
        timelineViewMode: 'Month', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 99, level: 2,
        timelineViewMode: 'Month', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 33, level: 3,
        timelineViewMode: 'Week', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 66, level: 4,
        timelineViewMode: 'Week', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 12 }, timelineUnitSize: 66, level: 5,
        timelineViewMode: 'Day', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 6 }, timelineUnitSize: 99, level: 6,
        timelineViewMode: 'Day', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    ];
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: weekEndData,
                allowPdfExport: true,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency:'Predecessor',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    child: 'subtasks',
                    indicators: 'Indicators'
                },
                renderBaseline: true,
                baselineColor: 'red',
                dataBound: function () {
                    ganttObj.zoomingLevels = customZoomingLevels;
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', headerText: 'Task ID' },
                    { field: 'TaskName', headerText: 'Task Name', allowReordering: false  },
                    { field: 'StartDate', headerText: 'Start Date', allowSorting: false },
                    { field: 'Duration', headerText: 'Duration', allowEditing: false },
                    { field: 'Progress', headerText: 'Progress', allowFiltering: false }, 
                    { field: 'CustomColumn', headerText: 'CustomColumn' }
                ],
                sortSettings: {
                    columns: [{ field: 'TaskID', direction: 'Ascending' }, 
                    { field: 'TaskName', direction: 'Ascending' }]
                },
                allowExcelExport: true,
                allowSelection: true,
                allowRowDragAndDrop: true,
                selectedRowIndex: 1,
                splitterSettings: {
                    position: "50%",
                   // columnIndex: 4
                },
                selectionSettings: {
                    mode: 'Row',
                    type: 'Single',
                    enableToggle: false
                },
                tooltipSettings: {
                    showTooltip: true
                },
                filterSettings: {
                    type: 'Menu'
                },
                allowFiltering: true,
                gridLines: "Both",
                showColumnMenu: true,
                highlightWeekends: true,
                timelineSettings: {
                    showTooltip: true,
                    topTier: {
                        unit: 'Day',
                        format: 'dd/MM/yyyy'
                    }
                },
                eventMarkers: [
                    {
                        day: '04/10/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                holidays: [{
                    from: "04/04/2019",
                    to: "04/05/2019",
                    label: " Public holidays",
                    cssClass: "e-custom-holiday"
                
                },
                {
                    from: "04/12/2019",
                    to: "04/12/2019",
                    label: " Public holiday",
                    cssClass: "e-custom-holiday"
                
                }],
                searchSettings:
                 { fields: ['TaskName', 'Duration'] 
                },
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                allowResizing: true,
                readOnly: false,
                taskbarHeight: 20,
                rowHeight: 40,
                height: '550px',
                allowUnscheduledTasks: true,
               connectorLineBackground: "red",
               connectorLineWidth: 2,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                toolbar: ['PdfExport'],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                treeColumnIndex: 0
            }, done);
    });
    it('Export with custom timeline settings', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with timeline settings', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: weekEndData,
                allowPdfExport: true,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency:'Predecessor',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    child: 'subtasks',
                    indicators: 'Indicators'
                },
                renderBaseline: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', headerText: 'Task ID' },
                    { field: 'TaskName', headerText: 'Task Name', allowReordering: false  },
                    { field: 'StartDate', headerText: 'Start Date', allowSorting: false },
                    { field: 'Duration', headerText: 'Duration', allowEditing: false },
                    { field: 'Progress', headerText: 'Progress', allowFiltering: false }, 
                    { field: 'CustomColumn', headerText: 'CustomColumn' }
                ],
                sortSettings: {
                    columns: [{ field: 'TaskID', direction: 'Ascending' }, 
                    { field: 'TaskName', direction: 'Ascending' }]
                },
                allowExcelExport: true,
                allowSelection: true,
                allowRowDragAndDrop: true,
                selectedRowIndex: 1,
                splitterSettings: {
                    position: "50%",
                   // columnIndex: 4
                },
                selectionSettings: {
                    mode: 'Row',
                    type: 'Single',
                    enableToggle: false
                },
                tooltipSettings: {
                    showTooltip: true
                },
                filterSettings: {
                    type: 'Menu'
                },
                allowFiltering: true,
                gridLines: "Both",
                showColumnMenu: true,
                highlightWeekends: true,
                timelineSettings: {
                    topTier: {
                        unit: 'Month',
                        count: 3,
                        formatter: (date) => {
                            var month = date.getMonth();
                            if (month >= 0 && month <= 2) {
                                return 'Q1';
                            } else if (month >= 3 && month <= 5) {
                                return 'Q2';
                            } else if (month >= 6 && month <= 8) {
                                return 'Q3';
                            } else {
                                return 'Q4';
                            }
            
                        }
                    },
                    bottomTier: {
                        unit: 'Month',
                        format: 'MMM'
                    }
                },
                eventMarkers: [
                    {
                        day: '04/10/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                holidays: [{
                    from: "04/04/2019",
                    to: "04/05/2019",
                    label: " Public holidays",
                    cssClass: "e-custom-holiday"
                
                },
                {
                    from: "04/12/2019",
                    to: "04/12/2019",
                    label: " Public holiday",
                    cssClass: "e-custom-holiday"
                
                }],
                searchSettings:
                 { fields: ['TaskName', 'Duration'] 
                },
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                allowResizing: true,
                readOnly: false,
                taskbarHeight: 20,
                rowHeight: 40,
                height: '550px',
                allowUnscheduledTasks: true,
               connectorLineBackground: "red",
               connectorLineWidth: 2,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                toolbar: ['PdfExport'],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                treeColumnIndex: 0
            }, done);
    });
    it('Export with timeline settings', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with timeline settings', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: weekEndData,
                allowPdfExport: true,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency:'Predecessor',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    child: 'subtasks',
                    indicators: 'Indicators'
                },
                renderBaseline: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', headerText: 'Task ID' },
                    { field: 'TaskName', headerText: 'Task Name', allowReordering: false  },
                    { field: 'StartDate', headerText: 'Start Date', allowSorting: false },
                    { field: 'Duration', headerText: 'Duration', allowEditing: false },
                    { field: 'Progress', headerText: 'Progress', allowFiltering: false }, 
                    { field: 'CustomColumn', headerText: 'CustomColumn' }
                ],
                sortSettings: {
                    columns: [{ field: 'TaskID', direction: 'Ascending' }, 
                    { field: 'TaskName', direction: 'Ascending' }]
                },
                allowExcelExport: true,
                allowSelection: true,
                allowRowDragAndDrop: true,
                selectedRowIndex: 1,
                splitterSettings: {
                    position: "50%",
                   // columnIndex: 4
                },
                selectionSettings: {
                    mode: 'Row',
                    type: 'Single',
                    enableToggle: false
                },
                tooltipSettings: {
                    showTooltip: true
                },
                filterSettings: {
                    type: 'Menu'
                },
                allowFiltering: true,
                gridLines: "Both",
                showColumnMenu: true,
                highlightWeekends: true,
                timelineSettings: {
                    timelineViewMode: 'Year',
                    timelineUnitSize: 70,
                    updateTimescaleView: false
                },
                eventMarkers: [
                    {
                        day: '04/10/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                holidays: [{
                    from: "04/04/2019",
                    to: "04/05/2019",
                    label: " Public holidays",
                    cssClass: "e-custom-holiday"
                
                },
                {
                    from: "04/12/2019",
                    to: "04/12/2019",
                    label: " Public holiday",
                    cssClass: "e-custom-holiday"
                
                }],
                searchSettings:
                 { fields: ['TaskName', 'Duration'] 
                },
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                allowResizing: true,
                readOnly: false,
                taskbarHeight: 20,
                rowHeight: 40,
                height: '550px',
                allowUnscheduledTasks: true,
               connectorLineBackground: "red",
               connectorLineWidth: 2,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                toolbar: ['PdfExport'],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                treeColumnIndex: 0
            }, done);
    });
    it('Export with timeline settings', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: exportData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                loadingIndicator: { indicatorType: 'Shimmer' },
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                toolbarClick: (args?: ClickEventArgs) => {
                    if (args.item.id === 'ganttContainer_excelexport') {
                        ganttObj.excelExport();
                    } else if (args.item.id === 'ganttContainer_csvexport') {
                        ganttObj.csvExport();
                    } else if (args.item.id === 'ganttContainer_pdfexport') {
                        ganttObj.pdfExport();
                    }
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export with custom date format', () => {
        let toolbar: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + '_pdfexport') as HTMLElement;
        triggerMouseEvent(toolbar, 'click');
    });
});
describe('Event markers are hidden behind the taskbar in PDF exported file', () => {

    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: pdfData,
                allowSorting: true,
                allowReordering: true,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    indicators: 'Indicators',
                    child: 'subtasks',
                    resourceInfo: 'resources'
                },
                renderBaseline: true,
                baselineColor: 'red',
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskID', headerText: 'Task ID' },
                    { field: 'TaskName', headerText: 'Task Name', allowReordering: false  },
                    { field: 'StartDate', headerText: 'Start Date', allowSorting: false },
                    { field: 'Duration', headerText: 'Duration', allowEditing: false },
                    { field: 'Progress', headerText: 'Progress', allowFiltering: false }, 
                    { field: 'CustomColumn', headerText: 'CustomColumn' }
                ],
                sortSettings: {
                    columns: [{ field: 'TaskID', direction: 'Ascending' }, 
                    { field: 'TaskName', direction: 'Ascending' }]
                },
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 
                'PrevTimeSpan', 'NextTimeSpan','ExcelExport', 'CsvExport', 'PdfExport'],

                allowExcelExport: true,
                allowPdfExport: true,
                allowSelection: true,
                allowRowDragAndDrop: true,
                selectedRowIndex: 1,
                splitterSettings: {
                    position: "50%",
                   // columnIndex: 4
                },
                selectionSettings: {
                    mode: 'Row',
                    type: 'Single',
                    enableToggle: false
                },
                tooltipSettings: {
                    showTooltip: true
                },
                filterSettings: {
                    type: 'Menu'
                },
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                allowFiltering: true,
                gridLines: "Both",
                showColumnMenu: true,
                highlightWeekends: true,
                timelineSettings: {
                    showTooltip: true,
                    topTier: {
                        unit: 'Week',
                        format: 'dd/MM/yyyy'
                    },
                    bottomTier: {
                        unit: 'Day',
                        count: 1
                    }
                },
                eventMarkers: [
                    {
                        day: '04/07/2024',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                holidays: [{
                    from: "04/04/2019",
                    to: "04/05/2019",
                    label: " Public holidays",
                    cssClass: "e-custom-holiday"

                },
                {
                    from: "04/12/2019",
                    to: "04/12/2019",
                    label: " Public holiday",
                    cssClass: "e-custom-holiday"

                }],
                searchSettings:
                 { fields: ['TaskName', 'Duration'] 
                },
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                allowResizing: true,
                readOnly: false,
                taskbarHeight: 20,
                rowHeight: 40,
                height: '550px',
                allowUnscheduledTasks: true,
              //  connectorLineBackground: "red",
              //  connectorLineWidth: 3,
                projectStartDate: new Date('03/31/2024'),
                projectEndDate: new Date('05/30/2024'),
            }, done);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
    it('Export data with eventMarker', () => {
        let exportProperties:any = {
            pageSize: 'A0',
            };
        ganttObj.pdfExport(exportProperties);
    });
});
describe('Gantt PDF Export with AllData in Bootstrap theme', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: exportData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    it('Export with AllData', () => {
        let exportProperties: PdfExportProperties = {
            exportType: 'AllData',
            pageSize: 'Letter',
            theme:"Bootstrap"
         };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with AllData in Bootstrap 4 theme', () => {
    let ganttObj: Gantt;
    let exportComplete: () => void = () => true;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: exportData,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 30,
                pdfExportComplete: exportComplete,
                columns: [
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    it('Export with AllData', () => {
        let exportProperties: PdfExportProperties = {
            exportType: 'AllData',
            pageSize: 'Letter',
            theme:"Bootstrap 4"
         };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customZoomingLevels ', () => {
    let ganttObj: Gantt;
    let customZoomingLevels: ZoomTimelineSettings[] = [{
        topTier: { unit: 'Month', format: 'MMM, yy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd', count: 1 }, timelineUnitSize: 33, level: 0,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 22, updateTimescaleView: true, weekendBackground: null, showTooltip: true,
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 66, level: 1,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 33, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 99, level: 2,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 33, level: 3,
        timelineViewMode: 'Week', weekStartDay: 0, perDayWidth: null, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 66, level: 4,
        timelineViewMode: 'Week', weekStartDay: 0, perDayWidth: null, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 12 }, timelineUnitSize: 66, level: 5,
        timelineViewMode: 'Day', weekStartDay: 0, perDayWidth: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 6 }, timelineUnitSize: 99, level: 6,
        timelineViewMode: 'Day', weekStartDay: 0, perDayWidth: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    ];
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: customZoomingdata,
                allowPdfExport: true,
                // dataBound: function () {
                //     ganttObj.zoomingLevels = customZoomingLevels;
                // },
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with customZoomingLevels', () => {
        ganttObj.zoomingLevels = customZoomingLevels;
        var exportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
            }
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customZoomingLevels ', () => {
    let ganttObj: Gantt;
    let customZoomingLevels: ZoomTimelineSettings[] = [{
        topTier: { unit: 'Month', format: 'MMM, yy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd', count: 1 }, timelineUnitSize: 33, level: 0,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 22, updateTimescaleView: true, weekendBackground: null, showTooltip: true,
    }
    ];
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: customZoomingdata,
                allowPdfExport: true,
                // dataBound: function () {
                //     ganttObj.zoomingLevels = customZoomingLevels;
                // },
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with customZoomingLevels', () => {
        ganttObj.zoomingLevels = customZoomingLevels;
        var exportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
            }
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customZoomingLevels ', () => {
    let ganttObj: Gantt;
    let customZoomingLevels: ZoomTimelineSettings[] =  [{
        topTier: { unit: 'Month', format: 'MMM, yy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd', count: 1 }, timelineUnitSize: 33, level: 0,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 23, updateTimescaleView: true, weekendBackground: null, showTooltip: true,
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 66, level: 1,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 20, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 99, level: 2,
        timelineViewMode: 'Month', weekStartDay: 0, perDayWidth: 23, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 33, level: 3,
        timelineViewMode: 'Week', weekStartDay: 0, perDayWidth: 23, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 66, level: 4,
        timelineViewMode: 'Week', weekStartDay: 0, perDayWidth: 23, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 12 }, timelineUnitSize: 66, level: 5,
        timelineViewMode: 'Day', weekStartDay: 0, perDayWidth: 23, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 6 }, timelineUnitSize: 99, level: 6,
        timelineViewMode: 'Day', weekStartDay: 0, perDayWidth: 23, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
];
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: [],
                taskFields: {
                    name: 'TaskName'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                toolbar: ['PdfExport'],
                allowExcelExport: true,
                allowPdfExport: true,
                projectStartDate: new Date('03/28/2019'),
                projectEndDate: new Date('06/30/2019')
            }, done);
    });
    it('Export data with customZoomingLevels', () => {
        ganttObj.zoomingLevels = customZoomingLevels;
        var exportProperties = {
            fitToWidthSettings: {
                isFitToWidth: true,
            }
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export for unscheduled task', () => {
    let ganttObj: Gantt;
    let datasource: Object[]=  [
        {
            TaskId: 1, TaskName: 'Task 1', TaskType: ''
        },
        {
            TaskId: 2, TaskName: 'Task 2', Duration: '5', TaskType: 'Task with duration only'
        },
        {
            TaskId: 3, TaskName: 'Task 3', StartDate: new Date('04/03/2019'), TaskType: 'Task with start date only'
        },
        {
            TaskId: 4, TaskName: 'Task 4', EndDate: new Date('04/08/2019'), TaskType: 'Task with end date only'
        },
    ];
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: datasource,
                enableContextMenu: true,
                taskFields: {
                    id: 'TaskId',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                columns: [
                    { field: 'TaskId', width: 75 },
                    { field: 'TaskName', width: 80 },
                    { field: 'StartDate', width: 120 },
                    { field: 'EndDate', width: 120 },
                    { field: 'Duration', width: 90 },
                    { field: 'TaskType', visible: false }
                ],
                sortSettings: {
                    columns: [{ field: 'TaskID', direction: 'Ascending' },
                        { field: 'TaskName', direction: 'Ascending' }]
                },
                splitterSettings: {
                    columnIndex: 4
                },
                toolbar: ['PdfExport'],
                allowExcelExport: true,
                allowPdfExport: true,
                allowRowDragAndDrop: true,
                selectedRowIndex: 1,
                selectionSettings: {
                    mode: 'Row',
                    type: 'Single',
                    enableToggle: false
                },
                tooltipSettings: {
                    showTooltip: true
                },
                filterSettings: {
                    type: 'Menu'
                },
                eventMarkers: [
                    {
                        day: '04/11/2019',
                        cssClass: 'e-custom-event-marker',
                        label: 'Project approval and kick-off'
                    }
                ],
                holidays: [{
                        from: "04/16/2019",
                        to: "04/16/2019",
                        label: " Public holidays",
                        cssClass: "e-custom-holiday"
                    },
                    {
                        from: "03/26/2019",
                        to: "03/26/2019",
                        label: " Public holiday",
                        cssClass: "e-custom-holiday"
                    }],
                allowFiltering: true,
                gridLines: "Both",
                showColumnMenu: true,
                highlightWeekends: true,
                timelineSettings: {
                    showTooltip: true,
                    topTier: {
                        unit: 'Week',
                        format: 'dd/MM/yyyy'
                    },
                    bottomTier: {
                        unit: 'Day',
                        count: 1
                    }
                },
                searchSettings: { fields: ['TaskName', 'Duration']
                },
                labelSettings: {
                    leftLabel: 'TaskID',
                    rightLabel: 'Task Name: ${taskData.TaskName}',
                    taskLabel: '${Progress}%'
                },
                allowResizing: true,
                readOnly: false,
                taskbarHeight: 20,
                rowHeight: 40,
                height: '550px',
                allowUnscheduledTasks: true,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
            }, done);
    });
    it('Export data with unscheduled', () => {
        ganttObj.pdfExport();
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customization of header and footer', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: headerFooter,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    beforeEach((done: Function) => {
        setTimeout(done, 100);
    });
    it("Export data with header and footer", () => {
        let exportProperties: PdfExportProperties = {
            header: {
                fromTop: 0,
                height: 150,
                contents: [
                    {
                        type: 'Text',
                        value: 'invoice',
                        position: { x: 380, y: 0 },
                        style: { penColor: '#C25050', penSize: 25, hAlign: 'Right', vAlign: 'Top' },
                    },
                    {
                        type: 'Text',
                        value: 'syncfusion',
                        position: { x: 10, y: 0 },
                        style: { penColor: '#C25050', penSize: 25, hAlign: 'Justify', vAlign: 'Top', },
                    },
                    {
                        type: 'Image',
                        src: images,
                        position: { x: 400, y: 70 },
                        size: { height: 50, width: 50 },
                    },
                ]
            },
            footer: {
                fromBottom: 160,
                height: 100,
                contents: [
                    {
                        type: 'Text',
                        value: 'Thank you for your business !',
                        position: { x: 350, y: 40 },
                        style: { textBrushColor: '#C67878', fontSize: 14, hAlign: 'Right', vAlign: 'Top' }
                    },
                    {
                        type: 'PageNumber',
                        pageNumberType: 'Arabic',
                        format: 'Page {$current} of {$total}',
                        position: { x: 0, y: 25 },
                        size: { height: 50, width: 100 },
                        style: { textBrushColor: '#000000', hAlign: 'Center', vAlign: 'Bottom' }
                    },
                    {
                        type: 'PageNumber',
                        position: { x: 250, y: 10 },
                        style: { textBrushColor: '#C67878', fontSize: 14, hAlign: 'Right', vAlign: 'Middle' }
                    },
                    {
                        type: 'Line',
                        points: { x1: 400, y1: 90, x2: 450, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'Dash'
                        }
                    },
                    {
                        type: 'Line',
                        points: { x1: 200, y1: 40, x2: 150, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'Dot'
                        }
                    },

                ]
            },
            pageSize: 'A4'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customization of header and footer', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: headerFooter,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    it("Export data with header and footer", () => {
        let exportProperties: PdfExportProperties = {
            header: {
                fromTop: 0,
                height: 150,
                contents: [
                    {
                        type: 'Text',
                        value: 'invoise',
                        position: { x: 380, y: 0 },
                        style: { penColor: '#C25050', penSize: 25, },
                    },
                    {
                        type: 'Image',
                        src: images,
                        position: { x: 400, y: 70 },
                        size: { height: 50, width: 50 },
                    },
                ]
            },
            footer: {
                fromBottom: 160,
                height: 100,
                contents: [
                    {
                        type: 'Text',
                        value: 'Thank you for your business !',
                        position: { x: 350, y: 40 },
                        style: { textBrushColor: '#C67878', fontSize: 14, hAlign: 'Right', vAlign: 'Top' }
                    },
                    {
                        type: 'PageNumber',
                        pageNumberType: 'Arabic',
                        format: 'Page {$current} of {$total}',
                        position: { x: 0, y: 25 },
                        size: { height: 50, width: 100 },
                        style: { textBrushColor: '#000000', hAlign: 'Center', vAlign: 'Bottom' }
                    },
                    {
                        type: 'PageNumber',
                        position: { x: 250, y: 10 },
                        style: { textBrushColor: '#C67878', fontSize: 14, hAlign: 'Right', vAlign: 'Middle' }
                    },
                    {
                        type: 'Line',
                        points: { x1: 400, y1: 90, x2: 450, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'DashDot'
                        }
                    },
                    {
                        type: 'Line',
                        points: { x1: 200, y1: 40, x2: 150, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'DashDotDot'
                        }
                    },
                    {
                        type: 'Line',
                        points: { x1: 250, y1: 40, x2: 150, y2: 90 },
                        style: {
                            penSize: 2,
                        }
                    },

                ]
            },
            pageSize: 'A4'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with taskbar template', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: milestoneTemplate,
                resources: resourceCollectiontemplate1,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                resourceFields: {
                    id: 'resourceId',
                    name: 'resourceName'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                pdfQueryTaskbarInfo: (args: any) => {
                    if (!args.data.hasChildRecords) {
                        args.taskbar.taskColor = new PdfColor(109, 97, 155);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                width: 20, base64: (args as any).data.taskData.resourcesImage, height: 20
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName;
                        args.taskbarTemplate.fontStyle = {
                            fontColor: new PdfColor(255, 255, 255),
                            fontFamily: 'TimesRoman',

                        }
                    }
                    if (args.data.hasChildRecords) {
                        args.taskbar.milestoneColor = new PdfColor(0, 2, 0);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                width: 20, base64: (args as any).data.taskData.resourcesImage, height: 20
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName;
                        args.taskbarTemplate.fontStyle = {
                            fontColor: new PdfColor(255, 255, 255),
                            fontFamily: 'TimesRoman',

                        }
                    }
                    if (args.data.ganttProperties.duration === 0) {
                        args.taskbar.taskColor = new PdfColor(0, 2, 92);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                width: 20, base64: (args as any).data.taskData.resourcesImage, height: 20,
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName,
                            args.taskbarTemplate.fontStyle = {
                                fontColor: new PdfColor(255, 255, 255),
                                fontFamily: 'TimesRoman'
                            }
                    }
                },
                columns: [
                    { field: 'TaskID' },
                    { field: 'TaskName', headerTemplate: '#projectName', width: 250 },
                    { field: 'StartDate', headerTemplate: '#dateTemplate' }
                ],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with tasklabel template', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'A6'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with taskbar template', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: milestoneTemplate,
                resources: resourceCollectiontemplate1,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    resourceInfo: 'resources',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                resourceFields: {
                    id: 'resourceId',
                    name: 'resourceName'
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                pdfQueryTaskbarInfo: (args: any) => {
                    if (!args.data.hasChildRecords) {
                        args.taskbar.taskColor = new PdfColor(109, 97, 155);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                 base64: (args as any).data.taskData.resourcesImage
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName;
                        args.taskbarTemplate.fontStyle = {
                            fontColor: new PdfColor(255, 255, 255),
                            fontFamily: 'TimesRoman',

                        }
                    }
                    if (args.data.hasChildRecords) {
                        args.taskbar.milestoneColor = new PdfColor(0, 2, 0);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                base64: (args as any).data.taskData.resourcesImage
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName;
                        args.taskbarTemplate.fontStyle = {
                            fontColor: new PdfColor(255, 255, 255),
                            fontFamily: 'TimesRoman',

                        }
                    }
                    if (args.data.ganttProperties.duration === 0) {
                        args.taskbar.taskColor = new PdfColor(0, 2, 92);
                        if (args.data.ganttProperties.resourceNames) {
                            args.taskbarTemplate.image = [{
                                width: 0.5, base64: (args as any).data.taskData.resourcesImage, height: 0.5,
                            }]
                        }
                        args.taskbarTemplate.value = args.data.TaskName,
                            args.taskbarTemplate.fontStyle = {
                                fontColor: new PdfColor(255, 255, 255),
                                fontFamily: 'TimesRoman'
                            }
                    }
                },
                columns: [
                    { field: 'TaskID' },
                    { field: 'TaskName', headerTemplate: '#projectName', width: 250 },
                    { field: 'StartDate', headerTemplate: '#dateTemplate' }
                ],
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                height: '450px',
            }, done);
    });
    it('Export data with tasklabel template', () => {
        let exportProperties: PdfExportProperties = {
            pageSize : 'A6'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customization of header and footer', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: headerFooter,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    beforeEach((done: Function) => {
        setTimeout(done, 100);
    });
    it("Export data with header and footer", () => {
        let exportProperties: PdfExportProperties = {
            header: {
                fromTop: 0,
                height: 150,
                contents: [
                    {
                        type: 'Text',
                        value: 'invoice',
                        position: { x: 380, y: 0 },
                        style: {textPenColor: '#C25050', penSize: 25 },
                    },
                    {
                        type: 'Image',
                        src: images,
                        position: { x: 400, y: 70 },
                        size: { height: 50, width: 50 },
                    },
                ]
            },
            footer: {
                fromBottom: 160,
                height: 100,
                contents: [
                    {
                        type: 'Text',
                        value: 'Thank you for your business !',
                        position: { x: 350, y: 40 },
                        style: { textBrushColor: '#C67878', fontSize: 14, hAlign: 'Right', vAlign: 'Top' }
                    },
                    {
                        type: 'PageNumber',
                        pageNumberType: 'Arabic',
                        format: 'Page {$current} of {$total}',
                        position: { x: 0, y: 25 },
                        size: { height: 50, width: 100 },
                        style: { textBrushColor: '#000000', hAlign: 'Center', vAlign: 'Bottom' }
                    },
                    {
                        type: 'PageNumber',
                        position: { x: 250, y: 10 },
                        style: { textBrushColor: '#C67878', fontSize: 14, hAlign: 'Right', vAlign: 'Middle' },
                        pageNumberType:'LowerLatin'
                    },
                    {
                        type: 'Line',
                        points: { x1: 400, y1: 90, x2: 450, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'Dash'
                        }
                    },
                    {
                        type: 'Line',
                        points: { x1: 200, y1: 40, x2: 150, y2: 90 },
                        style: {
                            penSize: 2,
                            dashStyle: 'Dot'
                        }
                    },

                ]
            },
            pageSize: 'A4'
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});
describe('Gantt PDF Export with customization of header and without footer', () => {
    let ganttObj: Gantt;
    beforeAll((done: Function) => {
        ganttObj = createGantt(
            {
                dataSource: headerFooter,
                allowPdfExport: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    baselineStartDate: "BaselineStartDate",
                    baselineEndDate: "BaselineEndDate",
                    dependency: 'Predecessor'
                },
                renderBaseline: true,
                baselineColor: 'red',
                toolbar: ['PdfExport'],
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                rowHeight: 40,
                taskbarHeight: 20,
                pdfExportComplete: (args: any) => {
                    expect(args.name).toBe("pdfExportComplete");
                },
                columns: [
                    { field: 'TaskID', visible: false },
                    {
                        field: 'TaskName',
                        headerText: 'Task Name',
                        width: '250',
                        clipMode: 'EllipsisWithTooltip',
                    },
                    { field: 'StartDate', headerText: 'Start Date', format: 'dd-MMM-yy' },
                    { field: 'Duration', headerText: 'Duration' },
                    { field: 'EndDate', headerText: 'End Date' },
                    { field: 'Predecessor', headerText: 'Predecessor' },
                ],
                treeColumnIndex: 0,
                height: '450px',
            }, done);
    });
    beforeEach((done: Function) => {
        setTimeout(done, 100);
    });
    it("Export data with header and without footer", () => {
        let exportProperties: PdfExportProperties = {
            header: {
                fromTop: 0,
                height: 150,
                contents: [
                    {
                        type: 'Text',
                        value: 'invoice',
                        position: { x: 380, y: 0 },
                        style: {textPenColor: '#C25050', penSize: 25 },
                    },
                ]
            },
           
          
        };
        ganttObj.pdfExport(exportProperties);
    });
    afterAll(() => {
        if (ganttObj) {
            destroyGantt(ganttObj);
        }
    });
});