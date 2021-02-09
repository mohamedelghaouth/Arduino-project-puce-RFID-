# Arduino_to_Node
Arduino with Node  

Le code du serveur Express.js qui communique entre l’arduino et l’api sur la VM.

Le serveur écoute les données émises sur le port COM5; récupère le rfid du badge, puis il envoie une requête http (get) à l’api pour savoir les droit d'accès de l’utilisateur, ensuite il envoie l’ordre de l’ouverture ou fermeture sur le port COM5.

Le serveur est lié à une page HTML qui joue le rôle de l’afficheur  alphanumérique. 



