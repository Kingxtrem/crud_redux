import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts } from "../Redux/Products";
import { GetMyProducts } from "../axios/Action";

const ReduxApiSetUp = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const GetmyProducts = async () => {
    const res = await GetMyProducts();
    dispatch(GetProducts(res.data));
  };
  useEffect(() => {
    GetmyProducts();
  }, [ ]);
  console.log(products);
  return (
    <div>
      <h1>Redux Api Set Up</h1>
      <div className="border border-gray-300 p-5 rounded bg-gray-100">
        {products.map((product, index) => {
          return (
            <ul className="border border-amber-300 " key={index}>
              <p className="text-2xl font-extrabold text-green-500">
                {product.title}
              </p>
              <p>{product.price}</p>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default ReduxApiSetUp;