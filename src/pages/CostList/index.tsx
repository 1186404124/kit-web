import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDateTimePicker,
  ProFormSelect,
} from '@ant-design/pro-form';

import { Button, message } from 'antd';
import { getCostList, saveCostDetail } from '@/services/cost';

type CostListItem = {
  userId: string;
  costNumber: number;
  costMoney: string;
  createTime: string;
  type: string;
  description: string;
};
// @ts-ignore
const costListColumns: ProColumns<CostListItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
    title: '序号',
  },
  {
    dataIndex: 'costNumber',
    title: '花费金额',
    valueType: 'money',
    sorter: (a, b) => a.costNumber - b.costNumber,
  },
  {
    dataIndex: 'type',
    title: '类型',
    initialValue: 'all',
    hideInSearch: true,
    filters: true,
    onFilter: false,
    valueEnum: {
      all: { text: '全部', status: 'default' },
      plus: { text: '收入', status: 'Success' },
      reverse: { text: '支出', status: 'Processing' },
    },
  },
  {
    dataIndex: 'description',
    title: '描述',
    sorter: (a, b) => (a.description || '').localeCompare(b.description || ''),
  },
];
const proRequest = async (params = {}, sorter = {}, filter = {}) => {
  return getCostList({ ...params, sorter, filter });
};

const CostList = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const form = (
    <ModalForm
      title={'花费明细'}
      visible={showForm}
      onVisibleChange={(flag: boolean) => setShowForm(flag)}
      wrapperCol={{ span: 24 }}
      onFinish={async (values) => {
        const { success = false, msg = '操作失败' } = await saveCostDetail(values);
        if (success) {
          message.success(msg);
        } else {
          message.error(msg);
        }
        setShowForm(false);
      }}
      modalProps={{ maskClosable: false }}
    >
      <ProFormSelect
        label={'类型'}
        name={'type'}
        options={[
          {
            label: '收入',
            value: 'plus',
          },
          {
            label: '支出',
            value: 'reverse',
          },
        ]}
        rules={[{ required: true, message: '请选择花费类型' }]}
      />
      <ProFormText
        label={'花费金额'}
        name={'costMoney'}
        tooltip={'只能输入数字'}
        allowClear
        rules={[{ required: true, message: '不能为空' }]}
        fieldProps={{ type: 'number', step: 0.01 }}
      />
      <ProFormDateTimePicker label={'记录时间'} name={'createTime'} />
      <ProFormTextArea label={'描述'} name={'description'} allowClear />
    </ModalForm>
  );

  const proToolBar = (
    <Button
      key={'button'}
      type={'primary'}
      onClick={() => {
        setShowForm(true);
      }}
    >
      新建
    </Button>
  );

  return (
    <>
      <ProTable<CostListItem>
        columns={costListColumns}
        request={proRequest}
        editable={{ type: 'multiple' }}
        rowKey={'costNumber'}
        pagination={{ pageSize: 5 }}
        dateFormatter={'string'}
        headerTitle={'高级表格'}
        toolBarRender={() => [proToolBar]}
      />
      {form}
    </>
  );
};
export default CostList;
