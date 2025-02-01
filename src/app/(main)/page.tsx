import ProductList from "@/components/shared/Product/product-list"
import { getLatestProducts } from "@/actions/product/product.action"
export const metadata = {
  title:"Home"
}

const HomePage = async() => {
  const latestProducts  = await getLatestProducts();
  //@ts-ignore
  return <ProductList data={latestProducts} title="Newest Arrivals" limit={5}/>
}
export default HomePage 
