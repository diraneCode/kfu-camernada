"use client"

import { DialogClose } from "@/components/ui/dialog"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Bookmark,
  Calendar,
  ChevronLeft,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  MessageCircle,
  Share2,
  Twitter,
  User,
} from "lucide-react"

// Sample data
const articles = [
  {
    id: "1",
    title: "Célébration de la fête nationale du Cameroun à Montréal",
    excerpt:
      "Retour sur les festivités organisées par la communauté camerounaise pour célébrer la fête nationale du 20 mai à Montréal.",
    content:
      "La communauté camerounaise de Montréal s'est réunie le week-end dernier pour célébrer la fête nationale du Cameroun. L'événement a rassemblé plus de 500 personnes au Centre culturel de Montréal, où diverses activités ont été organisées pour mettre en valeur la culture camerounaise.\n\nLa journée a débuté par une cérémonie officielle en présence du consul honoraire du Cameroun et de plusieurs dignitaires locaux. Les participants ont entonné l'hymne national camerounais avec fierté, suivi d'une série de discours sur l'importance de préserver les liens avec la patrie d'origine tout en s'intégrant dans la société canadienne.\n\nLe programme culturel était riche et varié, avec des performances de danse traditionnelle, des défilés de mode mettant en valeur les tenues traditionnelles des différentes régions du Cameroun, et des concerts de musique live. Les artistes locaux ont offert des prestations mémorables, faisant vibrer la salle au rythme des sons camerounais.\n\nLe point culminant de la journée a été le buffet gastronomique, où les participants ont pu déguster une variété de plats traditionnels camerounais. Du ndolé au poulet DG, en passant par le kondré et le eru, les saveurs du Cameroun étaient à l'honneur. Les chefs bénévoles de la communauté avaient travaillé d'arrache-pied pour préparer ces délices culinaires.\n\nL'événement a également été l'occasion de renforcer les liens au sein de la communauté et de présenter aux plus jeunes générations nées au Canada les richesses culturelles de leur pays d'origine. Des stands d'information étaient disponibles pour ceux qui souhaitaient en apprendre davantage sur les projets de développement au Cameroun et les opportunités d'investissement.\n\nCette célébration a prouvé une fois de plus la vitalité et le dynamisme de la communauté camerounaise au Canada, et son attachement à ses racines culturelles tout en embrassant pleinement sa nouvelle patrie. Les organisateurs ont déjà annoncé leur intention de faire de cet événement une tradition annuelle encore plus grande pour les années à venir.",
    author: "Thomas Kamdem",
    date: "22 Mai 2024",
    image: "/placeholder.svg?height=600&width=1000",
    category: "Événements",
    tags: ["Fête nationale", "Culture", "Montréal"],
  },
  {
    id: "2",
    title: "Guide pour les nouveaux arrivants camerounais au Canada",
    excerpt:
      "Conseils pratiques pour faciliter l'installation et l'intégration des Camerounais récemment arrivés au Canada.",
    content:
      "S'installer dans un nouveau pays est une expérience à la fois excitante et intimidante. Pour les Camerounais qui viennent de s'établir au Canada, il existe plusieurs défis à relever, de la recherche de logement à l'adaptation au climat rigoureux. Ce guide vise à faciliter cette transition en fournissant des conseils pratiques basés sur l'expérience de ceux qui ont fait ce parcours avant vous.\n\nPréparation avant le départ\n\nAvant même de quitter le Cameroun, il est essentiel de bien se préparer. Assurez-vous d'avoir tous vos documents importants en ordre : passeport, visa, permis d'études ou de travail, certificats de naissance, diplômes et relevés de notes. Faites des copies de tous ces documents et conservez-les séparément.\n\nRenseignez-vous sur la ville canadienne où vous allez vous installer. Chaque province et ville a ses particularités en termes de coût de la vie, de climat, de culture et d'opportunités d'emploi. Montréal, Toronto, Ottawa, Vancouver, Calgary... chacune offre une expérience unique.\n\nLes premiers jours\n\nDès votre arrivée, plusieurs démarches administratives sont à entreprendre :\n\n1. Obtenir un numéro d'assurance sociale (NAS), indispensable pour travailler légalement\n2. Ouvrir un compte bancaire canadien\n3. Obtenir une carte d'assurance maladie provinciale\n4. Trouver un logement temporaire puis permanent\n\nPour le logement, les options incluent la colocation, les résidences universitaires (pour les étudiants), ou la location d'un appartement. Les sites comme Kijiji ou Marketplace de Facebook sont utiles pour trouver des offres. N'hésitez pas à contacter la communauté camerounaise locale qui peut souvent offrir de l'aide ou des conseils précieux.\n\nS'adapter au climat\n\nLe climat canadien, particulièrement l'hiver, peut constituer un choc pour les Camerounais habitués au climat tropical. Investissez dans des vêtements appropriés : manteau d'hiver de qualité, bottes imperméables, gants, écharpe et bonnet. Apprenez à vous habiller en « couches » pour pouvoir ajuster votre tenue en fonction des variations de température entre l'extérieur et l'intérieur des bâtiments, qui sont généralement bien chauffés.\n\nIntégration sociale et culturelle\n\nL'intégration passe par la participation à la vie sociale et culturelle :\n\n- Rejoignez des associations camerounaises ou africaines locales\n- Participez aux événements communautaires\n- Suivez des cours de français ou d'anglais si nécessaire\n- Soyez ouvert à découvrir la culture canadienne tout en partageant la vôtre\n\nEmploi et études\n\nPour les études, renseignez-vous sur les équivalences de diplômes et les programmes de bourses disponibles. Pour l'emploi, mettez à jour votre CV au format canadien, qui diffère souvent du format camerounais. Les services d'aide à l'emploi pour immigrants peuvent vous accompagner dans cette démarche.\n\nSoutien et ressources\n\nPlusieurs organismes offrent du soutien aux nouveaux arrivants :\n- Services d'accueil et d'intégration des immigrants\n- Centres communautaires culturels\n- Associations étudiantes internationales\n- Groupes religieux\n\nLe plus important est de garder une attitude positive et de faire preuve de persévérance. L'adaptation prend du temps, mais le Canada offre d'excellentes opportunités pour ceux qui sont prêts à relever les défis initiaux. La communauté camerounaise est solidaire et constitue un précieux réseau de soutien durant cette période de transition.",
    author: "Marie Ngo",
    date: "15 Avril 2024",
    image: "/placeholder.svg?height=600&width=1000",
    category: "Guides",
    tags: ["Immigration", "Installation", "Conseils"],
  },
  {
    id: "3",
    title: "Succès entrepreneurial: Portrait de Jean Mbarga, fondateur de 'Tech Africa'",
    excerpt:
      "Découvrez le parcours inspirant de Jean Mbarga, entrepreneur camerounais qui a créé 'Tech Africa', une startup technologique à succès basée à Toronto.",
    content:
      "Le parcours entrepreneurial de Jean Mbarga illustre parfaitement le potentiel d'innovation et de réussite de la diaspora camerounaise au Canada. Originaire de Yaoundé, cet ingénieur informatique de formation a su transformer une idée visionnaire en une entreprise technologique florissante, devenant ainsi un modèle pour de nombreux jeunes entrepreneurs.\n\nDes débuts modestes\n\nArrivé à Toronto en 2015 avec seulement une valise et un diplôme d'ingénieur obtenu à l'École Nationale Supérieure Polytechnique de Yaoundé, Jean Mbarga a d'abord travaillé comme développeur dans une entreprise canadienne. \"Les premiers mois ont été difficiles. Je devais m'adapter à un nouvel environnement professionnel, améliorer mon anglais technique et comprendre le marché local,\" se souvient-il.\n\nAprès deux ans d'expérience professionnelle au Canada, Jean a identifié une opportunité : de nombreuses entreprises africaines peinaient à trouver des solutions technologiques adaptées à leurs réalités spécifiques. Les solutions occidentales existantes étaient souvent trop coûteuses ou inadaptées aux infrastructures locales.\n\nLa naissance de Tech Africa\n\nEn 2018, avec 50 000 dollars économisés et un prêt bancaire, Jean a fondé Tech Africa, une entreprise spécialisée dans le développement de solutions logicielles sur mesure pour les marchés émergents africains. Sa première innovation majeure a été une plateforme de paiement mobile adaptée aux réalités du continent, où la bancarisation reste limitée mais où l'utilisation du téléphone portable est très répandue.\n\n\"Je voulais créer une entreprise qui servirait de pont entre le savoir-faire technologique nord-américain et les besoins spécifiques du marché africain. Notre avantage, c'est que nous comprenons intimement les deux environnements,\" explique l'entrepreneur.\n\nCroissance et reconnaissance\n\nEn seulement cinq ans, Tech Africa est passée de 3 à 45 employés, avec des bureaux à Toronto, Yaoundé et Nairobi. L'entreprise a développé un portefeuille diversifié de solutions dans les domaines de la fintech, de l'agritech et de la santé numérique.\n\nEn 2022, Jean Mbarga a été nommé parmi les \"40 entrepreneurs africains les plus prometteurs\" par le magazine Forbes Africa. La même année, Tech Africa a levé 5 millions de dollars auprès d'investisseurs nord-américains et africains pour accélérer son développement.\n\nUn engagement pour la communauté\n\nMalgré son succès, Jean n'oublie pas ses racines. Il consacre une partie de son temps à mentorer de jeunes entrepreneurs camerounais et a créé un programme de bourses permettant à des étudiants talentueux du Cameroun de venir poursuivre leurs études en informatique au Canada.\n\n\"Je crois fermement au potentiel de l'Afrique dans le domaine technologique. Notre continent regorge de talents qui n'attendent que l'opportunité de s'exprimer. Mon objectif est de créer un écosystème qui facilitera l'émergence d'une nouvelle génération d'innovateurs africains,\" affirme-t-il.\n\nL'entreprise organise régulièrement des hackathons à Yaoundé et à Douala, offrant aux gagnants des stages dans ses bureaux de Toronto. Plusieurs de ces stagiaires ont ensuite été recrutés à des postes permanents.\n\nVision pour l'avenir\n\nPour l'avenir, Jean Mbarga voit grand. Il travaille actuellement sur un ambitieux projet d'incubateur technologique à Douala, qui offrira infrastructure, financement et mentorat à des startups camerounaises prometteuses.\n\n\"Mon rêve est de voir émerger une Silicon Valley africaine, où les talents locaux pourront développer des solutions innovantes pour répondre aux défis spécifiques du continent,\" partage-t-il avec enthousiasme.\n\nSon conseil aux entrepreneurs en herbe? \"N'ayez pas peur de rêver grand, mais commencez petit. Identifiez un problème réel que vous comprenez intimement, et trouvez une solution viable. Le succès ne vient pas du jour au lendemain, mais avec de la persévérance, de l'apprentissage continu et une capacité d'adaptation, tout est possible.\"",
    author: "Philippe Etonde",
    date: "3 Mars 2024",
    image: "/placeholder.svg?height=600&width=1000",
    category: "Success Stories",
    tags: ["Entrepreneuriat", "Technologie", "Diaspora"],
  },
  {
    id: "4",
    title: "Recette traditionnelle: Le Ndolé comme au pays",
    excerpt:
      "Apprenez à préparer le ndolé, plat emblématique de la cuisine camerounaise, avec cette recette authentique et détaillée.",
    content:
      "Le ndolé est sans conteste l'un des plats les plus emblématiques de la cuisine camerounaise. Ce mets savoureux, à base de feuilles amères et de viande ou de poisson, est souvent considéré comme le plat national. Aujourd'hui, nous vous proposons une recette authentique qui vous permettra de retrouver les saveurs du Cameroun, même à des milliers de kilomètres de distance.\n\nIngrédients (pour 6 personnes):\n\nPour les feuilles de ndolé:\n- 1 kg de feuilles de ndolé (fraîches ou surgelées, disponibles dans les épiceries africaines)\n- 2 cuillères à soupe de bicarbonate de soude (si vous utilisez des feuilles fraîches)\n\nPour la sauce:\n- 500 g de bœuf coupé en morceaux (ou poulet ou poisson selon votre préférence)\n- 400 g de crevettes séchées moulues (ou fraîches)\n- 250 g d'arachides (cacahuètes) non salées\n- 2 gros oignons émincés\n- 4 gousses d'ail écrasées\n- 2 cuillères à soupe de gingembre frais râpé\n- 2-3 piments (facultatif, selon votre tolérance à la chaleur)\n- 2 cubes de bouillon\n- 1 tasse d'huile d'arachide ou d'huile végétale\n- Sel et poivre à votre goût\n\nPréparation:\n\n1. Préparation des feuilles de ndolé:\n\nSi vous utilisez des feuilles fraîches, lavez-les soigneusement puis faites-les bouillir dans une grande marmite d'eau avec le bicarbonate de soude pendant environ 30 minutes. Cette étape permet d'éliminer l'amertume. Égouttez, rincez abondamment à l'eau froide, puis pressez pour éliminer l'excès d'eau.\n\nSi vous utilisez des feuilles surgelées, décongelez-les et pressez-les pour éliminer l'excès d'eau.\n\n2. Préparation de la pâte d'arachide:\n\nFaites griller légèrement les arachides si elles ne sont pas déjà grillées. Mixez-les ensuite finement jusqu'à obtenir une pâte. Ajoutez un peu d'eau tiède si nécessaire pour faciliter le mixage.\n\n3. Préparation de la viande:\n\nDans une grande marmite, faites chauffer l'huile à feu moyen-vif. Ajoutez les oignons émincés et faites-les revenir jusqu'à ce qu'ils deviennent translucides. Ajoutez l'ail et le gingembre, et faites cuire pendant une minute supplémentaire jusqu'à ce que les arômes se libèrent.\n\nAjoutez la viande et faites-la dorer de tous les côtés. Assaisonnez avec du sel, du poivre et les cubes de bouillon émiettés. Couvrez avec environ 2 tasses d'eau, réduisez le feu et laissez mijoter jusqu'à ce que la viande soit tendre (environ 30-45 minutes).\n\n4. Préparation du ndolé:\n\nUne fois la viande cuite, ajoutez les crevettes moulues et la pâte d'arachide dans la marmite. Mélangez bien et laissez cuire à feu doux pendant environ 10 minutes, en remuant régulièrement pour éviter que la pâte ne colle au fond.\n\nAjoutez les feuilles de ndolé préparées et mélangez bien. Si le mélange est trop épais, ajoutez un peu d'eau. Laissez mijoter à couvert pendant environ 20-30 minutes à feu doux, en remuant de temps en temps.\n\nAjoutez les piments entiers ou hachés selon votre préférence. Goûtez et ajustez l'assaisonnement si nécessaire.\n\n5. Service:\n\nLe ndolé se sert traditionnellement avec du miondo (bâtons de manioc), du plantain mûr frit, ou du riz blanc.\n\nAstuces de préparation:\n\n- Les feuilles de ndolé peuvent être remplacées par des épinards si vous ne trouvez pas de ndolé, bien que le goût ne soit pas exactement le même.\n- La pâte d'arachide peut être remplacée par du beurre de cacahuète non sucré en cas de besoin.\n- Pour une version plus rapide, vous pouvez utiliser un mélange d'épices pour ndolé disponible dans les épiceries africaines.\n- Pour une saveur plus riche, vous pouvez ajouter du poisson fumé en plus de la viande et des crevettes.\n\nLe ndolé est un plat qui demande un certain temps de préparation, mais le résultat en vaut vraiment la peine. C'est un plat parfait pour les rassemblements familiaux ou entre amis, où il ne manquera pas d'impressionner vos convives par ses saveurs riches et complexes. Bon appétit ou comme on dit au Cameroun, \"Bon appétit et surtout, mangez tout!\"",
    author: "Sophie Nana",
    date: "20 Février 2024",
    image: "/placeholder.svg?height=600&width=1000",
    category: "Cuisine",
    tags: ["Recettes", "Gastronomie", "Tradition"],
  },
  {
    id: "5",
    title: "Étudier au Canada: Bourses disponibles pour les étudiants camerounais",
    excerpt:
      "Découvrez les différentes opportunités de bourses d'études offertes aux étudiants camerounais souhaitant poursuivre leurs études supérieures au Canada.",
    content:
      "Pour de nombreux étudiants camerounais, poursuivre des études supérieures au Canada représente une opportunité exceptionnelle d'accéder à une éducation de qualité internationale. Cependant, le coût des études et de la vie au Canada peut constituer un obstacle majeur. Heureusement, plusieurs programmes de bourses sont spécifiquement destinés aux étudiants camerounais et africains. Voici un guide complet des principales opportunités disponibles.\n\nBourses gouvernementales canadiennes\n\n1. Programme canadien de bourses de la Francophonie (PCBF)\nCe programme, financé par le gouvernement canadien, offre des bourses aux étudiants des pays francophones en développement, dont le Cameroun. Il couvre les frais de scolarité, le billet d'avion, les frais de subsistance, l'assurance maladie et d'autres dépenses essentielles.\nNiveau d'études : Maîtrise et doctorat\nDate limite : Généralement en septembre-octobre pour une rentrée l'année suivante\nSite web : www.boursesfrancophonie.ca\n\n2. Bourses d'exemption des frais de scolarité supplémentaires pour étudiants étrangers (Québec)\nCes bourses permettent aux étudiants internationaux de payer les mêmes frais de scolarité que les étudiants québécois dans les universités francophones du Québec, représentant une économie substantielle.\nNiveau d'études : Tous niveaux universitaires\nProcédure : Ces bourses sont généralement attribuées par les universités québécoises. Contactez directement l'établissement qui vous intéresse.\n\n3. Bourses d'études Vanier Canada\nDestinées aux doctorants de haut niveau, ces prestigieuses bourses valent 50 000 $ par an pendant trois ans.\nNiveau d'études : Doctorat uniquement\nDate limite : Novembre\nSite web : www.vanier.gc.ca\n\nBourses des universités canadiennes\n\nLa plupart des universités canadiennes offrent des bourses spécifiques pour les étudiants internationaux :\n\n1. Université de Montréal - Bourses d'exemption des frais majorés\nCes bourses réduisent considérablement les frais de scolarité pour les étudiants internationaux.\n\n2. Université Laval - Programme de bourses d'excellence pour étudiants étrangers\nOffre différents niveaux de soutien financier selon le mérite académique.\n\n3. Université McGill - Bourses d'admission pour étudiants internationaux\nBourses basées sur l'excellence académique, pouvant couvrir une partie des frais de scolarité.\n\n4. Université d'Ottawa - Bourses internationales\nPlusieurs programmes de bourses sont disponibles, notamment pour les étudiants francophones.\n\n5. Université de Toronto - Lester B. Pearson International Scholarship\nBourse prestigieuse couvrant les frais de scolarité, de logement, de repas et de livres pendant quatre ans.\n\nBourses du gouvernement camerounais\n\nLe gouvernement camerounais offre également quelques programmes de bourses pour les études à l'étranger :\n\n1. Bourses d'excellence présidentielles\nAttribuées aux meilleurs étudiants camerounais pour poursuivre des études à l'étranger dans des domaines jugés prioritaires pour le développement national.\n\n2. Bourses du Ministère de l'Enseignement Supérieur\nProgrammes ponctuels selon les accords bilatéraux entre le Cameroun et d'autres pays, dont le Canada.\n\nBourses d'organisations internationales\n\n1. Programme de bourses de la Banque Mondiale\nFinance des études de maîtrise et de doctorat dans des domaines liés au développement.\n\n2. Bourses de la Fondation Mastercard pour l'Afrique\nDestinées aux jeunes Africains académiquement talentueux mais économiquement défavorisés.\n\n3. Bourses de l'OQAJ (Office Québec-Afrique pour la Jeunesse)\nSoutient la mobilité des jeunes entre le Québec et les pays africains pour des stages et des études.\n\nConseils pour maximiser vos chances d'obtenir une bourse\n\n1. Commencez tôt : La plupart des processus de demande de bourse commencent au moins un an avant la date prévue pour le début des études.\n\n2. Excellez académiquement : Maintenez d'excellentes notes, car la plupart des bourses sont attribuées au mérite.\n\n3. Préparez un dossier solide : Investissez du temps dans la rédaction de votre lettre de motivation et dans la préparation de tous les documents requis.\n\n4. Recherchez largement : Ne vous limitez pas aux bourses les plus connues. De nombreuses petites fondations et organisations offrent également des financements.\n\n5. Apprenez le français et/ou l'anglais : La maîtrise des langues officielles du Canada est souvent un critère important.\n\n6. Contactez les anciens boursiers : Leur expérience peut vous fournir des conseils précieux sur le processus de candidature.\n\nSites web utiles pour la recherche de bourses\n\n- EduCanada.ca : Site officiel du gouvernement canadien pour les étudiants internationaux\n- ScholarshipsCanada.com : Base de données complète des bourses disponibles au Canada\n- Universities Canada : Informations sur les universités canadiennes et leurs programmes de bourses\n\nLes études au Canada représentent un investissement important, mais avec une bonne préparation et en explorant toutes les options de financement disponibles, ce rêve peut devenir réalité pour de nombreux étudiants camerounais. N'hésitez pas à contacter directement les universités canadiennes qui vous intéressent, car elles disposent souvent de ressources spécifiques pour aider les étudiants internationaux à financer leurs études.",
    author: "Dr. Paul Biya",
    date: "10 Janvier 2024",
    image: "/placeholder.svg?height=600&width=1000",
    category: "Éducation",
    tags: ["Études", "Bourses", "Université"],
  },
  {
    id: "6",
    title: "Préservation des langues camerounaises en diaspora: initiatives et défis",
    excerpt:
      "Comment les familles camerounaises au Canada transmettent leurs langues maternelles à la nouvelle génération malgré les défis de l'intégration.",
    content:
      "Le Cameroun, souvent surnommé « l'Afrique en miniature », compte plus de 250 langues locales qui constituent un patrimoine culturel d'une richesse exceptionnelle. Cependant, lorsque les Camerounais s'installent à l'étranger, notamment au Canada, la préservation et la transmission de ces langues maternelles aux nouvelles générations deviennent un véritable défi. Entre l'impératif d'intégration dans la société d'accueil et le désir de maintenir vivantes les racines culturelles, comment les familles de la diaspora camerounaise au Canada relèvent-elles ce défi?\n\nLes défis de la transmission linguistique en contexte migratoire\n\nPlusieurs facteurs compliquent la transmission des langues camerounaises en diaspora :\n\n1. L'environnement linguistique dominant\nLes enfants nés ou élevés au Canada sont immergés dans un environnement où le français et l'anglais dominent. L'école, les médias et les relations sociales renforcent constamment ces langues officielles, reléguant souvent les langues d'origine au second plan.\n\n2. La perception d'utilité limitée\nCertains jeunes peuvent percevoir les langues camerounaises comme ayant une utilité limitée dans leur contexte canadien, ce qui réduit leur motivation à les apprendre.\n\n3. La diversité linguistique camerounaise elle-même\nParfois, au sein d'une même famille, les parents peuvent parler différentes langues camerounaises, ce qui complique la transmission.\n\n4. Le manque de ressources pédagogiques\nContrairement au français ou à l'anglais, les ressources pour apprendre les langues camerounaises (livres, applications, contenus médiatiques) sont relativement limitées.\n\nInitiatives pour préserver les langues camerounaises au Canada\n\nMalgré ces défis, plusieurs initiatives témoignent d'une volonté forte de préserver cet héritage linguistique :\n\n1. Les écoles du samedi\nDans plusieurs villes canadiennes comme Montréal, Toronto et Ottawa, des associations camerounaises ont mis en place des \"écoles du samedi\" où les enfants peuvent apprendre leur langue maternelle. L'Association des Bamileké de Montréal, par exemple, organise des cours hebdomadaires de fe'efe'e, de ghomala' et d'autres langues des Grassfields.\n\n2. Les plateformes numériques\nCertains linguistes et passionnés camerounais ont développé des applications mobiles et des plateformes en ligne pour faciliter l'apprentissage de langues comme le duala, le bassa, l'ewondo ou le fulfuldé. L'application \"Parlez Camerounais\", développée par un informaticien camerounais de Toronto, propose des leçons interactives dans plusieurs langues camerounaises.\n\n3. Les groupes culturels\nDes groupes comme \"Bamiléké Cultural Association of Ottawa\" ou \"Cameroon Cultural Association of British Columbia\" organisent régulièrement des événements culturels où les langues camerounaises sont mises à l'honneur à travers des contes, des chants et des danses traditionnelles.\n\n4. Les initiatives familiales\nCertaines familles adoptent la stratégie \"une personne, une langue\" où chaque parent s'adresse systématiquement à l'enfant dans une langue spécifique. D'autres instaurent des \"journées en langue maternelle\" où seule la langue d'origine est parlée à la maison.\n\nPortraits de réussite\n\nL'expérience de la famille Ngando à Montréal illustre bien les stratégies qui peuvent fonctionner. Originaires de la région du Littoral, Jean et Marie Ngando ont réussi à transmettre le duala à leurs trois enfants nés au Canada.\n\n\"Nous avons toujours parlé duala à la maison,\" explique Jean. \"Nous avons également connecté nos enfants avec leurs grands-parents au Cameroun via des appels vidéo hebdomadaires, où ils ne parlent qu'en duala. Les vacances d'été au Cameroun tous les deux ans ont également joué un rôle crucial.\"\n\nLeur fille aînée, Esther, 17 ans, témoigne : \"Au début, je ne voyais pas l'intérêt d'apprendre le duala. Mais après mon premier voyage au Cameroun à 10 ans, tout a changé. Pouvoir communiquer avec ma grand-mère dans sa langue a créé un lien spécial. Aujourd'hui, je suis fière de parler duala et je l'enseigne même à mes amis d'origine camerounaise qui ne l'ont pas appris.\"\n\nÀ Toronto, l'initiative du Dr. Samuel Eto'o (homonyme du célèbre footballeur), linguiste spécialisé dans les langues bantoues, mérite également d'être soulignée. Il a créé une bibliothèque numérique de ressources audio et écrites en bassa, sa langue maternelle, et organise des sessions d'apprentissage virtuelles qui connectent des apprenants de tout le Canada.\n\nRéflexions des experts\n\nLa Dre. Justine Fotso, sociolinguiste à l'Université de Montréal, souligne l'importance du maintien des langues d'origine : \"Les recherches montrent que les enfants qui maîtrisent leur langue maternelle en plus des langues officielles développent une meilleure flexibilité cognitive et une identité culturelle plus solide. Loin d'être un obstacle à l'intégration, le bilinguisme ou le multilinguisme constitue un atout considérable.\"\n\nElle ajoute cependant : \"Pour que la transmission réussisse, il est essentiel que la langue soit présentée comme une ressource précieuse et non comme une obligation. L'aspect affectif et le lien avec la culture vivante sont déterminants.\"\n\nPerspectives d'avenir\n\nPlusieurs développements récents laissent entrevoir un avenir prometteur pour la préservation des langues camerounaises en diaspora :\n\n1. La reconnaissance croissante du multilinguisme comme atout dans la société canadienne\n2. L'intérêt renouvelé des jeunes générations pour leurs racines culturelles\n3. Les possibilités offertes par les technologies numériques pour l'apprentissage linguistique\n4. Les collaborations entre universités canadiennes et camerounaises pour documenter et enseigner ces langues\n\nCependant, ces efforts resteront insuffisants sans une mobilisation continue de la communauté camerounaise elle-même. Comme le résume Simon Nkoma, président de l'Alliance Culturelle Camerounaise de Québec : \"Nos langues sont des trésors que nous avons la responsabilité de transmettre. Chaque mot préservé est une victoire contre l'oubli et un pont entre les générations.\"",
    author: "Evelyne Nkoulou",
    date: "5 Décembre 2023",
    image: "/placeholder.svg?height=600&width=1000",
    category: "Culture",
    tags: ["Langues", "Diaspora", "Identité"],
  },
]

