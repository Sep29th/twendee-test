import React from 'react';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import { useAppSelector } from '../../hook/redux.hook';
import { Theme } from '../../constant/theme.enum';

type PropsType = {
    numPage: number;
    page: number;
    onChange: (value: number) => void;
};

const Pagination: React.FC<PropsType> = ({ numPage, page, onChange }) => {
    const theme = useAppSelector((state) => state.theme);

    const handlePageChange = (value: number) => {
        onChange(value);
    };

    const renderPageArray = () => {
        if (numPage <= 6)
            return [...Array(numPage)].map((_, index) => {
                if (index + 1 == page)
                    return (
                        <a
                            key={index}
                            aria-current="page"
                            className="cursor-pointer relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {index + 1}
                        </a>
                    );
                return (
                    <a
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                    >
                        {index + 1}
                    </a>
                );
            });
        if (page < 3) {
            return (
                <>
                    {[...Array(3)].map((_, index) => {
                        if (index + 1 == page)
                            return (
                                <a
                                    key={index}
                                    aria-current="page"
                                    className="cursor-pointer relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {index + 1}
                                </a>
                            );
                        return (
                            <a
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                            >
                                {index + 1}
                            </a>
                        );
                    })}
                    <span
                        className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                    >
                        ...
                    </span>
                </>
            );
        }
        if (page > numPage - 2) {
            return (
                <>
                    <span
                        className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                    >
                        ...
                    </span>
                    {[...Array(3)].map((_, index) => {
                        if (numPage + index - 2 == page)
                            return (
                                <a
                                    key={index}
                                    aria-current="page"
                                    className="cursor-pointer relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {numPage + index - 2}
                                </a>
                            );
                        return (
                            <a
                                key={index}
                                onClick={() => handlePageChange(numPage + index - 2)}
                                className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                            >
                                {numPage + index - 2}
                            </a>
                        );
                    })}
                </>
            );
        }
        return (
            <>
                {page > 3 && (
                    <span
                        className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                    >
                        ...
                    </span>
                )}
                <a
                    onClick={() => handlePageChange(page - 2)}
                    className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                >
                    {page - 2}
                </a>
                <a
                    onClick={() => handlePageChange(page - 1)}
                    className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                >
                    {page - 1}
                </a>
                <a
                    aria-current="page"
                    className="cursor-pointer relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {page}
                </a>
                <a
                    onClick={() => handlePageChange(page + 1)}
                    className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                >
                    {page + 1}
                </a>
                <a
                    onClick={() => handlePageChange(page + 2)}
                    className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                >
                    {page + 2}
                </a>
                {page < numPage - 2 && (
                    <span
                        className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-900 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'}`}
                    >
                        ...
                    </span>
                )}
            </>
        );
    };

    return (
        <div
            className={`flex items-center justify-between px-4 py-3 sm:px-6 ${theme == Theme.LIGHT ? 'border-gray-200 bg-white' : 'border-gray-800 bg-gray-700'}`}
        >
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a
                            onClick={() => handlePageChange(1)}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-400 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'} ${page == 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <FaAngleDoubleLeft />
                        </a>
                        <a
                            onClick={() => handlePageChange(page - 1)}
                            className={`relative inline-flex items-center px-2 py-2 ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-400 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'} ${page == 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <FaAngleLeft />
                        </a>
                        {renderPageArray()}
                        <a
                            onClick={() => handlePageChange(page + 1)}
                            className={`relative inline-flex items-center px-2 py-2 ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-400 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'} ${page == numPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <FaAngleRight />
                        </a>
                        <a
                            onClick={() => handlePageChange(numPage)}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${theme == Theme.LIGHT ? 'ring-gray-300 text-gray-400 hover:bg-gray-50' : 'ring-gray-600 text-gray-300 hover:bg-gray-900'} ${page == numPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <FaAngleDoubleRight />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
