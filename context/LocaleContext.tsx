import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

export type AppLocale = 'de' | 'en' | 'fr';

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  translate: (text: string) => string;
};

const translations: Record<Exclude<AppLocale, 'en'>, Record<string, string>> = {
  de: {
    'about this product': 'Über dieses Produkt',
    account: 'Konto',
    'account deleted!': 'Konto gelöscht!',
    'add location': 'Standort hinzufügen',
    'add new address': 'Neue Adresse hinzufügen',
    'add to cart': 'In den Warenkorb',
    'add your items !': 'Fügen Sie Artikel hinzu!',
    address: 'Adresse',
    'allow openstreetmap': 'OpenStreetMap erlauben',
    'already have an account? sign in': 'Haben Sie bereits ein Konto? Anmelden',
    'best offers': 'Beste Angebote',
    brands: 'Marken',
    camera: 'Kamera',
    cancel: 'Abbrechen',
    category: 'Kategorie',
    change: 'Ändern',
    'change password': 'Passwort ändern',
    'choose your language to stay within the app.':
      'Wählen Sie Ihre Sprache für die App.',
    city: 'Stadt',
    'completed orders': 'Abgeschlossene Bestellungen',
    'confirm new password': 'Neues Passwort bestätigen',
    'confirm password': 'Passwort bestätigen',
    'confirm the account deletion by clicking yes.':
      'Bestätigen Sie die Kontolöschung, indem Sie auf „Ja“ klicken.',
    "confirm the logging out by clicking 'yes'.":
      'Bestätigen Sie die Abmeldung, indem Sie auf „Ja“ klicken.',
    'contact us': 'Kontaktieren Sie uns',
    continue: 'Weiter',
    'create new password': 'Neues Passwort erstellen',
    'create your account and start shopping your daily essentials easily.':
      'Erstellen Sie ein Konto und kaufen Sie bequem Ihre täglichen Bedarfsgüter.',
    dairy: 'Milchprodukte',
    'date of birth': 'Geburtsdatum',
    'delete account': 'Konto löschen',
    'deliver to': 'Liefern an',
    'delivery location': 'Lieferadresse',
    'didn’t receive the code? resend': 'Code nicht erhalten? Erneut senden',
    done: 'Fertig',
    'don’t have an account? sign up': 'Noch kein Konto? Registrieren',
    'download invoice': 'Rechnung herunterladen',
    'email invoice': 'Rechnung per E-Mail senden',
    'edit date of birth': 'Geburtsdatum bearbeiten',
    'edit full name': 'Vollständigen Namen bearbeiten',
    'edit gender': 'Geschlecht bearbeiten',
    'edit phone number': 'Telefonnummer bearbeiten',
    'edit profile': 'Profil bearbeiten',
    email: 'E-Mail',
    'email address': 'E-Mail-Adresse',
    'enable location': 'Standort aktivieren',
    'enter current password': 'Aktuelles Passwort eingeben',
    'enter fullname': 'Vollständigen Namen eingeben',
    'enter new password': 'Neues Passwort eingeben',
    'enter verification code': 'Bestätigungscode eingeben',
    'enter your email address and we’ll send you an otp to reset your password.':
      'Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Code zum Zurücksetzen Ihres Passworts.',
    'enter your location': 'Standort eingeben',
    'existing member? log in': 'Bereits Mitglied? Anmelden',
    'flat, house no.': 'Wohnungs-/Hausnummer',
    'for your security, please enter your current password before setting a new one.':
      'Geben Sie zu Ihrer Sicherheit Ihr aktuelles Passwort ein, bevor Sie ein neues festlegen.',
    'forgot password': 'Passwort vergessen',
    'forgot password?': 'Passwort vergessen?',
    'fruits & vegetables': 'Obst und Gemüse',
    fullname: 'Vollständiger Name',
    gallery: 'Galerie',
    'help center': 'Hilfe-Center',
    'i understand that this action is permanent and cannot be undone.':
      'Ich verstehe, dass diese Aktion dauerhaft ist und nicht rückgängig gemacht werden kann.',
    'in-progress': 'In Bearbeitung',
    item: 'Artikel',
    invoice: 'Rechnung',
    'happycart invoice': 'HappyCart-Rechnung',
    'items count': 'Anzahl der Artikel',
    label: 'Bezeichnung',
    landmark: 'Orientierungspunkt',
    language: 'Sprache',
    'let’s get started!': 'Legen wir los!',
    message: 'Nachricht',
    'my cart': 'Mein Warenkorb',
    'new to happycart? create account': 'Neu bei HappyCart? Konto erstellen',
    next: 'Weiter',
    'no brands found': 'Keine Marken gefunden',
    'no categories found': 'Keine Kategorien gefunden',
    'no dairy products found': 'Keine Milchprodukte gefunden',
    'no email account is configured on this device.':
      'Auf diesem Gerät ist kein E-Mail-Konto eingerichtet.',
    'no fruits or vegetables found': 'Kein Obst oder Gemüse gefunden',
    'no locations found': 'Keine Standorte gefunden',
    'no offers found': 'Keine Angebote gefunden',
    'no products found': 'Keine Produkte gefunden',
    'no suggestions': 'Keine Vorschläge',
    notification: 'Benachrichtigung',
    'or continue with': 'Oder weiter mit',
    'order date': 'Bestelldatum',
    'order history': 'Bestellverlauf',
    'order list': 'Bestellliste',
    'order time': 'Bestellzeit',
    'order type': 'Bestellart',
    password: 'Passwort',
    'password reset successful!': 'Passwort erfolgreich zurückgesetzt!',
    pay: 'Bezahlen',
    'payment method': 'Zahlungsmethode',
    'personal information': 'Persönliche Informationen',
    'phone number': 'Telefonnummer',
    'phone number (optional)': 'Telefonnummer (optional)',
    'please let us know why you’re deleting your account — your feedback helps us improve.':
      'Bitte teilen Sie uns mit, warum Sie Ihr Konto löschen. Ihr Feedback hilft uns, besser zu werden.',
    'previous address': 'Vorherige Adresse',
    'proceed order': 'Bestellung fortsetzen',
    'providing a complete address helps ensure more accurate search results.':
      'Eine vollständige Adresse sorgt für genauere Suchergebnisse.',
    'quick payment': 'Schnelle Zahlung',
    'recently search': 'Zuletzt gesucht',
    'related products': 'Ähnliche Produkte',
    'remove profile': 'Profil entfernen',
    'reset password': 'Passwort zurücksetzen',
    save: 'Speichern',
    search: 'Suchen',
    'search brands': 'Marken suchen',
    select: 'Auswählen',
    'select country code': 'Ländervorwahl auswählen',
    'select label': 'Bezeichnung auswählen',
    'select your language': 'Sprache auswählen',
    send: 'Senden',
    'send verification code to:': 'Bestätigungscode senden an:',
    'set manually': 'Manuell festlegen',
    'set your location': 'Standort festlegen',
    'shop by brands': 'Nach Marken einkaufen',
    'shop by categories': 'Nach Kategorien einkaufen',
    'sign in': 'Anmelden',
    'sign up': 'Registrieren',
    skip: 'Überspringen',
    'special instructions': 'Besondere Hinweise',
    'street/road': 'Straße',
    subtotal: 'Zwischensumme',
    quantity: 'Menge',
    price: 'Preis',
    total: 'Gesamt',
    today: 'Heute',
    'type here...': 'Hier eingeben...',
    'type here.....': 'Hier eingeben...',
    'verification code sent!': 'Bestätigungscode gesendet!',
    'verification successful. now, enter your new phone number.':
      'Bestätigung erfolgreich. Geben Sie jetzt Ihre neue Telefonnummer ein.',
    verify: 'Bestätigen',
    'we couldn’t find what you’re looking for.':
      'Wir konnten nicht finden, wonach Sie suchen.',
    'we will use your location for best shopping experience.':
      'Wir verwenden Ihren Standort, um Ihnen das beste Einkaufserlebnis zu bieten.',
    'we’re sorry to see you go!': 'Schade, dass Sie uns verlassen!',
    'why are you deleting your account?': 'Warum löschen Sie Ihr Konto?',
    'your account and all associated data have been permanently removed.':
      'Ihr Konto und alle zugehörigen Daten wurden dauerhaft entfernt.',
    'your cart is empty': 'Ihr Warenkorb ist leer',
    'your location is saved. start shopping your daily essentials.':
      'Ihr Standort wurde gespeichert. Beginnen Sie jetzt mit dem Einkauf.',
    'your new password must be different from previous passwords':
      'Ihr neues Passwort muss sich von den vorherigen Passwörtern unterscheiden.',
    'your password has been successfully reset.':
      'Ihr Passwort wurde erfolgreich zurückgesetzt.',
    yes: 'Ja',
    'out for delivery!': 'Wird geliefert!',
    'your order is on the way and will arrive soon.':
      'Ihre Bestellung ist unterwegs und kommt in Kürze an.',
    'new offers available!': 'Neue Angebote verfügbar!',
    'check out the latest supermarket deals and discounts.':
      'Entdecken Sie die neuesten Angebote und Rabatte im Supermarkt.',
    'payment successful!': 'Zahlung erfolgreich!',
    'your payment has been confirmed successfully.':
      'Ihre Zahlung wurde erfolgreich bestätigt.',
    'order packed!': 'Bestellung verpackt!',
    'your items have been packed and are ready for dispatch.':
      'Ihre Artikel wurden verpackt und sind versandbereit.',
    'delivered successfully!': 'Erfolgreich zugestellt!',
    'your order has been delivered successfully.':
      'Ihre Bestellung wurde erfolgreich zugestellt.',
    'camera permission is required to take a profile photo.':
      'Zum Aufnehmen eines Profilbilds ist eine Kameraberechtigung erforderlich.',
    'photo library permission is required to choose a profile photo.':
      'Zum Auswählen eines Profilbilds ist der Zugriff auf Ihre Fotomediathek erforderlich.',
    'unable to select a profile photo. please try again.':
      'Profilbild konnte nicht ausgewählt werden. Bitte versuchen Sie es erneut.',
    'welcome back!': 'Willkommen zurück!',
    'password updated successfully. confirm account deletion when ready.':
      'Passwort aktualisiert. Bestätigen Sie die Kontolöschung, wenn Sie bereit sind.',
    'password reset successfully.': 'Passwort erfolgreich zurückgesetzt.',
    'password changed successfully.': 'Passwort erfolgreich geändert.',
    'your account has been deleted.': 'Ihr Konto wurde gelöscht.',
    'address saved successfully.': 'Adresse erfolgreich gespeichert.',
    'your cart is empty. add a product first.':
      'Ihr Warenkorb ist leer. Fügen Sie zuerst ein Produkt hinzu.',
    'product added to cart.': 'Produkt zum Warenkorb hinzugefügt.',
    'name updated successfully.': 'Name erfolgreich aktualisiert.',
    'gender updated successfully.': 'Geschlecht erfolgreich aktualisiert.',
    'date of birth updated successfully.':
      'Geburtsdatum erfolgreich aktualisiert.',
    'profile photo removed.': 'Profilbild entfernt.',
    'phone number updated successfully.':
      'Telefonnummer erfolgreich aktualisiert.',
    'profile photo uploaded successfully.':
      'Profilbild erfolgreich hochgeladen.',
    'payment successful.': 'Zahlung erfolgreich.',
    'invoice downloaded successfully.': 'Rechnung heruntergeladen.',
    'invoice email is ready. review and send it in your email app.':
      'Die Rechnungs-E-Mail ist vorbereitet. Prüfen und senden Sie sie in Ihrer E-Mail-App.',
    'choose an app to save or share your invoice pdf.':
      'Wählen Sie eine App, um Ihre Rechnungs-PDF zu speichern oder zu teilen.',
    'choose save to files to download your invoice.':
      'Wählen Sie „In Dateien sichern“, um Ihre Rechnung herunterzuladen.',
    'select save as pdf in the print dialog to download your invoice.':
      'Wählen Sie im Druckdialog „Als PDF speichern“, um Ihre Rechnung herunterzuladen.',
    'unable to download invoice. please try again.':
      'Rechnung konnte nicht heruntergeladen werden. Bitte versuchen Sie es erneut.',
    'unable to prepare invoice email. please try again.':
      'Rechnungs-E-Mail konnte nicht vorbereitet werden. Bitte versuchen Sie es erneut.',
    'invoice sharing is not available on this device.':
      'Das Teilen der Rechnung ist auf diesem Gerät nicht verfügbar.',
    'emailing invoice attachments is supported in the mobile app.':
      'Das Versenden von Rechnungen als E-Mail-Anhang wird in der mobilen App unterstützt.',
    'your happycart invoice': 'Ihre HappyCart-Rechnung',
    'please find your invoice attached.': 'Im Anhang finden Sie Ihre Rechnung.',
  },
  fr: {
    'about this product': 'À propos de ce produit',
    account: 'Compte',
    'account deleted!': 'Compte supprimé !',
    'add location': 'Ajouter un emplacement',
    'add new address': 'Ajouter une nouvelle adresse',
    'add to cart': 'Ajouter au panier',
    'add your items !': 'Ajoutez vos articles !',
    address: 'Adresse',
    'allow openstreetmap': 'Autoriser OpenStreetMap',
    'already have an account? sign in': 'Vous avez déjà un compte ? Connectez-vous',
    'best offers': 'Meilleures offres',
    brands: 'Marques',
    camera: 'Appareil photo',
    cancel: 'Annuler',
    category: 'Catégorie',
    change: 'Modifier',
    'change password': 'Modifier le mot de passe',
    'choose your language to stay within the app.':
      'Choisissez la langue de l’application.',
    city: 'Ville',
    'completed orders': 'Commandes terminées',
    'confirm new password': 'Confirmer le nouveau mot de passe',
    'confirm password': 'Confirmer le mot de passe',
    'confirm the account deletion by clicking yes.':
      'Confirmez la suppression du compte en cliquant sur « Oui ».',
    "confirm the logging out by clicking 'yes'.":
      'Confirmez la déconnexion en cliquant sur « Oui ».',
    'contact us': 'Contactez-nous',
    continue: 'Continuer',
    'create new password': 'Créer un nouveau mot de passe',
    'create your account and start shopping your daily essentials easily.':
      'Créez un compte et faites facilement vos achats essentiels du quotidien.',
    dairy: 'Produits laitiers',
    'date of birth': 'Date de naissance',
    'delete account': 'Supprimer le compte',
    'deliver to': 'Livrer à',
    'delivery location': 'Adresse de livraison',
    'didn’t receive the code? resend': 'Vous n’avez pas reçu le code ? Renvoyer',
    done: 'Terminé',
    'don’t have an account? sign up': 'Vous n’avez pas de compte ? Inscrivez-vous',
    'download invoice': 'Télécharger la facture',
    'email invoice': 'Envoyer la facture par e-mail',
    'edit date of birth': 'Modifier la date de naissance',
    'edit full name': 'Modifier le nom complet',
    'edit gender': 'Modifier le genre',
    'edit phone number': 'Modifier le numéro de téléphone',
    'edit profile': 'Modifier le profil',
    email: 'E-mail',
    'email address': 'Adresse e-mail',
    'enable location': 'Activer la localisation',
    'enter current password': 'Saisissez le mot de passe actuel',
    'enter fullname': 'Saisissez le nom complet',
    'enter new password': 'Saisissez un nouveau mot de passe',
    'enter verification code': 'Saisissez le code de vérification',
    'enter your email address and we’ll send you an otp to reset your password.':
      'Saisissez votre adresse e-mail et nous vous enverrons un code pour réinitialiser votre mot de passe.',
    'enter your location': 'Saisissez votre adresse',
    'existing member? log in': 'Déjà membre ? Connectez-vous',
    'flat, house no.': 'Appartement, numéro de maison',
    'for your security, please enter your current password before setting a new one.':
      'Pour votre sécurité, saisissez votre mot de passe actuel avant d’en choisir un nouveau.',
    'forgot password': 'Mot de passe oublié',
    'forgot password?': 'Mot de passe oublié ?',
    'fruits & vegetables': 'Fruits et légumes',
    fullname: 'Nom complet',
    gallery: 'Galerie',
    'help center': 'Centre d’aide',
    'i understand that this action is permanent and cannot be undone.':
      'Je comprends que cette action est définitive et irréversible.',
    'in-progress': 'En cours',
    item: 'Article',
    invoice: 'Facture',
    'happycart invoice': 'Facture HappyCart',
    'items count': 'Nombre d’articles',
    label: 'Libellé',
    landmark: 'Repère',
    language: 'Langue',
    'let’s get started!': 'Commençons !',
    message: 'Message',
    'my cart': 'Mon panier',
    'new to happycart? create account': 'Nouveau sur HappyCart ? Créez un compte',
    next: 'Suivant',
    'no brands found': 'Aucune marque trouvée',
    'no categories found': 'Aucune catégorie trouvée',
    'no dairy products found': 'Aucun produit laitier trouvé',
    'no email account is configured on this device.':
      'Aucun compte e-mail n’est configuré sur cet appareil.',
    'no fruits or vegetables found': 'Aucun fruit ou légume trouvé',
    'no locations found': 'Aucun emplacement trouvé',
    'no offers found': 'Aucune offre trouvée',
    'no products found': 'Aucun produit trouvé',
    'no suggestions': 'Aucune suggestion',
    notification: 'Notification',
    'or continue with': 'Ou continuer avec',
    'order date': 'Date de commande',
    'order history': 'Historique des commandes',
    'order list': 'Liste des commandes',
    'order time': 'Heure de commande',
    'order type': 'Type de commande',
    password: 'Mot de passe',
    'password reset successful!': 'Mot de passe réinitialisé !',
    pay: 'Payer',
    'payment method': 'Mode de paiement',
    'personal information': 'Informations personnelles',
    'phone number': 'Numéro de téléphone',
    'phone number (optional)': 'Numéro de téléphone (facultatif)',
    'please let us know why you’re deleting your account — your feedback helps us improve.':
      'Indiquez-nous pourquoi vous supprimez votre compte : votre avis nous aide à nous améliorer.',
    'previous address': 'Adresse précédente',
    'proceed order': 'Passer la commande',
    'providing a complete address helps ensure more accurate search results.':
      'Une adresse complète permet d’obtenir des résultats plus précis.',
    'quick payment': 'Paiement rapide',
    'recently search': 'Recherches récentes',
    'related products': 'Produits associés',
    'remove profile': 'Supprimer le profil',
    'reset password': 'Réinitialiser le mot de passe',
    save: 'Enregistrer',
    search: 'Rechercher',
    'search brands': 'Rechercher des marques',
    select: 'Sélectionner',
    'select country code': 'Sélectionner l’indicatif du pays',
    'select label': 'Sélectionner un libellé',
    'select your language': 'Sélectionnez votre langue',
    send: 'Envoyer',
    'send verification code to:': 'Envoyer le code de vérification à :',
    'set manually': 'Définir manuellement',
    'set your location': 'Définir votre emplacement',
    'shop by brands': 'Acheter par marque',
    'shop by categories': 'Acheter par catégorie',
    'sign in': 'Se connecter',
    'sign up': 'S’inscrire',
    skip: 'Passer',
    'special instructions': 'Instructions spéciales',
    'street/road': 'Rue',
    subtotal: 'Sous-total',
    quantity: 'Quantité',
    price: 'Prix',
    total: 'Total',
    today: 'Aujourd’hui',
    'type here...': 'Saisissez votre texte...',
    'type here.....': 'Saisissez votre texte...',
    'verification code sent!': 'Code de vérification envoyé !',
    'verification successful. now, enter your new phone number.':
      'Vérification réussie. Saisissez maintenant votre nouveau numéro de téléphone.',
    verify: 'Vérifier',
    'we couldn’t find what you’re looking for.':
      'Nous n’avons pas trouvé ce que vous cherchez.',
    'we will use your location for best shopping experience.':
      'Nous utiliserons votre emplacement pour vous offrir la meilleure expérience d’achat.',
    'we’re sorry to see you go!': 'Nous sommes désolés de vous voir partir !',
    'why are you deleting your account?': 'Pourquoi supprimez-vous votre compte ?',
    'your account and all associated data have been permanently removed.':
      'Votre compte et toutes les données associées ont été définitivement supprimés.',
    'your cart is empty': 'Votre panier est vide',
    'your location is saved. start shopping your daily essentials.':
      'Votre emplacement est enregistré. Commencez vos achats essentiels du quotidien.',
    'your new password must be different from previous passwords':
      'Votre nouveau mot de passe doit être différent des précédents.',
    'your password has been successfully reset.':
      'Votre mot de passe a été réinitialisé.',
    yes: 'Oui',
    'out for delivery!': 'En cours de livraison !',
    'your order is on the way and will arrive soon.':
      'Votre commande est en route et arrivera bientôt.',
    'new offers available!': 'Nouvelles offres disponibles !',
    'check out the latest supermarket deals and discounts.':
      'Découvrez les dernières offres et réductions du supermarché.',
    'payment successful!': 'Paiement réussi !',
    'your payment has been confirmed successfully.':
      'Votre paiement a été confirmé.',
    'order packed!': 'Commande emballée !',
    'your items have been packed and are ready for dispatch.':
      'Vos articles sont emballés et prêts à être expédiés.',
    'delivered successfully!': 'Livraison effectuée !',
    'your order has been delivered successfully.':
      'Votre commande a été livrée.',
    'camera permission is required to take a profile photo.':
      'L’accès à l’appareil photo est nécessaire pour prendre une photo de profil.',
    'photo library permission is required to choose a profile photo.':
      'L’accès à la photothèque est nécessaire pour choisir une photo de profil.',
    'unable to select a profile photo. please try again.':
      'Impossible de sélectionner une photo de profil. Veuillez réessayer.',
    'welcome back!': 'Bon retour !',
    'password updated successfully. confirm account deletion when ready.':
      'Mot de passe mis à jour. Confirmez la suppression du compte lorsque vous êtes prêt.',
    'password reset successfully.': 'Mot de passe réinitialisé.',
    'password changed successfully.': 'Mot de passe modifié.',
    'your account has been deleted.': 'Votre compte a été supprimé.',
    'address saved successfully.': 'Adresse enregistrée.',
    'your cart is empty. add a product first.':
      'Votre panier est vide. Ajoutez d’abord un produit.',
    'product added to cart.': 'Produit ajouté au panier.',
    'name updated successfully.': 'Nom mis à jour.',
    'gender updated successfully.': 'Genre mis à jour.',
    'date of birth updated successfully.': 'Date de naissance mise à jour.',
    'profile photo removed.': 'Photo de profil supprimée.',
    'phone number updated successfully.': 'Numéro de téléphone mis à jour.',
    'profile photo uploaded successfully.': 'Photo de profil importée.',
    'payment successful.': 'Paiement effectué.',
    'invoice downloaded successfully.': 'Facture téléchargée.',
    'invoice email is ready. review and send it in your email app.':
      'L’e-mail avec la facture est prêt. Vérifiez-le et envoyez-le depuis votre application de messagerie.',
    'choose an app to save or share your invoice pdf.':
      'Choisissez une application pour enregistrer ou partager le PDF de votre facture.',
    'choose save to files to download your invoice.':
      'Choisissez « Enregistrer dans Fichiers » pour télécharger votre facture.',
    'select save as pdf in the print dialog to download your invoice.':
      'Choisissez « Enregistrer au format PDF » dans la fenêtre d’impression pour télécharger votre facture.',
    'unable to download invoice. please try again.':
      'Impossible de télécharger la facture. Veuillez réessayer.',
    'unable to prepare invoice email. please try again.':
      'Impossible de préparer l’e-mail de la facture. Veuillez réessayer.',
    'invoice sharing is not available on this device.':
      'Le partage de la facture n’est pas disponible sur cet appareil.',
    'emailing invoice attachments is supported in the mobile app.':
      'L’envoi de factures en pièce jointe est disponible dans l’application mobile.',
    'your happycart invoice': 'Votre facture HappyCart',
    'please find your invoice attached.': 'Veuillez trouver votre facture en pièce jointe.',
  },
};

