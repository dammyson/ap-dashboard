import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { CustomerFeedback } from '@/types/types';
import { Trophy } from '@/components/svg/surveys/Surveys';

export const useCustomerFeedbackColumn = () => {
  const tableColumns = useMemo(() => {
    return [
      { title: 'TITLE', dataIndex: 'title', key: 'title' },
      { title: 'NAME', dataIndex: 'name', key: 'name' },
      { title: 'EMAIL', dataIndex: 'email', key: 'email' },
      { title: 'AIRPEACE ID', dataIndex: 'airpeaceID', key: 'airpeaceID' },
      { title: 'GENDER', dataIndex: 'gender', key: 'gender' },
      { title: 'NATIONALITY', dataIndex: 'nationality', key: 'nationality' },
      {
        title: 'ACTIONS',
        dataIndex: '',
        key: '',
        render: (_, record) => (
          <span onClick={() => console.warn('removed', record)}>
            {<Trophy />}
          </span>
        ),
      },
    ] as ColumnType<CustomerFeedback>[];
  }, []);

  return { tableColumns };
};
