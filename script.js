const calendarGrid = document.getElementById('calendar-grid');
const fishCard = document.getElementById('fish-card');
const monthYearLabel = document.getElementById('current-month-year');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');
const toggleSoundBtn = document.getElementById('toggle-sound');
const waveSound = document.getElementById('wave-sound');

let navDate = new Date();
let soundEnabled = false;

// Extended fish data with 90 new species (150 total)
const fishData = [
    { name: "Blue Tang", scientific: "Paracanthurus hepatus", fact: "They use sharp 'scalpels' near their tail for defense.", image: "images/blue-tang.JPG", habitat: "Coral Reefs" },
    { name: "Clownfish", scientific: "Amphiprioninae", fact: "They are all born male and can change their sex to become dominant females.", image: "images/clownfish.jpg", habitat: "Anemones" },
    { name: "Great White Shark", scientific: "Carcharodon carcharias", fact: "They can detect a single drop of blood in 25 gallons of water.", image: "https://upload.wikimedia.org/wikipedia/commons/5/56/White_shark.jpg", habitat: "Open Ocean" },
    { name: "Moorish Idol", scientific: "Zanclus cornutus", fact: "They are notoriously difficult to keep in aquariums due to their diet.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Moorish_Idol_Fish_in_Kona.jpg", habitat: "Subtropical Reefs" },
    { name: "Lionfish", scientific: "Pterois", fact: "Though beautiful, they are a highly invasive species in the Atlantic.", image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Pterois_volitans_Manado_clean.jpg", habitat: "Indo-Pacific" },
    { name: "Whale Shark", scientific: "Rhincodon typus", fact: "The world's largest fish, their spots are as unique as human fingerprints.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Whale_shark_Georgia_aquarium.jpg", habitat: "Tropical Seas" },
    { name: "Mandarin Dragonet", scientific: "Synchiropus splendidus", fact: "One of the few fish species that does not have scales.", image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Synchiropus_splendidus_2.jpg", habitat: "Pacific Reefs" },
    { name: "Hammerhead Shark", scientific: "Sphyrnidae", fact: "Their wide head gives them 360-degree vertical vision.", image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Scalloped_hammerhead_shark_cocos.jpg", habitat: "Coastal Waters" },
    { name: "Leafy Seadragon", scientific: "Phycodurus eques", fact: "They look like floating seaweed to hide from predators.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Leafy_Seadragon_at_the_Birch_Aquarium.jpg", habitat: "Australian Waters" },
    { name: "Queen Angelfish", scientific: "Holacanthus ciliaris", fact: "Known for the blue 'crown' on their forehead.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Queen_Angelfish.jpg", habitat: "Atlantic Reefs" },
    { name: "Yellow Tang", scientific: "Zebrasoma flavescens", fact: "They are a popular aquarium fish and help keep reefs clean of algae.", image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Yellow_Tang_Zebrasoma_flavescens.jpg", habitat: "Hawaii/Pacific" },
    { name: "Emperor Angelfish", scientific: "Pomacanthus imperator", fact: "Juveniles have a completely different color pattern than adults.", image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Emperor_Angelfish_Pomacanthus_imperator.jpg", habitat: "Indo-Pacific" },
    { name: "Green Sea Turtle", scientific: "Chelonia mydas", fact: "While not a fish, they are iconic saltwater residents that migrate thousands of miles.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Green_sea_turtle_2.jpg", habitat: "Tropical Oceans" },
    { name: "Blacktip Reef Shark", scientific: "Carcharhinus melanopterus", fact: "They are very timid and easily frightened by swimmers.", image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Blacktip_reef_shark_at_the_Steinhart_Aquarium.jpg", habitat: "Shallow Reefs" },
    { name: "Giant Manta Ray", scientific: "Mobula birostris", fact: "They have the largest brain of any fish species.", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Giant_Manta_Ray_Maldives.jpg", habitat: "Pelagic Zones" },
    { name: "Parrotfish", scientific: "Scaridae", fact: "They eat coral and poop out fine white sand.", image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Parrotfish_in_the_Caribbean.jpg", habitat: "Coral Reefs" },
    { name: "Blue Marlin", scientific: "Makaira nigricans", fact: "They can swim at speeds of up to 60 miles per hour.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Blue_marlin.jpg", habitat: "Atlantic Ocean" },
    { name: "Spotted Eagle Ray", scientific: "Aetobatus narinari", fact: "They are known for their ability to leap completely out of the water.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Spotted_eagle_ray_at_the_Georgia_Aquarium.jpg", habitat: "Bays and Reefs" },
    { name: "Bumphead Parrotfish", scientific: "Bolbometopon muricatum", fact: "They use their massive heads to ram coral into bite-sized pieces.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Green_humphead_parrotfish.jpg", habitat: "Indo-Pacific" },
    { name: "Red Lionfish", scientific: "Pterois volitans", fact: "Their stomach can expand up to 30 times its normal size after a meal.", image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Lionfish_near_Fiji.jpg", habitat: "Warm Reefs" },
    { name: "Napoleon Wrasse", scientific: "Cheilinus undulatus", fact: "They are one of the few predators of toxic sea animals like Boxfish.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Napoleon_Wrasse_in_Egypt.jpg", habitat: "Steep Reef Slopes" },
    { name: "Harlequin Ghost Pipefish", scientific: "Solenostomus paradoxus", fact: "They are masters of disguise, mimicking crinoids or seaweed.", image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Harlequin_Ghost_Pipefish.jpg", habitat: "Tropical Indo-Pacific" },
    { name: "Pacific Sailfish", scientific: "Istiophorus platypterus", fact: "Considered the fastest fish in the ocean.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Sailfish.jpg", habitat: "Deep Blue Waters" },
    { name: "Goliath Grouper", scientific: "Epinephelus itajara", fact: "They can weigh up to 800 pounds and are very curious about divers.", image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Goliath_Grouper_at_the_Florida_Aquarium.jpg", habitat: "Wrecks and Reefs" },
    { name: "Sea Horse", scientific: "Hippocampus", fact: "The males carry the eggs and give birth to the young.", image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Seahorse_in_the_Ocean.jpg", habitat: "Seagrass Beds" },
    { name: "Barracuda", scientific: "Sphyraena", fact: "They are attracted to shiny objects, which they mistake for prey.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Great_Barracuda_in_Grand_Cayman.jpg", habitat: "Tropical Reefs" },
    { name: "Copperband Butterflyfish", scientific: "Chelmon rostratus", fact: "They use their long snouts to pick food out of crevices.", image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Copperband_butterflyfish_Chelmon_rostratus.jpg", habitat: "Rocky Reefs" },
    { name: "Moray Eel", scientific: "Muraenidae", fact: "They have a second set of jaws in their throat called pharyngeal jaws.", image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Giant_moray_eel.jpg", habitat: "Crevices and Caves" },
    { name: "Yellow Boxfish", scientific: "Ostracion cubicus", fact: "When stressed, they release a toxin that can poison the water around them.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Yellow_Boxfish.jpg", habitat: "Coral Reefs" },
    { name: "Stonefish", scientific: "Synanceia", fact: "The most venomous fish in the world, perfectly camouflaged as a rock.", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Stonefish_in_the_Indian_Ocean.jpg", habitat: "Reef Bottoms" },
    { name: "Flying Fish", scientific: "Exocoetidae", fact: "They can glide for over 600 feet to escape predators.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Flying_fish_gliding.jpg", habitat: "Surface Waters" },
    { name: "Ocean Sunfish", scientific: "Mola mola", fact: "The heaviest known bony fish in the world.", image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Mola_mola.jpg", habitat: "Temperate Oceans" },
    { name: "Goblin Shark", scientific: "Mitsukurina owstoni", fact: "Has a distinct, elongated snout and jaws that snap forward.", image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Mitsukurina_owstoni_museum_victoria_-_head_detail.jpg", habitat: "Deep Sea" },
    { name: "Frilled Shark", scientific: "Chlamydoselaphus anguineus", fact: "Often called a 'living fossil' because of its primitive features.", image: "https://upload.wikimedia.org/wikipedia/commons/3/39/Chlamydoselaphus_anguineus_dark.jpg", habitat: "Benthic Zone" },
    { name: "Basking Shark", scientific: "Cetorhinus maximus", fact: "The second-largest living fish, it's a passive filter feeder.", image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Basking_Shark.jpg", habitat: "Boreal to Temperate Waters" },
    { name: "Megamouth Shark", scientific: "Megachasma pelagios", fact: "An extremely rare shark with a bioluminescent mouth.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Megamouth_shark_Megachasma_pelagios.jpg", habitat: "Deep Oceans" },
    { name: "Tiger Shark", scientific: "Galeocerdo cuvier", fact: "Known as the 'garbage can of the sea' for eating almost anything.", image: "https://upload.wikimedia.org/wikipedia/commons/3/39/Tiger_shark.jpg", habitat: "Tropical Coastal Waters" },
    { name: "Cookiecutter Shark", scientific: "Isistius brasiliensis", fact: "Takes circular chunks out of larger animals like whales.", image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Isistius_brasiliensis_no_bg.png", habitat: "Deep Tropical Waters" },
    { name: "Blue-Ringed Octopus", scientific: "Hapalochlaena", fact: "While not a fish, it's one of the deadliest saltwater creatures.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Blue-ringed_octopus.jpg", habitat: "Tide Pools" },
    { name: "Harlequin Shrimp", scientific: "Hymenocera picta", fact: "Known for feeding almost exclusively on starfish.", image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Harlequin_Shrimp_Hymenocera_picta.jpg", habitat: "Coral Reefs" },
    { name: "Blue Glaucus", scientific: "Glaucus atlanticus", fact: "A sea slug that floats upside down and eats venomous jellyfish.", image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Glaucus_atlanticus_1.jpg", habitat: "Pelagic Waters" },
    { name: "Vampire Squid", scientific: "Vampyroteuthis infernalis", fact: "It uses bioluminescent organs to confuse predators in the dark.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Vampyroteuthis_infernalis.jpg", habitat: "Oxygen Minimum Zone" },
    { name: "Anglerfish", scientific: "Lophiiformes", fact: "The female uses a glowing lure to attract prey in total darkness.", image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Humpback_anglerfish.jpg", habitat: "Bathypelagic Zone" },
    { name: "Flashlight Fish", scientific: "Anomalopidae", fact: "Has pockets of glowing bacteria under its eyes.", image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Anomalops_katoptron.jpg", habitat: "Deep Reefs" },
    { name: "Flame Angelfish", scientific: "Centropyge loricula", fact: "One of the most brightly colored fish in the aquarium trade.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Flame_Angelfish.jpg", habitat: "Pacific Ocean" },
    { name: "Powder Blue Tang", scientific: "Acanthurus leucosternon", fact: "They are highly territorial and will defend their grazing patch.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Powder_Blue_Tang.jpg", habitat: "Indian Ocean" },
    { name: "Picasso Triggerfish", scientific: "Rhinecanthus aculeatus", fact: "Known for making a whirring sound when threatened.", image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Picasso_triggerfish.jpg", habitat: "Shallow Reefs" },
    { name: "Achilles Tang", scientific: "Acanthurus achilles", fact: "Identified by a bright orange teardrop near its tail.", image: "https://upload.wikimedia.org/wikipedia/commons/7/72/Achilles_Tang.jpg", habitat: "Oceanic Reefs" },
    { name: "Longnose Butterflyfish", scientific: "Forcipiger flavissimus", fact: "Their long snouts are perfect for picking small prey from reef cracks.", image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Longnose_butterflyfish.jpg", habitat: "Indo-Pacific" },
    { name: "Royal Gramma", scientific: "Gramma loreto", fact: "Their bodies are split perfectly between bright purple and yellow.", image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Royal_Gramma.jpg", habitat: "Caribbean Reefs" },
    { name: "Banggai Cardinalfish", scientific: "Pterapogon kauderni", fact: "The male carries the eggs in his mouth until they hatch.", image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Banggai_Cardinalfish.jpg", habitat: "Banggai Islands" },
    { name: "Firefish Goby", scientific: "Nemateleotris magnifica", fact: "They use their long dorsal fin to 'lock' themselves into crevices.", image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Firefish_Goby.jpg", habitat: "Reef Ledges" },
    { name: "Yellow Watchman Goby", scientific: "Cryptocentrus cinctus", fact: "Often shares a burrow with a snapping shrimp.", image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Yellow_Watchman_Goby.jpg", habitat: "Sandy Reef Bottoms" },
    { name: "Blue-Spotted Ribbon Tail Ray", scientific: "Taeniura lymma", fact: "They rarely bury themselves in sand, unlike other rays.", image: "images/blue-spotted-ray.jpg", habitat: "Coral Reefs" },
    { name: "Zebra Shark", scientific: "Stegostoma tigrinum", fact: "Adults have spots, but juveniles have stripes, hence the name.", image: "images/zebra-shark.png", habitat: "Tropical Waters" },
    { name: "Giant Moray Eel", scientific: "Gymnothorax javanicus", fact: "They often hunt cooperatively with roving coral groupers.", image: "images/giant-moray.jpg", habitat: "Reef Slopes" },
    { name: "Porcupinefish", scientific: "Diodontidae", fact: "They can inflate their bodies with water or air to appear larger.", image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Porcupinefish.jpg", habitat: "Tropical Reefs" },
    { name: "Garden Eel", scientific: "Heterocongrinae", fact: "They live in colonies in burrows, swaying like seagrass.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Garden_Eels.jpg", habitat: "Sandy Flats" },
    { name: "Pacific Cleaner Wrasse", scientific: "Labroides phthirophagus", fact: "They set up 'cleaning stations' where other fish wait for a check-up.", image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Cleaner_Wrasse.jpg", habitat: "Reef Edges" },
    { name: "Dogface Puffer", scientific: "Arothron nigropunctatus", fact: "Their skin contains a lethal toxin called tetrodotoxin.", image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Dogface_Puffer.jpg", habitat: "Coral Reefs" },
    { name: "Harlequin Filefish", scientific: "Oxymonacanthus longirostris", fact: "They mimic the color and pattern of Acropora coral.", image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Harlequin_Filefish.jpg", habitat: "Coral Reefs" },
    { name: "Cowfish", scientific: "Lactoria cornuta", fact: "Has horns on its head that make it hard for predators to swallow.", image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Longhorn_Cowfish.jpg", habitat: "Tropical Reefs" },
    { name: "Wobbegong Shark", scientific: "Orectolobidae", fact: "Masters of camouflage with tassels that look like seaweed.", image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Wobbegong_Shark.jpg", habitat: "Ocean Floors" },
    { name: "Epaulette Shark", scientific: "Hemiscyllium ocellatum", fact: "Can 'walk' on land using its fins during low tide.", image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Epaulette_Shark.jpg", habitat: "Tide Pools" },
    { name: "Sawfish", scientific: "Pristidae", fact: "Its 'saw' is used both for sensing prey and for hunting.", image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Sawfish.jpg", habitat: "Estuaries" },
    { name: "Nautilus", scientific: "Nautilidae", fact: "A 'living fossil' that has remained unchanged for 500 million years.", image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Nautilus_Palau.jpg", habitat: "Deep Slopes" },
    { name: "Giant Squid", scientific: "Architeuthis dux", fact: "Can grow as large as a bus and has eyes the size of dinner plates.", image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Giant_squid_museum.jpg", habitat: "Deep Ocean" },
    { name: "Pacific Blackdragon", scientific: "Idiacanthus antrostomus", fact: "The larvae have eyes on long stalks that retreat as they grow.", image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Pacific_Blackdragon.jpg", habitat: "Mesopelagic Zone" },
    { name: "Football Fish", scientific: "Himantolophidae", fact: "A type of deep-sea anglerfish shaped like a ball.", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Football_Fish.jpg", habitat: "Abyssal Plain" },
    { name: "Great Barracuda", scientific: "Sphyraena barracuda", fact: "Capable of bursts of speed up to 27 mph.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Great_Barracuda_in_Grand_Cayman.jpg", habitat: "Open Seas" },
    { name: "Mahi Mahi", scientific: "Coryphaena hippurus", fact: "They are known for their brilliant green and gold colors that fade after death.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Mahi_Mahi.jpg", habitat: "Warm Pelagic Waters" },
    { name: "Wahoo", scientific: "Acanthocybium solandri", fact: "Among the fastest fish in the sea, popular with sport fishers.", image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Wahoo_fish.jpg", habitat: "Subtropical Oceans" },
    { name: "Longnose Hawkfish", scientific: "Oxycirrhites typus", fact: "Often perches on gorgonian corals waiting for small crustaceans.", image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Longnose_Hawkfish.jpg", habitat: "Deep Reefs" },
    { name: "Pygmy Seahorse", scientific: "Hippocampus bargibanti", fact: "So small and well-camouflaged it was only discovered by accident.", image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Pygmy_Seahorse.jpg", habitat: "Sea Fans" },
    { name: "Ribbon Eel", scientific: "Rhinomuraena quaesita", fact: "They change color and gender as they grow older.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Ribbon_Eel.jpg", habitat: "Reef Ledges" },
    { name: "Clownfish (Ocellaris)", scientific: "Amphiprion ocellaris", fact: "The most recognized fish from the movie Finding Nemo.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Amphiprion_ocellaris.jpg/1024px-Amphiprion_ocellaris.jpg", habitat: "Anemones" },
    { name: "Bluefin Tuna", scientific: "Thunnus thynnus", fact: "Can reach speeds of 40+ mph and dive over 3000 feet deep.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Thunnus_thynnus1.jpg/1024px-Thunnus_thynnus1.jpg", habitat: "Open Ocean" },
    { name: "Dottyback Fish", scientific: "Pictichthys paccagnellae", fact: "Known as the bicolor dottyback, they are extremely territorial.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Pictichthys_paccagnellae.jpg/1024px-Pictichthys_paccagnellae.jpg", habitat: "Deep Reefs" },
    { name: "Dragonfish", scientific: "Grammatidae", fact: "One of the deepest-living fish with bioluminescent scales.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sloane%27s_viperfish.jpg/1024px-Sloane%27s_viperfish.jpg", habitat: "Deep Sea" },
    { name: "Tripod Fish", scientific: "Bathypterois grallator", fact: "Uses elongated fins to rest on the ocean floor in deep waters.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Tripod_fish.jpg/1024px-Tripod_fish.jpg", habitat: "Abyssal Zone" },
    { name: "Fangtooth Fish", scientific: "Anoplogaster cornuta", fact: "Has large teeth but is only 6 inches long.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Fangtooth.jpg/1024px-Fangtooth.jpg", habitat: "Mesopelagic Zone" },
    { name: "Viperfish", scientific: "Chauliodus sloani", fact: "Has needle-like teeth that don't fit inside its mouth.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Chauliodus_sloanei.jpg/1024px-Chauliodus_sloanei.jpg", habitat: "Deep Sea" },
    { name: "Barreleye Fish", scientific: "Macropinna microstoma", fact: "Has a completely transparent head with tubular eyes.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Macropinna_microstoma.jpg/1024px-Macropinna_microstoma.jpg", habitat: "Mesopelagic Zone" },
    { name: "Lanternfish", scientific: "Myctophidae", fact: "Uses bioluminescence to communicate and attracts prey.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Lanternfish.jpg/1024px-Lanternfish.jpg", habitat: "Twilight Zone" },
    { name: "Gulper Eel", scientific: "Eurypharynx pelecanoides", fact: "Can open its massive mouth much wider than its body.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eurypharynx_pelecanoides.jpg/1024px-Eurypharynx_pelecanoides.jpg", habitat: "Deep Sea" },
    { name: "Dumbo Octopus", scientific: "Grimpoteuthis", fact: "Deepest-living octopus ever found, lives near hydrothermal vents.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dumbo_octopus.jpg/1024px-Dumbo_octopus.jpg", habitat: "Hadal Zone" },
    { name: "Mimic Octopus", scientific: "Thaumoctopus mimicus", fact: "Can impersonate over 15 different species instantly.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Mimic_Octopus.jpg/1024px-Mimic_Octopus.jpg", habitat: "Coral Reefs" },
    { name: "Cuttlefish", scientific: "Sepiida", fact: "Can change color, texture, and shape in milliseconds.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Cuttlefish.jpg/1024px-Cuttlefish.jpg", habitat: "Shallow Reefs" },
    { name: "Bioluminescent Jellyfish", scientific: "Atolla wyvillei", fact: "Creates a 'burglar alarm' light show when threatened.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Atolla_jellyfish.jpg/1024px-Atolla_jellyfish.jpg", habitat: "Deep Ocean" },
    { name: "Vibrantly Colored Nudibranch", scientific: "Chromodoris kunei", fact: "One of the most colorful sea slugs in tropical reefs.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Chromodoris_kunei.jpg/1024px-Chromodoris_kunei.jpg", habitat: "Coral Reefs" },
    { name: "Sea Pig", scientific: "Holothuroidea", fact: "Eats and processes dead organic matter from the sea floor.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Sea_pig.jpg/1024px-Sea_pig.jpg", habitat: "Abyssal Plain" },
    { name: "Horseshoe Crab", scientific: "Limulus polyphemus", fact: "Has blue blood and hasn't changed much in 450 million years.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Horseshoe_crab.jpg/1024px-Horseshoe_crab.jpg", habitat: "Sandy Shores" },
    { name: "Mantis Shrimp", scientific: "Stomatopoda", fact: "Has the most complex color vision and can punch with the force of a bullet.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Mantis_shrimp.jpg/1024px-Mantis_shrimp.jpg", habitat: "Coral Reefs" },
    { name: "Crown of Thorns Starfish", scientific: "Acanthaster planci", fact: "Highly venomous and feeds on coral polyps.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Crown_of_thorns.jpg/1024px-Crown_of_thorns.jpg", habitat: "Coral Reefs" },
    { name: "Sea Urchin", scientific: "Echinoidea", fact: "Can live over 100 years and has tube feet for movement.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Sea_urchin.jpg/1024px-Sea_urchin.jpg", habitat: "Rocky Reefs" },
    { name: "Feather Duster Worm", scientific: "Sabellida", fact: "Retracts instantly into its tube when sensing danger.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Feather_duster_worm.jpg/1024px-Feather_duster_worm.jpg", habitat: "Coral Reefs" },
    { name: "Lionfish Pterois Miles", scientific: "Pterois miles", fact: "Venomous spines with white banding patterns.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pterois_miles.jpg/1024px-Pterois_miles.jpg", habitat: "Indo-Pacific" },
    { name: "Trevally", scientific: "Carangidae", fact: "Fast predatory fish that hunts in coordinated schools.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Carangidae.jpg/1024px-Carangidae.jpg", habitat: "Coral Reefs" },
    { name: "Trumpetfish", scientific: "Aulostomidae", fact: "Mimics seaweed and coral to hide while hunting.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Trumpetfish.jpg/1024px-Trumpetfish.jpg", habitat: "Reef Edges" },
    { name: "Pufferfish", scientific: "Tetraodontidae", fact: "Can inflate to 3x their normal size when threatened.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Pufferfish.jpg/1024px-Pufferfish.jpg", habitat: "Tropical Waters" },
    { name: "Leaffish", scientific: "Nandidae", fact: "So perfectly camouflaged it looks like a floating leaf.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Leaffish.jpg/1024px-Leaffish.jpg", habitat: "Coral Reefs" },
    { name: "Remora Fish", scientific: "Echeneidae", fact: "Attaches to larger animals using a suction disc.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Remora_fish.jpg/1024px-Remora_fish.jpg", habitat: "Open Ocean" },
    { name: "Tuna", scientific: "Scombridae", fact: "Never stops swimming or it will drown from lack of water flow.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Yellowfin_tuna.jpg/1024px-Yellowfin_tuna.jpg", habitat: "Open Ocean" },
    { name: "Seahorse Pipefish", scientific: "Syngnathidae", fact: "Unique S-shaped body for hiding in seagrass.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Pipefish.jpg/1024px-Pipefish.jpg", habitat: "Seagrass Beds" },
    { name: "Ray-finned Batwing", scientific: "Pegasus volitans", fact: "Smallest flying fish, looks like an underwater dragon.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Pegasus_volitans.jpg/1024px-Pegasus_volitans.jpg", habitat: "Coral Reefs" },
    { name: "Scorpionfish", scientific: "Scorpaena", fact: "Venomous spines perfectly camouflaged on the reef floor.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Scorpaena_scrofa.jpg/1024px-Scorpaena_scrofa.jpg", habitat: "Rocky Reefs" },
    { name: "Grouper", scientific: "Epinephelus", fact: "Can change sex from female to male when the male dies.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Grouper.jpg/1024px-Grouper.jpg", habitat: "Coral Reefs" },
    { name: "Flounder", scientific: "Pleuronectiformes", fact: "Both eyes migrate to one side of its head as it develops.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Flounder.jpg/1024px-Flounder.jpg", habitat: "Sandy Bottom" },
    { name: "Seahorse Erectus", scientific: "Hippocampus erectus", fact: "Mate for life and hold each other's tails to stay together.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Seahorse_erectus.jpg/1024px-Seahorse_erectus.jpg", habitat: "Seagrass Beds" },
    { name: "Bioluminescent Hatchetfish", scientific: "Sternoptychidae", fact: "Uses downward-pointing lights to hide its shadow.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hatchetfish.jpg/1024px-Hatchetfish.jpg", habitat: "Twilight Zone" },
    { name: "Fangtooth Muraenosox", scientific: "Muraenesox cinereus", fact: "Nocturnal eel that hunts small fish in deep water.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Muraenesox.jpg/1024px-Muraenesox.jpg", habitat: "Deep Sea" },
    { name: "Cod", scientific: "Gadus morhua", fact: "Can live 20 years and produce millions of eggs annually.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Gadus_morhua.jpg/1024px-Gadus_morhua.jpg", habitat: "Cold Waters" },
    { name: "Angelshark", scientific: "Squatina squatina", fact: "Bottom dweller shaped like a ray with a flat body.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Angelshark.jpg/1024px-Angelshark.jpg", habitat: "Sandy Bottoms" },
    { name: "Goblin Shark Mitsukurina", scientific: "Mitsukurina owstoni", fact: "Extremely rare deep-sea shark with a sword-like snout.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Goblin_shark.jpg/1024px-Goblin_shark.jpg", habitat: "Deep Sea" }
];

// Sound Toggle Function
function toggleWaveSound() {
    if (soundEnabled) {
        waveSound.pause();
        soundEnabled = false;
        toggleSoundBtn.textContent = '🔊 Sound On';
        toggleSoundBtn.classList.remove('active');
    } else {
        waveSound.play();
        soundEnabled = true;
        toggleSoundBtn.textContent = '🔇 Sound Off';
        toggleSoundBtn.classList.add('active');
    }
}

toggleSoundBtn.addEventListener('click', toggleWaveSound);

function renderCalendar() {
    calendarGrid.innerHTML = '';
    
    const viewMonth = navDate.getMonth();
    const viewYear = navDate.getFullYear();
    
    monthYearLabel.innerText = navDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day-cell');
    
        const realToday = new Date();
        if (i === realToday.getDate() && viewMonth === realToday.getMonth() && viewYear === realToday.getFullYear()) {
            dayCell.classList.add('today');
        }
    
        dayCell.innerText = i;

        const dayIndex = (viewMonth * 31) + (i - 1);
        const fishOfDay = fishData[dayIndex % fishData.length];

        dayCell.addEventListener('click', function() {
            const previousSelected = document.querySelector('.day-cell.selected');
            if (previousSelected) {
                previousSelected.classList.remove('selected');
            }
        
            dayCell.classList.add('selected');
            displayFish(fishOfDay);
        });

        calendarGrid.appendChild(dayCell);
    }
    
    displayFish(fishData[(viewMonth * 31) % fishData.length]);

    const allCells = document.querySelectorAll('.day-cell');
    const todayDate = new Date().getDate();

    if (navDate.getMonth() === new Date().getMonth() && navDate.getFullYear() === new Date().getFullYear()) {
        allCells.forEach(cell => {
            if (parseInt(cell.innerText) === todayDate) {
                cell.classList.add('selected');
            }
        });
    }

    const today = new Date();
    
    if (navDate.getMonth() === today.getMonth() && navDate.getFullYear() === today.getFullYear()) {
        const todayDate = today.getDate();
        
        allCells.forEach(cell => {
            if (parseInt(cell.innerText) === todayDate) {
                cell.classList.add('selected');
                
                const dayIndex = (today.getMonth() * 31) + (todayDate - 1);
                const fishOfToday = fishData[dayIndex % fishData.length];
                
                displayFish(fishOfToday);
            }
        });
    }
}

function displayFish(fish) {
    if (!fishCard) return;

    fishCard.innerHTML = `
        <div class="fish-container" style="animation: fadeIn 0.5s ease;">
            <h2 style="margin-top: 0;">${fish.name}</h2> 
            <p style="color: #b0d9ff;"><em>${fish.scientific}</em></p>
            
            <img src="${fish.image}" 
                 alt="${fish.name}" 
                 class="fish-image" 
                 onerror="this.src='https://via.placeholder.com/300?text=${encodeURIComponent(fish.name)}';"> 
            
            <div style="text-align: left; margin-top: 20px; background: rgba(15, 76, 129, 0.5); padding: 15px; border-radius: 10px; border-left: 4px solid #00bfff;">
                <p><strong>📍 Habitat:</strong> ${fish.habitat}</p>
                <p><strong>💡 Fun Fact:</strong> ${fish.fact}</p>
            </div>
        </div>
    `;
}

// NAVIGATION LOGIC
prevBtn.addEventListener('click', () => {
    navDate.setMonth(navDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    navDate.setMonth(navDate.getMonth() + 1);
    renderCalendar();
});

// Initial Load
renderCalendar();
