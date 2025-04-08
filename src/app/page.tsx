// FULL REACT CODE — VIETNAM TRIP PLANNER WEBSITE
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Image from "next/image";

const UNSPLASH_ACCESS_KEY = "aE5hnRj-T7SWYKtHNM5XK_C5HamJriYrTVVELtSvMMY  ";

const sections = [
  "Itinerary",
  "Accommodations",
  "Transport",
  "Activities",
  "Food & Drinks",
  "Nightlife & Shopping",
  "Budget",
];

const itinerary = [
  {
    title: "Day 1: Arrival in Ho Chi Minh City",
    mapLink: "https://goo.gl/maps/ZNh6rDnp8YkpmqQf9",
    sections: [
      {
        time: "Morning",
        content:
          "Arrive from Mumbai to HCMC. Transfer to hotel in District 1. Freshen up and rest briefly.",
      },
      {
        time: "Afternoon",
        content:
          "Visit Ben Thanh Market, Notre-Dame Cathedral, Central Post Office, and Reunification Palace.",
      },
      {
        time: "Evening",
        content:
          "Enjoy rooftop bars like Air 360, a Saigon River dinner cruise, or party on Bui Vien Walking Street.",
      },
      {
        time: "Night",
        content:
          "7-Eleven or Circle K stop for snacks. Stay in hostel or budget hotel in District 1.",
      },
    ],
    food: [
      "Pho Chay (vegetarian pho)",
      "Banh Mi Chay",
      "Hum Vegetarian",
      "Tandoor Indian Restaurant",
    ],
    recommendations: [
      "Use Grab for transport",
      "Always carry small cash",
      "District 1 is best for nightlife and street food",
    ],
    images: [
      "https://source.unsplash.com/800x400/?hochiminh,city",
      "https://source.unsplash.com/800x400/?saigon,night",
      "https://source.unsplash.com/800x400/?vietnam,market",
    ],
  },
  {
    title: "Day 2: Cu Chi Tunnels & Saigon Sights",
    mapLink: "https://goo.gl/maps/HEvUzX9JMG8WrJjG6",
    sections: [
      {
        time: "Morning",
        content: "Cu Chi Tunnels tour, exploring underground war tunnels.",
      },
      {
        time: "Afternoon",
        content:
          "Visit War Remnants Museum, Reunification Palace, and Chinatown’s Thien Hau Pagoda.",
      },
      {
        time: "Evening",
        content: "Chill at rooftop bar or Acoustic Bar for live music.",
      },
      {
        time: "Night",
        content: "Bui Vien for street eats, beer, and party vibes.",
      },
    ],
    food: [
      "Pho Le (veg option)",
      "Banh Xeo 46A (crispy pancakes)",
      "Ngoc Tho Vegetarian",
    ],
    recommendations: [
      "Book Cu Chi tour online a day prior",
      "Carry flashlight if claustrophobic",
      "Look for vegetarian stalls marked 'Chay'",
    ],
    images: [
      "https://source.unsplash.com/800x400/?vietnam,tunnel",
      "https://source.unsplash.com/800x400/?saigon,museum",
      "https://source.unsplash.com/800x400/?vietnam,coffee",
    ],
  },
  {
    title: "Day 3: Fly to Da Nang & Hoi An",
    mapLink: "https://goo.gl/maps/rZgE8KLPUU1fKzzp9",
    sections: [
      {
        time: "Morning",
        content:
          "Fly to Da Nang and visit Marble Mountains on the way to Hoi An.",
      },
      {
        time: "Afternoon",
        content:
          "Check into hotel, rent a bicycle and explore Hoi An Old Town.",
      },
      {
        time: "Evening",
        content: "Boat ride on Thu Bon River, lantern floating experience.",
      },
      {
        time: "Night",
        content:
          "Explore Hoi An Night Market, grab coconut pancake or fried banana.",
      },
    ],
    food: [
      "Minh Hien Vegetarian",
      "White Rose Restaurant",
      "Banh Mi Phuong (veg available)",
      "Hoi An Central Market stalls",
    ],
    recommendations: [
      "Tailor shops close early, visit by 5 PM",
      "Bikes are best to explore the Old Town",
      "Ask for no fish sauce if veg",
    ],
    images: [
      "https://source.unsplash.com/800x400/?hoian,lantern",
      "https://source.unsplash.com/800x400/?vietnam,river",
      "https://source.unsplash.com/800x400/?hoian,market",
    ],
  },
  {
    title: "Day 4: Basket Boat Ride & An Bang Beach",
    mapLink: "https://goo.gl/maps/zxv9E4LVDxA3fr5W7",
    sections: [
      {
        time: "Morning",
        content: "Go for Basket Boat Ride at Cam Thanh Water Coconut Village.",
      },
      {
        time: "Afternoon",
        content: "Relax at An Bang Beach or visit My Son Sanctuary.",
      },
      {
        time: "Evening",
        content: "Return to Da Nang, visit Dragon Bridge (weekend fire show).",
      },
      {
        time: "Night",
        content: "Stroll Han River Night Market. Optional train to Hanoi.",
      },
    ],
    food: [
      "Cay Me Restaurant (veg options)",
      "Karma Waters Vegan",
      "Beachside cafes with tofu stir fry",
    ],
    recommendations: [
      "Wear flip-flops for the beach",
      "Carry swimwear and towel",
      "Dragon Bridge fire show is at 9 PM on weekends",
    ],
    images: [
      "https://source.unsplash.com/800x400/?basket,boat",
      "https://source.unsplash.com/800x400/?vietnam,beach",
      "https://source.unsplash.com/800x400/?dragon,bridge",
    ],
  },
  {
    title: "Day 5: Hanoi Cultural Tour",
    mapLink: "https://goo.gl/maps/y7a3KNtVzfqSx6Gp7",
    sections: [
      {
        time: "Morning",
        content: "Visit Ho Chi Minh Mausoleum and One Pillar Pagoda.",
      },
      {
        time: "Afternoon",
        content: "Explore Temple of Literature and Old Quarter.",
      },
      {
        time: "Evening",
        content:
          "Enjoy egg coffee at Cafe Giang and shopping around Hoan Kiem Lake.",
      },
      {
        time: "Night",
        content: "Party at Ta Hien Beer Street or watch Water Puppet Show.",
      },
    ],
    food: ["Uu Dam Chay (vegan)", "Nang Tam Restaurant", "Banh Cuon Ba Hanh"],
    recommendations: [
      "Visit mausoleum before 11 AM",
      "Egg coffee is a must-try",
      "Beer Street is lively till midnight",
    ],
    images: [
      "https://source.unsplash.com/800x400/?hanoi,temple",
      "https://source.unsplash.com/800x400/?hanoi,coffee",
      "https://source.unsplash.com/800x400/?hanoi,night",
    ],
  },
  {
    title: "Day 6: Ha Long Bay Cruise",
    mapLink: "https://goo.gl/maps/VcvhsQvdJ2T7DjTD9",
    sections: [
      {
        time: "Morning",
        content: "Depart for Ha Long Bay and board the cruise.",
      },
      {
        time: "Afternoon",
        content: "Kayaking, swimming, and visiting Surprise Cave.",
      },
      {
        time: "Evening",
        content: "Sunset on deck, cooking class or sunset party on cruise.",
      },
      { time: "Night", content: "Dinner onboard and optional squid fishing." },
    ],
    food: [
      "Onboard cruise meals (vegetarian options pre-booked)",
      "Fresh tropical fruits",
      "Vietnamese spring rolls",
    ],
    recommendations: [
      "Pack swimwear and sunscreen",
      "Bring motion sickness tablets",
      "WiFi may be limited",
    ],
    images: [
      "https://source.unsplash.com/800x400/?halongbay,cruise",
      "https://source.unsplash.com/800x400/?vietnam,kayaking",
      "https://source.unsplash.com/800x400/?vietnam,cave",
    ],
  },
  {
    title: "Day 7: Return to Hanoi & Shopping",
    mapLink: "https://goo.gl/maps/NjZbfmKjD7MgMymu7",
    sections: [
      {
        time: "Morning",
        content: "Tai Chi session, brunch on cruise, disembark by 11 AM.",
      },
      { time: "Afternoon", content: "Return to Hanoi by shuttle (~3 hours)." },
      {
        time: "Evening",
        content:
          "Dong Xuan Market, last-minute shopping, explore Hanoi Weekend Market.",
      },
      {
        time: "Night",
        content:
          "Farewell dinner, drinks at rooftop bar, grab souvenirs from Circle K.",
      },
    ],
    food: [
      "New Day Restaurant",
      "Bun Chay stall (vegetarian) near Ta Hien",
      "Polite & Co Cocktail Bar",
    ],
    recommendations: [
      "Use time wisely post-cruise",
      "Bargain at markets",
      "Grab gifts like coffee, tea, magnets",
    ],
    images: [
      "https://source.unsplash.com/800x400/?hanoi,market",
      "https://source.unsplash.com/800x400/?hanoi,shopping",
      "https://source.unsplash.com/800x400/?vietnam,street",
    ],
  },
  {
    title: "Day 8: Departure",
    mapLink: "https://goo.gl/maps/9fBtwDp82ZnSR3NZ9",
    sections: [
      {
        time: "Morning",
        content: "Early walk around Hoan Kiem Lake, final coffee or pho.",
      },
      {
        time: "Afternoon",
        content: "Transfer to Noi Bai Airport, board flight back to Mumbai.",
      },
      {
        time: "Evening",
        content: "Arrive in Mumbai with unforgettable memories!",
      },
    ],
    food: [
      "Circle K or VinMart snacks",
      "Last bowl of Pho Chay or Banh Mi from local café",
    ],
    recommendations: [
      "Reach airport 3 hours early",
      "Ensure souvenirs and liquids are packed for flight",
    ],
    images: [
      "https://source.unsplash.com/800x400/?hoankiem,lake",
      "https://source.unsplash.com/800x400/?vietnam,airport",
      "https://source.unsplash.com/800x400/?travel,goodbye",
    ],
  },
];
const data = {
  Accommodations: [
    {
      city: "Saigon (HCMC)",
      options: [
        "Hostel: Vietnam Hostel (Hideout Saigon) – social vibe in backpacker area",
        "Budget Hotel: Avanti Hotel near Ben Thanh Market (3★ comfort, great location)"
      ]
    },
    {
      city: "Hoi An",
      options: [
        "Homestay: Flame Flowers Homestay – cozy, local hosts",
        "Hostel: Sunflower Hostel – known for backpackers (has pool)",
        "Budget Hotel: Hoi An Phoenix or Laluna Hoi An (near old town, good rates)"
      ]
    },
    {
      city: "Hanoi",
      options: [
        "Hostel: Vietnam Backpacker Hostel Downtown – bar and events",
        "Budget Hotel: Hanoi Golden Charm or La Storia Ruby – Old Quarter, < ₹3000/night"
      ]
    },
    {
      city: "Halong Bay",
      options: [
        "Overnight Cruise: Apricot Premium Cruise or Phoenix Cruise (veg-friendly, mid-range)"
      ]
    }
  ],
  Transport: [
    "International Flights: Round-trip from Mumbai to HCMC, return from Hanoi. Cost: ₹30,000–₹40,000.",
    "Domestic Flights: HCMC → Da Nang, Da Nang → Hanoi. ₹4,000–₹6,000 each.",
    "Trains: Optional sleeper train Da Nang → Hanoi. ~15h, ₹4,000.",
    "Bus/Transfers: Cu Chi tour, Hanoi–Halong shuttle, taxis, Grab. Budget ₹1,500 for local transit."
  ],
  Activities: [
    "Cu Chi Tunnels (Day 2): ~₹1,500",
    "Marble Mountains (Day 3): ~₹150",
    "Basket Boat Ride (Day 4): ~₹800",
    "Dragon Bridge Show (Day 4): Free",
    "Water Puppet Show (Day 5): ~₹300",
    "Street Food Tours: ~₹1,500",
    "Halong Bay Cruise (Day 6–7): ~₹8,000",
    "Tai Chi, Kayaking, Cave Visit: Included in cruise"
  ],
  "Food&Drinks": [
    "Ho Chi Minh: Pho Chay, Banh Mi Chay, Hum Vegetarian, Ngoc Tho",
    "Hoi An: Cao Lau (veg), White Rose dumplings, Minh Hien, Karma Waters",
    "Hanoi: Bun Cha (veg), Banh Cuon, Egg Coffee, Uu Dam Chay",
    "On Cruise: Veg meals available on request"
  ],
  "Nightlife&Shopping": [
    "Saigon: Chill Skybar, Bui Vien Street, Acoustic Bar",
    "Hoi An: Mojito Bar, Tiger Tiger, beach clubs",
    "Hanoi: Ta Hien Beer Street, 1900 Le Theatre, jazz bars, karaoke lounges"
  ],
  Budget: [
    "Flights: ₹35,000",
    "Domestic Travel: ₹15,000",
    "Accommodation: ₹18,000",
    "Activities & Tours: ₹15,000",
    "Food & Drinks: ₹12,000",
    "Misc (Visa, SIM, buffer): ₹5,000",
    "Total: ≈ ₹1,05,000 per person"
  ]
};

