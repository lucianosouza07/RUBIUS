import { rubius_api } from "./rubius"

const api = rubius_api

export const getGames = async () => {
	try {
		const response = await api.get("/ext/games", {timeout: 30000})
		return response.data
	} catch(err) {
		console.log("getGames error: ", err)
	}
	return null
}

export const getTeams = async () => {
	try {
		const response = await api.get("/ext/teams", {timeout: 30000})
		return response.data
	} catch(err) {
		console.log("getTeams error: ", err)
	}
	return null
}

export const getGroups = async () => {
	try {
		const response = await api.get("/ext/groups", {timeout: 30000})
		return response.data
	} catch(err) {
		console.log("getGroups error: ", err)
	}
	return null
}
