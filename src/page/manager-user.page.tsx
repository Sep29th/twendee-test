import Select from '../component/select/select';
import Table from '../component/table/table';
import Pagination from '../component/pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import { useGetRandomUserInfo } from '../api/random-user.api';

const options = ['5', '10', '15', '20'];

const sortOptions = {
    ['asc']: 'desc',
    ['desc']: 'none',
    ['none']: 'asc'
};

const ManagerUserPage = () => {
    const [filterParam, setFilterParam] = useSearchParams();
    const itemPerPageQuery = filterParam.get('itemPerPage');
    const pageQuery = parseInt(filterParam.get('page') || '1');
    const itemPerPage = !itemPerPageQuery || isNaN(parseInt(itemPerPageQuery)) || !options.includes(itemPerPageQuery) ? '10' : itemPerPageQuery;
    const numPage = Math.ceil(100 / parseInt(itemPerPage));
    const page = (!pageQuery || pageQuery < 1 ? 1 : Math.ceil(pageQuery)) > numPage ? numPage : Math.ceil(pageQuery);
    const { isFetching, data, isError } = useGetRandomUserInfo({ page: page, results: itemPerPage });
    const sortFullnameQuery = filterParam.get('sortFullname') || 'none';
    const sortUsernameQuery = filterParam.get('sortUsername') || 'none';
    const sortFullname: 'asc' | 'desc' | 'none' = ['asc', 'desc', 'none'].includes(sortFullnameQuery)
        ? (sortFullnameQuery as 'asc' | 'desc' | 'none')
        : 'none';
    const sortUsername: 'asc' | 'desc' | 'none' = ['asc', 'desc', 'none'].includes(sortUsernameQuery)
        ? (sortUsernameQuery as 'asc' | 'desc' | 'none')
        : 'none';

    const handleSelectChange = (value: string) => {
        filterParam.set('itemPerPage', value);
        filterParam.set('page', `${Math.round((page / parseInt(value)) * parseInt(itemPerPage))}`);
        setFilterParam(filterParam);
    };

    const handlePageChange = (value: number) => {
        filterParam.set('page', `${value}`);
        setFilterParam(filterParam);
    };

    const column = [
        {
            label: 'Fullname',
            sort: true,
            sortDirection: sortFullname,
            sortFn: (a: any, b: any) => a.Fullname.toLowerCase().localeCompare(b.Fullname.toLowerCase()),
            onClick: () => {
                filterParam.set('sortFullname', sortOptions[sortFullname]);
                filterParam.set('sortUsername', 'none');
                setFilterParam(filterParam);
            }
        },
        {
            label: 'Username',
            sort: true,
            sortDirection: sortUsername,
            sortFn: (a: any, b: any) => a.Username.toLowerCase().localeCompare(b.Username.toLowerCase()),
            onClick: () => {
                filterParam.set('sortUsername', sortOptions[sortUsername]);
                filterParam.set('sortFullname', 'none');
                setFilterParam(filterParam);
            }
        },
        {
            label: 'Thumbnail'
        }
    ];

    return (
        <div className="grid grid-cols-12 gap-4">
            <Table
                loading={isFetching}
                className={'col-span-12'}
                column={column}
                dataSource={data?.map((item) => ({
                    Fullname: `${item.name.title} ${item.name.first} ${item.name.last}`,
                    Username: item.login.username,
                    Thumbnail: <img className="rounded-full" src={item.picture.thumbnail} />
                }))}
                error={isError}
            />
            <div className="col-span-6"></div>
            <div className="col-span-6 flex items-center justify-end">
                <Pagination numPage={numPage} page={page} onChange={handlePageChange} />
                <Select
                    options={options.map((item) => ({ value: item, label: `${item}/page` }))}
                    value={itemPerPage}
                    onChange={handleSelectChange}
                    className="max-w-sm"
                />
            </div>
        </div>
    );
};

export default ManagerUserPage;
