import { Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import React from "react";
import {cn} from '../lib/utils'
import Toast from "./Toast";

const GetInTouch = () => {
const [formData, setFormData]= useState({
  name:'',
    email:'',
    message:''
  })
const [errors, setErrors]=useState({})
const [toast, setToast] =useState('')

  function validate(){
  const newErrors={};

    const regexValue=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!formData.email){ 
        newErrors.email='kindly enter the required email'
      }else if(!regexValue.test(formData.email.trim())){
        newErrors.email='Enter a valid email!'
      }

      if(formData.message === ''){
        newErrors.message='Cannot submit empty fields!'
      }else if(formData.message.length < 10){
        newErrors.message='Message should be at least 10 characters'
      }
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
      
  }
  const handleSubmit= (e)=>{
      e.preventDefault();

      if( validate()){
        setToast('Form successfully submitted!')
        setFormData({ name: '', email: '', message:''})
        setErrors({ })
     
      }
      setTimeout(()=>{
        setToast('')
      },3000)
      


  }
  function handleChange(e){
    const {name , value}= e.target;
     setFormData({...formData, [name]:value})
  }
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30 sm:w-full md:w-[70%] mx-auto">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:4xl mt-12 font-bold text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>{" "}
      </div>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        {" "}
        Have a project im mind, Feel free to reach out to collaborate'
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
       <div>
         <div className="space-y-8">
          <h3 className="text-2xl font-semibold mb-6">
            <div className="flex items-start justify-center space-x-4 ">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium mt-2">Email</h4>
            </div>
            <a
              href="mailto:gbadamosiboluwatife2002@gmail.com"
              className="text-primary hover:text-foreground transition-colors break-words"
            >
              gbadamosiboluwatife2002@gmail.com
            </a>
          </h3>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-semibold mb-6">
            <div className="flex items-start justify-center space-x-4 ">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium mt-2">Phone</h4>
            </div>
            <a
              href="tel: +2349017354580"
              className="text-primary hover:text-foreground transition-colors"
            >
              +2349017354580
            </a>
          </h3>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-semibold mb-6">
            <div className="flex items-start justify-center space-x-4 ">
              <div className="p-3 rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium mt-2">Location</h4>
            </div>
            <a className="text-primary hover:text-foreground transition-colors">
              Lagos, Nigeria.
            </a>
          </h3>
               <div className="pt-8">
        <h4 className="font-semibold text-2xl"> Connect with Me</h4>
        <div className="flex space-x-4 justify-center">
          <a href="https://www.linkedin.com/in/gbadamosi-boluwatife-8263a0241/" target="_blank"> <Linkedin /></a>
           <a href="https://wa.me/2349017354580" target="_blank"> <FaWhatsapp size={25}/></a>

          <a href="https://www.instagram.com/bolu_gbadamosi" target="_blank"> <Instagram /></a>
        </div>
      </div>
    
        </div>
       </div>

         <div className="bg-card p-8 rounded-lg shadow-xs">
        <h3 className="text-3=2xl font-semibold mb-6">Send us a Message</h3>


        <form className="space-y-6"onSubmit={handleSubmit}>
          {toast && <Toast toast={toast}/>}
          <label htmlFor="name" className=" text-sm font-semibold mb-5">Name</label>
          <input type="text" id="name" required name="name" placeholder="John Jonah..." className="w-full px-4 py-3 bg-background focus:ring-2 rounded-md border-input focus:ring-primary outline-hidden " value={formData.name} onChange={handleChange}/>

          <label htmlFor="name" className=" text-sm font-semibold mb-5">Email</label>
          <input type="email" id="email" required name="email" placeholder="example@gmail.com" value={formData.email} className="w-full px-4 py-3 bg-background focus:ring-2 rounded-md border-input focus:ring-primary outline-hidden" onChange={handleChange} />
          {errors.email && <p>{errors.email}</p>}


          <label htmlFor="name" className=" text-sm font-semibold mb-5">Message</label>
          <textarea id="message" required name="message" placeholder="Hello, I'd like to talk about..." className="w-full px-4 py-3 bg-background focus:ring-2 rounded-md border-input focus:ring-primary outline-hidden resize-none" value={formData.message} onChange={handleChange}/>
          {errors.message && <p>{errors.message}</p>}

          <button type="submit" className={cn("cosmic-button w-full flex items-center justify-center gap-4", )}>Send Message <Send /></button>
        </form>
      </div>
      </div>
 
    </section>
  );
};

export default GetInTouch;
