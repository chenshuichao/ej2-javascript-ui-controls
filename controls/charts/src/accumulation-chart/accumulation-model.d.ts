import { Property, Component, Complex, Collection, NotifyPropertyChanges, INotifyPropertyChanged, animationMode } from '@syncfusion/ej2-base';import { ModuleDeclaration, Internationalization, Event, EmitType, Browser, EventHandler, Touch } from '@syncfusion/ej2-base';import { remove, extend, isNullOrUndefined, updateBlazorTemplate } from '@syncfusion/ej2-base';import { Font, Margin, Border, TooltipSettings, Indexes, CenterLabel } from '../common/model/base';import { AccumulationSeries, AccPoints, PieCenter } from './model/acc-base';import { AccumulationType, AccumulationSelectionMode, AccumulationHighlightMode } from './model/enum';import { IAccSeriesRenderEventArgs, IAccTextRenderEventArgs } from './model/pie-interface';import { IAccAnimationCompleteEventArgs, IAccPointRenderEventArgs, IAccLoadedEventArgs, IAccSelectionCompleteEventArgs } from './model/pie-interface';import { getThemeColor } from '../common/model/theme';import { ILegendRenderEventArgs, IMouseEventArgs, IPointEventArgs, ITooltipRenderEventArgs } from '../chart/model/chart-interface';import { IAnnotationRenderEventArgs } from '../chart/model/chart-interface';import { load, pointClick } from '../common/model/constants';import { pointMove, chartDoubleClick, chartMouseClick, chartMouseDown } from '../common/model/constants';import { chartMouseLeave, chartMouseMove, chartMouseUp, resized, beforeResize } from '../common/model/constants';import { FontModel, MarginModel, BorderModel, IndexesModel, TooltipSettingsModel, CenterLabelModel } from '../common/model/base-model';import { AccumulationSeriesModel, PieCenterModel } from './model/acc-base-model';import { LegendSettings } from '../common/legend/legend';import { AccumulationLegend } from './renderer/legend';import { LegendSettingsModel } from '../common/legend/legend-model';import { ChartLocation, subtractRect, indexFinder, appendChildElement, redrawElement, blazorTemplatesReset, getTextAnchor, stringToNumber, textWrap } from '../common/utils/helper';import { RectOption, showTooltip, ImageOption } from '../common/utils/helper';import { textElement, createSvg, calculateSize, removeElement, firstToLowerCase, withInBounds } from '../common/utils/helper';import { getElement, titlePositionX } from '../common/utils/helper';import { Rect, Size, measureText, TextOption, SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';import { Data } from '../common/model/data';import { AccumulationTooltip } from './user-interaction/tooltip';import { AccumulationBase } from './renderer/accumulation-base';import { PieSeries } from './renderer/pie-series';import { AccumulationDataLabel } from './renderer/dataLabel';import { FunnelSeries } from './renderer/funnel-series';import { PyramidSeries } from './renderer/pyramid-series';import { AccumulationSelection } from './user-interaction/selection';import { AccumulationHighlight } from './user-interaction/high-light';import { AccumulationTheme } from './model/enum';import { AccumulationAnnotationSettingsModel } from './model/acc-base-model';import { AccumulationAnnotationSettings } from './model/acc-base';import { AccumulationAnnotation } from './annotation/annotation';import { IPrintEventArgs } from '../chart/model/chart-interface';import { Alignment, ExportType, SelectionPattern } from '../common/utils/enum';import { getTitle, AccPointData } from '../common/utils/helper';import { Index } from '../common/model/base';import { IThemeStyle } from '../chart/model/chart-interface';import { IAccResizeEventArgs, IAccBeforeResizeEventArgs, IAccLegendClickEventArgs } from './model/pie-interface';import { DataManager } from '@syncfusion/ej2-data';import { Export } from '../chart/print-export/export';import { Animation, AnimationOptions, compile as templateComplier} from '@syncfusion/ej2-base';import { PrintUtils } from '../common/utils/print';import { IAfterExportEventArgs } from '../common/model/interface';
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class AccumulationChart
 */
export interface AccumulationChartModel extends ComponentModel{

    /**
     * The width of the chart as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, chart will render to the full width of its parent element.
     *
     * @default null
     */

    width?: string;

    /**
     * The height of the chart as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, chart will render to the full height of its parent element.
     *
     * @default null
     */

    height?: string;

    /**
     * The title for accumulation chart.
     *
     * @default null
     */
    title?: string;

    /**
     * The background image of the chart that accepts value in string as url link or location of an image.
     *
     * @default null
     */
    backgroundImage?: string;

    /**
     * Configuration for the center of the pie chart.
     */
    center?: PieCenterModel;

    /**
     * Specifies the dataSource for the AccumulationChart. It can be an array of JSON objects or an instance of DataManager.
     * ```html
     * <div id='Pie'></div>
     * ```
     * ```typescript
     * let dataManager: DataManager = new DataManager({
     *         url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
     * });
     * let query: Query = new Query().take(50).where('Estimate', 'greaterThan', 0, false);
     * let pie: AccumulationChart = new AccumulationChart({
     * ...
     *     dataSource: dataManager,
     *     series: [{
     *        xName: 'Id',
     *        yName: 'Estimate',
     *        query: query
     *    }],
     * ...
     * });
     * pie.appendTo('#Pie');
     * ```
     *
     * @default ''
     */

    dataSource?: Object | DataManager;

    /**
     * Options for customizing the `title` of accumulation chart.
     */

    titleStyle?: FontModel;

    /**
     * The subtitle for accumulation chart.
     *
     * @default null
     */
    subTitle?: string;

    /**
     * Options for customizing the `subTitle` of the accumulation chart.
     */

    subTitleStyle?: FontModel;

    /**
     * Options for customizing the legend of accumulation chart.
     */
    legendSettings?: LegendSettingsModel;

    /**
     * Options for customizing the tooltip of accumulation chart.
     */

    tooltip?: TooltipSettingsModel;

    /**
     * Options for customizing the center label of accumulation chart.
     */

    centerLabel?: CenterLabelModel;

    /**
     * Specifies whether point has to get selected or not. Takes value either 'None 'or 'Point'
     * * None: Disables the selection.
     * * Point: selects a point.
     *
     * @default None
     */
    selectionMode?: AccumulationSelectionMode;

    /**
     * Defines the highlight color for the data point when user hover the data point.
     *
     * @default ''
     */

    highlightColor?: string;

    /**
     * Specifies whether point has to get highlighted or not. Takes value either 'None 'or 'Point'
     * * None: Disables the highlight.
     * * Point: highlight a point.
     *
     * @default None
     */
    highlightMode?: AccumulationHighlightMode;

    /**
     * Specifies whether series or data point for accumulation chart has to be selected. They are,
     * * None: Sets none as selecting pattern to accumulation chart .
     * * Chessboard: Sets chess board as selecting pattern accumulation chart .
     * * Dots: Sets dots as  selecting pattern accumulation chart .
     * * DiagonalForward: Sets diagonal forward as selecting pattern to accumulation chart .
     * * Crosshatch: Sets crosshatch as selecting pattern to accumulation chart.
     * * Pacman: Sets pacman selecting pattern to accumulation chart.
     * * DiagonalBackward: Sets diagonal backward as selecting pattern to accumulation chart.
     * * Grid: Sets grid as selecting pattern to accumulation chart.
     * * Turquoise: Sets turquoise as selecting pattern to accumulation chart.
     * * Star: Sets star as selecting pattern to accumulation chart.
     * * Triangle: Sets triangle as selecting pattern to accumulation chart.
     * * Circle: Sets circle as selecting pattern to accumulation chart.
     * * Tile: Sets tile as selecting pattern to accumulation chart.
     * * HorizontalDash: Sets horizontal dash as selecting pattern to accumulation chart.
     * * VerticalDash: Sets vertical dash as selecting pattern to accumulation chart.
     * * Rectangle: Sets rectangle as selecting pattern.
     * * Box: Sets box as selecting pattern to accumulation chart.
     * * VerticalStripe: Sets vertical stripe as  selecting pattern to accumulation chart.
     * * HorizontalStripe: Sets horizontal stripe as selecting pattern to accumulation chart.
     * * Bubble: Sets bubble as selecting pattern to accumulation chart.
     *
     * @default None
     */
    selectionPattern?: SelectionPattern;

    /**
     * Specifies whether series or data point has to be selected. They are,
     * * None: Sets none as highlighting pattern to accumulation chart.
     * * Chessboard: Sets chess board as highlighting pattern to accumulation chart.
     * * Dots: Sets dots as highlighting pattern to accumulation chart.
     * * DiagonalForward: Sets diagonal forward as highlighting pattern to accumulation chart.
     * * Crosshatch: Sets crosshatch as highlighting pattern to accumulation chart.
     * * Pacman: Sets pacman highlighting  pattern to accumulation chart.
     * * Diagonalbackward: Sets diagonal backward as highlighting pattern to accumulation chart.
     * * Grid: Sets grid as highlighting pattern to accumulation chart.
     * * Turquoise: Sets turquoise as highlighting pattern to accumulation chart.
     * * Star: Sets star as highlighting  pattern to accumulation chart.
     * * Triangle: Sets triangle as highlighting pattern to accumulation chart.
     * * Circle: Sets circle as highlighting  pattern to accumulation chart.
     * * Tile: Sets tile as highlighting pattern to accumulation chart.
     * * HorizontalDash: Sets horizontal dash as highlighting pattern to accumulation chart.
     * * VerticalDash: Sets vertical dash as highlighting pattern to accumulation chart.
     * * Rectangle: Sets rectangle as highlighting  pattern to accumulation chart.
     * * Box: Sets box as highlighting pattern to accumulation chart.
     * * VerticalStripe: Sets vertical stripe as highlighting  pattern to accumulation chart.
     * * HorizontalStripe: Sets horizontal stripe as highlighting  pattern to accumulation chart.
     * * Bubble: Sets bubble as highlighting  pattern to accumulation chart.
     *
     * @default None
     */
    highlightPattern?: SelectionPattern;

    /**
     * If set true, enables the border in pie and accumulation chart while mouse moving.
     *
     * @default true
     */
    enableBorderOnMouseMove?: boolean;

    /**
     * If set true, enables the multi selection in accumulation chart. It requires `selectionMode` to be `Point`.
     *
     * @default false
     */
    isMultiSelect?: boolean;

    /**
     * If set true, enables the animation for both chart and accumulation.
     *
     * @default true
     */
    enableAnimation?: boolean;

    /**
     * Specifies the point indexes to be selected while loading a accumulation chart.
     * It requires `selectionMode` to be `Point`.
     * ```html
     * <div id='Pie'></div>
     * ```
     * ```typescript
     * let pie: AccumulationChart = new AccumulationChart({
     * ...
     *   selectionMode: 'Point',
     *   selectedDataIndexes: [ { series: 0, point: 1},
     *                          { series: 2, point: 3} ],
     * ...
     * });
     * pie.appendTo('#Pie');
     * ```
     *
     * @default []
     */
    selectedDataIndexes?: IndexesModel[];

    /**
     *  Options to customize the left, right, top and bottom margins of accumulation chart.
     */

    margin?: MarginModel;

    /**
     * If set true, labels for the point will be placed smartly without overlapping.
     *
     * @default true
     */
    enableSmartLabels?: boolean;

    /**
     * Options for customizing the color and width of the chart border.
     */

    border?: BorderModel;

    /**
     * The background color of the chart, which accepts value in hex, rgba as a valid CSS color string.
     *
     * @default null
     */
    background?: string;

    /**
     * The configuration for series in accumulation chart.
     */

    series?: AccumulationSeriesModel[];

    /**
     * The configuration for annotation in chart.
     */

    annotations?: AccumulationAnnotationSettingsModel[];

    /**
     * Specifies the theme for accumulation chart.
     *
     * @default 'Material'
     */
    theme?: AccumulationTheme;

    /**
     * Specifies whether a grouping separator should be used for a number.
     *
     * @default false
     */
    useGroupingSeparator?: boolean;

    /**
     * To enable export feature in chart.
     *
     * @default true
     */
    enableExport?: boolean;

    /**
     * To enable export feature in blazor chart.
     *
     * @default false
     */
    allowExport?: boolean;

    /**
     * Triggers after accumulation chart loaded.
     *
     * @event loaded
     * @blazorProperty 'Loaded'
     */
    loaded?: EmitType<IAccLoadedEventArgs>;

    /**
     * Triggers after legend clicked.
     *
     * @event legendClick
     */
    legendClick?: EmitType<IAccLegendClickEventArgs>;

    /**
     * Triggers before accumulation chart load.
     *
     * @event load
     */
    load?: EmitType<IAccLoadedEventArgs>;

    /**
     * Triggers before the series gets rendered.
     *
     * @event seriesRender
     * @deprecated
     */
    seriesRender?: EmitType<IAccSeriesRenderEventArgs>;

    /**
     * Triggers before the legend gets rendered.
     *
     * @event legendRender
     * @deprecated
     */
    legendRender?: EmitType<ILegendRenderEventArgs>;

    /**
     * Triggers before the data label for series gets rendered.
     *
     * @event textRender
     * @deprecated
     */
    textRender?: EmitType<IAccTextRenderEventArgs>;

    /**
     * Triggers before the tooltip for series gets rendered.
     *
     * @event tooltipRender
     */
    tooltipRender?: EmitType<ITooltipRenderEventArgs>;

    /**
     * Triggers before each points for series gets rendered.
     *
     * @event pointRender
     * @deprecated
     */

    pointRender?: EmitType<IAccPointRenderEventArgs>;

    /**
     * Triggers before the annotation gets rendered.
     *
     * @event annotationRender
     * @deprecated
     */

    annotationRender?: EmitType<IAnnotationRenderEventArgs>;

    /**
     * Triggers before the prints gets started.
     *
     * @event beforePrint
     * @blazorProperty 'OnPrint'
     */

    beforePrint?: EmitType<IPrintEventArgs>;

    /**
     * Triggers on hovering the accumulation chart.
     *
     * @event chartMouseMove
     * @blazorProperty 'OnChartMouseMove'
     */

    chartMouseMove?: EmitType<IMouseEventArgs>;

    /**
     * Triggers on clicking the accumulation chart.
     *
     * @event chartMouseClick
     * @blazorProperty 'OnChartMouseClick'
     */

    chartMouseClick?: EmitType<IMouseEventArgs>;

    /**
     * Triggers on double clicking the accumulation chart.
     *
     * @event chartDoubleClick
     * @blazorProperty 'OnChartDoubleClick'
     */

    chartDoubleClick?: EmitType<IMouseEventArgs>;

    /**
     * Triggers on point click.
     *
     * @event pointClick
     * @blazorProperty 'OnPointClick'
     */

    pointClick?: EmitType<IPointEventArgs>;

    /**
     * Triggers on point move.
     *
     * @event pointMove
     * @blazorProperty 'PointMoved'
     */

    pointMove?: EmitType<IPointEventArgs>;

    /**
     * Triggers after animation gets completed for series.
     *
     * @event animationComplete
     * @blazorProperty 'OnAnimationComplete'
     */
    animationComplete?: EmitType<IAccAnimationCompleteEventArgs>;

    /**
     * Triggers on mouse down.
     *
     * @event chartMouseDown
     * @blazorProperty 'OnChartMouseDown'
     */

    chartMouseDown?: EmitType<IMouseEventArgs>;

    /**
     * Triggers while cursor leaves the accumulation chart.
     *
     * @event chartMouseLeave
     * @blazorProperty 'OnChartMouseLeave'
     */

    chartMouseLeave?: EmitType<IMouseEventArgs>;

    /**
     * Triggers on mouse up.
     *
     * @event chartMouseUp
     * @blazorProperty 'OnChartMouseUp'
     */

    chartMouseUp?: EmitType<IMouseEventArgs>;

    /**
     * Triggers before window resize.
     *
     * @event beforeResize
     * @blazorProperty 'BeforeResize'
     */
    beforeResize?: EmitType<IAccBeforeResizeEventArgs>;

    /**
     * Triggers after window resize.
     *
     * @event resized
     * @blazorProperty 'Resized'
     */

    resized?: EmitType<IAccResizeEventArgs>;

    /**
     * Triggers after the export completed.
     *
     * @event afterExport
     * @blazorProperty 'AfterExport'
     */
    afterExport?: EmitType<IAfterExportEventArgs>;

    /**
     * Triggers after the selection is completed.
     *
     * @event selectionComplete
     */

    selectionComplete?: EmitType<IAccSelectionCompleteEventArgs>;

    /**
     * Defines the currencyCode format of the accumulation chart
     *
     * @private
     * @aspType string
     */

    currencyCode?: string;

}