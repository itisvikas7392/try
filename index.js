const cheerio = require("cheerio");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();
const keep_alive = require("./keep_alive.js");

const rel =
  "https://economictimes.indiatimes.com/reliance-industries-ltd/stocks/companyid-13215.cms";
const bse =
  "https://economictimes.indiatimes.com/bse-ltd/stocks/companyid-2809.cms";
const relf =
  "https://economictimes.indiatimes.com/reliance-industries-ltd/stocks/companyid-13215.cms";
const jio =
  "https://economictimes.indiatimes.com/jio-financial-services-ltd/stocks/companyid-14555.cms";
const bikaji =
  "https://economictimes.indiatimes.com/bikaji-foods-international-ltd/stocks/companyid-2099545.cms";
const irb =
  "https://economictimes.indiatimes.com/irb-infrastructure-developers-ltd/stocks/companyid-20738.cms";
const hindustancopper =
  "https://economictimes.indiatimes.com/hindustan-copper-ltd/stocks/companyid-11733.cms";
const arvind =
  "https://economictimes.indiatimes.com/arvind-ltd/stocks/companyid-14037.cms";
const adani =
  "https://economictimes.indiatimes.com/adani-power-ltd/stocks/companyid-23479.cms";
const pnb =
  "https://economictimes.indiatimes.com/punjab-national-bank/stocks/companyid-11585.cms";
const rbl =
  "https://economictimes.indiatimes.com/rbl-bank-ltd/stocks/companyid-7750.cms";
const marksans =
  "https://economictimes.indiatimes.com/marksans-pharma-ltd/stocks/companyid-10542.cms";
const minda =
  "https://economictimes.indiatimes.com/minda-corporation-ltd/stocks/companyid-30624.cms";
const ushamartin =
  "https://economictimes.indiatimes.com/usha-martin-ltd/stocks/companyid-12833.cms";
const century =
  "https://economictimes.indiatimes.com/century-textiles-industries-ltd/stocks/companyid-13905.cms";
const anandrathi =
  "https://economictimes.indiatimes.com/anand-rathi-wealth-ltd/stocks/companyid-2020300.cms";
const agies =
  "https://economictimes.indiatimes.com/aegis-logistics-ltd/stocks/companyid-23.cms";
const karnatka =
  "https://economictimes.indiatimes.com/karnataka-bank-ltd/stocks/companyid-12259.cms";
const heg =
  "https://economictimes.indiatimes.com/heg-ltd/stocks/companyid-13630.cms";
const reltail =
  "https://economictimes.indiatimes.com/railtel-corporation-of-india-ltd/stocks/companyid-16503.cms";
const hfcl =
  "https://economictimes.indiatimes.com/hfcl-ltd/stocks/companyid-13649.cms";
const shipping =
  "https://economictimes.indiatimes.com/shipping-corporation-of-india-ltd/stocks/companyid-11972.cms";
const deltacorp =
  "https://economictimes.indiatimes.com/delta-corp-ltd/stocks/companyid-9453.cms";
const sula =
  "https://economictimes.indiatimes.com/sula-vineyards-ltd/stocks/companyid-2101578.cms";
const hindalko =
  "https://economictimes.indiatimes.com/hindalco-industries-ltd/stocks/companyid-13637.cms";
const justdial =
  "https://economictimes.indiatimes.com/just-dial-ltd/stocks/companyid-45529.cms";
const sjvn =
  "https://economictimes.indiatimes.com/sjvn-ltd/stocks/companyid-18460.cms";
const grephiteindia =
  "https://economictimes.indiatimes.com/graphite-india-ltd/stocks/companyid-13916.cms";
const parimalpharma =
  "https://economictimes.indiatimes.com/piramal-pharma-ltd/stocks/companyid-2094561.cms";
const tv18 =
  "https://economictimes.indiatimes.com/tv18-broadcast-ltd/stocks/companyid-15481.cms";
const maninfra =
  "https://economictimes.indiatimes.com/man-infraconstruction-ltd/stocks/companyid-22649.cms";
const jammu =
  "https://economictimes.indiatimes.com/jammu-kashmir-bank-ltd/stocks/companyid-8611.cms";
const stride =
  "https://economictimes.indiatimes.com/strides-pharma-science-ltd/stocks/companyid-2118.cms";
const sequent =
  "https://economictimes.indiatimes.com/sequent-scientific-ltd/stocks/companyid-3782.cms";
const anupam =
  "https://economictimes.indiatimes.com/anupam-rasayan-india-ltd/stocks/companyid-45694.cms";
const tvs =
  "https://economictimes.indiatimes.com/tvs-srichakra-ltd/stocks/companyid-12987.cms";
const gail =
  "https://economictimes.indiatimes.com/gail-india-ltd/stocks/companyid-4845.cms";
const auribindo =
  "https://economictimes.indiatimes.com/aurobindo-pharma-ltd/stocks/companyid-8279.cms";
const jindalsp =
  "https://economictimes.indiatimes.com/jindal-steel-power-ltd/stocks/companyid-4355.cms";
const jmfinance =
  "https://economictimes.indiatimes.com/jm-financial-ltd/stocks/companyid-12633.cms";
