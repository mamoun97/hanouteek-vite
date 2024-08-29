export const states: StateItem[] = [
    { label: "Pending", value: "pending", description: "" },
    { label: "Unresponsive", value: "unresponsive", description: "" },
    { label: "Not Answered - 1st Attempt", value: "not Answered - 1st Attempt", description: "" },
    { label: "not Answered - 2nd Attempt", value: "not Answered - 2nd Attempt", description: "" },
    { label: "not Answered - 3rd Attempt", value: "not Answered - 3rd Attempt", description: "" },
    { label: "Confirmed", value: "confirmed", description: "" },
    { label: "order preparation", value: "order preparation", description: "" },
    { label: "prepared", value: "prepared", description: "" },
    { label: "Expédié", value: "expédié", description: "" },
    { label: "Processing", value: "processing", description: "" },
    { label: "Out for Delivery", value: "outForDelivery", description: "" },
    { label: "En localisation", value: "En localisation", description: "" },
    { label: "Vers Wilaya", value: "Vers Wilaya", description: "" },
    { label: "Reçu à Wilaya", value: "Reçu à Wilaya", description: "" },
    { label: "Centre", value: "Centre", description: "" },
    { label: "En préparation", value: "En préparation", description: "" },
    { label: "En attente du client", value: "En attente du client", description: "" },
    { label: "Sorti en livraison", value: "Sorti en livraison", description: "" },
    { label: "En attente", value: "En attente", description: "" },
    { label: "En alerte", value: "En alerte", description: "" },
    { label: "Tentative échouée", value: "Tentative échouée", description: "" },
    { label: "Livré", value: "Livré", description: "" },
    { label: "Echèc livraison", value: "Echèc livraison", description: "" },
    { label: "Retour vers centre", value: "Retour vers centre", description: "" },
    { label: "Retourné au centre", value: "Retourné au centre", description: "" },
    { label: "Retour transfert", value: "Retour transfert", description: "" },
    { label: "Retour groupé", value: "Retour groupé", description: "" },
    { label: "Retour à retirer", value: "Retour à retirer", description: "" },
    { label: "Retour vers vendeur", value: "Retour vers vendeur", description: "" },
    { label: "Retourné au vendeurr", value: "Retourné au vendeur", description: "" },
    { label: "Echange échoué", value: "Echange échoué", description: "" },
    { label: "Delivered", value: "delivered", description: "" },
    { label: "Payed", value: "payed", description: "" },
    { label: "Returns", value: "returns", description: "" },
    { label: "Canceled", value: "canceled", description: "" }
];
export const associatStates: StateItem[] = [
    { label: "Pending", value: "pending", description: "" },
    { label: "Unresponsive", value: "unresponsive", description: "" },
    { label: "Not Answered - 1st Attempt", value: "not Answered - 1st Attempt", description: "" },
    { label: "not Answered - 2nd Attempt", value: "not Answered - 2nd Attempt", description: "" },
    { label: "not Answered - 3rd Attempt", value: "not Answered - 3rd Attempt", description: "" },
    { label: "Confirmed", value: "confirmed", description: "" },
    { label: "Returns", value: "returns", description: "" },
    { label: "Canceled", value: "canceled", description: "" }
]
export const vendorStates: StateItem[] = [
    { label: "Canceled", value: "canceled", description: "" }
]


export const Substates = [
    { label: "En attente de traitement", value: "En attente de traitement", description: "" },
    { label: "Accpte", value: "Accpte", description: "" },
    { label: "annul", value: "annul", description: "" },
    { label: "Inoignable", value: "Inoignable", description: "" },
];
export const GestionStatus: StateItem[] = [
    { label: "En localisation", value: "En localisation", description: "" },
    { label: "Reçu à Wilaya", value: "Reçu à Wilaya", description: "" },
    { label: "En attente du client", value: "En attente du client", description: "" },
    { label: "Tentative échouée", value: "Tentative échouée", description: "" },
];
export const returnStates = [
    { label: "default", value: "", description: "" },
    { label: "Return Ok", value: "Return Ok", description: "" },
    { label: "On hold", value: "On hold", description: "" },
];


export const orderStates = {
    default: states,
    failed: GestionStatus,
    associate_sav: [
        { label: "Not Answered - 1st Attempt", value: "not Answered - 1st Attempt", description: "" },
        { label: "not Answered - 2nd Attempt", value: "not Answered - 2nd Attempt", description: "" },
        { label: "not Answered - 3rd Attempt", value: "not Answered - 3rd Attempt", description: "" },
    ],
    associate_stock: [
        { label: "prepared", value: "prepared", description: "" },
    ]

}