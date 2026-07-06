import { Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import React from "react";
import {cn} from '../lib/utils'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import toast from 'react-hot-toast';

const GetInTouch = () => {
const [formData, setFormData]= useState({
  name:'',
    email:'',
    message:''
  })
const [errors, setErrors]=useState({})

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
  const handleSubmit = async (e) => {
      e.preventDefault();

      if(validate()){
        const toastId = toast.loading('Sending message...');
        try {
          await addDoc(collection(db, "messages"), {
             ...formData,
             timestamp: new Date()
          });
          toast.success('Message sent successfully!', { id: toastId });
          setFormData({ name: '', email: '', message: '' });
          setErrors({});
        } catch (error) {
          console.error("Error sending message: ", error);
          toast.error('Error sending message. Please try again.', { id: toastId });
        }
      }
  }
  function handleChange(e){
    const {name , value}= e.target;
     setFormData({...formData, [name]:value})
  }
  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Hero-style background — grid + glow for visual consistency */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.08),transparent_70%)] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.08)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(circle_at_center,white,transparent_90%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-[3px] bg-emerald-400/80 mx-auto mt-4 rounded-full" />
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-sm sm:text-base">
            Have a project in mind? Feel free to reach out and collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT — CONTACT INFO */}
          <div className="space-y-8">
            {/* Email */}
            <div className="bg-card/60 rounded-xl p-5 sm:p-6 border border-border/60 transition hover:border-emerald-500/30">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-emerald-500/10 shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</p>
                  <a href="mailto:gbadamosiboluwatife2002@gmail.com" className="text-sm font-medium text-primary hover:text-foreground transition-colors break-words">
                    boluscript.dev@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-card/60 rounded-xl p-5 sm:p-6 border border-border/60 transition hover:border-emerald-500/30">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-emerald-500/10 shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone</p>
                  <a href="tel:+2349017354580" className="text-sm font-medium text-primary hover:text-foreground transition-colors">
                    +234 901 735 4580
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-card/60 rounded-xl p-5 sm:p-6 border border-border/60 transition hover:border-emerald-500/30">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-emerald-500/10 shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-sm font-semibold text-foreground mb-4">Connect with Me</p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/gbadamosi-boluwatife-8263a0241/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-card border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:-translate-y-0.5">
                  <Linkedin size={20} />
                </a>
                <a href="https://wa.me/2349017354580" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-card border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:-translate-y-0.5">
                  <FaWhatsapp size={20} />
                </a>
                <a href="https://www.instagram.com/bolu_gbadamosi" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-card border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:-translate-y-0.5">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — CONTACT FORM */}
          <div className="bg-card rounded-xl p-6 sm:p-8 border border-border/60 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">Send a Message</h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1.5">Name</label>
                <input type="text" id="name" required name="name" placeholder="Your name..." className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary outline-hidden transition text-sm" value={formData.name} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1.5">Email</label>
                <input type="email" id="email" required name="email" placeholder="your@email.com" className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary outline-hidden transition text-sm" value={formData.email} onChange={handleChange} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1.5">Message</label>
                <textarea id="message" required name="message" rows={4} placeholder="Tell me about your project..." className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary outline-hidden resize-none transition text-sm" value={formData.message} onChange={handleChange} />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button type="submit" className={cn(
                "w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 inline-flex items-center justify-center gap-2",
                "bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-700 text-white",
                "shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]",
                "hover:-translate-y-0.5 active:translate-y-0",
              )}>
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
