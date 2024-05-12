export default function SectionHeaders({subHeaders,mainHeaders}){
    return(
        <div className="text-center mb-4">
        <h3 className="uppercase text-gray-500 font-semibold leading-4">
        {subHeaders}</h3>  
        <h2 className="text-primary font-bold text-4xl italic">
        {mainHeaders}</h2>
      </div>
    )
}