const additionalTranslations: typeof translations = {
  de: {
    'welcome to happycart': 'Willkommen bei HappyCart',
    'get any packages delivered': 'Lassen Sie sich alle Pakete liefern',
    'protected package delivery.': 'Sichere Paketzustellung.',
    'get your grocery needs at your service within a minute, fast, efficient, and convenient.':
      'Ihre Einkäufe in einer Minute: schnell, effizient und bequem.',
    'get all your items conveniently, ensuring everything you need arrive without any hassle.':
      'Lassen Sie sich alles bequem liefern, was Sie brauchen – ganz ohne Aufwand.',
    'your groceries are carefully packaged to ensure they arrive safely and in perfect condition.':
      'Ihre Einkäufe werden sorgfältig verpackt, damit sie sicher und unversehrt ankommen.',
    'allowing you to stock up on your favorite items while staying within your budget.':
      'Kaufen Sie Ihre Lieblingsartikel auf Vorrat und bleiben Sie dabei im Budget.',
    'welcome back! sign in to continue shopping fresh and fast.':
      'Willkommen zurück! Melden Sie sich an und kaufen Sie schnell und frisch ein.',
    'you don’t have an account? sign up':
      'Noch kein Konto? Registrieren Sie sich',
    'code expires in:': 'Code läuft ab in:',
    'subtotal:': 'Zwischensumme:',
    'eg: 24/7': 'z. B. 24/7',
    'eg: standley 123': 'z. B. Standley 123',
    'eg: near pizza hut': 'z. B. neben Pizza Hut',
    'eg: berlin': 'z. B. Berlin',
    'eg: ring bell, 3rd floor......': 'z. B. klingeln, 3. Stock...',
    'eg: john doe': 'z. B. Max Mustermann',
    'eg; john doe': 'z. B. Max Mustermann',
    'example@gmail.com': 'beispiel@gmail.com',
    'grocery & staples': 'Lebensmittel und Grundnahrungsmittel',
    'shop by category': 'Nach Kategorie einkaufen',
    'saved locations': 'Gespeicherte Standorte',
    'support & information': 'Support und Informationen',
    preferences: 'Einstellungen',
    security: 'Sicherheit',
    'terms of service': 'Nutzungsbedingungen',
    'privacy policy': 'Datenschutzerklärung',
    '8+ characters': 'Mindestens 8 Zeichen',
    'one number': 'Eine Zahl',
    'one uppercase letter': 'Ein Großbuchstabe',
    'one symbol': 'Ein Sonderzeichen',
    'get started': 'Los geht’s',
    fruits: 'Obst',
    vegetables: 'Gemüse',
    'frozen foods': 'Tiefkühlkost',
    'frozen vegetables': 'Tiefkühlgemüse',
    'ready meals': 'Fertiggerichte',
    chicken: 'Hähnchen',
    beef: 'Rindfleisch',
    seafood: 'Meeresfrüchte',
    vitamins: 'Vitamine',
    'first aid': 'Erste Hilfe',
    'personal care': 'Körperpflege',
    water: 'Wasser',
    juice: 'Saft',
    'soft drinks': 'Erfrischungsgetränke',
    'energy drinks': 'Energy-Drinks',
    'tea & coffee': 'Tee und Kaffee',
    'indian rich rice': 'Indischer Reis',
    'natural milk': 'Frische Milch',
    'full cream milk': 'Vollmilch',
    'chocolate milk': 'Schokoladenmilch',
    'fresh sweet melon, juicy and ripe. perfect for everyday snacking.':
      'Süße, saftige und reife Melone. Ideal als täglicher Snack.',
    'smooth chocolate flavoured milk. a tasty treat packed with calcium.':
      'Cremige Schokoladenmilch, ein köstlicher Genuss mit viel Kalzium.',
    'richlife faluda flavoured milk in a handy 180ml pack.':
      'RichLife-Milch mit Faluda-Geschmack in der praktischen 180-ml-Packung.',
    'buy 7 and get 1 free value pack. great for families.':
      'Kaufen Sie 7 und erhalten Sie 1 Vorteilspackung gratis. Ideal für Familien.',
    'welcome back!': 'Willkommen zurück!',
    'password updated successfully. confirm account deletion when ready.':
      'Passwort aktualisiert. Bestätigen Sie die Kontolöschung, wenn Sie bereit sind.',
    'password reset successfully.': 'Passwort erfolgreich zurückgesetzt.',
    'password changed successfully.': 'Passwort erfolgreich geändert.',
    'your account has been deleted.': 'Ihr Konto wurde gelöscht.',
    'address saved successfully.': 'Adresse erfolgreich gespeichert.',
    'your cart is empty. add a product first.':
      'Ihr Warenkorb ist leer. Fügen Sie zuerst ein Produkt hinzu.',
    'product added to cart.': 'Produkt zum Warenkorb hinzugefügt.',
    'name updated successfully.': 'Name erfolgreich aktualisiert.',
    'gender updated successfully.': 'Geschlecht erfolgreich aktualisiert.',
    'date of birth updated successfully.':
      'Geburtsdatum erfolgreich aktualisiert.',
    'profile photo removed.': 'Profilbild entfernt.',
    'phone number updated successfully.':
      'Telefonnummer erfolgreich aktualisiert.',
    'profile photo uploaded successfully.':
      'Profilbild erfolgreich hochgeladen.',
    'payment successful.': 'Zahlung erfolgreich.',
    'invoice downloaded successfully.': 'Rechnung heruntergeladen.',
  },
  fr: {
    'welcome to happycart': 'Bienvenue chez HappyCart',
    'get any packages delivered': 'Faites-vous livrer tous vos colis',
    'protected package delivery.': 'Livraison de colis sécurisée.',
    'get your grocery needs at your service within a minute, fast, efficient, and convenient.':
      'Vos courses livrées en une minute : rapide, efficace et pratique.',
    'get all your items conveniently, ensuring everything you need arrive without any hassle.':
      'Recevez facilement tout ce dont vous avez besoin, sans aucun souci.',
    'your groceries are carefully packaged to ensure they arrive safely and in perfect condition.':
      'Vos courses sont soigneusement emballées pour arriver en toute sécurité et en parfait état.',
    'allowing you to stock up on your favorite items while staying within your budget.':
      'Faites le plein de vos articles préférés tout en respectant votre budget.',
    'welcome back! sign in to continue shopping fresh and fast.':
      'Bon retour ! Connectez-vous pour faire vos achats frais rapidement.',
    'you don’t have an account? sign up':
      'Vous n’avez pas de compte ? Inscrivez-vous',
    'code expires in:': 'Le code expire dans :',
    'subtotal:': 'Sous-total :',
    'eg: 24/7': 'ex. : 24/7',
    'eg: standley 123': 'ex. : Standley 123',
    'eg: near pizza hut': 'ex. : près du Pizza Hut',
    'eg: berlin': 'ex. : Berlin',
    'eg: ring bell, 3rd floor......': 'ex. : sonner, 3e étage...',
    'eg: john doe': 'ex. : Jean Dupont',
    'eg; john doe': 'ex. : Jean Dupont',
    'example@gmail.com': 'exemple@gmail.com',
    'grocery & staples': 'Épicerie et produits essentiels',
    'shop by category': 'Acheter par catégorie',
    'saved locations': 'Adresses enregistrées',
    'support & information': 'Assistance et informations',
    preferences: 'Préférences',
    security: 'Sécurité',
    'terms of service': 'Conditions d’utilisation',
    'privacy policy': 'Politique de confidentialité',
    '8+ characters': 'Au moins 8 caractères',
    'one number': 'Un chiffre',
    'one uppercase letter': 'Une lettre majuscule',
    'one symbol': 'Un symbole',
    'get started': 'Commencer',
    fruits: 'Fruits',
    vegetables: 'Légumes',
    'frozen foods': 'Produits surgelés',
    'frozen vegetables': 'Légumes surgelés',
    'ready meals': 'Plats préparés',
    chicken: 'Poulet',
    beef: 'Bœuf',
    seafood: 'Fruits de mer',
    vitamins: 'Vitamines',
    'first aid': 'Premiers secours',
    'personal care': 'Soins personnels',
    water: 'Eau',
    juice: 'Jus',
    'soft drinks': 'Boissons gazeuses',
    'energy drinks': 'Boissons énergisantes',
    'tea & coffee': 'Thé et café',
    'indian rich rice': 'Riz indien',
    'natural milk': 'Lait frais',
    'full cream milk': 'Lait entier',
    'chocolate milk': 'Lait chocolaté',
    'fresh sweet melon, juicy and ripe. perfect for everyday snacking.':
      'Melon doux, juteux et mûr. Idéal pour une collation au quotidien.',
    'smooth chocolate flavoured milk. a tasty treat packed with calcium.':
      'Lait chocolaté onctueux, une délicieuse source de calcium.',
    'richlife faluda flavoured milk in a handy 180ml pack.':
      'Lait aromatisé au falooda RichLife en format pratique de 180 ml.',
    'buy 7 and get 1 free value pack. great for families.':
      'Pour 7 achetés, 1 pack familial offert.',
    'welcome back!': 'Bon retour !',
    'password updated successfully. confirm account deletion when ready.':
      'Mot de passe mis à jour. Confirmez la suppression du compte lorsque vous êtes prêt.',
    'password reset successfully.': 'Mot de passe réinitialisé.',
    'password changed successfully.': 'Mot de passe modifié.',
    'your account has been deleted.': 'Votre compte a été supprimé.',
    'address saved successfully.': 'Adresse enregistrée.',
    'your cart is empty. add a product first.':
      'Votre panier est vide. Ajoutez d’abord un produit.',
    'product added to cart.': 'Produit ajouté au panier.',
    'name updated successfully.': 'Nom mis à jour.',
    'gender updated successfully.': 'Genre mis à jour.',
    'date of birth updated successfully.': 'Date de naissance mise à jour.',
    'profile photo removed.': 'Photo de profil supprimée.',
    'phone number updated successfully.': 'Numéro de téléphone mis à jour.',
    'profile photo uploaded successfully.': 'Photo de profil importée.',
    'payment successful.': 'Paiement effectué.',
    'invoice downloaded successfully.': 'Facture téléchargée.',
  },
};

