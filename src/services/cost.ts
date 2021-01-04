import request from 'umi-request';

const baseUrl = '/api/account/cost';
const API = {
  getCostList: `${baseUrl}/list`,
  saveCostDetail: `${baseUrl}/detail`,
};

/**
 * 获取花费的列表数据
 * @param obj
 */
export async function getCostList(obj = {}) {
  return request.get(API.getCostList, {
    params: obj,
  });
}

/**
 * 保存花费明细
 * @param detail
 */
export async function saveCostDetail(detail = {}) {
  return request.post(API.saveCostDetail, {
    data: detail,
  });
}
