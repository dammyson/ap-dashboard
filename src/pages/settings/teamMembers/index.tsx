import { Add } from '../../../components/svg/settings/Settings';
import { Button, ButtonSize } from '../../../components/button';
import { useState } from 'react';
import AddMembers from './addMembers';
import CategoryHeader from '../../../components/categoryHeader';
import { Table } from 'antd';

function TeamMembers() {
  const [addMembers, setAddMembers] = useState(false);

  const list = [
    { category: 'credit', amount: 200 },
    { category: 'debit', amount: 100 },
    { category: 'debit', amount: 100 },
  ];
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <div>
      {addMembers ? (
        <AddMembers />
      ) : (
        <div>
          <CategoryHeader
            title='Team Members'
            button={
              <Button
                onClick={() => setAddMembers(true)}
                buttonText='Add members'
                mode='outlined'
                trailingIcon={<Add />}
                size={ButtonSize.Small}
                className='bg-transparent text-primary-white hover:text-light-grey-100 hover:border-inherit h-9'
              />
            }
          />
          <Table
            pagination={false}
            columns={columns}
            className='table'
            dataSource={list}
            scroll={{
              y: 506,
            }}
            rootClassName='min-h-[566px] w-full'
          />
        </div>
      )}
    </div>
  );
}

export default TeamMembers;