const navigationTranslations: typeof translations = {
  de: {
    home: 'Startseite',
    cart: 'Warenkorb',
    orders: 'Bestellungen',
    profile: 'Profil',
    german: 'Deutsch',
    english: 'Englisch',
    french: 'Französisch',
    'code expires in:': 'Code läuft ab in:',
    'subtotal:': 'Zwischensumme:',
    'about us': 'Über uns',
    'saved locations': 'Gespeicherte Standorte',
    preferences: 'Einstellungen',
    security: 'Sicherheit',
    'support & information': 'Support und Informationen',
    'terms of service': 'Nutzungsbedingungen',
    'privacy policy': 'Datenschutzerklärung',
    'grocery & staples': 'Lebensmittel und Grundnahrungsmittel',
    'frozen foods': 'Tiefkühlkost',
    'frozen vegetables': 'Tiefkühlgemüse',
    'ready meals': 'Fertiggerichte',
    'meat & sea foods': 'Fleisch und Meeresfrüchte',
    'tea & coffee': 'Tee und Kaffee',
    'soft drinks': 'Erfrischungsgetränke',
    'energy drinks': 'Energy-Drinks',
    'first aid': 'Erste Hilfe',
    'personal care': 'Körperpflege',
    'ice cream': 'Eis',
    fruits: 'Obst',
    vegetables: 'Gemüse',
    herbs: 'Kräuter',
    chicken: 'Hähnchen',
    beef: 'Rindfleisch',
    seafood: 'Meeresfrüchte',
    vitamins: 'Vitamine',
    water: 'Wasser',
    juice: 'Saft',
    milk: 'Milch',
    yoghurt: 'Joghurt',
    butter: 'Butter',
    cheese: 'Käse',
    cream: 'Sahne',
    'indian rich rice': 'Indischer Reis',
    'natural milk': 'Frische Milch',
    'full cream milk': 'Vollmilch',
    'chocolate milk': 'Schokoladenmilch',
    'welcome to happycart': 'Willkommen bei HappyCart',
    'get any packages delivered': 'Lassen Sie sich alle Pakete liefern',
    'protected package delivery.': 'Sichere Paketzustellung.',
    'get your grocery needs at your service within a minute, fast, efficient, and convenient.':
      'Ihre Einkäufe in einer Minute: schnell, effizient und bequem.',
    'get all your items conveniently, ensuring everything you need arrive without any hassle.':
      'Lassen Sie sich alles bequem liefern, was Sie brauchen – ganz ohne Aufwand.',
    'your groceries are carefully packaged to ensure they arrive safely and in perfect condition.':
      'Ihre Einkäufe werden sorgfältig verpackt, damit sie sicher und unversehrt ankommen.',
    'allowing you to stock up on your favorite items while staying within your budget.':
      'Kaufen Sie Ihre Lieblingsartikel auf Vorrat und bleiben Sie dabei im Budget.',
    'welcome back! sign in to continue shopping fresh and fast.':
      'Willkommen zurück! Melden Sie sich an und kaufen Sie schnell und frisch ein.',
    '8+ characters': 'Mindestens 8 Zeichen',
    'one number': 'Eine Zahl',
    'one uppercase letter': 'Ein Großbuchstabe',
    'one symbol': 'Ein Sonderzeichen',
    'eg: 24/7': 'z. B. 24/7',
    'eg: standley 123': 'z. B. Standley 123',
    'eg: near pizza hut': 'z. B. neben Pizza Hut',
    'eg: berlin': 'z. B. Berlin',
    'eg: ring bell, 3rd floor......': 'z. B. klingeln, 3. Stock...',
    'eg: john doe': 'z. B. Max Mustermann',
    'eg; john doe': 'z. B. Max Mustermann',
    'example@gmail.com': 'beispiel@gmail.com',
    items: 'Artikel',
    'shop by brand': 'Nach Marke einkaufen',
    'this action cannot be undone. all your data will be permanently deleted.':
      'Diese Aktion kann nicht rückgängig gemacht werden. Alle Ihre Daten werden dauerhaft gelöscht.',
    'to change your phone number, we need to verify your identity.':
      'Um Ihre Telefonnummer zu ändern, müssen wir Ihre Identität bestätigen.',
    'we’re sorry to see you go!': 'Schade, dass Sie uns verlassen!',
    'confirm the account deletion by clicking yes.':
      'Bestätigen Sie die Kontolöschung, indem Sie auf „Ja“ klicken.',
    'confirm the account deletion by clicking "yes".':
      'Bestätigen Sie die Kontolöschung, indem Sie auf „Ja“ klicken.',
    ["confirm the account deletion by clicking 'yes'."]:
      'Bestätigen Sie die Kontolöschung, indem Sie auf „Ja“ klicken.',
    'confirm the logging out by clicking yes.':
      'Bestätigen Sie die Abmeldung, indem Sie auf „Ja“ klicken.',
    'confirm the logging out by clicking "yes".':
      'Bestätigen Sie die Abmeldung, indem Sie auf „Ja“ klicken.',
    'secure storage is unavailable on this device.':
      'Der sichere Speicher ist auf diesem Gerät nicht verfügbar.',
    'kinde did not return a user email address.':
      'Kinde hat keine E-Mail-Adresse für den Benutzer zurückgegeben.',
    'this action cannot be undone.': 'Diese Aktion kann nicht rückgängig gemacht werden.',
    'we are dedicated to creating simple, smart, and user-friendly digital solutions that make everyday tasks easier. our app is designed with a focus on speed, reliability, and a smooth user experience. we aim to bring convenience to your fingertips while continuously improving based on user feedback.':
      'Wir entwickeln einfache, intelligente und benutzerfreundliche digitale Lösungen, die den Alltag erleichtern. Unsere App ist auf Schnelligkeit, Zuverlässigkeit und eine reibungslose Nutzung ausgelegt. Wir möchten Ihnen den Alltag erleichtern und verbessern die App kontinuierlich anhand Ihres Feedbacks.',
    'fresh full cream milk sourced daily. rich in calcium and vitamins for your everyday nutrition.':
      'Täglich frisch bezogene Vollmilch. Reich an Kalzium und Vitaminen für Ihre tägliche Ernährung.',
    'fresh full cream milk sourced daily. rich in calcium and vitamins.':
      'Täglich frisch bezogene Vollmilch, reich an Kalzium und Vitaminen.',
    'fresh full cream milk in a handy 500ml pack.':
      'Frische Vollmilch in der praktischen 500-ml-Packung.',
    'fresh full cream milk. pure, nutritious and ready to drink.':
      'Frische Vollmilch: rein, nahrhaft und trinkfertig.',
    'full cream milk powder for rich, creamy milk anytime.':
      'Vollmilchpulver für jederzeit reichhaltige, cremige Milch.',
    'full cream milk powder for rich, creamy milk anytime at home.':
      'Vollmilchpulver für jederzeit reichhaltige, cremige Milch zu Hause.',
    'smooth chocolate flavoured milk packed with calcium.':
      'Cremige Schokoladenmilch, reich an Kalzium.',
    'fresh sweet melon, juicy and ripe.': 'Süße, saftige und reife Melone.',
    'buy 7 get 1 free yoghurt value pack for the whole family.':
      'Joghurt-Vorteilspackung für die ganze Familie: 7 kaufen, 1 gratis erhalten.',
    'smooth dairy vanilla ice cream. family pack 2 litre tub.':
      'Cremiges Vanilleeis aus Milchprodukten. Familienpackung mit 2 Litern.',
    'richlife faluda flavoured milk in a handy pack.':
      'RichLife-Milch mit Faluda-Geschmack in einer praktischen Packung.',
    'creamy kotmale butter. perfect for cooking and spreading.':
      'Cremige Kotmale-Butter, ideal zum Kochen und Bestreichen.',
    'classic maliban cream crackers. light, crispy and perfect with tea or cheese.':
      'Klassische Maliban-Cracker: leicht, knusprig und ideal zu Tee oder Käse.',
    'rich chocolate coated biscuits from maliban. a sweet treat for everyday snacking.':
      'Schokoladenkekse von Maliban – ein süßer Snack für jeden Tag.',
    'soft and tasty marie biscuits. ideal with milk for kids and family tea time.':
      'Zarte, leckere Marie-Kekse. Ideal mit Milch für Kinder und zum Familientee.',
    'spicy ginger biscuits with a crunchy bite. great with hot tea.':
      'Würzige Ingwerkekse mit knusprigem Biss. Perfekt zu heißem Tee.',
    'wholesome digestive biscuits made with wheat. a healthy everyday snack.':
      'Nahrhafte Weizenkekse – ein gesunder Snack für jeden Tag.',
    'email or username is required': 'E-Mail-Adresse oder Benutzername erforderlich',
    'enter a valid email address': 'Geben Sie eine gültige E-Mail-Adresse ein',
    'password is required': 'Passwort erforderlich',
    'incorrect username or password': 'Benutzername oder Passwort ist falsch',
    'full name is required': 'Vollständiger Name erforderlich',
    'email address is required': 'E-Mail-Adresse erforderlich',
    'enter a valid phone number': 'Geben Sie eine gültige Telefonnummer ein',
    'enter a valid phone number.': 'Geben Sie eine gültige Telefonnummer ein.',
    'new password is required': 'Neues Passwort erforderlich',
    'current password is required': 'Aktuelles Passwort erforderlich',
    'password does not meet the requirements':
      'Das Passwort erfüllt nicht die Anforderungen',
    'confirm password is required': 'Passwortbestätigung erforderlich',
    'passwords do not match': 'Passwörter stimmen nicht überein',
    'incorrect password. please try again.':
      'Falsches Passwort. Bitte versuchen Sie es erneut.',
    'please confirm that you understand this action is permanent.':
      'Bitte bestätigen Sie, dass Sie verstehen, dass diese Aktion dauerhaft ist.',
    'i found a better app/service': 'Ich habe eine bessere App oder einen besseren Dienst gefunden',
    'delivery charges are too high': 'Die Liefergebühren sind zu hoch',
    'products i need are often unavailable':
      'Die benötigten Produkte sind oft nicht verfügbar',
    'i no longer need the service': 'Ich benötige den Dienst nicht mehr',
    'the app is difficult to use': 'Die App ist schwer zu bedienen',
    'prefer not to say': 'Keine Angabe',
    male: 'Männlich',
    female: 'Weiblich',
    other: 'Sonstiges',
    all: 'Alle',
    price: 'Preis',
    'price -': 'Preis -',
    'price +': 'Preis +',
    discount: 'Rabatt',
    popularity: 'Beliebtheit',
    newest: 'Neueste',
    'milk & dairy': 'Milch und Milchprodukte',
    biscuits: 'Kekse',
    spreads: 'Brotaufstriche',
    'cream cracker': 'Sahnecracker',
    'real chocolate': 'Echte Schokolade',
    'gold marie': 'Gold-Marie-Kekse',
    'ginger biscuit': 'Ingwerkeks',
    digestive: 'Vollkornkeks',
    'faluda milk': 'Faluda-Milch',
    'sweet melon': 'Süße Melone',
    'value pack': 'Vorteilspackung',
    'full cream': 'Vollmilch',
    'milk tea cream': 'Milchtee mit Sahne',
    'magic bread': 'Magic-Brot',
    'almond milk': 'Mandelmilch',
    flat: 'Wohnung',
    office: 'Büro',
    hotel: 'Hotel',
    'google pay': 'Google Pay',
    'apple pay': 'Apple Pay',
    'qty:': 'Menge:',
    no: 'Nein',
    'phone number verification': 'Telefonnummer bestätigen',
    'email verification': 'E-Mail bestätigen',
  },
  fr: {
    home: 'Accueil',
    cart: 'Panier',
    orders: 'Commandes',
    profile: 'Profil',
    german: 'Allemand',
    english: 'Anglais',
    french: 'Français',
    'code expires in:': 'Le code expire dans :',
    'subtotal:': 'Sous-total :',
    'about us': 'À propos de nous',
    'saved locations': 'Adresses enregistrées',
    preferences: 'Préférences',
    security: 'Sécurité',
    'support & information': 'Assistance et informations',
    'terms of service': 'Conditions d’utilisation',
    'privacy policy': 'Politique de confidentialité',
    'grocery & staples': 'Épicerie et produits essentiels',
    'frozen foods': 'Produits surgelés',
    'frozen vegetables': 'Légumes surgelés',
    'ready meals': 'Plats préparés',
    'meat & sea foods': 'Viandes et fruits de mer',
    'tea & coffee': 'Thé et café',
    'soft drinks': 'Boissons gazeuses',
    'energy drinks': 'Boissons énergisantes',
    'first aid': 'Premiers secours',
    'personal care': 'Soins personnels',
    'ice cream': 'Glace',
    fruits: 'Fruits',
    vegetables: 'Légumes',
    herbs: 'Herbes',
    chicken: 'Poulet',
    beef: 'Bœuf',
    seafood: 'Fruits de mer',
    vitamins: 'Vitamines',
    water: 'Eau',
    juice: 'Jus',
    milk: 'Lait',
    yoghurt: 'Yaourt',
    butter: 'Beurre',
    cheese: 'Fromage',
    cream: 'Crème',
    'indian rich rice': 'Riz indien',
    'natural milk': 'Lait frais',
    'full cream milk': 'Lait entier',
    'chocolate milk': 'Lait chocolaté',
    'welcome to happycart': 'Bienvenue chez HappyCart',
    'get any packages delivered': 'Faites-vous livrer tous vos colis',
    'protected package delivery.': 'Livraison de colis sécurisée.',
    'get your grocery needs at your service within a minute, fast, efficient, and convenient.':
      'Vos courses livrées en une minute : rapide, efficace et pratique.',
    'get all your items conveniently, ensuring everything you need arrive without any hassle.':
      'Recevez facilement tout ce dont vous avez besoin, sans aucun souci.',
    'your groceries are carefully packaged to ensure they arrive safely and in perfect condition.':
      'Vos courses sont soigneusement emballées pour arriver en toute sécurité et en parfait état.',
    'allowing you to stock up on your favorite items while staying within your budget.':
      'Faites le plein de vos articles préférés tout en respectant votre budget.',
    'welcome back! sign in to continue shopping fresh and fast.':
      'Bon retour ! Connectez-vous pour faire vos achats frais rapidement.',
    '8+ characters': 'Au moins 8 caractères',
    'one number': 'Un chiffre',
    'one uppercase letter': 'Une lettre majuscule',
    'one symbol': 'Un symbole',
    'eg: 24/7': 'ex. : 24/7',
    'eg: standley 123': 'ex. : Standley 123',
    'eg: near pizza hut': 'ex. : près du Pizza Hut',
    'eg: berlin': 'ex. : Berlin',
    'eg: ring bell, 3rd floor......': 'ex. : sonner, 3e étage...',
    'eg: john doe': 'ex. : Jean Dupont',
    'eg; john doe': 'ex. : Jean Dupont',
    'example@gmail.com': 'exemple@gmail.com',
    items: 'Articles',
    'shop by brand': 'Acheter par marque',
    'this action cannot be undone. all your data will be permanently deleted.':
      'Cette action est irréversible. Toutes vos données seront définitivement supprimées.',
    'to change your phone number, we need to verify your identity.':
      'Pour modifier votre numéro de téléphone, nous devons vérifier votre identité.',
    'we’re sorry to see you go!': 'Nous sommes désolés de vous voir partir !',
    'confirm the account deletion by clicking yes.':
      'Confirmez la suppression du compte en cliquant sur « Oui ».',
    'confirm the account deletion by clicking "yes".':
      'Confirmez la suppression du compte en cliquant sur « Oui ».',
    ["confirm the account deletion by clicking 'yes'."]:
      'Confirmez la suppression du compte en cliquant sur « Oui ».',
    'confirm the logging out by clicking yes.':
      'Confirmez la déconnexion en cliquant sur « Oui ».',
    'confirm the logging out by clicking "yes".':
      'Confirmez la déconnexion en cliquant sur « Oui ».',
    'secure storage is unavailable on this device.':
      'Le stockage sécurisé n’est pas disponible sur cet appareil.',
    'kinde did not return a user email address.':
      'Kinde n’a pas renvoyé d’adresse e-mail utilisateur.',
    'this action cannot be undone.': 'Cette action est irréversible.',
    'we are dedicated to creating simple, smart, and user-friendly digital solutions that make everyday tasks easier. our app is designed with a focus on speed, reliability, and a smooth user experience. we aim to bring convenience to your fingertips while continuously improving based on user feedback.':
      'Nous créons des solutions numériques simples, intelligentes et faciles à utiliser pour simplifier le quotidien. Notre application privilégie la rapidité, la fiabilité et une expérience fluide. Nous souhaitons vous faciliter la vie et l’améliorons continuellement grâce à vos commentaires.',
    'fresh full cream milk sourced daily. rich in calcium and vitamins for your everyday nutrition.':
      'Lait entier frais collecté chaque jour, riche en calcium et en vitamines pour votre alimentation quotidienne.',
    'fresh full cream milk sourced daily. rich in calcium and vitamins.':
      'Lait entier frais collecté chaque jour, riche en calcium et en vitamines.',
    'fresh full cream milk in a handy 500ml pack.':
      'Lait entier frais dans un format pratique de 500 ml.',
    'fresh full cream milk. pure, nutritious and ready to drink.':
      'Lait entier frais, pur, nourrissant et prêt à boire.',
    'full cream milk powder for rich, creamy milk anytime.':
      'Lait entier en poudre pour un lait riche et onctueux à tout moment.',
    'full cream milk powder for rich, creamy milk anytime at home.':
      'Lait entier en poudre pour un lait riche et onctueux à tout moment à la maison.',
    'smooth chocolate flavoured milk packed with calcium.':
      'Lait chocolaté onctueux et riche en calcium.',
    'fresh sweet melon, juicy and ripe.': 'Melon doux, juteux et mûr.',
    'buy 7 get 1 free yoghurt value pack for the whole family.':
      'Pack familial de yaourts : 7 achetés, 1 offert.',
    'smooth dairy vanilla ice cream. family pack 2 litre tub.':
      'Crème glacée à la vanille onctueuse. Pot familial de 2 litres.',
    'richlife faluda flavoured milk in a handy pack.':
      'Lait aromatisé au falooda RichLife dans un format pratique.',
    'creamy kotmale butter. perfect for cooking and spreading.':
      'Beurre crémeux Kotmale, idéal pour cuisiner et tartiner.',
    'classic maliban cream crackers. light, crispy and perfect with tea or cheese.':
      'Crackers classiques Maliban, légers et croustillants, parfaits avec du thé ou du fromage.',
    'rich chocolate coated biscuits from maliban. a sweet treat for everyday snacking.':
      'Biscuits enrobés de chocolat Maliban, une gourmandise pour tous les jours.',
    'soft and tasty marie biscuits. ideal with milk for kids and family tea time.':
      'Biscuits Marie tendres et savoureux, parfaits avec du lait ou pour le goûter.',
    'spicy ginger biscuits with a crunchy bite. great with hot tea.':
      'Biscuits épicés au gingembre et croustillants, parfaits avec un thé chaud.',
    'wholesome digestive biscuits made with wheat. a healthy everyday snack.':
      'Biscuits digestifs au blé, une collation saine au quotidien.',
    'email or username is required': 'Adresse e-mail ou nom d’utilisateur requis',
    'enter a valid email address': 'Saisissez une adresse e-mail valide',
    'password is required': 'Mot de passe requis',
    'incorrect username or password': 'Nom d’utilisateur ou mot de passe incorrect',
    'full name is required': 'Nom complet requis',
    'email address is required': 'Adresse e-mail requise',
    'enter a valid phone number': 'Saisissez un numéro de téléphone valide',
    'enter a valid phone number.': 'Saisissez un numéro de téléphone valide.',
    'new password is required': 'Nouveau mot de passe requis',
    'current password is required': 'Mot de passe actuel requis',
    'password does not meet the requirements':
      'Le mot de passe ne respecte pas les critères requis',
    'confirm password is required': 'Confirmation du mot de passe requise',
    'passwords do not match': 'Les mots de passe ne correspondent pas',
    'incorrect password. please try again.':
      'Mot de passe incorrect. Veuillez réessayer.',
    'please confirm that you understand this action is permanent.':
      'Veuillez confirmer que vous comprenez que cette action est définitive.',
    'i found a better app/service': 'J’ai trouvé une meilleure application ou un meilleur service',
    'delivery charges are too high': 'Les frais de livraison sont trop élevés',
    'products i need are often unavailable':
      'Les produits dont j’ai besoin sont souvent indisponibles',
    'i no longer need the service': 'Je n’ai plus besoin de ce service',
    'the app is difficult to use': 'L’application est difficile à utiliser',
    'prefer not to say': 'Je préfère ne pas répondre',
    male: 'Homme',
    female: 'Femme',
    other: 'Autre',
    all: 'Tout',
    price: 'Prix',
    'price -': 'Prix -',
    'price +': 'Prix +',
    discount: 'Réduction',
    popularity: 'Popularité',
    newest: 'Nouveautés',
    'milk & dairy': 'Lait et produits laitiers',
    biscuits: 'Biscuits',
    spreads: 'Pâtes à tartiner',
    'cream cracker': 'Cracker à la crème',
    'real chocolate': 'Chocolat véritable',
    'gold marie': 'Biscuits Gold Marie',
    'ginger biscuit': 'Biscuit au gingembre',
    digestive: 'Biscuit digestif',
    'faluda milk': 'Lait au falooda',
    'sweet melon': 'Melon doux',
    'value pack': 'Pack économique',
    'full cream': 'Lait entier',
    'milk tea cream': 'Thé au lait et à la crème',
    'magic bread': 'Pain Magic',
    'almond milk': 'Lait d’amande',
    flat: 'Appartement',
    office: 'Bureau',
    hotel: 'Hôtel',
    'google pay': 'Google Pay',
    'apple pay': 'Apple Pay',
    'qty:': 'Qté :',
    no: 'Non',
    'phone number verification': 'Vérification du numéro de téléphone',
    'email verification': 'Vérification de l’adresse e-mail',
  },
};

