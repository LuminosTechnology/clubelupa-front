import { Restaurant } from "../components/Map";

export const affiliates: Restaurant[] = [
  {
    id: 1,
    nome_fantasia: "Cine Passeio",
    address: "Rua Riachuelo, 410",
    distance: "0",
    hours: "10:00 às 19:00",
    image: "https://i.imgur.com/rUQUl0S.png",
    location: {
      lat: -25.42640833923065,
      lng: -49.26946435510739,
    },
    iconType: "yellow",
    value: 4,
  },
  {
    id: 2,
    nome_fantasia: "Céu Bar",
    address: "Rua Desembargador Costa Carvalho, 471",
    distance: "0",
    hours: "17:00 às 02:00",
    image: "https://i.imgur.com/TjZWucq.png",
    location: {
      lat: -25.4404079247463,
      lng: -49.29390293493574,
    },
    iconType: "terracotta",
    value: 4,
    category: [
      "Bar",
      "Culinária Contemporânea",
      "Drinks",
      "Possuí área externa",
    ],
    structure: "Física",
    description: `
    Um rooftop com vista de tirar o fôlego! 
Essa é a vibe do Céu, o novo bar de Curitiba que abriu as portas com um visual incrível. A casa é dos mesmos donos do Czar e tem tudo pra virar point da cidade — embaixo, uma pista de dança e no rooftop, drinks autorais assinados pelo talentoso Gabriel Bueno e comidinhas como steak tartare  que já ganhou nosso coração! Tudo isso numa localização privilegiada, moderno e com aquela vista.
    `,
  },
  {
    id: 3,
    nome_fantasia: "Maneko's Bar",
    address: "Alameda Cabral, 19",
    distance: "0",
    hours: "09:00 às 21:20",
    image: "https://i.imgur.com/TdI5aLu.png",
    location: {
      lat: -25.432644768631942,
      lng: -49.27653322027941,
    },
    iconType: "terracotta",
    value: 4,
    category: [
      "Bar",
      "Culinária Brasileira",
      "Culinária Contemporânea",
      "Drinks",
      "Restaurantes",
    ],
    structure: "Física",
    description: `
    O Maneko’s é boteco como manda o figurino – balcão de fórmica, chope gelado cobrado pelas bolachas que vão sob o copo, petiscos de primeira e, de segunda a sexta, o tradicional prato do dia. Manoel Alves, o “Maneko”, tem a honra de estar à frente desse sucesso desde 1984. Os pratos são os que marcam o coração dos curitibanos: viradinho, rabada, bife a rolê e costela de panela são apenas alguns dos deliciosos pratos que o local, que serve almoço e janta, serve para os clientes.
    `,
  },
  {
    id: 4,
    nome_fantasia: "Estúdio Ceramina",
    address: "Rua Nunes Machado, 1667",
    distance: "0",
    hours: "09:30 às 18:30",
    image: "https://i.imgur.com/x1KUOZ7.png",
    location: {
      lat: -25.451388780900125,
      lng: -49.26865742210195,
    },
    iconType: "green",
    value: 4,
  },
  {
    id: 5,
    nome_fantasia: "Asteristico Cafés",
    address: "Rua Comendador Araújo, 969",
    distance: "0",
    hours: "10:00 às 20:00",
    image: "https://i.imgur.com/ePyOAAG.png",
    location: {
      lat: -25.440079868254664,
      lng: -49.28301523726753,
    },
    iconType: "terracotta",
    value: 4,
  },
  {
    id: 6,
    nome_fantasia: "Orquidaria Rosita",
    address: "Rua Mateus Leme, 3440",
    distance: "0",
    hours: "09:00 às 18:00",
    image: "https://i.imgur.com/ssxQmrg.png",
    location: {
      lat: -25.396979962044966,
      lng: -49.27109414732168,
    },
    iconType: "yellow",
    value: 4,
  },
  {
    id: 7,
    nome_fantasia: "Mykola Lab Bar",
    address: "Rua Visconde do Rio Branco, 1087",
    distance: "0",
    hours: "19:00 às 01:00",
    image: "https://i.imgur.com/DGL0TcG.png",
    location: {
      lat: -25.431345799866623,
      lng: -49.280364704043656,
    },
    iconType: "terracotta",
    value: 4,
  },
  {
    id: 8,
    nome_fantasia: "Vinícola Araucária",
    address: "Rua Aparecida Góes de Paula, 1300",
    distance: "0",
    hours: "09:00 às 17:00",
    image: "https://i.imgur.com/9rBj2lj.png",
    location: {
      lat: -25.65612171491058,
      lng: -49.070085911585366,
    },
    iconType: "terracotta",
    value: 4,
  },
  {
    id: 9,
    nome_fantasia: "Herbôro Aromas Naturais",
    address: "Rua Desembargador Antonio de Paula, 2530",
    distance: "0",
    hours: "11:00 às 19:00",
    image: "https://i.imgur.com/Z1UtAuj.png",
    location: {
      lat: -25.513247277510334,
      lng: -49.241353204018694,
    },
    iconType: "green",
    value: 4,
  },
  {
    id: 10,
    nome_fantasia: "Marcondes Cozinha Autoral",
    address: "Rua Recife, 220",
    distance: "0",
    hours: "18:30 às 23:00",
    image: "https://i.imgur.com/ccDTcko.png",
    location: {
      lat: -25.410754888932072,
      lng: -49.25177580403618,
    },
    iconType: "terracotta",
    value: 4,
  },
];

type Experiencia = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

export const experiencias: Experiencia[] = [
  {
    id: 1,
    name: "Ingresso para o Cine Passeio",
    category: "Cultura",
    price: 4,
    image: "https://i.imgur.com/VmVMBEx.jpeg",
  },
  {
    id: 2,
    name: "Degustação de cafés no Asterístico",
    category: "Gastronomia",
    price: 10,
    image: "https://i.imgur.com/2ko2q1s.jpeg",
  },
  {
    id: 3,
    name: "Oficina na Orquidaria Rosita",
    category: "Serviço",
    price: 20,
    image: "https://i.imgur.com/T4rYeQh.jpg",
  },
  {
    id: 4,
    name: "Oficina na Orquidaria Rosita",
    category: "Serviço",
    price: 20,
    image: "https://i.imgur.com/0Zil8n9.jpg",
  },
  {
    id: 5,
    name: "Cestinha de café da manhã da Chef Flávia",
    category: "Gastronomia",
    price: 20,
    image: "https://i.imgur.com/WURCeDA.jpg",
  },
  {
    id: 6,
    name: "Degustação de drinks no Mykola",
    category: "Gastronomia",
    price: 30,
    image: "https://i.imgur.com/37GWIMN.jpg",
  },
  {
    id: 7,
    name: "Oficina da Ceramina",
    category: "Decoração",
    price: 40,
    image: "https://i.imgur.com/DFWpf6p.jpg",
  },
  {
    id: 8,
    name: "Tour na Vinícola Araucária",
    category: "Gastronomia",
    price: 60,
    image: "https://i.imgur.com/uGApbGK.jpg",
  },
  {
    id: 9,
    name: "Oficina olfativa na Herbôro",
    category: "Cosméticos",
    price: 70,
    image: "https://i.imgur.com/waWSNKN.jpg",
  },
  {
    id: 10,
    name: "Menu degustação no Marcondes",
    category: "Gastronomia",
    price: 100,
    image: "https://i.imgur.com/Old9LwD.jpg", // Repeti a imagem inicial por falta de 10 links
  },
];