const nitinspinner =
  "https://economictimes.indiatimes.com/nitin-spinners-ltd/stocks/companyid-17841.cms";
const granules =
  "https://economictimes.indiatimes.com/granules-india-ltd/stocks/companyid-6991.cms";
const archean =
  "https://economictimes.indiatimes.com/archean-chemical-industries-ltd/stocks/companyid-55288.cms";
const adanienter =
  "https://economictimes.indiatimes.com/adani-enterprises-ltd/stocks/companyid-9074.cms";
const polymadicure =
  "https://economictimes.indiatimes.com/poly-medicure-ltd/stocks/companyid-4586.cms";
const eidparry =
  "https://economictimes.indiatimes.com/eid-parry-india-ltd/stocks/companyid-13818.cms";
const orchid =
  "https://economictimes.indiatimes.com/orchid-pharma-ltd/stocks/companyid-10568.cms";
const rblbank =
  "https://economictimes.indiatimes.com/rbl-bank-ltd/stocks/companyid-7750.cms";
const restaurant =
  "https://economictimes.indiatimes.com/restaurant-brands-asia-ltd/stocks/companyid-1997181.cms";
const orrisa =
  "https://economictimes.indiatimes.com/the-orissa-minerals-development-company-ltd/stocks/companyid-412.cms";
const ritesh =
  "https://economictimes.indiatimes.com/rites-ltd/stocks/companyid-18469.cms";
const garware =
  "https://economictimes.indiatimes.com/garware-hi-tech-films-ltd/stocks/companyid-13746.cms";
const arbindopahrma =
  "https://economictimes.indiatimes.com/aurobindo-pharma-ltd/stocks/companyid-8279.cms";
const rishabhins =
  "https://economictimes.indiatimes.com/rishabh-instruments-ltd/stocks/companyid-50196.cms";
const neogen =
  "https://economictimes.indiatimes.com/neogen-chemicals-ltd/stocks/companyid-1942599.cms";
const nueland =
  "https://economictimes.indiatimes.com/neuland-laboratories-ltd/stocks/companyid-9051.cms";
const metropolish =
  "https://economictimes.indiatimes.com/metropolis-healthcare-ltd/stocks/companyid-16325.cms";
const keystone =
  "https://economictimes.indiatimes.com/keystone-realtors-ltd/stocks/companyid-61456.cms";
const grasim =
  "https://economictimes.indiatimes.com/grasim-industries-ltd/stocks/companyid-13696.cms";
const jash =
  "https://economictimes.indiatimes.com/jash-engineering-ltd/stocks/companyid-47196.cms";
const indoco =
  "https://economictimes.indiatimes.com/indoco-remedies-ltd/stocks/companyid-792.cms";
const cipla =
  "https://economictimes.indiatimes.com/cipla-ltd/stocks/companyid-13917.cms";
const bestagro = "https://www.tickertape.in/stocks/best-agrolife-BES";
const indianenergy =
  "https://economictimes.indiatimes.com/indian-energy-exchange-ltd/stocks/companyid-20870.cms";
const engeenerindia =
  "https://economictimes.indiatimes.com/engineers-india-ltd/stocks/companyid-4582.cms";
const ncc =
  "https://economictimes.indiatimes.com/ncc-ltd/stocks/companyid-11234.cms";
const asterdm =
  "https://economictimes.indiatimes.com/aster-dm-healthcare-ltd/stocks/companyid-67489.cms";
const latent =
  "https://economictimes.indiatimes.com/latent-view-analytics-ltd/stocks/companyid-2018256.cms";
const pix =
  "https://economictimes.indiatimes.com/pix-transmissions-ltd/stocks/companyid-13281.cms";
const ksb =
  "https://economictimes.indiatimes.com/ksb-ltd/stocks/companyid-13500.cms";
const hpadhesive =
  "https://economictimes.indiatimes.com/hp-adhesives-ltd/stocks/companyid-2020833.cms";
const vardhman =
  "https://economictimes.indiatimes.com/vardhman-textiles-ltd/stocks/companyid-11897.cms";
const ambuja =
  "https://economictimes.indiatimes.com/ambuja-cements-ltd/stocks/companyid-13643.cms";
const epl =
  "https://economictimes.indiatimes.com/epl-ltd/stocks/companyid-13764.cms";
const on97 =
  "https://economictimes.indiatimes.com/one97-communications-ltd/stocks/companyid-2017785.cms";
const confipetrin =
  "https://economictimes.indiatimes.com/confidence-petroleum-india-ltd/stocks/companyid-8227.cms";
const agigreenpack =
  "https://economictimes.indiatimes.com/agi-greenpac-ltd/stocks/companyid-13621.cms";
const primochemi =
  "https://economictimes.indiatimes.com/primo-chemicals-ltd/stocks/companyid-13243.cms";
const sp =
  "https://economictimes.indiatimes.com/s-p-apparels-ltd/stocks/companyid-64531.cms";
const indianhumepipe =
  "https://economictimes.indiatimes.com/indian-hume-pipe-company-ltd/stocks/companyid-13587.cms";
