import Storefront from '../assets/storefront.png'
import Browse from '../assets/browse.png'
import Profile from '../assets/user-profile.png'
import { fetchUserAttributes } from 'aws-amplify/auth';
import React, { useState, useEffect } from "react";

// function LoginOptions() {
//   const [hasBusiness, setHasBusiness] = useState(false)
//   useEffect(() => { 
//     const checkExistingBusiness= async () => {
//         const user_details = await fetchUserAttributes();
//         if (user_details['custom:hasBusiness']){
//           setHasBusiness(true)
//         }
//     }
//     checkExistingBusiness();
// }, []);
//   return hasBusiness ? "/BusinessForm": "/BusinessForm"
// }

export const MenuList = [
    {
      name: "Open Storefront",
      description:
        "Set up a business profile and start promoting your products to a wider audience. Showcase your offerings and attract new potential customers ",
      image: Storefront,
      route: "/BusinessForm"
      
    },
    {
      name: "Browse Products",
      description:
        "Explore a diverse range of products from minority-owned businesses. Browse through curated collections, discover new arrivals, and support entrepreneurs",
      image: Browse,
      route: "/browsing"
      
    },
    {
      name: "Manage Profile",
      description:
        "Customize your profile to reflect your preferences and interests. Update your personal information, manage your saved items, and tailor your experience on our platform",
      image: Profile,
      route: "/ProfilePage"
      
    },
   
  ];