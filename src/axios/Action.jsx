import Api from "./Api";

export const GetMyProducts = () => {
    return Api.get("/products");

}