export default function VietnamTripWebsite() {
  const [tab, setTab] = useState("Itinerary");
  const [imageMap, setImageMap] = useState<Record<number, string[]>>({});

  useEffect(() => {
    async function fetchImages() {
      const newMap: Record<number, string[]> = {};
      for (let i = 0; i < itinerary.length; i++) {
        try {
          const res = await axios.get(
            "https://api.unsplash.com/search/photos",
            {
              params: {
                query: itinerary[i].title.split(":")[1] || "Vietnam",
                per_page: 3,
              },
              headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
              },
            }
          );
          res.data.results.map((img: { urls: { regular: string } }) => img.urls.regular)
        } catch (err) {
          console.error("Image fetch failed for day", i + 1, err);
        }
      }
      setImageMap(newMap);
    }
    fetchImages();
  }, []);

  const tabMap: Record<string, keyof typeof data> = {
  "Accommodations": "Accommodations",
  "Transport": "Transport",
  "Activities": "Activities",
  "Food & Drinks": "Food&Drinks",
  "Nightlife & Shopping": "Nightlife&Shopping",
  "Budget": "Budget",
};

  
  return (
    <motion.div
      className="p-4 sm:p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Vietnam Trip Planner
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {sections.map((label) => (
          <Button
            key={label}
            variant={tab === label ? "default" : "outline"}
            onClick={() => setTab(label)}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="text-gray-700">
        {tab === "Itinerary" && (
          <div className="flex flex-col gap-6">
            {itinerary.map((day, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{day.title}</h2>
                  <a
                    href={day.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm mb-2 inline-block"
                  >
                    View on Map
                  </a>

                  {day.sections.map((t, i) => (
                    <div key={i} className="mb-2">
                      <span className="font-medium text-gray-800">
                        {t.time}:
                      </span>{" "}
                      {t.content}
                    </div>
                  ))}

                  <h3 className="mt-4 font-semibold">🍴 Food Suggestions</h3>
                  <ul className="list-disc list-inside">
                    {day.food.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="mt-4 font-semibold">📝 Recommendations</h3>
                  <ul className="list-disc list-inside">
                    {day.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>

                  <h3 className="mt-4 font-semibold">📸 Highlights</h3>
                  <Carousel className="w-full max-w-xl mx-auto mt-2">
                    {(imageMap[index]?.length
                      ? imageMap[index]
                      : day.images
                    ).map((src, i) => (
                      <CarouselItem key={i}>
                        <Image
                          src={src}
                          alt={`Day ${index + 1} image ${i + 1}`}
                          width={800}
                          height={400}
                          className="rounded-xl w-full h-64 object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </Carousel>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {tab !== "Itinerary" && (
        <div className="space-y-4">
          {data[tabMap[tab]]?.map((item, idx) =>
            typeof item === "string" ? (
              <Card key={idx}>
                <CardContent className="p-4">{item}</CardContent>
              </Card>
            ) : (
              <Card key={idx}>
                <CardContent className="p-4">
                  <h2 className="font-semibold text-lg mb-2">{item.city}</h2>
                  <ul className="list-disc list-inside">
                    {item.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}

      </div>
    </motion.div>
  );
}
