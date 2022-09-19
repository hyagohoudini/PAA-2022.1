// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs");
const Parser = require("rss-parser");

export default function handler(req, res) {
  function getTopics(req) {
    const words = [
      "a",
      "à",
      "só",
      "R$",
      "R",
      "adeus",
      "agora",
      "aí",
      "ainda",
      "além",
      "algo",
      "alguém",
      "algum",
      "alguma",
      "algumas",
      "alguns",
      "ali",
      "ampla",
      "amplas",
      "amplo",
      "amplos",
      "ano",
      "anos",
      "ante",
      "antes",
      "ao",
      "aos",
      "apenas",
      "apoio",
      "após",
      "aquela",
      "aquelas",
      "aquele",
      "aqueles",
      "aqui",
      "aquilo",
      "área",
      "as",
      "às",
      "assim",
      "até",
      "atrás",
      "através",
      "baixo",
      "bastante",
      "bem",
      "boa",
      "boas",
      "bom",
      "bons",
      "breve",
      "cá",
      "cada",
      "catorze",
      "cedo",
      "cento",
      "certamente",
      "certeza",
      "cima",
      "cinco",
      "coisa",
      "coisas",
      "com",
      "como",
      "conselho",
      "contra",
      "contudo",
      "custa",
      "da",
      "dá",
      "dão",
      "daquela",
      "daquelas",
      "daquele",
      "daqueles",
      "dar",
      "das",
      "de",
      "debaixo",
      "dela",
      "delas",
      "dele",
      "deles",
      "demais",
      "dentro",
      "depois",
      "desde",
      "dessa",
      "dessas",
      "desse",
      "desses",
      "desta",
      "destas",
      "deste",
      "destes",
      "deve",
      "devem",
      "devendo",
      "dever",
      "deverá",
      "deverão",
      "deveria",
      "deveriam",
      "devia",
      "deviam",
      "dez",
      "dezanove",
      "dezasseis",
      "dezassete",
      "dezoito",
      "dia",
      "diante",
      "disse",
      "disso",
      "disto",
      "dito",
      "diz",
      "dizem",
      "dizer",
      "do",
      "dois",
      "dos",
      "doze",
      "duas",
      "dúvida",
      "e",
      "é",
      "ela",
      "elas",
      "ele",
      "eles",
      "em",
      "embora",
      "enquanto",
      "entre",
      "era",
      "eram",
      "éramos",
      "és",
      "essa",
      "essas",
      "esse",
      "esses",
      "esta",
      "está",
      "estamos",
      "estão",
      "estar",
      "estas",
      "estás",
      "estava",
      "estavam",
      "estávamos",
      "este",
      "esteja",
      "estejam",
      "estejamos",
      "estes",
      "esteve",
      "estive",
      "estivemos",
      "estiver",
      "estivera",
      "estiveram",
      "estivéramos",
      "estiverem",
      "estivermos",
      "estivesse",
      "estivessem",
      "estivéssemos",
      "estiveste",
      "estivestes",
      "estou",
      "etc",
      "eu",
      "exemplo",
      "faço",
      "falta",
      "favor",
      "faz",
      "fazeis",
      "fazem",
      "fazemos",
      "fazendo",
      "fazer",
      "fazes",
      "feita",
      "feitas",
      "feito",
      "feitos",
      "fez",
      "fim",
      "final",
      "foi",
      "fomos",
      "for",
      "fora",
      "foram",
      "fôramos",
      "forem",
      "forma",
      "formos",
      "fosse",
      "fossem",
      "fôssemos",
      "foste",
      "fostes",
      "fui",
      "geral",
      "grande",
      "grandes",
      "grupo",
      "há",
      "haja",
      "hajam",
      "hajamos",
      "hão",
      "havemos",
      "havia",
      "hei",
      "hoje",
      "hora",
      "horas",
      "houve",
      "houvemos",
      "houver",
      "houvera",
      "houverá",
      "houveram",
      "houvéramos",
      "houverão",
      "houverei",
      "houverem",
      "houveremos",
      "houveria",
      "houveriam",
      "houveríamos",
      "houvermos",
      "houvesse",
      "houvessem",
      "houvéssemos",
      "isso",
      "isto",
      "já",
      "la",
      "lá",
      "lado",
      "lhe",
      "lhes",
      "lo",
      "local",
      "logo",
      "longe",
      "lugar",
      "maior",
      "maioria",
      "mais",
      "mal",
      "mas",
      "máximo",
      "me",
      "meio",
      "menor",
      "menos",
      "mês",
      "meses",
      "mesma",
      "mesmas",
      "mesmo",
      "mesmos",
      "meu",
      "meus",
      "mil",
      "minha",
      "minhas",
      "momento",
      "muita",
      "muitas",
      "muito",
      "muitos",
      "na",
      "nada",
      "não",
      "naquela",
      "naquelas",
      "naquele",
      "naqueles",
      "nas",
      "nem",
      "nenhum",
      "nenhuma",
      "nessa",
      "nessas",
      "nesse",
      "nesses",
      "nesta",
      "nestas",
      "neste",
      "nestes",
      "ninguém",
      "nível",
      "no",
      "noite",
      "nome",
      "nos",
      "nós",
      "nossa",
      "nossas",
      "nosso",
      "nossos",
      "nova",
      "novas",
      "nove",
      "novo",
      "novos",
      "num",
      "numa",
      "número",
      "nunca",
      "o",
      "O",
      "obra",
      "obrigada",
      "obrigado",
      "oitava",
      "oitavo",
      "oito",
      "onde",
      "ontem",
      "onze",
      "os",
      "ou",
      "outra",
      "outras",
      "outro",
      "outros",
      "para",
      "parece",
      "parte",
      "partir",
      "paucas",
      "pela",
      "pelas",
      "pelo",
      "pelos",
      "pequena",
      "pequenas",
      "pequeno",
      "pequenos",
      "per",
      "perante",
      "perto",
      "pode",
      "pude",
      "pôde",
      "podem",
      "podendo",
      "poder",
      "poderia",
      "poderiam",
      "podia",
      "podiam",
      "põe",
      "põem",
      "pois",
      "ponto",
      "pontos",
      "por",
      "porém",
      "porque",
      "porquê",
      "posição",
      "possível",
      "possivelmente",
      "posso",
      "pouca",
      "poucas",
      "pouco",
      "poucos",
      "primeira",
      "primeiras",
      "primeiro",
      "primeiros",
      "própria",
      "próprias",
      "próprio",
      "próprios",
      "próxima",
      "próximas",
      "próximo",
      "próximos",
      "pude",
      "puderam",
      "quais",
      "quáis",
      "qual",
      "quando",
      "quanto",
      "quantos",
      "quarta",
      "quarto",
      "quatro",
      "que",
      "quê",
      "quem",
      "quer",
      "quereis",
      "querem",
      "queremas",
      "queres",
      "quero",
      "questão",
      "quinta",
      "quinto",
      "quinze",
      "relação",
      "sabe",
      "sabem",
      "são",
      "se",
      "segunda",
      "segundo",
      "sei",
      "seis",
      "seja",
      "sejam",
      "sejamos",
      "sem",
      "sempre",
      "sendo",
      "ser",
      "será",
      "serão",
      "serei",
      "seremos",
      "seria",
      "seriam",
      "seríamos",
      "sete",
      "sétima",
      "sétimo",
      "seu",
      "seus",
      "sexta",
      "sexto",
      "si",
      "sido",
      "sim",
      "sistema",
      "só",
      "sob",
      "sobre",
      "sois",
      "somos",
      "sou",
      "sua",
      "suas",
      "tal",
      "talvez",
      "também",
      "tampouco",
      "tanta",
      "tantas",
      "tanto",
      "tão",
      "tarde",
      "te",
      "tem",
      "tém",
      "têm",
      "temos",
      "tendes",
      "tendo",
      "tenha",
      "tenham",
      "tenhamos",
      "tenho",
      "tens",
      "ter",
      "terá",
      "terão",
      "terceira",
      "terceiro",
      "terei",
      "teremos",
      "teria",
      "teriam",
      "teríamos",
      "teu",
      "teus",
      "teve",
      "ti",
      "tido",
      "tinha",
      "tinham",
      "tínhamos",
      "tive",
      "tivemos",
      "tiver",
      "tivera",
      "tiveram",
      "tivéramos",
      "tiverem",
      "tivermos",
      "tivesse",
      "tivessem",
      "tivéssemos",
      "tiveste",
      "tivestes",
      "toda",
      "todas",
      "todavia",
      "todo",
      "todos",
      "trabalho",
      "três",
      "treze",
      "tu",
      "tua",
      "tuas",
      "tudo",
      "última",
      "últimas",
      "último",
      "últimos",
      "um",
      "uma",
      "umas",
      "uns",
      "vai",
      "vais",
      "vão",
      "vários",
      "vem",
      "vêm",
      "vendo",
      "vens",
      "ver",
      "vez",
      "vezes",
      "viagem",
      "vindo",
      "vinte",
      "vir",
      "você",
      "vocês",
      "vos",
      "vós",
      "vossa",
      "vossas",
      "vosso",
      "vossos",
      "zero",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "_",
    ];

    function getCount(array) {
      let map = {};
      let final = [];
      for (let i = 0; i < array.length; i++) {
        let item = array[i];
        map[item] = map[item] + 1 || 1;
        final[i] = { palavra: item.toLowerCase(), qtde: map[item] };
      }
      return map;
    }

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    const pickHighest = (obj, num = 1) => {
      const requiredObj = {};
      if (num > Object.keys(obj).length) {
        return false;
      }
      Object.keys(obj)
        .sort((a, b) => obj[b] - obj[a])
        .forEach((key, ind) => {
          if (ind < num) {
            requiredObj[key] = obj[key];
          }
        });
      return requiredObj;
    };

    const array = req;
    const content = array.match(
      /\b([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+)\b/g
    );

    const withoutStopWords = content.filter((word) => {
      if (!words.includes(word.toLowerCase())) return word;
    });

    var aux = [];

    try {
      const aux = getCount(withoutStopWords);

      return Object.keys(pickHighest(aux, 10));
    } catch (e) {
      console.log(e);
    }
  }

  let items = [];
  (async function main() {
    // Make a new RSS Parser
    const parser = new Parser();
    const body = req.body;
    // Get all the items in the RSS feed
    var feed;
    try {
      feed = await parser.parseURL(body.url); // https://www.reddit.com/.rss
    } catch (e) {
      res.status(403).json({ status: "error" });
      return;
    }

    // Clean up the string and replace reserved characters
    // const fileName = `${feed.title
    //   .replace(/\s+/g, "-")
    //   .replace(/[/\\?%*:|"<>]/g, "")
    //   .toLowerCase()}.json`;
    const fileName = "g1.json";

    // Add the items to the items array
    await Promise.all(
      feed.items.map(async (currentItem) => {
        // Add a new item if it doesn't already exist
        if (
          items.filter((item) => isEquivalent(item, currentItem)).length <= 0
        ) {
          const aux = new Object(currentItem);
          const image = currentItem.content
            .split('" />')[0]
            .replace(/<img src="/, "")
            .trim();

          const content = currentItem.content.split("<br />   ");

          if (currentItem.content.split('" />').length > 1) {
            const subTitle = content[1].split(".")[0];
            aux.subTitle = subTitle;
            aux.image = image;
            aux.content = content[1].replace(subTitle + ".", "");
            aux.topics = getTopics(aux.content);
            aux.liked = false;
          } else {
            aux.image = "";
            aux.topics = getTopics(currentItem.content);
          }
          items.push(aux);
        }
      })
    );

    // Save the file
    fs.writeFileSync(fileName, JSON.stringify(items));
  })();

  function isEquivalent(a, b) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // if number of properties is different, objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      let propName = aProps[i];

      // if values of same property are not equal, objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // if we made it this far, objects are considered equivalent
    return true;
  }
  res.status(200).json({ status: "OK" });
}

// Link para o RSS http://g1.globo.com/dynamo/brasil/rss2.xml
