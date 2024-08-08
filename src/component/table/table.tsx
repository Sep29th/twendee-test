import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { FaAngleDown, FaAngleUp, FaMinus } from 'react-icons/fa6';
import { useAppSelector } from '../../hook/redux.hook';
import { Theme } from '../../constant/theme.enum';

type ColumnType = {
    label: string;
    sort?: boolean;
    sortDirection?: 'asc' | 'desc' | 'none';
    sortFn?: (a: any, b: any) => number;
    onClick?: () => void;
};

type PropsType = {
    loading: boolean;
    column: ColumnType[];
    dataSource: any[] | undefined;
    error: boolean;
    className: string;
};

const Table: React.FC<PropsType> = ({ loading, column, dataSource, error, className }) => {
    const theme = useAppSelector((state) => state.theme);

    if (error) return <h1>Something wrong ....</h1>;
    if (loading)
        return (
            <>
                <table
                    className={`table-auto table-fixed border-collapse border rounded-lg relative w-full ${theme == Theme.LIGHT ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-900'} ${className}`}
                >
                    <thead className={`${theme == Theme.LIGHT ? 'bg-gray-100' : 'bg-gray-800'} sticky top-0`}>
                        <tr>
                            {column.map((item, index) => (
                                <th
                                    key={index}
                                    className={`border px-4 py-2 text-left font-semibold ${theme == Theme.LIGHT ? 'text-gray-700 border-gray-200' : 'text-gray-200 border-gray-800'} ${item.sort && 'cursor-pointer'}`}
                                >
                                    {item.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
                <div className={`flex items-center justify-center ${className}`}>
                    <InfinitySpin width="100" color="#4F46E5" />
                </div>
            </>
        );
    const data = dataSource || [];
    column.forEach((value) => {
        if (value.sortDirection == 'asc') data.sort(value.sortFn);
        else if (value.sortDirection == 'desc') data.sort(value.sortFn).reverse();
    });

    return (
        <div className={`h-[500px] overflow-auto ${className}`}>
            <table
                className={`table-auto table-fixed border-collapse border rounded-lg relative w-full ${theme == Theme.LIGHT ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-900'} ${className}`}
            >
                <thead className={`${theme == Theme.LIGHT ? 'bg-gray-100' : 'bg-gray-800'} sticky top-0`}>
                    <tr>
                        {column.map((item, index) => {
                            return (
                                <>
                                    <th
                                        onClick={() => {
                                            item.onClick && item.onClick();
                                        }}
                                        key={index}
                                        className={`border px-4 py-2 text-left font-semibold ${theme == Theme.LIGHT ? 'text-gray-700 border-gray-200' : 'text-gray-200 border-gray-800'} ${item.sort && 'cursor-pointer'}`}
                                    >
                                        {item.label}
                                        {item.sortDirection == 'asc' ? <FaAngleDown /> : item.sortDirection == 'desc' ? <FaAngleUp /> : <FaMinus />}
                                    </th>
                                </>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} className={`hover:${theme == Theme.LIGHT ? 'bg-gray-50' : 'bg-gray-600'}`}>
                            {column.map((i, ind) => (
                                <td
                                    key={ind}
                                    className={`border px-4 py-2 ${theme == Theme.LIGHT ? 'text-gray-800 border-gray-200' : 'text-gray-200 border-gray-800'}`}
                                >
                                    {item[i.label]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
