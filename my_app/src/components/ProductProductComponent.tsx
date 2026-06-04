import {Product} from "../shared/types/ProductType";

interface ProductCartProps{
    product: Product;
}

export default  function ProductCart({
    product
} : ProductCartProps){
    return(
        <div>
            <h2>product.name</h2>
        </div>
    )

}