const taj =
  "https://economictimes.indiatimes.com/taj-gvk-hotels-resorts-ltd/stocks/companyid-3295.cms";
const lupin =
  "https://economictimes.indiatimes.com/lupin-ltd/stocks/companyid-10743.cms";
const sunpharmadv =
  "https://economictimes.indiatimes.com/sun-pharma-advanced-research-company-ltd/stocks/companyid-18315.cms";
const orient =
  "https://economictimes.indiatimes.com/orient-paper-industries-ltd/stocks/companyid-13319.cms";
const bharatrasayan =
  "https://economictimes.indiatimes.com/bharat-rasayan-ltd/stocks/companyid-10986.cms";
const nacl =
  "https://economictimes.indiatimes.com/nacl-industries-ltd/stocks/companyid-8650.cms";
const irm =
  "https://economictimes.indiatimes.com/irm-energy-ltd/stocks/companyid-2153874.cms";
const vimla =
  "https://economictimes.indiatimes.com/vimta-labs-ltd/stocks/companyid-10686.cms";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const token = "6956068223:AAGpqeLyS3MAJUqoj8MBjcJLpygykJHfd3s";
const bot = new TelegramBot(token, { polling: true });

// Web scraping function
const scrapeAndSendMessage = async (url, selector, stockName) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const pChangeText = $(selector).text().trim();
    console.log(`${stockName} Stock:`, pChangeText);

    return pChangeText;
  } catch (error) {
    console.error(`Error fetching HTML for ${stockName} Stock:`, error);
    return null;
  }
};

