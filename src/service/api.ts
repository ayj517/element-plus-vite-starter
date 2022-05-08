import request from '@/utils/request';
import { stringify } from 'qs';


export async function queryProjects(params: any): Promise<any> {
  return request(`projects?${stringify(params)}`)
}
