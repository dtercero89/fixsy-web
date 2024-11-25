'use client'
import Image from "next/image"
import { Button } from "@/ui/controls/button"
import { motion } from "framer-motion"
import { ArrowRight, PenToolIcon as Tool, ClipboardList, UserCheck, Bell } from 'lucide-react'
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LandingPage() {

  const router = useRouter();

  return (
    <div className="h-[100vh] bg-white overflow-auto">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Image
            src="/images/fixsy.png"
            alt="Fixsy Logo"
            width={100}
            height={100}
          />
          <nav className="hidden md:flex space-x-6">
            <Link href="#home" className="text-black hover:text-[#017269] transition-colors">Home</Link>
            <Link href="#services" className="text-black hover:text-[#017269] transition-colors">Services</Link>
            <Link href="#how-it-works" className="text-black hover:text-[#017269] transition-colors">How It Works</Link>
            <Link href="/auth/register" className="text-black hover:text-[#017269] transition-colors">Sign Up</Link>
          </nav>
          <Button onClick={()=> router.push('/auth/login') } className="bg-[#017269] text-white hover:bg-[#015a53]">
            Log In
          </Button>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 bg-gradient-to-b from-white to-gray-100">
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-[#017269] mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Connecting Your Needs with the Best Professionals
            </motion.h1>
            <motion.p 
              className="text-black text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              From maintenance to cleaning, find the service you need in one place.
            </motion.p>
            <Button className="bg-[#017269] text-white text-lg px-8 py-4 rounded-full hover:bg-[#015a53] transition-colors">
              Request a Service
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>

        <section id="services" className="py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-[#017269] text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Tool, title: "Maintenance", desc: "Repairs and improvements for your home" },
                { icon: ClipboardList, title: "Cleaning", desc: "Professional cleaning services" },
                { icon: UserCheck, title: "Specialists", desc: "Plumbing, electrical work, and more" }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <service.icon className="w-16 h-16 text-[#017269] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#017269] mb-2">{service.title}</h3>
                  <p className="text-black">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-[#017269] text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Request a Service", desc: "Describe your need and choose a date" },
                { step: "2", title: "We Assign a Professional", desc: "Our system finds the best specialist" },
                { step: "3", title: "Service Completed", desc: "The work is done to your satisfaction" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-[#017269] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-[#017269] mb-2">{item.title}</h3>
                  <p className="text-black">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="sign-up" className="py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#017269] mb-6">Ready to Get Started?</h2>
            <p className="text-black text-xl mb-8">Join Fixsy and find the best professionals for your needs.</p>
            <Button onClick={()=> router.push('/auth/register')} 
                className="bg-[#017269] text-white text-lg px-8 py-4 rounded-full hover:bg-[#015a53] transition-colors">
              Sign Up Now
              <Bell className="ml-2" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-[#017269] text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Fixsy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

