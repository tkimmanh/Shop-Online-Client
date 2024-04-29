import axios from 'axios'
import { AdressType } from 'src/pages/Cart/Cart'

const BASE_URL = 'https://vapi.vnappmob.com/api/'

const getProvinces = async (): Promise<AdressType[]> => {
  const response = await axios.get(`${BASE_URL}province`)
  return response.data.results
}

const getDistricts = async (district_id: string): Promise<AdressType[]> => {
  const response = await axios.get(`${BASE_URL}province/district/${district_id}`)
  return response.data.results
}

const getWards = async (district_id: string): Promise<AdressType[]> => {
  const response = await axios.get(`${BASE_URL}province/ward/${district_id}`)
  return response.data.results
}

export default {
  getProvinces,
  getDistricts,
  getWards
}
