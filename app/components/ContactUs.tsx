"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface userData{
  first_name:string,
  last_name:string,
  email:string,
  contact:string,
  description:string,
}
const ContactUs = () => {
  const formSchema=z.object({
    first_name:z.string().nonempty({message:"first name is required"}).min(6, {message: "first name must be 8 Charaters"}),
    last_name:z.string().nonempty({message:"last Name is required"}).min(6,{message:"Minimum of 8 characters is required"}),
    email:z.string().nonempty({message:"Email is required"}).email({message:"Invalid Email!"}),
    description:z.string().nonempty({message:'Description is required'}),
    contact:z.string().nonempty({message:"Contact Number is required"}).regex(/^(98|97)\d{8}$/, {
      message: "Contact number must start with 98 or 97 and have 10 digits",
    }),
  })
  const {register, handleSubmit, reset, formState:{errors}}=useForm({resolver:zodResolver(formSchema)})
  const contactform=(data:userData)=>{
    console.log(data)
reset()
  }
  return (
    <div
      id="contact"
      className="bg-primary-background lg:h-screen text-white pt-[10vh]"
    >
      <div className="container min-h-screen">
        <h1 className="text-xl font-dmSans font-semibold text-center sm:text-3xl pb-10">
          Contact Me!
        </h1>
        <section className="flex gap-16 items-start">
          <div className="flex flex-col gap-4 w-full md:w-[50%]">
            <h1 className="text-2xl text-center text-red-400 font-semibold font-dmSans">Get in touch with me</h1>
          <form onSubmit={handleSubmit(contactform)} className=" grid grid-cols-2 gap-5">
            {/* first name */}
            <div className="relative flex flex-col gap-2">
              <label htmlFor="" className="font-medium font-dmSans txt-lg">First Name</label>
          <input type="text" placeholder="Enter your first name" className="bg-[#313967] px-3 py-2 rounded-md outline-none text-white font-dmSans text-sm placeholder:text-white/60" 
              {...register("first_name")} />

{errors.first_name && <p className="text-red-500 text-[12px] absolute top-full ">{errors.first_name.message}</p>}
            </div>
           

            {/* last name */}
            <div className="relative flex flex-col gap-2">
              <label htmlFor="" className="font-medium font-dmSans txt-lg">last Name</label>
              <input type="text" placeholder="Ender your last name" className="bg-[#313967] px-3 py-2 rounded-md outline-none text-white font-dmSans text-sm placeholder:text-white/60" 
              {...register("last_name")} />
              {errors.last_name && <p className="text-red-500 text-[12px] absolute top-full ">{errors.last_name.message}</p>}
            </div>
{/* email */}
            <div className="relative flex flex-col gap-2">
              <label htmlFor="" className="font-medium font-dmSans txt-lg">Email</label>
              <input type="text" placeholder="Enter your email" className="bg-[#313967] px-3 py-2 rounded-md outline-none text-white font-dmSans text-sm placeholder:text-white/60" 
              {...register("email")} />
              {errors.email && <p className="text-red-500 text-[12px] absolute top-full ">{errors.email.message}</p>}
            </div>

            {/* phone number */}
            <div className="relative flex flex-col gap-2">
              <label htmlFor="" className="font-medium font-dmSans txt-lg">Contact Number</label>
              <input type="text" placeholder="Enter your contact number" className="bg-[#313967] px-3 py-2 rounded-md outline-none text-white font-dmSans text-sm placeholder:text-white/60" 
              {...register("contact")} />
               {errors.contact && <p className="text-red-500 text-[12px] absolute top-full ">{errors.contact.message}</p>}
            </div>

             {/* Description */}
             <div className="relative flex flex-col gap-2 col-span-2">
              <label htmlFor="" className="font-medium font-dmSans txt-lg">Description</label>
              <textarea placeholder="Enter description" className="bg-[#313967] h-[100px] resize-none px-3 py-2 rounded-md outline-none  text-white font-dmSans text-sm placeholder:text-white/60" 
              {...register("description")} />
               {errors.description && <p className="text-red-500 text-[12px] absolute top-full ">{errors.description.message}</p>}
            </div>
            <button className="col-span-2 btn-secondary" type="submit">Submit</button>

          </form>
          </div>
        

          <main className="hidden md:block w-[40%] mx-auto">
            <h1 className="text-2xl text-red-400 font-semibold font-dmSans">Contact Details</h1>
            <div className="my-5">
            <h2 className="text-sm font-medium font-dmSans">Kamalbinayak Street, Bhaktapur</h2>
            <h2 className="text-sm font-medium font-dmSans">Nepal</h2>
            </div>
            <div className="mb-5">
              <h1 className="text-sm font-medium font-dmSans">Call: 9840733064</h1>
            </div>
            <div className="mb-5">
              <h1 className="text-sm font-medium font-dmSans">Get more information about me thorugh contact or you can submit a form with your information</h1>
            </div>

          </main>

        </section>
      </div>
    </div>
  );
};

export default ContactUs;
