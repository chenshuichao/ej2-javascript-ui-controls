/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Chart } from '../chart';
import { withInBounds, PointData, getValueXByPoint, getValueYByPoint, AccPointData } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { Series, Points } from '../series/chart-series';

/**
 * To get the data on mouse move.
 *
 * @private
 */
export class ChartData {
    /** @private */
    public chart: Chart;
    public lierIndex: number;
    /** @private */
    public currentPoints: PointData[] | AccPointData[] = [];
    /** @private */
    public previousPoints: PointData[] | AccPointData[] = [];
    public insideRegion: boolean = false;

    /**
     * Constructor for the data.
     *
     * @private
     */

    constructor(chart: Chart) {
        this.chart = chart;
        this.lierIndex = 0;
    }
    /**
     * Method to get the Data.
     *
     * @private
     */

    public getData(): PointData {
        const chart: Chart = this.chart;
        let point: Points = null;
        let series: Series = null;
        let width: number; let height: number;
        let mouseX: number; let mouseY: number;
        for (let len: number = chart.visibleSeries.length, i: number = len - 1; i >= 0; i--) {
            series = chart.visibleSeries[i];
            width = (series.type === 'Scatter' || series.drawType === 'Scatter' || (series.marker.visible))
                ? (series.marker.height + 5) / 2 : 0;
            height = (series.type === 'Scatter' || series.drawType === 'Scatter' || (series.marker.visible))
                ? (series.marker.width + 5) / 2 : 0;
            mouseX = chart.mouseX; mouseY = chart.mouseY;
            if (series.dragSettings.enable && series.isRectSeries) {
                if (!(series.type === 'Bar' && chart.isTransposed) && (chart.isTransposed || series.type === 'Bar')) {
                    const markerWidth: number = series.marker.width / 2;
                    mouseX = series.yAxis.isInversed ? mouseX + markerWidth : mouseX - markerWidth;
                } else {
                    const markerHeight: number = series.marker.height / 2;
                    mouseY = series.yAxis.isInversed ? mouseY - markerHeight : mouseY + markerHeight;
                }
            }
            if (series.visible && withInBounds(mouseX, mouseY, series.clipRect, width, height)) {
                point = this.getRectPoint(series, series.clipRect, mouseX, mouseY);
            }
            if (point) {
                return new PointData(point, series);
            }
        }
        return new PointData(point, series);
    }

    public isSelected(chart : Chart) : boolean {
        return ((chart.selectionMode.indexOf('Drag') > -1 || chart.selectionMode.indexOf('Lasso') > -1 ) && chart.selectionModule &&
                chart.selectionModule.rectPoints !== null);
    }

    private getRectPoint(series: Series, rect: Rect, x: number, y: number): Points {
        const chart: Chart = this.chart;
        let fromCenterX: number; let fromCenterY: number;
        let clickAngle: number; let arcAngle: number = 0;
        let startAngle: number; let endAngle: number;
        let distanceFromCenter: number;
        if (chart.isScrolling) {
            return null;
        }
        for (const point of series.points) {
            if (!point.regionData) {
                if (!point.regions || !point.regions.length) {
                    continue;
                }
            }
            if (point.regionData && this.chart.chartAreaType === 'PolarRadar' && series.drawType.indexOf('Column') > -1) {
                fromCenterX = x - (series.clipRect.width / 2 + series.clipRect.x);
                fromCenterY = y - (series.clipRect.height / 2 + series.clipRect.y);
                arcAngle = 2 * Math.PI * (point.regionData.currentXPosition < 0 ? 1 + point.regionData.currentXPosition
                    : point.regionData.currentXPosition);
                clickAngle = (Math.atan2(fromCenterY, fromCenterX) + 0.5 * Math.PI - arcAngle) % (2 * Math.PI);
                clickAngle = clickAngle < 0 ? 2 * Math.PI + clickAngle : clickAngle;
                clickAngle = clickAngle + 2 * Math.PI * series.chart.primaryXAxis.startAngle;
                startAngle = point.regionData.startAngle;
                startAngle -= arcAngle;
                startAngle = startAngle < 0 ? 2 * Math.PI + startAngle : startAngle;
                endAngle = point.regionData.endAngle;
                endAngle -= arcAngle;
                endAngle = endAngle < 0 ? 2 * Math.PI + endAngle : endAngle;
                distanceFromCenter = Math.sqrt(Math.pow(Math.abs(fromCenterX), 2) + Math.pow(Math.abs(fromCenterY), 2));
                if (clickAngle >= startAngle && clickAngle <= endAngle &&
                    (((distanceFromCenter >= point.regionData.innerRadius && distanceFromCenter <= point.regionData.radius) ||
                        (distanceFromCenter <= point.regionData.innerRadius && distanceFromCenter >= point.regionData.radius))
                        && distanceFromCenter <= series.chart.radius)) {
                    return point;
                }
            }
            if ((series.dragSettings.enable && series.isRectSeries) || (series.isRectSeries && series.marker.visible)) {
                if (this.isPointInThresholdRegion(x, y, point, rect, series)) {
                    this.insideRegion = true;
                    return point;
                }
            }
            if (!this.insideRegion && this.checkRegionContainsPoint(point.regions, rect, x, y)) {
                return point;
            } else if (this.insideRegion && this.checkRegionContainsPoint(point.regions, rect, x, y)) {
                return point;
            }
        }
        return null;
    }