function normalizeText(text: string) {
  return text
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase();
}

function translateText(locale: AppLocale, text: string) {
  if (locale === 'en') return text;

  const key = normalizeText(text);
  const translation =
    navigationTranslations[locale][key] ??
    additionalTranslations[locale][key] ??
    translations[locale][key];
  if (translation) return translation;

  const searchMatch = text.match(/^Search (.+)$/i);
  if (searchMatch) {
    return locale === 'de'
      ? `Suche nach ${searchMatch[1]}`
      : `Rechercher ${searchMatch[1]}`;
  }

  const verificationMatch = text.match(
    /^We’ve sent a verification code (?:by SMS to|to your email address) (.+)$/i,
  );
  if (verificationMatch) {
    const isSms = /^We’ve sent a verification code by SMS/i.test(text);
    if (locale === 'de') {
      return isSms
        ? `Wir haben einen Bestätigungscode per SMS an ${verificationMatch[1]} gesendet.`
        : `Wir haben einen Bestätigungscode an Ihre E-Mail-Adresse ${verificationMatch[1]} gesendet.`;
    }
    return isSms
      ? `Nous avons envoyé un code de vérification par SMS au ${verificationMatch[1]}.`
      : `Nous avons envoyé un code de vérification à votre adresse e-mail ${verificationMatch[1]}.`;
  }

  const signedInMatch = text.match(/^Signed in with (google|facebook)\.$/i);
  if (signedInMatch) {
    const provider = signedInMatch[1].toLowerCase();
    return locale === 'de'
      ? `Mit ${provider} angemeldet.`
      : `Connexion avec ${provider} réussie.`;
  }

  const connectedMatch = text.match(
    /^(google|facebook) account connected\. Let’s finish setting up your account\.$/i,
  );
  if (connectedMatch) {
    return locale === 'de'
      ? `${connectedMatch[1]}-Konto verbunden. Richten Sie Ihr Konto jetzt fertig ein.`
      : `Compte ${connectedMatch[1]} connecté. Terminez la configuration de votre compte.`;
  }

  return text;
}

const defaultContextValue: LocaleContextValue = {
  locale: 'en',
  setLocale: () => {},
  translate: (text) => text,
};

const LocaleContext = createContext(defaultContextValue);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<AppLocale>('en');
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      translate: (text) => translateText(locale, text),
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
