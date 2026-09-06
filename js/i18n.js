/* ═══════════════════════════════════════════════
   I18N.JS — Multi-language (EN/Filipino) toggle system
   Load this BEFORE common.js sa lahat ng pages.
═══════════════════════════════════════════════ */

const translations = {
  en: {
    /* ── SHARED: NAVBAR / FOOTER ── */
    nav_home: "Home",
    nav_spots: "Tourist Spots",
    nav_gallery: "Gallery",
    nav_location: "Location",
    nav_contact: "Contact",
    footer_tagline: "Casiguran, Aurora Province · Philippines",
    footer_copy: "© 2026 Discover Casiguran · Aurora's Hidden Gem",
    announce_text_html: '🌊 Best time to visit: <strong>November – May</strong> (dry season) — Plan your trip today!',
    announce_link: "Get directions →",

    /* ── SHARED: AI CHAT WIDGET ── */
    chat_title: "Casiguran AI Guide",
    chat_subtitle: "Aurora's Hidden Gem · Ask Anything",
    chat_status: "Online",
    chat_placeholder: "Ask about Casiguran…",
    chat_suggest_1: "🚗 How to get there?",
    chat_suggest_2: "📅 Best time to visit?",
    chat_suggest_3: "🏖 Best beaches?",
    chat_suggest_4: "💰 Budget tips?",
    chat_suggest_5: "🌊 Tibu Tidal Pool?",

    /* ── HOME PAGE ── */
    hero_eyebrow_1: "Aurora Province, Philippines",
    hero_title_1_html: "Explore <em>Casiguran,</em><br>Aurora",
    hero_sub_1: "The Hidden Paradise of Aurora Province — pristine beaches, hidden waterfalls, and a community that welcomes you like family.",

    hero_eyebrow_2: "Pacific Coastline",
    hero_title_2_html: "Dive Into <em>Crystal</em><br>Clear Waters",
    hero_sub_2: "Casiguran's tidal pools and beaches offer snorkeling, swimming, and sunset views that will take your breath away.",

    hero_eyebrow_3: "Nature & Adventure",
    hero_title_3_html: "Discover <em>Hidden</em><br>Waterfalls",
    hero_sub_3: "Trek through ancient forests to find cascading falls and natural pools that few have ever witnessed.",

    hero_eyebrow_4: "Heritage & Culture",
    hero_title_4_html: "Explore <em>400 Years</em><br>of History",
    hero_sub_4: "From colonial-era churches to centuries-old fishing traditions, Casiguran's rich heritage runs as deep as the Pacific.",

    hero_action_explore: "Explore Spots →",
    hero_action_learn: "Learn More",

    stats_destinations: "Destinations",
    stats_beach: "Beach Spots",
    stats_falls: "Waterfalls",
    stats_adventures: "Adventures",

    vc_online: "visitors online now",
    vc_month: "visits this month",
    vc_total: "total visitors",

    about_eyebrow: "About the Municipality",
    about_title_html: "A Coastal Gem on<br>the Pacific Shore",
    about_p1: "Casiguran is a coastal municipality in the province of Aurora, Philippines. Nestled along the shores of Casiguran Bay, it is celebrated for its serene natural environment, scenic coastlines, and a rich cultural heritage shaped by generations of indigenous and coastal communities.",
    about_p2: "Situated on the eastern coast of Luzon, Casiguran serves as a gateway to extraordinary natural attractions — from pristine Pacific beaches and hidden waterfalls to protected forests and historic landmarks.",
    about_p3: "The community of Casiguran takes pride in its deep connection to the sea. Fishing remains central to local life and culture, and visitors are warmly welcomed with fresh seafood, traditional hospitality, and an authentic glimpse into coastal Filipino living.",
    about_p4: "With its blend of environmental wealth, cultural identity, and tranquil pace of life, Casiguran is not just a destination — it is an experience that stays with you long after you've left its shores.",
    about_badge_label: "Year Casiguran was established",
    read_more: "Read More",
    read_less: "Read Less",

    highlights_eyebrow: "Top Destinations",
    highlights_title: "Popular Tourist Spots",
    hc_beach_title: "Casapsapan Beach",
    hc_beach_desc: "Calm Pacific waters and breathtaking sunrise panoramas await at Casiguran's most beloved beach.",
    hc_tidal_title: "Tibu Tidal Pool",
    hc_tidal_desc: "Geological rock basins filled by Pacific tides, perfect for snorkeling and photography.",
    hc_falls_title: "Bulawan Falls",
    hc_falls_desc: "A secluded waterfall cascading over golden-hued rocks, deep in Casiguran's forest interior.",
    hc_link: "Explore →",
    spots_cta: "View All Destinations →",

    besttime_eyebrow: "Plan Your Visit",
    besttime_title: "Best Time to Visit Casiguran",
    legend_best: "Best / Great months",
    legend_avoid: "Avoid (rainy / typhoon)",

    gallery_eyebrow: "Visual Stories",
    gallery_title: "Photo Gallery",
    gallery_viewall: "View Full Gallery →",

    map_eyebrow: "Getting There",
    map_title: "Find Casiguran, Aurora",
    map_location_label: "Location",
    map_location_val_html: "Casiguran, Aurora Province<br>Luzon, Philippines",
    map_manila_label: "From Manila",
    map_manila_val: "~7–9 hours via Baler or Dingalan route",
    map_sea_label: "By Sea",
    map_sea_val: "Accessible via pumpboat from Baler or Dinalungan",
    map_season_label: "Best Season",
    map_season_val: "November – May (dry season)",

    toast_already_title: "You are already on this page.",

    /* ── GALLERY PAGE ── */
    gal_eyebrow: "Visual Journey",
    gal_title_html: "Casiguran in <em>Pictures</em>",
    gal_desc: "Explore the untouched beauty of Aurora's hidden gem — through beaches, waterfalls, and nature.",
    gal_filter_all: "All Photos",
    gal_filter_beach: "🏖 Beaches",
    gal_filter_falls: "💧 Waterfalls",
    gal_filter_nature: "🌿 Nature",
    gal_filter_landmark: "🏛 Landmarks",
    gal_empty_text: "No photos in this category yet.",
    gal_tag_beach: "Beach",
    gal_tag_waterfall: "Waterfall",
    gal_tag_nature: "Nature",
    gal_tag_landmark: "Landmark",
    gal_tag_overview: "Overview",
    gal_caption_generic: "Casiguran, Aurora",

    /* ── LOCATION PAGE ── */
    loc_eyebrow: "Find Your Way",
    loc_title_html: "Getting to <em>Casiguran</em>",
    loc_desc: "Tucked along the Pacific coast of Aurora — remote, serene, and absolutely worth the journey.",
    loc_pill_province: "Province",
    loc_pill_facing: "Facing East",
    loc_pill_frommanila: "from Manila",
    loc_pill_avgtemp: "Avg. Temperature",
    loc_pill_besttime: "Best Time to Visit",
    map_tab_town: "🏘 Town Center",
    map_tab_bay: "🌊 Casiguran Bay",
    map_tab_region: "🗺 Aurora Region",
    map_openbtn: "↗ Open in Google Maps",
    card_location: "📌 Location",
    loc_address_html: "Municipality of Casiguran<br>Province of Aurora<br>Region III – Central Luzon<br>Philippines",
    loc_badge: "🌏 Pacific Rim Municipality",
    card_howtogetthere: "🧭 How to Get There",
    route_bus_title: "Bus from Manila",
    route_bus_desc: "Take a bus from Cubao or Pasay to Baler, Aurora. From Baler, ride a jeepney or van bound for Casiguran.",
    route_bus_time: "⏱ ~8–9 hrs total",
    route_car_title: "Private Car via Baler",
    route_car_desc: "Drive from Manila via NLEX → TPLEX → Nueva Ecija → Baler, then continue north along the coast.",
    route_car_time: "⏱ ~6–7 hrs",
    route_boat_title: "Boat from Palanan",
    route_boat_desc: "Travel by pump boat from Palanan, Isabela across to Casiguran Bay — a scenic coastal route.",
    route_boat_time: "⏱ ~2–3 hrs by sea",
    route_fly_title: "Fly to Palanan / Baler",
    route_fly_desc: "Charter flights available to Palanan Airport (Isabela). From Palanan, take a boat or jeep to Casiguran.",
    route_fly_time: "⏱ ~1 hr flight + transfer",
    card_besttime: "📅 Best Time to Visit",
    season_dry_month: "☀️ Mar – May",
    season_dry_desc: "Dry season — ideal for beaches and waterfalls.",
    season_cool_month: "☀️ Nov – Feb",
    season_cool_desc: "Cool and less humid, great for trekking.",
    season_rain_month: "🌧 Jun – Aug",
    season_rain_desc: "Rainy season. Some roads may flood.",
    season_typhoon_month: "🌀 Sep – Oct",
    season_typhoon_desc: "Typhoon season — avoid if possible.",
    card_traveltips: "💡 Travel Tips",
    tip_cash: "Bring enough cash — ATMs are very limited in town.",
    tip_signal: "Mobile signal is spotty; download offline maps before leaving.",
    tip_repellent: "Bring insect repellent for forest and waterfall treks.",
    tip_guides: "Arrange local guides for Bulawan Falls and remote spots.",
    tip_supplies: "Stock up on supplies in Baler before heading north.",
    tip_customs: "Respect local customs — Casiguran has indigenous communities.",
    card_nearbytowns: "🗺️ Nearby Towns",
    town_baler: "🏖 Baler, Aurora",
    dist_baler: "~80 km south",
    town_dipaculao: "🌊 Dipaculao, Aurora",
    dist_dipaculao: "~50 km south",
    town_palanan: "🌿 Palanan, Isabela",
    dist_palanan: "~70 km north",
    town_sanmariano: "🏔 San Mariano, Isabela",
    dist_sanmariano: "~120 km northwest",
    town_cabanatuan: "🌾 Cabanatuan, Nueva Ecija",
    dist_cabanatuan: "~200 km west",

    /* ── SPOTS PAGE ── */
    spots_eyebrow: "Explore Casiguran",
    spots_title_html: "Discover <em>Every Hidden</em><br>Corner of Aurora",
    spots_desc: "From pristine Pacific beaches and secret waterfalls to historic lighthouses and colonial churches — Casiguran's treasures are waiting for you.",
    search_placeholder: "Search spots… (e.g. beach, falls, lighthouse)",
    filter_all: "All",
    filter_featured: "⭐ Featured",
    filter_beach: "🏖 Beaches",
    filter_nature: "🌿 Nature",
    filter_landmark: "🏛 Landmarks",
    noresults_text: "No spots found for",
    section_featured_title: "Featured Spots",
    section_featured_tag: "⭐ Must-Visit",
    section_beaches_title: "Beaches",
    section_beaches_tag: "🏖 Coastal",
    section_nature_title: "Nature Attractions",
    section_nature_tag: "🌿 Eco",
    section_landmarks_title: "Landmarks",
    section_landmarks_tag: "🏛 Heritage",
    card_cta: "View Details →",
    spot_casapsapan_desc: "A peaceful beach with beautiful sunrise views and calm Pacific waters.",
    spot_tibu_desc: "A natural tidal pool perfect for relaxing, snorkeling, and photography.",
    spot_bulawan_desc: "A hidden waterfall cascading over golden-hued rocks deep in the forest interior.",
    spot_dianao_desc: "A quiet beach perfect for relaxation and enjoying ocean views.",
    spot_cuaresma_desc: "A peaceful hidden beach known for its natural beauty and serenity.",
    spot_motiong_desc: "A remote coastal destination ideal for nature lovers and campers.",
    spot_gayusan_desc: "A scenic waterfall surrounded by lush tropical greenery.",
    spot_amro_desc: "A protected natural area with rich forest and river ecosystems.",
    spot_ontok_desc: "A lighthouse overlooking Casiguran Bay and the vast Pacific Ocean.",
    spot_ermita_desc: "A historic church and beloved cultural landmark in Casiguran since 1604.",
    modal_addfav: "Add to Favorites",
    modal_favorited: "Favorited!",
    modal_peopleliked: "people liked this",
    modal_activities: "Activities",
    modal_video: "Video",

    /* ── CONTACT PAGE ── */
    contact_eyebrow: "Get In Touch",
    contact_title_html: "Plan Your <em>Casiguran</em> Trip",
    contact_desc: "Have questions about tours, accommodations, or getting here? Send us a message and we'll get back to you.",
    form_label: "✉️ Send an Inquiry",
    field_name: "Full Name",
    field_email: "Email",
    field_phone: "Phone Number",
    field_phone_opt: "(optional)",
    field_inquirytype: "Inquiry Type",
    field_message: "Message",
    message_placeholder: "Tell us about your planned trip — dates, group size, what you'd like to see...",
    inquiry_general: "General Inquiry",
    inquiry_tour: "Tour Booking",
    inquiry_accommodation: "Accommodation",
    inquiry_guide: "Local Guide Request",
    inquiry_other: "Other",
    submit_btn: "Send Message",
    card_reachus: "📍 Reach Us",
    reach_office_title: "Casiguran Municipal Tourism Office",
    reach_office_desc: "Municipal Hall, Casiguran, Aurora, Philippines",
    reach_fb_title: "Facebook Page",
    reach_email_title: "Email",
    card_response: "⏱️ Response Time",
    response_text: "We typically reply within 1–2 business days. For urgent same-day questions, our AI Guide (bottom-left chat button) can answer most common questions instantly.",
    card_beforemsg: "🗺️ Before You Message",
    beforemsg_1_html: "Check our <a href=\"location.html\">Location page</a> for directions and travel times.",
    beforemsg_2_html: "Browse <a href=\"spots.html\">Tourist Spots</a> to help plan your itinerary.",
    beforemsg_3: "Include your planned travel dates for faster, more relevant replies.",
  },

  tl: {
    /* ── SHARED: NAVBAR / FOOTER ── */
    nav_home: "Home",
    nav_spots: "Mga Tourist Spot",
    nav_gallery: "Gallery",
    nav_location: "Lokasyon",
    nav_contact: "Makipag-ugnayan",
    footer_tagline: "Casiguran, Aurora Province · Pilipinas",
    footer_copy: "© 2026 Discover Casiguran · Nakatagong Kayamanan ng Aurora",
    announce_text_html: '🌊 Pinakamagandang oras bumisita: <strong>Nobyembre – Mayo</strong> (tag-init) — Planuhin na ang biyahe mo!',
    announce_link: "Makakuha ng direksyon →",

    /* ── SHARED: AI CHAT WIDGET ── */
    chat_title: "Casiguran AI Guide",
    chat_subtitle: "Nakatagong Kayamanan ng Aurora · Magtanong Ka",
    chat_status: "Online",
    chat_placeholder: "Magtanong tungkol sa Casiguran…",
    chat_suggest_1: "🚗 Paano makarating?",
    chat_suggest_2: "📅 Kailan pinakamagandang bumisita?",
    chat_suggest_3: "🏖 Anong pinakamagandang beach?",
    chat_suggest_4: "💰 Budget tips?",
    chat_suggest_5: "🌊 Tibu Tidal Pool?",

    /* ── HOME PAGE ── */
    hero_eyebrow_1: "Lalawigan ng Aurora, Pilipinas",
    hero_title_1_html: "Tuklasin ang <em>Casiguran,</em><br>Aurora",
    hero_sub_1: "Ang Nakatagong Paraiso ng Aurora — malilinis na dalampasigan, nakatagong talon, at komunidad na tatanggap sa'yo na parang pamilya.",

    hero_eyebrow_2: "Baybayin ng Pasipiko",
    hero_title_2_html: "Sumisid sa <em>Malinaw</em><br>na Tubig",
    hero_sub_2: "Ang mga tidal pool at dalampasigan ng Casiguran ay nag-aalok ng snorkeling, paglangoy, at tanawin ng paglubog ng araw na makakabighani sa'yo.",

    hero_eyebrow_3: "Kalikasan at Adventure",
    hero_title_3_html: "Tuklasin ang <em>Nakatagong</em><br>mga Talon",
    hero_sub_3: "Maglakbay sa sinaunang kagubatan para mahanap ang bumabagsak na talon at natural na kolam na kakaunti lang ang nakakita.",

    hero_eyebrow_4: "Pamana at Kultura",
    hero_title_4_html: "Tuklasin ang <em>400 Taon</em><br>ng Kasaysayan",
    hero_sub_4: "Mula sa mga simbahan noong kolonyal na panahon hanggang sa mga tradisyon ng pangingisda na daan-daang taon na, ang mayamang pamana ng Casiguran ay kasing-lalim ng Pasipiko.",

    hero_action_explore: "Tuklasin ang mga Spot →",
    hero_action_learn: "Alamin Pa",

    stats_destinations: "Mga Destinasyon",
    stats_beach: "Beach Spots",
    stats_falls: "Talon",
    stats_adventures: "Adventures",

    vc_online: "online ngayon",
    vc_month: "bisita ngayong buwan",
    vc_total: "kabuuang bisita",

    about_eyebrow: "Tungkol sa Munisipyo",
    about_title_html: "Isang Kayamanan sa Baybayin<br>ng Pasipiko",
    about_p1: "Ang Casiguran ay isang bayan sa baybayin ng lalawigan ng Aurora, Pilipinas. Nakatago sa gilid ng Casiguran Bay, ito ay kilala sa mahinahong kalikasan, magandang tanawin ng baybayin, at mayamang kultural na pamana na hinubog ng maraming henerasyon ng katutubo at komunidad na nasa baybayin.",
    about_p2: "Nakaupo sa silangang baybayin ng Luzon, ang Casiguran ay pintuan patungo sa kahanga-hangang mga natural na atraksyon — mula sa malilinis na dalampasigan sa Pasipiko at nakatagong talon hanggang sa protektadong kagubatan at makasaysayang lugar.",
    about_p3: "Ipinagmamalaki ng komunidad ng Casiguran ang matibay na koneksyon nito sa dagat. Ang pangingisda ay nananatiling sentro ng lokal na buhay at kultura, at malugod na tinatanggap ang mga bisita ng sariwang pagkaing-dagat, tradisyunal na pagkamapagpatuloy, at tunay na karanasan ng buhay-baybayin ng Pilipino.",
    about_p4: "Sa pagsasanib ng yamang kalikasan, kultural na pagkakakilanlan, at mahinahong pamumuhay, ang Casiguran ay hindi lang isang destinasyon — ito ay isang karanasan na mananatili sa'yo kahit matagal ka nang umalis sa mga baybayin nito.",
    about_badge_label: "Taon nang itinatag ang Casiguran",
    read_more: "Basahin Pa",
    read_less: "Bawasan",

    highlights_eyebrow: "Mga Sikat na Destinasyon",
    highlights_title: "Mga Sikat na Tourist Spot",
    hc_beach_title: "Casapsapan Beach",
    hc_beach_desc: "Mahinahong tubig ng Pasipiko at kahanga-hangang paglubog ng araw ang naghihintay sa pinaka-minamahal na beach ng Casiguran.",
    hc_tidal_title: "Tibu Tidal Pool",
    hc_tidal_desc: "Mga natural na batuhan na pinupuno ng alon ng Pasipiko, perpekto para sa snorkeling at photography.",
    hc_falls_title: "Bulawan Falls",
    hc_falls_desc: "Isang nakatagong talon na dumadaloy sa mga gintong-kulay na bato, malalim sa kagubatan ng Casiguran.",
    hc_link: "Tuklasin →",
    spots_cta: "Tingnan Lahat ng Destinasyon →",

    besttime_eyebrow: "Planuhin ang Bisita",
    besttime_title: "Pinakamagandang Oras Bumisita sa Casiguran",
    legend_best: "Pinakamagandang buwan",
    legend_avoid: "Iwasan (maulan / bagyo)",

    gallery_eyebrow: "Mga Larawan",
    gallery_title: "Photo Gallery",
    gallery_viewall: "Tingnan Lahat ng Gallery →",

    map_eyebrow: "Paano Makarating",
    map_title: "Hanapin ang Casiguran, Aurora",
    map_location_label: "Lokasyon",
    map_location_val_html: "Casiguran, Lalawigan ng Aurora<br>Luzon, Pilipinas",
    map_manila_label: "Mula Manila",
    map_manila_val: "~7–9 oras via Baler o Dingalan route",
    map_sea_label: "Sa Dagat",
    map_sea_val: "Puwedeng sakyan ng pumpboat mula Baler o Dinalungan",
    map_season_label: "Pinakamagandang Panahon",
    map_season_val: "Nobyembre – Mayo (tag-init)",

    toast_already_title: "Nandito ka na sa pahinang ito.",

    /* ── GALLERY PAGE ── */
    gal_eyebrow: "Paglalakbay sa Larawan",
    gal_title_html: "Casiguran sa mga <em>Larawan</em>",
    gal_desc: "Tuklasin ang di-nagagalaw na ganda ng nakatagong kayamanan ng Aurora — sa dalampasigan, talon, at kalikasan.",
    gal_filter_all: "Lahat ng Larawan",
    gal_filter_beach: "🏖 Dalampasigan",
    gal_filter_falls: "💧 Talon",
    gal_filter_nature: "🌿 Kalikasan",
    gal_filter_landmark: "🏛 Makasaysayan",
    gal_empty_text: "Wala pang larawan sa kategoryang ito.",
    gal_tag_beach: "Dalampasigan",
    gal_tag_waterfall: "Talon",
    gal_tag_nature: "Kalikasan",
    gal_tag_landmark: "Makasaysayan",
    gal_tag_overview: "Pangkalahatan",
    gal_caption_generic: "Casiguran, Aurora",

    /* ── LOCATION PAGE ── */
    loc_eyebrow: "Hanapin ang Daan",
    loc_title_html: "Pagpunta sa <em>Casiguran</em>",
    loc_desc: "Nakatago sa baybayin ng Pasipiko ng Aurora — malayo, mahinahon, at talagang sulit ang paglalakbay.",
    loc_pill_province: "Lalawigan",
    loc_pill_facing: "Nakaharap sa Silangan",
    loc_pill_frommanila: "mula Manila",
    loc_pill_avgtemp: "Karaniwang Temperatura",
    loc_pill_besttime: "Pinakamagandang Oras Bumisita",
    map_tab_town: "🏘 Sentro ng Bayan",
    map_tab_bay: "🌊 Casiguran Bay",
    map_tab_region: "🗺 Rehiyon ng Aurora",
    map_openbtn: "↗ Buksan sa Google Maps",
    card_location: "📌 Lokasyon",
    loc_address_html: "Munisipyo ng Casiguran<br>Lalawigan ng Aurora<br>Rehiyon III – Gitnang Luzon<br>Pilipinas",
    loc_badge: "🌏 Bayan sa Gilid ng Pasipiko",
    card_howtogetthere: "🧭 Paano Makarating",
    route_bus_title: "Bus mula Manila",
    route_bus_desc: "Sumakay ng bus mula Cubao o Pasay papuntang Baler, Aurora. Mula Baler, sumakay ng jeepney o van patungong Casiguran.",
    route_bus_time: "⏱ ~8–9 oras total",
    route_car_title: "Sariling Sasakyan via Baler",
    route_car_desc: "Magmaneho mula Manila via NLEX → TPLEX → Nueva Ecija → Baler, tapos tumuloy pahilaga sa baybayin.",
    route_car_time: "⏱ ~6–7 oras",
    route_boat_title: "Bangka mula Palanan",
    route_boat_desc: "Sumakay ng pump boat mula Palanan, Isabela papuntang Casiguran Bay — magandang tanawin sa dagat.",
    route_boat_time: "⏱ ~2–3 oras sa dagat",
    route_fly_title: "Sumakay ng Eroplano papuntang Palanan / Baler",
    route_fly_desc: "May charter flights papuntang Palanan Airport (Isabela). Mula Palanan, sumakay ng bangka o jeep papuntang Casiguran.",
    route_fly_time: "⏱ ~1 oras na flight + transfer",
    card_besttime: "📅 Pinakamagandang Oras Bumisita",
    season_dry_month: "☀️ Mar – May",
    season_dry_desc: "Tag-init — perpekto para sa dalampasigan at talon.",
    season_cool_month: "☀️ Nob – Peb",
    season_cool_desc: "Malamig at hindi masyadong halumigmig, magandang panahon para sa trekking.",
    season_rain_month: "🌧 Hun – Ago",
    season_rain_desc: "Tag-ulan. May mga daan na baha-baha.",
    season_typhoon_month: "🌀 Set – Okt",
    season_typhoon_desc: "Panahon ng bagyo — iwasan kung maaari.",
    card_traveltips: "💡 Mga Travel Tips",
    tip_cash: "Magdala ng sapat na pera — limitado ang ATM sa bayan.",
    tip_signal: "Mahina ang signal; mag-download ng offline maps bago umalis.",
    tip_repellent: "Magdala ng insect repellent para sa forest at waterfall treks.",
    tip_guides: "Mag-ayos ng lokal na guide para sa Bulawan Falls at mga malalayong spot.",
    tip_supplies: "Mag-stock ng gamit sa Baler bago pumunta pahilaga.",
    tip_customs: "Igalang ang lokal na kultura — may mga katutubong komunidad sa Casiguran.",
    card_nearbytowns: "🗺️ Mga Karatig na Bayan",
    town_baler: "🏖 Baler, Aurora",
    dist_baler: "~80 km timog",
    town_dipaculao: "🌊 Dipaculao, Aurora",
    dist_dipaculao: "~50 km timog",
    town_palanan: "🌿 Palanan, Isabela",
    dist_palanan: "~70 km hilaga",
    town_sanmariano: "🏔 San Mariano, Isabela",
    dist_sanmariano: "~120 km hilagang-kanluran",
    town_cabanatuan: "🌾 Cabanatuan, Nueva Ecija",
    dist_cabanatuan: "~200 km kanluran",

    /* ── SPOTS PAGE ── */
    spots_eyebrow: "Tuklasin ang Casiguran",
    spots_title_html: "Tuklasin <em>Bawat Nakatagong</em><br>Sulok ng Aurora",
    spots_desc: "Mula sa malilinis na dalampasigan ng Pasipiko at nakatagong talon hanggang sa makasaysayang lighthouse at simbahan — hinihintay ka na ng kayamanan ng Casiguran.",
    search_placeholder: "Maghanap ng spot… (hal. beach, talon, lighthouse)",
    filter_all: "Lahat",
    filter_featured: "⭐ Featured",
    filter_beach: "🏖 Dalampasigan",
    filter_nature: "🌿 Kalikasan",
    filter_landmark: "🏛 Makasaysayan",
    noresults_text: "Walang nahanap na spot para sa",
    section_featured_title: "Mga Featured Spot",
    section_featured_tag: "⭐ Dapat Bisitahin",
    section_beaches_title: "Mga Dalampasigan",
    section_beaches_tag: "🏖 Baybayin",
    section_nature_title: "Mga Atraksyon sa Kalikasan",
    section_nature_tag: "🌿 Eco",
    section_landmarks_title: "Mga Makasaysayang Lugar",
    section_landmarks_tag: "🏛 Pamana",
    card_cta: "Tingnan ang Detalye →",
    spot_casapsapan_desc: "Isang mahinahong beach na may magandang sunrise view at kalmadong tubig ng Pasipiko.",
    spot_tibu_desc: "Isang natural na tidal pool na perpekto para sa relaks, snorkeling, at photography.",
    spot_bulawan_desc: "Isang nakatagong talon na dumadaloy sa mga gintong-kulay na bato malalim sa kagubatan.",
    spot_dianao_desc: "Isang tahimik na beach na perpekto para sa relaks at pagtanaw sa dagat.",
    spot_cuaresma_desc: "Isang mahinahon at nakatagong beach na kilala sa natural na ganda at katahimikan.",
    spot_motiong_desc: "Isang malayong destinasyon sa baybayin na perpekto para sa mahilig sa kalikasan at camping.",
    spot_gayusan_desc: "Isang magandang talon na napapalibutan ng luntiang kagubatan.",
    spot_amro_desc: "Isang protektadong lugar na may mayamang kagubatan at ekosistema ng ilog.",
    spot_ontok_desc: "Isang lighthouse na nakatanaw sa Casiguran Bay at sa malawak na Pasipiko.",
    spot_ermita_desc: "Isang makasaysayang simbahan at minamahal na kultural na lugar sa Casiguran mula pa noong 1604.",
    modal_addfav: "Idagdag sa Paborito",
    modal_favorited: "Na-paborito na!",
    modal_peopleliked: "tao ang na-like ito",
    modal_activities: "Mga Aktibidad",
    modal_video: "Video",

    /* ── CONTACT PAGE ── */
    contact_eyebrow: "Makipag-ugnayan",
    contact_title_html: "Planuhin ang Byahe mo sa <em>Casiguran</em>",
    contact_desc: "May tanong tungkol sa tour, accommodation, o kung paano makarating? Magpadala ng mensahe at sasagutin ka namin.",
    form_label: "✉️ Magpadala ng Inquiry",
    field_name: "Buong Pangalan",
    field_email: "Email",
    field_phone: "Numero ng Telepono",
    field_phone_opt: "(opsyonal)",
    field_inquirytype: "Uri ng Inquiry",
    field_message: "Mensahe",
    message_placeholder: "Sabihin sa amin ang plano mong byahe — petsa, bilang ng grupo, ano ang gusto mong makita...",
    inquiry_general: "Pangkalahatang Katanungan",
    inquiry_tour: "Pag-book ng Tour",
    inquiry_accommodation: "Accommodation",
    inquiry_guide: "Hiling ng Lokal na Guide",
    inquiry_other: "Iba pa",
    submit_btn: "Ipadala ang Mensahe",
    card_reachus: "📍 Makipag-ugnayan",
    reach_office_title: "Casiguran Municipal Tourism Office",
    reach_office_desc: "Munisipyo, Casiguran, Aurora, Pilipinas",
    reach_fb_title: "Facebook Page",
    reach_email_title: "Email",
    card_response: "⏱️ Oras ng Pagsagot",
    response_text: "Karaniwang sumasagot kami sa loob ng 1–2 araw ng negosyo. Para sa agarang tanong, ang AI Guide namin (chat button sa ibabang-kaliwa) ay puwedeng sumagot agad sa mga karaniwang tanong.",
    card_beforemsg: "🗺️ Bago Mag-mensahe",
    beforemsg_1_html: "Tingnan ang aming <a href=\"location.html\">Location page</a> para sa direksyon at oras ng byahe.",
    beforemsg_2_html: "I-browse ang <a href=\"spots.html\">Tourist Spots</a> para tulungan kang magplano ng itinerary.",
    beforemsg_3: "Isama ang planong petsa ng byahe mo para mas mabilis at relevant na sagot.",
  }
};

/* ═══ CORE ENGINE ═══ */
const I18N_STORAGE_KEY = "casiguran_lang";

function i18nGetLang() {
  return localStorage.getItem(I18N_STORAGE_KEY) || "en";
}

function i18nApply(lang) {
  const dict = translations[lang] || translations.en;
  document.documentElement.lang = lang === "tl" ? "fil" : "en";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });

  document.querySelectorAll(".lang-opt").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function i18nSet(lang) {
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  i18nApply(lang);
  document.dispatchEvent(new CustomEvent("i18nchange", { detail: { lang } }));
}

window.translations = translations;
window.i18nGetLang = i18nGetLang;
window.i18nApply = i18nApply;
window.i18nSet = i18nSet;

document.addEventListener("DOMContentLoaded", () => {
  i18nApply(i18nGetLang());

  document.querySelectorAll(".lang-opt").forEach(btn => {
    btn.addEventListener("click", () => i18nSet(btn.dataset.lang));
  });
});