    /**
     * Checks whether the region contains a point
     */
    private checkRegionContainsPoint(regionRect: Rect[], rect: Rect, x: number, y: number): boolean {
        return regionRect.some((region: Rect, index: number) => {
            this.lierIndex = index;
            return withInBounds(
                x, y,
                new Rect(
                    (this.chart.chartAreaType === 'Cartesian' ? rect.x : 0) + region.x,
                    (this.chart.chartAreaType === 'Cartesian' ? rect.y : 0) + region.y,
                    region.width, region.height
                )
            );
        });
    }
    /**
     * To check the point in threshold region for column and bar series
     *
     * @param {number} x X coordinate
     * @param {number} y Y coodinate
     * @param {Points} point point
     * @param {Rect} rect point rect region
     * @param {Series} series series
     */
    private isPointInThresholdRegion(x: number, y: number, point: Points, rect: Rect, series: Series): boolean {
        const isBar: boolean = series.type === 'Bar';
        const isInversed: boolean = series.yAxis.isInversed;
        const isTransposed: boolean = series.chart.isTransposed;
        const heightValue: number = 10; let yValue: number = 0;
        let xValue: number = 0;
        let width: number;
        let height: number = width = 2 * heightValue;
        if (isInversed && isTransposed) {
            if (isBar) {
                yValue = point.regions[0].height - heightValue;
                width = point.regions[0].width;
            } else {
                xValue = -heightValue;
                height = point.regions[0].height;
            }
        } else if (isInversed || point.yValue < 0) {
            if (isBar) {
                xValue = -heightValue;
                height = point.regions[0].height;
            } else {
                yValue = point.regions[0].height - heightValue;
                width = point.regions[0].width;
            }
        } else if (isTransposed) {
            if (isBar) {
                yValue = -heightValue;
                width = point.regions[0].width;
            } else {
                xValue = point.regions[0].width - heightValue;
                height = point.regions[0].height;
            }
        } else {
            if (isBar) {
                xValue = point.regions[0].width - heightValue;
                height = point.regions[0].height;
            } else {
                yValue = -heightValue;
                width = point.regions[0].width;
            }
        }
        return point.regions.some((region: Rect) => {
            return withInBounds(
                x, y,
                new Rect(
                    (this.chart.chartAreaType === 'Cartesian' ? rect.x : 0) + region.x + xValue,
                    (this.chart.chartAreaType === 'Cartesian' ? rect.y : 0) + region.y + yValue,
                    width, height
                )
            );
        });
    }
    /**
     * @private
     */
    public getClosest(series: Series, value: number, xvalues?: number[]): number {
        let closest: number; let data: number;
        const xData: number[] = xvalues ? xvalues : series.xData;
        if (value >= <number>series.xAxis.visibleRange.min && value <= <number>series.xAxis.visibleRange.max) {
            for (let i: number = 0; i < xData.length; i++) {
                data = xData[i];
                if (closest == null || Math.abs(data - value) < Math.abs(closest - value)) {
                    closest = data;
                }
            }
        }
        const isDataExist: boolean = series.xData.indexOf(closest) !== -1;
        if (isDataExist) {
            return closest;
        } else {
            return null;
        }
    }

    public getClosestX(chart: Chart, series: Series, xvalues?: number[]): PointData {
        let value: number;
        const rect: Rect = series.clipRect;
        if (!chart.requireInvertedAxis) {
            value = getValueXByPoint( chart.mouseX - rect.x, rect.width, series.xAxis);
        } else {
            value = getValueYByPoint(chart.mouseY - rect.y, rect.height, series.xAxis);
        }

        const closest: number = this.getClosest(series, value, xvalues);
        for (const point of series.points) {
            if (closest === point.xValue && point.visible) {
                return new PointData(point, series);
            }
        }
        return null;
    }

    /**
     * Merge all visible series X values for shared tooltip (EJ2-47072)
     *
     * @param visibleSeries 
     * @private
     */
    public mergeXvalues(visibleSeries: Series[]): number[] {
        let collection: number[] = [];
        for (let index: number = 0; index < visibleSeries.length; index++) {
            collection = collection.concat(visibleSeries[index].xData);
        }
        return collection.filter((item, index) => {
            return index === collection.indexOf(item);
        })
    }
}
