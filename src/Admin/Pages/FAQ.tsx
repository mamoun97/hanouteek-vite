import useLang from '../../hoock/useLang'
import { Accordion, cn } from 'rizzui';
import { IoIosArrowDown } from 'react-icons/io';

export default function FAQ() {
    const { tr } = useLang()
    return (
        <div>
            <div className=' flex items-center flex-col gap-2 justify-center text-3xl my-14'>
                <span className='font-semibold'>{tr.drower.faq}</span>
                {/* <p className='text-sm opacity-70 text-center'>Questions Fréquemment Posées (FAQ)</p> */}
            </div>

            {tr.faqs.items.map((item, k) => (
                <Accordion
                    key={"item" + k}
                    className="mx-8 border-b border-muted last-of-type:border-b-0"
                >
                    <Accordion.Header>
                        {({ open }) => {

                            return <div className="flex w-full cursor-pointer items-center justify-between py-5 text-base max-sm:text-sm text-foreground font-semibold">
                                <div className='grow text-start flex gap-1'>
                                <span>{k+1}</span> - <span>{item.question}</span>
                                </div>
                                <IoIosArrowDown
                                    className={cn(
                                        "h-5 w-5 min-w-[20px] rotate-0 transform transition-transform duration-300",
                                        open && "rotate-180"
                                    )}
                                />
                            </div>
                        }}
                    </Accordion.Header>
                    <Accordion.Body className="mb-7">
                        {
                            typeof item.response == "string" ? item.response :
                                <ul>
                                    {item.response.map((el, i) => {
                                        return <li>
                                           {i+1} - {el}
                                        </li>
                                    })}
                                </ul>
                        }
                    </Accordion.Body>
                </Accordion>
            ))}
        </div>
    )
}
const q = [
    {
        question: "Quels sont les moyens de paiement ?",
        response: "Nous acceptons plusieurs moyens de paiement, dont Flexy, CCP, Baridimob ou Paysera - Wise. Le choix dépend de la somme que vous avez."
    },
    {
        question: "Y a-t-il des frais mensuels ?",
        response: "Non, c'est gratuit."
    },
    {
        question: "La livraison est-elle disponible sur toutes les wilayas ?",
        response: "Oui, nous livrons dans 58 wilayas."
    },
    {
        question: "Comment passer une commande sur le site et sur l’application ?",
        response: ["Choisissez le produit et cliquez sur 'Plus (+)'",
            "Sélectionnez la couleur et la pointure.",
            `Cliquez sur "Ajouter une commande" et remplissez les informations de l’acheteur :
            - Prénom
            - Nom de famille
            - Adresse
            - Téléphone
            - Wilaya
            - Commune
            - Frais de livraison (À domicile ou Livraison au Bureau)
            - Votre prix de vente`,
            " Cliquez sur 'Ajouter'."]
    },
    {
        question: "Existe-t-il une possibilité de demander un remboursement ?",
        response: "Non, le client doit vérifier son colis avant de payer le livreur."
    },
    {
        question: "Peut-on mettre le client en contact direct avec la société pour demander des informations sur un produit ?",
        response: "Non, le vendeur doit fournir toutes les informations sur le produit. Pour d'autres questions, l'agent de messagerie répondra."
    },
    {
        question: "Le client peut-il récupérer la commande lui-même ?",
        response: "Non, nous faisons uniquement la livraison."
    },
    {
        question: "Avez-vous une garantie sur les produits ?",
        response: "Oui, nous offrons une garantie d’essai de 24 heures, ce qui signifie que le client peut faire une réclamation ou demander un échange dans les 24 heures suivant la réception de la commande, en cas de problème ou de défaut."
    },
    {
        question: "Comment travailler avec Risedrop ?",
        response: [
            "Recherchez les produits sur notre site.",
            "Comprenez le fonctionnement des produits en posant des questions via WhatsApp, Facebook ou par recherche personnelle.",
            "Téléchargez les photos et les informations des produits.",
            "Publiez et promouvez les produits sur les réseaux sociaux (Facebook, Instagram, etc.).",
            "Si un client souhaite acheter, expliquez-lui les détails du produit, le prix et les frais de livraison.",
            "Demandez les coordonnées du client pour passer la commande.",
            "Passez la commande depuis votre compte en saisissant les informations du client.",
            "La société confirmera la commande avec le client dans un délai de 48 heures.",
            "Si la commande apparaît comme annulée après 48 heures, renseignez-vous auprès d'un gérant.",
            "Une fois le produit livré, le bénéfice sera ajouté à votre compte."
        ]
    },
    {
        question: "Où publier ?",
        response: "Vous êtes libre d'utiliser diverses méthodes de partage : Facebook, Instagram, Marketplace, groupes, etc. Vous pouvez également créer une page de vente tant qu'elle ne porte pas le nom officiel de notre page, RISEDROP, et vous pouvez faire de la publicité."
    },
]
/*






*/