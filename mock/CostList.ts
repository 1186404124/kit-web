import { Request, Response } from 'express';

export default {
  'GET /api/cost/list': (req: Request, res: Response) => {
    res.send({
      success: true,
      code: 200,
      msg: '操作成功',
      data: [
        {
          costNumber: '10001',
          costMoney: 500.25,
          surplus: 175421,
          description: '买辣条',
          type: 'plus',
          createTime: '2021-01-02 15:30:12',
        },
        {
          costNumber: '10002',
          costMoney: 500.25,
          surplus: 175421,
          description: '买鸡腿',
          type: 'plus',
          createTime: '2021-01-02 15:30:15',
        },
        {
          costNumber: '10003',
          costMoney: 500.25,
          surplus: 175421,
          description: '买炸鸡',
          type: 'reverse',
          createTime: '2021-01-02 15:45:12',
        },
        {
          costNumber: '10004',
          costMoney: 500.25,
          surplus: 175421,
          description: '买辣条',
          type: 'reverse',
          createTime: '2021-01-02 15:50:12',
        },
      ],
    });
  },
};
