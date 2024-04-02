import Storefront from '../assets/storefront.png'
import Browse from '../assets/browse.png'
import Profile from '../assets/user-profile.png'



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