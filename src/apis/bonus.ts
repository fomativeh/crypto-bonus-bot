import axios from "axios"
import { API_URL } from "../constants/constants"

export const newBonus = async (bonusData: any) => {
    try {
        const res = await axios.post(`${API_URL}/bonus`, bonusData)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const updateBonus = async (bonusData: any, bonusId: string) => {
    try {
        const res = await axios.patch(`${API_URL}/bonus/${bonusId}`, bonusData)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteBonusFromDB = async (bonusId: string) => {
    try {
        const res = await axios.delete(`${API_URL}/bonus/${bonusId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getBonuses = async () => {
    try {

        const res = await axios.get(`${API_URL}/bonuses`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}