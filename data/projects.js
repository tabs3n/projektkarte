// Einfach erweiterbar: neue Länder/Projekte hier anhängen.
// ISO-A3 Code (z.B. "DEU", "USA") verbindet mit dem Karten-TopoJSON.
window.PROJECT_DATA = [
  { iso: "DEU", name: "Deutschland", projects: [
    { title: "Messe-Installation München", city: "München", year: 2024, client: "AutoCorp", blurb: "Begehbares 360°-Erlebnis mit modularer LED-Architektur. Zentrale Brand-Zone für die IAA.", quote: "Ein echter Showstopper." },
    { title: "Pop-Up Store Berlin", city: "Berlin", year: 2023, client: "StreetLabel", blurb: "Drei-Wochen-Flagship im Mitte-Kiez. Fokus auf Community-Events und lokale Artists." }
  ]},
  { iso: "AUT", name: "Österreich", projects: [
    { title: "Wintergala Kitzbühel", city: "Kitzbühel", year: 2023, client: "AlpineBrand", blurb: "Gala-Dinner für 320 Gäste in einem ehemaligen Bergwerksstollen." }
  ]},
  { iso: "CHE", name: "Schweiz", projects: [
    { title: "Konferenz-Opening Zürich", city: "Zürich", year: 2024, client: "FinConf", blurb: "Inszenierte Keynote mit Live-Orchester und kinetischer Bühne." },
    { title: "Markenjubiläum Genf", city: "Genf", year: 2022, client: "HorloTech", blurb: "100-Jahr-Feier mit Archiv-Exposition." }
  ]},
  { iso: "FRA", name: "Frankreich", projects: [
    { title: "Paris Fashion Week Aktivierung", city: "Paris", year: 2025, client: "Maison R.", blurb: "Immersiver Runway mit Duft-Choreografie." },
    { title: "Lyon Food Summit", city: "Lyon", year: 2023, client: "GastroUnion", blurb: "Kuratiertes Chef-Forum mit 14 Live-Kitchen-Stationen." }
  ]},
  { iso: "ESP", name: "Spanien", projects: [
    { title: "Barcelona Brand Camp", city: "Barcelona", year: 2024, client: "SurfCo", blurb: "Strand-Festival mit Pro-Athletes und Musik-Lineup." }
  ]},
  { iso: "PRT", name: "Portugal", projects: [
    { title: "Lissabon Launch Event", city: "Lissabon", year: 2023, client: "TechStart", blurb: "Produkt-Launch auf einem Rooftop über dem Tejo." }
  ]},
  { iso: "ITA", name: "Italien", projects: [
    { title: "Milano Design Week", city: "Mailand", year: 2025, client: "StudioNero", blurb: "Installation im Brera-Viertel mit interaktiver Materialbibliothek." },
    { title: "Venedig Biennale Side-Event", city: "Venedig", year: 2024, client: "ArtFund", blurb: "Kuratierter Empfang in einem Palazzo am Canal Grande." }
  ]},
  { iso: "GBR", name: "Vereinigtes Königreich", projects: [
    { title: "London Summit", city: "London", year: 2024, client: "CityBank", blurb: "Executive-Gipfel mit dedizierter Networking-App." },
    { title: "Manchester Launch", city: "Manchester", year: 2023, client: "NorthTech", blurb: "Hardware-Reveal in einer umgebauten Baumwollspinnerei." }
  ]},
  { iso: "IRL", name: "Irland", projects: [
    { title: "Dublin Community Weekend", city: "Dublin", year: 2022, client: "GreenLabel", blurb: "Zweitägiges Open-House mit lokalen Partnern." }
  ]},
  { iso: "NLD", name: "Niederlande", projects: [
    { title: "Amsterdam Design Talk", city: "Amsterdam", year: 2024, client: "StudioBlue", blurb: "Paneldiskussion mit Pop-Up-Ausstellung." }
  ]},
  { iso: "BEL", name: "Belgien", projects: [
    { title: "Brüssel Policy Forum", city: "Brüssel", year: 2023, client: "EU-NGO", blurb: "Zweitägiges Stakeholder-Forum im EU-Viertel." }
  ]},
  { iso: "DNK", name: "Dänemark", projects: [
    { title: "Kopenhagen Sustainability Week", city: "Kopenhagen", year: 2024, client: "NordicEco", blurb: "CO₂-neutrale Konferenz mit Hafen-Aktivierung." }
  ]},
  { iso: "SWE", name: "Schweden", projects: [
    { title: "Stockholm Music Nights", city: "Stockholm", year: 2023, client: "NordLabel", blurb: "Drei Abende in historischen Hallen." }
  ]},
  { iso: "NOR", name: "Norwegen", projects: [
    { title: "Oslo Fjord Retreat", city: "Oslo", year: 2022, client: "BoardCo", blurb: "Executive-Retreat auf einer privaten Insel." }
  ]},
  { iso: "FIN", name: "Finnland", projects: [
    { title: "Helsinki Tech Expo", city: "Helsinki", year: 2025, client: "ArcticTech", blurb: "B2B-Messe mit 40 ausstellenden Startups." }
  ]},
  { iso: "POL", name: "Polen", projects: [
    { title: "Warschau Brand Day", city: "Warschau", year: 2023, client: "CentralCo", blurb: "Eintägiges Partner-Event im Kulturpalast." }
  ]},
  { iso: "CZE", name: "Tschechien", projects: [
    { title: "Prag Roadshow-Stopp", city: "Prag", year: 2024, client: "EuroMotors", blurb: "Teil einer 6-Städte-Tour." }
  ]},
  { iso: "GRC", name: "Griechenland", projects: [
    { title: "Athen Summer Summit", city: "Athen", year: 2023, client: "MedGroup", blurb: "Rooftop-Konferenz mit Akropolis-Blick." }
  ]},
  { iso: "TUR", name: "Türkei", projects: [
    { title: "Istanbul Launch", city: "Istanbul", year: 2024, client: "BosphorusCo", blurb: "Cross-continental Produkt-Launch." }
  ]},
  { iso: "ARE", name: "VAE", projects: [
    { title: "Dubai Expo Pavilion", city: "Dubai", year: 2023, client: "GlobalMining", blurb: "Sechs-Monats-Pavillon mit täglichem Programm." },
    { title: "Abu Dhabi Gala", city: "Abu Dhabi", year: 2024, client: "RoyalFund", blurb: "Eröffnungs-Gala eines Kulturkomplexes." }
  ]},
  { iso: "SAU", name: "Saudi-Arabien", projects: [
    { title: "Riad Future Forum", city: "Riad", year: 2025, client: "VisionCo", blurb: "Drei-Tages-Forum mit 2.000 Delegierten." }
  ]},
  { iso: "ISR", name: "Israel", projects: [
    { title: "Tel Aviv Tech Night", city: "Tel Aviv", year: 2023, client: "StartupNation", blurb: "VC- und Founder-Networking-Event." }
  ]},
  { iso: "EGY", name: "Ägypten", projects: [
    { title: "Kairo Produkt-Premiere", city: "Kairo", year: 2022, client: "NileBrand", blurb: "Markteintritts-Event mit regionalen Partnern." }
  ]},
  { iso: "ZAF", name: "Südafrika", projects: [
    { title: "Cape Town Creative Week", city: "Kapstadt", year: 2024, client: "AfroCreative", blurb: "Eine Woche Design, Musik und Film." }
  ]},
  { iso: "KEN", name: "Kenia", projects: [
    { title: "Nairobi Impact Summit", city: "Nairobi", year: 2023, client: "ImpactFund", blurb: "NGO-Gipfel mit Fokus auf East-Africa-Tech." }
  ]},
  { iso: "IND", name: "Indien", projects: [
    { title: "Mumbai Brand Festival", city: "Mumbai", year: 2024, client: "IndiaGroup", blurb: "Drei-Tage-Festival mit Bollywood-Kollab." },
    { title: "Bangalore Dev Con", city: "Bangalore", year: 2023, client: "DevPlatform", blurb: "Entwickler-Konferenz mit 5.000 Teilnehmern." }
  ]},
  { iso: "CHN", name: "China", projects: [
    { title: "Shanghai Auto Show", city: "Shanghai", year: 2024, client: "E-Mobility Co", blurb: "Markenstand auf der Auto Shanghai." },
    { title: "Peking Jubiläum", city: "Peking", year: 2022, client: "HeritageBrand", blurb: "50-Jahr-Feier mit kultureller Programmierung." }
  ]},
  { iso: "JPN", name: "Japan", projects: [
    { title: "Tokyo Flagship Opening", city: "Tokio", year: 2025, client: "LuxLabel", blurb: "Eröffnung eines neuen Flagship-Stores in Ginza." },
    { title: "Kyoto Artist Residency", city: "Kyoto", year: 2023, client: "ArtFund", blurb: "Vierwöchiges Residency-Programm." }
  ]},
  { iso: "KOR", name: "Südkorea", projects: [
    { title: "Seoul Beauty Launch", city: "Seoul", year: 2024, client: "K-Beauty Inc.", blurb: "Launch mit K-Pop-Kollaboration." }
  ]},
  { iso: "SGP", name: "Singapur", projects: [
    { title: "Singapur Fintech Week", city: "Singapur", year: 2024, client: "APAC Bank", blurb: "Hauptbühne und Aktivierungs-Lounge." }
  ]},
  { iso: "AUS", name: "Australien", projects: [
    { title: "Sydney Harbour Event", city: "Sydney", year: 2023, client: "OzBrand", blurb: "Event auf einem gecharterten Katamaran." }
  ]},
  { iso: "USA", name: "USA", projects: [
    { title: "New York Launch", city: "New York", year: 2025, client: "EastCo", blurb: "Produkt-Launch mit Skyline-Location in Brooklyn." },
    { title: "SXSW Austin Aktivierung", city: "Austin", year: 2024, client: "SouthTech", blurb: "Multi-Venue Takeover während SXSW." },
    { title: "LA Premiere", city: "Los Angeles", year: 2023, client: "StudioWest", blurb: "Film-Premiere mit After-Party in Downtown LA." }
  ]},
  { iso: "CAN", name: "Kanada", projects: [
    { title: "Toronto Summit", city: "Toronto", year: 2024, client: "NorthCo", blurb: "Nordamerika-HQ Eröffnung." }
  ]},
  { iso: "BRA", name: "Brasilien", projects: [
    { title: "São Paulo Brand Week", city: "São Paulo", year: 2023, client: "LatamCo", blurb: "Regionale Marken-Aktivierung." },
    { title: "Rio Launch", city: "Rio de Janeiro", year: 2024, client: "BeachCo", blurb: "Strand-Event mit lokalen DJs." }
  ]},
  { iso: "MEX", name: "Mexiko", projects: [
    { title: "Mexico City Pop-Up", city: "Mexico City", year: 2023, client: "AmericasCo", blurb: "Vier-Wochen Pop-Up in Roma Norte." }
  ]},
  { iso: "ARG", name: "Argentinien", projects: [
    { title: "Buenos Aires Tango Night", city: "Buenos Aires", year: 2022, client: "WineHouse", blurb: "Kulturabend mit Winzer-Tasting." }
  ]}
];