// Related articles function
const getRelatedArticles = (currentArticle) => {
  return articles
    .filter((article) => article.id !== currentArticle.id && article.category === currentArticle.category)
    .slice(0, 3)
}

export default function BlogArticlePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(12)
  const [commentCount, setCommentCount] = useState(5)

  const article = articles.find((a) => a.id === params.id)

  if (!article) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        <p className="mb-8">L&apos;article que vous recherchez n&apos;existe pas.</p>
        <Button onClick={() => router.push("/blog")} className="bg-red-600 hover:bg-red-700">
          Retour au blog
        </Button>
      </div>
    )
  }

  const relatedArticles = getRelatedArticles(article)

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
      toast({
        title: "Article aimé",
        description: "Merci d'avoir aimé cet article !",
      })
    }
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Article retiré des favoris" : "Article ajouté aux favoris",
      description: isBookmarked ? "L'article a été retiré de vos favoris" : "L'article a été ajouté à vos favoris",
    })
  }

  const handleShare = () => {
    setShowShareDialog(true)
  }

  return (
    <>
      <div className="container py-32">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-8">
            <Link href="/blog" className="hover:text-red-600 transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-200">{article.title}</span>
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-red-600 text-white rounded-full">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>{commentCount} commentaires</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <span className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>

          {/* Article Actions */}
          <div className="flex justify-between items-center border-t border-b border-gray-200 dark:border-gray-800 py-4 mb-12">
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className={isLiked ? "text-red-600" : ""} onClick={handleLike}>
                <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-red-600" : ""}`} />
                {likeCount}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                {commentCount}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleBookmark}>
                <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Enregistré" : "Enregistrer"}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>
          </div>

          {/* Author Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                <Image src="/placeholder.svg?height=100&width=100" alt={article.author} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{article.author}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Auteur et contributeur régulier au blog de la communauté camerounaise au Canada. Passionné par le
                  partage de connaissances et d&apos;expériences pour aider les membres de la diaspora.
                </p>
                <div className="flex gap-2">
                  <Link href="#">
                    <Button variant="outline" size="sm">
                      Voir le profil
                    </Button>
                  </Link>
                  <Link href="#">
                    <Button variant="outline" size="sm">
                      Tous ses articles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Commentaires ({commentCount})</h3>
            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={`/placeholder.svg?height=100&width=100&text=${i + 1}`}
                      alt={`Commentateur ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">Utilisateur {i + 1}</h4>
                      <span className="text-sm text-gray-500">
                        Il y a {i + 1} jour{i > 0 ? "s" : ""}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {i === 0
                        ? "Excellent article ! J'ai beaucoup appris sur ce sujet. Merci pour ce partage enrichissant."
                        : "Je suis tout à fait d'accord avec les points soulevés dans cet article. C'est une réflexion importante pour notre communauté."}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <button className="text-sm text-gray-500 hover:text-red-600">Répondre</button>
                      <button className="text-sm text-gray-500 hover:text-red-600">J&apos;aime</button>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                Voir tous les commentaires
              </Button>

              <div className="pt-6">
                <h4 className="font-semibold mb-4">Ajouter un commentaire</h4>
                <textarea
                  className="w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-900"
                  placeholder="Partagez votre opinion..."
                ></textarea>
                <Button className="mt-4 bg-red-600 hover:bg-red-700">Publier le commentaire</Button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Articles similaires</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/blog/${relatedArticle.id}`}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-all group">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-5">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{relatedArticle.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Button variant="outline" className="gap-2" onClick={() => router.push("/blog")}>
              <ChevronLeft className="h-4 w-4" />
              Retour au blog
            </Button>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Partager cet article</DialogTitle>
            <DialogDescription>Partagez cet article sur vos réseaux sociaux</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
              <Facebook className="h-6 w-6 text-blue-600" />
              <span className="text-xs">Facebook</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
              <Twitter className="h-6 w-6 text-blue-400" />
              <span className="text-xs">Twitter</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
              <Linkedin className="h-6 w-6 text-blue-700" />
              <span className="text-xs">LinkedIn</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
              <Instagram className="h-6 w-6 text-pink-600" />
              <span className="text-xs">Instagram</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <label htmlFor="link" className="sr-only">
                Lien
              </label>
              <input
                id="link"
                defaultValue={`https://camcanada.com/blog/${article.id}`}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-900"
                readOnly
              />
            </div>
            <Button
              size="sm"
              className="px-3 bg-red-600 hover:bg-red-700"
              onClick={() => {
                navigator.clipboard.writeText(`https://camcanada.com/blog/${article.id}`)
                toast({
                  title: "Lien copié",
                  description: "Le lien de l'article a été copié dans le presse-papier",
                })
              }}
            >
              Copier
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Fermer
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
