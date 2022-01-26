import { useEffect, useState } from "react";
import { Button, Pagination, message, Table } from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

import requests from "../../utils/requests";
import { useHumanTime } from "../../hooks/useHumanTime";
import tableColumns from "../../../mock/table-columns";

import styles from "./user-list.module.scss";

const UserListComponent = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 5;
    const humanDate = useHumanTime("D.M.Y h:m");
    const columns = [...tableColumns, {
        title: 'Действия',
        key: 'action',
        render: ({id}) => {
            return <div className={styles.actions}>
                <Button
                    icon={<DeleteOutlined/>}
                    type="primary"
                    onClick={removeUserHandler.bind(null, id)}
                    shape="circle"
                    danger
                />
            </div>
        },
    }];

    useEffect( () => {
        setIsLoading(true);
        requests.users(page, limit).then( response => {
            if(!response.status){
                const users = {...response, items: response?.items.map( item =>{
                        item.ctime = humanDate(item.ctime);
                        item.key = item.id;
                        return item;
                    })}
                setUsers(users);
            }else{
                message?.error(response?.message);
            }
        }).finally(() => setIsLoading(false));
    }, [page]);

    function onChangePageHandler (currentPage) {
        setPage(currentPage);
    }

    function removeUserHandler (id) {
        setUsers(
            {
                ...users,
                items: users.items.filter(item => item.id !== id),
            });
    }

    const renderPagination = () => {
        if(users && users?.items.length) {
            return (
                <div className={styles.pagination}>
                    <Pagination
                        onChange={onChangePageHandler}
                        current={page}
                        pageSize={users?.limit}
                        total={users?.total}
                    />
                </div>
            );
        }
    }
    if(isLoading) return (
        <div className={styles.loading}><LoadingOutlined /></div>
    )
    return (
        <div>
            <Table pagination={false} columns={columns} dataSource={users?.items} />
            {renderPagination()}
        </div>
    );
};

export default UserListComponent;