import AddToCartButton from "@/components/menu/AddToCartButton";

export default function MenuItemTile({onAddToCart,...item}){
    const {image,description,name,basePrice,sizes,extraIngredientsPrices}=item;
    const hasSizesOrExtras=sizes?.length || extraIngredientsPrices?.length
    return (
        <div className='bg-gray-300 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25'>
        <div className="text-center">
        <img src={image} alt="pizza" className="max-h-24 block mx-auto"/>
        </div>
        <h4 className='font-semibold my-3 text-xl'>{name}</h4>
        <p className='text-gray-500 text-sm max-h-20 line-clamp-3'>{description}</p>
        <AddToCartButton image={image} hasSizesOrExtras={hasSizesOrExtras} onClick={onAddToCart} basePrice={basePrice} />
     </div>
    )
}