// Listen for all messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  // Run the scraping function for each URL
  const pChangeText1 = await scrapeAndSendMessage(
    rel,
    ".percentChange",
    "Reliance Industries",
  );
  const rel1 = (parseFloat(pChangeText1) * 5.88) / 100; // Parse float to ensure proper calculation
  const pChangeText2 = await scrapeAndSendMessage(
    bse,
    ".percentChange",
    "BSE Ltd",
  );
  const rel2 = (parseFloat(pChangeText2) * 3.76) / 100; // Parse float to ensure proper calculation
  const pChangeText3 = await scrapeAndSendMessage(
    relf,
    ".percentChange",
    "Reliance Industries Future",
  );
  const rel3 = (parseFloat(pChangeText3) * 3.69) / 100; // Parse float to ensure proper calculation
  const pChangeText4 = await scrapeAndSendMessage(
    jio,
    ".percentChange",
    "Jio Financial Services Ltd",
  );
  const rel4 = (parseFloat(pChangeText4) * 3.69) / 100; // Parse float to ensure proper calculation
  const pChangeText5 = await scrapeAndSendMessage(
    bikaji,
    ".percentChange",
    "Bikaji Foods International Ltd",
  );
  const rel5 = (parseFloat(pChangeText5) * 3.12) / 100; // Parse float to ensure proper calculation
  const pChangeText6 = await scrapeAndSendMessage(
    irb,
    ".percentChange",
    "IRB Infrastructure Developers Ltd",
  );
  const rel6 = (parseFloat(pChangeText6) * 3.03) / 100; // Parse float to ensure proper calculation
  const pChangeText7 = await scrapeAndSendMessage(
    hindustancopper,
    ".percentChange",
    "Hindustan Copper Ltd",
  );
  const rel7 = (parseFloat(pChangeText7) * 2.74) / 100; // Parse float to ensure proper calculation
  const pChangeText8 = await scrapeAndSendMessage(
    arvind,
    ".percentChange",
    "Arvind Ltd",
  );
  const rel8 = (parseFloat(pChangeText8) * 2.7) / 100; // Parse float to ensure proper calculation
  const pChangeText9 = await scrapeAndSendMessage(
    adani,
    ".percentChange",
    "Adani Power Ltd",
  );
  const rel9 = (parseFloat(pChangeText9) * 2.6) / 100; // Parse float to ensure proper calculation
  const pChangeText10 = await scrapeAndSendMessage(
    pnb,
    ".percentChange",
    "Punjab National Bank",
  );
  const rel10 = (parseFloat(pChangeText10) * 1.94) / 100; // Parse float to ensure proper calculation
  const pChangeText11 = await scrapeAndSendMessage(
    rbl,
    ".percentChange",
    "RBL Bank Ltd",
  );
  const rel11 = (parseFloat(pChangeText11) * 1.9) / 100; // Parse float to ensure proper calculation
  const pChangeText12 = await scrapeAndSendMessage(
    marksans,
    ".percentChange",
    "Marksans Pharma Ltd",
  );
  const rel12 = (parseFloat(pChangeText12) * 1.88) / 100; // Parse float to ensure proper calculation
  const pChangeText13 = await scrapeAndSendMessage(
    minda,
    ".percentChange",
    "Minda Corporation Ltd",
  );
  const rel13 = (parseFloat(pChangeText13) * 1.84) / 100; // Parse float to ensure proper calculation
  const pChangeText14 = await scrapeAndSendMessage(
    ushamartin,
    ".percentChange",
    "Usha Martin Ltd",
  );
  const rel14 = (parseFloat(pChangeText14) * 1.81) / 100; // Parse float to ensure proper calculation
  const pChangeText15 = await scrapeAndSendMessage(
    century,
    ".percentChange",
    "Century Textiles Industries Ltd",
  );
  const rel15 = (parseFloat(pChangeText15) * 1.81) / 100; // Parse float to ensure proper calculation
  const pChangeText16 = await scrapeAndSendMessage(
    anandrathi,
    ".percentChange",
    "Anand Rathi Wealth Ltd",
  );
  const rel16 = (parseFloat(pChangeText16) * 1.77) / 100; // Parse float to ensure proper calculation
  const pChangeText17 = await scrapeAndSendMessage(
    agies,
    ".percentChange",
    "Aegis Logistics Ltd",
  );
  const rel17 = (parseFloat(pChangeText17) * 1.75) / 100; // Parse float to ensure proper calculation
  const pChangeText18 = await scrapeAndSendMessage(
    karnatka,
    ".percentChange",
    "Karnataka Bank Ltd",
  );
  const rel18 = (parseFloat(pChangeText18) * 1.74) / 100; // Parse float to ensure proper calculation
  const pChangeText19 = await scrapeAndSendMessage(
    heg,
    ".percentChange",
    "Heg Ltd",
  );
  const rel19 = (parseFloat(pChangeText19) * 1.57) / 100; // Parse float to ensure proper calculation
  const pChangeText20 = await scrapeAndSendMessage(
    reltail,
    ".percentChange",
    "Railtel Corporation of India Ltd",
  );
  const rel20 = (parseFloat(pChangeText20) * 1.54) / 100; // Parse float to ensure proper calculation
  const pChangeText21 = await scrapeAndSendMessage(
    hfcl,
    ".percentChange",
    "HFCL Ltd",
  );
  const rel21 = (parseFloat(pChangeText21) * 1.54) / 100; // Parse float to ensure proper calculation
  const pChangeText22 = await scrapeAndSendMessage(
    shipping,
    ".percentChange",
    "Shipping Corporation of India Ltd",
  );
  const rel22 = (parseFloat(pChangeText22) * 1.47) / 100; // Parse float to ensure proper calculation
  const pChangeText23 = await scrapeAndSendMessage(
    deltacorp,
    ".percentChange",
    "Delta Corp Ltd",
  );
  const rel23 = (parseFloat(pChangeText23) * 1.46) / 100; // Parse float to ensure proper calculation
  const pChangeText24 = await scrapeAndSendMessage(
    sula,
    ".percentChange",
    "Sula Vineyards Ltd",
  );
  const rel24 = (parseFloat(pChangeText24) * 1.41) / 100; // Parse float to ensure proper calculation
  const pChangeText25 = await scrapeAndSendMessage(
    hindalko,
    ".percentChange",
    "Hindalco Industries Ltd",
  );
  const rel25 = (parseFloat(pChangeText25) * 1.41) / 100; // Parse float to ensure proper calculation
  const pChangeText26 = await scrapeAndSendMessage(
    justdial,
    ".percentChange",
    "Just Dial Ltd",
  );
  const rel26 = (parseFloat(pChangeText26) * 1.38) / 100; // Parse float to ensure proper calculation
  const pChangeText27 = await scrapeAndSendMessage(
    sjvn,
    ".percentChange",
    "SJVN Ltd",
  );
  const rel27 = (parseFloat(pChangeText27) * 1.3) / 100; // Parse float to ensure proper calculation
  const pChangeText28 = await scrapeAndSendMessage(
    grephiteindia,
    ".percentChange",
    "Graphite India Ltd",
  );
  const rel28 = (parseFloat(pChangeText28) * 1.2) / 100; // Parse float to ensure proper calculation
  const pChangeText29 = await scrapeAndSendMessage(
    parimalpharma,
    ".percentChange",
    "Piramal Pharma Ltd",
  );
  const rel29 = (parseFloat(pChangeText29) * 1.15) / 100; // Parse float to ensure proper calculation
  const pChangeText30 = await scrapeAndSendMessage(
    tv18,
    ".percentChange",
    "TV18 Broadcast Ltd",
  );
  const rel30 = (parseFloat(pChangeText30) * 1.09) / 100; // Parse float to ensure proper calculation
  const pChangeText31 = await scrapeAndSendMessage(
    maninfra,
    ".percentChange",
    "Man Infraconstruction Ltd",
  );
  const rel31 = (parseFloat(pChangeText31) * 1.06) / 100; // Parse float to ensure proper calculation
  const pChangeText32 = await scrapeAndSendMessage(
    jammu,
    ".percentChange",
    "Jammu Kashmir Bank Ltd",
  );
  const rel32 = (parseFloat(pChangeText32) * 1.06) / 100; // Parse float to ensure proper calculation
  const pChangeText33 = await scrapeAndSendMessage(
    stride,
    ".percentChange",
    "Stride Pharma Science Ltd",
  );
  const rel33 = (parseFloat(pChangeText33) * 1.05) / 100; // Parse float to ensure proper calculation
  const pChangeText34 = await scrapeAndSendMessage(
    sequent,
    ".percentChange",
    "Sequent Scientific Ltd",
  );
  const rel34 = (parseFloat(pChangeText34) * 1.01) / 100; // Parse float to ensure proper calculation
  const pChangeText35 = await scrapeAndSendMessage(
    anupam,
    ".percentChange",
    "Anupam Rasayan India Ltd",
  );
  const rel35 = (parseFloat(pChangeText35) * 0.99) / 100; // Parse float to ensure proper calculation
  const pChangeText36 = await scrapeAndSendMessage(
    tvs,
    ".percentChange",
    "Tvs Srichakra Ltd",
  );
  const rel36 = (parseFloat(pChangeText36) * 0.98) / 100; // Parse float to ensure proper calculation
  const pChangeText37 = await scrapeAndSendMessage(
    gail,
    ".percentChange",
    "Gail India Ltd",
  );
  const rel37 = (parseFloat(pChangeText37) * 0.96) / 100; // Parse float to ensure proper calculation
  const pChangeText38 = await scrapeAndSendMessage(
    auribindo,
    ".percentChange",
    "Aurobindo Pharma Ltd",
  );
  const rel38 = (parseFloat(pChangeText38) * 0.95) / 100; // Parse float to ensure proper calculation
  const pChangeText39 = await scrapeAndSendMessage(
    jindalsp,
    ".percentChange",
    "Jindal Steel Power Ltd",
  );
  const rel39 = (parseFloat(pChangeText39) * 0.93) / 100; // Parse float to ensure proper calculation
  const pChangeText40 = await scrapeAndSendMessage(
    jmfinance,
    ".percentChange",
    "JM Financial Ltd",
  );
  const rel40 = (parseFloat(pChangeText40) * 0.9) / 100; // Parse float to ensure proper calculation
  const pChangeText41 = await scrapeAndSendMessage(
    nitinspinner,
    ".percentChange",
    "Nitin Spinners Ltd",
  );
  const rel41 = (parseFloat(pChangeText41) * 0.87) / 100; // Parse float to ensure proper calculation
  const pChangeText42 = await scrapeAndSendMessage(
    granules,
    ".percentChange",
    "Granules India Ltd",
  );
  const rel42 = (parseFloat(pChangeText42) * 0.87) / 100; // Parse float to ensure proper calculation
  const pChangeText43 = await scrapeAndSendMessage(
    archean,
    ".percentChange",
    "Archean Chemical Industries Ltd",
  );
  const rel43 = (parseFloat(pChangeText43) * 0.81) / 100; // Parse float to ensure proper calculation
  const pChangeText44 = await scrapeAndSendMessage(
    adanienter,
    ".percentChange",
    "Adani Enterprises Ltd",
  );
  const rel44 = (parseFloat(pChangeText44) * 0.8) / 100; // Parse float to ensure proper calculation
  const pChangeText45 = await scrapeAndSendMessage(
    polymadicure,
    ".percentChange",
    "Poly Medicure Ltd",
  );
  const rel45 = (parseFloat(pChangeText45) * 0.8) / 100; // Parse float to ensure proper calculation
  const pChangeText46 = await scrapeAndSendMessage(
    eidparry,
    ".percentChange",
    "Eid Parry India Ltd",
  );
  const rel46 = (parseFloat(pChangeText46) * 0.79) / 100; // Parse float to ensure proper calculation
  const pChangeText47 = await scrapeAndSendMessage(
    orchid,
    ".percentChange",
    "Orchid Pharma Ltd",
  );
  const rel47 = (parseFloat(pChangeText47) * 0.78) / 100; // Parse float to ensure proper calculation
  const pChangeText48 = await scrapeAndSendMessage(
    rblbank,
    ".percentChange",
    "RBL Bank Ltd",
  );
  const rel48 = (parseFloat(pChangeText48) * 0.78) / 100; // Parse float to ensure proper calculation
  const pChangeText49 = await scrapeAndSendMessage(
    restaurant,
    ".percentChange",
    "Restaurant Brands Asia Ltd",
  );
  const rel49 = (parseFloat(pChangeText49) * 0.76) / 100; // Parse float to ensure proper calculation
  const pChangeText50 = await scrapeAndSendMessage(
    orrisa,
    ".percentChange",
    "The Orissa Minerals Development Company Ltd",
  );
  const rel50 = (parseFloat(pChangeText50) * 0.7) / 100; // Parse float to ensure proper calculation
  const pChangeText51 = await scrapeAndSendMessage(
    ritesh,
    ".percentChange",
    "Rites Ltd",
  );
  const rel51 = (parseFloat(pChangeText51) * 0.69) / 100; // Parse float to ensure proper calculation
  const pChangeText52 = await scrapeAndSendMessage(
    garware,
    ".percentChange",
    "Garware Hi-Tech Films Ltd",
  );
  const rel52 = (parseFloat(pChangeText52) * 0.68) / 100; // Parse float to ensure proper calculation
  const pChangeText53 = await scrapeAndSendMessage(
    arbindopahrma,
    ".percentChange",
    "Aurobindo Pharma Ltd",
  );
  const rel53 = (parseFloat(pChangeText53) * 0.64) / 100; // Parse float to ensure proper calculation
  const pChangeText54 = await scrapeAndSendMessage(
    rishabhins,
    ".percentChange",
    "Rishabh Instruments Ltd",
  );
  const rel54 = (parseFloat(pChangeText54) * 0.63) / 100; // Parse float to ensure proper calculation
  const pChangeText55 = await scrapeAndSendMessage(
    neogen,
    ".percentChange",
    "Neogen Chemicals Ltd",
  );
  const rel55 = (parseFloat(pChangeText55) * 0.58) / 100; // Parse float to ensure proper calculation
  const pChangeText56 = await scrapeAndSendMessage(
    nueland,
    ".percentChange",
    "Neuland Laboratories Ltd",
  );
  const rel56 = (parseFloat(pChangeText56) * 0.57) / 100; // Parse float to ensure proper calculation
  const pChangeText57 = await scrapeAndSendMessage(
    metropolish,
    ".percentChange",
    "Metropolis Healthcare Ltd",
  );
  const rel57 = (parseFloat(pChangeText57) * 0.55) / 100; // Parse float to ensure proper calculation
  const pChangeText58 = await scrapeAndSendMessage(
    keystone,
    ".percentChange",
    "Keystone Realtors Ltd",
  );
  const rel58 = (parseFloat(pChangeText58) * 0.54) / 100; // Parse float to ensure proper calculation
  const pChangeText59 = await scrapeAndSendMessage(
    grasim,
    ".percentChange",
    "Grasim Industries Ltd",
  );
  const rel59 = (parseFloat(pChangeText59) * 0.49) / 100; // Parse float to ensure proper calculation
  const pChangeText60 = await scrapeAndSendMessage(
    jash,
    ".percentChange",
    "Jash Engineering Ltd",
  );
  const rel60 = (parseFloat(pChangeText60) * 0.48) / 100; // Parse float to ensure proper calculation
  const pChangeText61 = await scrapeAndSendMessage(
    indoco,
    ".percentChange",
    "Indoco Remedies Ltd",
  );
  const rel61 = (parseFloat(pChangeText61) * 0.44) / 100; // Parse float to ensure proper calculation
  const pChangeText62 = await scrapeAndSendMessage(
    cipla,
    ".percentChange",
    "Cipla Ltd",
  );
  const rel62 = (parseFloat(pChangeText62) * 0.42) / 100; // Parse float to ensure proper calculation
  const pChangeText63 = await scrapeAndSendMessage(
    bestagro,
    "span.jsx-1156941347.jsx-1903862022.change.absolute-value.text-14.typography-body-medium-l.up",
    "Best Agrolife Ltd",
  );
  const rel63 = parseFloat(pChangeText63);
  console.log(rel63);
  const rel634 = (rel63 * 0.39) / 100;
  console.log(rel634);
  const pChangeText64 = await scrapeAndSendMessage(
    indianenergy,
    ".percentChange",
    "Indian Energy Exchange Ltd",
  );
  const rel64 = (parseFloat(pChangeText64) * 0.39) / 100; // Parse float to ensure proper calculation
  const pChangeText65 = await scrapeAndSendMessage(
    engeenerindia,
    ".percentChange",
    "Engineers India Ltd",
  );
  const rel65 = (parseFloat(pChangeText65) * 0.36) / 100; // Parse float to ensure proper calculation
  const pChangeText66 = await scrapeAndSendMessage(
    ncc,
    ".percentChange",
    "NCC Ltd",
  );
  const rel66 = (parseFloat(pChangeText66) * 0.34) / 100; // Parse float to ensure proper calculation
  const pChangeText67 = await scrapeAndSendMessage(
    asterdm,
    ".percentChange",
    "Aster DM Healthcare Ltd",
  );
  const rel67 = (parseFloat(pChangeText67) * 0.33) / 100; // Parse float to ensure proper calculation
  const pChangeText68 = await scrapeAndSendMessage(
    latent,
    ".percentChange",
    "Latent View Analytics Ltd",
  );
  const rel68 = (parseFloat(pChangeText68) * 0.33) / 100; // Parse float to ensure proper calculation
  const pChangeText69 = await scrapeAndSendMessage(
    pix,
    ".percentChange",
    "Pix Transmissions Ltd",
  );
  const rel69 = (parseFloat(pChangeText69) * 0.32) / 100; // Parse float to ensure proper calculation
  const pChangeText70 = await scrapeAndSendMessage(
    ksb,
    ".percentChange",
    "KSB Ltd",
  );
  const rel70 = (parseFloat(pChangeText70) * 0.32) / 100; // Parse float to ensure proper calculation
  const pChangeText71 = await scrapeAndSendMessage(
    hpadhesive,
    ".percentChange",
    "HP Adhesives Ltd",
  );
  const rel71 = (parseFloat(pChangeText71) * 0.31) / 100; // Parse float to ensure proper calculation
  const pChangeText72 = await scrapeAndSendMessage(
    vardhman,
    ".percentChange",
    "Vardhman Textiles Ltd",
  );
  const rel72 = (parseFloat(pChangeText72) * 0.3) / 100; // Parse float to ensure proper calculation
  const pChangeText73 = await scrapeAndSendMessage(
    ambuja,
    ".percentChange",
    "Ambuja Cements Ltd",
  );
  const rel73 = (parseFloat(pChangeText73) * 0.28) / 100; // Parse float to ensure proper calculation
  const pChangeText74 = await scrapeAndSendMessage(
    epl,
    ".percentChange",
    "EPL Ltd",
  );
  const rel74 = (parseFloat(pChangeText74) * 0.26) / 100; // Parse float to ensure proper calculation
  const pChangeText75 = await scrapeAndSendMessage(
    on97,
    ".percentChange",
    "One97 Communications Ltd",
  );
  const rel75 = (parseFloat(pChangeText75) * 0.23) / 100; // Parse float to ensure proper calculation
  const pChangeText76 = await scrapeAndSendMessage(
    confipetrin,
    ".percentChange",
    "Confidence Petroleum India Ltd",
  );
  const rel76 = (parseFloat(pChangeText76) * 0.23) / 100; // Parse float to ensure proper calculation
  const pChangeText77 = await scrapeAndSendMessage(
    agigreenpack,
    ".percentChange",
    "AGI Infra Ltd",
  );
  const rel77 = (parseFloat(pChangeText77) * 0.22) / 100; // Parse float to ensure proper calculation
  const pChangeText78 = await scrapeAndSendMessage(
    primochemi,
    ".percentChange",
    "Primo Industrial Development Ltd",
  );
  const rel78 = (parseFloat(pChangeText78) * 0.2) / 100; // Parse float to ensure proper calculation
  const pChangeText79 = await scrapeAndSendMessage(
    sp,
    ".percentChange",
    "S P Apparels Ltd",
  );
  const rel79 = (parseFloat(pChangeText79) * 0.18) / 100; // Parse float to ensure proper calculation
  const pChangeText80 = await scrapeAndSendMessage(
    indianhumepipe,
    ".percentChange",
    "Indian Hume Pipe Company Ltd",
  );
  const rel80 = (parseFloat(pChangeText80) * 0.17) / 100; // Parse float to ensure proper calculation
  const pChangeText81 = await scrapeAndSendMessage(
    taj,
    ".percentChange",
    "Taj GVK Hotels & Resorts Ltd",
  );
  const rel81 = (parseFloat(pChangeText81) * 0.16) / 100; // Parse float to ensure proper calculation
  const pChangeText82 = await scrapeAndSendMessage(
    lupin,
    ".percentChange",
    "Lupin Ltd",
  );
  const rel82 = (parseFloat(pChangeText82) * 0.15) / 100; // Parse float to ensure proper calculation
  const pChangeText83 = await scrapeAndSendMessage(
    sunpharmadv,
    ".percentChange",
    "Sun Pharma Advanced Research Company Ltd",
  );
  const rel83 = (parseFloat(pChangeText83) * 0.15) / 100; // Parse float to ensure proper calculation
  const pChangeText84 = await scrapeAndSendMessage(
    orient,
    ".percentChange",
    "Orient Paper Industries Ltd",
  );
  const rel84 = (parseFloat(pChangeText84) * 0.14) / 100; // Parse float to ensure proper calculation
  const pChangeText85 = await scrapeAndSendMessage(
    bharatrasayan,
    ".percentChange",
    "Bharat Rasayan Ltd",
  );
  const rel85 = (parseFloat(pChangeText85) * 0.13) / 100; // Parse float to ensure proper calculation
  const pChangeText86 = await scrapeAndSendMessage(
    nacl,
    ".percentChange",
    "NAACL Industries Ltd",
  );
  const rel86 = (parseFloat(pChangeText86) * 0.12) / 100; // Parse float to ensure proper calculation
  const pChangeText87 = await scrapeAndSendMessage(
    irm,
    ".percentChange",
    "IRM Energy Ltd",
  );
  const rel87 = (parseFloat(pChangeText87) * 0.12) / 100; // Parse float to ensure proper calculation
  const pChangeText88 = await scrapeAndSendMessage(
    vimla,
    ".percentChange",
    "Vimta Labs Ltd",
  );
  const rel88 = (parseFloat(pChangeText88) * 0.12) / 100; // Parse float to ensure proper calculation

  const total =
    rel1 +
    rel2 +
    rel3 +
    rel4 +
    rel5 +
    rel6 +
    rel7 +
    rel8 +
    rel9 +
    rel10 +
    rel11 +
    rel12 +
    rel13 +
    rel14 +
    rel15 +
    rel16 +
    rel17 +
    rel18 +
    rel19 +
    rel20 +
    rel21 +
    rel22 +
    rel23 +
    rel24 +
    rel25 +
    rel26 +
    rel27 +
    rel28 +
    rel29 +
    rel30 +
    rel31 +
    rel32 +
    rel33 +
    rel34 +
    rel35 +
    rel36 +
    rel37 +
    rel38 +
    rel39 +
    rel40 +
    rel41 +
    rel42 +
    rel43 +
    rel44 +
    rel45 +
    rel46 +
    rel47 +
    rel48 +
    rel49 +
    rel50 +
    rel51 +
    rel52 +
    rel53 +
    rel54 +
    rel55 +
    rel56 +
    rel57 +
    rel58 +
    rel59 +
    rel60 +
    rel61 +
    rel62 +
    rel634 +
    rel64 +
    rel65 +
    rel66 +
    rel67 +
    rel68 +
    rel69 +
    rel70 +
    rel71 +
    rel72 +
    rel73 +
    rel74 +
    rel75 +
    rel76 +
    rel77 +
    rel78 +
    rel79 +
    rel80 +
    rel81 +
    rel82 +
    rel83 +
    rel84 +
    rel85 +
    rel86 +
    rel87 +
    rel88;

  // Check for null values before using them
  if (
    !pChangeText1 ||
    !pChangeText2 ||
    !pChangeText3 ||
    !pChangeText4 ||
    !pChangeText5 ||
    !pChangeText6 ||
    !pChangeText7 ||
    !pChangeText8 ||
    !pChangeText9 ||
    !pChangeText10 ||
    !pChangeText11 ||
    !pChangeText12 ||
    !pChangeText13 ||
    !pChangeText14 ||
    !pChangeText15 ||
    !pChangeText16 ||
    !pChangeText17 ||
    !pChangeText18 ||
    !pChangeText19 ||
    !pChangeText20 ||
    !pChangeText21 ||
    !pChangeText22 ||
    !pChangeText23 ||
    !pChangeText24 ||
    !pChangeText25 ||
    !pChangeText26 ||
    !pChangeText27 ||
    !pChangeText28 ||
    !pChangeText29 ||
    !pChangeText30 ||
    !pChangeText31 ||
    !pChangeText32 ||
    !pChangeText33 ||
    !pChangeText34 ||
    !pChangeText35 ||
    !pChangeText36 ||
    !pChangeText37 ||
    !pChangeText38 ||
    !pChangeText39 ||
    !pChangeText40 ||
    !pChangeText41 ||
    !pChangeText42 ||
    !pChangeText43 ||
    !pChangeText44 ||
    !pChangeText45 ||
    !pChangeText46 ||
    !pChangeText47 ||
    !pChangeText48 ||
    !pChangeText49 ||
    !pChangeText50 ||
    !pChangeText51 ||
    !pChangeText52 ||
    !pChangeText53 ||
    !pChangeText54 ||
    !pChangeText55 ||
    !pChangeText56 ||
    !pChangeText57 ||
    !pChangeText58 ||
    !pChangeText59 ||
    !pChangeText60 ||
    !pChangeText61 ||
    !pChangeText62 ||
    !pChangeText63 ||
    !pChangeText64 ||
    !pChangeText65 ||
    !pChangeText66 ||
    !pChangeText67 ||
    !pChangeText68 ||
    !pChangeText69 ||
    !pChangeText70 ||
    !pChangeText71 ||
    !pChangeText72 ||
    !pChangeText73 ||
    !pChangeText74 ||
    !pChangeText75 ||
    !pChangeText76 ||
    !pChangeText77 ||
    !pChangeText78 ||
    !pChangeText79 ||
    !pChangeText80 ||
    !pChangeText81 ||
    !pChangeText82 ||
    !pChangeText83 ||
    !pChangeText84 ||
    !pChangeText85 ||
    !pChangeText86 ||
    !pChangeText87 ||
    !pChangeText88
  ) {
    return;
  }
  console.log(total);

  // Construct and send the message
  const message = `${rel1}\n ${rel2} \n ${rel3} \n ${rel4} \n ${rel5} \n ${rel6} \n ${rel7} \n ${rel8} \n ${rel9} \n ${rel10} \n ${rel11} \n ${rel12} \n ${rel13} \n ${rel14} \n ${rel15} \n ${rel16} \n ${rel17} \n ${rel18} \n ${rel19} \n ${rel20} \n ${rel21} \n ${rel22} \n ${rel23} \n ${rel24} \n ${rel25} \n ${rel26} \n ${rel27} \n ${rel28} \n ${rel29} \n ${rel30} \n ${rel31} \n ${rel32} \n ${rel33} \n ${rel34} \n ${rel35} \n ${rel36} \n ${rel37} \n ${rel38} \n ${rel39} \n ${rel40} \n ${rel41} \n ${rel42} \n ${rel43} \n ${rel44} \n ${rel45} \n ${rel46} \n ${rel47} \n ${rel48} \n ${rel49} \n ${rel50} \n ${rel51} \n ${rel52} \n ${rel53} \n ${rel54} \n ${rel55} \n ${rel56} \n ${rel57} \n ${rel58} \n ${rel59} \n ${rel60} \n ${rel61} \n ${rel62} \n ${rel634}\n ${rel64} \n ${rel65} \n ${rel66} \n ${rel67} \n ${rel68} \n ${rel69} \n ${rel70} \n ${rel71} \n ${rel72} \n ${rel73} \n ${rel74} \n ${rel75} \n ${rel76} \n ${rel77} \n ${rel78} \n ${rel79} \n ${rel80} \n ${rel81} \n ${rel82} \n ${rel83} \n ${rel84} \n ${rel85} \n ${rel86} \n
  Quant Small Cap: ${total}`;
  bot.sendMessage(chatId, message);
});
