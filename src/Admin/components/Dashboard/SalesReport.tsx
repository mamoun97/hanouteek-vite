

import { useState } from 'react';


import {
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    ComposedChart,
} from 'recharts';

import useMedia from 'react-use/lib/useMedia';

import { Badge } from 'rizzui';
import DatePicker from '../Datepicker';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import WidgetCard from './widget-card';
import { CustomYAxisTick } from './custom-yaxis-tick';
import { CustomTooltip } from './custom-tooltip';
import { RoundedBottomBar } from './rounded-bottombar';
import { RoundedTopBar } from './rounded-topbar';




const data = [
    {
        month: 'Jan',
        revenue: 5000,
        expense: 1500,
        val:1200
    },
    {
        month: 'Feb',
        revenue: 4600,
        expense: 3798,
        val:1200
    },
    {
        month: 'Mar',
        revenue: 5900,
        expense: 1300,
        val:1200
    },
    {
        month: 'Apr',
        revenue: 5780,
        expense: 3908,
        val:1200
    },
    {
        month: 'May',
        revenue: 4890,
        expense: 2500,
        val:1200
    },
    {
        month: 'Jun',
        revenue: 8000,
        expense: 3200,
        val:1200
    },
    {
        month: 'Jul',
        revenue: 4890,
        expense: 2500,
        val:1200
    },
    {
        month: 'Aug',
        revenue: 3780,
        expense: 3908,
        val:1200
    },
    {
        month: 'Sep',
        revenue: 7800,
        expense: 2800,
        val:1200
    },
    {
        month: 'Oct',
        revenue: 5780,
        expense: 1908,
        val:1200
    },
    {
        month: 'Nov',
        revenue: 2780,
        expense: 3908,
        val:1200
    },
    {
        month: 'Dec',
        revenue: 7500,
        expense: 3000,
        val:1200
    },
];

export default function SalesReport({ className }: { className?: string }) {
    const isTablet = useMedia('(max-width: 820px)', false);
    const [startDate, setStartDate] = useState<Date>(new Date());
    return (
        <WidgetCard
            title={'Rapport des ventes'}
            description={
                <>
                    <Badge renderAsDot className="me-0.5 bg-[#282ECA]" /> Revenu
                    <Badge
                        renderAsDot
                        className="me-0.5 ms-4 bg-[#B8C3E9] dark:bg-[#7c88b2]"
                    />{' '}
                    Frais
                </>
            }
            descriptionClassName="text-gray-500 mt-1.5"
            action={
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    // dateFormat="yyyy"
                    
                    placeholderText="Select Month"
                    showYearPicker
                    inputProps={{ variant: 'text', inputClassName: 'p-0 px-1 h-auto' }}
                    // popperPlacement="bottom-end"
                    // className="w-[100px]"
                />
            }
            className={className}
        >
            <SimpleBar>
                <div className="h-96 w-full pt-9">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                        {...(isTablet && { minWidth: '700px' })}
                    >
                        <ComposedChart
                            data={data.map(el=>({...el,d:el.expense+el.revenue}))}
                            barSize={15}
                            // barSize={isTablet ? 20 : 24}
                            className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
                        >
                            <defs>
                                <linearGradient id="salesReport" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="#F0F1FF"
                                        className=" [stop-opacity:0.1]"
                                    />
                                    <stop offset="95%" stopColor="#8200E9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={<CustomYAxisTick prefix={'$'} />}
                            />
                            <Tooltip
                                content={
                                    <CustomTooltip  className="[&_.chart-tooltip-item:last-child]:hidden"  />
                                }
                            />
                            
                            <Bar
                                dataKey="revenue"
                                label="Revenu"
                                fill="#282ECA"
                                stackId="a"
                                // shape={<RoundedBottomBar />}
                            />
                            <Bar
                                dataKey="expense"
                                stackId="a"
                                label="Frais"
                                fill="#B8C3E9"
                                fillOpacity={0.9}
                                // shape={
                                //     <RoundedTopBar className="fill-[#B8C3E9] dark:fill-[#7c88b2]" />
                                // }
                            />
                            {/* <Bar
                                dataKey="val"
                                label="Val"
                                fill="#FF0"
                                stackId="a"
                                // shape={<RoundedBottomBar />}
                            /> */}
                            <Area
                                type="bump"
                                dataKey="revenue"
                                stroke="#8200E9"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#salesReport)"
                            />
                            <Area
                                type="bump"
                                dataKey="d"
                                stroke="#F80"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#salesReport)"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </SimpleBar>
        </WidgetCard>
    );
}
