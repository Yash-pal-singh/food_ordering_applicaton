import Header from "@/components/layouts/Header";
import Hero from "@/components/layouts/Hero";
import HomeMenu from "@/components/layouts/HomeMenu";
import SectionHeaders from "@/components/layouts/SectionHeaders";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <section className="text-center my-16" id="about">
        <SectionHeaders 
        subHeaders={'Our story'} 
        mainHeaders={'About us'}/>

      <div className="text-gray-500 mx-auto max-w-md mt-4 flex flex-col gap-4">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam repellendus, temporibus facere reprehenderit exercitationem autem odit vero dolores sed maiores aperiam ea ratione. Ut ullam aliquid aut facere, ducimus at.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit quas reiciendis nihil, quos saepe, nesciunt minus esse ad culpa ratione delectus libero magnam placeat laboriosam veritatis neque officia, voluptas dolores.
        </p>
        </div>
      </section>

      <section className="text-center my-8 "id="contact">
        <SectionHeaders 
        subHeaders={'Don\'t hesitate'}
         mainHeaders={'Contact us'}/>
         <div className="mt-8">
         <a href="tel:+918126346899" className="text-4xl underline text-gray-400">+918126346899</a>
         </div>
      </section>
   </>
  );
}