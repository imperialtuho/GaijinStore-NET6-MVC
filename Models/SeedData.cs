using Microsoft.EntityFrameworkCore;

namespace GaijinStore.Models
{
    public static class SeedData
    {
        public static void EnsurePopulated(IApplicationBuilder app)
        {
            StoreDbContext context = app.ApplicationServices
            .CreateScope().ServiceProvider.GetRequiredService<StoreDbContext>();
            if (context.Database.GetPendingMigrations().Any())
            {
                context.Database.Migrate();
            }
            if (!context.Products.Any())
            {
                context.Products.AddRange(
                new Product
                {
                    Name = "MiG-21 SPS-K",
                    Description = "The MiG-21 SPS-K - is an export version of the MiG-21PFM fighter, which was supplied to the GDR’s Air Force and other countries in the Warsaw Pact. The maximum speed of this fighter is over 2200 km/h. As a standard armament, a suspended container GP-9 with a 23 mm GSh-23L gun or a SPS-141 countermeasures container is installed. Additionally, the plane can be equipped with four “air-to-air” missiles R-3S or R-3R, or two R-13M or R-60, two S-24 unguided rockets, sixty-four S-5K unguided rockets or can carry two 250 kg or two 500 kg bombs. This model of the fighter carries a demonstration paint \"White Shark\" on the occasion of the reunification of the two Germanies, applied before its last flight.",
                    Category = "Jet Fighter",
                    Price = 59.99m,
                    ProductImageLink = "https://static-store.gaijin.net/img/screenshots/65476CD3-3C2D-40E7-8422-D552B5405E1B/big/5.jpg"
                },
                new Product
                {
                    Name = "Ka-50",
                    Description = "The legendary Ka-50 “Black Shark” was one of the most powerful helicopters created in the USSR. It was developed in the early 80s and adopted for service in 1995. In addition to significant combat capabilities, this machine sports a unique coaxial rotor system, which allows it to be highly maneuverable and capable of performing aerial acrobatics. The helicopter is armed with a 30 mm 2A42 automatic cannon on a semi-rigid mount. The anti-tank guided armament comprises of Vikhr ATGMs accompanied by laser guidance, with a maximum range of 10 km and capable of 800 mm of armour penetration. Additionally, the helicopter can be equipped with 9M39 “Igla” infrared homing air-to-air missiles, and there is also the possibility of installing 80 mm unguided rocket pods, bombs, or eight 23 mm gun pods on the helicopter’s wing pylons.",
                    Category = "Attack Helicopter",
                    Price = 49.99m,
                    ProductImageLink = "https://static-store.gaijin.net/img/screenshots/B9E88B57-8BFC-4FB3-9EA9-9ED00DA44847/big/5.jpg"
                },
                new Product
                {
                    Name = "Su-25K",
                    Description = "The Su-25K is an export version of the soviet strike aircraft, developed in the mid 1980s. It participated in many conflicts, including the Iran-Iraq War in mid 1980s and also the Persian Gulf War in early 1990s. The aircraft proved to be higly effective and is still in the service in the air forces of Bulgaria, Iran and Iraq. The Su-25K is armed with a VPU-17A gun mount with a 30mm dual-barrel cannon GSh-30-2. In terms of suspended weaponry, the various options can be used, including: two \"air-to-air\" guided missiles R-60MK, up to four \"air-to-surface\" guided missiles S-25L, Kh-25, Kh-25ML or two Kh-29L, up to eight 500, 250 or up to thirty two 100 kg bombs, unguided rockets S-5, S-8, S24, S-13, S-25 in various modifications and also four external gun pods SPPU-22-01 with 23 mm GSh-23L cannons. The premium Su-25K version carries a Czechoslovak Air Force livery. In addition, the aircraft is equipped with decoys and chaffs as terms of countermeasure against radar guidance systems.\r\n\r\n",
                    Category = "Strike Aircraft",
                    Price = 59.59m,
                    ProductImageLink = "https://static-store.gaijin.net/img/screenshots/C7E99B2A-C906-41F4-9F4F-35CD02AACF1A/big/3.jpg"
                },
                new Product
                {
                    Name = "Z-19E",
                    Description = "Harbin Z-19E is an export modification of the Chinese Z-19 project. It differs from the original model by a wider use of the composite materials that makes it possible to reduce the maximum take-off weight of the vehicle, and also some improvements aimed at increasing piloting safety. The following options can be used in suspended weaponry: up to eight TY-90 guided air-to-air missiles, up to eight BA-9 guided air-to-surface missiles, up to seventy two Type 90-1 HEAT unguided rockets and also up to two 12.7 mm gun containers.",
                    Category = "Attack Helicopter",
                    Price = 49.99m,
                    ProductImageLink = "https://static-store.gaijin.net/img/screenshots/FCDC545C-BB38-4213-A718-6ADA293B2DDB/big/2.jpg"
                },
                new Product
                {
                    Name = "Su-7BMK",
                    Description = "The Su-7BMK jet fighter-bomber is an export modification based on the Su-7BM developed in the mid-1960’s. Since the Su-7BKL was already in production by this time, the export aircraft was created on the basis of the fuselage and systems in this modification with landing gear and wings from the Su-7BM. This export modification became the most massive amongst all of the Su-7 family of vehicles produced and was in the service of many nations, including the DPRK, India and Egypt and also some of the aircraft remained in the Soviet Air Forces, where they were used for foreign cadet training. The maximum speed of this fighter is 2100 km/h. The premium Su-7BMK is armed with two 30mm NR-30 cannons. The following options can be used as suspended weaponry: up to 160 S-5K unguided rockets, up to 42 S-3K unguided rockets, six S-24 unguided rockets, up to six 250kg high-explosive bombs or four 500kg high-explosive bombs.\r\n",
                    Category = "Strike Aircraft",
                    Price = 59.99m,
                    ProductImageLink = "https://static-store.gaijin.net/img/screenshots/841CF403-64FE-4FBC-95B4-FC668A9263F5/big/2.jpg"
                },
                new Product
                {
                    Name = "Leopard 2 (PzBtl 123)",
                    Description = "The Leopard 2A4 is a modification of Leopard 2 that entered service with Germany in mid 1980 and is still in the service in many European countries. Unlike its predecessors, the Leopard 2A4 has a more protected hull and turret due to installed multilayer combined armor. It is able to reach a maximum speed of up to 68 km/h. The Leopard 2A4 is armed with a 120mm Rh120 L/44 gun and also equipped with two 7.62 mm machine guns. The ammunition includes HEATFS and APFSDS shells. Additionally, the tank is equipped with smoke grenade launchers and thermal vision for a gunner.",
                    Category = "Medium Tank",
                    Price = 59.99m,
                    ProductImageLink = "https://store.gaijin.net/img/screenshots/4CA5150B-A593-4385-AA8F-239709D357C9/big/1.jpg"
                },
                new Product
                {
                    Name = "A-10A Thunderbolt (Early)",
                    Description = "The A-10A Thunderbolt II attack aircraft was developed in the early 70's. The premium A-10A - is an early modification that differs from the one in the US research tree with the set of suspended weaponry. The A-10A is armed with a seven-barrel 30mm GAU-8/A rotary cannon. The following options can be used in suspended weaponry: two AIM-9L Sidewinder guided air-to-air missiles, Hydra-70 unguided rockets, six AGM-65B guided air-to-surface missiles, four GBU-8 guided bombs, two containers with 20 mm M61 guns and also 500 and 2000lb bombs. In addition, the pilot is equipped with a helmet-mounted night vision system.\r\ne",
                    Category = "Strike Aircraft",
                    Price = 59.99m,
                    ProductImageLink = "https://static-store.gaijin.net/img/screenshots/899EBF8F-1A2B-4173-890B-0DB64D4AC9FC/big/1.jpg"
                },
                new Product
                {
                    Name = "ZTZ96A Prototype",
                    Description = "The ZTZ96A tank was developed in the mid 2000s and in 2009, had already participated in the 60th Anniversary Military Parade of the People’s Republic of China. Unlike the ZTZ96A in the Chinese research tree, the premium version has the electro-optical active protection system installed. The maximum speed of the tank is up to 59 km/h. The ammunition includes APFSDS with an armor penetration of over 400mm, HEATFS and HE shells. The premium ZTZ96A is armed with a 125mm Type 88C gun, 12.7 mm machine gun and also equipped with a 7.62mm machine gun and a 81mm caliber smoke grenade launcher while also having thermal vision for the gunner.",
                    Category = "Medium Tank",
                    Price = 59.99m,
                    ProductImageLink = "https://static-store.gaijin.net/img/screenshots/CA947087-DA68-4A07-A969-A58F74F5C09F/big/1.jpg"
                },
                new Product
                {
                    Name = "AH-64A Apache",
                    Description = "The AH-64 \"Apache\", developed in the mid-1970s, is one of the most common and recognizable attack helicopters in the world. The premium AH-64A is armed with a powerful 30mm M230E-1 automatic cannon in a ventral turret. The helicopter carries four AIM-92 Stinger or two AIM-9L Sidewinder air-to-air missiles to battle flying targets, as for engaging with ground targets, the AH-64A can be equipped with up to sixteen AGM-114 Hellfire ATGMs with a semi-active laser guidance system or up to twenty-eight APKWS II guided missiles with multiple warheads to choose from, as well as up to seventy-six Hydra-70 unguided rockets. Additionally, the helicopter is equipped with a thermal night vision device, and a decoy flares. The premium version bears the livery of the 1st Helicopter Battalion of the Hellenic Army Aviation, a participant in the Athens Flying Week 2013 airshow.",
                    Category = "Attack Helicopter",
                    Price = 49.99m,
                    ProductImageLink = "https://static-store.gaijin.net/img/screenshots/5258CDF1-CA78-4230-90BD-85ABEF0EA137/big/4.jpg"
                }
                );
                context.SaveChanges();
            }
        }
    }
}
