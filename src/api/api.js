import { instance } from "../config";
import { requestPath } from "./requestPath";

export const getProducts = () => instance.get(requestPath.getProducts)
export const getOrders = (id) => instance.get(`${requestPath.orders}${id}/`)
export const postOrders = (data) => instance.post(requestPath.orders, data)
export const getBaskets = (id) => instance.get(`${requestPath.baskets}${id}` )
export const postBaskets = (data) => instance.post(requestPath.baskets, data)
export const postBasketsDetails = (data) => instance.post(requestPath.basketDetails, data)
export const deleteBasket = (id) => instance.delete(requestPath.basketDetails + id)
export const getCategories = () => instance.get(requestPath.categories)
export const getIngredients = () => instance.get(requestPath.ingredients)