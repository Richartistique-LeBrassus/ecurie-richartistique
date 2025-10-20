"use client";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { PinterestLogo, TiktokLogo, TwitchLogo } from "phosphor-react";
import { FooterSection } from './ui/FooterSection';
import { EmailSubscribeDisplay } from "./ui/EmailSubscribeDisplay";

const Footer = () => {
  return (
    <footer className="px-auto mx-auto pb-10 px-4 md:px-8 pt-20 w-full 
      bg-neutral-50 border-t rounded-t-3xl border-neutral-300"
    >
        <div className="grid grid-cols-1 lg:grid-cols-4 pb-10 w-full px-auto mx-auto
          items-start"
        >
          <div className="order-1 items-start lg:order-4 mb-3 sm:mb-4 md:mb-5">
            <EmailSubscribeDisplay />
          </div>
        
          <div className="order-2 lg:order-1">
            <FooterSection
            title="Customer Support"
            links={[
              { label: 'Licensing', href: '#' },
              { label: 'Contact Us', href: '#' },
              { label: 'Returns & Repairs', href: '#' },
              { label: 'Delivery Information', href: '#' },
              { label: 'Terms & Conditions', href: '#' },
              { label: 'Privacy Policy', href: '#' },
              { label: 'Cookie Preferences', href: '#' },
            ]}
          /></div>
        
          <div className="order-3 lg:order-2">
            <FooterSection
              title="Richartistique"
              links={[
                { label: 'Monsieur Richards', href: '#' },
                { label: 'Partnership with Porsche & Ferrari', href: '#' },
                { label: 'Our Fabergé Craftsmen', href: '#' },
                { label: 'Investor Relations', href: '#' },
                { label: 'Accessibility Statement', href: '#' },
                { label: 'Careers', href: '#' },
              ]}
            />
          </div>  
        
          <div className="order-4 lg:order-3">
            <FooterSection
              title="Écurie Richartistique"
              links={[
                { label: 'Stockists', href: '#' },
                { label: 'About Richartistique', href: '#' },
                { label: 'Press', href: '#' },
              ]}
            />
          </div>          
        </div>

      <div className="lg:col-span-3 lg:flex-row lg:space-x-6 
        lg:items-center space-y-4 flex flex-col h-full text-stone-950 
        w-full lg:border-t lg:border-stone-700 mt-4"
      >   
        <div className="text-stone-800 uppercase text-xs w-[80vw] 
          flex-wrap inline-flex gap-1 h-fit lg:mt-4"
        >
          <div><p>© Écurie Richartistique 2025 | </p></div> 
          <div><p>Registered Company No. 7529841 | </p></div>
          <div><p>Vat Registered No. FR 345 7892 16 | </p></div>
          <div><p>German WEEE Registration: DE 8753421</p></div>
        </div>

        <div className="flex space-x-6 text-stone-950">
          <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
          <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
          <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
          <a href="#" aria-label="Pinterest"><PinterestLogo size={20} /></a>
          <a href="#" aria-label="Twitch"><TwitchLogo size={20} /></a>
          <a href="#" aria-label="Tiktok"><TiktokLogo size={20} /></a>
        </div>
      </div>        

      <p className="text-neutral-400 text-xs mt-10 uppercase">
        Design and code © Richartistique Le Brassus. External media remain property of their respective creators.
      </p>
    </footer>    
  );
};

export default Footer;