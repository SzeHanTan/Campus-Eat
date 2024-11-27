import basket_icon from './basket_icon.png'
import logo from './logo.jpg'
import header_img from './header_img.jpg'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'

import food_1 from './nasi_lemak.jpeg'
import food_2 from './nasi_kerabu.jpg'
import food_3 from './nasi_ayam_kunyit.jpg'
import food_4 from './nasi_kukus.jpg'
import food_5 from './nasi_goreng_tomyam.jpg'
import food_6 from './nasi_goreng_biasa.jpg'
import food_7 from './nasi_goreng_ayam.jpg'
import food_8 from './nasi_goreng_pattaya.jpg'
import food_9 from './mee_rojak.jpg'
import food_10 from './laksa.jpg'
import food_11 from './mee_goreng_mamak.jpg'
import food_12 from './char_kuey_teow.jpg'
import food_13 from './burger_original.jpg'
import food_14 from './burger_special.jpg'
import food_15 from './burger_cheese.jpg'
import food_16 from './burger_oblong.jpg'
import food_17 from './goreng_pisang.jpg'
import food_18 from './keropok_lekor.jpg'
import food_19 from './popia_sira.jpeg'
import food_20 from './karipap.jpg'
import food_21 from './teh_tarik.jpg'
import food_22 from './milo.jpeg'
import food_23 from './sirap_bandung.jpg'
import food_24 from './teh_o_limau_ais.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Rice Dishes",
        menu_image: menu_1
    },
    {
        menu_name: "Fried Rice",
        menu_image: menu_2
    },
    {
        menu_name: "Noodle",
        menu_image: menu_3
    },
    {
        menu_name: "Burger",
        menu_image: menu_4
    },
    {
        menu_name: "Kudapan",
        menu_image: menu_5
    },
    {
        menu_name: "Drinks",
        menu_image: menu_6
    }
]

export const food_list = [
    {
        _id: "1",
        name: "Nasi Lemak",
        image: food_1,
        price: 6.50,
        description: "A fragrant rice dish cooked in coconut milk, served with sambal, fried anchovies, fried chicken, peanuts, and boiled egg.",
        category: "Rice Dishes"
    },
    {
        _id: "2",
        name: "Nasi Kerabu",
        image: food_2,
        price: 7.50,
        description: "A vibrant blue-colored rice dish served with herbs, fried fish, crackers, and a tangy sauce.",
        category: "Rice Dishes"
    }, {
        _id: "3",
        name: "Nasi Ayam Kunyit",
        image: food_3,
        price: 6.00,
        description: "Stir-fried turmeric chicken served with rice, fresh cucumbers, and sambal.",
        category: "Rice Dishes"
    }, {
        _id: "4",
        name: "Nasi Kukus",
        image: food_4,
        price: 6.00,
        description: "Steamed rice paired with spiced fried chicken and a rich curry gravy.",
        category: "Rice Dishes"
    }, {
        _id: "5",
        name: "Nasi Goreng Tomyam",
        image: food_5,
        price: 5.00,
        description: "Fried rice flavored with spicy and tangy tom yum seasoning.",
        category: "Fried Rice"
    }, {
        _id: "6",
        name: "Nasi Goreng Biasa",
        image: food_6,
        price: 4.00,
        description: "Simple fried rice cooked with soy sauce, eggs, and vegetables.",
        category: "Fried Rice"
    }, {
        _id: "7",
        name: "Nasi Goreng Ayam",
        image: food_7,
        price: 6.00,
        description: "Fried rice topped with marinated fried chicken pieces.",
        category: "Fried Rice"
    }, {
        _id: "8",
        name: "Nasi Goreng Pattaya",
        image: food_8,
        price: 5.50,
        description: "Fried rice wrapped in a thin omelet and served with chili sauce.",
        category: "Fried Rice"
    }, {
        _id: "9",
        name: "Mee Rojak",
        image: food_9,
        price: 5.50,
        description: "A flavorful noodle dish in a thick, sweet-spicy peanut sauce.",
        category: "Noodle"
    }, {
        _id: "10",
        name: "Laksa",
        image: food_10,
        price: 6.50,
        description: "A spicy noodle soup with tangy tamarind, coconut milk, and seafood or chicken.",
        category: "Noodle"
    }, {
        _id: "11",
        name: "Mee Goreng Mamak",
        image: food_11,
        price: 4.00,
        description: "Spicy fried noodles with chicken, egg, vegetables, and a savory sauce.",
        category: "Noodle"
    }, {
        _id: "12",
        name: "Char Kuey Teow",
        image: food_12,
        price: 6.00,
        description: "Stir-fried flat rice noodles with prawns, eggs, and bean sprouts in soy sauce.",
        category: "Noodle"
    },
    {
        _id: "13",
        name: "Burger Original",
        image: food_13,
        price: 4.00,
        description: "A classic beef or chicken patty served with lettuce, tomato, and sauce.",
        category: "Burger"
    },
    {
        _id: "14",
        name: "Burger Special",
        image: food_14,
        price: 4.50,
        description: "A loaded burger with extra layers of patty or egg.",
        category: "Burger"
    }, {
        _id: "15",
        name: "Burger Cheese",
        image: food_15,
        price: 5.50,
        description: "A juicy burger with melted cheese layered on top of the patty.",
        category: "Burger"
    }, {
        _id: "16",
        name: "Burger Oblong",
        image: food_16,
        price: 6.00,
        description: "An elongated burger served with a rectangular patty and sauces.",
        category: "Burger"
    }, {
        _id: "17",
        name: "Goreng Pisang",
        image: food_17,
        price: 2.00,
        description: "Deep-fried banana fritters, crispy on the outside and soft inside.",
        category: "Kudapan"
    }, {
        _id: "18",
        name: "Keropok Lekor",
        image: food_18,
        price: 2.00,
        description: "Traditional fish crackers that are chewy, fried, or steamed.",
        category: "Kudapan"
    }, {
        _id: "19",
        name: "Popia Sira",
        image: food_19,
        price: 0.50,
        description: "Crispy spring rolls coated with a sweet and spicy chili glaze.",
        category: "Kudapan"
    }, {
        _id: "20",
        name: "Karipap",
        image: food_20,
        price: 0.50,
        description: "Deep-fried pastries filled with spiced potato or chicken curry.",
        category: "Kudapan"
    }, {
        _id: "21",
        name: "Teh Tarik",
        image: food_21,
        price: 2.00,
        description: "A frothy pulled milk tea with a perfect balance of sweetness.",
        category: "Drinks"
    }, {
        _id: "22",
        name: "Milo",
        image: food_22,
        price: 3.50,
        description: "A popular chocolate malt drink, served hot or iced.",
        category: "Drinks"
    }, {
        _id: "23",
        name: "Sirap Bandung",
        image: food_23,
        price: 2.00,
        description: "A rose syrup drink mixed with milk, served chilled.",
        category: "Drinks"
    }, {
        _id: "24",
        name: "Teh O Limau Ais",
        image: food_24,
        price: 2.50,
        description: "Iced lime tea, refreshing with a hint of citrus.",
        category: "Drinks"
    }
]
