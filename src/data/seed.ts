import { normalizeResourceMapping } from "@/lib/planning/resources";
import type { Employee, Resource } from "@/types/planning";

export const employees: Employee[] = [
  {
    id: "employee-luc-van-den-acker",
    firstName: "Luc Van Den Acker",
    lastName: "",
    name: "Luc Van Den Acker",
    category: "Werknemer",
    sortOrder: 1,
    isDefaultVisible: true
  },
  {
    id: "employee-henri-stevens",
    firstName: "Henri Stevens",
    lastName: "",
    name: "Henri Stevens",
    category: "Werknemer",
    sortOrder: 2,
    isDefaultVisible: true
  },
  {
    id: "employee-michel-verhoeven",
    firstName: "Michel Verhoeven",
    lastName: "",
    name: "Michel Verhoeven",
    category: "Werknemer",
    sortOrder: 3,
    isDefaultVisible: true
  },
  {
    id: "employee-arno-de-bleser",
    firstName: "Arno De Bleser",
    lastName: "",
    name: "Arno De Bleser",
    category: "Werknemer",
    sortOrder: 4,
    isDefaultVisible: true
  },
  {
    id: "employee-wim-van-riet",
    firstName: "Wim Van Riet",
    lastName: "",
    name: "Wim Van Riet",
    category: "Zelfstandige",
    sortOrder: 5,
    isDefaultVisible: true
  },
  {
    id: "employee-felix-schelfhout",
    firstName: "Felix Schelfhout",
    lastName: "",
    name: "Felix Schelfhout",
    category: "Zelfstandige",
    sortOrder: 6,
    isDefaultVisible: true
  },
  {
    id: "employee-eric-maes",
    firstName: "Eric Maes",
    lastName: "",
    name: "Eric Maes",
    category: "Flexi-job",
    sortOrder: 7,
    isDefaultVisible: true
  },
  {
    id: "employee-jan-van-ranst",
    firstName: "Jan Van Ranst",
    lastName: "",
    name: "Jan Van Ranst",
    category: "Flexi-job",
    sortOrder: 8,
    isDefaultVisible: true
  },
  {
    id: "employee-sem-lambrechts",
    firstName: "Sem Lambrechts",
    lastName: "",
    name: "Sem Lambrechts",
    category: "Zelfstandige",
    sortOrder: 9,
    isDefaultVisible: true
  },
  {
    id: "employee-marc-moens",
    firstName: "Marc Moens",
    lastName: "",
    name: "Marc Moens",
    category: "Zelfstandige",
    sortOrder: 10,
    isDefaultVisible: false
  },
  {
    id: "employee-kim-jacobs",
    firstName: "Kim Jacobs",
    lastName: "",
    name: "Kim Jacobs",
    category: "Zelfstandige",
    sortOrder: 11,
    isDefaultVisible: false
  },
  {
    id: "employee-de-wit-bert",
    firstName: "Bert De Wit",
    lastName: "",
    name: "Bert De Wit",
    category: "Zelfstandige",
    sortOrder: 12,
    isDefaultVisible: false
  },
  {
    id: "employee-kris-van-de-woestyne",
    firstName: "Kris Van de Woestyne",
    lastName: "",
    name: "Kris Van de Woestyne",
    category: "Zelfstandige",
    sortOrder: 13,
    isDefaultVisible: false
  },
  {
    id: "employee-stan-van-de-woestyne",
    firstName: "Stan Van De Woestyne",
    lastName: "",
    name: "Stan Van De Woestyne",
    category: "Zelfstandige",
    sortOrder: 14,
    isDefaultVisible: false
  },
  {
    id: "employee-vincent-verhoeven",
    firstName: "Vincent Verhoeven",
    lastName: "",
    name: "Vincent Verhoeven",
    category: "Zelfstandige",
    sortOrder: 15,
    isDefaultVisible: false
  },
  {
    id: "employee-sablon-philip",
    firstName: "Philip Sablon",
    lastName: "",
    name: "Philip Sablon",
    category: "Zelfstandige",
    sortOrder: 16,
    isDefaultVisible: false
  },
  {
    id: "employee-bram-de-coster",
    firstName: "Bram De Coster",
    lastName: "",
    name: "Bram De Coster",
    category: "Werknemer, bureau",
    sortOrder: 17,
    isDefaultVisible: true
  },
  {
    id: "employee-mickael-kestemont",
    firstName: "Mickaël Kestemont",
    lastName: "",
    name: "Mickaël Kestemont",
    category: "Werknemer, bureau",
    sortOrder: 18,
    isDefaultVisible: true
  },
  {
    id: "employee-kim-swinnen",
    firstName: "Kim Swinnen",
    lastName: "",
    name: "Kim Swinnen",
    category: "Werknemer, bureau",
    sortOrder: 19,
    isDefaultVisible: true
  },
  {
    id: "employee-ronny-lambrechts",
    firstName: "Ronny Lambrechts",
    lastName: "",
    name: "Ronny Lambrechts",
    category: "Werknemer, bureau",
    sortOrder: 20,
    isDefaultVisible: true
  },
  {
    id: "employee-thomas-de-bleser",
    firstName: "Thomas De Bleser",
    lastName: "",
    name: "Thomas De Bleser",
    category: "Werknemer, bureau",
    sortOrder: 21,
    isDefaultVisible: true
  },
  {
    id: "employee-raymond-leroy",
    firstName: "Raymond Leroy",
    lastName: "",
    name: "Raymond Leroy",
    category: "Flexi-job",
    sortOrder: 22,
    isDefaultVisible: false
  },
  {
    id: "employee-de-smet-jonathan",
    firstName: "Jonathan De Smet",
    lastName: "",
    name: "Jonathan De Smet",
    category: "Flexi-job",
    sortOrder: 23,
    isDefaultVisible: false
  },
  {
    id: "employee-hoofd-stef",
    firstName: "Stef Hoofd",
    lastName: "",
    name: "Stef Hoofd",
    category: "Flexi-job",
    sortOrder: 24,
    isDefaultVisible: false
  },
  {
    id: "employee-hermans-jelle",
    firstName: "Jelle Hermans",
    lastName: "",
    name: "Jelle Hermans",
    category: "Flexi-job",
    sortOrder: 25,
    isDefaultVisible: false
  },
  {
    id: "employee-de-landtsheer-sander",
    firstName: "Sander De Landtsheer",
    lastName: "",
    name: "Sander De Landtsheer",
    category: "Flexi-job",
    sortOrder: 26,
    isDefaultVisible: false
  },
  {
    id: "employee-vandendriessche-rens",
    firstName: "Rens Vandendriessche",
    lastName: "",
    name: "Rens Vandendriessche",
    category: "Flexi-job",
    sortOrder: 27,
    isDefaultVisible: false
  },
  {
    id: "employee-goossens-dries",
    firstName: "Dries Goossens",
    lastName: "",
    name: "Dries Goossens",
    category: "Flexi-job",
    sortOrder: 28,
    isDefaultVisible: false
  },
  {
    id: "employee-van-lent-sam",
    firstName: "Sam Van Lent",
    lastName: "",
    name: "Sam Van Lent",
    category: "Flexi-job",
    sortOrder: 29,
    isDefaultVisible: false
  },
  {
    id: "employee-carine-borms",
    firstName: "Carine Borms",
    lastName: "",
    name: "Carine Borms",
    category: "Flexi-job",
    sortOrder: 30,
    isDefaultVisible: false
  },
  {
    id: "employee-frans-de-bleser",
    firstName: "Frans De Bleser",
    lastName: "",
    name: "Frans De Bleser",
    category: "Flexi-job",
    sortOrder: 31,
    isDefaultVisible: false
  },
  {
    id: "employee-michiel-maes",
    firstName: "Michiel Maes",
    lastName: "",
    name: "Michiel Maes",
    category: "Vakantiejob",
    sortOrder: 33,
    isDefaultVisible: false
  }
];

export const resources: Resource[] = [
  normalizeResourceMapping({
    number: "0512-KMB-",
    description: "Dennis G860",
    brand: "Dennis",
    type: "G860"
  }),
  normalizeResourceMapping({
    number: "0511-VCB-",
    description: "Nissan Townstar",
    brand: "Nissan",
    type: "Townstar"
  }),
  normalizeResourceMapping({
    number: "0510-VCB-",
    description: "Volkswagen Crafter",
    brand: "Volkswagen",
    type: "Crafter"
  }),
  normalizeResourceMapping({
    number: "0509-VPW-",
    description: "Volvo EX90",
    brand: "Volvo",
    type: "EX90"
  }),
  normalizeResourceMapping({
    number: "0508-KMH-",
    description: "Egalisatieschijf",
    brand: "StrakVlak",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0507-TAL-",
    description: "Spin Rake",
    brand: "Spin Turf Machinery",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0506-KMH-",
    description: "Belijningskar",
    brand: "Footline",
    type: "Classic 100"
  }),
  normalizeResourceMapping({
    number: "0505-WHM-",
    description: "Heftruck",
    brand: "Manitou",
    type: "ME 425 C"
  }),
  normalizeResourceMapping({
    number: "0504-KM2T-",
    description: "Bladblazer",
    brand: "Maruyama",
    type: "BL8200SP(CE)"
  }),
  normalizeResourceMapping({
    number: "0503-WHM-",
    description: "Verwarmer",
    brand: "Master",
    type: "XL9S INFRAROOD"
  }),
  normalizeResourceMapping({
    number: "0502-WHM-",
    description: "Hogedrukreiniger",
    brand: "Kränzle",
    type: "WARM WATER THERM 1017"
  }),
  normalizeResourceMapping({
    number: "0501-KMH-",
    description: "Precisiestrooier",
    brand: "Gandy",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0500-KM2T-",
    description: "Slijpschijf op motor",
    brand: "Husqvarna",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0499-KMB-",
    description: "Grondboor",
    brand: "Stihl",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0498-TSL-",
    description: "Sleep drainagevuller",
    brand: "AVS",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0497-KM2T-",
    description: "Kettingzaag",
    brand: "Stihl",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0496-KM2T-",
    description: "Bosmaaier/combimotor",
    brand: "Stihl",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0495-KMB-",
    description: "Handmaaier met rol honda",
    brand: "Honda",
    type: "HRH 536K QX BENZINE"
  }),
  normalizeResourceMapping({
    number: "0494-KMB-",
    description: "Handmaaier met rol honda",
    brand: "Honda",
    type: "HRH 536K QX BENZINE"
  }),
  normalizeResourceMapping({
    number: "0493-KMB-",
    description: "Handmaaier 4 wielen honda",
    brand: "Honda",
    type: "HRH 536K HX BENZINE"
  }),
  normalizeResourceMapping({
    number: "0492-KMB-",
    description: "Handmaaier met rol honda",
    brand: "Honda",
    type: "HRH 536K QX BENZINE"
  }),
  normalizeResourceMapping({
    number: "0491-KMB-",
    description: "Handmaaier met rol honda",
    brand: "Honda",
    type: "HRH 536K QX BENZINE"
  }),
  normalizeResourceMapping({
    number: "0490-KMB-",
    description: "Handmaaier met rol honda",
    brand: "Honda",
    type: "HRH 536K QX BENZINE"
  }),
  normalizeResourceMapping({
    number: "0489-VCB-",
    description: "Volkswagen Crafter",
    brand: "Volkswagen",
    type: "Crafter"
  }),
  normalizeResourceMapping({
    number: "0488-EXT-",
    description: "Dennis ES-860 cylindermaaier met volgzit (Gemeente Beveren)",
    brand: "Dennis",
    type: "ES-860"
  }),
  normalizeResourceMapping({
    number: "0487-EXT-",
    description: "Ransomes Mastiff met volgzit (Gemeente Beveren)",
    brand: "Ransomes",
    type: "Mastiff"
  }),
  normalizeResourceMapping({
    number: "0486-KMB-",
    description: "Ferris Zero Turn Mower",
    brand: "Ferris",
    type: "ISX 800"
  }),
  normalizeResourceMapping({
    number: "0485-KMA-",
    description: "Grasmaaier Stihl RMA 765 V",
    brand: "Stihl",
    type: "RMA 765 V"
  }),
  normalizeResourceMapping({
    number: "0484-KMA-",
    description: "Grasmaaier Stihl RMA 765 V",
    brand: "Stihl",
    type: "RMA 765 V"
  }),
  normalizeResourceMapping({
    number: "0483-VCO-",
    description: "Plateau container",
    type: "Technicas"
  }),
  normalizeResourceMapping({
    number: "0482-KMB-",
    description: "Handmaaier met rol honda",
    brand: "Honda",
    type: "HRH 536K QX"
  }),
  normalizeResourceMapping({
    number: "0481-KMB-",
    description: "Handmaaier met rol honda",
    brand: "Honda",
    type: "HRH 536K QX"
  }),
  normalizeResourceMapping({
    number: "0480-TAL-",
    description: "Rotoregde",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0479-HAS-",
    description: "Dubbele rolcart robot beregener",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0478-WST-",
    description: "Update machine +stroomunit",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0474-TAL-",
    description: "Spin rake",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0472-VAL",
    description: "Aanhangwagen",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0471-TAL-",
    description: "Pendelstrooier Vicon",
    brand: "Vicon",
    type: "VNPS604H"
  }),
  normalizeResourceMapping({
    number: "0470-VPW-",
    description: "Volvo XC40",
    brand: "Volvo",
    type: "XC40"
  }),
  normalizeResourceMapping({
    number: "0469-KM2T",
    description: "Zaagmachien",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0468-VAZ-",
    description: "Drieassige dieplader (wipkar )",
    brand: "Dezeure",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0467-WHM-",
    description: "Vetspuit op accu",
    brand: "Dewalt",
    type: "dcgg57"
  }),
  normalizeResourceMapping({
    number: "0466-WHM-",
    description: "Stofzuiger",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0465-WHM-",
    description: "Compresor mekanieker",
    brand: "FINI",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0464-KMB-",
    description: "Zodensnijder",
    brand: "Classen",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0463-KMA-",
    description: "Haagschaar Stihl",
    brand: "Stihl",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0462-KMB-",
    description: "Haagschaar",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0461-KM2T",
    description: "Combimotor",
    brand: "stihl",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0460-HST",
    description: "Spindelstatief",
    brand: "Nestle",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0459-KMA-",
    description: "Haakse schroefmachine dewalt",
    brand: "DEAWALT",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0458-TAL-",
    description: "Diepwoeler doelgebieden avs",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0457-KMB-",
    description: "Grasmaaier sabo 54",
    brand: "sabo",
    type: "vario 54"
  }),
  normalizeResourceMapping({
    number: "0456-TVE-",
    description: "Vertidrain mustang 7117 WD 15 CM WB 170",
    brand: "REDEXIM",
    type: "mustang 7117"
  }),
  normalizeResourceMapping({
    number: "0455-VVC-",
    description: "Volvo FM Containervrachtwagen",
    brand: "Volvo",
    type: "FM"
  }),
  normalizeResourceMapping({
    number: "0454-KRA-",
    description: "Sunward 20F",
    brand: "Sunward",
    type: "20F"
  }),
  normalizeResourceMapping({
    number: "0453-MR3-",
    description: "3 Delige rotatieve maaier 350 cm werkbreedte met cabine",
    brand: "John Deere",
    type: "Wam 1600 turbo"
  }),
  normalizeResourceMapping({
    number: "0452-VPW-",
    description: "Volvo V90 R - T8 AWD plug-in hybrid",
    brand: "VOLVO",
    type: "V90"
  }),
  normalizeResourceMapping({
    number: "0451-KRA-",
    description: "CASE CX60 Minigraver",
    brand: "CASE",
    type: "CX60 C CAB"
  }),
  normalizeResourceMapping({
    number: "0451-HST-",
    description: "Hydraulische kantelbak",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0450-KMB-",
    description: "Gazonmaaier Toro Timemaster",
    brand: "Toro",
    type: "Timemaster 20977"
  }),
  normalizeResourceMapping({
    number: "0449-TAL-",
    description: "Optimer",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0448-TDU-",
    description: "Kipwagen met schoven",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0447-WHM-",
    description: "Hogedrukreiniger Karcher",
    brand: "KARCHER",
    type: "HDS 6/14-4 CX"
  }),
  normalizeResourceMapping({
    number: "0446-MR3-",
    description: "3 Delige rotatieve maaier 350 cm werkbreedte met cabine",
    brand: "John Deere",
    type: "Wam 1600 turbo"
  }),
  normalizeResourceMapping({
    number: "0445-TRL-",
    description: "TRAKTOR CASE IH FARMALL 100",
    brand: "CASE IH",
    type: "FARMALL 100 C 1.5 STAGE V - SIC319274"
  }),
  normalizeResourceMapping({
    number: "0444-TRL-",
    description: "TRAKTOR CASE IH FARMALL 100",
    brand: "CASE IH",
    type: "FARMALL 100 C 1. STAGE V - SIC319275"
  }),
  normalizeResourceMapping({
    number: "0443-KMA-",
    description: "Dennis accu stadionmaaier",
    brand: "Dennis",
    type: "ES-34R"
  }),
  normalizeResourceMapping({
    number: "0442-TMA-",
    description: "Hydraulische palenmaaier Agrimaster",
    brand: "Agrimaster",
    type: "Olivia X60"
  }),
  normalizeResourceMapping({
    number: "0441-TSL-",
    description: "Sleep piste Equitech",
    brand: "Equitech",
    type: "PM Multi 200 cms ID M200 0429"
  }),
  normalizeResourceMapping({
    number: "0440-WHM-",
    description: "Schroefcompressor APS 7.5 BASIC -ITJ421413-I2003119",
    type: "Schroefcompressor APS 7.5 BASIC -ITJ421413-I2003119"
  }),
  normalizeResourceMapping({
    number: "0439-VPW-",
    description: "Opel Grandland X Ultimate",
    brand: "Opel",
    type: "Grandland X Ultimate"
  }),
  normalizeResourceMapping({
    number: "0438-MC5-",
    description: "5 Delige cylindermaaier 350 cm werkbreedte jumbo",
    brand: "John Deere",
    type: "1905 4WD"
  }),
  normalizeResourceMapping({
    number: "0437-TDU-",
    description: "SP400 Sandspreader GKB",
    brand: "GKB",
    type: "SP400"
  }),
  normalizeResourceMapping({
    number: "0436-VPW-",
    description: "VOLVO V60",
    brand: "VOLVO",
    type: "V60 Momentum Pro D3"
  }),
  normalizeResourceMapping({
    number: "0435-VVC-",
    description: "DAF TREKKER DIEPLADER C+E",
    brand: "DAF",
    type: "XF 440"
  }),
  normalizeResourceMapping({
    number: "0433-TAL-",
    description: "KORO FIELDTOPMAKER 2.0",
    brand: "KORO",
    type: "FTM 2.0"
  }),
  normalizeResourceMapping({
    number: "0432-KMB-",
    description: "Lumag LVS-30GX Trilstamper",
    brand: "LUMAG",
    type: "LVS-30GX"
  }),
  normalizeResourceMapping({
    number: "0431-TRS-",
    description: "SMALSPOORTRACTOR T4.100 F CAB",
    brand: "NEW HOLLAND",
    type: "T4.100 F CAB"
  }),
  normalizeResourceMapping({
    number: "0430-KMA-",
    description: "Accu kettingzaag Stihl",
    brand: "STIHL",
    type: "MSA140 C-BQ"
  }),
  normalizeResourceMapping({
    number: "0429-VAZ-",
    description: "Aanhangwagen 3500 kg Brian James",
    brand: "Brian James",
    type: "T-02-T"
  }),
  normalizeResourceMapping({
    number: "0428-LAS-",
    description: "DUBBELE HELLINGSLASER GL722/DAGPRIJS",
    brand: "SPECTRA",
    type: "GL722"
  }),
  normalizeResourceMapping({
    number: "0427-TRL-",
    description: "LANDBOUWTRAKTOR VESTRUM 120 CVX",
    brand: "CASE IH",
    type: "VESTRUM 120 CVX"
  }),
  normalizeResourceMapping({
    number: "0426-TRL-",
    description: "LANDBOUWTRAKTOR VESTRUM 120 CVX",
    brand: "CASE IH",
    type: "VESTRUM 120 CVX"
  }),
  normalizeResourceMapping({
    number: "0425-KMB-",
    description: "Honda UMS 425E1 LNET Bosmaaier",
    brand: "HONDA",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0424-KMB-",
    description: "Dennis Pro 34 rotatieve stadionmaaier",
    brand: "DENNIS",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0423-TVE-",
    description: "Vertidrain verluchter 40/260",
    brand: "VERTIDRAIN",
    type: "7626"
  }),
  normalizeResourceMapping({
    number: "0422-TVE-",
    description: "Vertidrain verluchter 40/260",
    brand: "VERTIDRAIN",
    type: "7626"
  }),
  normalizeResourceMapping({
    number: "0421-TVE-",
    description: "Vertidrain verluchter 40/260",
    brand: "VERTIDRAIN",
    type: "7626"
  }),
  normalizeResourceMapping({
    number: "0419-WST",
    description: "LSM machine",
    brand: "LSM",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0418-VAZ-",
    description: "Aanhangwagen 3500 KG Brian James",
    brand: "Brian James",
    type: "T-02-T"
  }),
  normalizeResourceMapping({
    number: "0417-TDO-",
    description: "GEDRAGEN DOORZAAIMACHINE VREDO",
    brand: "VREDO",
    type: "DUBBEL DIEPTE"
  }),
  normalizeResourceMapping({
    number: "0415-MR1-",
    description: "Rotatieve frontmaaier met opvangbak werkbreedte 155 cm",
    brand: "GRILLO",
    type: "FD2200"
  }),
  normalizeResourceMapping({
    number: "0414-HAS-",
    description: "KLEINE KABEL BEREGENINGS HASPEL",
    brand: "REMO",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0413-HAS-",
    description: "KLEINE KABEL BEREGENINGS HASPEL",
    brand: "REMO",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0411-WST-",
    description: "Transportband",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0409-KMB-",
    description: "VERTICUTEERDER WB 50CM LOSSE MESSEN",
    brand: "BILLY GOAT PR550H",
    type: "vericuteerder losse messen"
  }),
  normalizeResourceMapping({
    number: "0408-KMD-",
    description: "NIBBI MOTOCULTEUR 18 PK + ROTOREG WB 100 CM",
    brand: "NIBBI",
    type: "NIBBI + GAMO"
  }),
  normalizeResourceMapping({
    number: "0406-BWI-",
    description: "UNICO CONTAINER 2.50 X 6 METER",
    brand: "UNIKO",
    type: "BUREELCONTAINER"
  }),
  normalizeResourceMapping({
    number: "0403-MC5-",
    description: "5 Delige cylindermaaier 350 cm werkbreedte",
    brand: "JOHN DEERE",
    type: "1905 4WD"
  }),
  normalizeResourceMapping({
    number: "0402-MC5-",
    description: "5 Delige cylindermaaier 350 cm werkbreedte",
    brand: "JOHN DEERE",
    type: "1905 4WD"
  }),
  normalizeResourceMapping({
    number: "0400-TAL-",
    description: "MASCHIO FREES WB250",
    brand: "MASCHIO",
    type: "C250 MASCIO"
  }),
  normalizeResourceMapping({
    number: "0399-TRL-",
    description: "LANDBOUWTRACTOR CASE IH Puma 165CVX",
    brand: "CASE IH",
    type: "CVX 165"
  }),
  normalizeResourceMapping({
    number: "0397-KRA-",
    description: "GRAAFKRAAN 13 TON STAALRUPS",
    brand: "CASE",
    type: "CASE CX 130 D"
  }),
  normalizeResourceMapping({
    number: "0396-LAS-",
    description: "HELLINGSLASER+ONTVANGER",
    brand: "SPECTRA",
    type: "HELLINGS SPECTRA GL422N"
  }),
  normalizeResourceMapping({
    number: "0395-VCB-",
    description: "GESLOTEN CAMIONET DUBBEL CAB B",
    brand: "FIAT",
    type: "DUCATO CREWCAB 35 LH2 2.3 JTD 130 E6"
  }),
  normalizeResourceMapping({
    number: "0392-TAL-",
    description: "kilverbord lasergestuurd mecos inclusief 2 ontvangers getrokken en of gedragen",
    brand: "MECOS",
    type: "Mekos kilver"
  }),
  normalizeResourceMapping({
    number: "0391-TMA-",
    description: "Klepelmaaier werkbreedte 280 cm met sideschift",
    brand: "Masio",
    type: "klepelmaaier Mascio 280cm"
  }),
  normalizeResourceMapping({
    number: "0389-TRL-",
    description: "LANDBOUWTRAKTOR FARMALL 95 PK + FL",
    brand: "CASE IH",
    type: "FARMALL 95U"
  }),
  normalizeResourceMapping({
    number: "0389-HST-",
    description: "Frontaftakas gemonteerd op 0389 TRL",
    type: "Kit Frontaftakas"
  }),
  normalizeResourceMapping({
    number: "0388 TAL",
    description: "Versnipperaar TV2026P",
    brand: "Van Dale",
    type: "Versnipperraar TV2026P"
  }),
  normalizeResourceMapping({
    number: "0383-TAL-",
    description: "WIEDEG TROOSTWIJK",
    brand: "troostwijk",
    type: "Jacobs WE180 wiedeg"
  }),
  normalizeResourceMapping({
    number: "0381-MR3-",
    description: "3 Delige rotatieve maaier 350 cm werkbreedte",
    brand: "John Deere",
    type: "Wam 1600 turbo"
  }),
  normalizeResourceMapping({
    number: "0380-VPW-",
    description: "AUDI A6 ALLROAD FRANS",
    brand: "AUDI",
    type: "A6 ALLROAD QUATTRO"
  }),
  normalizeResourceMapping({
    number: "0374-TMA-",
    description: "GEDRAGEN ROTATIEVE ROLLENMAAIER WB 240 cm",
    brand: "MAJOR",
    type: "MJ 70-240 CM rOLLER MAAIER"
  }),
  normalizeResourceMapping({
    number: "0372-KMB",
    description: "HANDMAAIER SABO 54 VARIO",
    brand: "Sabo",
    type: "Grasmaaier Sabo 54 Vario"
  }),
  normalizeResourceMapping({
    number: "0371-VGO-",
    description: "GATOR 855D 4X4",
    brand: "JOHN DEERE",
    type: "GATOR XUV 855 D 4X4"
  }),
  normalizeResourceMapping({
    number: "0369-VAL-",
    description: "AANHANGWAGEN",
    brand: "DELVAN",
    type: "Aanhangwagen + afdekzeil"
  }),
  normalizeResourceMapping({
    number: "0359-WHM-",
    description: "HEFTRUCK ACCU 2 TON",
    brand: "TOYOTA",
    type: "Forklift"
  }),
  normalizeResourceMapping({
    number: "0355-TRC-",
    description: "BUNKERREAKE GROOMMASTER",
    brand: "JACOBSEN",
    type: "BUNKERREEK"
  }),
  normalizeResourceMapping({
    number: "0347-TRC-",
    description: "COMPAKT TRAKTOR 50PK BOOMER",
    brand: "NEW HOLLAND",
    type: "BOOMER 50 HST"
  }),
  normalizeResourceMapping({
    number: "0344-TRC-",
    description: "COMPAKT TRAKTOR 3720 + CAB",
    brand: "JOHN DEERE",
    type: "3720 HST+CAB"
  }),
  normalizeResourceMapping({
    number: "0343-TDU-",
    description: "ZOCON KIPPER 4.5 TON",
    brand: "ZOCON",
    type: "ZOCON KIPPER 4.5 TON"
  }),
  normalizeResourceMapping({
    number: "0340-MC5-",
    description: "5 Delige cylindermaaier 350 cm werkbreedte jumbo",
    brand: "JOHN DEERE",
    type: "1905 4WD"
  }),
  normalizeResourceMapping({
    number: "0338-VCB-",
    description: "Gesloten camionet B",
    brand: "FIAT",
    type: "DUCATO MY 40 L-H 3,0 180 E5"
  }),
  normalizeResourceMapping({
    number: "0337-TRC-",
    description: "COMPAKT TRAKTOR 3720 + FL",
    brand: "JOHN DEERE",
    type: "3720 HST+FL"
  }),
  normalizeResourceMapping({
    number: "0331-KMT-",
    description: "BOSMAAIER",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0330-KME-",
    description: "ELEKTRICHE HAMER PKX7 PLUS TOEBEHOREN",
    brand: "DUSS",
    type: "PKX7"
  }),
  normalizeResourceMapping({
    number: "0327-TRB-",
    description: "AHLMAN LADER AZ45 V8",
    brand: "AHLMAN",
    type: "AZ45e ZWENKLADER"
  }),
  normalizeResourceMapping({
    number: "0324-TDO-",
    description: "GEDRAGEN DOORZAAIMACHINE BLEC",
    brand: "BLEC",
    type: "MULTI SEEDER"
  }),
  normalizeResourceMapping({
    number: "0323-KMD-",
    description: "MOTOCULTEUR 150 MD 190AE",
    brand: "VALPANDA BLITZ",
    type: "KMD04"
  }),
  normalizeResourceMapping({
    number: "0322-VGO-",
    description: "GATOR 6X4 DIESEL GAZONBANDEN",
    brand: "JOHN DEERE",
    type: "JDGA 6X4D"
  }),
  normalizeResourceMapping({
    number: "0320-TRC-",
    description: "COMPAKT TRAKTOR 3720",
    brand: "JOHN DEERE",
    type: "3720 HST"
  }),
  normalizeResourceMapping({
    number: "0318-VCC-",
    description: "Gesloten camionet C MICHEL",
    brand: "FIAT",
    type: "NEW DUCATO 40 L-LH2 3,0 JTD"
  }),
  normalizeResourceMapping({
    number: "0317-TAL-",
    description: "BLADBLAZER WIEDENMANN WHISOER TWISTER",
    brand: "WIEDENMANN",
    type: "WHISOER TWISTER"
  }),
  normalizeResourceMapping({
    number: "0316-TRS-",
    description: "SMALSPOORTRAKTOR 4X4 95PK + FL V21",
    brand: "NEW HOLLAND",
    type: "T4050 F 300 07 +frontlift"
  }),
  normalizeResourceMapping({
    number: "0315-TAL-",
    description: "TRANSPORTBAK TBL 180",
    type: "Transportbak TBL 180"
  }),
  normalizeResourceMapping({
    number: "0309-TRW-",
    description: "3 DELIGE MOTORWEL JACOBSEN",
    brand: "Van de woestijne",
    type: "TRW08-jacobsen"
  }),
  normalizeResourceMapping({
    number: "0308-TRS-",
    description: "SMALSPOORTREKKER 4X4 95PK + FL V20",
    brand: "NEW HOLLAND",
    type: "T4050F + frontlift"
  }),
  normalizeResourceMapping({
    number: "0307-TRS-",
    description: "SMALSPOORTREKKER + SPROEIER",
    brand: "STEYER",
    type: "STEYR COMPACT 4075"
  }),
  normalizeResourceMapping({
    number: "0306-TRB-",
    description: "WEIDEMAN WIELLADER 1250CX35 V7",
    brand: "WEIDEMANN",
    type: "1250CX35"
  }),
  normalizeResourceMapping({
    number: "0305-TAL-",
    description: "AGRATOR FREES WB 210",
    brand: "AGRATOR",
    type: "TMA44 Type AR2100 AGRATOR FREES"
  }),
  normalizeResourceMapping({
    number: "0304-MC5-",
    description: "5 Delige cylindermaaier 350 cm werkbreedte",
    brand: "JOHN DEERE",
    type: "1905 4WD"
  }),
  normalizeResourceMapping({
    number: "0303-MC5-",
    description: "5 Delige cylindermaaier 350 cm werkbreedte",
    brand: "JOHN DEERE",
    type: "1905 4WD"
  }),
  normalizeResourceMapping({
    number: "0294-TDO-",
    description: "GEDRAGEN DOORZAAIMACHINE VREDO DZ SPORT",
    brand: "VREDO",
    type: "VREDO DOORZAAIMACHINE"
  }),
  normalizeResourceMapping({
    number: "0291-MC3-",
    description: "3 Delige cylindermaaier TR3 180 cm werkbreedte met opvangbakken TR3",
    brand: "JACOBSEN",
    type: "TR 3"
  }),
  normalizeResourceMapping({
    number: "0290-MC5 G-",
    description: "GOLF 5 Delige fairway cylindermaaier met groomers",
    brand: "JACOBSON",
    type: "LF3800 5"
  }),
  normalizeResourceMapping({
    number: "0289-MC3-",
    description: "Greensplex 3 Delige green maaier met groomers en opvangbakken",
    brand: "JACOBSON",
    type: "GREENPLEX"
  }),
  normalizeResourceMapping({
    number: "0288-WHM-",
    description: "HEFTRUCK DIESEL TCM",
    brand: "TCM",
    type: "FD25 Z1"
  }),
  normalizeResourceMapping({
    number: "0282-WHM-",
    description: "hogedrukreiniger dibo",
    brand: "dibo",
    type: "Levering HD reiniger"
  }),
  normalizeResourceMapping({
    number: "0280-TRW-",
    description: "3 DELIGE MOTORWEL JACOBSEN",
    brand: "Van de woestijne",
    type: "TRW06-jacobsen"
  }),
  normalizeResourceMapping({
    number: "0279-TRS-",
    description: "SMALSPOORTRAKTOR 4X4 95PK + FL V18",
    brand: "NEW HOLLAND",
    type: "TNF95FA + frontlift"
  }),
  normalizeResourceMapping({
    number: "0277-TSL-",
    description: "SLEEP GKB GEDRAAIDE BAREN",
    brand: "GKB",
    type: "Sleepraam"
  }),
  normalizeResourceMapping({
    number: "0275-TAL-",
    description: "KORO TOPFIELDMAKER FREES EN OF VERTICUTEERDER WB200",
    brand: "KORO",
    type: "FTM2000"
  }),
  normalizeResourceMapping({
    number: "0273-TDU-",
    description: "DAKOTA BEZANDINGSWAGEN Turf 414",
    brand: "DAKOTA",
    type: "DAKOTA 414"
  }),
  normalizeResourceMapping({
    number: "0272-TDU-",
    description: "DAKOTA BEZANDINGSWAGEN Turf 420",
    brand: "DAKOTA",
    type: "BEZANDINGSWAGEN DAKOTA 420"
  }),
  normalizeResourceMapping({
    number: "0268-MR3-",
    description: "3 Delige rotatieve maaier 260 cm werkbreedte",
    brand: "RANSOMES",
    type: "HR6010"
  }),
  normalizeResourceMapping({
    number: "0267-MC3-",
    description: "3 Delige cylindermaaier TR3 WB 180 met opvangbakken",
    brand: "JACOBSEN",
    type: "TR 3"
  }),
  normalizeResourceMapping({
    number: "0266-MC5-",
    description: "5 Delige cylindermaaier 350 cm werkbreedte",
    brand: "JOHN DEERE",
    type: "1905 4WD"
  }),
  normalizeResourceMapping({
    number: "0263-KMB-",
    description: "BILLY GOAT VERTICUTEERDER 50",
    brand: "BILLY GOAT",
    type: "VERTICUT PRO 50CM"
  }),
  normalizeResourceMapping({
    number: "0258 KMB",
    description: "Bladblazer 4-mix",
    brand: "STIHL",
    type: "BR 550"
  }),
  normalizeResourceMapping({
    number: "0256-VCO-",
    description: "CONTAINER MULTILIFT H80 L600",
    brand: "ONBEKEND",
    type: "VCO06 CONTAINER H80"
  }),
  normalizeResourceMapping({
    number: "0254-TRW-",
    description: "Bomag BW120AD TRILWALS",
    brand: "BOMAG",
    type: "BW 120 AD"
  }),
  normalizeResourceMapping({
    number: "0253-TRW-",
    description: "3 DELIGE MOTORWEL JACOBSEN",
    brand: "Van de woestijne",
    type: "TRW05-jacobsen"
  }),
  normalizeResourceMapping({
    number: "0252-TRS-",
    description: "SMALSPOORTRAKTOR 4X4 95PK + FL V16",
    brand: "NEW HOLLAND",
    type: "TNF95 + frontlift"
  }),
  normalizeResourceMapping({
    number: "0251-TRS-",
    description: "SMALSPOORTRAKTOR 4X4 95PK + FL V15",
    brand: "NEW HOLLAND",
    type: "TNF95 + frontlift"
  }),
  normalizeResourceMapping({
    number: "0249-TSL-",
    description: "UITVLAKSLEEP 440 CM V36",
    brand: "EIGEN CONSTRUCTIE",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0248-TSL-",
    description: "SLEEP 260CM MET ROL 30CM V33",
    brand: "EIGEN CONSTRUCTIE",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0247-TSL-",
    description: "SLEEP 260 CM MET ROL 30CM V32",
    brand: "EIGEN CONSTRUCTIE",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0246-MC5-",
    description: "5 Delige cylindermaaier 350 cm werkbreedte",
    brand: "JOHN DEERE",
    type: "1905 4WD"
  }),
  normalizeResourceMapping({
    number: "0237-VGO-",
    description: "TORO WORKMAN BEZANDER",
    brand: "TORO",
    type: "WORKMAN"
  }),
  normalizeResourceMapping({
    number: "0235-TSL-",
    description: "SLEEP 260 CM MET ROL 30CM V27",
    brand: "EIGEN CONSTRUCTIE",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0234-MC5-",
    description: "5 Delige cylindermaaier 350 cm werkbreedte",
    brand: "JOHN DEERE",
    type: "1905 4WD"
  }),
  normalizeResourceMapping({
    number: "0226-TAL-",
    description: "borstel-veertand combi KUNSTGRAS",
    brand: "EIGEN MAKELIJ",
    type: "SLEEP BORSTEL"
  }),
  normalizeResourceMapping({
    number: "0222-VAZ-",
    description: "DIEPLADER 1 ASSIG 10 TON",
    brand: "GHEYSEN VERPOORT",
    type: "KIPDIEPLADER 10 TON"
  }),
  normalizeResourceMapping({
    number: "0220-TRB-",
    description: "AHLMAN WIELLADER AZ45e V5",
    brand: "AHLMANN",
    type: "AZ45e"
  }),
  normalizeResourceMapping({
    number: "0219-TDU-",
    description: "DUMPER AANHANGWAGEN OP LAGEDRUK BANDEN 10 TON",
    brand: "RECORD KIPWAGEN 10T",
    type: "TMA25 S100L"
  }),
  normalizeResourceMapping({
    number: "0217-TMA-",
    description: "KLEPELMAAIER PERFECT ZW -210 CM",
    brand: "PERFECT",
    type: "KLEPEL MAAIER GRACHTEN"
  }),
  normalizeResourceMapping({
    number: "0216-TRC",
    description: "RANSOMES KANTENMAAIER",
    brand: "RANSOMES",
    type: "COMMANDER 3520"
  }),
  normalizeResourceMapping({
    number: "0215-MC5-",
    description: "5 Delige cylindermaaier 350 cm werkbreedte",
    brand: "JOHN DEERE",
    type: "1905 4WD"
  }),
  normalizeResourceMapping({
    number: "0208 TRW",
    description: "MOTORWEL PASQUALI",
    brand: "PASQUALI",
    type: "TRW04"
  }),
  normalizeResourceMapping({
    number: "0207-TSL-",
    description: "UITVLAKSLEEP 400 CM V26",
    brand: "EIGEN CONSTRUCTIE",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0206-TSL-",
    description: "SLEEP 260CM MET ROL 30CM V24",
    brand: "EIGEN CONSTRUCTIE",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0205-TAL-",
    description: "DIEPWOELER",
    brand: "EVERS",
    type: "TMA10 DIEPWOELER EVERS WB275"
  }),
  normalizeResourceMapping({
    number: "0200-TAL-",
    description: "ROTOREG LEMKEN ZIRKON + VERKRUIMELAAR",
    brand: "LEMKEN",
    type: "ROTOREG ZWAAR"
  }),
  normalizeResourceMapping({
    number: "0193-TRW-",
    description: "3 DELIGE MOTORWEL SABO",
    brand: "SABO",
    type: "TRW03 SABO"
  }),
  normalizeResourceMapping({
    number: "0191-TVE-",
    description: "MUSTANG VERTIDRAIN 7117 WD15 WB170",
    brand: "VERTIDRAIN",
    type: "TMV08 7117"
  }),
  normalizeResourceMapping({
    number: "0190-TDU-",
    description: "DUMPER AANHANGWAGEN OP LAGEDRUK BANDEN TANDEM 24 TON",
    brand: "RECORD KIPWAGEN 26T",
    type: "DUMPER 26T"
  }),
  normalizeResourceMapping({
    number: "0183-WHM-",
    description: "KOLOMBOORMACHINE ATELIER",
    brand: "PKD",
    type: "Boormachine PKD VS 32 B"
  }),
  normalizeResourceMapping({
    number: "0182-WHM-",
    description: "METAALLINTZAAG ATELIER PKD",
    brand: "PHOENIX",
    type: "FMB Lintzaagmachine Phoenix"
  }),
  normalizeResourceMapping({
    number: "0181-VCB-",
    description: "OPEN CAMIONET SPRINTER B",
    brand: "MERCEDES",
    type: "413 CDI OPEN LAADBAK"
  }),
  normalizeResourceMapping({
    number: "0177-TVE-",
    description: "VERTIDRAIN 7316 WD30 WB160",
    brand: "VERTIDRAIN",
    type: "7316 160/30"
  }),
  normalizeResourceMapping({
    number: "0171-WHM-",
    description: "4 PALENHEFBRUG ATELIER 4.5T",
    brand: "KONI",
    type: "WHM11 4 PALENBRUG ATELIER 4.5T"
  }),
  normalizeResourceMapping({
    number: "0170-VVC-",
    description: "VOLVO CONTAINER VRACHTAGEN C",
    brand: "VOLVO",
    type: "FM12 6x2"
  }),
  normalizeResourceMapping({
    number: "0169-VAZ-",
    description: "SEMIDIEPLADER 26TON",
    brand: "GHEYSEN VERPOORT",
    type: "VAZ05 OPLIGGER DIEPLADER"
  }),
  normalizeResourceMapping({
    number: "0168-TRC-",
    description: "COMPAKT TRAKTOR 38 PK",
    brand: "NEW HOLLAND",
    type: "TRC03 FORD 1920 VERSMALT"
  }),
  normalizeResourceMapping({
    number: "0161-KMB-",
    description: "TRILPLAAT REVO",
    brand: "HONDA",
    type: "KMB TRILPLAAT"
  }),
  normalizeResourceMapping({
    number: "0157-WHM-",
    description: "BANDSCHUURMACHINE ATELIER",
    type: "WHM097 BANDSCHUURM. BG 752"
  }),
  normalizeResourceMapping({
    number: "0156-WHM-",
    description: "SLIJPMOLEN ATELIER",
    brand: "OERTZEN",
    type: "WHM08 SLIJPMOLEN ATELIER"
  }),
  normalizeResourceMapping({
    number: "0149-TSP-",
    description: "SPROEIVAT 400L HARDY MET 6M BOOM",
    brand: "HARDI",
    type: "HARDI 400L MET 6M BOOM EN 2 HASPELS"
  }),
  normalizeResourceMapping({
    number: "0148-TSP-",
    description: "SPROEIVAT 800L MET HYDR. BOOM 12M",
    brand: "HARDI",
    type: "TMS02 HARDI 800L HYD 12M B"
  }),
  normalizeResourceMapping({
    number: "0143-HAS-",
    description: "BEREGENINGSHASPEL 50/160 + 100 M DARM V3",
    brand: "RAINBOY",
    type: "HASPEL 50/160"
  }),
  normalizeResourceMapping({
    number: "0141-TZA-",
    description: "ROTOREG MET KOOIROL + DRIEPUNTSZAAIMACHINE WB220 HUMA",
    brand: "SICMA",
    type: "ER2000 F715-722"
  }),
  normalizeResourceMapping({
    number: "0135-WHM-",
    description: "WARMELUCHTBLAZER ATELIER",
    brand: "ONBEKEND",
    type: "WHM04 WARMELUCHTBLAZER"
  }),
  normalizeResourceMapping({
    number: "0131-TMA-",
    description: "PANDA KLEPELMAAIER MET OPVANG WB180 3M3",
    brand: "SCHEPERS",
    type: "TMA16 PANDA"
  }),
  normalizeResourceMapping({
    number: "0128-MR1-",
    description: "Rottatieve frontmaaier werkbreedte 180 cm",
    brand: "ROBERINE",
    type: "1500 SABO 2WD"
  }),
  normalizeResourceMapping({
    number: "0124-VAL-",
    description: "AANHANGWAGEN 500KG + HUIF",
    brand: "DELVAN",
    type: "ANONIEM MET HUIF OVERKAPPING"
  }),
  normalizeResourceMapping({
    number: "0123-VAL-",
    description: "AANHANGWAGEN 500KG",
    brand: "DELVAN",
    type: "VAL01 ANONIEM"
  }),
  normalizeResourceMapping({
    number: "0121-TVE-",
    description: "VERTIDRAIN 7316 WB 160CM DIEPTE 30 CM",
    brand: "VERTIDRAIN",
    type: "7316"
  }),
  normalizeResourceMapping({
    number: "0120-TDU-",
    description: "KIPWAGEN OP GAZONBANDEN 6 TON",
    brand: "JOSKIN 6 TON",
    type: "TMA01KIPWAGEN JOSKIN 6 TON"
  }),
  normalizeResourceMapping({
    number: "0110-TAL-",
    description: "VEEGBORSTEL STH WB 180 2 M2",
    brand: "SCHEPERS",
    type: "TMA22 SCHEPERS T180 STH"
  }),
  normalizeResourceMapping({
    number: "0108-TAL-",
    description: "VEEGMACHINE IN DERDEPUNT WB 185",
    brand: "BEMA",
    type: "TMA11 BEMA VEEGMACHIEN"
  }),
  normalizeResourceMapping({
    number: "0100-HAS-",
    description: "BEREGENINGSHASPEL 50/160 + 100 M DARM V2",
    brand: "RAINBOY",
    type: "HASPEL 50/160"
  }),
  normalizeResourceMapping({
    number: "0099-HAS-",
    description: "BEREGENINGSHASPEL 55/110+ 100 M DARM",
    brand: "RAINBOY",
    type: "HASPEL 55-110"
  }),
  normalizeResourceMapping({
    number: "0097-TZA-",
    description: "ZAAIMACHINE MET PAKKERROL WB 180",
    brand: "LAND PRIDE",
    type: "TMZ03 LAND PRIDE ZAAIMACHINE"
  }),
  normalizeResourceMapping({
    number: "0087-HAS-",
    description: "BEREGENINGSHASPEL+DRAAIKRANS 60/210 + 100 DARM",
    brand: "RAINBOY",
    type: "RAINSTAR 65/250"
  }),
  normalizeResourceMapping({
    number: "0086-HAS-",
    description: "BEREGENINGSHASPEL 50/160 + 100 M DARM V5",
    brand: "RAINBOY",
    type: "HAS06 HASPEL 50/160"
  }),
  normalizeResourceMapping({
    number: "0085-HAS-",
    description: "BEREGENINGSHASPEL 50/160 + 100 M DARM V5",
    brand: "RAINBOY",
    type: "HASPEL 50/160"
  }),
  normalizeResourceMapping({
    number: "0084-HAS-",
    description: "BEREGENINGSHASPEL 50/160 + 100 M DARM",
    brand: "RAINBOY",
    type: "HASPEL 50/160"
  }),
  normalizeResourceMapping({
    number: "0080-VCO-",
    description: "CONTAINER MULTILIFT H100 L600",
    brand: "ONBEKEND",
    type: "CONTAINER H100"
  }),
  normalizeResourceMapping({
    number: "0079-VCO-",
    description: "CONTAINER MULTILIFT H75 L700",
    brand: "ONBEKEND",
    type: "SCHOVEN CONTAINER"
  }),
  normalizeResourceMapping({
    number: "0078-VCO-",
    description: "CONTAINER MULTILIFT H125 L600",
    brand: "ONBEKEND",
    type: "CONTAINER H125"
  }),
  normalizeResourceMapping({
    number: "0066-TAL-",
    description: "Machine borstel voor kunstgras driepunts",
    type: "Swinging Axle +Hitch F Tract"
  }),
  normalizeResourceMapping({
    number: "0065-KMB-",
    description: "Dennis maaier voor stadion",
    brand: "DENNIS",
    type: "2 GRASBOX STANDARD DENNIS"
  }),
  normalizeResourceMapping({
    number: "0064-KMB-",
    description: "Dennis maaier voor stadion",
    brand: "DENNIS",
    type: "2 GRASBOX STANDARD DENNIS"
  }),
  normalizeResourceMapping({
    number: "0064-HST",
    description: "Murush multi dense casset borstel",
    type: "Murush multi dence"
  }),
  normalizeResourceMapping({
    number: "0063-WHM-",
    description: "Laspost half automaat",
    type: "Synergic Pro"
  }),
  normalizeResourceMapping({
    number: "0062-KMB-",
    description: "Handmaaier honda",
    type: "Honda HRH536 K4"
  }),
  normalizeResourceMapping({
    number: "0059-TAL-",
    description: "Kunstgrasborstel met opvangbak en zeef",
    brand: "Weideman",
    type: "Machine borstel voor kunstgras"
  }),
  normalizeResourceMapping({
    number: "0054-KME-",
    description: "VERSTEKZAAG DEWALT",
    brand: "Dewalt",
    type: "Verstekzaag"
  }),
  normalizeResourceMapping({
    number: "0051-VCO-",
    description: "CONTAINER MULTILIFT H200 L600",
    brand: "ONBEKEND",
    type: "CONTAINER H200"
  }),
  normalizeResourceMapping({
    number: "0040-TVE-",
    description: "SCHUDFREES IEMANTS",
    brand: "IEMANTS",
    type: "SCHUDFREES ZWAAR MODEL"
  }),
  normalizeResourceMapping({
    number: "0024-TAL-",
    description: "KARDAN WATERPOMP",
    brand: "BOUWER",
    type: "Pomp DPV"
  }),
  normalizeResourceMapping({
    number: "0014-LAS-",
    description: "HELLINGSLASER + ONTVANGER",
    type: "Dual grade PKG Benelux"
  }),
  normalizeResourceMapping({
    number: "0012-BWI-",
    description: "TRANSCUBE 3000L",
    type: "Transcube 3000 l"
  }),
  normalizeResourceMapping({
    number: "0011-BWI-",
    description: "ADR WERF TANK 3000L",
    type: "ADR werfbrandstoftank Type 30 TCG"
  }),
  normalizeResourceMapping({
    number: "0007 WHM*",
    description: "Plaatsen Wieshaupt condenserend gastoestel",
    type: ""
  }),
  normalizeResourceMapping({
    number: "0005-TDU-",
    description: "Tweedehands gronddumper",
    type: "DUMPER KAR"
  }),
  normalizeResourceMapping({
    number: "0003-BWI-",
    description: "Schaftwagen",
    type: "Schaftwagen"
  }),
  normalizeResourceMapping({
    number: "0001-WHM-",
    description: "2 TANKBALMORAL + POMP",
    type: "DUBBELWANDIG 2X 5000 LITER"
  })
];
